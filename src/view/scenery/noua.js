import * as THREE from 'three';
import { C, mat, mesh } from '../materials.js';
import { waterPatch } from '../gfx/patches.js';
import { Scenery, TRACK_HALF, benchGeometry, canvasTexture, lambertVC, lampGeometry, merged, mountainRange, part, rand, roundTreeGeometry, tint } from './common.js';
import { CFG } from '../../config.js';

/**
 * Level 5, Lacul Noua: the lake of Noua park at the foot of the forested mountain, ridden on a
 * pedal boat (hidrobicicletă). Green banks with the walking path around the lake, willows hanging
 * over the water, reeds and water lilies, picnic shelters with wooden tables, lanterns, the zip
 * lines (tiroliene) crossing high above the lake, a little landing stage with parked pedal boats,
 * and ducks. Lanes are marked by floating rope lines with small buoys (between and around the 3 lanes).
 */
const HAZE = 0xf2c6a4; // sunset
const HAZE_FAR = 0xc8a0b8; // the far mountains fade into dusty violet, not into the orange horizon
const SHORE_X = TRACK_HALF + 11;

function grassTexture() {
  return canvasTexture(128, 128, (g, w, h) => {
    const r = rand(52);
    g.fillStyle = '#5f9a44';
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 1500; i++) {
      g.fillStyle = ['#548d3b', '#6fa94f', '#5a9440', '#7db45a'][(r() * 4) | 0];
      g.fillRect(r() * w, r() * h, 1, 2 + r() * 3);
    }
    // the gravel path that circles the lake
    g.fillStyle = '#cdbf9f';
    g.fillRect(2, 0, 7, h);
    for (let i = 0; i < 120; i++) {
      g.fillStyle = r() < 0.5 ? '#b8aa8a' : '#ddd1b4';
      g.fillRect(2 + r() * 7, r() * h, 1, 1);
    }
  }, 1, 4);
}

/** Weeping willow: thick trunk, round crown and long drooping strands. */
export function willowGeometry() {
  const p = [part(new THREE.CylinderGeometry(0.3, 0.45, 3.2, 7), 0x5e4630, 0, 1.6, 0)];
  const crown = new THREE.IcosahedronGeometry(2.2, 1);
  crown.scale(1.2, 0.75, 1.2);
  p.push(part(crown, 0x7fa64a, 0, 4.2, 0));
  const r = rand(53);
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const rad = 1.6 + r() * 0.9;
    const len = 2.2 + r() * 1.4;
    const s = new THREE.ConeGeometry(0.42, len, 4);
    s.rotateX(Math.PI); // tip down
    p.push(part(s, r() < 0.5 ? 0x8db357 : 0x739b42, Math.cos(a) * rad, 4.0 - len / 2, Math.sin(a) * rad));
  }
  return merged(p);
}

function reedGeometry() {
  const p = [];
  const r = rand(54);
  for (let i = 0; i < 9; i++) {
    const h = 1.2 + r() * 0.9;
    const x = (r() - 0.5) * 1.4;
    const z = (r() - 0.5) * 1.4;
    p.push(part(new THREE.CylinderGeometry(0.03, 0.05, h, 4), 0x6d8f3c, x, h / 2, z));
    if (r() < 0.5) p.push(part(new THREE.CylinderGeometry(0.07, 0.07, 0.35, 5), 0x6b4a2a, x, h - 0.1, z)); // cattail
  }
  return merged(p);
}

function lilyGeometry() {
  const p = [];
  const r = rand(55);
  for (let i = 0; i < 6; i++) {
    const pad = new THREE.CylinderGeometry(0.35 + r() * 0.2, 0.35, 0.03, 9, 1, false, 0.4, Math.PI * 1.85);
    p.push(part(pad, 0x4f8a3a, (r() - 0.5) * 2.2, 0.03, (r() - 0.5) * 2.2));
  }
  p.push(part(new THREE.IcosahedronGeometry(0.13, 0), 0xffe0ef, 0.3, 0.1, 0.2));
  return merged(p);
}

