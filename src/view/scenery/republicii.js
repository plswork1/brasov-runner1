import * as THREE from 'three';
import { groundVariation } from '../gfx/patches.js';
import { Scenery, TRACK_HALF, benchGeometry, buildTampa, canvasTexture, lambertVC, lampGeometry, merged, mountainRange, part, rand, roundTreeGeometry, tint } from './common.js';

/**
 * Level 2, Strada Republicii: the pedestrian main street of Brașov's old town. Continuous rows of
 * three- and four-storey houses in pastel colors with white window frames, arched shop fronts on the
 * ground floor and very steep tiled roofs with the small "eyelid" dormers typical of Brașov. Café
 * terraces with matching umbrellas and black lanterns line the street; Mount Tâmpa with the BRAȘOV
 * sign rises at the end of the street, and the Black Church stands over the roofs.
 */
const HAZE = 0xf0d9bd; // golden hour
const FRONT_X = TRACK_HALF + 4.4; // house fronts (the strip in between holds terraces and lamps)
const HOUSE_W = 10; // along the street
const HOUSE_D = 9;

const PALETTES = [
  { base: '#e8c36a', trim: '#fbf3e0', shutter: '#5d7f4a', storeys: 3 }, // ochre
  { base: '#efa59a', trim: '#fff4ec', shutter: null, storeys: 2 }, // salmon pink
  { base: '#a9d3b8', trim: '#f6fbf4', shutter: '#6a4a2e', storeys: 3 }, // mint
  { base: '#9fc3e3', trim: '#f4f8fc', shutter: null, storeys: 2 }, // light blue
  { base: '#f2e2c4', trim: '#ffffff', shutter: '#7a3b2e', storeys: 3 }, // cream
  { base: '#d98d6c', trim: '#fbeee2', shutter: null, storeys: 2 }, // terracotta
  { base: '#d6c3e2', trim: '#fbf7ff', shutter: '#4f6a7a', storeys: 2 }, // lilac
];
const GROUND_H = 3.8;
const STOREY_H = 3.1;
const houseH = (p) => GROUND_H + p.storeys * STOREY_H + 0.6;

