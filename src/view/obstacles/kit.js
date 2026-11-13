import * as THREE from 'three';
import { C, geo, mat, mesh } from '../materials.js';

// Cached primitive helpers shared by all obstacle models (no geometry is ever created twice).
export const box = (w, h, d) => geo(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d));
export const sph = (r, ws = 10, hs = 8) => geo(`s${r},${ws},${hs}`, () => new THREE.SphereGeometry(r, ws, hs));
export const cylX = (r, len, seg = 8) => geo(`cx${r},${len},${seg}`, () => new THREE.CylinderGeometry(r, r, len, seg).rotateZ(Math.PI / 2));
export const cylZ = (r, len, seg = 8) => geo(`cz${r},${len},${seg}`, () => new THREE.CylinderGeometry(r, r, len, seg).rotateX(Math.PI / 2));
export const cylY = (rt, rb, h, seg = 8) => geo(`cy${rt},${rb},${h},${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));
export const cone = (r, h, seg = 7) => geo(`co${r},${h},${seg}`, () => new THREE.ConeGeometry(r, h, seg));
export const ico = (r, d = 0) => geo(`ic${r},${d}`, () => new THREE.IcosahedronGeometry(r, d));
export const torus = (r, t, rs = 6, ts = 16) => geo(`to${r},${t},${rs},${ts}`, () => new THREE.TorusGeometry(r, t, rs, ts));
export { C, geo, mat, mesh };

/** Canvas texture with a text label (signs). Cached by text+colors. */
const labelCache = new Map();
export function labelMat(text, { bg = '#ffffff', fg = '#111111', w = 256, h = 96, font = 900, size = 60 } = {}) {
  const key = [text, bg, fg, w, h, size].join('|');
  if (labelCache.has(key)) return labelCache.get(key);
  if (typeof document === 'undefined') return mat(bg); // (unit tests run without a DOM)
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.fillStyle = fg;
  g.font = `${font} ${size}px Arial, Helvetica, sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 2);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.MeshLambertMaterial({ map: t });
  labelCache.set(key, m);
  return m;
}

/** Striped fabric (awnings, umbrellas, canopies). */
const stripeCache = new Map();
export function stripeMat(a, b, n = 8) {
  const key = `${a}|${b}|${n}`;
  if (stripeCache.has(key)) return stripeCache.get(key);
  if (typeof document === 'undefined') return mat(a);
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 16;
  const g = c.getContext('2d');
  for (let i = 0; i < n; i++) {
    g.fillStyle = i % 2 ? b : a;
    g.fillRect((i * 128) / n, 0, 128 / n + 1, 16);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide });
  stripeCache.set(key, m);
  return m;
}

/**
 * A person made of boxes and spheres, facing +z (toward the player). Seated by default.
 * Returns {group, legs: [L, R], arms: [L, R]} - legs pivot at the hip (for pedalling).
 * @param o {shirt, pants, skin, hair, hairStyle: 'short'|'long'|'helmet'|'cap', helmet}
 */
export function person(o = {}) {
  const shirt = mat(o.shirt ?? 0x3a7bd5);
  const pants = mat(o.pants ?? 0x2b3a55);
  const skin = mat(o.skin ?? C.skin);
  const g = new THREE.Group();
  const torso = new THREE.Group();
  torso.position.y = 0.0;
  torso.userData.dynamic = true;
  g.add(torso);
  torso.add(mesh(box(0.5, 0.62, 0.3), shirt, 0, 0.36, 0));
  // head
  const head = new THREE.Group();
  head.position.set(0, 0.86, 0);
  head.add(mesh(sph(0.2, 10, 8), skin, 0, 0, 0));
  const hairMat = mat(o.hair ?? 0x2b1d14);
  if (o.hairStyle === 'helmet') {
    head.add(mesh(geo('helmet', () => new THREE.SphereGeometry(0.23, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55)), mat(o.helmet ?? 0xff5a36), 0, 0.03, -0.02));
  } else if (o.hairStyle === 'long') {
    head.add(mesh(geo('hairLong', () => new THREE.SphereGeometry(0.215, 10, 7, 0, Math.PI * 2, 0, Math.PI * 0.6)), hairMat, 0, 0.02, -0.02));
    head.add(mesh(box(0.38, 0.4, 0.12), hairMat, 0, -0.18, -0.15));
  } else if (o.hairStyle === 'cap') {
    head.add(mesh(geo('cap', () => new THREE.SphereGeometry(0.215, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.5)), mat(o.helmet ?? 0xe63946), 0, 0.03, 0));
    head.add(mesh(box(0.3, 0.04, 0.2), mat(o.helmet ?? 0xe63946), 0, 0.05, 0.22));
  } else {
    // short hair: a thin cap of hair hugging the top and back of the head
    head.add(mesh(geo('hairShort', () => new THREE.SphereGeometry(0.212, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.42)), hairMat, 0, 0.025, -0.01));
    head.add(mesh(box(0.34, 0.16, 0.08), hairMat, 0, -0.03, -0.17));
  }
  // eyes (face looks toward +z)
  for (const sx of [-0.07, 0.07]) head.add(mesh(sph(0.025, 5, 4), mat(0x1a1a1a), sx, 0.03, 0.18));
  torso.add(head);
  const arms = [];
  for (const sx of [-1, 1]) {
    const arm = new THREE.Group();
    arm.position.set(sx * 0.31, 0.62, 0);
    arm.add(mesh(box(0.14, 0.5, 0.15), shirt, 0, -0.2, 0));
    arm.add(mesh(sph(0.075, 6, 5), skin, 0, -0.48, 0));
    torso.add(arm);
    arms.push(arm);
  }
  const legs = [];
  for (const sx of [-1, 1]) {
    const leg = new THREE.Group();
    leg.position.set(sx * 0.13, 0.05, 0);
    leg.userData.dynamic = true;
    const thigh = new THREE.Group();
    thigh.add(mesh(box(0.17, 0.17, 0.48), pants, 0, 0, 0.22));
    const shin = new THREE.Group();
    shin.position.set(0, 0, 0.44);
    shin.userData.dynamic = true;
    shin.add(mesh(box(0.15, 0.48, 0.15), pants, 0, -0.22, 0));
    shin.add(mesh(box(0.17, 0.1, 0.26), mat(0x222222), 0, -0.48, 0.05));
    thigh.add(shin);
    leg.add(thigh);
    leg.userData.shin = shin;
    g.add(leg);
    legs.push(leg);
  }
  g.userData.torso = torso;
  return { group: g, legs, arms, torso };
}

/** Animate seated pedalling: the two legs go round in opposite phase. */
export function pedal(legs, phase) {
  for (let i = 0; i < legs.length; i++) {
    const a = phase + i * Math.PI;
    legs[i].rotation.x = 0.25 + Math.sin(a) * 0.35;
    legs[i].userData.shin.rotation.x = 0.35 - Math.cos(a) * 0.4;
  }
}

/** Gentle sway (for awnings, banners, willow strands). */
export function sway(obj, t, amount = 0.04, speed = 2) {
  obj.rotation.z = Math.sin(t * speed) * amount;
}
