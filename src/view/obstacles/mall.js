import * as THREE from 'three';
import { box, cone, cylX, cylY, cylZ, ico, labelMat, mat, mesh, person, sph, stripeMat, sway, torus } from './kit.js';

/** Obstacles inside AFI Brașov (same collision rules as everywhere, see config.js). */

const chrome = () => new THREE.MeshPhongMaterial({ color: 0xd9dee4, specular: 0xffffff, shininess: 90 });
let chromeMat = null;
const CHROME = () => (chromeMat ??= chrome());

/** Two yellow "wet floor" signs with a caution tape between them (jump over). */
export function buildWetFloor() {
  const g = new THREE.Group();
  const yellow = mat(0xffd21f);
  const sign = labelMat('! UD', { bg: '#ffd21f', fg: '#1a1a1a', w: 128, h: 128, size: 54 });
  for (const x of [-0.82, 0.82]) {
    for (const dz of [-1, 1]) {
      const p = mesh(box(0.42, 0.75, 0.04), dz > 0 ? sign : yellow, x, 0.37, dz * 0.12);
      p.rotation.x = -dz * 0.3;
      g.add(p);
    }
  }
  const tape = mesh(box(1.25, 0.1, 0.02), stripeMat('#ffd21f', '#1a1a1a', 12), 0, 0.6, 0);
  tape.userData.keep = true; // animated: not merged
  g.add(tape);
  // a bit of water on the floor
  g.add(mesh(cylY(0.9, 0.9, 0.01, 16), new THREE.MeshPhongMaterial({ color: 0xbfe3f2, transparent: true, opacity: 0.45, shininess: 100 }), 0.1, 0.012, 0.6));
  g.userData.animate = (travel, t) => sway(tape, t, 0.03, 3);
  return g;
}

/** Padded mall bench (jump over it). */
export function buildMallBench() {
  const g = new THREE.Group();
  g.add(mesh(box(2.0, 0.42, 0.75), mat(0x8b5e3c), 0, 0.42, 0));
  g.add(mesh(box(2.0, 0.12, 0.75), mat(0x3d3d45), 0, 0.68, 0));
  for (const x of [-0.85, 0.85]) g.add(mesh(box(0.12, 0.25, 0.6), CHROME(), x, 0.12, 0));
  return g;
}

/** Chrome stanchions with a red velvet rope across all three lanes (queue barrier). */
export function buildRopeLine() {
  const g = new THREE.Group();
  const xs = [-3.5, -1.2, 1.2, 3.5];
  for (const x of xs) {
    g.add(mesh(cylY(0.22, 0.24, 0.05, 12), CHROME(), x, 0.03, 0));
    g.add(mesh(cylY(0.04, 0.04, 0.85, 8), CHROME(), x, 0.45, 0));
    g.add(mesh(sph(0.07, 8, 6), CHROME(), x, 0.9, 0));
  }
  const rope = mat(0xb3122e);
  for (let i = 0; i < xs.length - 1; i++) {
    for (let k = 0; k < 10; k++) {
      const u = (k + 0.5) / 10;
      const x = xs[i] + (xs[i + 1] - xs[i]) * u;
      const y = 0.82 - Math.sin(u * Math.PI) * 0.2;
      g.add(mesh(cylX(0.035, 0.26, 6), rope, x, y, 0));
    }
  }
  return g;
}

/** Big promo banner hanging over a side lane from a cantilever on a column outside the track. */
export function buildBanner(side) {
  const g = new THREE.Group();
  const px = side * 1.75;
  g.add(mesh(cylY(0.22, 0.22, 3.4, 12), mat(0xffffff), px, 1.7, 0));
  g.add(mesh(box(2.9, 0.12, 0.12), CHROME(), side * 0.35, 3.0, 0));
  const banner = new THREE.Group();
  banner.userData.dynamic = true;
  banner.position.set(-side * 0.1, 3.0, 0);
  const sale = labelMat('REDUCERI -50%', { bg: '#e6007e', fg: '#ffffff', w: 512, h: 256, size: 72 });
  banner.add(mesh(box(2.0, 1.55, 0.05), sale, 0, -0.85, 0));
  banner.add(mesh(cylX(0.04, 2.1, 6), CHROME(), 0, -1.65, 0));
  g.add(banner);
  g.userData.animate = (travel, t) => (banner.rotation.x = Math.sin(t * 1.8) * 0.05);
  return g;
}

