import test from 'node:test';
import assert from 'node:assert/strict';
import * as M from '../src/logic/missions.js';
import { dayKey, weekKey, dayNumber, daysUntilNextWeek } from '../src/logic/dates.js';
import { CFG } from '../src/config.js';

const D = (y, m, d, h = 12, min = 0) => new Date(y, m - 1, d, h, min);
const stats = (o = {}) => ({ ...M.emptyRunStats(), ...o });

test('dates: local day keys, Monday-based weeks, safe with garbage', () => {
  assert.equal(dayKey(D(2026, 11, 9, 0, 0)), '2026-11-09');
  assert.equal(dayKey(D(2026, 11, 9, 23, 59)), '2026-11-09');
  assert.equal(dayKey(D(2026, 1, 5)), '2026-01-05');
  assert.equal(weekKey(D(2026, 11, 9)), '2026-11-09'); // a Monday
  assert.equal(weekKey(D(2026, 11, 15, 23, 59)), '2026-11-09'); // Sunday of the same week
  assert.equal(weekKey(D(2026, 11, 16, 0, 0)), '2026-11-16');
  assert.equal(weekKey(D(2027, 1, 1)), '2026-12-28'); // a week across New Year
  assert.equal(dayNumber(D(2026, 11, 10)) - dayNumber(D(2026, 11, 9)), 1);
  assert.equal(daysUntilNextWeek(D(2026, 11, 9)), 7);
  assert.equal(daysUntilNextWeek(D(2026, 11, 15)), 1);
  assert.match(dayKey(new Date(NaN)), /^\d{4}-\d{2}-\d{2}$/);
  assert.match(dayKey('yesterday'), /^\d{4}-\d{2}-\d{2}$/);
});

test('dates: a 23 h or 25 h day (daylight saving) is still exactly one day', () => {
  // Europe: clocks change on the last Sunday of March and October
  for (const [y, m, d] of [[2026, 3, 29], [2026, 10, 25], [2027, 3, 28]]) {
    assert.equal(dayNumber(D(y, m, d + 1, 0, 30)) - dayNumber(D(y, m, d, 0, 30)), 1);
    assert.equal(dayNumber(D(y, m, d, 23, 30)) - dayNumber(D(y, m, d, 0, 30)), 0);
  }
});

test('pools: unique ids, every metric exists in the run statistics, goals are positive integers', () => {
  for (const pool of [M.DAILY_POOL, M.WEEKLY_POOL, M.RUN_POOL]) {
    assert.equal(new Set(pool.map((d) => d.id)).size, pool.length);
    for (const d of pool) {
      assert.ok(M.METRICS.includes(d.metric), `${d.id} -> ${d.metric}`);
      assert.ok(Number.isInteger(d.goal) && d.goal > 0);
      assert.ok(['sum', 'max'].includes(d.kind));
    }
  }
  assert.ok(M.RUN_POOL.every((d) => d.kind === 'max'), '"one run" missions never add up over runs');
});

test('a fresh state has 3 daily, 3 weekly and 3 "one run" missions, all different inside a group', () => {
  const ms = M.defaultMissions(D(2026, 11, 9));
  for (const scope of M.SCOPES) {
    assert.equal(ms[scope].list.length, 3, scope);
    assert.equal(new Set(ms[scope].list.map((e) => e.id)).size, 3);
    for (const e of ms[scope].list) assert.ok(M.findDef(scope, e.id));
  }
  assert.equal(ms.daily.key, '2026-11-09');
  assert.equal(ms.weekly.key, '2026-11-09');
});

test('the missions of a day are the same for everyone that day and change from day to day', () => {
  const a = M.defaultMissions(D(2026, 11, 9, 8)).daily.list.map((e) => e.id);
  const b = M.defaultMissions(D(2026, 11, 9, 22)).daily.list.map((e) => e.id);
  assert.deepEqual(a, b);
  const sets = new Set();
  for (let d = 1; d <= 28; d++) sets.add(M.defaultMissions(D(2026, 2, d)).daily.list.map((e) => e.id).join());
  assert.ok(sets.size >= 15, `only ${sets.size} different daily sets in 28 days`);
});

