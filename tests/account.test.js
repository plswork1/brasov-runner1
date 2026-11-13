import test from 'node:test';
import assert from 'node:assert/strict';
import { createSaveStore, SAVE_KEY, SESSION_KEY, profileOf, cleanProfile, sanitizeSession } from '../src/logic/save.js';
import { Meta } from '../src/logic/meta.js';
import { Account } from '../src/cloud/account.js';
import { createMockCloud } from '../src/cloud/mockCloud.js';
import { LOGIN_PROVIDERS, FIREBASE_CONFIG } from '../src/cloud/config.js';

const NOW = () => new Date(2026, 10, 10, 12);

function memStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => void m.set(k, String(v)), removeItem: (k) => void m.delete(k), _m: m };
}

/** One "device": its own storage, store, meta and account, talking to a shared fake server. */
function device(server, { storage = memStorage() } = {}) {
  const store = createSaveStore({ storage, now: NOW });
  const meta = new Meta({ store, now: NOW });
  const env = { online: true, playing: false, events: [], timers: [] };
  const { auth, cloud } = createMockCloud({ slot: server, sessionSlot: store.sideSlot('mockSession'), isOnline: () => env.online });
  const account = new Account({ store, auth, cloud, canSwitch: () => !env.playing, onChange: (e) => env.events.push(e.type), schedule: (fn) => env.timers.push(fn) });
  const idle = async () => {
    for (let i = 0; i < 6; i++) {
      await account.chain;
      for (const fn of env.timers.splice(0)) fn();
    }
    await account.chain;
  };
  return { store, meta, account, env, storage, idle };
}
function newServer() {
  let text = '';
  return { read: () => text, write: (t) => void (text = t), db: () => JSON.parse(text || '{}') };
}

test('config: sign-in is Google only (free); Apple is ready in the code but switched off', () => {
  assert.ok(FIREBASE_CONFIG === null || typeof FIREBASE_CONFIG.projectId === 'string');
  assert.deepEqual(LOGIN_PROVIDERS, ['google']);
});

test('profiles: the guest and every account have separate save slots', () => {
  assert.equal(profileOf('abc_DEF-123'), 'u.abc_DEF-123');
  assert.match(profileOf('weird id/#'), /^u\.[0-9a-f]+$/);
  assert.equal(profileOf(''), 'guest');
  assert.equal(cleanProfile('u.x'), 'u.x');
  for (const bad of ['', 'guest2', 'u.', 'u.a b', '../x', null, 7, 'u.' + 'a'.repeat(200)]) assert.equal(cleanProfile(bad), 'guest', String(bad));
  const st = memStorage();
  const store = createSaveStore({ storage: st, now: NOW });
  store.update((s) => (s.wallet.coins = 50));
  assert.equal(store.hasProfile('u.ana'), false);
  store.switchProfile('u.ana');
  assert.equal(store.profile, 'u.ana');
  assert.equal(store.state.wallet.coins, 0, 'a new slot starts empty');
  store.update((s) => (s.wallet.coins = 900));
  store.switchProfile('guest');
  assert.equal(store.state.wallet.coins, 50, 'the guest progress is untouched');
  store.switchProfile('u.ana');
  assert.equal(store.state.wallet.coins, 900);
  assert.ok(st._m.has(SAVE_KEY) && st._m.has(`${SAVE_KEY}.u.ana`));
  // the next start opens the slot of whoever played last
  assert.equal(createSaveStore({ storage: st, now: NOW }).state.wallet.coins, 900);
  assert.equal(JSON.parse(st._m.get(SESSION_KEY)).profile, 'u.ana');
});

test('session data is validated like every other stored value', () => {
  assert.deepEqual(sanitizeSession(null), { profile: 'guest', name: '', provider: '', welcomed: false });
  assert.deepEqual(sanitizeSession({ profile: '../../x', name: 'A'.repeat(99), provider: 5, welcomed: 'yes' }), { profile: 'guest', name: 'A'.repeat(40), provider: '', welcomed: false });
  const store = createSaveStore({ storage: memStorage({ [SESSION_KEY]: '{broken' }), now: NOW });
  assert.equal(store.profile, 'guest');
});

test('revision: goes up by one for every real change, not for saves without a change', () => {
  const store = createSaveStore({ storage: memStorage(), now: NOW });
  assert.equal(store.state.sync.rev, 0);
  store.update((s) => (s.wallet.coins = 1));
  store.save();
  store.save();
  assert.equal(store.state.sync.rev, 1);
  store.update((s) => (s.wallet.coins = 2));
  assert.equal(store.state.sync.rev, 2);
  assert.equal(store.state.sync.at, NOW().getTime());
});

