import * as THREE from 'three';
import { box, cone, cylX, cylY, cylZ, geo, ico, mat, mesh, pedal, person, sph, stripeMat } from './kit.js';

/**
 * Obstacles on Lacul Noua. Everything floats: y = 0 is the water surface. Low things (logs, buoys,
 * a floating boom) are hopped over with the pedal boat, willow branches over a side lane are ducked
 * under, and rocks, the duck house, the old pier and other (open, roofless) pedal boats must be steered around.
 */

const water = () => mat(0x4d9aa6);
const foam = () => new THREE.MeshBasicMaterial({ color: 0xe8fbff, transparent: true, opacity: 0.65, depthWrite: false });
let foamMat = null;
const FOAM = () => (foamMat ??= foam());

/** Ring of foam around something floating. */
function foamRing(r) {
  return mesh(geo(`foam${r}`, () => new THREE.RingGeometry(r, r + 0.18, 20).rotateX(-Math.PI / 2)), FOAM(), 0, 0.02, 0);
}

const bob = (g, amount = 0.05, speed = 2.2) => (travel, t, s) => {
  g.position.y = Math.sin(t * speed + s * 0.37) * amount;
  g.rotation.z = Math.sin(t * speed * 0.8 + s) * 0.03;
};

/** Floating log with a broken branch. */
export function buildFloatLog() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.userData.dynamic = true; // bobs on the waves
  g.add(inner);
  const lg = geo('flog', () => new THREE.CylinderGeometry(0.36, 0.36, 2.1, 9).rotateZ(Math.PI / 2));
  inner.add(mesh(lg, [mat(0x6e4a2c), mat(0xc39b6a), mat(0xc39b6a)], 0, 0.22, 0));
  inner.add(mesh(cylX(0.09, 0.6, 5), mat(0x5a3a22), 0.3, 0.5, 0.15));
  inner.add(mesh(ico(0.15), mat(0x5f8d3e), -0.5, 0.55, 0)); // a bit of moss
  inner.add(mesh(box(2.3, 0.02, 0.9), FOAM(), 0, 0.02, 0));
  g.userData.animate = bob(inner, 0.06, 2);
  return g;
}

/** Three big orange buoys on a rope across the lane. */
export function buildBuoys() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.userData.dynamic = true; // bobs on the waves
  g.add(inner);
  for (const x of [-0.7, 0, 0.7]) {
    inner.add(mesh(sph(0.36, 12, 9), mat(0xff7a1a), x, 0.3, 0));
    inner.add(mesh(cylY(0.37, 0.37, 0.1, 12), mat(0xffffff), x, 0.36, 0));
    inner.add(foamRing(0.36).translateX(x));
  }
  inner.add(mesh(cylX(0.025, 2.1, 5), mat(0xe8e0c8), 0, 0.3, 0));
  g.userData.animate = bob(inner, 0.07, 2.6);
  return g;
}

/** Floating boom (yellow floats) across all three lanes. */
export function buildBoom() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.userData.dynamic = true; // bobs on the waves
  g.add(inner);
  const float = geo('boomFloat', () => new THREE.CylinderGeometry(0.3, 0.3, 0.9, 10).rotateZ(Math.PI / 2));
  for (let i = 0; i < 8; i++) {
    const x = -3.5 + i * 1.0;
    inner.add(mesh(float, mat(i % 2 ? 0xffd21f : 0xff9f1c), x, 0.25, 0));
  }
  inner.add(mesh(cylX(0.04, 7.6, 5), mat(0x444444), 0, 0.5, 0));
  for (const x of [-3.9, 3.9]) {
    inner.add(mesh(cylY(0.1, 0.1, 1.1, 6), mat(0x6e4a2c), x, 0.3, 0)); // anchor posts at the ends
    inner.add(mesh(sph(0.12, 6, 5), mat(0xe63946), x, 0.88, 0));
  }
  inner.add(mesh(box(8, 0.02, 0.8), FOAM(), 0, 0.02, 0));
  g.userData.animate = bob(inner, 0.05, 1.8);
  return g;
}

