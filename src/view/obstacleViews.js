import * as THREE from 'three';
import { CFG, OBSTACLES } from '../config.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C, geo, mat, mesh, paint } from './materials.js';
import { CITY_BUILDERS } from './obstacles/city.js';
import { MALL_BUILDERS } from './obstacles/mall.js';
import { LAKE_BUILDERS } from './obstacles/lake.js';

const box = (w, h, d) => geo(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d));
const sph = (r, ws = 10, hs = 8) => geo(`s${r},${ws},${hs}`, () => new THREE.SphereGeometry(r, ws, hs));
const cylX = (r, len, seg = 8) =>
  geo(`cx${r},${len},${seg}`, () => new THREE.CylinderGeometry(r, r, len, seg).rotateZ(Math.PI / 2));
const cylY = (rt, rb, h, seg = 7) => geo(`cy${rt},${rb},${h},${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));
const cone = (r, h, seg = 7) => geo(`co${r},${h},${seg}`, () => new THREE.ConeGeometry(r, h, seg));
const ico = (r) => geo(`ic${r}`, () => new THREE.IcosahedronGeometry(r, 0));

const snow = () => mat(C.snow);
const W = CFG.laneW;

// ----------------------------------------------------------------------------------------------
// Builders: each returns a THREE.Group centered on the obstacle's lane (x = 0) with its base at y = 0.
// Visual sizes match the collision boxes in config.js, so what you see is what you hit.
// ----------------------------------------------------------------------------------------------

function buildLog() {
  const g = new THREE.Group();
  const side = mat(C.wood);
  const cut = mat(C.woodLight);
  // cylinder groups: [side, top cap, bottom cap] -> after rotateZ the caps point along +/-x
  const geom = geo('log-geo', () => new THREE.CylinderGeometry(0.42, 0.42, 2.2, 9).rotateZ(Math.PI / 2));
  g.add(mesh(geom, [side, cut, cut], 0, 0.4, 0));
  g.add(mesh(box(1.3, 0.12, 0.5), snow(), 0.1, 0.8, 0));
  g.add(mesh(cylX(0.1, 0.5, 6), mat(C.woodDark), -0.3, 0.72, 0.38)); // stub branch
  return g;
}

function buildWideLog() {
  const g = new THREE.Group();
  const side = mat(C.wood);
  const cut = mat(C.woodLight);
  const geom = geo('wlog-geo', () => new THREE.CylinderGeometry(0.44, 0.44, W * 3 + 0.4, 10).rotateZ(Math.PI / 2));
  g.add(mesh(geom, [side, cut, cut], 0, 0.42, 0));
  for (const x of [-2.3, 0.4, 2.6]) g.add(mesh(box(1.5, 0.12, 0.5), snow(), x, 0.84, 0));
  for (const x of [-2.9, 1.7]) g.add(mesh(cylX(0.1, 0.5, 6), mat(C.woodDark), x, 0.78, 0.4));
  return g;
}

function buildRidge() {
  const g = new THREE.Group();
  const m = mesh(sph(1, 10, 6), mat(0xe7f1fb), 0, 0, 0);
  m.scale.set(1.12, 0.72, 1.05);
  g.add(m);
  for (const [x, z, h] of [
    [-0.4, 0.1, 0.5],
    [0.35, -0.2, 0.38],
  ]) {
    g.add(mesh(cone(0.14, h, 5), mat(C.ice), x, 0.5 + h / 2 - 0.2, z)); // ice shards
  }
  return g;
}

function buildBranch(side) {
  // A pine standing OUTSIDE the track (side = -1 left, +1 right) whose snowy bough reaches across the lane.
  // The bough fills the collision box (y 1.35..2.9): you slide under it, you cannot jump over it.
  const g = new THREE.Group();
  const tx = side * 1.75; // trunk x (outside the lane, which spans about +-1.08)
  g.add(mesh(cylY(0.3, 0.45, 6.4, 7), mat(C.woodDark), tx, 3.2, 0));
  // crown of the tree above the bough
  for (const [y, r, h] of [
    [4.2, 1.7, 2.0],
    [5.3, 1.35, 1.8],
    [6.3, 0.95, 1.5],
  ]) {
    g.add(mesh(cone(r, h, 7), mat(C.pine), tx, y, 0));
    g.add(mesh(cone(r * 0.78, h * 0.5, 7), snow(), tx, y + h * 0.3, 0));
  }
  // the limb reaching over the lane
  g.add(mesh(cylX(0.17, 2.9, 7), mat(C.woodDark), side * 0.3, 2.45, 0));
  // heavy needle clumps hanging from the limb, with snow on top
  for (const x of [-0.5, 0, 0.5]) {
    const clump = mesh(sph(0.62, 8, 6), mat(C.pine), x, 1.95, 0);
    clump.scale.set(1.0, 0.9, 0.85);
    g.add(clump);
    const cap = mesh(sph(0.62, 8, 5), snow(), x, 2.5, 0);
    cap.scale.set(1.0, 0.45, 0.8);
    g.add(cap);
  }
  // icicles hanging from the lowest edge (tips point down)
  const icicle = geo('icicle', () => new THREE.ConeGeometry(0.1, 0.38, 5).rotateX(Math.PI));
  for (const x of [-0.6, 0.1, 0.65]) g.add(mesh(icicle, mat(C.ice), x, 1.5, 0.12));
  return g;
}

function buildRock() {
  const g = new THREE.Group();
  const r = mesh(ico(1.0), mat(C.rock), 0, 1.15, 0);
  r.scale.set(1.0, 1.3, 1.0);
  r.rotation.y = 0.6;
  g.add(r);
  const r2 = mesh(ico(0.6), mat(C.rockDark), 0.55, 0.5, 0.5);
  g.add(r2);
  const cap = mesh(ico(0.62), snow(), -0.05, 2.05, 0);
  cap.scale.set(1.0, 0.55, 1.0);
  g.add(cap);
  return g;
}

function buildSnowman() {
  const g = new THREE.Group();
  const s = new THREE.Group();
  const white = mat(0xfcfdff);
  s.add(mesh(sph(0.9, 12, 10), white, 0, 0.9, 0));
  s.add(mesh(sph(0.66, 12, 10), white, 0, 2.0, 0));
  s.add(mesh(sph(0.46, 12, 10), white, 0, 2.9, 0));
  // The snowman faces +Z, toward the player/camera.
  s.add(mesh(cone(0.07, 0.4, 6), mat(C.orange), 0, 2.9, 0.62).rotateX(Math.PI / 2)); // carrot nose
  for (const x of [-0.17, 0.17]) s.add(mesh(sph(0.06, 6, 5), mat(0x111111), x, 3.03, 0.4));
  for (const y of [1.85, 2.1]) s.add(mesh(sph(0.07, 6, 5), mat(0x111111), 0, y, 0.64)); // buttons
  s.add(mesh(cylY(0.5, 0.5, 0.12, 12), mat(0x2b2b33), 0, 3.3, 0)); // hat brim
  s.add(mesh(cylY(0.32, 0.32, 0.5, 12), mat(0x2b2b33), 0, 3.55, 0)); // hat top
  s.add(mesh(cylY(0.33, 0.33, 0.1, 12), mat(C.red), 0, 3.38, 0)); // hat band
  const scarf = mesh(new THREE.TorusGeometry(0.4, 0.09, 6, 12), mat(C.red), 0, 2.5, 0);
  scarf.rotation.x = Math.PI / 2;
  s.add(scarf);
  for (const sx of [-1, 1]) {
    const arm = mesh(cylX(0.04, 0.9, 5), mat(C.woodDark), sx * 0.95, 2.1, 0);
    arm.rotation.z = sx * 0.5;
    s.add(arm);
  }
  s.scale.setScalar(0.8); // top ~2.85 units
  g.add(s);
  return g;
}

function buildStump() {
  const g = new THREE.Group();
  g.add(mesh(cylY(0.62, 0.78, 2.4, 8), mat(C.woodDark), 0, 1.2, 0));
  g.add(mesh(cone(0.6, 0.7, 6), mat(C.wood), 0.05, 2.75, 0)); // jagged broken top
  g.add(mesh(cone(0.3, 0.5, 5), mat(C.wood), 0.4, 2.65, 0.15));
  g.add(mesh(cylY(0.66, 0.66, 0.16, 8), snow(), 0, 2.38, 0)); // snow band
  g.add(mesh(cylX(0.12, 0.9, 5), mat(C.woodDark), 0.7, 1.4, 0.1)); // old branch stub
  return g;
}

function buildSnowball() {
  const g = new THREE.Group();
  const ball = new THREE.Group();
  ball.position.set(0, 1.2, 0);
  ball.userData.dynamic = true;
  ball.add(mesh(sph(1.2, 12, 10), mat(0xf7fbff), 0, 0, 0));
  ball.name = 'ball';
  // a few darker clumps so the rotation is visible
  for (const [x, y, z] of [
    [0.5, 0.4, 0.95],
    [-0.7, 0.2, 0.85],
    [0.1, -0.7, 0.95],
    [-0.3, 0.8, 0.9],
    [0.8, -0.3, 0.85],
  ]) {
    ball.add(mesh(sph(0.2, 6, 5), mat(C.snowShade), x, y, z));
  }
  g.add(ball);
  // it rolls toward the player: the rotation follows the distance it has travelled
  g.userData.animate = (travel) => (ball.rotation.x = travel / 1.2);
  return g;
}

const BUILDERS = {
  log: buildLog,
  ridge: buildRidge,
  wideLog: buildWideLog,
  branchL: () => buildBranch(-1),
  branchR: () => buildBranch(1),
  rock: buildRock,
  snowman: buildSnowman,
  stump: buildStump,
  snowball: buildSnowball,
  ...CITY_BUILDERS,
  ...MALL_BUILDERS,
  ...LAKE_BUILDERS,
};

/**
 * Merge the static parts of a model into one mesh per material (fewer draw calls on phones).
 * Parts that move (wheels, legs, brushes, bobbing floats...) are groups flagged with
 * userData.dynamic: meshes are merged inside the frame of their nearest moving ancestor, so every
 * animation keeps working. Meshes with several materials (e.g. logs) are left as they are.
 */
const _m = new THREE.Matrix4();
export function compactModel(root) {
  root.updateMatrixWorld(true);
  const frames = new Map(); // frame object -> Map(material -> [geometry])
  const remove = [];
  root.traverse((o) => {
    if (!o.isMesh || Array.isArray(o.material) || o.userData.keep) return;
    let f = o.parent;
    while (f !== root && !f.userData.dynamic) f = f.parent;
    // geometry in the frame's local space
    _m.copy(f.matrixWorld).invert().multiply(o.matrixWorld);
    let g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    g.applyMatrix4(_m);
    for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (!g.attributes.normal) g.computeVertexNormals();
    g.clearGroups();
    if (!frames.has(f)) frames.set(f, new Map());
    const byMat = frames.get(f);
    if (!byMat.has(o.material)) byMat.set(o.material, []);
    byMat.get(o.material).push(g);
    remove.push(o);
  });
  for (const o of remove) o.parent.remove(o);
  for (const [f, byMat] of frames) {
    for (const [material, geos] of byMat) {
      const g = geos.length === 1 ? geos[0] : mergeGeometries(geos, false);
      f.add(new THREE.Mesh(g, material));
    }
  }
  return root;
}

/**
 * Object pool for obstacles: meshes are created lazily the first time a type is needed and are
 * reused afterwards (hidden when released), so no geometry/material is created while playing.
 */
export class ObstaclePool {
  constructor(scene) {
    this.scene = scene;
    this.free = Object.fromEntries(Object.keys(BUILDERS).map((k) => [k, []]));
    this.created = 0;
  }

  acquire(type) {
    const list = this.free[type];
    let m = list.pop();
    if (!m) {
      m = compactModel(BUILDERS[type]());
      m.traverse((o) => {
        o.castShadow = true;
        o.receiveShadow = true;
      });
      m.userData.type = type;
      this.scene.add(m);
      this.created++;
    }
    m.visible = true;
    // A hit obstacle is "smashed away" (it pops up, spins and shrinks), so EVERYTHING the animation
    // touches must be reset here, otherwise recycled obstacles would float in the air.
    m.scale.set(1, 1, 1);
    m.rotation.set(0, 0, 0);
    m.position.y = 0;
    return m;
  }

  release(m) {
    m.visible = false;
    this.free[m.userData.type].push(m);
  }
}

// ----------------------------------------------------------------------------------------------
// Coins: gold discs facing the camera that spin around the vertical axis.
// ----------------------------------------------------------------------------------------------
let coinMat = null;
let coinGeo = null;

/**
 * Coin material: gold with vertex colors (rim darker, face lighter) and a moving shine. The shine is a
 * bright diagonal band; its phase depends on the coin's world depth, so a row of coins is swept by one
 * wave of light. The emissive part is strong enough for a bloom pass to pick the coins up.
 */
function coinMaterial() {
  const uTime = { value: 0 };
  const m = new THREE.MeshPhongMaterial({ vertexColors: true, emissive: 0x8a5a00, specular: 0xfff2c0, shininess: 80 });
  m.onBeforeCompile = (sh) => {
    sh.uniforms.uTime = uTime;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec2 vCoin;\nvarying float vCoinZ;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvCoin = position.xy;\nvCoinZ = (modelMatrix * vec4(position, 1.0)).z;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;\nvarying vec2 vCoin;\nvarying float vCoinZ;')
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float band = (vCoin.x + vCoin.y) * 0.7;
        float ph = fract(uTime * 0.55 - vCoinZ * 0.035) * 2.2 - 0.9;
        totalEmissiveRadiance += vec3(1.0, 0.85, 0.45) * smoothstep(0.13, 0.0, abs(band - ph)) * 0.9;`,
      );
  };
  // one shared clock for every coin, read when the coin is drawn (no per-frame work in the game loop)
  m.userData.uTime = uTime;
  return m;
}