test('texts are Romanian and use "de" correctly', () => {
  assert.equal(M.countRo(3), '3');
  assert.equal(M.countRo(19), '19');
  assert.equal(M.countRo(20), '20 de');
  assert.equal(M.countRo(112), '112');
  assert.equal(M.countRo(150), '150 de');
  assert.equal(M.describe('daily', { id: 'd_jumps' }), 'Sari de 40 de ori');
  assert.equal(M.describe('daily', { id: 'd_runs' }), 'Joacă 3 curse');
  assert.equal(M.describe('daily', { id: 'd_distance' }), 'Parcurge 3000 m');
  assert.equal(M.describe('run', { id: 'r_jumps', round: 0 }), 'Sari de 20 de ori într-o cursă');
  assert.equal(M.describe('run', { id: 'r_coins', round: 0 }), 'Adună 100 de bănuți într-o cursă');
  for (const scope of M.SCOPES) for (const d of scope === 'daily' ? M.DAILY_POOL : scope === 'weekly' ? M.WEEKLY_POOL : M.RUN_POOL) {
    const t = M.describe(scope, { id: d.id, round: 0 });
    assert.ok(t && !t.includes('{'), t);
  }
});

function withDaily(ids) {
  const ms = M.defaultMissions(D(2026, 11, 9));
  ms.daily.list = ids.map((id) => ({ id, progress: 0, claimed: false }));
  // (weekly and "one run" missions that the small test runs below never complete by accident)
  ms.weekly.list = ['w_score', 'w_portals', 'w_escapes'].map((id) => ({ id, progress: 0, claimed: false }));
  ms.run.list = ['r_score', 'r_escape', 'r_portal'].map((id) => ({ id, progress: 0, claimed: false, round: 0 }));
  return ms;
}

test('progress: "sum" missions add up over runs, "max" missions keep the best single run', () => {
  const ms = withDaily(['d_coins', 'd_score', 'd_runs']);
  assert.deepEqual(M.applyRun(ms, stats({ coins: 60, score: 900 })), []);
  assert.deepEqual(ms.daily.list.map((e) => e.progress), [60, 900, 1]);
  M.applyRun(ms, stats({ coins: 50, score: 700 }));
  assert.deepEqual(ms.daily.list.map((e) => e.progress), [110, 900, 2], 'score stays at the best run');
  const done = M.applyRun(ms, stats({ coins: 40, score: 2600 }));
  assert.deepEqual(done.filter((c) => c.scope === 'daily').map((c) => c.id).sort(), ['d_coins', 'd_runs', 'd_score']);
  assert.ok(ms.daily.list.every((e) => M.isComplete('daily', e)));
});

test('"one run" missions need the goal inside ONE run: two half runs do not count', () => {
  const ms = M.defaultMissions(D(2026, 11, 9));
  assert.deepEqual(ms.run.list.map((e) => e.id), ['r_jumps', 'r_coins', 'r_distance']);
  M.applyRun(ms, stats({ jumps: 12, coins: 60 }));
  M.applyRun(ms, stats({ jumps: 12, coins: 60 }));
  assert.equal(M.isComplete('run', ms.run.list[0]), false, '12 + 12 jumps in two runs is not 20 in one run');
  assert.equal(M.claim(ms, 'run', 'r_jumps'), null);
  const done = M.applyRun(ms, stats({ jumps: 20, coins: 30 }));
  assert.deepEqual(done, [{ scope: 'run', id: 'r_jumps' }]);
});

test('garbage statistics never break or cheat the progress', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_score']);
  for (const bad of [null, undefined, 'x', {}, { coins: NaN, jumps: -50, score: Infinity }, { coins: '999', jumps: {}, score: [] }]) M.applyRun(ms, bad);
  assert.deepEqual(ms.daily.list.map((e) => e.progress), [0, 0, 0]);
});

test('claim: gives the reward once (double tap safe), not before the mission is complete', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  assert.equal(M.claim(ms, 'daily', 'd_coins'), null);
  M.applyRun(ms, stats({ coins: 150 }));
  assert.equal(M.claimableCount(ms), 1);
  assert.deepEqual(M.claim(ms, 'daily', 'd_coins'), CFG.missions.reward.daily);
  assert.equal(M.claim(ms, 'daily', 'd_coins'), null, 'second tap');
  assert.equal(M.claim(ms, 'daily', 'nope'), null);
  assert.equal(M.claim(ms, 'monthly', 'd_coins'), null);
  assert.equal(M.claimableCount(ms), 0);
});

