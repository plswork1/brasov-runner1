import test from 'node:test';
import assert from 'node:assert/strict';
import { wrapRel } from '../src/view/world.js';

// Regression for "the trees disappear after the first death": scenery positions are computed from the
// distance alone, so they are correct for ANY distance, including a jump back to 0 on restart.
test('wrapRel keeps every scenery object within [-behind, span - behind) for any distance', () => {
  const span = 230;
  const behind = 18;
  for (const base of [0, 5, 117.3, 229.9]) {
    for (const distance of [0, 1, 50, 229, 230, 231, 5000, 123456.7, 0, -3]) {
      const rel = wrapRel(base, distance, behind, span);
      assert.ok(rel >= -behind && rel < span - behind, `base ${base} distance ${distance} -> ${rel}`);
      // and it is the same object position modulo the span
      const k = (base - distance - rel) / span;
      assert.ok(Math.abs(k - Math.round(k)) < 1e-6);
    }
  }
});

test('after a long run and a restart the scenery is spread in front of the player again', () => {
  const span = 230;
  const items = Array.from({ length: 60 }, (_, i) => (i / 60) * span);
  for (const distance of [0, 3000, 0]) {
    const ahead = items.map((o) => wrapRel(o, distance, 18, span)).filter((r) => r > 0 && r < 150).length;
    assert.ok(ahead >= 35, `${ahead} objects ahead at distance ${distance}`);
  }
});