function picnicGeometry() {
  const p = [];
  for (const [x, z] of [
    [-1.6, -2],
    [1.6, -2],
    [-1.6, 2],
    [1.6, 2],
  ])
    p.push(part(new THREE.BoxGeometry(0.2, 2.6, 0.2), 0x6b4a2c, x, 1.3, z));
  const s = new THREE.Shape();
  s.moveTo(-2.3, 0);
  s.lineTo(0, 1.4);
  s.lineTo(2.3, 0);
  s.lineTo(-2.3, 0);
  const roof = new THREE.ExtrudeGeometry(s, { depth: 5.2, bevelEnabled: false });
  roof.translate(0, 2.6, -2.6);
  p.push(paintGeo(roof, 0x7a4a2a));
  p.push(part(new THREE.BoxGeometry(1.0, 0.08, 3.2), 0x9a6a3c, 0, 0.8, 0));
  for (const x of [-0.85, 0.85]) p.push(part(new THREE.BoxGeometry(0.35, 0.06, 3.2), 0x9a6a3c, x, 0.48, 0));
  return merged(p);
}
function paintGeo(g, color) {
  return part(g, color);
}

function duckGeometry() {
  return merged([
    part(new THREE.SphereGeometry(0.3, 8, 6).scale(1, 0.7, 1.5), 0x8a6a4a, 0, 0.12, 0),
    part(new THREE.SphereGeometry(0.16, 8, 6), 0x2f6b3a, 0, 0.42, -0.32),
    part(new THREE.ConeGeometry(0.06, 0.18, 5).rotateX(-Math.PI / 2), 0xf0a020, 0, 0.4, -0.5),
  ]);
}

/** Parked pedal boats at the little landing stage. */
function dockGeometry() {
  const p = [part(new THREE.BoxGeometry(3.4, 0.25, 9), 0x8a6440, 0, 0.55, 0)];
  for (const [x, z] of [
    [-1.6, -4.3],
    [1.6, -4.3],
    [-1.6, 4.3],
    [1.6, 4.3],
    [-1.6, 0],
    [1.6, 0],
  ])
    p.push(part(new THREE.CylinderGeometry(0.14, 0.14, 1.4, 6), 0x5a4030, x, 0.1, z));
  for (let i = 0; i < 3; i++) {
    const z = -3 + i * 3;
    const col = [0x2f9bd6, 0xf2c230, 0xe85d4a][i];
    p.push(part(new THREE.BoxGeometry(0.45, 0.4, 2.6), 0xf4f4f4, -3.0, 0.1, z));
    p.push(part(new THREE.BoxGeometry(0.45, 0.4, 2.6), 0xf4f4f4, -4.4, 0.1, z));
    p.push(part(new THREE.BoxGeometry(1.8, 0.2, 1.4), col, -3.7, 0.45, z));
    p.push(part(new THREE.BoxGeometry(1.6, 0.6, 0.2), col, -3.7, 0.8, z + 0.6));
  }
  return merged(p);
}

/** Zip line over the lake: two towers, a cable and a rider who slides across. */
function buildZipLine() {
  const g = new THREE.Group();
  const H = 15;
  const L = SHORE_X * 2 + 16;
  for (const sx of [-1, 1]) {
    const tower = new THREE.Group();
    for (const dx of [-0.6, 0.6]) for (const dz of [-0.6, 0.6]) tower.add(mesh(new THREE.BoxGeometry(0.18, H + 1 - (sx > 0 ? 3 : 0), 0.18), mat(0x6b4a2c), dx, (H + 1 - (sx > 0 ? 3 : 0)) / 2, dz));
    tower.add(mesh(new THREE.BoxGeometry(1.8, 0.2, 1.8), mat(0x8a6440), 0, H - (sx > 0 ? 3 : 0), 0));
    tower.position.x = (sx * L) / 2;
    g.add(tower);
  }
  const len = Math.hypot(L, 3);
  const cable = mesh(new THREE.CylinderGeometry(0.03, 0.03, len, 4).rotateZ(Math.PI / 2), mat(0x333333), 0, H - 1.5 + 0.3, 0);
  cable.rotation.z = Math.atan2(-3, L);
  g.add(cable);
  const rider = new THREE.Group();
  rider.add(mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 4), mat(0x333333), 0, -0.5, 0));
  rider.add(mesh(new THREE.BoxGeometry(0.45, 0.6, 0.3), mat(0xe8505b), 0, -1.3, 0));
  rider.add(mesh(new THREE.SphereGeometry(0.17, 8, 6), mat(C.skin), 0, -0.85, 0));
  rider.add(mesh(new THREE.SphereGeometry(0.19, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2), mat(0xffcc00), 0, -0.8, 0)); // helmet
  for (const sx of [-0.12, 0.12]) rider.add(mesh(new THREE.BoxGeometry(0.14, 0.6, 0.16), mat(0x2b3a55), sx, -1.85, 0.1));
  g.add(rider);
  g.userData = { rider, L, H };
  return g;
}

