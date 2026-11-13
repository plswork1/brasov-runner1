import test from 'node:test';
import assert from 'node:assert/strict';
import { PlayerView } from '../src/view/playerView.js';
import { BearView } from '../src/view/bearView.js';
import { SkinKit } from '../src/view/skins/kit.js';
import { BOY_SKINS, BOY_SKIN_IDS, BASE_COLORS } from '../src/view/skins/boySkins.js';
import { BEAR_SKINS, BEAR_SKIN_IDS } from '../src/view/skins/bearSkins.js';
import { COSMETICS } from '../src/logic/cosmetics.js';
import { BIOMES } from '../src/logic/biomes.js';
import { PlayerState } from '../src/logic/playerState.js';
import { BearState } from '../src/logic/bear.js';

const fakeScene = { add() {} };
const RIDES = ['snowboard', 'skate', 'bike', 'boat'];
const MODES = ['run', 'swim', 'unicycle', 'hydro'];

/** Every object below `root` that would really be drawn (itself and all its parents visible). */
function drawn(root) {
  const out = [];
  const walk = (o, vis) => {
    const v = vis && o.visible;
    if (v && o.isMesh) out.push(o);
    for (const c of o.children) walk(c, v);
  };
  walk(root, true);
  return out;
}

test('every skin of the catalog has a 3D definition, and the other way round', () => {
  assert.deepEqual(COSMETICS.boy.map((s) => s.id).sort(), [...BOY_SKIN_IDS].sort());
  assert.deepEqual(COSMETICS.bear.map((s) => s.id).sort(), [...BEAR_SKIN_IDS].sort());
  assert.ok(BOY_SKIN_IDS.length - 1 >= 4 && BOY_SKIN_IDS.length - 1 <= 5, '4-5 new boy skins');
  assert.ok(BEAR_SKIN_IDS.length - 1 >= 1 && BEAR_SKIN_IDS.length - 1 <= 2, '1-2 new bear skins');
  for (const s of Object.values(BOY_SKINS)) {
    for (const k of Object.keys(s.colors)) assert.ok(k in BASE_COLORS, `${s.id}: unknown color slot ${k}`);
    assert.ok(Array.isArray(s.winter) && Array.isArray(s.summer));
  }
});

test('the rides and bear modes used by the levels are exactly the four + four the skins are tested with', () => {
  assert.deepEqual([...new Set(BIOMES.map((b) => b.ride))].sort(), [...RIDES].sort());
  const modes = new Set(BIOMES.map((b) => b.bear ?? (b.water ? 'swim' : 'run')));
  for (const m of modes) assert.ok(MODES.includes(m), m);
});

test('boy: every skin works on all 4 rides, in both outfits, in every pose', () => {
  const pv = new PlayerView(fakeScene);
  const p = new PlayerState();
  const power = (on) => ({ magnet: on, board: on, jetpack: on, shield: on, slowmo: on, ending: { magnet: false, board: false, jetpack: false, shield: false, slowmo: false } });
  for (const id of BOY_SKIN_IDS) {
    pv.setSkin(id);
    assert.equal(pv.skinId, id);
    for (const ride of RIDES) {
      for (const winter of [true, false]) {
        pv.setRide(ride, winter);
        // the ride itself is untouched by the skin: exactly one is shown
        const shown = [pv.board, pv.skate, pv.bike, pv.hull].filter((r) => r.visible);
        assert.equal(shown.length, 1, `${id}/${ride}`);
        const seated = ride === 'bike' || ride === 'boat';
        assert.ok(pv.legs.every((l) => l.visible === !seated) && pv.seatLegs.every((l) => l.visible === seated), `${id}/${ride} legs`);
        for (const pose of ['ride', 'jump', 'slide', 'fly']) {
          p.reset();
          if (pose === 'jump') p.jump();
          if (pose === 'slide') p.slide();
          if (pose === 'fly') p.startFlight();
          for (let i = 0; i < 5; i++) {
            p.update(1 / 60);
            assert.doesNotThrow(() => pv.update(p, 1 / 60, { speed: 20, riding: true, power: power(pose === 'fly') }), `${id}/${ride}/${pose}`);
          }
          const meshes = drawn(pv.root);
          assert.ok(meshes.length >= 12, `${id}/${ride}/${pose}: only ${meshes.length} meshes drawn`);
          for (const m of meshes) {
            assert.ok(m.geometry?.attributes?.position?.count > 0, `${id}/${ride}: empty geometry`);
            const e = m.matrixWorld.elements;
            m.updateWorldMatrix(true, false);
            assert.ok(e.every(Number.isFinite), `${id}/${ride}/${pose}: NaN transform`);
          }
          // things worn on the back make room for the jetpack
          for (const part of pv.extras.noJet) assert.equal(part.visible, pose !== 'fly', `${id}/${ride}/${pose} back parts`);
        }
      }
    }
  }
});

