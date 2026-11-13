import test from 'node:test';
import assert from 'node:assert/strict';
import { Generator, CELL, advanceReach, initialReach } from '../src/logic/generator.js';
import { speedAt } from '../src/logic/speed.js';
import { CFG, OBSTACLES } from '../src/config.js';
import { BIOMES, biomeTypes, movingS } from '../src/logic/biomes.js';

// Simulate a whole run's worth of generation, advancing the player along the speed curve.
// `every`: ask for a level change every `every` seconds (like the game does), cycling the biomes.
function simulateGeneration(seed, seconds, { biome = 0, every = 0 } = {}) {
  const gen = new Generator(seed, biome);
  const rows = [];
  const obstacles = [];
  const coins = [];
  const transitions = [];
  let distance = 0;
  let next = every;
  let current = biome;
  const dt = 0.1;
  for (let t = 0; t < seconds; t += dt) {
    const v = speedAt(t);
    distance += v * dt;
    if (every && t >= next) {
      current = (current + 1) % BIOMES.length;
      gen.requestTransition(current);
      next += every;
    }
    const out = gen.ensure(distance, v, t);
    rows.push(...out.rows.map((r) => ({ ...r, genTime: t })));
    obstacles.push(...out.obstacles);
    coins.push(...out.coins);
    transitions.push(...out.transitions);
  }
  return { rows, obstacles, coins, transitions };
}
const rowS = (o) => (o.rowS ?? o.s);

test('every row leaves at least one lane that is not blocked', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const { rows } = simulateGeneration(seed, 240);
    assert.ok(rows.length > 20, 'rows were generated');
    for (const r of rows) {
      assert.ok(r.cells.some((c) => c !== CELL.BLOCK), `row at s=${r.s} (seed ${seed}) is fully blocked`);
    }
  }
});

test('consecutive rows are always reachable (lane change + jump/slide recovery fit in the gap)', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const { rows } = simulateGeneration(seed, 240);
    let reach = initialReach();
    for (const r of rows) {
      reach = advanceReach(reach, r.cells, r.gapTime);
      assert.ok(reach.size > 0, `unreachable row at s=${r.s}, seed ${seed}`);
    }
  }
});

test('row spacing respects the minimum distance and the minimum time gap', () => {
  const { rows } = simulateGeneration(7, 300);
  for (let i = 1; i < rows.length; i++) {
    const d = rows[i].s - rows[i - 1].s;
    assert.ok(d >= CFG.gen.minGapDist - 1e-9, `rows too close: ${d}`);
    // Time gap at the speed actually reached at that distance must not drop below the hard limit minus safety margin
    assert.ok(rows[i].gapTime >= CFG.gen.gapHard - 1e-9);
  }
});

test('rows get closer in time as the run goes on (difficulty ramps) but spacing in distance grows with speed', () => {
  const { rows } = simulateGeneration(3, 300);
  const early = rows.slice(1, 6).reduce((a, r) => a + r.gapTime, 0) / 5;
  const late = rows.slice(-5).reduce((a, r) => a + r.gapTime, 0) / 5;
  assert.ok(late < early, `late gap ${late} should be < early gap ${early}`);
});

test('obstacle entities are well-formed and use known types', () => {
  const { obstacles } = simulateGeneration(11, 200);
  assert.ok(obstacles.length > 10);
  for (const o of obstacles) {
    assert.ok(OBSTACLES[o.type], `unknown type ${o.type}`);
    assert.equal(o.lanes.length, OBSTACLES[o.type].lanes);
    for (const l of o.lanes) assert.ok(l >= -1 && l <= 1);
    assert.ok(Number.isFinite(o.s));
  }
});

test('coins never overlap solid obstacles or bars in their lane', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const { obstacles, coins } = simulateGeneration(seed, 200);
    for (const c of coins) {
      for (const o of obstacles) {
        if (!o.lanes.includes(c.lane)) continue;
        const def = OBSTACLES[o.type];
        const overlapS = Math.abs(c.s - rowS(o)) < def.depth / 2 + 0.5;
        if (!overlapS) continue;
        // Only allowed: arc coins above a low (JUMP) obstacle, or low coins under a bough (SLIDE)
        if (def.cell === 'SLIDE') {
          assert.ok(c.y + CFG.coinRadius <= def.bottom, `coin at y=${c.y} must fit under the ${o.type}`);
          continue;
        }
        assert.equal(def.cell, 'JUMP', `coin at s=${c.s} inside ${o.type} (seed ${seed})`);
        assert.ok(c.y > def.top + 0.5, `arc coin at y=${c.y} must float above the ${o.type}`);
      }
    }
  }
});