/** Weeping willow on a little grassy hummock at the edge, its branches hanging over a side lane. */
export function buildWillow(side) {
  const g = new THREE.Group();
  const tx = side * 1.9;
  g.add(mesh(cylY(1.0, 1.3, 0.45, 10), mat(0x5f9a44), tx, 0.12, 0));
  g.add(mesh(cylY(0.3, 0.42, 3.4, 7), mat(0x5e4630), tx, 1.9, 0));
  const crown = mesh(ico(1.7, 1), mat(0x7fa64a), tx - side * 0.4, 3.9, 0);
  crown.scale.set(1.3, 0.7, 1.0);
  g.add(crown);
  // the curtain of strands over the lane, bottom at ~1.4
  const strands = new THREE.Group();
  strands.userData.dynamic = true;
  strands.position.set(0, 3.0, 0);
  const strand = geo('willowStrand', () => new THREE.ConeGeometry(0.17, 1.6, 4).rotateX(Math.PI).translate(0, -0.8, 0));
  const greens = [mat(0x8db357), mat(0x739b42), mat(0x9cc066)];
  for (let i = 0; i < 12; i++) {
    const x = side * 1.5 - side * i * 0.22;
    for (const z of [-0.25, 0.25]) {
      const m = mesh(strand, greens[(i + (z > 0 ? 1 : 0)) % 3], x, 0, z);
      m.scale.y = 0.95 + ((i * 7) % 3) * 0.03;
      strands.add(m);
    }
  }
  strands.add(mesh(cylX(0.08, 3.3, 5), mat(0x5e4630), side * 0.3, 0.05, 0)); // the limb
  g.add(strands);
  g.userData.animate = (travel, t) => {
    strands.rotation.z = Math.sin(t * 1.4) * 0.03;
    strands.rotation.x = Math.sin(t * 1.1) * 0.04;
  };
  return g;
}

/** Rocky islet with a small birch. */
export function buildIslet() {
  const g = new THREE.Group();
  const r1 = mesh(ico(1.0), mat(0x7d7a72), 0, 0.45, 0);
  r1.scale.set(1.05, 0.8, 1.0);
  g.add(r1);
  g.add(mesh(ico(0.6), mat(0x8e8a80), 0.55, 0.3, 0.45));
  g.add(mesh(ico(0.5), mat(0x6c695f), -0.6, 0.2, -0.3));
  g.add(mesh(cylY(0.6, 0.8, 0.2, 9), mat(0x5f9a44), 0, 1.15, 0));
  g.add(mesh(cylY(0.07, 0.1, 1.4, 6), mat(0xf2efe6), 0.05, 1.9, 0)); // birch trunk
  g.add(mesh(ico(0.6, 1), mat(0x8fbf4f), 0.05, 2.8, 0));
  g.add(mesh(ico(0.42, 1), mat(0x7aae42), 0.35, 2.45, 0.2));
  g.add(foamRing(1.05));
  return g;
}

/** Floating duck house with two ducks. */
export function buildDuckHouse() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.userData.dynamic = true; // bobs on the waves
  g.add(inner);
  inner.add(mesh(box(1.9, 0.3, 1.6), mat(0x8a6440), 0, 0.12, 0));
  inner.add(mesh(box(1.3, 1.1, 1.1), mat(0xd9b27c), 0, 0.85, 0));
  const roof = mesh(geo('duckRoof', () => {
    const s = new THREE.Shape();
    s.moveTo(-0.85, 0);
    s.lineTo(0, 0.75);
    s.lineTo(0.85, 0);
    s.lineTo(-0.85, 0);
    return new THREE.ExtrudeGeometry(s, { depth: 1.4, bevelEnabled: false }).translate(0, 0, -0.7);
  }), mat(0xb3412e), 0, 1.4, 0);
  inner.add(roof);
  inner.add(mesh(cylZ(0.25, 0.06, 10), mat(0x2b1d14), 0, 0.85, 0.56)); // round door
  inner.add(mesh(box(0.5, 0.05, 0.6), mat(0x8a6440), 0, 0.3, 1.05)); // ramp
  // two ducks resting on the platform
  for (const [x, z] of [
    [-0.6, 0.9],
    [0.75, 0.6],
  ]) {
    const body = mesh(sph(0.25, 8, 6), mat(0xffffff), x, 0.45, z);
    body.scale.set(1, 0.7, 1.4);
    inner.add(body);
    inner.add(mesh(sph(0.14, 8, 6), mat(0xffffff), x, 0.68, z + 0.25));
    inner.add(mesh(cone(0.05, 0.16, 5), mat(0xf0a020), x, 0.66, z + 0.42).rotateX(Math.PI / 2));
  }
  inner.add(mesh(box(2.1, 0.02, 1.8), FOAM(), 0, 0.02, 0));
  g.userData.animate = bob(inner, 0.05, 1.6);
  return g;
}