test('daily bonus: only after all three daily missions are claimed, and only once', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  M.applyRun(ms, stats({ coins: 200, jumps: 50 }));
  M.claim(ms, 'daily', 'd_coins');
  M.claim(ms, 'daily', 'd_jumps');
  assert.equal(M.claimDailyBonus(ms), null, 'one mission still open');
  M.applyRun(ms, stats());
  M.applyRun(ms, stats());
  M.claim(ms, 'daily', 'd_runs');
  assert.equal(M.claimableCount(ms), 1, 'the bonus counts for the badge');
  assert.deepEqual(M.claimDailyBonus(ms), CFG.missions.reward.dailyBonus);
  assert.equal(M.claimDailyBonus(ms), null);
  assert.ok(CFG.missions.reward.dailyBonus.crowns >= 1, 'missions are a source of the premium currency');
  assert.ok(CFG.missions.reward.weekly.crowns >= 1);
});

test('a claimed "one run" mission is replaced by the next one; after a full round the goals grow', () => {
  const ms = M.defaultMissions(D(2026, 11, 9));
  const seen = [];
  for (let k = 0; k < 25; k++) {
    const e = ms.run.list[0];
    seen.push(`${e.id}@${e.round}`);
    M.applyRun(ms, stats({ [M.findDef('run', e.id).metric]: M.goalOf('run', e) }));
    assert.deepEqual(M.claim(ms, 'run', e.id), CFG.missions.reward.run);
    assert.equal(ms.run.list.length, 3);
    assert.equal(new Set(ms.run.list.map((x) => x.id)).size, 3, 'never the same mission twice on the board');
    assert.ok(ms.run.list.every((x) => !x.claimed), 'the board only shows open missions');
  }
  assert.equal(new Set(seen).size, seen.length, 'no (mission, round) repeats');
  assert.equal(M.goalOf('run', { id: 'r_jumps', round: 0 }), 20);
  assert.equal(M.goalOf('run', { id: 'r_jumps', round: 2 }), 30);
  assert.equal(M.goalOf('run', { id: 'r_escape', round: 9 }), 1, '"once in a run" goals stay at 1');
});

test('preview: live progress of the run in progress without changing anything', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_score']);
  M.applyRun(ms, stats({ coins: 100 }));
  const before = JSON.stringify(ms);
  const pv = M.preview(ms, stats({ coins: 70, jumps: 5 }));
  assert.equal(JSON.stringify(ms), before);
  const coins = pv.find((p) => p.id === 'd_coins');
  assert.deepEqual([coins.progress, coins.goal, coins.complete], [150, 150, true]);
  assert.equal(pv.find((p) => p.id === 'd_jumps').complete, false);
  assert.equal(pv.length, 9);
});

// ---- reset by local date -----------------------------------------------------------------------

test('sync: same day -> nothing; next day -> new daily missions; new week -> new weekly ones', () => {
  const ms = M.defaultMissions(D(2026, 11, 9, 10));
  const ids = ms.daily.list.map((e) => e.id);
  assert.deepEqual(M.sync(ms, D(2026, 11, 9, 23, 59)).rolled, []);
  assert.deepEqual(ms.daily.list.map((e) => e.id), ids);
  assert.deepEqual(M.sync(ms, D(2026, 11, 10, 0, 0)).rolled, ['daily']);
  assert.equal(ms.daily.key, '2026-11-10');
  assert.equal(ms.weekly.key, '2026-11-09');
  assert.deepEqual(M.sync(ms, D(2026, 11, 16, 0, 1)).rolled, ['daily', 'weekly']);
  assert.equal(ms.weekly.key, '2026-11-16');
  assert.ok(ms.daily.list.every((e) => e.progress === 0 && !e.claimed));
});

test('sync: progress of the old day is gone, but finished-and-unclaimed missions are claimed automatically', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  M.applyRun(ms, stats({ coins: 500, jumps: 10 }));
  const res = M.sync(ms, D(2026, 11, 10, 7));
  assert.deepEqual(res.autoClaimed.map((c) => [c.scope, c.id]), [['daily', 'd_coins']]);
  assert.deepEqual(res.autoClaimed[0].reward, CFG.missions.reward.daily);
  assert.equal(M.sync(ms, D(2026, 11, 10, 8)).autoClaimed.length, 0, 'only once');
});

test('sync: all three done and claimed but the bonus forgotten -> the bonus is not lost at midnight', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  for (let i = 0; i < 3; i++) M.applyRun(ms, stats({ coins: 100, jumps: 30 }));
  for (const e of [...ms.daily.list]) M.claim(ms, 'daily', e.id);
  const res = M.sync(ms, D(2026, 11, 10, 0, 5));
  assert.deepEqual(res.autoClaimed.map((c) => c.id), ['bonus']);
});

