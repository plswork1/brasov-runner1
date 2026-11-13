import * as THREE from 'three';
import { snowPatch } from '../gfx/patches.js';
import { C, mat, mesh } from '../materials.js';
import { Scenery, TAU, TRACK_HALF, buildTampa, canvasTexture, lambertVC, merged, mountainRange, part, rand, tint } from './common.js';

/**
 * Level 1, Poiana Brașov: the groomed ski slope (the original Winter Runner map) plus Brașov
 * landmarks: Mount Tâmpa with the BRAȘOV sign ahead, a UNITBV faculty building in the background
 * and a wooden mountain cabin that passes on the right every now and then.
 */
const HAZE = 0xdbe9f6; // crisp, cold morning

function trackTexture(aniso) {
  return canvasTexture(
    128,
    256,
    (g, w, h) => {
      g.fillStyle = '#eef4fb';
      g.fillRect(0, 0, w, h);
      for (let x = 0; x < w; x += 8) {
        g.fillStyle = 'rgba(160,186,214,0.30)';
        g.fillRect(x, 0, 2, h);
        g.fillStyle = 'rgba(255,255,255,0.65)';
        g.fillRect(x + 3, 0, 2, h);
      }
      const r = rand(7);
      for (let i = 0; i < 900; i++) {
        g.fillStyle = r() < 0.5 ? 'rgba(150,175,205,0.16)' : 'rgba(255,255,255,0.5)';
        g.fillRect(r() * w, r() * h, 1 + r() * 3, 1 + r() * 5);
      }
      for (let i = 0; i < 40; i++) {
        g.fillStyle = '#fff';
        g.fillRect(r() * w, r() * h, 1, 1);
      }
    },
    3,
    10,
    aniso,
  );
}

