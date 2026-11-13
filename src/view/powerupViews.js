import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C, geo, mat, mesh } from './materials.js';
import { compactModel } from './obstacleViews.js';
import { CFG } from '../config.js';

/**
 * Models for the power-ups (and for the rare crown item). The same builders are used for the glowing
 * item on the slope and for the prop the boy carries while the power-up is active.
 */

export const POWER_COLORS = { magnet: 0xff4d5e, board: 0xffc531, jetpack: 0x46c8ff, shield: 0x4fd96b, slowmo: 0xb38bff, crown: 0xff6fd8 };

const metal = () => mat(0xdfe6ef, { emissive: 0x2a2f38 });

/** Red horseshoe magnet with silver tips (arc on top, open side down). */
export function buildMagnet() {
  const g = new THREE.Group();
  const arc = geo('magnet-arc', () => new THREE.TorusGeometry(0.34, 0.12, 8, 18, Math.PI));
  g.add(mesh(arc, mat(0xe8323f, { emissive: 0x3a0508 }), 0, 0, 0));
  const leg = geo('magnet-leg', () => new THREE.CylinderGeometry(0.12, 0.12, 0.26, 10));
  const tip = geo('magnet-tip', () => new THREE.CylinderGeometry(0.125, 0.125, 0.16, 10));
  for (const sx of [-1, 1]) {
    g.add(mesh(leg, mat(0xe8323f, { emissive: 0x3a0508 }), sx * 0.34, -0.13, 0));
    g.add(mesh(tip, metal(), sx * 0.34, -0.33, 0));
  }
  return g;
}

/** Golden super snowboard with a white lightning stripe. */
export function buildSuperBoard() {
  const g = new THREE.Group();
  const gold = mat(0xffc531, { emissive: 0x5a3c00 });
  g.add(mesh(geo('sb-deck', () => new THREE.BoxGeometry(0.5, 0.07, 1.4)), gold, 0, 0, 0));
  for (const z of [-1, 1]) {
    const t = mesh(geo('sb-tip', () => new THREE.BoxGeometry(0.5, 0.07, 0.26)), gold, 0, 0.05, z * 0.76);
    t.rotation.x = z * 0.45;
    g.add(t);
  }
  // zig-zag "lightning" stripe
  const stripe = geo('sb-stripe', () => new THREE.BoxGeometry(0.12, 0.075, 0.42));
  const white = mat(0xffffff, { emissive: 0x555555 });
  for (const [x, z, r] of [
    [0.06, -0.35, 0.5],
    [-0.04, 0.0, -0.5],
    [0.06, 0.35, 0.5],
  ]) {
    const m = mesh(stripe, white, x, 0.01, z);
    m.rotation.y = r;
    g.add(m);
  }
  return g;
}

/** Jetpack: two tanks with red nose cones on a back plate, nozzles at the bottom. */
export function buildJetpack() {
  const g = new THREE.Group();
  const tank = geo('jp-tank', () => new THREE.CylinderGeometry(0.16, 0.16, 0.62, 12));
  const nose = geo('jp-nose', () => new THREE.ConeGeometry(0.16, 0.24, 12));
  const nozzle = geo('jp-nozzle', () => new THREE.CylinderGeometry(0.09, 0.13, 0.14, 10));
  g.add(mesh(geo('jp-plate', () => new THREE.BoxGeometry(0.5, 0.56, 0.12)), mat(0x34445c), 0, 0, -0.1));
  for (const sx of [-1, 1]) {
    g.add(mesh(tank, metal(), sx * 0.19, 0, 0.06));
    g.add(mesh(nose, mat(C.red, { emissive: 0x330000 }), sx * 0.19, 0.43, 0.06));
    g.add(mesh(nozzle, mat(0x2b3240), sx * 0.19, -0.38, 0.06));
  }
  g.add(mesh(geo('jp-band', () => new THREE.BoxGeometry(0.62, 0.08, 0.36)), mat(0x46c8ff, { emissive: 0x0b3a52 }), 0, 0.12, 0.04));
  return g;
}

/**
 * "Scutul Bastionului": a heraldic shield (flat top, pointed bottom) with a golden tower on it,
 * like the bastions of the old city walls.
 */
