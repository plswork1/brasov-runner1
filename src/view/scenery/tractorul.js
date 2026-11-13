import * as THREE from 'three';
import { groundVariation } from '../gfx/patches.js';
import { Scenery, TRACK_HALF, benchGeometry, buildTampa, canvasTexture, lambertVC, merged, mountainRange, part, rand, roundTreeGeometry, tint } from './common.js';

/**
 * Level 3, the pedestrian promenade of the Tractorul / Coresi neighbourhood, built where the old
 * Tractorul factory used to be: modern 8-9 storey apartment blocks with balconies and wood-colored
 * panels, shops on the ground floor, a wide paved promenade with young trees, grass strips and a
 * red bike lane. The old factory is remembered by a brick hall with a saw-tooth roof and a tall
 * brick chimney behind the blocks, and Tâmpa and Postăvarul rise in the distance.
 */
const HAZE = 0xeadcc6; // warm late afternoon
const BLOCK_W = 26; // along the promenade
const BLOCK_GAP = 12;
const BLOCK_D = 14;
const FRONT_X = TRACK_HALF + 9;

const PALETTES = [
  { wall: '#f4f4f1', frame: '#4b4f55', panel: '#c07a45', floors: 9 },
  { wall: '#d9dcdf', frame: '#33373d', panel: '#e9e4d8', floors: 8 },
  { wall: '#efe6d6', frame: '#5a5048', panel: '#b5543a', floors: 9 },
];
const FLOOR_H = 3.05;
const GROUND_H = 4.6;
const blockH = (p) => GROUND_H + (p.floors - 1) * FLOOR_H + 1.0;

function blockTexture(p, seed) {
  const H = blockH(p);
  const W = 512;
  const ppm = W / BLOCK_W;
  const h = Math.round(H * ppm);
  return canvasTexture(W, h, (g) => {
    const r = rand(seed);
    const Y = (m) => h - m * ppm;
    g.fillStyle = p.wall;
    g.fillRect(0, 0, W, h);
    // ground floor: shop windows (glass) with a dark band for the shop signs
    g.fillStyle = '#3a4048';
    g.fillRect(0, Y(GROUND_H), W, GROUND_H * ppm);
    for (let x = 0.6; x < BLOCK_W - 1; x += 3.2) {
      const grad = g.createLinearGradient(0, Y(GROUND_H - 1), 0, Y(0));
      grad.addColorStop(0, '#9ab7c9');
      grad.addColorStop(1, '#e6d2b0');
      g.fillStyle = grad;
      g.fillRect(x * ppm, Y(GROUND_H - 1.1), 2.8 * ppm, (GROUND_H - 1.3) * ppm);
      if (r() < 0.6) {
        g.fillStyle = ['#e63946', '#2a9d8f', '#f4a261', '#264653', '#ffffff'][(r() * 5) | 0];
        g.fillRect(x * ppm + 6, Y(GROUND_H - 0.25), 2.8 * ppm - 12, 0.5 * ppm);
      }
    }
    // upper floors: windows + balconies with glass railings and colored panels
    for (let f = 1; f < p.floors; f++) {
      const y0 = GROUND_H + (f - 1) * FLOOR_H;
      for (let x = 0.5, k = 0; x < BLOCK_W - 1; x += 3.15, k++) {
        const balcony = (k + f) % 3 !== 0;
        g.fillStyle = p.frame;
        g.fillRect(x * ppm, Y(y0 + 2.6), 2.5 * ppm, 2.2 * ppm);
        const grad = g.createLinearGradient(0, Y(y0 + 2.6), 0, Y(y0 + 0.4));
        grad.addColorStop(0, '#9fc0d8');
        grad.addColorStop(1, '#4f6f88');
        g.fillStyle = grad;
        g.fillRect(x * ppm + 3, Y(y0 + 2.55), 2.5 * ppm - 6, 2.1 * ppm);
        if (balcony) {
          g.fillStyle = (k + f * 2) % 4 === 0 ? p.panel : 'rgba(220,235,245,0.55)';
          g.fillRect(x * ppm - 4, Y(y0 + 1.1), 2.5 * ppm + 8, 1.1 * ppm);
          g.fillStyle = 'rgba(0,0,0,0.25)';
          g.fillRect(x * ppm - 4, Y(y0 + 1.1), 2.5 * ppm + 8, 2);
        }
      }
      g.fillStyle = 'rgba(0,0,0,0.08)';
      g.fillRect(0, Y(y0), W, 3);
    }
    // vertical accent band with the panel color
    g.fillStyle = p.panel;
    g.fillRect(W * 0.62, 0, 0.9 * ppm, Y(GROUND_H));
    // roof parapet
    g.fillStyle = p.frame;
    g.fillRect(0, 0, W, 0.6 * ppm);
  });
}

