import * as THREE from 'three';

/**
 * One InstancedMesh (ONE draw call) of camera-facing / ground-flat / stretched quads whose look is
 * drawn by a small shader: soft glow, ring, 4-point star, streak, leaf. It replaces hundreds of
 * little meshes: rings that pop, speed lines, whoosh streaks, light pillars, ambient motes and leaves.
 *
 * Slots are kept in typed arrays and recycled in ranges (so a flood of speed lines can never evict
 * an impact star). Nothing is allocated after the constructor.
 */
export const SHAPE = { GLOW: 0, RING: 1, STAR: 2, STREAK: 3, LEAF: 4 };
export const ORIENT = { BILLBOARD: 0, FLAT: 1, ZSTREAK: 2, VERTICAL: 3 };

const VERT = /* glsl */ `
attribute vec3 aPos;
attribute vec2 aSize;
attribute vec4 aColor;
attribute vec3 aMisc; // shape, orient, rotation
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
void main() {
  vec2 q = position.xy;
  vUv = q + 0.5;
  vColor = aColor;
  vShape = aMisc.x;
  float orient = aMisc.y;
  float cr = cos(aMisc.z), sr = sin(aMisc.z);
  vec3 toCam = normalize(cameraPosition - aPos);
  vec3 right;
  vec3 up;
  if (orient < 0.5) {
    vec3 cx = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 cy = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    right = cx * cr + cy * sr;
    up = -cx * sr + cy * cr;
  } else if (orient < 1.5) {
    right = vec3(cr, 0.0, sr);
    up = vec3(sr, 0.0, -cr);
  } else if (orient < 2.5) {
    up = vec3(0.0, 0.0, -1.0);
    right = normalize(cross(up, toCam));
  } else {
    up = vec3(0.0, 1.0, 0.0);
    right = normalize(cross(up, toCam));
  }
  vec3 wp = aPos + right * (q.x * aSize.x) + up * (q.y * aSize.y);
  gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
}
`;

const FRAG = /* glsl */ `
varying vec2 vUv;
varying vec4 vColor;
varying float vShape;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  float a;
  if (vShape < 0.5) {
    a = pow(max(1.0 - r, 0.0), 2.0);
  } else if (vShape < 1.5) {
    a = smoothstep(0.62, 0.8, r) * (1.0 - smoothstep(0.9, 1.0, r));
  } else if (vShape < 2.5) {
    float cross4 = 1.0 / (1.0 + 36.0 * abs(p.x * p.y));
    a = cross4 * pow(max(1.0 - r, 0.0), 1.4) + pow(max(1.0 - r * 1.6, 0.0), 2.0);
  } else if (vShape < 3.5) {
    float across = pow(max(1.0 - abs(p.x), 0.0), 1.6);
    a = across * pow(max(sin(3.14159 * vUv.y), 0.0), 0.7);
  } else {
    float e = p.x * p.x * 3.2 + p.y * p.y;
    a = (1.0 - smoothstep(0.72, 0.95, e)) * (0.75 + 0.25 * step(0.0, p.x));
  }
  gl_FragColor = vec4(vColor.rgb, vColor.a * a);
  if (gl_FragColor.a < 0.004) discard;
  #include <colorspace_fragment>
}
`;

