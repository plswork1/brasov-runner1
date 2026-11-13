import { CFG } from '../config.js';
import { mulberry32 } from './rng.js';
import { dayKey, weekKey, isDayKey, hashString } from './dates.js';

/**
 * Mission engine (pure logic, no DOM, no storage, no clock of its own: `now` is always passed in).
 *
 * Three groups are active at the same time:
 *   daily  - 3 missions, new ones every local calendar day; progress adds up over the runs of the day
 *   weekly - 3 bigger missions, new ones every Monday
 *   run    - 3 "in one run" missions: the goal must be reached inside a single run. A claimed one is
 *            replaced by the next from the list (goals grow a little every full round).
 *
 * Progress comes from the statistics of a finished run (see `emptyRunStats`). Rewards (XP for the
 * battle pass, coins, sometimes crowns) are given when the player presses "Revendică".
 *
 * Clock changes (the player can change the phone's clock; we accept that, but nothing may break):
 *   - date moved FORWARD  -> new missions, like a real new day. Missions that were finished but not
 *                            claimed are claimed automatically first, so nothing earned is lost.
 *   - date moved BACKWARD -> the current missions stay exactly as they are (progress, claimed flags)
 *                            and only the stored date is moved back. Going back and forth therefore
 *                            never hands out the same reward twice and never gets stuck.
 *   - device left open over midnight -> `sync()` is called between runs, when the app comes back to
 *                            the foreground and on a slow timer in the menu. A run that is in
 *                            progress at midnight counts for the day it started in.
 */

/** Statistics of one run. Every mission metric is a key of this object. */
export function emptyRunStats() {
  return {
    runs: 1,
    coins: 0,
    crowns: 0,
    distance: 0,
    score: 0,
    time: 0,
    jumps: 0,
    slides: 0,
    laneChanges: 0,
    powers: 0, // power-up items picked up
    escapes: 0, // times the bear was outrun (5 s survived)
    portals: 0, // levels changed
    hits: 0,
    cleanSeconds: 0, // longest stretch without any hit
    shieldBlocks: 0,
    revives: 0,
  };
}
export const METRICS = Object.freeze(Object.keys(emptyRunStats()));

// kind: 'sum' adds up over the runs, 'max' keeps the best single run.
const def = (id, metric, goal, text, kind = 'sum') => ({ id, metric, goal, text, kind });

export const DAILY_POOL = Object.freeze([
  def('d_coins', 'coins', 150, 'Adună {N} bănuți'),
  def('d_jumps', 'jumps', 40, 'Sari de {N} ori'),
  def('d_slides', 'slides', 25, 'Alunecă de {N} ori'),
  def('d_distance', 'distance', 3000, 'Parcurge {n} m'),
  def('d_runs', 'runs', 3, 'Joacă {N} curse'),
  def('d_powers', 'powers', 4, 'Culege {N} abilități speciale'),
  def('d_escapes', 'escapes', 2, 'Scapă de urs de {N} ori'),
  def('d_lanes', 'laneChanges', 60, 'Schimbă culoarul de {N} ori'),
  def('d_score', 'score', 2500, 'Fă {N} puncte într-o cursă', 'max'),
  def('d_clean', 'cleanSeconds', 45, 'Rezistă {n} s fără nicio lovitură', 'max'),
]);

export const WEEKLY_POOL = Object.freeze([
  def('w_coins', 'coins', 1500, 'Adună {N} bănuți'),
  def('w_distance', 'distance', 25000, 'Parcurge {n} m'),
  def('w_runs', 'runs', 20, 'Joacă {N} curse'),
  def('w_jumps', 'jumps', 300, 'Sari de {N} ori'),
  def('w_powers', 'powers', 30, 'Culege {N} abilități speciale'),
  def('w_escapes', 'escapes', 12, 'Scapă de urs de {N} ori'),
  def('w_portals', 'portals', 5, 'Treci prin {N} portaluri'),
  def('w_score', 'score', 8000, 'Fă {N} puncte într-o cursă', 'max'),
]);

// "In one run" missions, in the order they come up (always kind 'max': best single run).
export const RUN_POOL = Object.freeze([
  def('r_jumps', 'jumps', 20, 'Sari de {N} ori într-o cursă', 'max'),
  def('r_coins', 'coins', 100, 'Adună {N} bănuți într-o cursă', 'max'),
  def('r_distance', 'distance', 1500, 'Parcurge {n} m într-o cursă', 'max'),
  def('r_slides', 'slides', 10, 'Alunecă de {N} ori într-o cursă', 'max'),
  def('r_clean', 'cleanSeconds', 60, 'Rezistă {n} s fără lovitură într-o cursă', 'max'),
  def('r_powers', 'powers', 3, 'Culege {N} abilități într-o cursă', 'max'),
  def('r_lanes', 'laneChanges', 40, 'Schimbă culoarul de {N} ori într-o cursă', 'max'),
  def('r_score', 'score', 3000, 'Fă {N} puncte într-o cursă', 'max'),
  def('r_escape', 'escapes', 1, 'Scapă de urs într-o cursă', 'max'),
  def('r_portal', 'portals', 1, 'Treci printr-un portal într-o cursă', 'max'),
]);