function buildCoin() {
  if (!coinMat) {
    coinMat = coinMaterial();
    // beveled rim + raised lighter face with a small embossed boss, all one geometry
    const rim = new THREE.LatheGeometry(
      [[0.29, -0.05], [0.37, -0.05], [0.41, -0.02], [0.41, 0.02], [0.37, 0.05], [0.29, 0.05]].map(([x, y]) => new THREE.Vector2(x, y)),
      20,
    ).rotateX(Math.PI / 2);
    const face = new THREE.LatheGeometry(
      [[0, -0.075], [0.22, -0.075], [0.29, -0.05], [0.29, 0.05], [0.22, 0.075], [0, 0.075]].map(([x, y]) => new THREE.Vector2(x, y)),
      20,
    ).rotateX(Math.PI / 2);
    const boss = new THREE.CylinderGeometry(0.1, 0.12, 0.17, 6).rotateX(Math.PI / 2);
    coinGeo = mergeGeometries([paint(rim, 0xf0a818), paint(face, 0xffd94f), paint(boss, 0xfff0a0)].map((g) => (g.index ? g.toNonIndexed() : g)));
  }
  const g = new THREE.Group();
  const m = new THREE.Mesh(coinGeo, coinMat);
  m.onBeforeRender = () => (coinMat.userData.uTime.value = performance.now() / 1000);
  g.add(m);
  return g;
}

export class CoinPool {
  constructor(scene, { castShadow = true } = {}) {
    this.scene = scene;
    this.free = [];
    this.created = 0;
    this.castShadow = castShadow; // off on phones: many coins = many extra shadow draw calls
  }
  acquire() {
    let m = this.free.pop();
    if (!m) {
      m = buildCoin();
      m.traverse((o) => (o.castShadow = this.castShadow));
      this.scene.add(m);
      this.created++;
    }
    m.visible = true;
    return m;
  }
  release(m) {
    m.visible = false;
    this.free.push(m);
  }
}

export { OBSTACLES };