test('boy: skins differ from each other (colors or extra parts)', () => {
  const pv = new PlayerView(fakeScene);
  const looks = new Set();
  for (const id of BOY_SKIN_IDS) {
    pv.setSkin(id);
    pv.setRide('snowboard', true);
    const colors = Object.values(pv.skinMats).map((m) => m.color.getHex()).join();
    const extras = Object.values(pv.extras).reduce((n, l) => n + l.length, 0);
    looks.add(`${colors}|${extras}`);
    if (id !== 'clasic') assert.ok(extras >= 3, `${id} has its own parts (${extras})`);
  }
  assert.equal(looks.size, BOY_SKIN_IDS.length);
});

test('boy: the classic skin is exactly the v1 look (base colors, no extras, v1 head parts per outfit)', () => {
  const pv = new PlayerView(fakeScene);
  pv.setSkin('mascota');
  pv.setSkin('clasic');
  for (const [k, m] of Object.entries(pv.skinMats)) assert.equal(m.color.getHex(), BASE_COLORS[k], k);
  assert.equal(Object.values(pv.extras).flat().length, 0);
  const vis = () => Object.entries(pv.baseParts).filter(([, o]) => o.visible).map(([k]) => k).sort();
  pv.setRide('snowboard', true);
  assert.deepEqual(vis(), ['hat', 'hem', 'lens', 'pompom', 'scarf', 'scarfTail', 'strap']);
  pv.setRide('skate', false);
  assert.deepEqual(vis(), ['cap', 'eyes', 'hair', 'hem', 'visor']);
});

test('bear: every skin works in all 4 modes and all phases; the mode outfits and vehicles are untouched', () => {
  const bv = new BearView(fakeScene);
  for (const id of BEAR_SKIN_IDS) {
    bv.setSkin(id);
    assert.equal(bv.skinId, id);
    for (const mode of MODES) {
      bv.setMode(mode);
      const riding = mode === 'unicycle' || mode === 'hydro';
      assert.equal(bv.riding, riding);
      assert.equal(bv.rig.visible, !riding);
      assert.equal(bv.riderRig.visible, riding);
      for (const [k, v] of Object.entries(bv.vehicles)) assert.equal(v.group.visible, k === mode, `${id}/${mode} vehicle ${k}`);
      for (const [k, parts] of Object.entries(bv.outfits)) for (const o of parts) assert.equal(o.visible, k === mode, `${id}/${mode} outfit ${k}`);
      const bear = new BearState();
      bear.hit();
      for (let i = 0; i < 400; i++) {
        bear.update(1 / 60);
        assert.doesNotThrow(() => bv.update(bear, 0.5, 1 / 60, 20), `${id}/${mode}`);
      }
      bear.reset();
      bear.hit();
      bear.graceLeft = 0;
      bear.hit(); // caught
      bv.caughtT = 0.2;
      assert.doesNotThrow(() => bv.update(bear, 0, 1 / 60, 20));
      assert.doesNotThrow(() => bv.showcase(0, 0, 1.2, 1 / 60, 14));
      const meshes = drawn(bv.root);
      assert.ok(meshes.length >= 10, `${id}/${mode}: ${meshes.length} meshes`);
      if (id !== 'brun') {
        const extrasDrawn = bv.extras.filter((o) => drawn(bv.root).includes(o)).length;
        assert.ok(extrasDrawn >= 2, `${id}/${mode}: the skin shows at least 2 of its parts (${extrasDrawn})`);
      }
    }
  }
});

test('bear: fur color changes with the skin and comes back for the brown bear', () => {
  const bv = new BearView(fakeScene);
  const base = bv.furMats.fur.color.getHex();
  bv.setSkin('craciun');
  assert.notEqual(bv.furMats.fur.color.getHex(), base);
  bv.setSkin('brun');
  assert.equal(bv.furMats.fur.color.getHex(), base);
  assert.equal(bv.extras.length, 0);
});

