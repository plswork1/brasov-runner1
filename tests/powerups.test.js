import test from 'node:test';
import assert from 'node:assert/strict';
import { PowerUps, PowerUpSchedule, SkyTrail, CrownSchedule, POWER_TYPES } from '../src/logic/powerups.js';
import { Generator, CELL } from '../src/logic/generator.js';
import { PlayerState } from '../src/logic/playerState.js';
import { playerHitsObstacle } from '../src/logic/collision.js';
import { speedAt } from '../src/logic/speed.js';
import { CFG, OBSTACLES } from '../src/config.js';

function runSchedule(seed, seconds, blockedFn = () => false) {
  const sch = new PowerUpSchedule(seed);
  const spawns = [];
  for (let t = 0; t < seconds; t += 0.1) {
    const type = sch.poll(t, blockedFn(t));
    if (type) spawns.push({ t, type });
  }
  return spawns;
}

test('schedule: first power-up appears around 30 s and it is the magnet', () => {
  for (let seed = 1; seed <= 40; seed++) {
    const [first] = runSchedule(seed, 60);
    assert.equal(first.type, 'magnet');
    assert.ok(first.t >= 30 - CFG.power.jitter - 0.2 && first.t <= 30 + CFG.power.jitter + 0.2, `first at ${first.t}`);
  }
});

// v2: two more power-ups share the schedule (shield ~1/2.5 min, clock ~1/3.5 min), so on average one
// item appears every ~25 s instead of every ~30 s. The rhythm of the three original ones is unchanged
// (same asserted ranges as in v1); only the "mean gap" range and the title were updated.
test('schedule: magnet ~1/min, board ~1/2 min, shield ~1/2.5 min, jetpack ~1/3 min, clock ~1/3.5 min (rarest); about one every 25 s overall', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const spawns = runSchedule(seed, 1800); // 30 minutes
    const n = (type) => spawns.filter((s) => s.type === type).length;
    assert.ok(n('magnet') >= 25 && n('magnet') <= 31, `magnet ${n('magnet')}`);
    assert.ok(n('board') >= 12 && n('board') <= 16, `board ${n('board')}`);
    assert.ok(n('jetpack') >= 8 && n('jetpack') <= 11, `jetpack ${n('jetpack')}`);
    assert.ok(n('shield') >= 10 && n('shield') <= 13, `shield ${n('shield')}`);
    assert.ok(n('slowmo') >= 7 && n('slowmo') <= 9, `slowmo ${n('slowmo')}`);
    assert.ok(n('magnet') > n('board') && n('board') > n('jetpack'));
    assert.ok(n('board') > n('shield') && n('shield') > n('slowmo'));
    for (let i = 1; i < spawns.length; i++) {
      assert.ok(spawns[i].t - spawns[i - 1].t >= CFG.power.minSeparation - 1e-6, 'power-ups never too close');
    }
    const meanGap = (spawns.at(-1).t - spawns[0].t) / (spawns.length - 1);
    assert.ok(meanGap > 20 && meanGap < 32, `mean gap ${meanGap}`);
  }
});

test('schedule: nothing appears while blocked (e.g. flying), it comes right after', () => {
  const spawns = runSchedule(3, 200, (t) => t > 20 && t < 50);
  assert.ok(spawns.every((s) => s.t <= 20 || s.t >= 50));
  assert.ok(spawns.some((s) => s.t >= 50 && s.t < 51), 'the delayed one appears as soon as it is allowed');
});