export class NouaScenery extends Scenery {
  constructor(ctx) {
    super(ctx);
    this.env = {
      fog: HAZE,
      fogNear: this.mobile ? 45 : 60,
      fogFar: this.mobile ? 160 : 210,
      sky: {
        top: 0x27408c,
        mid: 0xc07f9c,
        hor: HAZE,
        sun: { dir: [-0.28, 0.42, -1], color: 0xffb36a, size: 0.065, halo: 1.5 },
        clouds: { cover: 0.55, lit: 0xffc9a8, shade: 0x8a5f8c },
      },
      hemi: { sky: 0xffdcc6, ground: 0x4f7a60, intensity: 1.4 },
      sun: { color: 0xffbb78, intensity: 2.1, offset: [-13, 15, 6] },
      exposure: 1.03,
      marks: null, // floating rope lines instead
      weather: 'pollen',
      confetti: [0xffffff, 0x8db357, 0x5ad1ff, 0xffe066, 0xff8fab],
    };
    // v3: animated water shader (ripples, glitter, fresnel, foam at the banks) on a plain Lambert material,
    // so the sun shadows of the boat and the fog keep working
    this.water = waterPatch(new THREE.MeshLambertMaterial({ color: 0xffffff }), { bank: SHORE_X });
    this.ground(this.water, null, { width: SHORE_X * 2 + 0.4 });
    this._shores();
    this._water();
    this._park();
    this._backdrop();
  }

  _shores() {
    const grass = grassTexture();
    const top = new THREE.MeshLambertMaterial({ map: grass });
    const edge = new THREE.MeshLambertMaterial({ color: 0x8b8578, flatShading: true });
    const banks = [];
    for (const side of [-1, 1]) for (let i = 0; i < 10; i++) banks.push({ o: i * 30, x: side * (SHORE_X + 30), y: -0.3, rot: side < 0 ? Math.PI : 0 });
    // (u = 0 of the top face is the edge next to the water on both sides, thanks to the rotation,
    // so the gravel path drawn at the left of the grass texture follows the shore)
    const geo = new THREE.BoxGeometry(60, 1.0, 30.02);
    this.recycler(geo, [edge, edge, top, edge, edge, edge], banks, 300, 40, { receive: true });
    // stones along the waterline
    const stones = [];
    const r = rand(56);
    for (const side of [-1, 1]) for (let i = 0; i < 40; i++) stones.push({ o: i * 7.5 + r() * 3, x: side * (SHORE_X + 0.2), y: 0.05, s: 0.5 + r() * 0.6, rot: r() * 6, tint: 0.85 + r() * 0.3 });
    this.recycler(new THREE.IcosahedronGeometry(0.6, 0).scale(1.3, 0.6, 1), new THREE.MeshLambertMaterial({ color: 0x9a948a, flatShading: true }), stones, 300, 30, { tint: true, receive: true });
  }