function pavingTexture(aniso) {
  return canvasTexture(
    256,
    256,
    (g, w, h) => {
      const r = rand(21);
      g.fillStyle = '#b8b3aa';
      g.fillRect(0, 0, w, h);
      // large light concrete pavers with thin joints and a few darker accent bands
      for (let y = 0; y < h; y += 32) {
        for (let x = 0; x < w; x += 64) {
          g.fillStyle = ['#d8d4cc', '#cfcac1', '#dedad3', '#c9c4bb'][(r() * 4) | 0];
          g.fillRect(x + 1, y + 1, 62, 30);
        }
      }
      g.fillStyle = '#8d8a85';
      g.fillRect(0, 96, w, 8);
      g.fillRect(0, 224, w, 8);
      for (let i = 0; i < 900; i++) {
        g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)';
        g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
      }
    },
    16,
    8,
    aniso,
  );
}

function grassTexture(aniso) {
  return canvasTexture(
    128,
    128,
    (g, w, h) => {
      const r = rand(23);
      g.fillStyle = '#6aa04a';
      g.fillRect(0, 0, w, h);
      for (let i = 0; i < 1600; i++) {
        g.fillStyle = ['#5e9441', '#78ad55', '#64993f', '#86b864'][(r() * 4) | 0];
        g.fillRect(r() * w, r() * h, 1, 2 + r() * 3);
      }
    },
    8,
    8,
    aniso,
  );
}

function modernLampGeometry() {
  return merged([
    part(new THREE.CylinderGeometry(0.09, 0.12, 6, 8), 0x5b6068, 0, 3, 0),
    part(new THREE.BoxGeometry(1.4, 0.12, 0.3), 0x5b6068, 0.55, 6.0, 0),
    part(new THREE.BoxGeometry(0.9, 0.06, 0.24), 0xfff3d0, 0.75, 5.92, 0),
  ]);
}

/** Old factory: brick hall with a saw-tooth roof and a tall brick chimney. */
function factory() {
  const g = new THREE.Group();
  const brick = new THREE.MeshLambertMaterial({ color: tint(0x9b4a33, HAZE, 0.32), fog: false, flatShading: true });
  const roof = new THREE.MeshLambertMaterial({ color: tint(0x5f646b, HAZE, 0.32), fog: false, flatShading: true });
  const glass = new THREE.MeshLambertMaterial({ color: tint(0xa9c7d8, HAZE, 0.32), fog: false, flatShading: true });
  const hall = new THREE.Mesh(new THREE.BoxGeometry(60, 14, 34), brick);
  hall.position.y = 7;
  g.add(hall);
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.lineTo(10, 0);
    s.lineTo(10, 5);
    s.lineTo(0, 0);
    const t = new THREE.ExtrudeGeometry(s, { depth: 34, bevelEnabled: false });
    t.translate(-30 + i * 10, 14, -17);
    g.add(new THREE.Mesh(t, roof));
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.6, 34), glass);
    w.position.set(-20.1 + i * 10, 16.4, 0);
    g.add(w);
  }
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.6, 52, 12), brick);
  chimney.position.set(36, 26, 0);
  g.add(chimney);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.9, 1.2, 12), roof);
  ring.position.set(36, 50, 0);
  g.add(ring);
  return g;
}

export class TractorulScenery extends Scenery {
  constructor(ctx) {
    super(ctx);
    this.env = {
      fog: HAZE,
      fogNear: this.mobile ? 50 : 70,
      fogFar: this.mobile ? 175 : 235,
      sky: {
        top: 0x3873bf,
        mid: 0xb4c9dc,
        hor: HAZE,
        sun: { dir: [0.55, 0.26, -1], color: 0xffdba8, size: 0.045, halo: 0.95 },
        clouds: { cover: 0.42, lit: 0xfff1de, shade: 0xaebcd0 },
      },
      hemi: { sky: 0xf6f1e6, ground: 0x93997f, intensity: 1.4 },
      sun: { color: 0xffe2bc, intensity: 2.1, offset: [13, 18, 6] },
      exposure: 1.02,
      marks: { color: 0xffffff, opacity: 0.55 },
      weather: 'none',
      confetti: [0xc07a45, 0x2a9d8f, 0xffffff, 0xf4a261, 0xe63946],
    };
    this.ground(groundVariation(new THREE.MeshLambertMaterial({ map: grassTexture(this.aniso) }), { scale: 0.09, amount: 0.16, warm: 0.2 }), groundVariation(new THREE.MeshLambertMaterial({ map: pavingTexture(this.aniso) }), { scale: 0.2, amount: 0.1, warm: 0.1 }), {
      trackHalf: TRACK_HALF + 6.5,
    });
    this._promenade();
    this._blocks();
    this._backdrop();
  }

