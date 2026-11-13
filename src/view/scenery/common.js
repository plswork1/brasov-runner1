import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { CFG } from '../../config.js';
import { paint } from '../materials.js';

/**
 * Shared helpers for the scenery of every level.
 *
 * Every scenery object has a fixed base position `o` along the track and is drawn at
 *     rel = wrap(o - distance)   (a value in [-behind, span - behind))
 * i.e. its place is computed from the distance every frame instead of being moved forward step by
 * step. This makes the scenery independent of the history of the run: when a new run starts and the
 * distance jumps back to 0, the trees, houses and ground are still exactly where they should be.
 * (The old "move it forward when it falls behind" approach lost every tree after the first death.)
 */

export const TAU = Math.PI * 2;
export const TRACK_HALF = (CFG.laneW * 3) / 2 + 0.6; // half width of the playable track

/** Position of a recycled object relative to the player, in [-behind, span - behind). Exported for tests. */
export function wrapRel(base, distance, behind, span) {
  const r = (base - distance + behind) % span;
  return (r < 0 ? r + span : r) - behind;
}

/** Deterministic pseudo random numbers so the scenery looks the same every run. */
export function rand(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A texture drawn once on a canvas (no image files anywhere in the game). */
export function canvasTexture(w, h, draw, repeatX = 1, repeatY = 1, aniso = 1) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.anisotropy = aniso;
  return t;
}

/**
 * Merge many painted parts into one geometry (one draw call). Mixed sources (indexed primitives,
 * non-indexed extrusions) are normalized first: non-indexed, with only position/normal/color.
 */
export function merged(parts) {
  const norm = parts.map((g) => {
    const n = g.index ? g.toNonIndexed() : g;
    for (const name of Object.keys(n.attributes)) if (name !== 'position' && name !== 'normal' && name !== 'color') n.deleteAttribute(name);
    if (!n.attributes.normal) n.computeVertexNormals();
    return n;
  });
  return mergeGeometries(norm, false);
}

/** Translate a geometry and paint it one color (for merged, vertex-colored models). */
export function part(geometry, color, x = 0, y = 0, z = 0) {
  geometry.translate(x, y, z);
  return paint(geometry, color);
}

export const lambertVC = () => new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });

/** Mix a color toward another one (manual "aerial perspective" for far backdrops). */
export function tint(color, toward, k) {
  return new THREE.Color(color).lerp(new THREE.Color(toward), k).getHex();
}

/**
 * Base class of a level's scenery. Subclasses fill `this.group` (moves with the track, recycled with
 * wrapRel) and `this.backdrop` (far away, fixed: mountains, Tâmpa...), and set `this.env`
 * (fog, sky, lights, weather...).
 */
export class Scenery {
  constructor(ctx) {
    this.ctx = ctx;
    this.mobile = !!ctx.mobile;
    this.aniso = ctx.aniso || 1;
    this.group = new THREE.Group();
    this.backdrop = new THREE.Group();
    this.recyclers = [];
    this.singles = [];
    this.slabs = null;
    this.treeRecyclers = [];
    this.dummy = new THREE.Object3D();
  }

  /** An InstancedMesh of `items` ({o, x, y, rot, s | sx sy sz, tint}) recycled over `span` units. */
  recycler(geometry, material, items, span, behind, opts = {}) {
    const im = new THREE.InstancedMesh(geometry, material, Math.max(1, items.length));
    im.count = items.length;
    im.frustumCulled = false;
    im.castShadow = !!opts.cast;
    im.receiveShadow = !!opts.receive;
    if (opts.tint) {
      const c = new THREE.Color();
      items.forEach((it, i) => {
        if (typeof it.tint === 'number' && it.tint > 2) c.set(it.tint);
        else c.setScalar(it.tint ?? 1);
        im.setColorAt(i, c);
      });
    }
    this.group.add(im);
    const R = { im, items, span, behind, bob: opts.bob };
    this.recyclers.push(R);
    return R;
  }

