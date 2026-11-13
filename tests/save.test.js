import test from 'node:test';
import assert from 'node:assert/strict';
import { createSaveStore, sanitizeState, defaultState, migrate, readLegacy, SAVE_KEY, BACKUP_KEY, CORRUPT_KEY, NEWER_KEY, SAVE_VERSION, LEGACY_KEYS } from '../src/logic/save.js';
import { createLeaderboard } from '../src/logic/leaderboard.js';
import { Meta } from '../src/logic/meta.js';
import * as Pass from '../src/logic/battlepass.js';
import { emptyRunStats } from '../src/logic/missions.js';
import { CFG } from '../src/config.js';

const NOW = () => new Date(2026, 10, 9, 12);

function memStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => void m.set(k, String(v)),
    removeItem: (k) => void m.delete(k),
    _m: m,
  };
}

test('fresh start: valid default state, nothing written until something changes', () => {
  const st = memStorage();
  const store = createSaveStore({ storage: st, now: NOW });
  assert.equal(store.status.loaded, 'fresh');
  assert.equal(store.status.mode, 'storage');
  assert.equal(store.state.v, SAVE_VERSION);
  assert.deepEqual(store.state.wallet, { coins: 0, crowns: 0 });
  assert.equal(st._m.size, 0);
  store.update((s) => (s.wallet.coins = 42));
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).wallet.coins, 42);
});

test('round trip: what was saved is what loads, and the document has a version', () => {
  const st = memStorage();
  const a = createSaveStore({ storage: st, now: NOW });
  a.update((s) => {
    s.wallet = { coins: 1234, crowns: 56 };
    s.cosmetics.owned.boy.push('schior');
    s.cosmetics.equipped.boy = 'schior';
    s.pass.xp = 500;
    s.settings.name = 'Marius';
    s.stats.runs = 7;
  });
  const b = createSaveStore({ storage: st, now: NOW });
  assert.equal(b.status.loaded, 'ok');
  assert.deepEqual(b.state, a.state);
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).v, SAVE_VERSION);
  assert.ok(st._m.has(BACKUP_KEY), 'a backup of the last good state is kept');
});

test('update from v1: leaderboard, name and mute are imported; the old keys are left alone', () => {
  const v1board = JSON.stringify([{ id: 'a', name: 'Nutu', score: 4321, coins: 10, distance: 4000, date: '2026-10-30T10:00:00.000Z' }, { name: 'Bad', score: -1 }]);
  const st = memStorage({ [LEGACY_KEYS.leaderboard]: v1board, [LEGACY_KEYS.name]: 'Nutu', [LEGACY_KEYS.muted]: '1' });
  const store = createSaveStore({ storage: st, now: NOW });
  assert.equal(store.status.loaded, 'migrated');
  assert.deepEqual(store.state.leaderboard.map((e) => [e.name, e.score]), [['Nutu', 4321]]);
  assert.equal(store.state.settings.name, 'Nutu');
  assert.equal(store.state.settings.muted, true);
  assert.ok(st._m.has(SAVE_KEY), 'the migrated document is written at once');
  assert.equal(st._m.get(LEGACY_KEYS.leaderboard), v1board, 'v1 data is not deleted (a downgrade still works)');
  // second start: the v2 document wins, the migration does not run again
  store.update((s) => (s.settings.name = 'Altul'));
  assert.equal(createSaveStore({ storage: st, now: NOW }).state.settings.name, 'Altul');
});

test('update from v1 with a corrupted old leaderboard: still starts, empty board', () => {
  const st = memStorage({ [LEGACY_KEYS.leaderboard]: '{{{not json', [LEGACY_KEYS.muted]: 'banana' });
  const store = createSaveStore({ storage: st, now: NOW });
  assert.deepEqual(store.state.leaderboard, []);
  assert.equal(store.state.settings.muted, false);
});

test('migrate(): old versions are upgraded step by step, garbage becomes an empty document', () => {
  assert.equal(migrate({ v: 1, leaderboard: [] }).v, SAVE_VERSION);
  assert.equal(migrate({ leaderboard: [] }).v, SAVE_VERSION, 'no version = version 1');
  assert.equal(migrate(null).v, SAVE_VERSION);
  assert.equal(migrate({ v: -3 }).v, SAVE_VERSION);
  assert.equal(migrate({ v: 'x' }).v, SAVE_VERSION);
  assert.equal(readLegacy(memStorage()), null);
});

