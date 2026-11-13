import test from 'node:test';
import assert from 'node:assert/strict';
import { BearState, BearPhase } from '../src/logic/bear.js';

const run = (b, seconds, dt = 1 / 60) => {
  const ev = [];
  for (let t = 0; t < seconds - 1e-9; t += dt) {
    const e = b.update(dt);
    if (e) ev.push(e);
  }
  return ev;
};

test('bear is not visible at the start', () => {
  const b = new BearState();
  assert.equal(b.phase, BearPhase.NONE);
  assert.equal(b.visible, false);
});

test('first hit starts a 5 second chase, it does not end the game', () => {
  const b = new BearState();
  assert.equal(b.hit(), 'chase-start');
  assert.equal(b.phase, BearPhase.CHASING);
  assert.ok(Math.abs(b.remaining - 5) < 1e-9);
});

test('a second hit after the grace period during the chase = caught', () => {
  const b = new BearState();
  b.hit();
  run(b, 1.5);
  assert.equal(b.hit(), 'caught');
  assert.equal(b.phase, BearPhase.CAUGHT);
});

test('a hit during the grace period is ignored (same obstacle cluster cannot double-hit)', () => {
  const b = new BearState();
  b.hit();
  run(b, 0.5);
  assert.equal(b.hit(), 'ignored');
  assert.equal(b.phase, BearPhase.CHASING);
});

test('surviving exactly 5 seconds leaves the bear behind, then it disappears', () => {
  const b = new BearState();
  b.hit();
  const ev = run(b, 5.02);
  assert.deepEqual(ev, ['escaped']);
  assert.equal(b.phase, BearPhase.LEAVING);
  const ev2 = run(b, 1.5);
  assert.deepEqual(ev2, ['gone']);
  assert.equal(b.phase, BearPhase.NONE);
  assert.equal(b.visible, false);
});

test('after the bear is gone, the next hit starts a new chase (not game over)', () => {
  const b = new BearState();
  b.hit();
  run(b, 7);
  assert.equal(b.phase, BearPhase.NONE);
  assert.equal(b.hit(), 'chase-start');
  assert.ok(Math.abs(b.remaining - 5) < 1e-9, 'timer restarts at the full 5 seconds');
});

test('a hit while the bear is leaving counts as a new first hit', () => {
  const b = new BearState();
  b.hit();
  run(b, 5.3);
  assert.equal(b.phase, BearPhase.LEAVING);
  assert.equal(b.hit(), 'chase-start');
  assert.equal(b.phase, BearPhase.CHASING);
});

test('once caught nothing changes', () => {
  const b = new BearState();
  b.hit();
  run(b, 2);
  b.hit();
  assert.equal(b.hit(), 'ignored');
  run(b, 10);
  assert.equal(b.phase, BearPhase.CAUGHT);
});

test('the timer only advances with update(dt): pausing = not calling update', () => {
  const b = new BearState();
  b.hit();
  run(b, 2);
  const left = b.remaining;
  // "paused": no updates for a long time
  assert.equal(b.remaining, left);
  assert.ok(Math.abs(left - 3) < 0.02);
});

test('remaining fraction goes from 1 to 0 over the chase', () => {
  const b = new BearState();
  b.hit();
  assert.equal(b.remainingFraction, 1);
  run(b, 2.5);
  assert.ok(Math.abs(b.remainingFraction - 0.5) < 0.01);
});

test('reset clears everything', () => {
  const b = new BearState();
  b.hit();
  run(b, 2);
  b.reset();
  assert.equal(b.phase, BearPhase.NONE);
  assert.equal(b.invulnerable, false);
  assert.equal(b.remaining, 0);
});
