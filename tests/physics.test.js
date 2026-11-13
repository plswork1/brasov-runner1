import test from 'node:test';
import assert from 'node:assert/strict';
import { PlayerState } from '../src/logic/playerState.js';
import { sweptOverlap, playerHitsObstacle, playerCollectsCoin } from '../src/logic/collision.js';
import { speedAt, launchFactor, computeScore } from '../src/logic/speed.js';
import { CFG } from '../src/config.js';

const step = (p, seconds, dt = 1 / 120) => {
  for (let t = 0; t < seconds - 1e-9; t += dt) p.update(dt);
};

test('speed curve: starts at base, increases monotonically, never exceeds max', () => {
  assert.equal(speedAt(0), CFG.speed.base);
  let prev = 0;
  for (let t = 0; t <= 2000; t += 1) {
    const v = speedAt(t);
    assert.ok(v >= prev - 1e-12, 'monotonic');
    assert.ok(v <= CFG.speed.max + 1e-9, 'bounded');
    prev = v;
  }
  assert.ok(speedAt(2000) > CFG.speed.max - 0.01);
  // gains slow down over time (ease-out)
  assert.ok(speedAt(10) - speedAt(0) > speedAt(110) - speedAt(100));
});

test('launch ramp is smooth from 0 to 1', () => {
  assert.equal(launchFactor(0), 0);
  assert.equal(launchFactor(CFG.speed.launchTime), 1);
  assert.equal(launchFactor(99), 1);
});

test('score = distance + coin bonus', () => {
  assert.equal(computeScore(1000, 0), 1000);
  assert.equal(computeScore(1000, 10), 1000 + 10 * CFG.score.perCoin);
});

test('jump: leaves the ground, peaks near the expected height, lands', () => {
  const p = new PlayerState();
  p.jump();
  assert.equal(p.grounded, false);
  let peak = 0;
  let t = 0;
  while (!p.grounded && t < 3) {
    p.update(1 / 120);
    peak = Math.max(peak, p.y);
    t += 1 / 120;
  }
  const expectedPeak = (CFG.jump.v0 ** 2) / (2 * CFG.jump.gravity);
  assert.ok(Math.abs(peak - expectedPeak) < 0.06, `peak ${peak} vs ${expectedPeak}`);
  assert.ok(Math.abs(t - (2 * CFG.jump.v0) / CFG.jump.gravity) < 0.03);
  assert.equal(p.y, 0);
});

test('jump apex clears every low obstacle but no solid one', async () => {
  const { OBSTACLES } = await import('../src/config.js');
  const apex = (CFG.jump.v0 ** 2) / (2 * CFG.jump.gravity);
  for (const [name, def] of Object.entries(OBSTACLES)) {
    if (def.cell === 'JUMP') assert.ok(apex > def.top + 0.9, `${name} should be easy to clear`);
    if (def.cell === 'BLOCK') assert.ok(apex + CFG.hitForgive < def.top, `${name} must not be jumpable`);
  }
});

test('slide lasts its duration and shrinks the hitbox', () => {
  const p = new PlayerState();
  p.slide();
  assert.equal(p.sliding, true);
  assert.equal(p.box().height, CFG.player.slideHeight);
  step(p, CFG.slide.duration + 0.05);
  assert.equal(p.sliding, false);
  assert.equal(p.box().height, CFG.player.height);
});

test('down in the air = fast fall then slide on landing', () => {
  const p = new PlayerState();
  p.jump();
  step(p, 0.2);
  p.slide();
  assert.ok(p.vy <= -CFG.jump.fastFall + 1e-9);
  step(p, 0.4);
  assert.equal(p.grounded, true);
  assert.equal(p.sliding, true);
});

test('jump during a slide cancels the slide', () => {
  const p = new PlayerState();
  p.slide();
  p.jump();
  assert.equal(p.sliding, false);
  assert.equal(p.grounded, false);
});

test('input buffer: a jump pressed just before landing fires on landing', () => {
  const p = new PlayerState();
  p.jump();
  // fly until ~0.06s before touching the ground
  const air = (2 * CFG.jump.v0) / CFG.jump.gravity;
  step(p, air - 0.06);
  assert.equal(p.grounded, false);
  p.jump(); // early press
  step(p, 0.2);
  assert.equal(p.grounded, false, 'second jump started automatically');
  assert.ok(p.events.includes('jump'));
});

test('input buffer expires: a jump pressed too early is dropped', () => {
  const p = new PlayerState();
  p.jump();
  step(p, 0.1);
  p.jump(); // far too early
  const air = (2 * CFG.jump.v0) / CFG.jump.gravity;
  step(p, air); // lands
  step(p, 0.1);
  assert.equal(p.grounded, true);
});