function powderTexture(aniso) {
  return canvasTexture(
    256,
    256,
    (g, w, h) => {
      g.fillStyle = '#f2f7fd';
      g.fillRect(0, 0, w, h);
      const r = rand(11);
      for (let i = 0; i < 160; i++) {
        const x = r() * w;
        const y = r() * h;
        const rad = 6 + r() * 26;
        const grad = g.createRadialGradient(x, y, 0, x, y, rad);
        grad.addColorStop(0, r() < 0.55 ? 'rgba(170,196,226,0.22)' : 'rgba(255,255,255,0.6)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grad;
        g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
      }
      for (let i = 0; i < 120; i++) {
        g.fillStyle = '#fff';
        g.fillRect(r() * w, r() * h, 1, 1);
      }
    },
    12,
    7,
    aniso,
  );
}

function pineGeometry() {
  const p = [part(new THREE.CylinderGeometry(0.2, 0.3, 1.3, 6), 0x6b4423, 0, 0.65, 0)];
  for (const L of [
    { r: 1.9, h: 2.1, y: 1.1 },
    { r: 1.5, h: 1.9, y: 2.4 },
    { r: 1.1, h: 1.8, y: 3.6 },
  ]) {
    p.push(part(new THREE.ConeGeometry(L.r, L.h, 7), C.pine, 0, L.y + L.h / 2, 0));
    p.push(part(new THREE.ConeGeometry(L.r * 0.62, L.h * 0.5, 7), C.snow, 0, L.y + L.h * 0.74, 0));
  }
  return merged(p);
}

function spruceGeometry() {
  const p = [part(new THREE.CylinderGeometry(0.16, 0.24, 1.0, 6), 0x5a3a1f, 0, 0.5, 0)];
  for (let i = 0; i < 5; i++) {
    const k = i / 4;
    const r = 1.35 - k * 0.95;
    const h = 1.5 - k * 0.35;
    const y = 0.8 + i * 1.05;
    p.push(part(new THREE.ConeGeometry(r, h, 6), 0x1b5541, 0, y + h / 2, 0));
    p.push(part(new THREE.ConeGeometry(r * 0.7, h * 0.42, 6), C.snow, 0, y + h * 0.78, 0));
  }
  return merged(p);
}

function rockGeometry() {
  const a = new THREE.IcosahedronGeometry(0.7, 0);
  a.scale(1.2, 0.75, 1.0);
  const cap = new THREE.IcosahedronGeometry(0.62, 0);
  cap.scale(1.15, 0.45, 0.95);
  return merged([part(a, 0x7c8aa0, 0, 0.3, 0), part(cap, C.snow, 0, 0.62, 0)]);
}

function poleGeometry() {
  return merged([
    part(new THREE.CylinderGeometry(0.06, 0.07, 1.5, 6), 0xf26b1d, 0, 0.75, 0),
    part(new THREE.CylinderGeometry(0.065, 0.065, 0.32, 6), 0x1c2333, 0, 1.36, 0),
    part(new THREE.SphereGeometry(0.09, 6, 4), C.snow, 0, 1.55, 0),
  ]);
}

/** Wooden mountain cabin ("cabană") with a snowy roof, lit windows, a porch and chimney smoke. */
function buildCabin() {
  const g = new THREE.Group();
  const logs = new THREE.MeshLambertMaterial({
    map: canvasTexture(128, 128, (c, w, h) => {
      c.fillStyle = '#6e4325';
      c.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 16) {
        c.fillStyle = '#86542f';
        c.fillRect(0, y + 2, w, 10);
        c.fillStyle = 'rgba(0,0,0,0.25)';
        c.fillRect(0, y + 13, w, 3);
      }
    }),
  });
  const W = 7;
  const D = 6;
  const H = 3.4;
  const walls = mesh(new THREE.BoxGeometry(D, H, W), logs, 0, H / 2 + 0.6, 0);
  g.add(walls);
  g.add(mesh(new THREE.BoxGeometry(D + 0.4, 0.6, W + 0.4), mat(0x6f7480), 0, 0.3, 0)); // stone base
  // steep roof (prism) with snow on top
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-D / 2 - 0.7, 0);
  roofShape.lineTo(0, 3.4);
  roofShape.lineTo(D / 2 + 0.7, 0);
  roofShape.lineTo(-D / 2 - 0.7, 0);
  const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: W + 1.2, bevelEnabled: false });
  roofGeo.translate(0, 0, -(W + 1.2) / 2);
  g.add(mesh(roofGeo, mat(0x4a2c19), 0, H + 0.6, 0));
  const snowGeo = new THREE.ExtrudeGeometry(roofShape, { depth: W + 1.3, bevelEnabled: false });
  snowGeo.translate(0, 0, -(W + 1.3) / 2);
  const snowRoof = mesh(snowGeo, mat(C.snow), 0, H + 0.85, 0);
  snowRoof.scale.set(1.02, 0.96, 1);
  g.add(snowRoof);
  // lit windows on the side facing the track (-x)
  const glass = new THREE.MeshBasicMaterial({ color: 0xffd27a });
  const frame = mat(0xf2e6d0);
  for (const z of [-2, 2]) {
    g.add(mesh(new THREE.BoxGeometry(0.12, 1.3, 1.3), frame, -D / 2 - 0.02, 2.4, z));
    g.add(mesh(new THREE.BoxGeometry(0.14, 1.05, 1.05), glass, -D / 2 - 0.04, 2.4, z));
  }
  g.add(mesh(new THREE.BoxGeometry(0.14, 2.1, 1.2), mat(0x3d2414), -D / 2 - 0.03, 1.65, 0)); // door
  // porch roof and posts
  g.add(mesh(new THREE.BoxGeometry(1.6, 0.15, W - 1), mat(0x4a2c19), -D / 2 - 0.8, 3.3, 0));
  g.add(mesh(new THREE.BoxGeometry(1.7, 0.2, W - 0.8), mat(C.snow), -D / 2 - 0.8, 3.45, 0));
  for (const z of [-2.8, 2.8]) g.add(mesh(new THREE.BoxGeometry(0.2, 2.7, 0.2), mat(0x5a3a1f), -D / 2 - 1.45, 1.95, z));
  // chimney with smoke puffs (animated)
  g.add(mesh(new THREE.BoxGeometry(0.8, 2.2, 0.8), mat(0x777b84), 1.0, H + 3.4, -1.8));
  g.add(mesh(new THREE.BoxGeometry(0.95, 0.25, 0.95), mat(C.snow), 1.0, H + 4.5, -1.8));
  const smokeMat = new THREE.MeshLambertMaterial({ color: 0xe8edf3, transparent: true, opacity: 0.7, depthWrite: false });
  const puffs = [];
  for (let i = 0; i < 5; i++) {
    const p = mesh(new THREE.IcosahedronGeometry(0.55, 1), smokeMat, 1.0, H + 5, -1.8);
    g.add(p);
    puffs.push(p);
  }
  g.userData.puffs = puffs;
  // wood pile and a small sign
  for (let i = 0; i < 3; i++) {
    const l = mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.4, 7).rotateX(Math.PI / 2), mat(0x8a5a33), -D / 2 - 0.4, 0.85 + i * 0.4, -W / 2 - 1.6);
    l.position.x += (i % 2) * 0.25;
    g.add(l);
  }
  g.traverse((o) => (o.castShadow = true));
  return g;
}

