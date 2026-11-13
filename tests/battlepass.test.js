import test from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../src/logic/battlepass.js';
import { findItem } from '../src/logic/cosmetics.js';
import { CFG } from '../src/config.js';

const D = (y, m, d, h = 12) => new Date(y, m - 1, d, h);
const [EY, EM, ED] = CFG.pass.epoch;

test('season: 30-50 tiers, two tracks, a reward on every tier of both tracks', () => {
  assert.ok(CFG.pass.tiers >= 30 && CFG.pass.tiers <= 50);
  const table = P.rewardTable();
  assert.equal(table.length, CFG.pass.tiers);
  for (const row of table) {
    for (const track of P.TRACKS) {
      const r = row[track];
      const kinds = ['coins', 'crowns', 'item'].filter((k) => r[k] !== undefined);
      assert.equal(kinds.length, 1, `tier ${row.tier} ${track}`);
      if (r.item) assert.ok(findItem(r.item.kind, r.item.id), `tier ${row.tier} ${track}: ${r.item.kind}/${r.item.id} exists in the catalog`);
      else assert.ok(Number.isInteger(r.coins ?? r.crowns) && (r.coins ?? r.crowns) > 0);
    }
  }
  const kinds = new Set(table.flatMap((r) => [r.free, r.premium]).filter((r) => r.item).map((r) => r.item.kind));
  assert.deepEqual([...kinds].sort(), ['bear', 'boy', 'emoji', 'trail'], 'skins, trails and emoji are all in the pass');
});

test('honest economy: the premium track returns more crowns than it costs; the free track gives crowns too', () => {
  assert.ok(P.totalCrowns('premium') > CFG.pass.premiumCost, `${P.totalCrowns('premium')} vs ${CFG.pass.premiumCost}`);
  assert.ok(P.totalCrowns('free') >= 40);
  // free crowns of one season: free track + weekly missions + daily bonus are far more than one pass
  const weeks = CFG.pass.seasonDays / 7;
  const free = P.totalCrowns('free') + weeks * CFG.missions.weeklyCount * CFG.missions.reward.weekly.crowns + CFG.pass.seasonDays * CFG.missions.reward.dailyBonus.crowns;
  assert.ok(free >= CFG.pass.premiumCost * 1.5, `a free player earns ${free} crowns per season`);
});

test('no item appears twice in the pass', () => {
  const ids = P.rewardTable().flatMap((r) => [r.free, r.premium]).filter((r) => r.item).map((r) => `${r.item.kind}/${r.item.id}`);
  assert.equal(new Set(ids).size, ids.length);
});

test('season index and days left follow the local calendar', () => {
  assert.equal(P.seasonIndex(D(EY, EM, ED, 0)), 0);
  assert.equal(P.daysLeft(D(EY, EM, ED, 0)), CFG.pass.seasonDays);
  assert.equal(P.daysLeft(D(EY, EM, ED, 23)), CFG.pass.seasonDays, 'the whole first day shows the full length');
  assert.equal(P.daysLeft(D(EY, EM, ED + 1, 0)), CFG.pass.seasonDays - 1);
  assert.equal(P.seasonIndex(D(EY, EM, ED + CFG.pass.seasonDays - 1, 23)), 0);
  assert.equal(P.daysLeft(D(EY, EM, ED + CFG.pass.seasonDays - 1, 23)), 1, 'last day: 1 day left, never 0');
  assert.equal(P.seasonIndex(D(EY, EM, ED + CFG.pass.seasonDays, 0)), 1);
  assert.equal(P.seasonIndex(D(2020, 1, 1)), 0, 'dates before the first season never give a negative season');
  assert.equal(P.daysLeft(D(2020, 1, 1)), CFG.pass.seasonDays);
  for (let i = 0; i < 400; i++) {
    const left = P.daysLeft(D(EY, EM, ED + i));
    assert.ok(left >= 1 && left <= CFG.pass.seasonDays);
  }
  assert.match(P.seasonName(0), /^Sezonul 1: /);
});

test('xp: tiers, progress inside a tier, capped at the last tier, garbage ignored', () => {
  const pass = P.defaultPass(D(EY, EM, ED));
  assert.deepEqual(P.progress(pass), { tier: 0, into: 0, need: CFG.pass.xpPerTier, done: false });
  assert.deepEqual(P.addXp(pass, CFG.pass.xpPerTier * 2 + 30), { added: CFG.pass.xpPerTier * 2 + 30, tiersGained: 2 });
  assert.deepEqual(P.progress(pass), { tier: 2, into: 30, need: CFG.pass.xpPerTier, done: false });
  for (const bad of [-50, NaN, '100', Infinity, null]) assert.equal(P.addXp(pass, bad).added, 0);
  P.addXp(pass, 1e9);
  assert.equal(pass.xp, P.maxXp());
  assert.equal(P.progress(pass).tier, CFG.pass.tiers);
  assert.equal(P.progress(pass).done, true);
});