  /** A single (non-instanced) object recycled like the rest, e.g. the cabin. */
  single(obj, o, span, behind, x = 0, y = 0) {
    this.group.add(obj);
    this.singles.push({ obj, o, span, behind, x, y });
    return obj;
  }

  /**
   * Ground: `count` slabs of length `len`, each holding the side ground and the track strip.
   * @param side material of the wide ground, track material of the strip (or null)
   */
  ground(side, track, { len = 60, count = 5, width = 140, trackY = 0.02, trackHalf = TRACK_HALF } = {}) {
    const g = new THREE.PlaneGeometry(width, len).rotateX(-Math.PI / 2);
    const strip = new THREE.PlaneGeometry(trackHalf * 2, len).rotateX(-Math.PI / 2);
    const slabs = [];
    for (let i = 0; i < count; i++) {
      const slab = new THREE.Mesh(g, side);
      slab.receiveShadow = true;
      if (track) {
        const t = new THREE.Mesh(strip, track);
        t.position.y = trackY;
        t.receiveShadow = true;
        slab.add(t);
      }
      slab.userData.o = i * len;
      this.group.add(slab);
      slabs.push(slab);
    }
    this.slabs = { list: slabs, len, count };
  }

  updateTrack(distance) {
    const d = this.dummy;
    if (this.slabs) {
      const { list, len, count } = this.slabs;
      for (const slab of list) {
        const rel = wrapRel(slab.userData.o, distance, 20 + len, len * count);
        slab.position.set(0, 0, -(rel + len / 2));
      }
    }
    const t = performance.now() * 0.001;
    for (const R of this.recyclers) {
      const { im, items, span, behind, bob } = R;
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        const rel = wrapRel(it.o, distance, behind, span);
        d.position.set(it.x, (it.y || 0) + (bob ? Math.sin(t * 2 + i * 1.7) * bob : 0), -rel);
        d.rotation.set(0, it.rot || 0, bob ? Math.sin(t * 1.6 + i) * 0.06 : 0);
        if (it.sx) d.scale.set(it.sx, it.sy, it.sz);
        else d.scale.setScalar(it.s ?? 1);
        d.updateMatrix();
        im.setMatrixAt(i, d.matrix);
      }
      im.instanceMatrix.needsUpdate = true;
    }
    for (const S of this.singles) {
      const rel = wrapRel(S.o, distance, S.behind, S.span);
      S.obj.position.set(S.x, S.y, -rel);
    }
  }

  /** Called every frame while the level is shown. */
  update(distance, dt, t, cam) {
    this.updateTrack(distance);
    this.backdrop.position.x = cam.position.x * 0.9; // far away: barely any parallax
    this.animate?.(distance, dt, t, cam);
  }

  /** For tests: how many trees are in front of the player (within the fog distance). */
  visibleTreeCount(distance) {
    let n = 0;
    for (const R of this.treeRecyclers) {
      for (const it of R.items) {
        const rel = wrapRel(it.o, distance, R.behind, R.span);
        if (rel > 0 && rel < 150) n++;
      }
    }
    return n;
  }
}

// ---------------------------------------------------------------------------------------------
// Shared models
// ---------------------------------------------------------------------------------------------

/** Deciduous tree (round crown) for the city and the park. */
export function roundTreeGeometry(crown = 0x4f8f3a, crown2 = 0x3f7a30, trunk = 0x6a4a2c) {
  const p = [part(new THREE.CylinderGeometry(0.16, 0.24, 2.4, 6), trunk, 0, 1.2, 0)];
  const a = new THREE.IcosahedronGeometry(1.5, 1);
  a.scale(1, 0.9, 1);
  p.push(part(a, crown, 0, 3.2, 0));
  const b = new THREE.IcosahedronGeometry(1.05, 1);
  p.push(part(b, crown2, 0.7, 2.7, 0.3));
  const c = new THREE.IcosahedronGeometry(0.95, 1);
  p.push(part(c, crown, -0.6, 3.9, -0.2));
  return merged(p);
}

