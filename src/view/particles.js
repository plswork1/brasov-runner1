import * as THREE from 'three';

function circleTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.6, 'rgba(255,255,255,0.9)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * One fixed-size pool of particles drawn as a single THREE.Points object (1 draw call).
 * Used for snow spray, coin sparkles and the hit burst. Particles live in world space and are
 * pushed toward the camera by the world speed so trails look attached to the slope.
 */
export class Particles {
  constructor(scene, capacity = 320) {
    this.capacity = capacity;
    this.pos = new Float32Array(capacity * 3);
    this.col = new Float32Array(capacity * 4); // r,g,b,alpha
    this.vel = new Float32Array(capacity * 3);
    this.life = new Float32Array(capacity);
    this.maxLife = new Float32Array(capacity);
    this.cursor = 0;
    this.limit = capacity; // adaptive quality can lower this
    const geometry = new THREE.BufferGeometry();
    this.posAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.colAttr = new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', this.posAttr);
    geometry.setAttribute('color', this.colAttr);
    const material = new THREE.PointsMaterial({
      size: 0.3,
      map: circleTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this.points = new THREE.Points(geometry, material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    scene.add(this.points);
    this.clear();
  }

  clear() {
    this.life.fill(0);
    for (let i = 0; i < this.capacity; i++) {
      this.pos[i * 3 + 1] = -999;
      this.col[i * 4 + 3] = 0;
    }
    this.posAttr.needsUpdate = true;
    this.colAttr.needsUpdate = true;
  }

  emit(x, y, z, vx, vy, vz, life, color) {
    const i = this.cursor;
    this.cursor = (this.cursor + 1) % this.limit;
    const c = this._c ?? (this._c = new THREE.Color());
    c.set(color);
    this.pos[i * 3] = x;
    this.pos[i * 3 + 1] = y;
    this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx;
    this.vel[i * 3 + 1] = vy;
    this.vel[i * 3 + 2] = vz;
    this.life[i] = this.maxLife[i] = life;
    this.col[i * 4] = c.r;
    this.col[i * 4 + 1] = c.g;
    this.col[i * 4 + 2] = c.b;
    this.col[i * 4 + 3] = 1;
  }

  /** Small burst of particles around a point. */
  burst(x, y, z, count, speed, life, colors) {
    for (let k = 0; k < count; k++) {
      const a = Math.random() * Math.PI * 2;
      const e = Math.random() * 0.9 + 0.1;
      const sp = speed * (0.4 + Math.random() * 0.8);
      this.emit(
        x,
        y,
        z,
        Math.cos(a) * sp * e,
        Math.random() * sp * 0.9 + sp * 0.2,
        Math.sin(a) * sp * e,
        life * (0.6 + Math.random() * 0.6),
        colors[(Math.random() * colors.length) | 0],
      );
    }
  }

  update(dt, worldSpeed) {
    for (let i = 0; i < this.capacity; i++) {
      if (this.life[i] <= 0) continue;
      this.life[i] -= dt;
      if (this.life[i] <= 0) {
        this.col[i * 4 + 3] = 0;
        this.pos[i * 3 + 1] = -999;
        continue;
      }
      this.vel[i * 3 + 1] -= 9 * dt; // gravity
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] = Math.max(0.05, this.pos[i * 3 + 1] + this.vel[i * 3 + 1] * dt);
      this.pos[i * 3 + 2] += (this.vel[i * 3 + 2] + worldSpeed) * dt;
      this.col[i * 4 + 3] = Math.min(1, (this.life[i] / this.maxLife[i]) * 1.6);
    }
    this.posAttr.needsUpdate = true;
    this.colAttr.needsUpdate = true;
  }
}
