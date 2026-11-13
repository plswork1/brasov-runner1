import * as THREE from 'three';
import { C, box, cone, geo, cylX, cylY, cylZ, ico, labelMat, mat, mesh, pedal, person, sph, stripeMat, sway, torus } from './kit.js';

/**
 * Obstacles of the two pedestrian streets: Strada Republicii (old town) and Pietonala Tractorul
 * (modern Coresi). Same collision boxes as the winter ones (config.js): JUMP <= 0.85 high and one
 * lane wide, SLIDE = something hanging over a SIDE lane between y 1.35 and 2.9 with its support
 * outside the track, BLOCK = solid and taller than any normal jump.
 */

const iron = () => mat(0x1d1f24);

// ---- Strada Republicii ----------------------------------------------------------------------

/** Park bench across the lane (jump over it). */
export function buildBench() {
  const g = new THREE.Group();
  const wood = mat(0x9a6a3c);
  for (const x of [-0.85, 0.85]) {
    g.add(mesh(box(0.08, 0.42, 0.5), iron(), x, 0.21, 0));
    g.add(mesh(box(0.08, 0.36, 0.08), iron(), x, 0.6, -0.22));
  }
  for (const z of [-0.12, 0.05, 0.2]) g.add(mesh(box(2.0, 0.05, 0.13), wood, 0, 0.44, z));
  for (const y of [0.62, 0.76]) g.add(mesh(box(2.0, 0.1, 0.05), wood, 0, y, -0.24));
  return g;
}

/** Long low planter with flowers (jardinieră). */
export function buildFlowerBox() {
  const g = new THREE.Group();
  g.add(mesh(box(2.0, 0.5, 0.7), mat(0x8c8277), 0, 0.25, 0));
  g.add(mesh(box(2.08, 0.06, 0.78), mat(0xb7ad9f), 0, 0.5, 0));
  g.add(mesh(box(1.9, 0.08, 0.6), mat(0x4a3424), 0, 0.53, 0));
  const cols = [0xe63946, 0xffb703, 0xff8fab, 0xffffff, 0x9b5de5];
  for (let i = 0; i < 9; i++) {
    const x = -0.8 + i * 0.2;
    g.add(mesh(ico(0.13), mat(0x3f7a30), x, 0.6, (i % 2) * 0.16 - 0.08));
    g.add(mesh(sph(0.075, 6, 5), mat(cols[i % cols.length]), x, 0.72, (i % 2) * 0.16 - 0.08));
  }
  return g;
}

/** Cast-iron bollards with hanging chains across the whole street (3 lanes). */
export function buildChainPosts() {
  const g = new THREE.Group();
  const xs = [-3.4, -1.15, 1.15, 3.4];
  for (const x of xs) {
    g.add(mesh(cylY(0.13, 0.17, 0.75, 8), iron(), x, 0.37, 0));
    g.add(mesh(sph(0.15, 8, 6), iron(), x, 0.8, 0));
    g.add(mesh(cylY(0.2, 0.2, 0.08, 8), iron(), x, 0.04, 0));
  }
  // chains: little torus links hanging in a curve between the posts
  const link = torus(0.05, 0.015, 4, 8);
  for (let i = 0; i < xs.length - 1; i++) {
    for (let k = 1; k < 12; k++) {
      const u = k / 12;
      const x = xs[i] + (xs[i + 1] - xs[i]) * u;
      const y = 0.68 - Math.sin(u * Math.PI) * 0.22;
      const l = mesh(link, iron(), x, y, 0);
      l.rotation.y = k % 2 ? Math.PI / 2 : 0;
      g.add(l);
    }
  }
  return g;
}

/**
 * Café awning (striped) reaching over a side lane from two posts at the edge of the street. The
 * canvas slopes from 2.9 at the posts down to ~1.75 over the far side, with a scalloped valance
 * hanging to 1.4 (you slide under it).
 */