test('guest: nothing is uploaded and the welcome screen is asked for once', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  assert.equal(d.account.needsWelcome, true);
  d.account.playAsGuest();
  assert.equal(d.account.needsWelcome, false);
  d.meta.bank({ coins: 10 });
  await d.idle();
  assert.equal(d.account.user, null);
  assert.equal(d.account.status, 'guest');
  assert.deepEqual(server.db().saves ?? {}, {});
  assert.equal(device(server, { storage: d.storage }).account.needsWelcome, false, 'remembered on this device');
});

test('first sign-in: the guest progress is carried into the new account and uploaded', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  d.meta.bank({ coins: 250, crowns: 3 });
  assert.deepEqual(await d.account.signIn('google'), { ok: true });
  await d.idle();
  assert.equal(d.account.user.uid, 'mock-google');
  assert.equal(d.store.profile, 'u.mock-google');
  assert.deepEqual(d.meta.wallet, { coins: 250, crowns: 3 });
  assert.ok(d.env.events.includes('signed-in') && d.env.events.includes('carried'), d.env.events.join());
  assert.equal(d.account.status, 'synced');
  assert.deepEqual(server.db().saves['mock-google'].wallet, { coins: 250, crowns: 3 });
});

test('progress made while signed in is uploaded a moment later (debounced), not on every change', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  await d.account.signIn('google');
  await d.idle();
  let saves = 0;
  const realSave = d.account.cloud.save;
  d.account.cloud.save = (...a) => (saves++, realSave(...a));
  d.meta.bank({ coins: 5 });
  d.meta.bank({ coins: 5 });
  d.meta.bank({ coins: 5 });
  assert.equal(d.env.timers.length, 1, 'three changes, one upload scheduled');
  await d.idle();
  assert.equal(saves, 1);
  assert.equal(server.db().saves['mock-google'].wallet.coins, 15);
});

test('second device: signing in brings the progress of the account, the local guest progress stays in its own slot', async () => {
  const server = newServer();
  const a = device(server);
  await a.account.start();
  a.meta.bank({ coins: 1000, crowns: 20 });
  await a.account.signIn('google');
  await a.idle();
  a.meta.buy('emoji', 'urs');
  await a.idle();

  const b = device(server); // another phone, played a little as a guest
  await b.account.start();
  b.meta.bank({ coins: 77 });
  await b.account.signIn('google');
  await b.idle();
  assert.deepEqual(b.meta.wallet, { coins: 700, crowns: 20 }, 'the account wins on a device that never used it');
  assert.ok(b.meta.cosmetics.owned.emoji.includes('urs'));
  assert.ok(b.env.events.includes('pulled'));
  await b.account.signOut();
  await b.idle();
  assert.equal(b.store.profile, 'guest');
  assert.equal(b.meta.wallet.coins, 77, 'the guest progress of this device was not lost or mixed in');
  assert.ok(b.env.events.includes('signed-out'));
});

test('two devices, same account: the newest revision wins, an older device takes the newer copy', async () => {
  const server = newServer();
  const a = device(server);
  const b = device(server);
  for (const d of [a, b]) {
    await d.account.start();
    await d.account.signIn('apple');
    await d.idle();
  }
  a.meta.bank({ coins: 100 });
  a.meta.bank({ coins: 100 });
  await a.idle(); // the account now has 200 coins at a higher revision
  b.meta.bank({ coins: 1 }); // B is behind and tries to upload
  await b.idle();
  assert.equal(b.meta.wallet.coins, 200, 'B took the newer copy instead of overwriting it');
  assert.equal(server.db().saves['mock-apple'].wallet.coins, 200);
  assert.ok(b.env.events.includes('pulled'));
  // coming back to the foreground also picks up a newer copy
  a.meta.bank({ coins: 50 });
  await a.idle();
  await b.account.refresh();
  assert.equal(b.meta.wallet.coins, 250);
});