test('lane changes clamp at the edges and converge smoothly to the lane center', () => {
  const p = new PlayerState();
  assert.equal(p.moveLane(-1), true);
  assert.equal(p.moveLane(-1), false); // already on the left edge
  assert.equal(p.lane, -1);
  // v3: the spring may overshoot the lane center by a few percent, but it moves toward it until it
  // gets there the first time, then stays within the overshoot band and settles.
  let last = 0;
  let arrived = false;
  for (let i = 0; i < 120; i++) {
    p.update(1 / 120);
    if (!arrived) {
      assert.ok(p.x <= last + 1e-9, 'moves monotonically toward the target');
      arrived = p.x <= -CFG.laneW;
    } else {
      assert.ok(p.x >= -CFG.laneW * 1.04, 'overshoot stays small');
    }
    last = p.x;
  }
  assert.ok(Math.abs(p.x - -CFG.laneW) < 0.01);
  assert.equal(p.moveLane(1), true);
  assert.equal(p.moveLane(1), true);
  assert.equal(p.moveLane(1), false);
  assert.equal(p.lane, 1);
});

test('rapid lane changes never leave the playfield', () => {
  const p = new PlayerState();
  for (let i = 0; i < 500; i++) {
    p.moveLane(i % 3 === 0 ? -1 : 1);
    p.update(1 / 60);
    assert.ok(Math.abs(p.x) <= CFG.laneW + 1e-6);
  }
});

test('swept overlap never tunnels through an obstacle, even with a huge step', () => {
  // player jumps from s=0 to s=100 in one step, obstacle at s=50
  assert.equal(sweptOverlap(0, 100, 0.3, 50, 0.5), true);
  assert.equal(sweptOverlap(0, 10, 0.3, 50, 0.5), false);
  assert.equal(sweptOverlap(49.9, 50.1, 0.3, 50, 0.5), true);
});

test('collision: standing player hits a rock, a jumping player hits a log only when low', () => {
  const stand = { x: 0, feetY: 0, height: CFG.player.height, halfW: CFG.player.halfW, halfDepth: CFG.player.halfDepth };
  assert.equal(playerHitsObstacle(9.9, 10.1, stand, { type: 'rock', lanes: [0], s: 10 }), true);
  assert.equal(playerHitsObstacle(9.9, 10.1, stand, { type: 'rock', lanes: [-1], s: 10 }), false); // other lane
  const air = { ...stand, feetY: 1.5 };
  assert.equal(playerHitsObstacle(9.9, 10.1, air, { type: 'log', lanes: [0], s: 10 }), false);
  assert.equal(playerHitsObstacle(9.9, 10.1, air, { type: 'rock', lanes: [0], s: 10 }), true); // cannot jump rocks
  assert.equal(playerHitsObstacle(9.9, 10.1, stand, { type: 'log', lanes: [0], s: 10 }), true);
});

test('collision: only sliding passes under a bough; standing or jumping hits it', () => {
  const base = { x: 0, halfW: CFG.player.halfW, halfDepth: CFG.player.halfDepth };
  const bar = { type: 'branchR', lanes: [0], s: 10 };
  assert.equal(playerHitsObstacle(9.9, 10.1, { ...base, feetY: 0, height: CFG.player.height }, bar), true);
  assert.equal(playerHitsObstacle(9.9, 10.1, { ...base, feetY: 0, height: CFG.player.slideHeight }, bar), false);
  assert.equal(playerHitsObstacle(9.9, 10.1, { ...base, feetY: 1.9, height: CFG.player.height }, bar), true);
});

test('collision: a three-lane obstacle covers all lanes', () => {
  const stand = { x: 0, feetY: 0, height: CFG.player.height, halfW: CFG.player.halfW, halfDepth: CFG.player.halfDepth };
  for (const lane of [-1, 0, 1]) {
    const p = { ...stand, x: lane * CFG.laneW };
    assert.equal(playerHitsObstacle(9.9, 10.1, p, { type: 'wideLog', lanes: [-1, 0, 1], s: 10 }), true);
  }
});

test('collision: lane change next to an obstacle does not hit it when fully in the neighbour lane', () => {
  const p = { x: CFG.laneW, feetY: 0, height: CFG.player.height, halfW: CFG.player.halfW, halfDepth: CFG.player.halfDepth };
  assert.equal(playerHitsObstacle(9.9, 10.1, p, { type: 'rock', lanes: [0], s: 10 }), false);
});

test('coin collection: same lane and height collects, other lane or sliding under a high coin does not', () => {
  const stand = { x: 0, feetY: 0, height: CFG.player.height, halfW: CFG.player.halfW, halfDepth: CFG.player.halfDepth };
  assert.equal(playerCollectsCoin(9.8, 10.2, stand, { lane: 0, s: 10, y: 1 }), true);
  assert.equal(playerCollectsCoin(9.8, 10.2, stand, { lane: 1, s: 10, y: 1 }), false);
  assert.equal(playerCollectsCoin(0, 50, stand, { lane: 0, s: 10, y: 1 }), true); // swept
  const slide = { ...stand, height: CFG.player.slideHeight };
  assert.equal(playerCollectsCoin(9.8, 10.2, slide, { lane: 0, s: 10, y: 1.5 }), false);
});
