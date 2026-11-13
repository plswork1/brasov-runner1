import { CFG } from '../config.js';
import { dayNumber } from './dates.js';

/**
 * Battle pass, "Pass-ul Tâmpa" (pure logic).
 *
 * A season lasts CFG.pass.seasonDays days and has CFG.pass.tiers tiers with two reward tracks:
 * a free one and a premium one. The premium track is unlocked with crowns (the in-game premium
 * currency, never real money). XP comes from missions and from playing runs.
 *
 * Honest design rules:
 *  - the premium track gives back more crowns than it costs, and the free track alone gives almost
 *    enough crowns for the next pass: the pass can always be earned by playing;
 *  - every cosmetic of the pass can also be bought in the shop later (no "gone forever");
 *  - when a season ends, rewards that were unlocked but not claimed are claimed automatically.
 *
 * State (inside the save): {season, xp, premium, claimed: {free: number[], premium: number[]}}
 */

export const TRACKS = Object.freeze(['free', 'premium']);

const SEASON_NAMES = ['Iarna în Poiana', 'Mărțișor pe Republicii', 'Zilele Brașovului', 'Junii din Șchei', 'Vara la Noua', 'Toamna pe Tâmpa', 'Târgul de Crăciun'];

function epochDay(cfg = CFG.pass) {
  const [y, m, d] = cfg.epoch;
  return Math.floor(Date.UTC(y, m - 1, d) / 86400000);
}

/** Index of the season the local date falls in (0 = first season; never negative). */
export function seasonIndex(now, cfg = CFG.pass) {
  return Math.max(0, Math.floor((dayNumber(now) - epochDay(cfg)) / cfg.seasonDays));
}

/** Whole days left in the season, counting today (1..seasonDays). */
export function daysLeft(now, cfg = CFG.pass) {
  const since = dayNumber(now) - epochDay(cfg);
  if (since < 0) return cfg.seasonDays; // before the first season: it has not started counting yet
  return cfg.seasonDays - (since % cfg.seasonDays);
}

export function seasonName(index) {
  return `Sezonul ${index + 1}: ${SEASON_NAMES[index % SEASON_NAMES.length]}`;
}

// ---- reward tables -----------------------------------------------------------------------------
// Rewards: {coins} | {crowns} | {item: {kind, id}}. Built by rule so the tables are easy to check.

// Only TWO skins per season (user request: a pass must not hand out most of the wardrobe):
//   - the last FREE tier gives the boy skin "Schior din Poiana";
//   - the last PREMIUM tier gives one bear skin ("Ursul de Crăciun").
// The other skins are bought in the wardrobe. Small cosmetics (trails, emoji) fill a few tiers.
const LAST = CFG.pass.tiers;
const FREE_ITEMS = { 10: ['emoji', 'urs'], 20: ['trail', 'fulgi'], 30: ['emoji', 'munte'], [LAST]: ['boy', 'schior'] };
const PREMIUM_ITEMS = { 8: ['emoji', 'cool'], 22: ['trail', 'frunze'], 34: ['trail', 'tricolor'], [LAST]: ['bear', 'craciun'] };

/** The two "big" rewards of the season, for the showcase at the top of the pass screen. */
export function featuredRewards(cfg = CFG.pass) {
  return { free: { tier: cfg.tiers, ...rewardAt(cfg.tiers, 'free') }, premium: { tier: cfg.tiers, ...rewardAt(cfg.tiers, 'premium') } };
}

export function rewardAt(tier, track) {
  const items = track === 'premium' ? PREMIUM_ITEMS : FREE_ITEMS;
  if (items[tier]) return { item: { kind: items[tier][0], id: items[tier][1] } };
  if (track === 'free') {
    if (tier % 4 === 0) return { crowns: 5 }; // tiers 4..36 without 20: 8 x 5 = 40 crowns over a season
    return { coins: 100 + 20 * Math.floor(tier / 5) };
  }
  if (tier % 3 === 0) return { crowns: 10 }; // 13 tiers (3..39) x 10 = 130, more than the pass costs
  return { coins: 250 + 50 * Math.floor(tier / 5) };
}

/** All tiers: [{tier, free, premium}] */
export function rewardTable(cfg = CFG.pass) {
  const out = [];
  for (let t = 1; t <= cfg.tiers; t++) out.push({ tier: t, free: rewardAt(t, 'free'), premium: rewardAt(t, 'premium') });
  return out;
}

/** Total crowns a track hands out over a whole season (used by the tests and the README). */
export function totalCrowns(track, cfg = CFG.pass) {
  let n = 0;
  for (let t = 1; t <= cfg.tiers; t++) n += rewardAt(t, track).crowns || 0;
  return n;
}

// ---- state -------------------------------------------------------------------------------------