/** One house front: ground floor with arched shop windows, upper floors with framed windows. */
function facadeTexture(p, seed) {
  const H = houseH(p);
  const W = 256;
  const ppm = W / HOUSE_W; // pixels per meter
  const h = Math.round(H * ppm);
  return canvasTexture(W, h, (g) => {
    const r = rand(seed);
    const Y = (m) => h - m * ppm; // meters from the ground -> canvas y
    g.fillStyle = p.base;
    g.fillRect(0, 0, W, h);
    // plaster noise
    for (let i = 0; i < 500; i++) {
      g.fillStyle = r() < 0.5 ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
      g.fillRect(r() * W, r() * h, 2 + r() * 6, 2 + r() * 6);
    }
    // corner pilasters
    g.fillStyle = 'rgba(255,255,255,0.28)';
    g.fillRect(0, 0, 0.45 * ppm, h);
    g.fillRect(W - 0.45 * ppm, 0, 0.45 * ppm, h);
    // stone plinth and ground floor band
    g.fillStyle = '#8f8a82';
    g.fillRect(0, Y(0.55), W, 0.55 * ppm);
    g.fillStyle = 'rgba(0,0,0,0.08)';
    g.fillRect(0, Y(GROUND_H), W, (GROUND_H - 0.55) * ppm);
    // three arched openings: two shop windows and a wooden gate
    for (let i = 0; i < 3; i++) {
      const cx = (1.9 + i * 3.1) * ppm;
      const ow = 2.1 * ppm;
      const top = Y(GROUND_H - 0.5);
      const bot = Y(0.55);
      g.fillStyle = p.trim;
      g.beginPath();
      g.moveTo(cx - ow / 2 - 5, bot);
      g.lineTo(cx - ow / 2 - 5, top + ow / 2);
      g.arc(cx, top + ow / 2, ow / 2 + 5, Math.PI, 0);
      g.lineTo(cx + ow / 2 + 5, bot);
      g.fill();
      const gate = i === 1;
      g.fillStyle = gate ? '#5a3a22' : '#2b3a48';
      g.beginPath();
      g.moveTo(cx - ow / 2, bot);
      g.lineTo(cx - ow / 2, top + ow / 2);
      g.arc(cx, top + ow / 2, ow / 2, Math.PI, 0);
      g.lineTo(cx + ow / 2, bot);
      g.fill();
      if (!gate) {
        // warm shop interior and window bars
        const grad = g.createLinearGradient(0, top, 0, bot);
        grad.addColorStop(0, 'rgba(255,214,140,0.55)');
        grad.addColorStop(1, 'rgba(255,190,110,0.15)');
        g.fillStyle = grad;
        g.fillRect(cx - ow / 2 + 3, top + ow / 2, ow - 6, bot - top - ow / 2);
        g.fillStyle = 'rgba(255,255,255,0.7)';
        g.fillRect(cx - 1, top + 6, 2, bot - top - 6);
      } else {
        g.fillStyle = 'rgba(0,0,0,0.25)';
        g.fillRect(cx - 1, top + ow / 2, 2, bot - top - ow / 2);
      }
    }
    // cornice over the ground floor
    g.fillStyle = p.trim;
    g.fillRect(0, Y(GROUND_H + 0.05), W, 0.3 * ppm);
    // upper floors
    for (let f = 0; f < p.storeys; f++) {
      const base = GROUND_H + f * STOREY_H;
      for (let i = 0; i < 4; i++) {
        const cx = (1.5 + i * 2.33) * ppm;
        const ww = 1.05 * ppm;
        const wh = 1.7 * ppm;
        const y0 = Y(base + 0.75 + 1.7);
        // frame + pediment ("eyebrow") over the window
        g.fillStyle = p.trim;
        g.fillRect(cx - ww / 2 - 4, y0 - 4, ww + 8, wh + 8);
        if (f === 0) {
          g.beginPath();
          g.moveTo(cx - ww / 2 - 8, y0 - 6);
          g.lineTo(cx, y0 - 6 - 0.45 * ppm);
          g.lineTo(cx + ww / 2 + 8, y0 - 6);
          g.fill();
        } else {
          g.fillRect(cx - ww / 2 - 7, y0 - 10, ww + 14, 5);
        }
        g.fillRect(cx - ww / 2 - 7, y0 + wh + 2, ww + 14, 6); // sill
        // glass with a sky reflection
        const grad = g.createLinearGradient(0, y0, 0, y0 + wh);
        grad.addColorStop(0, '#5c7f9e');
        grad.addColorStop(1, '#2c4256');
        g.fillStyle = grad;
        g.fillRect(cx - ww / 2, y0, ww, wh);
        g.fillStyle = p.trim;
        g.fillRect(cx - 1.5, y0, 3, wh);
        g.fillRect(cx - ww / 2, y0 + wh * 0.38, ww, 3);
        if (p.shutter) {
          g.fillStyle = p.shutter;
          g.fillRect(cx - ww / 2 - 0.42 * ppm - 4, y0, 0.42 * ppm, wh);
          g.fillRect(cx + ww / 2 + 4, y0, 0.42 * ppm, wh);
          g.fillStyle = 'rgba(0,0,0,0.2)';
          for (let k = 4; k < wh; k += 5) {
            g.fillRect(cx - ww / 2 - 0.42 * ppm - 4, y0 + k, 0.42 * ppm, 1);
            g.fillRect(cx + ww / 2 + 4, y0 + k, 0.42 * ppm, 1);
          }
        }
        // flower box on some first-floor windows
        if (f === 0 && r() < 0.5) {
          g.fillStyle = '#7a4a2a';
          g.fillRect(cx - ww / 2 - 2, y0 + wh + 6, ww + 4, 6);
          for (let k = 0; k < 6; k++) {
            g.fillStyle = r() < 0.5 ? '#e63946' : '#ff8fab';
            g.beginPath();
            g.arc(cx - ww / 2 + 2 + k * (ww / 5.5), y0 + wh + 5, 3, 0, Math.PI * 2);
            g.fill();
          }
        }
      }
      // string course between floors
      g.fillStyle = 'rgba(255,255,255,0.35)';
      g.fillRect(0, Y(base + STOREY_H), W, 4);
    }
    // a small wrought-iron balcony in the middle of the first floor on some houses
    if (seed % 2 === 0) {
      const y = Y(GROUND_H + 0.75);
      g.fillStyle = '#1f2228';
      g.fillRect(2.6 * ppm, y - 2, 5 * ppm, 3);
      for (let x = 2.6 * ppm; x < 7.6 * ppm; x += 5) g.fillRect(x, y - 0.9 * ppm, 1.5, 0.9 * ppm);
      g.fillRect(2.6 * ppm, y - 0.9 * ppm, 5 * ppm, 2);
    }
    // main cornice under the roof
    g.fillStyle = p.trim;
    g.fillRect(0, 0, W, 0.6 * ppm);
    g.fillStyle = 'rgba(0,0,0,0.15)';
    g.fillRect(0, 0.6 * ppm, W, 3);
  });
}

