import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

/**
 * GPU resources of ONE skin. Skins are swapped at run time (wardrobe, battle pass rewards), so,
 * unlike the rest of the game (which uses the global never-disposed caches of `materials.js`),
 * everything a skin creates is owned by its kit and released by `dispose()` when the skin is taken
 * off. Geometries and materials are cached inside the kit, so a skin never creates the same
 * resource twice.
 *
 * `SkinKit.live` counts the resources that currently exist over all kits; the tests use it to
 * prove that changing skins does not leak.
 */
export class SkinKit {
  static live = { geometries: 0, materials: 0 };

  constructor() {
    this.geos = new Map();
    this.mats = new Map();
    this.disposed = false;
  }

  geo(key, factory) {
    let g = this.geos.get(key);
    if (!g) {
      g = factory();
      this.geos.set(key, g);
      SkinKit.live.geometries++;
    }
    return g;
  }

  mat(color, opts = {}) {
    const key = color + '|' + JSON.stringify(opts);
    let m = this.mats.get(key);
    if (!m) {
      m = new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts });
      this.mats.set(key, m);
      SkinKit.live.materials++;
    }
    return m;
  }

  box(w, h, d) {
    return this.geo(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d));
  }
  sph(r, ws = 10, hs = 8, phiLen = Math.PI * 2, thetaLen = Math.PI) {
    return this.geo(`s${r},${ws},${hs},${phiLen},${thetaLen}`, () => new THREE.SphereGeometry(r, ws, hs, 0, phiLen, 0, thetaLen));
  }
  cyl(rt, rb, h, seg = 10, open = false) {
    return this.geo(`c${rt},${rb},${h},${seg},${open}`, () => new THREE.CylinderGeometry(rt, rb, h, seg, 1, open));
  }
  cone(r, h, seg = 8) {
    return this.geo(`k${r},${h},${seg}`, () => new THREE.ConeGeometry(r, h, seg));
  }
  torus(r, tube, rs = 6, ts = 14) {
    return this.geo(`t${r},${tube},${rs},${ts}`, () => new THREE.TorusGeometry(r, tube, rs, ts));
  }

  /** Mesh with a position (and an optional rotation) in one call. */
  mesh(geometry, material, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
    const m = new THREE.Mesh(geometry, material);
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    return m;
  }

  /**
   * Fewer draw calls: meshes of the list that hang on the same parent and share a material are
   * merged into ONE mesh (their positions / rotations are baked into the merged geometry, which
   * this kit owns like every other resource). Anything with children is left alone.
   * @returns the new list (merged meshes + everything that was not merged)
   */
  compact(objs) {
    const out = [];
    const groups = new Map(); // parent -> Map(material -> [mesh])
    for (const o of objs) {
      if (!o.isMesh || o.children.length || !o.parent) {
        out.push(o);
        continue;
      }
      if (!groups.has(o.parent)) groups.set(o.parent, new Map());
      const byMat = groups.get(o.parent);
      if (!byMat.has(o.material)) byMat.set(o.material, []);
      byMat.get(o.material).push(o);
    }
    for (const [parent, byMat] of groups) {
      for (const [material, meshes] of byMat) {
        if (meshes.length === 1) {
          out.push(meshes[0]);
          continue;
        }
        const parts = meshes.map((m) => {
          m.updateMatrix();
          const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
          g.applyMatrix4(m.matrix);
          for (const name of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(name)) g.deleteAttribute(name);
          return g;
        });
        const merged = mergeGeometries(parts, false);
        for (const g of parts) g.dispose();
        this.geos.set(`merged#${this.geos.size}`, merged);
        SkinKit.live.geometries++;
        for (const m of meshes) m.removeFromParent();
        const mesh = new THREE.Mesh(merged, material);
        parent.add(mesh);
        out.push(mesh);
      }
    }
    return out;
  }

  /** Free every geometry and material of this skin. Safe to call twice. */
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    for (const g of this.geos.values()) g.dispose();
    for (const m of this.mats.values()) m.dispose();
    SkinKit.live.geometries -= this.geos.size;
    SkinKit.live.materials -= this.mats.size;
    this.geos.clear();
    this.mats.clear();
  }
}