  _water() {
    const r = rand(57);
    // floating rope lines with small red/white buoys: between the lanes AND on the outer edges,
    // so each of the three lanes is marked on both sides (owner feedback v3.3.2: only the middle
    // lane looked delimited)
    const buoysW = [];
    const buoysR = [];
    const edge = (CFG.laneW * 3) / 2;
    for (const x of [-edge, -CFG.laneW / 2, CFG.laneW / 2, edge]) {
      for (let i = 0; i < 60; i++) (i % 2 ? buoysR : buoysW).push({ o: i * 3, x, y: 0.05 });
    }
    const buoy = new THREE.SphereGeometry(0.16, 8, 6);
    this.recycler(buoy, mat(0xffffff), buoysW, 180, 14, { bob: 0.04 });
    this.recycler(buoy, mat(0xe63946), buoysR, 180, 14, { bob: 0.04 });
    const reeds = [];
    const lilies = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 14; i++) {
        reeds.push({ o: i * 20 + r() * 8, x: side * (SHORE_X - 0.9 - r() * 1.2), s: 0.8 + r() * 0.5, rot: r() * 6 });
        lilies.push({ o: i * 20 + 10 + r() * 6, x: side * (TRACK_HALF + 1.4 + r() * 7.5), rot: r() * 6 });
      }
    }
    this.recycler(reedGeometry(), lambertVC(), reeds, 280, 20);
    this.recycler(lilyGeometry(), lambertVC(), lilies, 280, 20);
    const ducks = [];
    for (let i = 0; i < 6; i++) ducks.push({ o: i * 46 + 20, x: (i % 2 ? 1 : -1) * (TRACK_HALF + 2.4 + r() * 6), rot: r() * 6 });
    this.recycler(duckGeometry(), lambertVC(), ducks, 276, 20, { bob: 0.05 });
    this.recycler(dockGeometry(), lambertVC(), [{ o: 70, x: SHORE_X - 1.2 }], 300, 30, { cast: true });
  }

  _park() {
    const r = rand(58);
    const trees = [];
    const willows = [];
    const pines = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 18; i++) {
        const o = i * 15 + r() * 8;
        const k = r();
        const it = { o, x: side * (SHORE_X + 3 + r() * 14), s: 0.9 + r() * 0.5, rot: r() * 6, y: 0.2 };
        if (k < 0.3) willows.push({ ...it, x: side * (SHORE_X + 1.8 + r() * 1.5) });
        else if (k < 0.75) trees.push(it);
        else pines.push(it);
      }
    }
    this.treeRecyclers = [
      this.recycler(roundTreeGeometry(0x5c9a3e, 0x4b8a34), lambertVC(), trees, 270, 20, { cast: true }),
      this.recycler(willowGeometry(), lambertVC(), willows, 270, 20, { cast: true }),
    ];
    const pineG = merged([
      part(new THREE.CylinderGeometry(0.2, 0.28, 1.2, 6), 0x5a3a1f, 0, 0.6, 0),
      part(new THREE.ConeGeometry(1.6, 3.2, 7), 0x2c6a45, 0, 2.6, 0),
      part(new THREE.ConeGeometry(1.2, 2.6, 7), 0x347a50, 0, 4.2, 0),
    ]);
    this.recycler(pineG, lambertVC(), pines, 270, 20, { cast: true });
    const benches = [];
    const lamps = [];
    const picnic = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 9; i++) {
        lamps.push({ o: i * 30 + (side > 0 ? 15 : 0), x: side * (SHORE_X + 1.6), y: 0.2 });
        benches.push({ o: i * 30 + 7 + (side > 0 ? 15 : 0), x: side * (SHORE_X + 1.9), y: 0.2, rot: side < 0 ? 0 : Math.PI });
      }
      picnic.push({ o: side < 0 ? 40 : 160, x: side * (SHORE_X + 6), y: 0.2 });
      picnic.push({ o: side < 0 ? 205 : 95, x: side * (SHORE_X + 7), y: 0.2 });
    }
    this.recycler(lampGeometry(), lambertVC(), lamps, 270, 20, { cast: true });
    this.recycler(benchGeometry(), lambertVC(), benches, 270, 20, { cast: true });
    this.recycler(picnicGeometry(), lambertVC(), picnic, 270, 20, { cast: true });
    this.zip = this.single(buildZipLine(), 120, 270, 30, 0, 0.2);
  }

  _backdrop() {
    const B = this.backdrop;
    B.add(mountainRange({ z: -270, n: 7, h: [85, 120], rad: [70, 95], seed: 61, color: 0x4a7a58, haze: HAZE_FAR, hazeK: 0.55, spread: 520 }));
    // the forested mountain right behind the park
    B.add(mountainRange({ z: -200, n: 8, h: [45, 70], rad: [45, 65], seed: 62, color: 0x3d6a40, haze: HAZE_FAR, hazeK: 0.3, keepOpen: 26, spread: 420 }));
    const r = rand(63);
    const trees = [];
    for (let i = 0; i < 90; i++) {
      const x = (r() - 0.5) * 340;
      if (Math.abs(x) < 20) continue;
      const h = 6 + r() * 7;
      const cone = new THREE.ConeGeometry(h * 0.32, h, 5);
      cone.translate(x, h / 2 - 1, -165 - r() * 14);
      trees.push(part(cone, tint(r() < 0.5 ? 0x2f6a3e : 0x3e7a48, HAZE_FAR, 0.25)));
    }
    B.add(new THREE.Mesh(merged(trees), new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false })));
  }

  animate(distance, dt, t) {
    // the zip-line rider slides across, then the next one starts
    const { rider, L, H } = this.zip.userData;
    const k = (t * 0.12) % 1;
    rider.position.set(-L / 2 + k * L, H - 1.5 + 0.3 + 1.5 - k * 3, 0);
    rider.rotation.z = Math.sin(t * 3) * 0.12;
  }
}