test('claim: only reached tiers, premium only with the premium pass, each reward once', () => {
  const pass = P.defaultPass(D(EY, EM, ED));
  assert.equal(P.claim(pass, 1, 'free'), null, 'tier not reached');
  P.addXp(pass, CFG.pass.xpPerTier * 3);
  assert.deepEqual(P.claimable(pass), [1, 2, 3].map((tier) => ({ tier, track: 'free' })));
  assert.deepEqual(P.claim(pass, 2, 'free'), P.rewardAt(2, 'free'));
  assert.equal(P.claim(pass, 2, 'free'), null, 'double tap');
  assert.equal(P.claim(pass, 1, 'premium'), null, 'premium locked');
  for (const bad of [[0, 'free'], [4, 'free'], [1.5, 'free'], ['1', 'free'], [1, 'gold'], [NaN, 'free'], [CFG.pass.tiers + 1, 'free']]) assert.equal(P.claim(pass, ...bad), null, String(bad));
  assert.equal(P.unlockPremium(pass), true);
  assert.equal(P.unlockPremium(pass), false);
  assert.equal(P.claimable(pass).length, 2 + 3, 'premium rewards of already reached tiers become claimable');
  assert.deepEqual(P.claim(pass, 1, 'premium'), P.rewardAt(1, 'premium'));
  assert.deepEqual(pass.claimed, { free: [2], premium: [1] });
});

test('new season: unclaimed unlocked rewards are handed over, then everything resets', () => {
  const pass = P.defaultPass(D(EY, EM, ED));
  P.addXp(pass, CFG.pass.xpPerTier * 4 + 10);
  P.unlockPremium(pass);
  P.claim(pass, 1, 'free');
  const res = P.sync(pass, D(EY, EM, ED + CFG.pass.seasonDays));
  assert.equal(res.rolled, true);
  assert.equal(res.autoClaimed.length, 3 + 4);
  assert.ok(res.autoClaimed.every((c) => c.reward));
  assert.deepEqual(pass, { season: 1, xp: 0, premium: false, claimed: { free: [], premium: [] } });
  assert.equal(P.sync(pass, D(EY, EM, ED + CFG.pass.seasonDays + 1)).rolled, false);
});

test('clock moved back: a small step changes nothing; a big one only corrects the season number', () => {
  const pass = P.defaultPass(D(EY, EM, ED + CFG.pass.seasonDays * 2));
  assert.equal(pass.season, 2);
  P.addXp(pass, 500);
  let res = P.sync(pass, D(EY, EM, ED + CFG.pass.seasonDays * 2 - 3)); // 3 days back, previous season
  assert.deepEqual([res.rolled, res.clockWentBack, pass.season, pass.xp], [false, true, 2, 500]);
  res = P.sync(pass, D(EY, EM, ED)); // far back
  assert.deepEqual([res.rolled, res.autoClaimed.length, pass.season, pass.xp], [false, 0, 0, 500]);
});

test('sanitizePass: edited or broken data cannot claim unreached tiers or premium rewards for free', () => {
  const now = D(EY, EM, ED);
  assert.deepEqual(P.sanitizePass(null, now), P.defaultPass(now));
  assert.deepEqual(P.sanitizePass('💥', now), P.defaultPass(now));
  const p = P.sanitizePass({ season: 0, xp: CFG.pass.xpPerTier * 2 + 5.9, premium: 'true', claimed: { free: [1, 1, 2, 3, 40, -1, 'x', 1.5], premium: [1, 2] } }, now);
  assert.equal(p.xp, CFG.pass.xpPerTier * 2 + 5);
  assert.equal(p.premium, false, 'only the boolean true unlocks premium');
  assert.deepEqual(p.claimed, { free: [1, 2], premium: [] });
  const q = P.sanitizePass({ season: -4, xp: 1e99, premium: true, claimed: null }, now);
  assert.deepEqual([q.season, q.xp, q.premium], [0, P.maxXp(), true]);
});

test('the first season starts on a Monday (regression: the epoch month was off by one)', () => {
  const start = new Date(EY, EM - 1, ED);
  assert.equal(start.getDay(), 1, 'Monday');
  assert.deepEqual([EY, EM, ED], [2026, 11, 2]);
  assert.equal(P.seasonIndex(new Date(2026, 10, 9, 12)), 0);
  assert.equal(P.daysLeft(new Date(2026, 10, 9, 12)), CFG.pass.seasonDays - 7);
});

// User request after the first v2 build: "too many skins in one pass".
test('only two skins per season: the skier on the LAST free tier, one bear skin on the LAST premium tier', () => {
  const skins = P.rewardTable().flatMap((r) => P.TRACKS.map((track) => ({ tier: r.tier, track, item: r[track].item }))).filter((x) => x.item && (x.item.kind === 'boy' || x.item.kind === 'bear'));
  assert.deepEqual(skins, [
    { tier: CFG.pass.tiers, track: 'free', item: { kind: 'boy', id: 'schior' } },
    { tier: CFG.pass.tiers, track: 'premium', item: { kind: 'bear', id: 'craciun' } },
  ]);
  const f = P.featuredRewards();
  assert.deepEqual([f.free.tier, f.free.item.id, f.premium.tier, f.premium.item.id], [CFG.pass.tiers, 'schior', CFG.pass.tiers, 'craciun']);
  const items = P.rewardTable().flatMap((r) => [r.free, r.premium]).filter((r) => r.item).length;
  assert.ok(items <= 8, `${items} cosmetic rewards in the whole pass`);
});