test('generation is deterministic for the same seed and varies between seeds', () => {
  const a = simulateGeneration(5, 120);
  const b = simulateGeneration(5, 120);
  const c = simulateGeneration(6, 120);
  assert.deepEqual(a.rows.map((r) => r.cells), b.rows.map((r) => r.cells));
  assert.notDeepEqual(a.rows.map((r) => r.cells), c.rows.map((r) => r.cells));
});

test('first obstacles give the player a grace distance', () => {
  const { rows } = simulateGeneration(2, 20);
  assert.ok(rows[0].s >= 40, `first row at ${rows[0].s}`);
});

test('calling ensure repeatedly with the same distance does not create duplicates', () => {
  const gen = new Generator(9);
  const a = gen.ensure(0, 15, 0);
  const b = gen.ensure(0, 15, 0);
  assert.ok(a.rows.length > 0);
  assert.equal(b.rows.length, 0);
});

test('slide obstacles are boughs on a SIDE lane only, and every slide row has an obstacle in the middle lane', () => {
  let slideRows = 0;
  for (let seed = 1; seed <= 60; seed++) {
    const { rows, obstacles } = simulateGeneration(seed, 240);
    for (const r of rows) {
      assert.notEqual(r.cells[1], CELL.SLIDE, `middle lane must never need a slide (seed ${seed})`);
      if (r.cells[0] === CELL.SLIDE || r.cells[2] === CELL.SLIDE) {
        slideRows++;
        assert.ok(r.cells[1] === CELL.BLOCK || r.cells[1] === CELL.JUMP, `slide row without a middle obstacle (seed ${seed})`);
      }
    }
    for (const o of obstacles) {
      if (OBSTACLES[o.type].cell !== 'SLIDE') continue;
      assert.equal(o.lanes.length, 1);
      assert.ok(o.lanes[0] === -1 || o.lanes[0] === 1, 'bough only over the left or right lane');
      const pair = BIOMES[o.biome].slide;
      assert.equal(o.type, o.lanes[0] === -1 ? pair[0] : pair[1], 'bough model must lean over the correct side');
    }
  }
  assert.ok(slideRows > 50, 'slide rows do get generated');
});

test('both sides get boughs (not always the same lane)', () => {
  const { obstacles } = simulateGeneration(2, 240);
  const types = new Set(obstacles.filter((o) => OBSTACLES[o.type].cell === 'SLIDE').map((o) => o.type));
  assert.ok(types.has('branchL') && types.has('branchR'));
});

// ---- Levels, portals and moving obstacles ----------------------------------------------------

test('every biome uses only known obstacle types, with the right kind for every cell', () => {
  for (const b of BIOMES) {
    for (const t of biomeTypes(b)) assert.ok(OBSTACLES[t], `${b.id}: unknown type ${t}`);
    for (const t of b.jump) assert.equal(OBSTACLES[t].cell, 'JUMP');
    assert.equal(OBSTACLES[b.wide].lanes, 3);
    for (const t of b.slide) assert.equal(OBSTACLES[t].cell, 'SLIDE');
    for (const t of b.block) assert.equal(OBSTACLES[t].cell, 'BLOCK');
    assert.ok(OBSTACLES[b.moving].move, `${b.id}: moving obstacle needs move data`);
  }
});

test('each biome generates only its own models (all of them over a long run)', () => {
  for (let i = 0; i < BIOMES.length; i++) {
    const { obstacles } = simulateGeneration(40 + i, 300, { biome: i });
    const allowed = new Set(biomeTypes(BIOMES[i]));
    const seen = new Set();
    for (const o of obstacles) {
      assert.ok(allowed.has(o.type), `${o.type} in ${BIOMES[i].id}`);
      assert.equal(o.biome, i);
      seen.add(o.type);
    }
    for (const t of allowed) assert.ok(seen.has(t), `${BIOMES[i].id} never generated ${t}`);
  }
});