test('durations: magnet 15 s, board 10 s, jetpack 10 s; picking again refreshes; last 2 s are "ending"', () => {
  const p = new PowerUps();
  for (const t of POWER_TYPES) p.activate(t);
  const endedAt = {};
  for (let time = 0; time < 20; time += 0.05) {
    for (const e of p.update(0.05)) endedAt[e] = time + 0.05;
  }
  assert.ok(Math.abs(endedAt.magnet - 15) < 0.06, String(endedAt.magnet));
  assert.ok(Math.abs(endedAt.board - 10) < 0.06, String(endedAt.board));
  assert.ok(Math.abs(endedAt.jetpack - 10) < 0.06, String(endedAt.jetpack));

  const q = new PowerUps();
  q.activate('magnet');
  q.update(10);
  q.activate('magnet');
  assert.equal(q.remaining.magnet, 15);
  q.update(13.5);
  assert.equal(q.ending('magnet'), true);
  assert.equal(q.ending('board'), false);
  assert.throws(() => q.activate('rocket'));
});

test('sky trail: evenly spaced coins at flight height that switch to a neighbouring lane', () => {
  const tr = new SkyTrail(5);
  tr.start(100, 0);
  const coins = tr.emit(400, 6.1);
  assert.ok(coins.length > 80);
  let switches = 0;
  for (let i = 1; i < coins.length; i++) {
    assert.ok(coins[i].s > coins[i - 1].s);
    assert.ok(coins[i].lane >= -1 && coins[i].lane <= 1);
    if (coins[i].lane !== coins[i - 1].lane) {
      switches++;
      assert.equal(Math.abs(coins[i].lane - coins[i - 1].lane), 1, 'only to a neighbouring lane');
    }
  }
  assert.ok(switches >= 5);
  assert.ok(coins.every((c) => c.s < 400 && c.y === 6.1));
  assert.equal(tr.emit(400, 6.1).length, 0, 'nothing twice');
});

function generate(seed, seconds, onTime) {
  const gen = new Generator(seed);
  const all = { obstacles: [], coins: [], powerups: [], rows: [] };
  let distance = 0;
  for (let t = 0; t < seconds; t += 0.1) {
    const v = speedAt(t);
    distance += v * 0.1;
    const opts = onTime ? onTime(gen, t, distance) : {};
    const out = gen.ensure(distance, v, t, opts || {});
    for (const k of Object.keys(all)) all[k].push(...out[k]);
  }
  return all;
}

test('generator: requested power-ups are placed between rows, away from obstacles and coins', () => {
  for (let seed = 1; seed <= 30; seed++) {
    let asked = 0;
    const all = generate(seed, 240, (gen, t) => {
      if (Math.abs(t % 20) < 0.05 && t > 5) {
        gen.requestPowerUp(POWER_TYPES[asked % 3]);
        asked++;
      }
    });
    assert.ok(all.powerups.length >= asked - 1 && all.powerups.length <= asked, `${all.powerups.length} of ${asked}`);
    for (const p of all.powerups) {
      assert.ok(POWER_TYPES.includes(p.type));
      assert.ok(p.lane >= -1 && p.lane <= 1);
      for (const o of all.obstacles) {
        if (!o.lanes.includes(p.lane)) continue;
        assert.ok(Math.abs(o.s - p.s) > OBSTACLES[o.type].depth / 2 + 2, `power-up inside a ${o.type} (seed ${seed})`);
      }
      for (const c of all.coins) {
        if (c.lane === p.lane) assert.ok(Math.abs(c.s - p.s) >= 1.8, 'no coin on top of the item');
      }
    }
  }
});

test('generator: rows inside the jetpack landing zone have no obstacles', () => {
  const zone = { from: 600, to: 760 };
  const all = generate(4, 120, () => ({ clear: zone }));
  const inZone = all.rows.filter((r) => r.s >= zone.from && r.s <= zone.to);
  assert.ok(inZone.length >= 2);
  for (const r of inZone) assert.deepEqual(r.cells, [CELL.EMPTY, CELL.EMPTY, CELL.EMPTY]);
  assert.ok(all.obstacles.every((o) => o.s < zone.from || o.s > zone.to));
  assert.ok(all.obstacles.some((o) => o.s > zone.to), 'obstacles come back after the zone');
});

