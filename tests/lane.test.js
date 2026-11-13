import test from 'node:test';
import assert from 'node:assert/strict';
import { PlayerState } from '../src/logic/playerState.js';
import { CFG } from '../src/config.js';

const H = 1 / 120;

test('lane change reaches the lane (0.3) well inside gen.laneTime', () => {
  const p = new PlayerState();
  p.moveLane(1);
  let t = 0;
  while (Math.abs(p.x - CFG.laneW) > 0.3 && t < 1) {
    p.update(H);
    t += H;
  }
  assert.ok(t <= CFG.gen.laneTime, `took ${t}`);
});

test('lane change is smooth: one gentle speed hump, never backwards (owner found the snappy version abrupt)', () => {
  const p = new PlayerState();
  p.moveLane(1);
  const v = [];
  for (let i = 0; i < 60; i++) {
    p.update(H);
    v.push(p.laneVel);
  }
  const peak = Math.max(...v);
  const top = v.indexOf(peak);
  assert.ok(peak < 26, `peak sideways speed ${peak.toFixed(1)} (the snappy version reached 36)`);
  for (let i = 1; i <= top; i++) assert.ok(v[i] >= v[i - 1] - 1e-9, `speeds up smoothly (frame ${i})`);
  for (let i = top + 1; i < v.length; i++) assert.ok(v[i] <= v[i - 1] + 1e-9 && v[i] >= 0, `slows down without wobble (frame ${i}: ${v[i]})`);
});

test('no visible overshoot, and the boy settles exactly on the lane center', () => {
  const p = new PlayerState();
  p.moveLane(1);
  let max = 0;
  for (let i = 0; i < 240; i++) {
    p.update(H);
    max = Math.max(max, p.x);
  }
  const over = (max - CFG.laneW) / CFG.laneW;
  assert.ok(over < 0.01, `overshoot ${over}`);
  assert.equal(p.x, CFG.laneW);
  assert.equal(p.laneVel, 0);
});

test('x never leaves the track, with any frame time and any swipe spam', () => {
  for (const dt of [1 / 240, 1 / 120, 1 / 60, 1 / 30, 0.1]) {
    const p = new PlayerState();
    let seed = 7;
    for (let i = 0; i < 600; i++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (seed % 5 === 0) p.moveLane(seed % 2 ? 1 : -1);
      p.update(dt);
      assert.ok(Math.abs(p.x) <= CFG.laneW + CFG.lane.overLimit + 1e-9, `x=${p.x} dt=${dt}`);
      assert.ok(Number.isFinite(p.x) && Number.isFinite(p.laneVel));
    }
  }
});

test('laneVel points toward the target while changing lane, and a reversal is immediate', () => {
  const p = new PlayerState();
  p.moveLane(1);
  p.update(H);
  assert.ok(p.laneVel > 0);
  p.moveLane(-1); // back to the middle
  p.update(H);
  assert.ok(p.laneVel < p.x, 'velocity now goes left');
  let t = 0;
  while (Math.abs(p.x) > 0.3 && t < 1) {
    p.update(H);
    t += H;
  }
  assert.ok(t < CFG.gen.laneTime);
});

test('two quick changes (left then left) reach the far lane in time', () => {
  const p = new PlayerState();
  p.moveLane(-1);
  for (let i = 0; i < 6; i++) p.update(H);
  p.moveLane(-1);
  let t = 0;
  while (Math.abs(p.x + CFG.laneW) > 0.3 && t < 1) {
    p.update(H);
    t += H;
  }
  assert.ok(t <= CFG.gen.laneTime * 1.2, `${t}`);
});

test('idle player does not drift and the edge event still fires', () => {
  const p = new PlayerState();
  for (let i = 0; i < 100; i++) p.update(H);
  assert.equal(p.x, 0);
  p.moveLane(-1);
  p.takeEvents();
  p.update(0.5);
  assert.equal(p.moveLane(-1), false);
  assert.deepEqual(p.takeEvents(), ['edge']);
});