/** Roof tiles (red-brown "solzi"). */
function tileTexture() {
  return canvasTexture(128, 128, (g, w, h) => {
    g.fillStyle = '#9c4a2c';
    g.fillRect(0, 0, w, h);
    const r = rand(5);
    for (let y = 0; y < h; y += 10) {
      for (let x = (y / 10) % 2 ? -8 : 0; x < w; x += 16) {
        g.fillStyle = ['#a8532f', '#8f4126', '#b45f37', '#9a4a2b'][(r() * 4) | 0];
        g.beginPath();
        g.ellipse(x + 8, y + 6, 8, 6, 0, 0, Math.PI);
        g.fill();
      }
      g.fillStyle = 'rgba(0,0,0,0.18)';
      g.fillRect(0, y + 9, w, 1);
    }
  }, 4, 3);
}

/** Very steep roof with the Brașov "eyelid" dormers on the street side (+x in local space). */
function roofGeometry() {
  const s = new THREE.Shape();
  const half = HOUSE_D / 2 + 0.35;
  s.moveTo(-half, 0);
  s.lineTo(0, 6.4);
  s.lineTo(half, 0);
  s.lineTo(-half, 0);
  const roof = new THREE.ExtrudeGeometry(s, { depth: HOUSE_W + 0.02, bevelEnabled: false });
  roof.translate(0, 0, -HOUSE_W / 2);
  return roof;
}

function eyelidsGeometry() {
  // two rows of small half-cylinder dormers with a dark slit, on the slope facing the street
  const p = [];
  const slope = Math.atan2(6.4, HOUSE_D / 2 + 0.35);
  for (const [h, zs] of [
    [1.9, [-3, 0, 3]],
    [3.7, [-1.6, 1.6]],
  ]) {
    const xOn = (HOUSE_D / 2 + 0.35) * (1 - h / 6.4);
    for (const z of zs) {
      const lid = new THREE.CylinderGeometry(0.42, 0.42, 1.3, 8, 1, false, 0, Math.PI);
      lid.rotateX(Math.PI / 2);
      lid.rotateZ(-Math.PI / 2 + slope);
      p.push(part(lid, 0x8f4126, xOn + 0.05, h, z));
      const slit = new THREE.BoxGeometry(0.06, 0.14, 0.8);
      slit.rotateZ(slope - Math.PI / 2 + Math.PI / 2);
      p.push(part(slit, 0x1b1410, xOn + 0.3, h + 0.12, z));
    }
  }
  // chimney
  p.push(part(new THREE.BoxGeometry(0.6, 1.6, 0.6), 0xd8cfc0, -1.2, 5.2, 2.6));
  return merged(p);
}

/** Café terrace: square table, chairs and a big cream umbrella (they all match, like on Republicii). */
function terraceGeometry() {
  const p = [];
  p.push(part(new THREE.BoxGeometry(1.0, 0.06, 1.0), 0x3b2b20, 0, 0.75, 0));
  p.push(part(new THREE.CylinderGeometry(0.05, 0.08, 0.75, 6), 0x2b2b2b, 0, 0.37, 0));
  for (const [x, z] of [
    [-0.75, 0],
    [0.75, 0],
    [0, -0.75],
    [0, 0.75],
  ]) {
    p.push(part(new THREE.BoxGeometry(0.45, 0.06, 0.45), 0x4a3a2c, x, 0.45, z));
    p.push(part(new THREE.BoxGeometry(0.45, 0.5, 0.06), 0x4a3a2c, x + (x ? Math.sign(x) * 0.2 : 0), 0.7, z + (z ? Math.sign(z) * 0.2 : 0)));
  }
  p.push(part(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 6), 0xeeeeee, 0, 1.2, 0));
  const umb = new THREE.ConeGeometry(1.9, 0.7, 4);
  umb.rotateY(Math.PI / 4);
  p.push(part(umb, 0xf3ead6, 0, 2.55, 0));
  p.push(part(new THREE.BoxGeometry(2.7, 0.18, 2.7), 0xe9dcc0, 0, 2.2, 0));
  return merged(p);
}