/** Old wooden pier posts with a small platform and a life buoy. */
export function buildPier() {
  const g = new THREE.Group();
  const wood = mat(0x6e4a2c);
  for (const x of [-0.7, 0.7]) for (const z of [-0.55, 0.55]) g.add(mesh(cylY(0.16, 0.18, 2.4, 7), wood, x, 0.9, z));
  g.add(mesh(box(1.9, 0.18, 1.5), mat(0x8a6440), 0, 1.25, 0));
  for (let i = 0; i < 5; i++) g.add(mesh(box(0.34, 0.04, 1.52), mat(0x9a7450), -0.76 + i * 0.38, 1.36, 0));
  g.add(mesh(cylY(0.06, 0.06, 1.3, 6), mat(0xf2f2f2), 0.7, 2.0, 0.55));
  const ring = mesh(geo('lifebuoy', () => new THREE.TorusGeometry(0.3, 0.09, 8, 16)), stripeMat('#ffffff', '#e63946', 8), 0.7, 2.1, 0.62);
  g.add(ring);
  g.add(mesh(ico(0.18), mat(0x2f3a45), -0.6, 1.5, 0.2)); // a fishing bucket
  for (const x of [-0.7, 0.7]) for (const z of [-0.55, 0.55]) g.add(foamRing(0.2).translateX(x).translateZ(z));
  return g;
}

/**
 * Pedal boat (hidrobicicletă) hull. Used by the boats coming toward the player and by the
 * player's own boat (see playerView).
 */
export function buildPedalBoatHull(colors = {}) {
  const g = new THREE.Group();
  const white = mat(colors.hull ?? 0xf6f6f2);
  const seat = mat(colors.seat ?? 0x2f9bd6);
  const floatGeo = geo('pbFloat', () => new THREE.CylinderGeometry(0.26, 0.26, 2.3, 10).rotateX(Math.PI / 2));
  const noseGeo = geo('pbNose', () => new THREE.SphereGeometry(0.26, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2).rotateX(Math.PI / 2));
  for (const x of [-0.55, 0.55]) {
    g.add(mesh(floatGeo, white, x, 0.12, 0));
    g.add(mesh(noseGeo, white, x, 0.12, 1.15)); // rounded front of each float (+z)
  }
  g.add(mesh(box(1.4, 0.16, 1.8), white, 0, 0.42, -0.05)); // deck
  g.add(mesh(box(1.3, 0.12, 0.7), seat, 0, 0.62, -0.25)); // bench
  g.add(mesh(box(1.3, 0.55, 0.12), seat, 0, 0.9, -0.62)); // backrest
  // paddle wheel at the back
  const wheel = new THREE.Group();
  wheel.userData.dynamic = true;
  wheel.position.set(0, 0.25, -1.1);
  wheel.add(mesh(cylX(0.08, 0.6, 8), mat(0x555555), 0, 0, 0));
  for (let k = 0; k < 6; k++) {
    const p = mesh(box(0.55, 0.06, 0.36), seat, 0, 0, 0);
    p.rotation.x = (k / 6) * Math.PI * 2;
    p.position.set(0, Math.sin((k / 6) * Math.PI * 2) * 0.18, Math.cos((k / 6) * Math.PI * 2) * 0.18);
    wheel.add(p);
  }
  g.add(wheel);
  g.add(mesh(box(1.2, 0.3, 0.1), seat, 0, 0.6, 0.8)); // front panel
  g.userData.wheel = wheel;
  return g;
}