export function buildAwning(side) {
  const g = new THREE.Group();
  const px = side * 1.75; // posts outside the lane
  const D = 1.9; // depth along the track (= collision depth)
  for (const z of [-D / 2 + 0.08, D / 2 - 0.08]) g.add(mesh(cylY(0.06, 0.06, 3.0, 6), iron(), px, 1.5, z));
  g.add(mesh(box(0.5, 0.12, D + 0.3), mat(0x6f6a63), px, 0.06, 0)); // weighted base
  const fabric = stripeMat('#b3122e', '#f6efe2', 10);
  const top = new THREE.Mesh(box(2.65, 0.05, D), fabric);
  top.position.set(side * 0.38, 2.33, 0);
  top.rotation.z = side * 0.42;
  g.add(top);
  // valance along the inner edge, and small side flaps at the front and back
  const val = new THREE.Group();
  val.userData.dynamic = true;
  val.position.set(-side * 0.82, 1.8, 0);
  val.add(mesh(box(0.04, 0.32, D), fabric, 0, 0, 0));
  for (let k = 0; k < 8; k++) val.add(mesh(cylZ(0.06, D / 8, 6), mat(k % 2 ? 0xb3122e : 0xf6efe2), 0, -0.2, -D / 2 + D / 16 + (k * D) / 8));
  g.add(val);
  for (const z of [-D / 2, D / 2]) {
    const flap = mesh(box(2.4, 0.3, 0.03), fabric, side * 0.4, 2.15, z);
    flap.rotation.z = side * 0.42;
    g.add(flap);
  }
  g.add(mesh(cylX(0.035, 2.7, 6), iron(), side * 0.42, 2.38, D / 2 - 0.05)); // frame arms
  g.add(mesh(cylX(0.035, 2.7, 6), iron(), side * 0.42, 2.38, -D / 2 + 0.05));
  // a little café sign on the post
  g.add(mesh(box(0.06, 0.5, 0.8), labelMat('CAFENEA', { bg: '#2b2620', fg: '#f6efe2', w: 256, h: 96, size: 44 }), px - side * 0.08, 1.4, 0));
  g.userData.animate = (travel, t) => sway(val, t, 0.05, 2.4);
  return g;
}

/** Flower and souvenir kiosk (green wooden booth). */
export function buildKiosk() {
  const g = new THREE.Group();
  const green = mat(0x2f6b4f);
  g.add(mesh(box(1.9, 2.2, 1.6), green, 0, 1.1, 0));
  g.add(mesh(box(2.2, 0.15, 1.9), mat(0x6e3b2a), 0, 2.3, 0));
  const roof = mesh(cone(1.6, 0.6, 4), mat(0x8a3a24), 0, 2.68, 0);
  roof.rotation.y = Math.PI / 4;
  g.add(roof);
  // open window with the counter facing the player
  g.add(mesh(box(1.4, 0.9, 0.05), mat(0x2b2620), 0, 1.45, 0.8));
  g.add(mesh(box(1.6, 0.08, 0.35), mat(0xc89a62), 0, 1.0, 0.95));
  g.add(mesh(box(1.4, 0.3, 0.06), labelMat('FLORI', { bg: '#f2e6c8', fg: '#2f6b4f', size: 64 }), 0, 2.05, 0.82));
  // buckets of flowers in front
  const cols = [0xe63946, 0xffb703, 0xff8fab, 0xffffff];
  for (let i = 0; i < 4; i++) {
    const x = -0.75 + i * 0.5;
    g.add(mesh(cylY(0.17, 0.13, 0.4, 7), mat(0x6c757d), x, 0.2, 1.05));
    for (let k = 0; k < 3; k++) g.add(mesh(sph(0.1, 6, 5), mat(cols[(i + k) % 4]), x + (k - 1) * 0.08, 0.5 + k * 0.04, 1.05));
  }
  return g;
}

/** Big stone planter with a small tree. */
export function buildTreePlanter() {
  const g = new THREE.Group();
  g.add(mesh(box(1.7, 0.8, 1.5), mat(0x9e968a), 0, 0.4, 0));
  g.add(mesh(box(1.82, 0.1, 1.62), mat(0xc2b9ac), 0, 0.82, 0));
  g.add(mesh(box(1.55, 0.06, 1.35), mat(0x4a3424), 0, 0.86, 0));
  g.add(mesh(cylY(0.1, 0.14, 1.6, 6), mat(0x6a4a2c), 0, 1.65, 0));
  g.add(mesh(ico(0.95, 1), mat(0x4f8f3a), 0, 2.85, 0));
  g.add(mesh(ico(0.65, 1), mat(0x3f7a30), 0.45, 2.45, 0.3));
  g.add(mesh(ico(0.6, 1), mat(0x5a9a42), -0.4, 3.25, -0.1));
  return g;
}