/** Phone accessories kiosk in the middle of the gallery. */
export function buildMallKiosk() {
  const g = new THREE.Group();
  g.add(mesh(box(1.9, 1.05, 1.5), mat(0xffffff), 0, 0.52, 0));
  g.add(mesh(box(1.95, 0.08, 1.55), mat(0x2b2f38), 0, 1.08, 0));
  // glass display with products
  g.add(mesh(box(1.7, 0.5, 1.3), new THREE.MeshPhongMaterial({ color: 0xcfeaf5, transparent: true, opacity: 0.35, shininess: 100 }), 0, 1.38, 0));
  const cols = [0x5ad1ff, 0xff4fa3, 0xffd166, 0x9b5de5, 0x111111];
  for (let i = 0; i < 6; i++) g.add(mesh(box(0.16, 0.3, 0.04), mat(cols[i % 5]), -0.6 + i * 0.24, 1.3, 0.4));
  for (const x of [-0.85, 0.85]) g.add(mesh(box(0.08, 1.4, 0.08), mat(0x2b2f38), x, 1.85, 0));
  g.add(mesh(box(1.9, 0.45, 0.12), labelMat('ACCESORII GSM', { bg: '#2b2f38', fg: '#5ad1ff', w: 512, h: 112, size: 64 }), 0, 2.55, 0));
  return g;
}

/** Big white pot with a palm tree. */
export function buildPalmPot() {
  const g = new THREE.Group();
  g.add(mesh(cylY(0.8, 0.6, 1.0, 14), mat(0xf3efe8), 0, 0.5, 0));
  g.add(mesh(cylY(0.72, 0.72, 0.05, 14), mat(0x4a3424), 0, 1.0, 0));
  g.add(mesh(cylY(0.11, 0.16, 2.2, 7), mat(0x7a5a3a), 0, 2.0, 0));
  const leaf = mat(0x3e8a3c);
  const leaf2 = mat(0x4e9e44);
  for (let k = 0; k < 8; k++) {
    const l = mesh(cone(0.28, 1.9, 4), k % 2 ? leaf : leaf2, 0, 0, 0);
    const a = (k / 8) * Math.PI * 2;
    l.position.set(Math.cos(a) * 0.85, 3.0, Math.sin(a) * 0.85);
    l.rotation.set(0, -a, Math.PI / 2 - 0.55);
    g.add(l);
  }
  return g;
}

/** Round podium with two dressed mannequins (a shop's promo stand). */
export function buildMannequins() {
  const g = new THREE.Group();
  g.add(mesh(cylY(1.0, 1.0, 0.35, 18), mat(0xffffff), 0, 0.17, 0));
  g.add(mesh(cylY(1.02, 1.02, 0.06, 18), mat(0xe6007e), 0, 0.36, 0));
  const skin = mat(0xf2f2f2);
  [
    [-0.42, 0x9b5de5, 0x222222],
    [0.42, 0xffd166, 0x3a6ea5],
  ].forEach(([x, top, bottom]) => {
    g.add(mesh(box(0.2, 0.75, 0.2), mat(bottom), x - 0.1, 0.78, 0));
    g.add(mesh(box(0.2, 0.75, 0.2), mat(bottom), x + 0.1, 0.78, 0));
    g.add(mesh(box(0.5, 0.65, 0.3), mat(top), x, 1.48, 0));
    g.add(mesh(box(0.13, 0.55, 0.13), mat(top), x - 0.32, 1.45, 0));
    g.add(mesh(box(0.13, 0.55, 0.13), mat(top), x + 0.32, 1.45, 0));
    g.add(mesh(cylY(0.06, 0.06, 0.12, 6), skin, x, 1.86, 0));
    g.add(mesh(sph(0.19, 10, 8), skin, x, 2.08, 0));
  });
  g.add(mesh(box(0.9, 0.3, 0.05), labelMat('NOU', { bg: '#e6007e', fg: '#ffffff', w: 128, h: 64, size: 44 }), 0, 2.55, 0));
  g.add(mesh(cylY(0.03, 0.03, 0.3, 5), CHROME(), 0, 2.35, 0));
  return g;
}

/**
 * Ride-on floor scrubber (mașina de curățat pardoseala) coming toward the player, driven by a man
 * with short hair and a pink shirt. Brushes spin, the orange beacon turns, a wet trail behind it.
 */