test('a save from a NEWER version: kept untouched under its own key, read as well as possible', () => {
  const future = JSON.stringify({ v: SAVE_VERSION + 5, wallet: { coins: 77, crowns: 3, diamonds: 9 }, guilds: ['x'] });
  const st = memStorage({ [SAVE_KEY]: future });
  const store = createSaveStore({ storage: st, now: NOW });
  assert.deepEqual(store.state.wallet, { coins: 77, crowns: 3 });
  assert.equal(st._m.get(NEWER_KEY), future);
  assert.equal(store.state.v, SAVE_VERSION);
});

test('corrupted save: the broken text is kept aside and the backup is used', () => {
  const st = memStorage();
  const a = createSaveStore({ storage: st, now: NOW });
  a.update((s) => (s.wallet.coins = 900));
  createSaveStore({ storage: st, now: NOW }); // a clean start writes the backup
  st.setItem(SAVE_KEY, '{"v":2,"wallet":{"coins":9'); // truncated
  const b = createSaveStore({ storage: st, now: NOW });
  assert.equal(b.status.loaded, 'backup');
  assert.equal(b.state.wallet.coins, 900);
  assert.equal(st._m.get(CORRUPT_KEY), '{"v":2,"wallet":{"coins":9');
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).wallet.coins, 900, 'the main copy is repaired');
});

test('corrupted save and no backup: fresh state, no crash, for every kind of garbage', () => {
  for (const junk of ['', 'null', '42', '"text"', '[]', '[1,2]', '{', 'undefined', '\u0000\u0001', 'x'.repeat(300000)]) {
    const st = memStorage({ [SAVE_KEY]: junk });
    const store = createSaveStore({ storage: st, now: NOW });
    assert.deepEqual(store.state.wallet, { coins: 0, crowns: 0 }, JSON.stringify(junk.slice(0, 10)));
    assert.ok(['reset', 'fresh', 'ok'].includes(store.status.loaded), store.status.loaded);
    assert.doesNotThrow(() => store.update((s) => (s.wallet.coins = 1)));
  }
});

test('strict validation: every field of an edited save is checked and repaired', () => {
  const s = sanitizeState(
    {
      v: 2,
      wallet: { coins: -50, crowns: 1e30 },
      cosmetics: { owned: { boy: ['mascota', 'cheat'] }, equipped: { boy: 'cheat', bear: 'craciun' } },
      pass: { season: 0, xp: 10, premium: true, claimed: { free: [1, 2, 3], premium: [40] } },
      leaderboard: [{ name: '<script>', score: 5 }, { score: 'x' }, null],
      settings: { muted: 'yes', name: '   ', startBiome: 99 },
      stats: { runs: -1, bestScore: NaN },
      extra: { evil: true },
    },
    NOW(),
  );
  assert.deepEqual(s.wallet, { coins: 0, crowns: CFG.economy.maxCrowns });
  assert.deepEqual(s.cosmetics.owned.boy, ['clasic', 'mascota']);
  assert.deepEqual([s.cosmetics.equipped.boy, s.cosmetics.equipped.bear], ['clasic', 'brun']);
  assert.deepEqual(s.pass.claimed, { free: [], premium: [] }, '10 XP reached no tier, so nothing can be claimed');
  assert.deepEqual(s.leaderboard.map((e) => e.name), ['script']);
  assert.deepEqual(s.settings, { muted: false, name: '', startBiome: 4, music: true, hints: 0 });
  assert.deepEqual([s.stats.runs, s.stats.bestScore], [0, 0]);
  assert.equal(s.extra, undefined);
  assert.deepEqual(sanitizeState(undefined, NOW()), defaultState(NOW()));
});

test('storage blocked (every call throws): the game runs from memory and says so', () => {
  const blocked = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('SecurityError');
    },
    removeItem() {
      throw new Error('SecurityError');
    },
  };
  const store = createSaveStore({ storage: blocked, now: NOW });
  assert.equal(store.status.mode, 'memory');
  assert.doesNotThrow(() => store.update((s) => (s.wallet.coins = 5)));
  assert.equal(store.state.wallet.coins, 5, 'progress lives on in memory');
  assert.equal(store.status.writeOk, false);
  assert.doesNotThrow(() => store.reload());
  assert.doesNotThrow(() => store.reset());
});

test('no storage at all (null): memory mode', () => {
  const store = createSaveStore({ storage: null, now: NOW });
  assert.equal(store.status.mode, 'memory');
  store.update((s) => (s.wallet.crowns = 3));
  assert.equal(store.state.wallet.crowns, 3);
  assert.equal(store.status.writeOk, true, 'the in-memory fallback accepts the write');
});