export function buildShield() {
  const g = new THREE.Group();
  const green = mat(0x2fae52, { emissive: 0x0b3a18 });
  const rim = mat(0xdfe6ef, { emissive: 0x2a2f38 });
  const gold = mat(0xffc531, { emissive: 0x5a3c00 });
  // rim (slightly bigger, behind) + face
  g.add(mesh(geo('sh-rim-top', () => new THREE.BoxGeometry(0.78, 0.5, 0.08)), rim, 0, 0.2, 0));
  const rimTip = mesh(geo('sh-rim-tip', () => new THREE.CylinderGeometry(0.39 * Math.SQRT2, 0, 0.5, 4, 1).rotateY(Math.PI / 4)), rim, 0, -0.3, 0);
  rimTip.scale.z = 0.08 / (0.78 * 1);
  g.add(rimTip);
  g.add(mesh(geo('sh-top', () => new THREE.BoxGeometry(0.66, 0.44, 0.12)), green, 0, 0.2, 0));
  const tip = mesh(geo('sh-tip', () => new THREE.CylinderGeometry(0.33 * Math.SQRT2, 0, 0.42, 4, 1).rotateY(Math.PI / 4)), green, 0, -0.23, 0);
  tip.scale.z = 0.12 / 0.66;
  g.add(tip);
  // golden tower with three merlons, on both faces
  for (const z of [-0.075, 0.075]) {
    g.add(mesh(geo('sh-tower', () => new THREE.BoxGeometry(0.26, 0.34, 0.04)), gold, 0, 0.08, z));
    for (const x of [-0.1, 0, 0.1]) g.add(mesh(geo('sh-merlon', () => new THREE.BoxGeometry(0.06, 0.08, 0.04)), gold, x, 0.29, z));
    g.add(mesh(geo('sh-door', () => new THREE.BoxGeometry(0.08, 0.14, 0.045)), green, 0, -0.02, z));
  }
  return g;
}

/**
 * "Ceasul din Piața Sfatului": the clock of the Council House tower: a white dial with a dark rim,
 * hour marks and two hands, under a small red pointed roof. The hands live in a group named 'hands'.
 */
export function buildClock() {
  const g = new THREE.Group();
  const rim = mat(0x3a2f5c, { emissive: 0x150f2a });
  const face = mat(0xfdf7e3, { emissive: 0x4a4636 });
  const dark = mat(0x2a2140);
  g.add(mesh(geo('ck-rim', () => new THREE.CylinderGeometry(0.42, 0.42, 0.14, 20).rotateX(Math.PI / 2)), rim, 0, 0, 0));
  g.add(mesh(geo('ck-face', () => new THREE.CylinderGeometry(0.35, 0.35, 0.17, 20).rotateX(Math.PI / 2)), face, 0, 0, 0));
  const mark = geo('ck-mark', () => new THREE.BoxGeometry(0.035, 0.09, 0.19));
  for (let k = 0; k < 12; k += 3) {
    const a = (k / 12) * Math.PI * 2;
    const m = mesh(mark, dark, Math.sin(a) * 0.28, Math.cos(a) * 0.28, 0);
    m.rotation.z = -a;
    g.add(m);
  }
  // each hand (drawn on both faces) is its own group so it can turn: `dynamic` keeps compactModel off it
  const hands = new THREE.Group();
  hands.name = 'hands';
  const hour = new THREE.Group();
  hour.name = 'hour';
  hour.rotation.z = -1.0;
  const minute = new THREE.Group();
  minute.name = 'minute';
  for (const h of [hour, minute]) h.userData.dynamic = true;
  for (const z of [-0.095, 0.095]) {
    hour.add(mesh(geo('ck-hour', () => new THREE.BoxGeometry(0.05, 0.19, 0.02).translate(0, 0.085, 0)), dark, 0, 0, z));
    minute.add(mesh(geo('ck-min', () => new THREE.BoxGeometry(0.035, 0.29, 0.02).translate(0, 0.13, 0)), dark, 0, 0, z));
  }
  hands.add(hour, minute);
  g.add(hands);
  // the little tower roof
  g.add(mesh(geo('ck-roof', () => new THREE.ConeGeometry(0.3, 0.36, 4).rotateY(Math.PI / 4)), mat(0xc8443a, { emissive: 0x3a0d08 }), 0, 0.6, 0));
  g.add(mesh(geo('ck-neck', () => new THREE.BoxGeometry(0.3, 0.1, 0.16)), rim, 0, 0.43, 0));
  return g;
}

/** The premium currency item: a golden crown with red and blue gems (Brașov = the Crown City). */
export function buildCrown() {
  const g = new THREE.Group();
  const gold = mat(0xffcf3f, { emissive: 0x6a4500 });
  g.add(mesh(geo('cr-band', () => new THREE.CylinderGeometry(0.34, 0.3, 0.2, 10, 1, true)), mat(0xffcf3f, { emissive: 0x6a4500, side: THREE.DoubleSide }), 0, -0.05, 0));
  g.add(mesh(geo('cr-ring', () => new THREE.TorusGeometry(0.31, 0.045, 6, 14).rotateX(Math.PI / 2)), gold, 0, -0.15, 0));
  const spike = geo('cr-spike', () => new THREE.ConeGeometry(0.085, 0.26, 4));
  const ball = geo('cr-ball', () => new THREE.SphereGeometry(0.055, 6, 5));
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    g.add(mesh(spike, gold, Math.sin(a) * 0.31, 0.16, Math.cos(a) * 0.31));
    g.add(mesh(ball, mat(k % 2 ? 0x3aa0ff : 0xff3d5a, { emissive: k % 2 ? 0x0a2a55 : 0x55000f }), Math.sin(a) * 0.31, 0.31, Math.cos(a) * 0.31));
  }
  return g;
}

