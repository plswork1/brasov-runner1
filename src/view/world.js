import * as THREE from 'three';
import { CFG } from '../config.js';
import { createSkyMaterial } from './gfx/sky.js';
import { GFX } from './gfx/patches.js';
import { wrapRel } from './scenery/common.js';
import { WinterScenery } from './scenery/winter.js';
import { RepubliciiScenery } from './scenery/republicii.js';
import { TractorulScenery } from './scenery/tractorul.js';
import { AfiScenery } from './scenery/afi.js';
import { NouaScenery } from './scenery/noua.js';

export { wrapRel };

/**
 * The environment around the track: lights, sky, lane marks, weather, and one scenery set per level
 * (Poiana Brașov, Strada Republicii, Tractorul, AFI Brașov, Lacul Noua). Only the active set is
 * visible and updated. All sets are built once at start-up, so switching level never creates GPU
 * resources in the middle of a run.
 */

const SCENERIES = {
  partie: WinterScenery,
  republicii: RepubliciiScenery,
  tractorul: TractorulScenery,
  afi: AfiScenery,
  noua: NouaScenery,
};

export class World {
  /**
   * @param scene THREE.Scene
   * @param opts  {mobile: boolean, shadows: boolean, anisotropy: number}
   */
  constructor(scene, opts = {}) {
    this.scene = scene;
    this.mobile = !!opts.mobile;
    this.dummy = new THREE.Object3D();
    scene.fog = new THREE.Fog(0xd7e7f6, 46, 155);

    // Lights: sky fill + a low sun. The sun casts real shadows in a box that follows the player.
    this.hemi = new THREE.HemisphereLight(0xe8f2ff, 0x8ea6c6, 1.55);
    scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xfff1dc, 1.9);
    this.sun.castShadow = !!opts.shadows;
    const sc = this.sun.shadow.camera;
    sc.left = -16;
    sc.right = 16;
    sc.top = 30;
    sc.bottom = -22;
    sc.near = 1;
    sc.far = 80;
    const size = this.mobile ? 1024 : 2048;
    this.sun.shadow.mapSize.set(size, size);
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.03;
    this.sun.shadow.radius = 2;
    scene.add(this.sun, this.sun.target);

    this._buildSky();
    this._buildLaneMarks();
    this._buildWeather();