function flowerPotGeometry() {
  return merged([
    part(new THREE.CylinderGeometry(0.45, 0.35, 0.7, 8), 0x7b6b5a, 0, 0.35, 0),
    part(new THREE.IcosahedronGeometry(0.55, 1), 0x3f7a30, 0, 0.95, 0),
    part(new THREE.IcosahedronGeometry(0.22, 0), 0xe63946, 0.25, 1.2, 0.2),
    part(new THREE.IcosahedronGeometry(0.2, 0), 0xffb703, -0.25, 1.15, -0.1),
  ]);
}

/** Granite slabs of the pedestrian street. */
function pavingTexture(aniso, light = false) {
  return canvasTexture(
    256,
    256,
    (g, w, h) => {
      const r = rand(light ? 17 : 13);
      g.fillStyle = '#6f6a63';
      g.fillRect(0, 0, w, h);
      const tones = light ? ['#c9c3b8', '#bdb6aa', '#d4cec4', '#b2ab9f'] : ['#a39d92', '#9a9387', '#aea89d', '#918b80'];
      for (let y = 0; y < h; y += 32) {
        let x = (y / 32) % 2 ? -24 : 0;
        while (x < w) {
          const len = 40 + ((r() * 3) | 0) * 12;
          g.fillStyle = tones[(r() * tones.length) | 0];
          g.fillRect(x + 1, y + 1, len - 2, 30);
          g.fillStyle = 'rgba(255,255,255,0.06)';
          g.fillRect(x + 1, y + 1, len - 2, 4);
          x += len;
        }
      }
      for (let i = 0; i < 1400; i++) {
        g.fillStyle = r() < 0.5 ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.07)';
        g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
      }
    },
    light ? 3 : 18,
    light ? 7 : 7,
    aniso,
  );
}

/** The Black Church (Biserica Neagră): dark stone Gothic hall, steep roof, west tower. */
function blackChurch() {
  const g = new THREE.Group();
  const stone = new THREE.MeshLambertMaterial({ color: tint(0x5b534c, HAZE, 0.35), fog: false, flatShading: true });
  const roof = new THREE.MeshLambertMaterial({ color: tint(0x6e3b2a, HAZE, 0.35), fog: false, flatShading: true });
  const hall = new THREE.Mesh(new THREE.BoxGeometry(24, 22, 70), stone);
  hall.position.set(0, 11, 0);
  g.add(hall);
  const s = new THREE.Shape();
  s.moveTo(-12.5, 0);
  s.lineTo(0, 22);
  s.lineTo(12.5, 0);
  s.lineTo(-12.5, 0);
  const rg = new THREE.ExtrudeGeometry(s, { depth: 70, bevelEnabled: false });
  rg.translate(0, 22, -35);
  g.add(new THREE.Mesh(rg, roof));
  const tower = new THREE.Mesh(new THREE.BoxGeometry(13, 50, 13), stone);
  tower.position.set(0, 25, 40);
  g.add(tower);
  const spire = new THREE.Mesh(new THREE.ConeGeometry(5, 14, 4), roof);
  spire.rotation.y = Math.PI / 4;
  spire.position.set(0, 57, 40);
  g.add(spire);
  // tall Gothic windows
  const winMat = new THREE.MeshBasicMaterial({ color: tint(0x2a2622, HAZE, 0.3), fog: false });
  for (let i = 0; i < 6; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.4, 11, 3), winMat);
    w.position.set(12.2, 10, -28 + i * 10);
    g.add(w);
  }
  return g;
}

export class RepubliciiScenery extends Scenery {
  constructor(ctx) {
    super(ctx);
    this.env = {
      fog: HAZE,
      fogNear: this.mobile ? 50 : 70,
      fogFar: this.mobile ? 170 : 230,
      sky: {
        top: 0x3a6cb4,
        mid: 0xd6b9a2,
        hor: HAZE,
        sun: { dir: [-0.55, 0.2, -1], color: 0xffc47c, size: 0.05, halo: 1.2 },
        clouds: { cover: 0.36, lit: 0xffe6c8, shade: 0xb48f96 },
      },
      hemi: { sky: 0xffeedb, ground: 0x9a8a7c, intensity: 1.32 },
      sun: { color: 0xffd29c, intensity: 2.25, offset: [-15, 16, 3] },
      exposure: 1.02,
      marks: { color: 0x7d776d, opacity: 0.55 },
      weather: 'none',
      confetti: [0xe63946, 0xffb703, 0xffffff, 0xa9d3b8, 0xefa59a],
    };
    // v3: slow tone variation (worn / damp stones) so the cobbles do not repeat like wallpaper
    this.ground(
      groundVariation(new THREE.MeshLambertMaterial({ map: pavingTexture(this.aniso) }), { scale: 0.16, amount: 0.12, warm: 0.12 }),
      groundVariation(new THREE.MeshLambertMaterial({ map: pavingTexture(this.aniso, true) }), { scale: 0.22, amount: 0.1, warm: 0.1 }),
    );
    this._houses();
    this._street();
    this._backdrop();
  }