test('no leak: changing skins many times keeps the number of live geometries and materials constant', () => {
  const pv = new PlayerView(fakeScene);
  const bv = new BearView(fakeScene);
  const disposed = { g: 0, m: 0 };
  const cycle = () => {
    for (const id of BOY_SKIN_IDS) pv.setSkin(id);
    for (const id of BEAR_SKIN_IDS) bv.setSkin(id);
    pv.setSkin('mascota');
    bv.setSkin('craciun');
  };
  cycle();
  const after1 = { ...SkinKit.live };
  // count real dispose() calls of the resources of one skin
  const kit = pv.kit;
  for (const g of kit.geos.values()) g.addEventListener('dispose', () => disposed.g++);
  for (const m of kit.mats.values()) m.addEventListener('dispose', () => disposed.m++);
  const owned = { g: kit.geos.size, m: kit.mats.size };
  assert.ok(owned.g > 0 && owned.m > 0);
  for (let i = 0; i < 50; i++) cycle();
  assert.deepEqual({ ...SkinKit.live }, after1, 'same number of live resources after 50 more rounds');
  assert.deepEqual(disposed, owned, 'every geometry and material of the replaced skin was disposed exactly once');
  // no orphan meshes left hanging on the model
  pv.setSkin('clasic');
  bv.setSkin('brun');
  const stray = [];
  pv.root.traverse((o) => o.isMesh && [...kit.geos.values()].includes(o.geometry) && stray.push(o));
  assert.equal(stray.length, 0);
  pv.dispose();
  bv.dispose();
});

test('no leak: setting the same skin again does nothing, an unknown skin falls back to the default', () => {
  const pv = new PlayerView(fakeScene);
  pv.setSkin('schior');
  const kit = pv.kit;
  pv.setSkin('schior');
  assert.equal(pv.kit, kit, 'no rebuild');
  pv.setSkin('does-not-exist');
  assert.equal(pv.skinId, 'clasic');
  const bv = new BearView(fakeScene);
  bv.setSkin(undefined);
  assert.equal(bv.skinId, 'brun');
  pv.dispose();
  bv.dispose();
});

test('changing the skin in the middle of a run keeps the ride, the pose and the power-up props', () => {
  const pv = new PlayerView(fakeScene);
  const p = new PlayerState();
  pv.setRide('bike', false);
  p.startFlight();
  const power = { magnet: true, board: false, jetpack: true, shield: true, slowmo: true, ending: { magnet: false, board: false, jetpack: false, shield: false, slowmo: false } };
  pv.update(p, 1 / 60, { power });
  pv.setSkin('salvamont');
  pv.update(p, 1 / 60, { power });
  assert.equal(pv.ride, 'bike');
  assert.equal(pv.bike.visible, true);
  assert.equal(pv.jetProp.visible, true);
  assert.equal(pv.magnetProp.visible, true);
  assert.equal(pv.shieldProp.visible, true);
  assert.equal(pv.clockProp.visible, true);
  assert.ok(pv.extras.noJet.length > 0 && pv.extras.noJet.every((o) => !o.visible), 'the backpack is hidden under the jetpack');
  assert.equal(pv.baseParts.cap.visible, true, 'summer outfit kept');
  pv.dispose();
});

test('draw calls: the extra parts of a skin are merged per material (a handful of meshes, not dozens)', () => {
  const pv = new PlayerView(fakeScene);
  const bv = new BearView(fakeScene);
  for (const id of BOY_SKIN_IDS) {
    pv.setSkin(id);
    const n = Object.values(pv.extras).flat().length;
    assert.ok(n <= 12, `${id}: ${n} extra meshes`);
    // merged meshes still belong to the kit (so they are disposed with it)
    for (const o of Object.values(pv.extras).flat()) assert.ok([...pv.kit.geos.values()].includes(o.geometry), `${id}: geometry owned by the kit`);
  }
  for (const id of BEAR_SKIN_IDS) {
    bv.setSkin(id);
    assert.ok(bv.extras.length <= 10, `${id}: ${bv.extras.length} extra meshes`);
  }
  pv.dispose();
  bv.dispose();
});