/** A UNITBV faculty building (in the spirit of the Colina Universității campus), far away. */
function buildFaculty(haze) {
  const g = new THREE.Group();
  const facade = canvasTexture(512, 256, (c, w, h) => {
    c.fillStyle = '#e9e4da';
    c.fillRect(0, 0, w, h);
    // five floors of strip windows with blue glass
    for (let f = 0; f < 5; f++) {
      const y = 22 + f * 44;
      c.fillStyle = '#3d6f9e';
      c.fillRect(14, y, w - 28, 24);
      c.fillStyle = 'rgba(255,255,255,0.35)';
      for (let x = 14; x < w - 14; x += 34) c.fillRect(x, y, 3, 24);
      c.fillStyle = '#cfc8bb';
      c.fillRect(0, y + 28, w, 6);
    }
    c.fillStyle = '#2a4f78';
    c.fillRect(w / 2 - 40, h - 40, 80, 40); // entrance
  });
  const sideMat = new THREE.MeshLambertMaterial({ color: tint(0xdcd6cb, haze, 0.3), fog: false });
  const frontMat = new THREE.MeshLambertMaterial({ map: facade, color: tint(0xffffff, haze, 0.3), fog: false });
  const body = new THREE.Mesh(new THREE.BoxGeometry(34, 17, 12), [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat]);
  body.position.y = 8.5;
  g.add(body);
  // snow on the flat roof
  g.add(mesh(new THREE.BoxGeometry(34.4, 0.7, 12.4), new THREE.MeshLambertMaterial({ color: 0xf4f8fd, fog: false }), 0, 17.3, 0));
  // the UNITBV letters on the roof
  const sign = canvasTexture(512, 128, (c, w, h) => {
    c.font = '900 104px "Arial Black", Arial, sans-serif';
    c.textAlign = 'center';
    c.fillStyle = '#0d3b7a';
    c.fillText('UNITBV', w / 2, 102);
  });
  sign.wrapS = sign.wrapT = THREE.ClampToEdgeWrapping;
  const s = new THREE.Mesh(new THREE.PlaneGeometry(20, 5), new THREE.MeshBasicMaterial({ map: sign, transparent: true, fog: false }));
  s.position.set(0, 20.4, 5.8);
  g.add(s);
  g.add(mesh(new THREE.BoxGeometry(20, 0.4, 0.4), new THREE.MeshBasicMaterial({ color: 0x55606e, fog: false }), 0, 17.9, 5.8));
  // a lower wing
  const wing = new THREE.Mesh(new THREE.BoxGeometry(14, 9, 10), [sideMat, sideMat, sideMat, sideMat, frontMat, sideMat]);
  wing.position.set(22, 4.5, 2);
  g.add(wing);
  g.add(mesh(new THREE.BoxGeometry(14.4, 0.6, 10.4), new THREE.MeshLambertMaterial({ color: 0xf4f8fd, fog: false }), 22, 9.2, 2));
  return g;
}

export class WinterScenery extends Scenery {
  constructor(ctx) {
    super(ctx);
    this.env = {
      fog: HAZE,
      fogNear: this.mobile ? 34 : 46,
      fogFar: this.mobile ? 120 : 155,
      sky: {
        top: 0x2f68b8,
        mid: 0x86bdea,
        hor: HAZE,
        sun: { dir: [-0.5, 0.34, -1], color: 0xfff3dc, size: 0.04, halo: 0.75 },
        clouds: { cover: 0.52, lit: 0xffffff, shade: 0xb4c9e2 },
      },
      // cold light: warm-white sun, blue ambient, so the shadows on the snow are blue
      hemi: { sky: 0xd2e3ff, ground: 0x8aa0cf, intensity: 1.6 },
      sun: { color: 0xfff0d9, intensity: 1.85 },
      exposure: 1.05,
      marks: { color: 0xa9c6e4, opacity: 0.75 },
      weather: 'snow',
      confetti: [0xffffff, 0xcfe8ff, 0x9fd3ff, 0xffe27a],
    };
    this.ground(snowPatch(new THREE.MeshLambertMaterial({ map: powderTexture(this.aniso) })), snowPatch(new THREE.MeshLambertMaterial({ map: trackTexture(this.aniso) }), { strength: 1.2 }));
    this._edges();
    this._trees();
    this._hills();
    this._backdrop();
  }