test('super board: one jump clears EVERY obstacle type at top speed; normal jump does not clear rocks', () => {
  const v = CFG.speed.max;
  for (const [type, def] of Object.entries(OBSTACLES)) {
    for (const superJump of [true, false]) {
      const p = new PlayerState();
      p.superJump = superJump;
      const obs = { type, lanes: def.lanes === 3 ? [-1, 0, 1] : [0], s: 0.34 * v, rowS: 0.34 * v }; // jump ~0.34 s before
      p.jump();
      let s = 0;
      let hit = false;
      for (let t = 0; t < 1.5; t += 1 / 120) {
        const prev = s;
        p.update(1 / 120);
        s += v / 120;
        if (playerHitsObstacle(prev, s, p.box(), obs)) hit = true;
      }
      if (superJump) assert.equal(hit, false, `super jump should clear ${type}`);
      else if (def.cell === 'BLOCK' || def.cell === 'SLIDE') assert.equal(hit, true, `normal jump must not clear ${type}`);
    }
  }
});

test('super board: higher jump, and the "slide" press still drops fast to the ground', () => {
  const p = new PlayerState();
  p.superJump = true;
  p.jump();
  assert.deepEqual(p.takeEvents(), ['superjump']);
  let apex = 0;
  for (let t = 0; t < 0.5; t += 1 / 120) {
    p.update(1 / 120);
    apex = Math.max(apex, p.y);
  }
  assert.ok(apex > 4, `apex ${apex}`);
  p.slide();
  let t = 0;
  while (!p.grounded && t < 2) {
    p.update(1 / 120);
    t += 1 / 120;
  }
  assert.ok(t < 0.35, `fast fall took ${t}`);
});

test('jetpack: climbs above every obstacle, ignores jump/slide, and comes back down after', () => {
  const p = new PlayerState();
  p.startFlight();
  for (let t = 0; t < 1.2; t += 1 / 120) p.update(1 / 120);
  const maxTop = Math.max(...Object.values(OBSTACLES).map((o) => o.top));
  assert.ok(p.y > maxTop + 1.5, `flight height ${p.y}`);
  p.jump();
  p.slide();
  p.update(1 / 120);
  assert.equal(p.sliding, false);
  assert.ok(Math.abs(p.y - CFG.power.jetHeight) < 0.2);
  assert.ok(p.moveLane(1), 'can still change lane while flying');
  p.endFlight();
  let t = 0;
  while (!p.grounded && t < 3) {
    p.update(1 / 120);
    t += 1 / 120;
  }
  assert.ok(p.grounded && t < 1, `landed after ${t}s`);
});

// ---------------------------------------------------------------------------------------------
// v2: Scutul Bastionului (shield) and Ceasul din Piața Sfatului (slow motion)
// ---------------------------------------------------------------------------------------------

test('v2: there are five power-ups and the two new ones have their own durations', () => {
  assert.deepEqual([...POWER_TYPES], ['magnet', 'board', 'jetpack', 'shield', 'slowmo']);
  const p = new PowerUps();
  p.activate('shield');
  p.activate('slowmo');
  assert.equal(p.remaining.shield, CFG.power.shield.duration);
  assert.equal(p.remaining.slowmo, CFG.power.slowmo.duration);
  assert.ok(CFG.power.shield.first > CFG.power.magnet.first + 2 * CFG.power.jitter, 'the magnet is still the first item of a run');
});

test('shield: absorbs exactly one hit, then a short grace period; without a shield nothing is absorbed', () => {
  const p = new PowerUps();
  assert.equal(p.absorbHit(), false, 'no shield, no protection');
  p.activate('shield');
  assert.equal(p.absorbHit(), true);
  assert.equal(p.active('shield'), false, 'used up by the hit');
  assert.ok(p.shieldGrace > 0);
  assert.equal(p.absorbHit(), false, 'a second hit is not absorbed');
  let t = 0;
  while (p.shieldGrace > 0 && t < 5) {
    p.update(1 / 60);
    t += 1 / 60;
  }
  assert.ok(Math.abs(t - CFG.power.shieldGrace) < 0.05, `grace lasted ${t}`);
});