export const POWER_BUILDERS = { magnet: buildMagnet, board: buildSuperBoard, jetpack: buildJetpack, shield: buildShield, slowmo: buildClock, crown: buildCrown };

function haloTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,0.9)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
let haloTex = null;

let beamTex = null;
/** Vertical light gradient (bright at the foot, gone at the top, soft at the sides) for the light beam of an item. */
function beamTexture() {
  const c = document.createElement('canvas');
  c.width = 32;
  c.height = 128;
  const g = c.getContext('2d');
  const v = g.createLinearGradient(0, 0, 0, 128);
  v.addColorStop(0, 'rgba(255,255,255,0)');
  v.addColorStop(0.7, 'rgba(255,255,255,0.35)');
  v.addColorStop(1, 'rgba(255,255,255,0.9)');
  g.fillStyle = v;
  g.fillRect(0, 0, 32, 128);
  g.globalCompositeOperation = 'destination-in';
  const h = g.createLinearGradient(0, 0, 32, 0);
  h.addColorStop(0, 'rgba(0,0,0,0)');
  h.addColorStop(0.5, 'rgba(0,0,0,1)');
  h.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = h;
  g.fillRect(0, 0, 32, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Glowing pickup on the slope: the model inside a soft colored halo, with a light ring on the snow.
 * Pooled like the obstacles (at most a couple exist at the same time).
 */
function buildPickup(type) {
  const root = new THREE.Group();
  const spin = new THREE.Group();
  spin.name = 'spin';
  // static parts merged per material: an item on the track costs a few draw calls, not a dozen
  const model = compactModel(POWER_BUILDERS[type]());
  model.scale.setScalar(type === 'board' ? 0.95 : type === 'crown' ? 1.4 : 1.25);
  if (type === 'board') model.rotation.set(0.5, 0, 0.35);
  model.traverse((o) => (o.castShadow = true));
  spin.add(model);
  root.add(spin);

  haloTex ??= haloTexture();
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: haloTex, color: POWER_COLORS[type], transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  halo.scale.setScalar(2.4);
  halo.name = 'halo';
  root.add(halo);

  const ring = mesh(
    geo('pu-ring', () => new THREE.RingGeometry(0.55, 0.85, 28).rotateX(-Math.PI / 2)),
    new THREE.MeshBasicMaterial({ color: POWER_COLORS[type], transparent: true, opacity: 0.55, depthWrite: false }),
    0,
    0,
    0,
  );
  ring.name = 'ring';
  root.add(ring);

  // v3: a pillar of light (two crossed planes, one draw call) that pulses, so the item is seen from far away.
  // It is thin and faint: it must never hide an obstacle behind it.
  beamTex ??= beamTexture();
  const bh = 6.5;
  const plane = new THREE.PlaneGeometry(1.1, bh);
  const cross = plane.clone().rotateY(Math.PI / 2);
  const beam = new THREE.Mesh(
    mergeGeometries([plane, cross]),
    new THREE.MeshBasicMaterial({ map: beamTex, color: POWER_COLORS[type], transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false }),
  );
  beam.position.y = -CFG.power.pickupY + bh / 2;
  beam.userData.noShadow = true;
  beam.renderOrder = 3;
  beam.onBeforeRender = () => {
    const t = performance.now() / 1000;
    beam.material.opacity = 0.32 + 0.12 * Math.sin(t * 4 + bh);
    beam.rotation.y = t * 0.8;
  };
  root.add(beam);
  return root;
}

export class PickupPool {
  constructor(scene) {
    this.scene = scene;
    this.free = Object.fromEntries(Object.keys(POWER_BUILDERS).map((k) => [k, []]));
    this.created = 0;
  }

  acquire(type) {
    let m = this.free[type].pop();
    if (!m) {
      m = buildPickup(type);
      m.userData.type = type;
      this.scene.add(m);
      this.created++;
    }
    m.visible = true;
    m.scale.set(1, 1, 1);
    m.position.set(0, 0, 0);
    return m;
  }

  release(m) {
    m.visible = false;
    this.free[m.userData.type].push(m);
  }
}