/** Café terrace table with chairs and a big cream umbrella. */
export function buildTerrace() {
  const g = new THREE.Group();
  const wood = mat(0x4a3a2c);
  g.add(mesh(cylY(0.5, 0.5, 0.05, 12), mat(0x3b2b20), 0, 0.75, 0));
  g.add(mesh(cylY(0.05, 0.08, 0.75, 6), iron(), 0, 0.37, 0));
  for (const [x, z, r] of [
    [-0.75, 0, Math.PI / 2],
    [0.75, 0, -Math.PI / 2],
    [0, 0.72, Math.PI],
    [0, -0.72, 0],
  ]) {
    const ch = new THREE.Group();
    ch.add(mesh(box(0.42, 0.05, 0.42), wood, 0, 0.45, 0));
    ch.add(mesh(box(0.42, 0.5, 0.05), wood, 0, 0.7, -0.2));
    for (const lx of [-0.18, 0.18]) for (const lz of [-0.18, 0.18]) ch.add(mesh(box(0.04, 0.45, 0.04), iron(), lx, 0.22, lz));
    ch.position.set(x, 0, z);
    ch.rotation.y = r;
    g.add(ch);
  }
  g.add(mesh(cylY(0.04, 0.04, 2.5, 6), mat(0xeeeeee), 0, 1.25, 0));
  const umb = mesh(cone(1.25, 0.55, 8), mat(0xf3ead6), 0, 2.65, 0);
  g.add(umb);
  g.add(mesh(cylY(1.25, 1.25, 0.18, 8), mat(0xe9dcc0), 0, 2.32, 0));
  // two cups on the table
  for (const x of [-0.2, 0.18]) g.add(mesh(cylY(0.05, 0.04, 0.09, 6), mat(0xffffff), x, 0.82, 0.1));
  return g;
}

/**
 * Cyclist riding toward the player. `colors` changes the outfit (the Tractorul one is different).
 * userData.animate turns the wheels and the pedals from the distance travelled.
 */
export function buildCyclist(colors = {}) {
  const g = new THREE.Group();
  const frameMat = mat(colors.frame ?? 0x1e88e5);
  const tire = mat(0x1a1a1a);
  const wheels = [];
  for (const z of [-0.58, 0.58]) {
    const w = new THREE.Group();
    w.userData.dynamic = true;
    w.position.set(0, 0.36, z);
    w.add(mesh(torus(0.33, 0.045, 6, 18), tire, 0, 0, 0).rotateY(Math.PI / 2));
    for (let k = 0; k < 3; k++) {
      const spoke = mesh(box(0.02, 0.62, 0.02), mat(0xbfc5cc), 0, 0, 0);
      spoke.rotation.x = (k * Math.PI) / 3;
      w.add(spoke);
    }
    g.add(w);
    wheels.push(w);
  }
  // frame (seen from the front it is a thin diamond)
  const tube = (len, x, y, z, rx) => {
    const m = mesh(box(0.05, 0.05, len), frameMat, x, y, z);
    m.rotation.x = rx;
    g.add(m);
  };
  tube(1.0, 0, 0.62, 0.02, 0.15);
  tube(0.65, 0, 0.5, -0.3, -0.9);
  tube(0.6, 0, 0.5, 0.33, 0.95);
  g.add(mesh(box(0.05, 0.5, 0.05), frameMat, 0, 0.68, -0.18)); // seat tube
  g.add(mesh(box(0.2, 0.06, 0.28), mat(0x222222), 0, 0.95, -0.22)); // saddle
  g.add(mesh(box(0.05, 0.45, 0.05), frameMat, 0, 0.82, 0.48)); // head tube
  g.add(mesh(cylX(0.025, 0.62, 6), mat(0x333333), 0, 1.06, 0.48)); // handlebar
  g.add(mesh(box(0.22, 0.1, 0.12), mat(0xf2f2f2), 0, 0.92, 0.6)); // front light
  g.add(mesh(sph(0.04, 5, 4), new THREE.MeshBasicMaterial({ color: 0xfff6c8 }), 0, 0.92, 0.67));
  const crank = new THREE.Group();
  crank.userData.dynamic = true;
  crank.position.set(0, 0.36, 0.0);
  crank.add(mesh(cylX(0.11, 0.06, 10), mat(0x777777), 0, 0, 0));
  g.add(crank);
  // basket on the front for the Republicii version
  if (colors.basket) {
    g.add(mesh(box(0.42, 0.26, 0.32), mat(0xb08a5a), 0, 0.92, 0.82));
    g.add(mesh(sph(0.1, 6, 5), mat(0xe63946), 0.08, 1.08, 0.82));
    g.add(mesh(sph(0.09, 6, 5), mat(0xffb703), -0.1, 1.06, 0.86));
  }
  const rider = person({ shirt: colors.shirt ?? 0xf4a261, pants: colors.pants ?? 0x264653, hair: colors.hair ?? 0x3b2a1e, hairStyle: colors.hairStyle ?? 'helmet', helmet: colors.helmet ?? 0xffffff });
  rider.group.position.set(0, 1.0, -0.22);
  rider.torso.rotation.x = 0.42; // leaning toward the handlebar
  for (const a of rider.arms) a.rotation.x = -1.1;
  g.add(rider.group);
  g.userData.animate = (travel) => {
    const a = travel / 0.33;
    for (const w of wheels) w.rotation.x = a;
    crank.rotation.x = a * 0.5;
    pedal(rider.legs, a * 0.5);
    g.rotation.z = Math.sin(a * 0.25) * 0.03; // a little balance wobble
  };
  pedal(rider.legs, 0);
  return g;
}

