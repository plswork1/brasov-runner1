import test from 'node:test';
import assert from 'node:assert/strict';
import { ObstaclePool } from '../src/view/obstacleViews.js';
import { OBSTACLES } from '../src/config.js';

const fakeScene = { add() {} };

// Regression: a hit obstacle is knocked into the air (y, rotation, scale). Recycled meshes used to keep
// that height, so after the first hit "floating" obstacles appeared all over the track.
test('recycled obstacle meshes come back at ground level, unscaled and unrotated', () => {
  const pool = new ObstaclePool(fakeScene);
  for (const type of Object.keys(OBSTACLES)) {
    const m = pool.acquire(type);
    m.position.y = 2.5;
    m.rotation.z = 2.5;
    m.scale.setScalar(0.001);
    pool.release(m);
    const again = pool.acquire(type);
    assert.equal(again, m, `${type} should be reused from the pool`);
    assert.equal(again.position.y, 0, `${type} height`);
    assert.equal(again.rotation.z, 0, `${type} rotation`);
    assert.equal(again.scale.x, 1, `${type} scale`);
    assert.equal(again.visible, true);
  }
});

test('every obstacle type has a model', () => {
  const pool = new ObstaclePool(fakeScene);
  for (const type of Object.keys(OBSTACLES)) assert.doesNotThrow(() => pool.acquire(type), type);
});