  _blocks() {
    const span = 38 * 8; // 8 blocks per side
    const r = rand(71);
    const by = PALETTES.map(() => []);
    for (const side of [-1, 1]) {
      for (let i = 0; i < 8; i++) {
        const pi = (i + (side > 0 ? 1 : 0)) % PALETTES.length;
        by[pi].push({ o: i * (BLOCK_W + BLOCK_GAP) + (side > 0 ? 17 : 0) + r() * 2, x: side * (FRONT_X + BLOCK_D / 2), rot: side < 0 ? 0 : Math.PI });
      }
    }
    PALETTES.forEach((p, pi) => {
      const H = blockH(p);
      const geo = new THREE.BoxGeometry(BLOCK_D, H, BLOCK_W).translate(0, H / 2, 0);
      const side = new THREE.MeshLambertMaterial({ color: p.wall });
      const front = new THREE.MeshLambertMaterial({ map: blockTexture(p, pi + 3) });
      const top = new THREE.MeshLambertMaterial({ color: 0x8c8f94 });
      // the side faces (toward the gaps between blocks) get the facade too
      this.recycler(geo, [front, side, top, side, front, front], by[pi], span, 40, { cast: true, receive: true });
    });
  }

  _promenade() {
    const r = rand(72);
    // red bike lane on the right side of the promenade
    const bike = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 300).rotateX(-Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xa8443a }));
    bike.position.set(TRACK_HALF + 3.6, 0.03, -130);
    bike.receiveShadow = true;
    this.group.add(bike);
    const trees = [];
    const lamps = [];
    const benches = [];
    const grates = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 14; i++) {
        const o = i * 18 + (side > 0 ? 9 : 0);
        const x = side * (TRACK_HALF + (side > 0 ? 1.4 : 2.4));
        trees.push({ o, x, s: 0.7 + r() * 0.25, rot: r() * 6 });
        grates.push({ o, x });
        lamps.push({ o: o + 9, x: side * (TRACK_HALF + 0.9), rot: side < 0 ? 0 : Math.PI });
        if (i % 2 === 0) benches.push({ o: o + 4.5, x: side * (TRACK_HALF + 5.5), rot: side < 0 ? 0 : Math.PI });
      }
    }
    this.treeRecyclers = [this.recycler(roundTreeGeometry(0x6fae4a, 0x5b9a3c), lambertVC(), trees, 252, 20, { cast: true })];
    this.recycler(new THREE.BoxGeometry(1.5, 0.06, 1.5), new THREE.MeshLambertMaterial({ color: 0x3f4348 }), grates, 252, 20);
    this.recycler(modernLampGeometry(), lambertVC(), lamps, 252, 20, { cast: true });
    this.recycler(benchGeometry(0xb98552, 0x6b7078), lambertVC(), benches, 252, 20, { cast: true });
    // low hedges along the grass
    const hedges = [];
    for (const side of [-1, 1]) for (let i = 0; i < 12; i++) hedges.push({ o: i * 21 + 6, x: side * (TRACK_HALF + 7.2), sx: 1, sy: 1, sz: 1 });
    const hg = new THREE.BoxGeometry(1.2, 0.9, 12).translate(0, 0.45, 0);
    this.recycler(hg, new THREE.MeshLambertMaterial({ color: 0x3f7f3a, flatShading: true }), hedges, 252, 20, { cast: true });
  }

  _backdrop() {
    const B = this.backdrop;
    // Postăvarul (higher, behind) and Tâmpa with the BRAȘOV sign
    B.add(mountainRange({ z: -290, n: 7, h: [80, 110], rad: [60, 90], seed: 44, color: 0x56786a, cap: null, haze: HAZE, hazeK: 0.55, spread: 520 }));
    B.add(buildTampa({ x: -6, z: -235, haze: HAZE, hazeK: 0.4, scale: 1.4, tall: 1.22, letters: 0.9 }));
    const f = factory();
    f.position.set(62, 0, -175);
    B.add(f);
  }
}