/** Old-fashioned black street lamp (Brașov old town style). */
export function lampGeometry() {
  return merged([
    part(new THREE.CylinderGeometry(0.16, 0.22, 0.5, 8), 0x1d1f24, 0, 0.25, 0),
    part(new THREE.CylinderGeometry(0.06, 0.08, 3.6, 6), 0x23262c, 0, 2.2, 0),
    part(new THREE.CylinderGeometry(0.2, 0.12, 0.12, 6), 0x23262c, 0, 4.05, 0),
    part(new THREE.CylinderGeometry(0.18, 0.13, 0.5, 6), 0xffe6a8, 0, 4.35, 0), // glass (lit)
    part(new THREE.ConeGeometry(0.26, 0.3, 6), 0x1d1f24, 0, 4.75, 0),
    part(new THREE.SphereGeometry(0.05, 5, 4), 0x1d1f24, 0, 4.95, 0),
  ]);
}

/** Wooden park bench seen from the side (for the scenery, not an obstacle). */
export function benchGeometry(wood = 0x9a6a3c, metal = 0x2c3038) {
  const p = [];
  for (const z of [-0.7, 0.7]) {
    p.push(part(new THREE.BoxGeometry(0.5, 0.45, 0.08), metal, 0, 0.22, z));
    p.push(part(new THREE.BoxGeometry(0.08, 0.5, 0.08), metal, -0.22, 0.65, z));
  }
  for (const x of [-0.12, 0.08]) p.push(part(new THREE.BoxGeometry(0.16, 0.05, 1.7), wood, x, 0.47, 0));
  for (const y of [0.68, 0.85]) p.push(part(new THREE.BoxGeometry(0.05, 0.12, 1.7), wood, -0.24, y, 0));
  return merged(p);
}

// --- Tâmpa with the BRAȘOV sign -----------------------------------------------------------------

const letterCache = new Map();
function letterTexture(ch) {
  if (letterCache.has(ch)) return letterCache.get(ch);
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 160;
  const g = c.getContext('2d');
  g.font = '900 150px "Arial Black", Arial, Helvetica, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  g.lineWidth = 8;
  g.strokeStyle = 'rgba(40,50,60,0.55)';
  g.strokeText(ch, 64, ch === 'Ș' ? 120 : 140);
  g.fillStyle = '#ffffff';
  g.fillText(ch, 64, ch === 'Ș' ? 120 : 140);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  letterCache.set(ch, t);
  return t;
}

/**
 * Mount Tâmpa: a long, steep, forested ridge with the white BRAȘOV letters on its face (like the
 * real sign above the old town). Far away, so it is drawn without fog and tinted toward `haze`.
 * @param o {x, z, winter, haze, hazeK, scale, tall (vertical stretch), letters (sign size)}
 */