/**
 * Pedal boat coming toward the player, open (no sunshade roof): one person pedals hard while the
 * other one stands up on the bench, waving with one hand and taking a selfie with the other.
 * The standing passenger is what makes the boat taller than a jump (collision top in config.js).
 */
export function buildPedalBoat() {
  const g = new THREE.Group();
  const inner = new THREE.Group();
  inner.userData.dynamic = true; // bobs on the waves
  g.add(inner);
  const hull = buildPedalBoatHull({ seat: 0xf2c230 });
  inner.add(hull);
  // the one who works: seated, pedalling
  const driver = person({ shirt: 0x2a9d8f, pants: 0x264653, hairStyle: 'cap', helmet: 0xe63946 });
  driver.group.position.set(-0.3, 0.68, -0.25);
  driver.group.scale.setScalar(0.9);
  for (const a of driver.arms) a.rotation.x = -0.4;
  inner.add(driver.group);
  // the one who doesn't: standing on the bench (straight legs), selfie phone in front of the face
  const star = person({ shirt: 0xff8fab, pants: 0x3a3f58, hairStyle: 'long', hair: 0x8a5a2b });
  star.group.position.set(0.32, 0.68 + 0.88, -0.25);
  star.group.scale.setScalar(0.9);
  for (const l of star.legs) {
    l.rotation.x = Math.PI / 2; // thigh straight down
    l.userData.shin.rotation.x = -Math.PI / 2; // shin straight down too
  }
  const [wave, selfie] = star.arms;
  wave.userData.dynamic = true;
  wave.rotation.x = Math.PI + 0.15; // arm up (waving, see animate)
  selfie.rotation.x = -1.85; // arm stretched forward and a bit up...
  selfie.add(mesh(box(0.1, 0.18, 0.03), mat(0x1a1a1a), 0, -0.6, 0.02)); // ...holding the phone
  selfie.add(mesh(box(0.08, 0.14, 0.01), new THREE.MeshBasicMaterial({ color: 0x9fe3ff }), 0, -0.6, 0.04));
  inner.add(star.group);
  inner.add(mesh(cylY(0.03, 0.03, 0.9, 5), mat(0xdddddd), -0.62, 0.95, -0.85)); // little flag at the back
  inner.add(mesh(box(0.02, 0.26, 0.4), stripeMat('#f2c230', '#2f9bd6', 4), -0.62, 1.28, -0.65));
  inner.add(mesh(box(1.7, 0.02, 2.7), FOAM(), 0, 0.02, 0.2));
  const wheel = hull.userData.wheel;
  g.userData.animate = (travel, t, s) => {
    inner.position.y = Math.sin(t * 2.4 + s) * 0.05;
    inner.rotation.z = Math.sin(t * 1.9 + s) * 0.035;
    wheel.rotation.x = -travel * 1.6;
    pedal(driver.legs, travel * 1.6);
    // waving: arm up, swinging left-right
    wave.rotation.z = -0.35 + Math.sin(t * 9 + s) * 0.35;
    star.torso.rotation.z = Math.sin(t * 2.4 + s) * 0.06; // keeping her balance
  };
  pedal(driver.legs, 0);
  return g;
}

export const LAKE_BUILDERS = {
  floatLog: buildFloatLog,
  buoys: buildBuoys,
  boom: buildBoom,
  willowL: () => buildWillow(-1),
  willowR: () => buildWillow(1),
  islet: buildIslet,
  duckHouse: buildDuckHouse,
  pier: buildPier,
  pedalBoat: buildPedalBoat,
};

export { water };