  _houses() {
    const span = 280;
    const per = span / HOUSE_W;
    const roofTex = tileTexture();
    const r = rand(91);
    const byPalette = PALETTES.map(() => []);
    const roofs = [];
    const lids = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < per; i++) {
        const pi = (i * 3 + (side > 0 ? 2 : 0) + ((r() * 2) | 0)) % PALETTES.length;
        const p = PALETTES[pi];
        const it = { o: i * HOUSE_W + (side > 0 ? 4 : 0), x: side * (FRONT_X + HOUSE_D / 2), y: 0, rot: side < 0 ? 0 : Math.PI };
        byPalette[pi].push(it);
        const tintv = 0.85 + r() * 0.25;
        roofs.push({ ...it, y: houseH(p), tint: tintv });
        lids.push({ ...it, y: houseH(p), tint: tintv });
      }
    }
    PALETTES.forEach((p, pi) => {
      const H = houseH(p);
      const geo = new THREE.BoxGeometry(HOUSE_D, H, HOUSE_W).translate(0, H / 2, 0);
      const side = new THREE.MeshLambertMaterial({ color: p.base });
      const front = new THREE.MeshLambertMaterial({ map: facadeTexture(p, pi + 1) });
      this.recycler(geo, [front, side, side, side, side, side], byPalette[pi], span, 30, { cast: true, receive: true });
    });
    this.recycler(roofGeometry(), new THREE.MeshLambertMaterial({ map: roofTex, flatShading: true }), roofs, span, 30, { cast: true, tint: true });
    this.recycler(eyelidsGeometry(), lambertVC(), lids, span, 30, { tint: true });
  }

  _street() {
    const r = rand(92);
    const terraces = [];
    const lamps = [];
    const pots = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 20; i++) {
        const o = i * 12 + (side > 0 ? 5 : 0);
        if (r() < 0.75) terraces.push({ o, x: side * (TRACK_HALF + 2.2), rot: r() * 0.2 });
        if (i % 2 === 0) lamps.push({ o: o + 6, x: side * (TRACK_HALF + 0.55) });
        else pots.push({ o: o + 6, x: side * (TRACK_HALF + 0.6), s: 0.9 + r() * 0.3 });
      }
    }
    this.recycler(terraceGeometry(), lambertVC(), terraces, 240, 20, { cast: true });
    this.recycler(lampGeometry(), lambertVC(), lamps, 240, 20, { cast: true });
    this.recycler(flowerPotGeometry(), lambertVC(), pots, 240, 20, { cast: true });
    // a few street trees in front of the houses
    const trees = [];
    for (let i = 0; i < 8; i++) trees.push({ o: i * 30 + 13, x: (i % 2 ? 1 : -1) * (TRACK_HALF + 3.6), s: 0.8 + r() * 0.2, rot: r() * 6 });
    this.treeRecyclers = [this.recycler(roundTreeGeometry(), lambertVC(), trees, 240, 20, { cast: true })];
    // benches between the terraces
    const benches = [];
    for (let i = 0; i < 10; i++) benches.push({ o: i * 24 + 9, x: (i % 2 ? 1 : -1) * (TRACK_HALF + 3.9), rot: i % 2 ? Math.PI : 0 });
    this.recycler(benchGeometry(), lambertVC(), benches, 240, 20, { cast: true });
  }

  _backdrop() {
    const B = this.backdrop;
    B.add(mountainRange({ z: -260, n: 8, h: [60, 90], rad: [55, 80], seed: 33, color: 0x6d8fa6, cap: null, haze: HAZE, hazeK: 0.55 }));
    // Tâmpa straight ahead at the end of the street, with the BRAȘOV sign
    B.add(buildTampa({ x: 2, z: -215, haze: HAZE, hazeK: 0.36, scale: 1.25, tall: 1.5, letters: 0.85 }));
    const church = blackChurch();
    church.position.set(-30, 0, -185);
    church.rotation.y = 0.25;
    B.add(church);
  }
}