// ---- Pietonala Tractorul ----------------------------------------------------------------------

/** Row of stainless bike-rack hoops across the lane. */
export function buildBikeRack() {
  const g = new THREE.Group();
  const steel = mat(0xb8bfc7);
  for (const x of [-0.75, 0, 0.75]) {
    for (const dx of [-0.25, 0.25]) g.add(mesh(cylY(0.04, 0.04, 0.62, 6), steel, x + dx, 0.31, 0));
    g.add(mesh(cylX(0.04, 0.5, 6), steel, x, 0.62, 0));
    const arc = mesh(torus(0.25, 0.04, 5, 10), steel, x, 0.62, 0);
    arc.scale.set(1, 0.6, 1);
    g.add(arc);
  }
  g.add(mesh(box(2.1, 0.04, 0.3), mat(0x6b7078), 0, 0.02, 0));
  return g;
}

/** Low clipped hedge in a concrete edge (one lane). */
export function buildHedge() {
  const g = new THREE.Group();
  g.add(mesh(box(2.1, 0.2, 0.95), mat(0xa5a29b), 0, 0.1, 0));
  const leaf = mat(0x3f7f3a);
  for (let i = 0; i < 5; i++) {
    const b = mesh(ico(0.36, 1), leaf, -0.8 + i * 0.4, 0.45, 0);
    b.scale.set(1.15, 0.85, 1.2);
    g.add(b);
  }
  return g;
}

/** Hedge across the whole promenade, with small white flowers. */
export function buildHedgeRow() {
  const g = new THREE.Group();
  g.add(mesh(box(7.4, 0.22, 1.0), mat(0xa5a29b), 0, 0.11, 0));
  const leaf = mat(0x3d7a37);
  for (let i = 0; i < 17; i++) {
    const b = mesh(ico(0.4, 1), leaf, -3.3 + i * 0.41, 0.47, 0);
    b.scale.set(1.1, 0.8, 1.15);
    g.add(b);
    if (i % 2) g.add(mesh(sph(0.06, 5, 4), mat(0xffffff), -3.3 + i * 0.41, 0.77, 0.25));
  }
  return g;
}

/** Modern wooden pergola: a steel post outside the track and timber slats over the side lane. */
export function buildPergola(side) {
  const g = new THREE.Group();
  const steel = mat(0x3d4248);
  const wood = mat(0xb98552);
  const px = side * 1.75;
  g.add(mesh(box(0.18, 2.95, 0.18), steel, px, 1.47, -0.4));
  g.add(mesh(box(0.18, 2.95, 0.18), steel, px, 1.47, 0.4));
  g.add(mesh(box(2.9, 0.16, 0.16), steel, side * 0.35, 2.85, -0.4));
  g.add(mesh(box(2.9, 0.16, 0.16), steel, side * 0.35, 2.85, 0.4));
  // vertical timber slats hanging down to 1.4 (a "curtain" you duck under)
  for (let i = 0; i < 9; i++) {
    const x = side * (1.45 - i * 0.29);
    g.add(mesh(box(0.1, 1.45, 0.9), wood, x, 2.1, 0));
  }
  // climbing plant on top
  for (let i = 0; i < 4; i++) g.add(mesh(ico(0.32, 1), mat(0x4f8f3a), side * (1.2 - i * 0.7), 2.98, (i % 2) * 0.3 - 0.15));
  return g;
}

