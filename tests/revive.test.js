import test from 'node:test';
import assert from 'node:assert/strict';
import { ReviveSession } from '../src/logic/revive.js';
import { MockAdSession, MockAdProvider } from '../src/ads/adProvider.js';
import { CFG } from '../src/config.js';

test('revive: the price grows with every revive of the run and there is a limit', () => {
  const costs = CFG.revive.costs;
  assert.ok(costs.length >= 2);
  for (let i = 1; i < costs.length; i++) assert.ok(costs[i] > costs[i - 1], 'strictly growing');
  const r = new ReviveSession();
  const wallet = { coins: 0, crowns: 1000 };
  const paid = [];
  while (r.offer()) {
    const res = r.payCrowns(wallet);
    assert.equal(res.ok, true);
    paid.push(res.cost);
  }
  assert.deepEqual(paid, costs);
  assert.equal(r.used, costs.length);
  assert.equal(r.available, false);
  assert.equal(r.cost, null);
  assert.equal(wallet.crowns, 1000 - costs.reduce((a, b) => a + b, 0));
});

test('revive: not enough crowns -> nothing is taken and the offer stays', () => {
  const r = new ReviveSession();
  const wallet = { coins: 99999, crowns: CFG.revive.costs[0] - 1 };
  r.offer();
  assert.deepEqual(r.payCrowns(wallet), { ok: false, reason: 'funds' });
  assert.equal(wallet.crowns, CFG.revive.costs[0] - 1);
  assert.equal(r.state, 'offered');
  assert.equal(r.used, 0);
});

test('revive: double tap on "pay" pays once', () => {
  const r = new ReviveSession();
  const wallet = { coins: 0, crowns: 100 };
  r.offer();
  assert.equal(r.payCrowns(wallet).ok, true);
  assert.deepEqual(r.payCrowns(wallet), { ok: false, reason: 'state' });
  assert.equal(wallet.crowns, 100 - CFG.revive.costs[0]);
  assert.equal(r.used, 1);
});

test('revive: nothing works without an offer on screen', () => {
  const r = new ReviveSession();
  const wallet = { coins: 0, crowns: 100 };
  assert.equal(r.payCrowns(wallet).ok, false);
  assert.equal(r.startAd(), null);
  assert.equal(r.decline(), false);
  assert.equal(r.adFinished(1, true), 'ignored');
  assert.equal(wallet.crowns, 100);
  assert.equal(r.used, 0);
});

test('revive by ad: only a COMPLETED ad revives; a closed one goes back to the offer', () => {
  const r = new ReviveSession();
  r.offer();
  const t1 = r.startAd();
  assert.ok(t1);
  assert.equal(r.startAd(), null, 'double tap on "watch ad" starts one ad');
  assert.equal(r.payCrowns({ coins: 0, crowns: 100 }).ok, false, 'cannot also pay while the ad runs');
  assert.equal(r.decline(), false);
  assert.equal(r.adFinished(t1, false), 'back');
  assert.equal(r.state, 'offered');
  assert.equal(r.used, 0);
  const t2 = r.startAd();
  assert.notEqual(t2, t1);
  assert.equal(r.adFinished(t1, true), 'ignored', 'answer of the OLD ad');
  assert.equal(r.adFinished(t2, 'yes'), 'back', 'only the boolean true counts as completed');
  const t3 = r.startAd();
  assert.equal(r.adFinished(t3, true), 'revived');
  assert.equal(r.adFinished(t3, true), 'ignored', 'the same answer twice');
  assert.deepEqual([r.used, r.adsUsed, r.state], [1, 1, 'idle']);
});

test('revive by ad: limited per run, the crown price still grows after an ad revive', () => {
  const r = new ReviveSession();
  for (let i = 0; i < CFG.revive.maxAds; i++) {
    assert.equal(r.offer(), true);
    assert.equal(r.adFinished(r.startAd(), true), 'revived');
  }
  if (r.offer()) {
    assert.equal(r.adAllowed, false);
    assert.equal(r.startAd(), null);
    assert.equal(r.cost, CFG.revive.costs[CFG.revive.maxAds]);
  }
});

test('revive: restart during the ad (cancel) -> the late answer of the ad does nothing', () => {
  const r = new ReviveSession();
  r.offer();
  const token = r.startAd();
  r.cancel();
  assert.equal(r.adFinished(token, true), 'ignored');
  assert.equal(r.used, 0);
  assert.equal(r.offer(), false, 'a cancelled session never offers again');
  assert.equal(r.available, false);
});

test('revive: decline ends the run for good', () => {
  const r = new ReviveSession();
  r.offer();
  assert.equal(r.decline(), true);
  assert.equal(r.decline(), false);
  assert.equal(r.offer(), false);
  assert.equal(r.payCrowns({ coins: 0, crowns: 100 }).ok, false);
});