test('storage full: the backup is dropped to make room; if that is not enough the state stays in memory', () => {
  const st = memStorage();
  const a = createSaveStore({ storage: st, now: NOW });
  a.update((s) => (s.wallet.coins = 10));
  createSaveStore({ storage: st, now: NOW }); // writes the backup
  assert.ok(st._m.has(BACKUP_KEY));
  // quota: writes fail while the backup exists
  const quota = { ...st, setItem: (k, v) => { if (st._m.has(BACKUP_KEY)) throw new Error('QuotaExceededError'); st.setItem(k, v); } };
  const b = createSaveStore({ storage: quota, now: NOW });
  b.update((s) => (s.wallet.coins = 20));
  assert.equal(b.status.writeOk, true);
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).wallet.coins, 20);
  assert.equal(st._m.has(BACKUP_KEY), false);
  // quota: every write fails
  const full = { ...st, setItem: () => { throw new Error('QuotaExceededError'); } };
  const c = createSaveStore({ storage: full, now: NOW });
  assert.equal(c.state.wallet.coins, 20, 'reading still works');
  c.update((s) => (s.wallet.coins = 30));
  assert.equal(c.status.writeOk, false);
  assert.equal(c.state.wallet.coins, 30);
  assert.match(c.status.lastError, /Quota/);
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).wallet.coins, 20, 'the last good copy on disk is not damaged');
});

test('two tabs: reload() takes the newer state of the other tab instead of overwriting it', () => {
  const st = memStorage();
  const tabA = createSaveStore({ storage: st, now: NOW });
  const tabB = createSaveStore({ storage: st, now: NOW });
  tabA.update((s) => (s.wallet.coins = 100));
  assert.equal(tabB.state.wallet.coins, 0);
  assert.equal(tabB.reload(), true);
  assert.equal(tabB.state.wallet.coins, 100);
  assert.equal(tabB.reload(), false, 'nothing new');
  st.setItem(SAVE_KEY, 'garbage');
  assert.equal(tabB.reload(), false, 'a broken copy from elsewhere is ignored');
  assert.equal(tabB.state.wallet.coins, 100);
});

test('the leaderboard is stored inside the same document (one persistence module)', () => {
  const st = memStorage();
  const store = createSaveStore({ storage: st, now: NOW });
  const lb = createLeaderboard(store.leaderboardStorage());
  lb.add({ name: 'Ana', score: 300 });
  lb.add({ name: 'Bogdan', score: 500 });
  assert.deepEqual([...st._m.keys()], [SAVE_KEY]);
  const again = createLeaderboard(createSaveStore({ storage: st, now: NOW }).leaderboardStorage());
  assert.deepEqual(again.getTop().map((e) => e.name), ['Bogdan', 'Ana']);
  lb.clear();
  assert.deepEqual(store.state.leaderboard, []);
});

test('reset() wipes progress', () => {
  const st = memStorage();
  const store = createSaveStore({ storage: st, now: NOW });
  store.update((s) => (s.wallet.coins = 999));
  store.reset();
  assert.equal(store.state.wallet.coins, 0);
  assert.equal(createSaveStore({ storage: st, now: NOW }).state.wallet.coins, 0);
});

// ---- Meta: the pieces together -----------------------------------------------------------------

function newMeta(date = new Date(2026, 10, 9, 12), st = memStorage()) {
  const clock = { now: date };
  const store = createSaveStore({ storage: st, now: () => clock.now });
  return { meta: new Meta({ store, now: () => clock.now }), store, st, clock };
}
const bigRun = (o = {}) => ({ ...emptyRunStats(), coins: 5000, jumps: 500, distance: 99999, slides: 500, powers: 50, escapes: 50, laneChanges: 500, score: 99999, cleanSeconds: 999, portals: 9, ...o });

test('meta: a run gives pass XP (capped), counts for missions and statistics, and is saved', () => {
  const { meta, st } = newMeta();
  assert.equal(meta.runXp(emptyRunStats()), CFG.xp.perRun);
  assert.equal(meta.runXp({ runs: 1, distance: 1000, portals: 1 }), CFG.xp.perRun + 10 * CFG.xp.per100m + CFG.xp.perPortal);
  assert.equal(meta.runXp({ runs: 0, distance: 0 }), 0, 'an abandoned run gives no flat XP (restart spam is worth nothing)');
  assert.equal(meta.runXp({ runs: 0, distance: 1000 }), 10 * CFG.xp.per100m, '...only what was really played');
  assert.equal(meta.runXp(bigRun()), CFG.xp.maxPerRun);
  const res = meta.endRun(bigRun({ distance: 1000, portals: 0, score: 1500, coins: 50 }));
  assert.equal(res.xp, CFG.xp.perRun + 10 * CFG.xp.per100m);
  assert.ok(res.completed.every((c) => typeof c.text === 'string' && c.text.length > 3));
  assert.deepEqual([meta.state.stats.runs, meta.state.stats.bestScore, meta.state.stats.totalDistance], [1, 1500, 1000]);
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).stats.runs, 1);
  assert.doesNotThrow(() => meta.endRun(null));
});