export function buildTampa({ x = 0, z = -150, winter = false, haze = 0xd7e7f6, hazeK = 0.35, scale = 1, tall = 1, letters = 1 } = {}) {
  const g = new THREE.Group();
  const a = 62 * scale;
  const b = 40 * scale * tall;
  const c = 30 * scale;
  const cy = -8 * scale;
  const geom = new THREE.SphereGeometry(1, 56, 28, 0, TAU, 0, Math.PI / 2);
  const pos = geom.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const r = rand(77);
  const cc = new THREE.Color();
  const greens = winter ? [0x24463a, 0x2c5244, 0x335c4c, 0x2a4c40] : [0x2f5a2a, 0x3b6b31, 0x467a37, 0x335f2d];
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    // a ridge: steeper toward the front, with bumpy "tree crowns" all over
    const bump = 1 + (r() - 0.5) * 0.025 + Math.sin(vx * 11) * Math.cos(vz * 9) * 0.015;
    pos.setXYZ(i, vx * a * bump, vy * b * bump * (1 - 0.18 * Math.abs(vx)), vz * c * bump);
    let hex = greens[(r() * greens.length) | 0];
    if (winter && r() < 0.12 + vy * 0.3) hex = r() < 0.5 ? 0xdfe8f2 : 0xc9d7e6; // snow on the trees
    if (!winter && vy > 0.86) hex = 0x55804a; // the bald top
    cc.set(tint(hex, haze, hazeK));
    col.set([cc.r, cc.g, cc.b], i * 3);
  }
  geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geom.computeVertexNormals();
  const hill = new THREE.Mesh(geom, new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false }));
  hill.position.set(0, cy, 0);
  g.add(hill);

  // Letters on the north face, a little below the top, each turned to the surface normal
  const word = ['B', 'R', 'A', 'Ș', 'O', 'V'];
  const yRel = 0.68; // height on the hill (0..1)
  const lw = 7.2 * scale * letters;
  const n = new THREE.Vector3();
  word.forEach((ch, i) => {
    const lx = (i - (word.length - 1) / 2) * lw * 1.12 + a * 0.06;
    const ux = lx / a;
    const uy = yRel;
    const uz = Math.sqrt(Math.max(0.02, 1 - ux * ux - uy * uy));
    const y = cy + uy * b * (1 - 0.18 * Math.abs(ux));
    const p = new THREE.Vector3(lx, y, uz * c);
    n.set(ux / a, uy / b, uz / c).normalize();
    p.addScaledVector(n, 1.6 * scale);
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(lw, lw * 1.25),
      new THREE.MeshBasicMaterial({ map: letterTexture(ch), transparent: true, fog: false, color: tint(0xffffff, haze, hazeK * 0.4), depthWrite: false }),
    );
    m.position.copy(p);
    m.lookAt(p.clone().add(n.clone().setY(n.y * 0.35).normalize()));
    m.renderOrder = 2;
    g.add(m);
    // the metal frame legs under each letter
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.4 * scale, lw * 0.5, 0.4 * scale), new THREE.MeshBasicMaterial({ color: tint(0x6c7480, haze, hazeK), fog: false }));
    leg.position.copy(p).add(new THREE.Vector3(0, -lw * 0.75, -0.8 * scale));
    g.add(leg);
  });
  g.position.set(x, 0, z);
  return g;
}

/** A range of distant mountains (cones), drawn without fog and tinted toward the haze color. */
export function mountainRange({ z, n, h, rad, seed, color, cap = null, haze, hazeK = 0.45, keepOpen = 0, spread = 460 }) {
  const r = rand(seed);
  const parts = [];
  for (let i = 0; i < n; i++) {
    const x = -spread / 2 + (i / Math.max(1, n - 1)) * spread + (r() - 0.5) * 30;
    if (Math.abs(x) < keepOpen) continue;
    const hh = h[0] + r() * (h[1] - h[0]);
    const rr = rad[0] + r() * (rad[1] - rad[0]);
    const seg = 5 + Math.floor(r() * 3);
    const body = new THREE.ConeGeometry(rr, hh, seg);
    body.rotateY(r() * TAU);
    body.translate(x, hh / 2 - 3, z + (r() - 0.5) * 16);
    parts.push(paint(body, tint(color, haze, hazeK)));
    if (cap !== null) {
      const capH = hh * (0.3 + r() * 0.12);
      const capG = new THREE.ConeGeometry(rr * (capH / hh) * 1.04, capH, seg);
      capG.rotateY(r() * TAU);
      capG.translate(x, hh - capH / 2 - 3 + 0.2, z + (r() - 0.5) * 2);
      parts.push(paint(capG, tint(cap, haze, hazeK * 0.6)));
    }
  }
  return new THREE.Mesh(merged(parts), new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true, fog: false }));
}