// ---- mock ad -----------------------------------------------------------------------------------

test('mock ad: completes only after the full length was WATCHED; it cannot be skipped', () => {
  const s = new MockAdSession(5);
  for (let i = 0; i < 48; i++) s.tick(0.1); // 4.8 s watched
  assert.equal(s.state, 'playing');
  assert.equal(s.rewardEarned, false);
  assert.ok(s.remaining > 0.1 && s.remaining < 0.3, String(s.remaining));
  s.tick(0.1);
  s.tick(0.1);
  assert.equal(s.state, 'completed');
  assert.equal(s.rewardEarned, true);
  assert.equal(s.remaining, 0);
});

test('mock ad: time in the background does not count, and one huge step cannot finish it', () => {
  const s = new MockAdSession(5);
  s.tick(1000); // a suspended tab waking up
  assert.ok(s.watched <= 1);
  s.setVisible(false);
  for (let i = 0; i < 1000; i++) s.tick(0.1);
  assert.ok(s.watched <= 1, 'hidden time is not watched time');
  s.setVisible(true);
  for (const bad of [NaN, -5, Infinity, undefined]) s.tick(bad);
  assert.ok(s.watched <= 1);
  assert.equal(s.state, 'playing');
});

test('mock ad: cancelled -> no reward, and it cannot complete afterwards', () => {
  const s = new MockAdSession(1);
  s.tick(0.2);
  assert.equal(s.cancel(), 'cancelled');
  for (let i = 0; i < 100; i++) s.tick(0.1);
  assert.equal(s.rewardEarned, false);
  const done = new MockAdSession(0.2);
  done.tick(0.25);
  assert.equal(done.cancel(), 'completed', 'cancelling after the end does not take the reward away');
});

/** A provider with a hand-driven clock: `run(seconds)` advances time and fires the scheduled steps. */
function fakeProvider(opts = {}) {
  let t = 0;
  let queue = [];
  const env = { online: true, visible: true, opened: 0, closed: 0 };
  const provider = new MockAdProvider({
    duration: 5,
    needsNetwork: true,
    isOnline: () => env.online,
    isVisible: () => env.visible,
    now: () => t,
    schedule: (fn) => queue.push(fn),
    view: { open: () => env.opened++, update() {}, close: () => env.closed++ },
    ...opts,
  });
  const run = (seconds) => {
    for (let i = 0; i < seconds * 10; i++) {
      t += 100;
      const q = queue;
      queue = [];
      for (const fn of q) fn();
    }
  };
  return { provider, env, run };
}

test('provider: a watched ad resolves completed = true and closes the ad screen', async () => {
  const { provider, env, run } = fakeProvider();
  const p = provider.showRewarded();
  assert.deepEqual(provider.isAvailable(), { ok: false, reason: 'busy' });
  run(4);
  assert.equal(env.closed, 0);
  run(1.5);
  assert.deepEqual(await p, { completed: true });
  assert.deepEqual([env.opened, env.closed], [1, 1]);
  assert.deepEqual(provider.isAvailable(), { ok: true });
});

test('provider: tab in the background pauses the ad; it finishes only after coming back', async () => {
  const { provider, env, run } = fakeProvider();
  let result = null;
  provider.showRewarded().then((r) => (result = r));
  run(2);
  env.visible = false;
  run(60);
  await Promise.resolve();
  assert.equal(result, null, 'a minute in the background did not finish the ad');
  env.visible = true;
  run(3.5);
  await Promise.resolve();
  assert.deepEqual(result, { completed: true });
});

test('provider: offline -> no ad (like a real network), cancel -> no reward, two ads at once are refused', async () => {
  const { provider, env, run } = fakeProvider();
  env.online = false;
  assert.deepEqual(provider.isAvailable(), { ok: false, reason: 'offline' });
  assert.deepEqual(await provider.showRewarded(), { completed: false, reason: 'offline' });
  assert.equal(env.opened, 0);
  env.online = true;
  const p1 = provider.showRewarded();
  assert.deepEqual(await provider.showRewarded(), { completed: false, reason: 'busy' }, 'double tap');
  run(2);
  provider.cancel();
  provider.cancel();
  assert.deepEqual(await p1, { completed: false, reason: 'cancelled' });
  run(10);
  assert.deepEqual([env.opened, env.closed], [1, 1], 'a cancelled ad never comes back to life');
  const offlineOk = fakeProvider({ needsNetwork: false });
  offlineOk.env.online = false;
  assert.deepEqual(offlineOk.provider.isAvailable(), { ok: true });
});