test('clock moved BACK: missions, progress and claimed flags stay; nothing is granted again', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  M.applyRun(ms, stats({ coins: 150, jumps: 10 }));
  M.claim(ms, 'daily', 'd_coins');
  const snapshot = JSON.stringify(ms.daily.list);
  const res = M.sync(ms, D(2026, 11, 2, 12)); // a week earlier
  assert.equal(res.clockWentBack, true);
  assert.deepEqual(res.rolled, []);
  assert.deepEqual(res.autoClaimed, []);
  assert.equal(JSON.stringify(ms.daily.list), snapshot);
  assert.equal(M.claim(ms, 'daily', 'd_coins'), null, 'still claimed');
  assert.equal(ms.daily.key, '2026-11-02', 're-anchored, so the game cannot get stuck on a future date');
});

test('clock set far into the future and back again: the game is not stuck waiting for that date', () => {
  const ms = M.defaultMissions(D(2026, 11, 9));
  M.sync(ms, D(2099, 1, 1));
  assert.equal(ms.daily.key, '2099-01-01');
  M.sync(ms, D(2026, 11, 9));
  assert.deepEqual(M.sync(ms, D(2026, 11, 10)).rolled, ['daily'], 'the next real day brings new missions');
});

test('flipping the clock back and forth over the same day never gives a second set of rewards', () => {
  const ms = withDaily(['d_coins', 'd_jumps', 'd_runs']);
  let rewards = 0;
  const play = () => {
    M.applyRun(ms, stats({ coins: 5000, jumps: 500, runs: 10, distance: 99999, slides: 500, powers: 50, escapes: 50, laneChanges: 500, score: 99999, cleanSeconds: 999 }));
    for (const e of [...ms.daily.list]) if (M.claim(ms, 'daily', e.id)) rewards++;
  };
  play();
  assert.equal(rewards, 3);
  for (let i = 0; i < 5; i++) {
    M.sync(ms, D(2026, 11, 8)); // back one day
    play();
    M.sync(ms, D(2026, 11, 9)); // forward to "today" again: this IS a new day for the game (accepted)
    play();
  }
  // each forward step is one new day (the spec accepts clock changes); going back never pays
  assert.equal(rewards, 3 + 5 * 3);
});

test('device left open over midnight: sync at any later moment rolls exactly once', () => {
  const ms = M.defaultMissions(D(2026, 11, 9, 23, 50));
  let rolls = 0;
  for (let min = 0; min < 30; min++) rolls += M.sync(ms, new Date(2026, 10, 9, 23, 50 + min)).rolled.length;
  assert.equal(rolls, 1);
  assert.equal(ms.daily.key, '2026-11-10');
});

test('sanitizeMissions: broken or edited data is repaired, never trusted', () => {
  const now = D(2026, 11, 9);
  const fresh = M.defaultMissions(now);
  for (const bad of [null, 5, 'x', [], {}, { daily: null }, { daily: { key: 'tomorrow', list: [] } }, { daily: { key: '2026-11-09', list: [{ id: 'd_coins' }] } }]) {
    const ms = M.sanitizeMissions(bad, now);
    assert.deepEqual(ms.daily.list.map((e) => e.id), fresh.daily.list.map((e) => e.id));
    assert.equal(ms.run.list.length, 3);
  }
  const edited = M.sanitizeMissions(
    {
      daily: { key: '2026-11-09', bonusClaimed: true, list: [{ id: 'd_coins', progress: -5, claimed: true }, { id: 'd_jumps', progress: 1e99, claimed: 'yes' }, { id: 'd_runs', progress: 2.7 }] },
      weekly: { key: '2026-11-09', list: [{ id: 'w_coins' }, { id: 'w_coins' }, { id: 'hack' }] },
      run: { cursor: -3, list: [{ id: 'r_jumps', round: 2, progress: 30, claimed: true }, { id: 'r_coins', round: 'x' }, { id: 'r_distance' }] },
    },
    now,
  );
  const d = edited.daily.list;
  assert.deepEqual([d[0].progress, d[0].claimed], [0, false], 'claimed without progress is not believed');
  assert.deepEqual([d[1].progress, d[1].claimed], [1e9, false]);
  assert.equal(d[2].progress, 2);
  assert.equal(edited.daily.bonusClaimed, false);
  assert.equal(edited.weekly.list.length, 3, 'a broken weekly group is replaced by a fresh one');
  assert.equal(edited.run.cursor, 3);
  assert.equal(edited.run.list[0].claimed, true);
  assert.equal(edited.run.list[1].round, 0);
});