export function defaultPass(now = new Date()) {
  return { season: seasonIndex(now), xp: 0, premium: false, claimed: { free: [], premium: [] } };
}

export function maxXp(cfg = CFG.pass) {
  return cfg.tiers * cfg.xpPerTier;
}

/** Tiers reached with this XP (0..tiers). */
export function tierOf(xp, cfg = CFG.pass) {
  return Math.min(cfg.tiers, Math.floor(Math.max(0, xp) / cfg.xpPerTier));
}

/** {tier, into, need}: progress inside the current tier (for the progress bar). */
export function progress(pass, cfg = CFG.pass) {
  const tier = tierOf(pass.xp, cfg);
  if (tier >= cfg.tiers) return { tier, into: cfg.xpPerTier, need: cfg.xpPerTier, done: true };
  return { tier, into: pass.xp - tier * cfg.xpPerTier, need: cfg.xpPerTier, done: false };
}

export function sanitizePass(raw, now = new Date(), cfg = CFG.pass) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const int = (v) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.floor(v)) : 0);
  const out = {
    season: Number.isFinite(r.season) ? Math.min(100000, int(r.season)) : seasonIndex(now, cfg),
    xp: Math.min(maxXp(cfg), int(r.xp)),
    premium: r.premium === true,
    claimed: { free: [], premium: [] },
  };
  const reached = tierOf(out.xp, cfg);
  for (const track of TRACKS) {
    const seen = new Set();
    for (const t of Array.isArray(r.claimed?.[track]) ? r.claimed[track] : []) {
      // only real tiers that were really reached (and premium ones only with the premium pass)
      if (!Number.isInteger(t) || t < 1 || t > reached || seen.has(t)) continue;
      if (track === 'premium' && !out.premium) continue;
      seen.add(t);
    }
    out.claimed[track] = [...seen].sort((a, b) => a - b);
  }
  return out;
}

/** Add XP (capped at the last tier). @returns {{added, tiersGained}} */
export function addXp(pass, amount, cfg = CFG.pass) {
  const a = typeof amount === 'number' && Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
  const before = pass.xp;
  const tierBefore = tierOf(before, cfg);
  pass.xp = Math.min(maxXp(cfg), before + a);
  return { added: pass.xp - before, tiersGained: tierOf(pass.xp, cfg) - tierBefore };
}

export function canClaim(pass, tier, track, cfg = CFG.pass) {
  if (!TRACKS.includes(track) || !Number.isInteger(tier) || tier < 1 || tier > cfg.tiers) return false;
  if (tier > tierOf(pass.xp, cfg)) return false;
  if (track === 'premium' && !pass.premium) return false;
  return !pass.claimed[track].includes(tier);
}

/** Claim one reward. Safe against double taps: the second call returns null. */
export function claim(pass, tier, track, cfg = CFG.pass) {
  if (!canClaim(pass, tier, track, cfg)) return null;
  pass.claimed[track].push(tier);
  pass.claimed[track].sort((a, b) => a - b);
  return rewardAt(tier, track);
}

/** Every reward that can be claimed right now: [{tier, track}] */
export function claimable(pass, cfg = CFG.pass) {
  const out = [];
  const reached = tierOf(pass.xp, cfg);
  for (let t = 1; t <= reached; t++) for (const track of TRACKS) if (canClaim(pass, t, track, cfg)) out.push({ tier: t, track });
  return out;
}

/** Unlock the premium track (the caller has already taken the crowns). */
export function unlockPremium(pass) {
  if (pass.premium) return false;
  pass.premium = true;
  return true;
}

/**
 * Move to the season of the local date if needed.
 *  - a later season: unclaimed rewards of the old one are returned (to be granted), then XP, claims
 *    and the premium flag are reset;
 *  - the clock moved back by at most one season: nothing changes (the stored season simply lasts
 *    until real time catches up); by more than one season: the stored season number is corrected,
 *    progress is kept. Either way no reward is ever given twice.
 * @returns {{rolled: boolean, autoClaimed: {tier, track, reward}[], clockWentBack: boolean, corrected: boolean}}
 */
export function sync(pass, now = new Date(), cfg = CFG.pass) {
  const idx = seasonIndex(now, cfg);
  const res = { rolled: false, autoClaimed: [], clockWentBack: false, corrected: false };
  if (idx === pass.season) return res;
  if (idx < pass.season) {
    res.clockWentBack = true;
    if (pass.season - idx > 1) {
      pass.season = idx;
      res.corrected = true;
    }
    return res;
  }
  for (const c of claimable(pass, cfg)) {
    res.autoClaimed.push({ ...c, reward: rewardAt(c.tier, c.track) });
  }
  pass.season = idx;
  pass.xp = 0;
  pass.premium = false;
  pass.claimed = { free: [], premium: [] };
  res.rolled = true;
  return res;
}