  _edges() {
    const r = rand(41);
    const banks = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 26; i++) {
        banks.push({ o: (i / 26) * 240 + r() * 4, x: side * (TRACK_HALF + 1.4 + r() * 0.5), y: -0.1, sx: 1.5 + r() * 0.6, sy: 0.2 + r() * 0.2, sz: 4.5 + r() * 3.5, rot: (r() - 0.5) * 0.25 });
      }
    }
    this.recycler(new THREE.IcosahedronGeometry(1, 2), new THREE.MeshLambertMaterial({ color: 0xf4f8fd, flatShading: true }), banks, 240, 30, { receive: true });
    const poles = [];
    for (const side of [-1, 1]) for (let i = 0; i < 18; i++) poles.push({ o: i * 12 + (side > 0 ? 6 : 0), x: side * (TRACK_HALF + 1.6) });
    this.recycler(poleGeometry(), lambertVC(), poles, 216, 14, { cast: true });
    const rocks = [];
    for (let i = 0; i < 26; i++) {
      const side = i % 2 ? 1 : -1;
      rocks.push({ o: (i / 26) * 200 + r() * 5, x: side * (TRACK_HALF + 2.6 + r() * 4), s: 0.6 + r() * 0.9, rot: r() * TAU, tint: 0.9 + r() * 0.15 });
    }
    this.recycler(rockGeometry(), lambertVC(), rocks, 200, 16, { cast: true, receive: true, tint: true });
  }

  _trees() {
    const count = this.mobile ? 40 : 60;
    const span = 230;
    const cabinO = 120; // the cabin stands in a clearing on the right: no trees there
    const r = rand(51);
    const pines = [];
    const spruces = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const near = r() < 0.35;
      const it = { o: (i / count) * span + r() * 3, x: side * (near ? 7.6 + r() * 2.5 : 10.5 + r() * 10), s: 0.8 + r() * 0.7, rot: r() * TAU, tint: 0.82 + r() * 0.3 };
      const k = r();
      if (side > 0 && Math.abs(it.o - cabinO) < 11 && it.x > 9) continue;
      (k < 0.55 ? pines : spruces).push(it);
    }
    const material = lambertVC();
    this.treeRecyclers = [
      this.recycler(pineGeometry(), material, pines, span, 18, { cast: true, tint: true }),
      this.recycler(spruceGeometry(), material, spruces, span, 18, { cast: true, tint: true }),
    ];
    // Same span as the trees, so the cabin always keeps its clearing.
    this.cabin = this.single(buildCabin(), cabinO, span, 18, 15.5, 0);
  }

  _hills() {
    const r = rand(61);
    const hills = [];
    for (let i = 0; i < 12; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const sy = 4 + r() * 4;
      hills.push({ o: (i / 12) * 180, x: side * (30 + r() * 12), sx: 11 + r() * 8, sy, sz: 14 + r() * 10, y: -sy * 0.35 });
    }
    // (span 180: the hills never reach the backdrop with Tâmpa and the faculty)
    this.recycler(new THREE.SphereGeometry(1, 12, 7), mat(0xeef4fb), hills, 180, 40);
  }

  _backdrop() {
    const B = this.backdrop;
    B.add(mountainRange({ z: -215, n: 9, h: [55, 85], rad: [55, 85], seed: 21, color: 0xc6d8ec, cap: 0xf7fbff, haze: HAZE, hazeK: 0.35 }));
    B.add(mountainRange({ z: -185, n: 8, h: [38, 62], rad: [40, 62], seed: 22, color: 0xa6bfdb, cap: 0xf4f9ff, haze: HAZE, hazeK: 0.3, keepOpen: 40 }));
    B.add(buildTampa({ x: 34, z: -160, winter: true, haze: HAZE, hazeK: 0.16, scale: 0.9 }));
    const fac = buildFaculty(HAZE);
    fac.position.set(-44, 0, -150);
    fac.rotation.y = 0.35;
    B.add(fac);
    // dark forest band in front of the backdrop
    const r = rand(31);
    const trees = [];
    for (let i = 0; i < 80; i++) {
      const x = (r() - 0.5) * 320;
      if (Math.abs(x) < 16) continue;
      const h = 5 + r() * 6;
      const cone = new THREE.ConeGeometry(h * 0.3, h, 5);
      cone.translate(x, h / 2 - 1, -142 - r() * 12);
      trees.push(part(cone, tint(r() < 0.5 ? 0x2f5b56 : 0x3d6b68, HAZE, 0.35)));
    }
    B.add(new THREE.Mesh(merged(trees), new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false })));
  }

  animate(distance, dt, t) {
    // chimney smoke: puffs rise, grow and fade, then start again
    const puffs = this.cabin.userData.puffs;
    for (let i = 0; i < puffs.length; i++) {
      const k = (t * 0.35 + i / puffs.length) % 1;
      const p = puffs[i];
      p.position.set(1.0 + k * 1.5, 8.6 + k * 4.5, -1.8 - k * 0.8);
      p.scale.setScalar(0.6 + k * 1.6);
    }
  }
}
