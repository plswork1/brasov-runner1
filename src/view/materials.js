import * as THREE from 'three';

// Shared materials and geometries. Everything in the game is built from a handful of cached
// primitives, so there are very few GPU resources and nothing needs to be disposed per object.

const matCache = new Map();
/** Cheap flat-shaded "low poly" material, cached by color + options. */
export function mat(color, opts = {}) {
  const key = color + '|' + JSON.stringify(opts);
  let m = matCache.get(key);
  if (!m) {
    m = new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts });
    matCache.set(key, m);
  }
  return m;
}

const geoCache = new Map();
/** Cached geometry: factory is only called the first time for a given key. */
export function geo(key, factory) {
  let g = geoCache.get(key);
  if (!g) {
    g = factory();
    geoCache.set(key, g);
  }
  return g;
}

export const C = {
  snow: 0xf3f8fe,
  snowShade: 0xd5e4f4,
  ice: 0xa9d6f5,
  iceDark: 0x6fb0e0,
  wood: 0x7a4a26,
  woodDark: 0x573219,
  woodLight: 0xc89a62,
  pine: 0x1f6048,
  pineLight: 0x2c7d5a,
  rock: 0x79869a,
  rockDark: 0x5b6779,
  red: 0xd93b30,
  orange: 0xf08a24,
  yellow: 0xffcf3f,
  navy: 0x1d3557,
  blue: 0x1d6fb8,
  skin: 0xf2c4a0,
  steel: 0x8b97a8,
};

/** Create a mesh with a position (and optional scale) in one call. */
export function mesh(geometry, material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geometry, material);
  m.position.set(x, y, z);
  return m;
}

/** Paint a whole geometry one color through a vertex-color attribute (used to merge multi-colored models). */
export function paint(geometry, color) {
  const c = new THREE.Color(color);
  const n = geometry.attributes.position.count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geometry;
}