    const ctx = { mobile: this.mobile, aniso: opts.anisotropy || 1 };
    this.sets = {};
    for (const [id, Cls] of Object.entries(SCENERIES)) {
      const set = new Cls(ctx);
      set.group.visible = false;
      set.backdrop.visible = false;
      scene.add(set.group, set.backdrop);
      this.sets[id] = set;
    }
    this.active = null;
    this.setBiome('partie');
  }

  setShadows(on) {
    this.sun.castShadow = on;
  }

  /** Show the scenery of level `id` and apply its fog, sky, lights and weather. */
  setBiome(id) {
    const set = this.sets[id];
    if (!set || set === this.active) return;
    if (this.active) {
      this.active.group.visible = false;
      this.active.backdrop.visible = false;
    }
    this.active = set;
    this.biomeId = id;
    set.group.visible = true;
    set.backdrop.visible = true;
    const e = set.env;
    this.env = e;
    this.scene.fog.color.set(e.fog);
    this.scene.fog.near = e.fogNear;
    this.scene.fog.far = e.fogFar;
    this.hemi.color.set(e.hemi.sky);
    this.hemi.groundColor.set(e.hemi.ground);
    this.hemi.intensity = e.hemi.intensity;
    this.sun.color.set(e.sun.color);
    this.sun.intensity = e.sun.intensity;
    this.sunOffset = e.sun.offset || [-9, 19, 7];
    this._applySky(e);
    this.marks.visible = !!e.marks;
    if (e.marks) {
      this.marks.material.color.set(e.marks.color);
      this.marks.material.opacity = e.marks.opacity;
    }
    this.weather = e.weather || 'none';
    this.flakes.visible = this.weather !== 'none';
    const pm = this.flakes.material;
    if (this.weather === 'snow') {
      pm.size = 0.22;
      pm.color.set(0xffffff);
      pm.opacity = 0.95;
    } else if (this.weather === 'pollen') {
      // fluffy poplar seeds / dandelion fluff drifting over the lake in summer
      pm.size = 0.16;
      pm.color.set(0xfffbe8);
      pm.opacity = 0.8;
    }
  }

  // --- sky dome: gradient, sun and drifting clouds in one shader (see gfx/sky.js) ---------------------
  _buildSky() {
    this.sky = new THREE.Mesh(new THREE.SphereGeometry(300, 24, 16), createSkyMaterial(this.mobile));
    this.sky.renderOrder = 1000; // last of the opaque objects: only the visible sky pixels get shaded
    this.sky.frustumCulled = false;
    this.skyU = this.sky.material.uniforms;
    this.scene.add(this.sky);
  }

  /** Colours, sun and clouds of a level. env.sky = {top, mid, hor, sun: {dir, color, size, halo, disc}, clouds: {...}} */
  _applySky(e) {
    this.sky.visible = !!e.sky;
    const sky = e.sky || {};
    const U = this.skyU;
    const sun = sky.sun || {};
    U.uTop.value.set(sky.top ?? 0x3d7cc4);
    U.uMid.value.set(sky.mid ?? 0x8fbfe9);
    U.uHor.value.set(sky.hor ?? e.fog);
    const dir = sun.dir || [-0.4, 0.3, -1];
    U.uSunDir.value.set(dir[0], dir[1], dir[2]).normalize();
    U.uSunCol.value.set(sun.color ?? 0xfff2d8);
    U.uSun.value.set(sun.size ?? 0.035, sun.halo ?? 0.8, sun.disc ?? 1);
    const cl = sky.clouds || {};
    U.uCloud.value.set(cl.cover ?? 0.4, cl.speed ?? 0.012, cl.visible ?? 1);
    U.uCloudLit.value.set(cl.lit ?? 0xffffff);
    U.uCloudShade.value.set(cl.shade ?? 0xb7c8dc);
    // water / glossy surfaces reflect the same sky
    GFX.uSunDir.value.copy(U.uSunDir.value);
    GFX.uSunCol.value.copy(U.uSunCol.value);
    GFX.uSkyCol.value.set(sky.mid ?? 0xcccccc);
    GFX.uHorCol.value.set(sky.hor ?? e.fog);
  }

  // --- dashed lane dividers: they scroll and make the speed readable ----------------------------------
  _buildLaneMarks() {
    const per = 26;
    this.markSpacing = 6;
    const g = new THREE.BoxGeometry(0.08, 0.02, 2.4);
    const xs = [-CFG.laneW / 2, CFG.laneW / 2];
    this.marks = new THREE.InstancedMesh(g, new THREE.MeshLambertMaterial({ color: 0xa9c6e4, transparent: true, opacity: 0.75 }), per * xs.length);
    this.marks.frustumCulled = false;
    this.marks.receiveShadow = true;
    this.markXs = xs;
    this.markPer = per;
    this.scene.add(this.marks);
  }

  // --- falling snow (winter) / drifting fluff (park) ------------------------------------------------
  _buildWeather() {
    this.snowMax = this.mobile ? 260 : 520;
    this.snowCount = this.snowMax;
    const pos = new Float32Array(this.snowMax * 3);
    this.snowSeed = new Float32Array(this.snowMax);
    for (let i = 0; i < this.snowMax; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = -Math.random() * 130 + 10;
      this.snowSeed[i] = Math.random() * 10;
    }
    const geometry = new THREE.BufferGeometry();
    this.snowAttr = new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', this.snowAttr);
    const c = document.createElement('canvas');
    c.width = c.height = 32;
    const g2 = c.getContext('2d');
    const grad = g2.createRadialGradient(16, 16, 1, 16, 16, 15);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g2.fillStyle = grad;
    g2.fillRect(0, 0, 32, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.PointsMaterial({ size: 0.22, map: tex, transparent: true, depthWrite: false, sizeAttenuation: true, opacity: 0.95 });
    this.flakes = new THREE.Points(geometry, m);
    this.flakes.frustumCulled = false;
    this.scene.add(this.flakes);
  }

  /** Adaptive quality hook: fewer snowflakes when the frame rate drops. */
  setSnowAmount(fraction) {
    this.snowCount = Math.max(60, Math.floor(this.snowMax * fraction));
    this.flakes.geometry.setDrawRange(0, this.snowCount);
  }

  /**
   * Place everything for the current distance.
   * @param distance how far the player has run
   * @param speed    current speed (pushes snowflakes toward the camera)
   * @param dt       frame time
   * @param cam      camera (the sky follows it)
   * @param focusX   player x (the shadow box follows it)
   */
  update(distance, speed, dt, cam, focusX = 0) {
    const d = this.dummy;
    const t = performance.now() * 0.001;
    GFX.uTime.value = t % 3600;
    GFX.uDist.value = distance;
    this.skyU.uTime.value = t;
    this.active.update(distance, dt, t, cam);

    if (this.marks.visible) {
      let k = 0;
      const sp = this.markSpacing;
      const base = Math.floor((distance - 12) / sp) * sp;
      d.rotation.set(0, 0, 0);
      d.scale.set(1, 1, 1);
      for (const x of this.markXs) {
        for (let i = 0; i < this.markPer; i++) {
          d.position.set(x, 0.035, -(base + i * sp - distance));
          d.updateMatrix();
          this.marks.setMatrixAt(k++, d.matrix);
        }
      }
      this.marks.instanceMatrix.needsUpdate = true;
    }

    if (this.flakes.visible) {
      const arr = this.snowAttr.array;
      const n = this.snowCount;
      const pollen = this.weather === 'pollen';
      const fall = pollen ? 0.25 : 1.6;
      for (let i = 0; i < n; i++) {
        const j = i * 3;
        arr[j + 1] -= (fall + (i % 5) * (pollen ? 0.05 : 0.25)) * dt;
        arr[j] += Math.sin(t * 0.8 + this.snowSeed[i]) * (pollen ? 0.8 : 0.35) * dt;
        arr[j + 2] += speed * dt * 0.9;
        if (arr[j + 1] < 0 || arr[j + 2] > 12) {
          arr[j] = (Math.random() - 0.5) * 50;
          arr[j + 1] = pollen ? 1 + Math.random() * 9 : 14 + Math.random() * 8;
          arr[j + 2] = arr[j + 2] > 12 ? -120 - Math.random() * 10 : arr[j + 2];
        }
      }
      this.snowAttr.needsUpdate = true;
    }

    const o = this.sunOffset;
    this.sun.position.set(focusX + o[0], o[1], o[2]);
    this.sun.target.position.set(focusX, 0, -12);
    this.sun.target.updateMatrixWorld();
    this.sky.position.copy(cam.position);
  }

  /** For tests: how many trees are in front of the player in the current level. */
  visibleTreeCount(distance) {
    return this.active.visibleTreeCount(distance);
  }
}