test('meta: mission rewards go to the wallet and the pass; claiming twice pays once', () => {
  const { meta } = newMeta();
  meta.endRun(bigRun());
  const id = meta.missions.daily.list[0].id;
  const xp0 = meta.pass.xp;
  const granted = meta.claimMission('daily', id);
  assert.deepEqual(granted.map((g) => g.type).sort(), ['coins', 'xp']);
  assert.equal(meta.wallet.coins, CFG.missions.reward.daily.coins);
  assert.equal(meta.pass.xp, xp0 + CFG.missions.reward.daily.xp);
  assert.equal(meta.claimMission('daily', id), null);
  assert.equal(meta.wallet.coins, CFG.missions.reward.daily.coins);
  for (const e of [...meta.missions.daily.list]) meta.claimMission('daily', e.id);
  assert.equal(meta.wallet.crowns, 0);
  assert.ok(meta.claimDailyBonus());
  assert.equal(meta.wallet.crowns, CFG.missions.reward.dailyBonus.crowns);
  assert.equal(meta.claimDailyBonus(), null);
});

test('meta: premium pass is bought with crowns only, once; not affordable -> nothing happens', () => {
  const { meta } = newMeta();
  assert.deepEqual(meta.buyPremiumPass(), { ok: false, reason: 'funds' });
  meta.wallet.coins = 9999999;
  assert.deepEqual(meta.buyPremiumPass(), { ok: false, reason: 'funds' }, 'coins cannot buy it');
  meta.wallet.crowns = CFG.pass.premiumCost + 5;
  assert.deepEqual(meta.buyPremiumPass(), { ok: true });
  assert.equal(meta.wallet.crowns, 5);
  assert.deepEqual(meta.buyPremiumPass(), { ok: false, reason: 'owned' });
  assert.equal(meta.wallet.crowns, 5);
});

test('meta: pass rewards - coins, crowns and items; an item already owned becomes coins', () => {
  const { meta } = newMeta();
  Pass.addXp(meta.pass, Pass.maxXp());
  meta.wallet.crowns = CFG.pass.premiumCost;
  meta.buyPremiumPass();
  // the last free tier = the skier skin; buy it first in the shop, then claim it from the pass
  meta.wallet.coins = 1500;
  assert.deepEqual(meta.buy('boy', 'schior'), { ok: true });
  const dup = meta.claimPass(CFG.pass.tiers, 'free');
  assert.deepEqual(dup, [{ type: 'item', kind: 'boy', id: 'schior', name: 'Schior din Poiana', duplicate: true, coins: 750 }]);
  assert.equal(meta.wallet.coins, 750);
  assert.equal(meta.claimPass(CFG.pass.tiers, 'free'), null);
  const bear = meta.claimPass(CFG.pass.tiers, 'premium');
  assert.deepEqual([bear[0].type, bear[0].kind, bear[0].id, bear[0].duplicate], ['item', 'bear', 'craciun', false]);
  assert.equal(meta.equip('bear', 'craciun'), true);
  const all = meta.claimAllPass();
  assert.equal(all.length, CFG.pass.tiers * 2 - 2);
  assert.equal(meta.claimAllPass().length, 0);
  assert.equal(meta.wallet.crowns, Pass.totalCrowns('free') + Pass.totalCrowns('premium'));
  assert.equal(meta.badges().pass, 0);
  for (const kind of ['boy', 'bear']) assert.equal(meta.cosmetics.owned[kind].length, 2, `exactly one ${kind} skin comes from a whole pass`);
});

test('meta: the whole season can be played for free - a free player can afford the next premium pass', () => {
  const { meta, clock } = newMeta(new Date(CFG.pass.epoch[0], CFG.pass.epoch[1] - 1, CFG.pass.epoch[2], 12));
  for (let day = 0; day < CFG.pass.seasonDays; day++) {
    clock.now = new Date(CFG.pass.epoch[0], CFG.pass.epoch[1] - 1, CFG.pass.epoch[2] + day, 12);
    meta.sync();
    meta.endRun(bigRun());
    for (const scope of ['daily', 'weekly']) for (const e of [...meta.missions[scope].list]) meta.claimMission(scope, e.id);
    meta.claimDailyBonus();
    meta.claimAllPass();
  }
  assert.equal(meta.pass.premium, false);
  assert.equal(meta.passInfo().tier, CFG.pass.tiers, 'daily play finishes the pass');
  assert.ok(meta.wallet.crowns >= CFG.pass.premiumCost, `${meta.wallet.crowns} crowns after a free season`);
});