const POOLS = { daily: DAILY_POOL, weekly: WEEKLY_POOL, run: RUN_POOL };
export const SCOPES = Object.freeze(['daily', 'weekly', 'run']);
export const SCOPE_NAMES = Object.freeze({ daily: 'Zilnice', weekly: 'Săptămânale', run: 'Pe cursă' });

export function findDef(scope, id) {
  return POOLS[scope]?.find((d) => d.id === id) ?? null;
}

/** Goal of a mission entry (the "one run" missions grow with every full round of the list). */
export function goalOf(scope, entry) {
  const d = findDef(scope, entry.id);
  if (!d) return 1;
  if (scope !== 'run' || d.goal === 1) return d.goal; // ("once in a run" missions do not grow)
  const round = Math.max(0, Math.floor(entry.round || 0));
  return Math.max(1, Math.round(d.goal * (1 + CFG.missions.runGoalGrowth * round)));
}

export function isComplete(scope, entry) {
  return entry.progress >= goalOf(scope, entry);
}

/** Romanian number + "de" rule: 20 de ori, 150 de bănuți, but 3 curse, 112 bănuți. */
export function countRo(n) {
  const last2 = n % 100;
  return n >= 20 && (last2 === 0 || last2 >= 20) ? `${n} de` : String(n);
}

/** Text of a mission for the UI, e.g. "Sari de 40 de ori". {N} = count before a noun, {n} = before a unit. */
export function describe(scope, entry) {
  const d = findDef(scope, entry.id);
  if (!d) return '';
  const n = goalOf(scope, entry);
  return d.text.replace('{N}', countRo(n)).replace('{n}', String(n));
}

export function rewardOf(scope) {
  return { ...CFG.missions.reward[scope] };
}

/** `count` different missions picked deterministically for a date key (same day = same missions). */
export function pickForKey(pool, key, count) {
  const rng = mulberry32(hashString(key));
  const ids = pool.map((d) => d.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, Math.min(count, ids.length));
}

const entry = (id, extra = {}) => ({ id, progress: 0, claimed: false, ...extra });

function freshGroup(scope, key) {
  const count = scope === 'daily' ? CFG.missions.dailyCount : CFG.missions.weeklyCount;
  return { key, list: pickForKey(POOLS[scope], `${scope}:${key}`, count).map((id) => entry(id)), bonusClaimed: false };
}

function freshRunGroup() {
  const n = CFG.missions.runCount;
  return { cursor: n, list: RUN_POOL.slice(0, n).map((d) => entry(d.id, { round: 0 })) };
}

export function defaultMissions(now = new Date()) {
  return { daily: freshGroup('daily', dayKey(now)), weekly: freshGroup('weekly', weekKey(now)), run: freshRunGroup() };
}

// ---- validation of stored data -----------------------------------------------------------------

const cleanInt = (v, max = 1e9) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(0, Math.floor(v))) : 0);

function sanitizeList(scope, rawList, want) {
  const seen = new Set();
  const out = [];
  for (const e of Array.isArray(rawList) ? rawList : []) {
    if (!e || typeof e !== 'object' || typeof e.id !== 'string') continue;
    if (!findDef(scope, e.id) || seen.has(e.id)) continue;
    seen.add(e.id);
    const clean = entry(e.id, { progress: cleanInt(e.progress), claimed: e.claimed === true });
    if (scope === 'run') clean.round = cleanInt(e.round, 1000);
    // a claimed mission is by definition complete (protects against edited saves claiming for free)
    if (clean.claimed && !isComplete(scope, clean)) clean.claimed = false;
    out.push(clean);
    if (out.length >= want) break;
  }
  return out;
}

/** Strict clean-up of whatever was stored. Broken groups are replaced by fresh ones. */
export function sanitizeMissions(raw, now = new Date()) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const out = {};
  for (const scope of ['daily', 'weekly']) {
    const g = r[scope];
    const want = scope === 'daily' ? CFG.missions.dailyCount : CFG.missions.weeklyCount;
    const list = g && typeof g === 'object' && isDayKey(g.key) ? sanitizeList(scope, g.list, want) : [];
    out[scope] = list.length === want ? { key: g.key, list, bonusClaimed: g.bonusClaimed === true } : freshGroup(scope, scope === 'daily' ? dayKey(now) : weekKey(now));
    if (out[scope].bonusClaimed && !out[scope].list.every((e) => e.claimed)) out[scope].bonusClaimed = false;
  }
  const g = r.run;
  const list = g && typeof g === 'object' ? sanitizeList('run', g.list, CFG.missions.runCount) : [];
  out.run = list.length === CFG.missions.runCount ? { cursor: Math.max(CFG.missions.runCount, cleanInt(g.cursor, 1e6)), list } : freshRunGroup();
  return out;
}