test('level change: an empty stretch around the portal, new models only after it', () => {
  for (let seed = 1; seed <= 25; seed++) {
    const { rows, obstacles, transitions } = simulateGeneration(seed, 200, { every: 45 });
    assert.ok(transitions.length >= 3, 'portals were placed');
    for (const tr of transitions) {
      assert.ok(tr.gateS > tr.from && tr.to > tr.gateS);
      // seconds of empty track before and after the gate at top speed
      assert.ok(tr.gateS - tr.from >= CFG.biome.preGate * 15 - 1e-6);
      assert.ok(tr.to - tr.gateS >= CFG.biome.postGate * 15 - 1e-6);
      for (const r of rows) {
        if (r.s >= tr.from && r.s <= tr.to) assert.ok(r.cells.every((c) => c === CELL.EMPTY), `obstacle inside the portal zone (seed ${seed})`);
      }
      for (const o of obstacles) {
        // moving obstacles start further ahead, but they always MEET the player outside the zone
        const s = rowS(o);
        assert.ok(s < tr.from || s > tr.to, `obstacle at ${s} in zone ${tr.from}..${tr.to}`);
        if (s > tr.to && s < tr.to + 200) assert.equal(o.biome, tr.biome, 'after the portal: next biome');
        if (s < tr.from && s > tr.from - 200) assert.equal(o.biome, tr.fromBiome, 'before the portal: old biome');
      }
    }
    // passability still holds across every portal
    let reach = initialReach();
    for (const r of rows) {
      reach = advanceReach(reach, r.cells, r.gapTime);
      assert.ok(reach.size > 0);
    }
  }
});

test('moving obstacles appear, start far ahead and reach their row exactly when the player does', () => {
  const { obstacles } = simulateGeneration(3, 240);
  const moving = obstacles.filter((o) => OBSTACLES[o.type].move);
  assert.ok(moving.length > 10, `moving obstacles generated: ${moving.length}`);
  for (const o of moving) {
    const { run } = OBSTACLES[o.type].move;
    assert.equal(movingS(o, o.rowS - 1000), o.rowS + run, 'waits at rowS + run while far away');
    assert.ok(Math.abs(movingS(o, o.rowS) - o.rowS) < 1e-9, 'meets the player at its row');
    assert.ok(movingS(o, o.rowS - 10) > movingS(o, o.rowS - 5), 'comes toward the player');
  }
});

test('nothing else is ever in the path of a moving obstacle (no obstacle, no coin, no power-up)', () => {
  for (let seed = 1; seed <= 40; seed++) {
    const gen = new Generator(seed);
    let distance = 0;
    const obstacles = [];
    const coins = [];
    const powerups = [];
    for (let t = 0; t < 240; t += 0.1) {
      const v = speedAt(t);
      distance += v * 0.1;
      if (Math.abs(t % 20) < 0.05) gen.requestPowerUp('magnet');
      const out = gen.ensure(distance, v, t);
      obstacles.push(...out.obstacles);
      coins.push(...out.coins);
      powerups.push(...out.powerups);
    }
    for (const m of obstacles.filter((o) => OBSTACLES[o.type].move)) {
      const lane = m.lanes[0];
      const from = m.rowS + 0.5;
      const to = m.rowS + OBSTACLES[m.type].move.run + OBSTACLES[m.type].depth;
      for (const o of obstacles) {
        if (o === m || !o.lanes.includes(lane)) continue;
        const s = rowS(o);
        assert.ok(s < from || s > to, `${o.type} at ${s} in the path of ${m.type} (${from}..${to}), seed ${seed}`);
      }
      for (const c of coins) if (c.lane === lane) assert.ok(c.s < from || c.s > to, `coin in the path of ${m.type}, seed ${seed}`);
      for (const p of powerups) if (p.lane === lane) assert.ok(p.s < from || p.s > to, `power-up in the path of ${m.type}, seed ${seed}`);
    }
  }
});