/** Square concrete planter with a young tree. */
export function buildCubePlanter() {
  const g = new THREE.Group();
  g.add(mesh(box(1.8, 1.0, 1.6), mat(0xb9b6ae), 0, 0.5, 0));
  g.add(mesh(box(1.6, 0.06, 1.4), mat(0x4a3424), 0, 1.0, 0));
  g.add(mesh(box(0.9, 0.08, 0.25), mat(0xb98552), 0, 1.04, 0.72)); // wooden seat on the edge
  g.add(mesh(cylY(0.08, 0.11, 1.5, 6), mat(0x6a4a2c), 0, 1.75, 0));
  g.add(mesh(ico(0.85, 1), mat(0x6fae4a), 0, 2.85, 0));
  g.add(mesh(ico(0.55, 1), mat(0x5b9a3c), 0.4, 2.55, 0.25));
  return g;
}

/** Ice-cream cart with a parasol. */
export function buildIceCream() {
  const g = new THREE.Group();
  g.add(mesh(box(1.7, 1.0, 1.0), mat(0xffffff), 0, 0.7, 0));
  g.add(mesh(box(1.72, 0.25, 1.02), mat(0xff8fab), 0, 0.85, 0));
  g.add(mesh(box(1.5, 0.3, 0.06), labelMat('ÎNGHEȚATĂ', { bg: '#ffffff', fg: '#e63970', size: 40 }), 0, 0.5, 0.51));
  for (const x of [-0.65, 0.65]) g.add(mesh(cylZ(0.2, 0.08, 10), mat(0x333333), x, 0.2, 0.45));
  // cones on top
  for (let i = 0; i < 3; i++) {
    g.add(mesh(geo('cone-down', () => new THREE.ConeGeometry(0.08, 0.25, 6).rotateX(Math.PI)), mat(0xd9a066), -0.4 + i * 0.4, 1.35, 0.1));
    g.add(mesh(sph(0.1, 6, 5), mat([0xff8fab, 0xfff1c1, 0x8d5a3b][i]), -0.4 + i * 0.4, 1.5, 0.1));
  }
  g.add(mesh(cylY(0.04, 0.04, 1.6, 6), mat(0xdddddd), 0.6, 2.0, -0.2));
  g.add(mesh(cone(1.1, 0.5, 10), stripeMat('#ff8fab', '#ffffff', 10), 0.6, 2.9, -0.2));
  return g;
}

/** Big steel gear on a plinth - a reminder of the old tractor factory. */
export function buildGear() {
  const g = new THREE.Group();
  g.add(mesh(box(1.4, 0.4, 1.0), mat(0x8d8a85), 0, 0.2, 0));
  const gear = new THREE.Group();
  gear.userData.dynamic = true;
  gear.position.set(0, 1.62, 0);
  const steel = mat(0xc0392b);
  gear.add(mesh(cylZ(1.0, 0.32, 20), steel, 0, 0, 0));
  gear.add(mesh(cylZ(0.38, 0.36, 12), mat(0x7a2a1f), 0, 0, 0));
  for (let k = 0; k < 14; k++) {
    const tooth = mesh(box(0.26, 0.3, 0.32), steel, 0, 0, 0);
    const a = (k / 14) * Math.PI * 2;
    tooth.position.set(Math.cos(a) * 1.08, Math.sin(a) * 1.08, 0);
    tooth.rotation.z = a;
    gear.add(tooth);
  }
  for (let k = 0; k < 5; k++) {
    const hole = mesh(cylZ(0.13, 0.4, 8), mat(0x7a2a1f), Math.cos((k / 5) * Math.PI * 2) * 0.65, Math.sin((k / 5) * Math.PI * 2) * 0.65, 0);
    gear.add(hole);
  }
  g.add(gear);
  g.userData.animate = (travel, t) => (gear.rotation.z = t * 0.3);
  return g;
}

export const CITY_BUILDERS = {
  bench: buildBench,
  flowerBox: buildFlowerBox,
  chainPosts: buildChainPosts,
  awningL: () => buildAwning(-1),
  awningR: () => buildAwning(1),
  kiosk: buildKiosk,
  treePlanter: buildTreePlanter,
  terrace: buildTerrace,
  cyclist: () => buildCyclist({ frame: 0x2a9d8f, shirt: 0xe9c46a, pants: 0x3a3f58, hairStyle: 'long', hair: 0x6b3d1f, basket: true }),
  bikeRack: buildBikeRack,
  hedge: buildHedge,
  hedgeRow: buildHedgeRow,
  pergolaL: () => buildPergola(-1),
  pergolaR: () => buildPergola(1),
  cubePlanter: buildCubePlanter,
  iceCream: buildIceCream,
  gear: buildGear,
  cyclistB: () => buildCyclist({ frame: 0xe63946, shirt: 0x1d3557, pants: 0x222831, hairStyle: 'helmet', helmet: 0xffd166 }),
};