test('meta.sync: new day and new season; unclaimed rewards arrive automatically; clock back gives nothing', () => {
  const { meta, clock } = newMeta(new Date(CFG.pass.epoch[0], CFG.pass.epoch[1] - 1, CFG.pass.epoch[2], 12));
  meta.endRun(bigRun());
  Pass.addXp(meta.pass, CFG.pass.xpPerTier * 4); // tiers reached, nothing claimed
  const coins0 = meta.wallet.coins;
  clock.now = new Date(CFG.pass.epoch[0], CFG.pass.epoch[1] - 1, CFG.pass.epoch[2] + CFG.pass.seasonDays, 9);
  const res = meta.sync();
  assert.deepEqual(res.rolled.sort(), ['daily', 'season', 'weekly']);
  assert.ok(res.granted.length >= 7, 'missions + pass tiers were claimed automatically');
  assert.ok(meta.wallet.coins > coins0);
  assert.equal(meta.pass.season, 1);
  const wallet = { ...meta.wallet };
  clock.now = new Date(CFG.pass.epoch[0], CFG.pass.epoch[1] - 1, CFG.pass.epoch[2], 12); // back to season 0
  const back = meta.sync();
  assert.deepEqual(back.rolled, []);
  assert.deepEqual(back.granted, []);
  assert.deepEqual(meta.wallet, wallet);
  assert.equal(meta.sync().changed, false);
});

test('meta: bank() adds run currency at once; shop and equip are saved', () => {
  const { meta, st } = newMeta();
  meta.bank({ coins: 120, crowns: 1 });
  meta.bank({ coins: -5, crowns: NaN });
  meta.bank();
  assert.deepEqual(meta.wallet, { coins: 120, crowns: 1 });
  assert.deepEqual(meta.buy('emoji', 'urs'), { ok: false, reason: 'funds' });
  meta.bank({ coins: 300 });
  assert.deepEqual(meta.buy('emoji', 'urs'), { ok: true });
  assert.equal(meta.equip('emoji', 'urs'), true);
  assert.equal(meta.equip('emoji', 'coroana'), false);
  const disk = JSON.parse(st._m.get(SAVE_KEY));
  assert.equal(disk.cosmetics.equipped.emoji, 'urs');
  assert.equal(disk.wallet.coins, 120);
});

test('meta: an abandoned run (runs: 0) keeps its progress but is not counted as a played run', () => {
  const { meta } = newMeta();
  meta.endRun({ ...emptyRunStats(), runs: 0, coins: 40, distance: 500, jumps: 12 });
  assert.equal(meta.state.stats.runs, 0, 'regression: every endRun used to count as a run');
  assert.equal(meta.state.stats.totalCoins, 40);
  meta.endRun({ ...emptyRunStats(), coins: 10 });
  assert.equal(meta.state.stats.runs, 1);
});

test('two tabs: changes made in both are merged, not overwritten (wallet, missions, leaderboard)', () => {
  const st = memStorage();
  const a = newMeta(undefined, st);
  const b = newMeta(undefined, st);
  a.meta.bank({ coins: 100, crowns: 2 });
  b.meta.bank({ coins: 30 }); // tab B never saw A's save, but it must not wipe it
  assert.deepEqual(b.meta.wallet, { coins: 130, crowns: 2 });
  a.meta.endRun(bigRun());
  for (const e of [...a.meta.missions.daily.list]) a.meta.claimMission('daily', e.id);
  const coins = a.meta.wallet.coins;
  assert.equal(coins, 130 + 3 * CFG.missions.reward.daily.coins);
  assert.equal(b.meta.claimMission('daily', b.meta.missions.daily.list[0].id), null, 'already claimed in the other tab');
  assert.equal(b.meta.wallet.coins, coins);
  const lbA = createLeaderboard(a.store.leaderboardStorage());
  const lbB = createLeaderboard(b.store.leaderboardStorage());
  lbA.add({ name: 'Ana', score: 500 });
  lbB.add({ name: 'Bogdan', score: 700 });
  assert.deepEqual(lbA.getTop().map((e) => e.name), ['Bogdan', 'Ana']);
  assert.equal(JSON.parse(st._m.get(SAVE_KEY)).wallet.coins, coins, 'saving the leaderboard did not roll the wallet back');
});