test('offline: the game keeps the progress on the device and uploads it when the network is back', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  await d.account.signIn('google');
  await d.idle();
  d.env.online = false;
  d.meta.bank({ coins: 40 });
  await d.idle();
  assert.equal(d.account.status, 'offline');
  assert.equal(d.meta.wallet.coins, 40);
  assert.equal(server.db().saves['mock-google'].wallet.coins, 0);
  assert.deepEqual(await d.account.signIn('apple'), { ok: false, reason: 'offline' });
  // restart of the app while offline: still signed in (remembered session), progress from the device
  const again = device(server, { storage: d.storage });
  again.env.online = false;
  await again.account.start();
  await again.idle();
  assert.equal(again.account.user?.uid, 'mock-google');
  assert.equal(again.meta.wallet.coins, 40);
  again.env.online = true;
  again.meta.bank({ coins: 1 });
  await again.idle();
  assert.equal(again.account.status, 'synced');
  assert.equal(server.db().saves['mock-google'].wallet.coins, 41);
});

test('first sign-in while the account cannot be read: the cloud copy still wins when it becomes reachable', async () => {
  const server = newServer();
  const a = device(server);
  await a.account.start();
  await a.account.signIn('google');
  await a.idle();
  a.meta.bank({ coins: 500 });
  await a.idle();
  const b = device(server);
  await b.account.start();
  b.meta.bank({ coins: 9 });
  b.meta.bank({ coins: 9 });
  b.meta.bank({ coins: 9 });
  b.meta.bank({ coins: 9 }); // local revision is higher than the cloud one
  const load = b.account.cloud.load;
  b.account.cloud.load = async () => {
    throw new Error('network');
  };
  await b.account.signIn('google');
  await b.idle();
  assert.equal(b.account.status, 'offline');
  b.account.cloud.load = load;
  await b.account.refresh();
  assert.equal(b.meta.wallet.coins, 500, 'the 500 coins of the account were not overwritten by the guest copy');
});

test('nothing is switched in the middle of a run: the account change waits for the menu', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  d.meta.bank({ coins: 5 });
  d.env.playing = true;
  await d.account.signIn('google');
  await d.idle();
  assert.equal(d.store.profile, 'guest', 'still the guest slot while playing');
  assert.equal(d.account.user, null);
  d.env.playing = false;
  d.account.resume();
  await d.idle();
  assert.equal(d.store.profile, 'u.mock-google');
  assert.equal(d.account.user.uid, 'mock-google');
});

test('double tap on a sign-in button opens one sign-in; unknown providers are refused', async () => {
  const server = newServer();
  const d = device(server);
  await d.account.start();
  let release;
  const real = d.account.auth.signIn;
  d.account.auth.signIn = (p) => new Promise((res) => (release = () => res(real(p))));
  const first = d.account.signIn('google');
  assert.deepEqual(await d.account.signIn('google'), { ok: false, reason: 'busy' });
  release();
  assert.deepEqual(await first, { ok: true });
  d.account.auth.signIn = real;
  assert.deepEqual(await d.account.signIn('facebook'), { ok: false, reason: 'unavailable' });
  d.account.auth.signIn = async () => {
    throw new Error('popup exploded');
  };
  assert.deepEqual(await d.account.signIn('apple'), { ok: false, reason: 'error' });
});

test('a damaged or hostile cloud document is validated like any other save', async () => {
  const server = newServer();
  server.write(JSON.stringify({ saves: { 'mock-google': { v: 2, wallet: { coins: -5, crowns: 'x' }, cosmetics: { owned: { boy: ['hack'] }, equipped: { boy: 'hack' } }, sync: { rev: 99 } } } }));
  const d = device(server);
  await d.account.start();
  await d.account.signIn('google');
  await d.idle();
  assert.deepEqual(d.meta.wallet, { coins: 0, crowns: 0 });
  assert.equal(d.meta.cosmetics.equipped.boy, 'clasic');
  assert.equal(d.store.state.sync.rev, 99);
});

test('no sign-in service at all (not configured / failed to start): guest only, nothing breaks', async () => {
  const store = createSaveStore({ storage: memStorage(), now: NOW });
  const none = new Account({ store, auth: null, cloud: null });
  await none.start();
  assert.equal(none.available, false);
  assert.equal(none.needsWelcome, false);
  assert.deepEqual(await none.signIn('google'), { ok: false, reason: 'unavailable' });
  const events = [];
  const broken = new Account({ store, auth: { providers: ['google'], init: async () => { throw new Error('blocked'); }, onChange() {} }, cloud: null, onChange: (e) => events.push(e.type) });
  await broken.start();
  assert.equal(broken.available, false);
  assert.deepEqual(events, ['unavailable']);
});