test('shield: runs out by itself after its duration and reports the end once', () => {
  const p = new PowerUps();
  p.activate('shield');
  let ended = 0;
  for (let t = 0; t < CFG.power.shield.duration + 1; t += 0.05) ended += p.update(0.05).filter((e) => e === 'shield').length;
  assert.equal(ended, 1);
  assert.equal(p.absorbHit(), false);
});

test('clock: the time scale eases down to slowScale and back to 1, never outside [slowScale, 1]', () => {
  const p = new PowerUps();
  assert.equal(p.stepTimeScale(1 / 60), 1);
  p.activate('slowmo');
  let min = 1;
  for (let t = 0; t < 2; t += 1 / 60) {
    const s = p.stepTimeScale(1 / 60);
    assert.ok(s <= 1 && s >= CFG.power.slowScale - 1e-9);
    min = Math.min(min, s);
    p.update((1 / 60) * s, 1 / 60);
  }
  assert.equal(min, CFG.power.slowScale);
  for (let t = 0; t < CFG.power.slowmo.duration + 2; t += 1 / 60) {
    const s = p.stepTimeScale(1 / 60);
    p.update((1 / 60) * s, 1 / 60);
  }
  assert.equal(p.active('slowmo'), false);
  assert.equal(p.timeScale, 1);
});

test('clock: its own timer runs in REAL time, the other power-ups in (slowed) game time', () => {
  const p = new PowerUps();
  p.activate('slowmo');
  p.activate('magnet');
  p.activate('jetpack');
  // 4 real seconds at half speed = 2 game seconds
  for (let i = 0; i < 400; i++) p.update(0.005, 0.01);
  assert.ok(Math.abs(p.remaining.slowmo - (CFG.power.slowmo.duration - 4)) < 1e-6, String(p.remaining.slowmo));
  assert.ok(Math.abs(p.remaining.magnet - (CFG.power.magnet.duration - 2)) < 1e-6, String(p.remaining.magnet));
  assert.ok(Math.abs(p.remaining.jetpack - (CFG.power.jetpack.duration - 2)) < 1e-6, String(p.remaining.jetpack));
});

test('clock + jetpack: a flight covers the same distance with or without slow motion (landing zone stays right)', () => {
  const fly = (withClock) => {
    const p = new PowerUps();
    p.activate('jetpack');
    let d = 0;
    let t = 0;
    const v = 30;
    while (p.active('jetpack') && t < 60) {
      if (withClock && Math.abs(t - 3) < 1e-6) p.activate('slowmo'); // picked up in mid-air
      const scale = p.stepTimeScale(1 / 120);
      const h = (1 / 120) * scale;
      p.update(h, 1 / 120);
      d += v * h;
      t += 1 / 120;
    }
    return { d, t };
  };
  const a = fly(false);
  const b = fly(true);
  assert.ok(Math.abs(a.d - b.d) < 0.5, `${a.d} vs ${b.d}`);
  assert.ok(b.t > a.t + 1, 'in real time the slowed flight lasts longer');
});

test('crown schedule: the rarest item (about one every 5 minutes), never while blocked', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const sch = new CrownSchedule(seed);
    const times = [];
    for (let t = 0; t < 1800; t += 0.1) if (sch.poll(t, t > 300 && t < 420)) times.push(t);
    assert.ok(times.length >= 4 && times.length <= 8, `crowns in 30 min: ${times.length}`);
    const clock = runSchedule(seed, 1800).filter((s) => s.type === 'slowmo').length;
    assert.ok(times.length <= clock, `fewer crowns (${times.length}) than the rarest power-up (${clock})`);
    assert.ok(times[0] >= CFG.economy.crownRun.first - CFG.economy.crownRun.jitter - 0.2);
    assert.ok(times.every((t) => t <= 300 || t >= 420));
    for (let i = 1; i < times.length; i++) assert.ok(times[i] - times[i - 1] >= CFG.economy.crownRun.every - CFG.economy.crownRun.jitter - 0.2);
  }
});