// ---- progress ----------------------------------------------------------------------------------

function progressWith(scope, e, stats) {
  const d = findDef(scope, e.id);
  if (!d) return e.progress;
  const v = cleanInt(stats?.[d.metric]);
  return d.kind === 'max' ? Math.max(e.progress, v) : Math.min(1e9, e.progress + v);
}

/**
 * Add the statistics of a FINISHED run to every active mission.
 * @returns the missions that became complete because of this run: [{scope, id}]
 */
export function applyRun(ms, stats) {
  const completed = [];
  for (const scope of SCOPES) {
    for (const e of ms[scope].list) {
      if (e.claimed) continue;
      const before = isComplete(scope, e);
      e.progress = progressWith(scope, e, stats);
      if (!before && isComplete(scope, e)) completed.push({ scope, id: e.id });
    }
  }
  return completed;
}

/**
 * What the missions WOULD look like with the statistics of the run in progress (nothing is changed).
 * Used for the "mission complete" toast during a run and for live progress bars.
 * @returns [{scope, id, progress, goal, complete, claimed}]
 */
export function preview(ms, stats) {
  const out = [];
  for (const scope of SCOPES) {
    for (const e of ms[scope].list) {
      const goal = goalOf(scope, e);
      const progress = e.claimed ? e.progress : progressWith(scope, e, stats);
      out.push({ scope, id: e.id, progress: Math.min(progress, goal), goal, complete: progress >= goal, claimed: e.claimed });
    }
  }
  return out;
}

/**
 * Claim a finished mission. Safe to call twice (double tap): the second call returns null.
 * A claimed "one run" mission is replaced by the next one of the list.
 * @returns the reward {xp, coins, crowns?} or null
 */
export function claim(ms, scope, id) {
  const g = ms[scope];
  if (!g) return null;
  const i = g.list.findIndex((e) => e.id === id);
  const e = g.list[i];
  if (!e || e.claimed || !isComplete(scope, e)) return null;
  e.claimed = true;
  if (scope === 'run') {
    // next mission of the list that is not already on the board
    const active = new Set(g.list.map((x) => x.id));
    for (let tries = 0; tries < RUN_POOL.length; tries++) {
      const d = RUN_POOL[g.cursor % RUN_POOL.length];
      const round = Math.floor(g.cursor / RUN_POOL.length);
      g.cursor++;
      if (active.has(d.id) && d.id !== id) continue;
      g.list[i] = entry(d.id, { round });
      break;
    }
  }
  return rewardOf(scope);
}

/** Bonus for finishing (and claiming) all the daily missions. Returns the reward or null. */
export function claimDailyBonus(ms) {
  const g = ms.daily;
  if (g.bonusClaimed || !g.list.every((e) => e.claimed)) return null;
  g.bonusClaimed = true;
  return { ...CFG.missions.reward.dailyBonus };
}

export function dailyBonusReady(ms) {
  return !ms.daily.bonusClaimed && ms.daily.list.every((e) => e.claimed);
}

/** How many rewards wait to be claimed (badge on the menu button). */
export function claimableCount(ms) {
  let n = 0;
  for (const scope of SCOPES) for (const e of ms[scope].list) if (!e.claimed && isComplete(scope, e)) n++;
  if (dailyBonusReady(ms)) n++;
  return n;
}

/**
 * Roll the daily / weekly missions if the local date says so (see the rules in the header).
 * @returns {{rolled: string[], autoClaimed: object[], clockWentBack: boolean}}
 *          autoClaimed = rewards of finished-but-unclaimed missions of the period that just ended
 */
export function sync(ms, now = new Date()) {
  const res = { rolled: [], autoClaimed: [], clockWentBack: false };
  const keys = { daily: dayKey(now), weekly: weekKey(now) };
  for (const scope of ['daily', 'weekly']) {
    const g = ms[scope];
    const key = keys[scope];
    if (key === g.key) continue;
    if (key < g.key) {
      // The clock (or the time zone) moved back: keep everything, only re-anchor the date.
      g.key = key;
      res.clockWentBack = true;
      continue;
    }
    for (const e of g.list) {
      if (!e.claimed && isComplete(scope, e)) {
        e.claimed = true;
        res.autoClaimed.push({ scope, id: e.id, reward: rewardOf(scope) });
      }
    }
    if (scope === 'daily' && dailyBonusReady(ms)) {
      g.bonusClaimed = true;
      res.autoClaimed.push({ scope, id: 'bonus', reward: { ...CFG.missions.reward.dailyBonus } });
    }
    ms[scope] = freshGroup(scope, key);
    res.rolled.push(scope);
  }
  return res;
}