export class FxLayer {
  /** @param blending THREE.AdditiveBlending or THREE.NormalBlending */
  constructor(scene, capacity, blending, renderOrder = 6) {
    this.capacity = capacity;
    const n = capacity;
    this.pos = new Float32Array(n * 3);
    this.size = new Float32Array(n * 2);
    this.color = new Float32Array(n * 4);
    this.misc = new Float32Array(n * 3);
    // simulation state (not uploaded)
    this.vel = new Float32Array(n * 3);
    this.age = new Float32Array(n);
    this.life = new Float32Array(n); // 0 = free
    this.s0 = new Float32Array(n * 2);
    this.s1 = new Float32Array(n * 2);
    this.alpha = new Float32Array(n);
    this.grav = new Float32Array(n);
    this.wsK = new Float32Array(n);
    this.spin = new Float32Array(n);
    this.fin = new Float32Array(n);
    this.flick = new Float32Array(n);
    this.rgb = new Float32Array(n * 3);
    this.cursors = new Map();
    this._c = new THREE.Color();

    const base = new THREE.PlaneGeometry(1, 1);
    const g = new THREE.InstancedBufferGeometry();
    g.index = base.index;
    g.setAttribute('position', base.getAttribute('position'));
    g.setAttribute('uv', base.getAttribute('uv'));
    const dyn = (arr, k, name) => {
      const a = new THREE.InstancedBufferAttribute(arr, k).setUsage(THREE.DynamicDrawUsage);
      g.setAttribute(name, a);
      return a;
    };
    this.attrs = [dyn(this.pos, 3, 'aPos'), dyn(this.size, 2, 'aSize'), dyn(this.color, 4, 'aColor'), dyn(this.misc, 3, 'aMisc')];
    g.instanceCount = n;
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending,
      fog: false,
      toneMapped: false,
    });
    this.mesh = new THREE.Mesh(g, material);
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = renderOrder;
    this.mesh.userData.noShadow = true;
    this.mesh.castShadow = false;
    scene.add(this.mesh);
    this.clear();
  }

  clear() {
    this.life.fill(0);
    this.size.fill(0);
    this.color.fill(0);
    for (const a of this.attrs) a.needsUpdate = true;
  }

  /** Claim the next slot of the range [lo, hi) (the oldest one is overwritten). */
  slot(lo, hi) {
    let c = this.cursors.get(lo) ?? lo;
    if (c < lo || c >= hi) c = lo;
    this.cursors.set(lo, c + 1 >= hi ? lo : c + 1);
    return c;
  }

  /**
   * Start one quad. Sizes are in world units (w across, h along); they interpolate from (w0,h0) to (w1,h1)
   * with an ease-out over the life. `wsK` = how much of the world speed the quad moves with (1 = stuck to the ground).
   */
  emit(lo, hi, shape, orient, x, y, z, vx, vy, vz, w0, h0, w1, h1, life, hex, alpha, grav = 0, wsK = 1, rot = 0, spin = 0, fin = 0.04, flick = 0) {
    const i = this.slot(lo, hi);
    const c = this._c.set(hex);
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.s0[i * 2] = w0;
    this.s0[i * 2 + 1] = h0;
    this.s1[i * 2] = w1;
    this.s1[i * 2 + 1] = h1;
    this.size[i * 2] = w0;
    this.size[i * 2 + 1] = h0;
    this.rgb[i * 3] = c.r;
    this.rgb[i * 3 + 1] = c.g;
    this.rgb[i * 3 + 2] = c.b;
    this.alpha[i] = alpha;
    this.grav[i] = grav;
    this.wsK[i] = wsK;
    this.spin[i] = spin;
    this.fin[i] = fin;
    this.flick[i] = flick;
    this.age[i] = 0;
    this.life[i] = life;
    this.misc[i * 3] = shape;
    this.misc[i * 3 + 1] = orient;
    this.misc[i * 3 + 2] = rot;
    this.color[i * 4] = c.r;
    this.color[i * 4 + 1] = c.g;
    this.color[i * 4 + 2] = c.b;
    this.color[i * 4 + 3] = 0;
    return i;
  }

  update(dt, worldSpeed) {
    const n = this.capacity;
    for (let i = 0; i < n; i++) {
      const life = this.life[i];
      if (life <= 0) continue;
      const age = (this.age[i] += dt);
      if (age >= life) {
        this.life[i] = 0;
        this.size[i * 2] = this.size[i * 2 + 1] = 0;
        this.color[i * 4 + 3] = 0;
        continue;
      }
      const t = age / life;
      const k = 1 - (1 - t) * (1 - t);
      this.vel[i * 3 + 1] -= this.grav[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += (this.vel[i * 3 + 2] + worldSpeed * this.wsK[i]) * dt;
      this.size[i * 2] = this.s0[i * 2] + (this.s1[i * 2] - this.s0[i * 2]) * k;
      this.size[i * 2 + 1] = this.s0[i * 2 + 1] + (this.s1[i * 2 + 1] - this.s0[i * 2 + 1]) * k;
      this.misc[i * 3 + 2] += this.spin[i] * dt;
      const fin = this.fin[i];
      let a = this.alpha[i] * Math.min(t / fin, 1) * Math.min((1 - t) / 0.45, 1);
      if (this.flick[i] > 0) a *= 0.65 + 0.35 * Math.sin(age * this.flick[i] + i * 1.7);
      this.color[i * 4 + 3] = a;
    }
    for (const a of this.attrs) a.needsUpdate = true;
  }
}
