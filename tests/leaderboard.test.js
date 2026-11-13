import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createLeaderboard,
  normalizeEntries,
  sanitizeName,
  STORAGE_KEY,
  MAX_ENTRIES,
  NAME_MAX,
} from '../src/logic/leaderboard.js';

function memStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => void m.set(k, String(v)),
    removeItem: (k) => void m.delete(k),
    _m: m,
  };
}

// v2: the default name is Romanian now ("Jucător" instead of "Player"): all in-game text is Romanian.
test('sanitizeName limits to 12 characters, trims, strips control chars and angle brackets', () => {
  assert.equal(sanitizeName('  Marius   Druga  '), 'Marius Druga');
  assert.equal(sanitizeName('x'.repeat(40)).length, NAME_MAX);
  assert.equal(sanitizeName('<b>hi</b>'), 'bhi/b');
  assert.equal(sanitizeName('a\u0000b\nc'), 'abc');
  assert.equal(sanitizeName(''), 'Jucător');
  assert.equal(sanitizeName(null), 'Jucător');
  assert.equal(sanitizeName(42), 'Jucător');
  assert.equal(Array.from(sanitizeName('😀'.repeat(20))).length, NAME_MAX);
});

test('saves scores sorted descending and keeps only the top 10', () => {
  const lb = createLeaderboard(memStorage());
  for (let i = 1; i <= 15; i++) lb.add({ name: `P${i}`, score: i * 100 });
  const top = lb.getTop();
  assert.equal(top.length, MAX_ENTRIES);
  assert.equal(top[0].score, 1500);
  assert.equal(top[9].score, 600);
  for (let i = 1; i < top.length; i++) assert.ok(top[i - 1].score >= top[i].score);
});

test('rank is reported, and null when the score does not make the top 10', () => {
  const lb = createLeaderboard(memStorage());
  for (let i = 1; i <= 10; i++) lb.add({ name: 'A', score: i * 1000 });
  assert.equal(lb.add({ name: 'Top', score: 99999 }).rank, 1);
  assert.equal(lb.add({ name: 'Low', score: 5 }).rank, null);
});

test('qualifies(): zero never qualifies; full board needs to beat the 10th place', () => {
  const lb = createLeaderboard(memStorage());
  assert.equal(lb.qualifies(0), false);
  assert.equal(lb.qualifies(-5), false);
  assert.equal(lb.qualifies(NaN), false);
  assert.equal(lb.qualifies(1), true);
  for (let i = 1; i <= 10; i++) lb.add({ name: 'A', score: i * 100 });
  assert.equal(lb.qualifies(100), false); // equals the 10th place
  assert.equal(lb.qualifies(101), true);
});

test('survives corrupted JSON', () => {
  const lb = createLeaderboard(memStorage({ [STORAGE_KEY]: '{not json' }));
  assert.deepEqual(lb.getTop(), []);
  const r = lb.add({ name: 'Ok', score: 10 });
  assert.equal(r.entries.length, 1);
});

test('survives wrong shapes and invalid entries inside valid JSON', () => {
  const bad = JSON.stringify([
    null,
    42,
    'x',
    { name: 'NoScore' },
    { name: 'Neg', score: -5 },
    { name: 'Inf', score: Infinity },
    { name: 'Str', score: '100' },
    { name: 'Good', score: 250.9 },
  ]);
  const lb = createLeaderboard(memStorage({ [STORAGE_KEY]: bad }));
  const top = lb.getTop();
  assert.equal(top.length, 1);
  assert.equal(top[0].name, 'Good');
  assert.equal(top[0].score, 250);
  assert.deepEqual(normalizeEntries({ not: 'an array' }), []);
});

test('survives storage that throws on read and write', () => {
  const throwing = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('quota'); },
    removeItem() { throw new Error('blocked'); },
  };
  const lb = createLeaderboard(throwing);
  assert.deepEqual(lb.getTop(), []);
  const r = lb.add({ name: 'Mem', score: 77 });
  assert.equal(r.rank, 1);
  // Scores added while writing fails are still shown during the session
  assert.equal(lb.getTop()[0].score, 77);
  lb.add({ name: 'Mem2', score: 88 });
  assert.equal(lb.getTop()[0].score, 88);
  assert.doesNotThrow(() => lb.clear());
});

test('missing localStorage (undefined storage) falls back to memory', () => {
  const lb = createLeaderboard(); // uses safeStorage(); node has no localStorage
  lb.clear();
  lb.add({ name: 'N', score: 5 });
  assert.equal(lb.getTop()[0].score, 5);
  lb.clear();
});

test('ties: the older entry stays ahead', () => {
  let t = 1000;
  const lb = createLeaderboard(memStorage(), () => new Date((t += 1000)));
  lb.add({ name: 'First', score: 500 });
  lb.add({ name: 'Second', score: 500 });
  const top = lb.getTop();
  assert.equal(top[0].name, 'First');
  assert.equal(top[1].name, 'Second');
});

test('data persists across instances (same storage)', () => {
  const st = memStorage();
  createLeaderboard(st).add({ name: 'Saved', score: 321 });
  assert.equal(createLeaderboard(st).getTop()[0].name, 'Saved');
});

test('scores are floored to integers and capped', () => {
  const lb = createLeaderboard(memStorage());
  lb.add({ name: 'F', score: 99.99 });
  assert.equal(lb.getTop()[0].score, 99);
  assert.equal(normalizeEntries([{ name: 'Big', score: 1e15 }])[0].score, 1e9);
});