export function buildScrubber() {
  const g = new THREE.Group();
  const yellow = mat(0xf2c230);
  const grey = mat(0x4a4f57);
  g.add(mesh(box(1.25, 0.85, 1.75), yellow, 0, 0.6, -0.1)); // body
  g.add(mesh(box(1.3, 0.25, 1.8), grey, 0, 0.18, -0.1)); // chassis
  g.add(mesh(box(1.1, 0.12, 0.9), grey, 0, 1.08, -0.45)); // seat base
  g.add(mesh(box(0.55, 0.12, 0.5), mat(0x222222), 0, 1.2, -0.45)); // seat
  g.add(mesh(box(0.55, 0.5, 0.1), mat(0x222222), 0, 1.45, -0.72)); // backrest
  // front: steering column, wheel and a small dashboard
  g.add(mesh(box(0.9, 0.35, 0.5), yellow, 0, 1.15, 0.5));
  const col = mesh(cylY(0.05, 0.05, 0.5, 6), grey, 0, 1.5, 0.48);
  col.rotation.x = -0.4;
  g.add(col);
  const wheel = mesh(torus(0.2, 0.035, 6, 14), mat(0x222222), 0, 1.72, 0.4);
  wheel.rotation.x = -Math.PI / 2 + 0.5;
  wheel.userData.keep = true;
  g.add(wheel);
  // the brush deck in front, low on the floor, with two spinning brushes
  g.add(mesh(box(1.45, 0.2, 0.55), grey, 0, 0.12, 0.95));
  const brushes = [];
  for (const x of [-0.36, 0.36]) {
    const b = new THREE.Group();
    b.userData.dynamic = true;
    b.position.set(x, 0.05, 0.95);
    b.add(mesh(cylY(0.3, 0.3, 0.08, 12), mat(0x2b6cb0), 0, 0, 0));
    b.add(mesh(box(0.5, 0.09, 0.06), mat(0x9ec5e8), 0, 0, 0));
    g.add(b);
    brushes.push(b);
  }
  // wheels at the back
  for (const x of [-0.62, 0.62]) g.add(mesh(cylX(0.22, 0.16, 10), mat(0x222222), x, 0.22, -0.75));
  // orange rotating beacon on a short pole
  g.add(mesh(cylY(0.03, 0.03, 0.55, 5), grey, 0.5, 1.3, -0.85));
  const beacon = new THREE.Group();
  beacon.userData.dynamic = true;
  beacon.position.set(0.5, 1.62, -0.85);
  beacon.add(mesh(cylY(0.1, 0.12, 0.16, 8), new THREE.MeshBasicMaterial({ color: 0xff8a00 }), 0, 0, 0));
  beacon.add(mesh(box(0.05, 0.1, 0.24), new THREE.MeshBasicMaterial({ color: 0xfff1b0 }), 0, 0, 0.06));
  g.add(beacon);
  // wet floor trail behind the machine
  g.add(mesh(box(1.3, 0.01, 2.6), new THREE.MeshPhongMaterial({ color: 0xcfe4ee, transparent: true, opacity: 0.4, shininess: 120 }), 0, 0.012, -2.2));
  // the driver: short dark hair, pink shirt, grey trousers
  const driver = person({ shirt: 0xff7eb6, pants: 0x55595f, hair: 0x1f1712, hairStyle: 'short' });
  driver.group.position.set(0, 1.26, -0.42);
  driver.torso.rotation.x = 0.1;
  for (const a of driver.arms) a.rotation.x = -0.95;
  for (const l of driver.legs) {
    l.rotation.x = 0.35;
    l.userData.shin.rotation.x = 0.55;
  }
  // a collar so the shirt reads as a shirt
  driver.torso.add(mesh(box(0.34, 0.07, 0.31), mat(0xffa6cf), 0, 0.68, 0.01));
  for (let k = 0; k < 3; k++) driver.torso.add(mesh(sph(0.018, 4, 3), mat(0xffffff), 0, 0.55 - k * 0.14, 0.16));
  g.add(driver.group);
  g.userData.animate = (travel, t) => {
    for (const b of brushes) b.rotation.y = t * 14;
    beacon.rotation.y = t * 7;
    wheel.rotation.z = Math.sin(t * 1.3) * 0.3;
    driver.torso.rotation.z = Math.sin(t * 1.3) * 0.05;
  };
  return g;
}

export const MALL_BUILDERS = {
  wetFloor: buildWetFloor,
  mallBench: buildMallBench,
  ropeLine: buildRopeLine,
  bannerL: () => buildBanner(-1),
  bannerR: () => buildBanner(1),
  mallKiosk: buildMallKiosk,
  palmPot: buildPalmPot,
  mannequins: buildMannequins,
  scrubber: buildScrubber,
};

// (re-exported for the lake, which uses the same striped fabric for the boat canopy)
export { stripeMat, ico, cylZ };
