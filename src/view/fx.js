import * as THREE from 'three';
import { FxLayer, SHAPE, ORIENT } from './fx/layer.js';
import { POWER_COLORS } from './powerupViews.js';

/**
 * v3 "juice": every purely visual effect that reacts to what happens in the run (on top of the
 * basic particle bursts that game.js already makes). Nothing here may change the gameplay.
 *
 * Interface used by game.js (keep it):
 *   new GameFx({scene, camera, particles, mobile})
 *   fx.setBiome(id, ride)     level changed ('partie' | 'republicii' | 'tractorul' | 'afi' | 'noua'; ride: snowboard | skate | bike | boat)
 *   fx.setQuality(level)      0 = best ... 3 = lowest (adaptive quality of the game)
 *   fx.clear()                new run
 *   fx.on(event, data)        one-shot events, see EVENTS
 *   fx.update(dt, ctx)        every rendered frame (dt = 0 while paused). ctx = {
 *       state,                'menu' | 'playing' | 'paused' | 'dying' | 'revive' | 'gameover'
 *       player,               PlayerState (x, y, vy, laneVel, grounded, sliding, flying)
 *       speed, speedK,        view speed in units/s, and 0..1 between base and top speed
 *       distance,             metres run
 *       timeScale,            < 1 while the clock power-up slows the world
 *       chasing,              the bear is chasing
 *   }
 *
 * EVENTS (data always has x, y = the player's position; z = 0 is the player's depth, -z is ahead):
 *   'start'                         a run starts
 *   'jump' | 'superjump' | 'land' | 'slide' | 'lane' {dir: -1 | 1} | 'edge'
 *   'coin'      {cx, cy}            a coin was collected at (cx, cy) (no extra effect on purpose: owner's request)
 *   'pickup'    {type}              power-up item or 'crown'
 *   'powerEnd'  {type}
 *   'hit'       {result: 'shield' | 'chase-start' | 'caught'}
 *   'escape'                        the bear gave up
 *   'revive'
 *   'level'     {id}                the player came out of the portal into level `id`
 *
 * Implementation: two FxLayer objects (2 draw calls in all): an additive one for glows, rings, stars,
 * streaks and ambient light specks, and a normal-blended one for falling leaves. Slots are recycled in
 * ranges so speed lines never push out an impact effect.
 */
const { GLOW, RING, STAR, STREAK, LEAF } = SHAPE;
const { BILLBOARD, FLAT, ZSTREAK, VERTICAL } = ORIENT;

// slot ranges of the additive layer
const SPEED_LO = 0;
const SPEED_HI = 56;
const AMB_LO = 56;
const AMB_HI = 104;
const EV_LO = 104;
const EV_HI = 250;
const LEAF_CAP = 36;

const LEVEL_SPARKS = [0xffd75e, 0xfff2a8, 0x9ff0ff, 0xffffff]; // arrival in a new level

/** Per level: ground spray colors, wind-streak color, ambient kind. */
const LOOK = {
  partie: { ground: 0xe6f3ff, ground2: 0x9fd0ff, wind: 0xdcefff, ambient: null },
  republicii: { ground: 0xe6d3a8, ground2: 0xffe2a0, wind: 0xffefcf, ambient: 'leaf' },
  tractorul: { ground: 0xe0cba0, ground2: 0xffd9a0, wind: 0xffe8c0, ambient: 'leaf' },
  afi: { ground: 0xf4f6ff, ground2: 0xb8d0ff, wind: 0xeaf0ff, ambient: 'mote' },
  noua: { ground: 0xc8f6ff, ground2: 0x8fe3f2, wind: 0xe4ffff, ambient: 'firefly' },
};
const LEAF_COLORS = [0xd8832b, 0xc4511f, 0xe3a93a, 0x9a5a1c];

const rnd = Math.random;

export class GameFx {
  constructor({ scene, camera, particles, mobile }) {
    this.camera = camera;
    this.particles = particles;
    this.mobile = !!mobile;
    this.A = new FxLayer(scene, EV_HI, THREE.AdditiveBlending, 6);
    this.N = new FxLayer(scene, LEAF_CAP, THREE.NormalBlending, 5);
    this.look = LOOK.partie;
    this.biome = 'partie';
    this.ride = 'snowboard';
    this.q = 0; // quality level
    this.qf = 1; // count multiplier from the quality
    this.speedAcc = 0;
    this.ambAcc = 0;
    this.speed = 0;
    this.speedK = 0;
    this.lastX = 0;
    this.lastY = 0;
  }

  setBiome(id, ride) {
    this.biome = id;
    this.ride = ride;
    this.look = LOOK[id] ?? LOOK.partie;
    // ambient specks of the old level must not follow the player into the new one
    this._clearRange(AMB_LO, AMB_HI);
    this.N.clear();
  }

  setQuality(level) {
    this.q = level;
    this.qf = [1, 0.7, 0.4, 0.2][level] ?? 1;
    if (level >= 2) {
      this._clearRange(SPEED_LO, SPEED_HI);
      this._clearRange(AMB_LO, AMB_HI);
      this.N.clear();
    }
  }

  clear() {
    this.A.clear();
    this.N.clear();
    this.speedAcc = this.ambAcc = 0;
  }

  _clearRange(lo, hi) {
    const L = this.A;
    for (let i = lo; i < hi; i++) {
      L.life[i] = 0;
      L.size[i * 2] = L.size[i * 2 + 1] = 0;
      L.color[i * 4 + 3] = 0;
    }
  }

  // ---- small emitters (additive layer, event range) ------------------------------------------

  /** Ring that spreads and fades. flat = lying on the ground, else facing the camera. */
  _ring(x, y, z, flat, r0, r1, life, hex, a, wsK = 0, vz = 0) {
    this.A.emit(EV_LO, EV_HI, RING, flat ? FLAT : BILLBOARD, x, y, z, 0, 0, vz, r0 * 2, r0 * 2, r1 * 2, r1 * 2, life, hex, a, 0, wsK, 0, 0, 0.02);
  }

  /** A star-shaped flash (grows then fades). */
  _flash(x, y, z, r0, r1, life, hex, a, rot = 0) {
    this.A.emit(EV_LO, EV_HI, STAR, BILLBOARD, x, y, z, 0, 0, 0, r0 * 2, r0 * 2, r1 * 2, r1 * 2, life, hex, a, 0, 0, rot, 1.5, 0.02);
  }

  _glow(x, y, z, r0, r1, life, hex, a) {
    this.A.emit(EV_LO, EV_HI, GLOW, BILLBOARD, x, y, z, 0, 0, 0, r0 * 2, r0 * 2, r1 * 2, r1 * 2, life, hex, a, 0, 0, 0, 0, 0.02);
  }

  /** Sparkle thrown outward from (x,y,z) in the camera plane (a star that falls a little). */
  _sparkle(x, y, z, speed, life, hex, size, grav = 6, wsK = 0) {
    const ang = rnd() * 6.2832;
    const sp = speed * (0.5 + rnd() * 0.7);
    this.A.emit(EV_LO, EV_HI, STAR, BILLBOARD, x, y, z, Math.cos(ang) * sp, Math.sin(ang) * sp * 0.9 + speed * 0.25, (rnd() - 0.5) * sp * 0.5, size, size, size * 0.2, size * 0.2, life * (0.7 + rnd() * 0.5), hex, 1, grav, wsK, 0, 0, 0.02);
  }

  /** A streak radiating from the center (impact lines): a stretched quad pointing away. */
  _ray(x, y, z, ang, speed, len, width, life, hex, a) {
    const cx = Math.cos(ang);
    const sy = Math.sin(ang);
    // the quad's long side is its local up; rotating by (ang - 90 deg) points it along the direction
    this.A.emit(EV_LO, EV_HI, STREAK, BILLBOARD, x + cx * 0.3, y + sy * 0.3, z, cx * speed, sy * speed, 0, width, len, width * 0.5, len * 0.35, life, hex, a, 0, 0, ang - Math.PI / 2, 0, 0.02);
  }

  /** A streak lying along the track direction (whoosh / carve). */
  _zstreak(x, y, z, len, width, life, hex, a, vz = 0, wsK = 1) {
    this.A.emit(EV_LO, EV_HI, STREAK, ZSTREAK, x, y, z, 0, 0, vz, width, len, width * 0.4, len * 1.25, life, hex, a, 0, wsK, 0, 0, 0.05);
  }

  _pillar(x, z, h, w, life, hex, a) {
    this.A.emit(EV_LO, EV_HI, STREAK, VERTICAL, x, h * 0.5, z, 0, 0, 0, w, h * 0.6, w * 0.35, h, life, hex, a, 0, 0, 0, 0, 0.05);
  }

  // ---- events --------------------------------------------------------------------------------

  on(event, d) {
    const x = d?.x ?? this.lastX;
    const y = d?.y ?? this.lastY;
    const L = this.look;
    const qf = this.qf;
    const boat = this.ride === 'boat';
    switch (event) {
      case 'start':
        this._ring(x, 0.05, 0, true, 0.4, 2.4, 0.5, L.ground2, 0.5);
        break;

      case 'jump':
      case 'superjump': {
        const big = event === 'superjump';
        this._ring(x, 0.05, 0, true, 0.3, boat ? 2.8 : big ? 2.6 : 1.7, boat ? 0.65 : 0.4, boat ? L.ground : big ? 0xffd75e : L.ground2, 0.65, 1);
        if (boat) this._ring(x, 0.05, 0, true, 0.2, 1.6, 0.5, 0xffffff, 0.5, 1);
        // launch lines under the feet
        const n = Math.ceil((big ? 6 : 3) * qf);
        for (let k = 0; k < n; k++) {
          this._pillar(x + (k - (n - 1) / 2) * 0.28, 0.1, 0.9 + rnd() * 0.6, 0.07, 0.3, big ? 0xffe27a : L.ground, 0.7);
        }
        if (big) this._ring(x, 0.9, 0.2, false, 0.3, 2.2, 0.35, 0xffe27a, 0.6);
        break;
      }

      case 'land':
        this._ring(x, 0.05, 0, true, 0.35, boat ? 3.2 : 2.1, boat ? 0.7 : 0.38, boat ? L.ground : L.ground2, 0.7, 1);
        if (boat) {
          this._ring(x, 0.05, 0, true, 0.2, 2.0, 0.55, 0xffffff, 0.5, 1);
          for (let k = 0; k < 6 * qf; k++) this._sparkle(x, 0.3, 0, 3.2, 0.5, 0xe8fcff, 0.22, 9, 1);
        } else {
          this._glow(x, 0.25, 0.3, 0.2, 1.1, 0.3, L.ground, 0.35);
        }
        break;

      case 'lane': {
        const dir = d?.dir ?? 1;
        // carve / wake streaks left behind on the old line
        const n = boat ? 3 : 2;
        for (let k = 0; k < n; k++) {
          this._zstreak(x - dir * (0.45 + k * 0.1), 0.06, 0.6 + k * 0.5, 2.2 + k * 0.6, boat ? 0.2 : 0.14, 0.45, boat ? L.ground : L.ground2, 0.6 - k * 0.15);
        }
        if (boat) this._ring(x - dir * 0.4, 0.05, 0.3, true, 0.3, 1.5, 0.5, 0xffffff, 0.4, 1);
        break;
      }

      case 'slide':
        for (const s of [-1, 1]) this._zstreak(x + s * 0.55, 0.07, 0.4, 3.2, 0.2, 0.5, L.ground, 0.55);
        this._glow(x, 0.3, 0.3, 0.3, 1.2, 0.3, L.ground, 0.3);
        break;

      case 'edge':
        for (let k = 0; k < 3; k++) this._sparkle(x + (x < 0 ? -0.5 : 0.5), y + 0.5, 0.2, 3, 0.3, 0xffffff, 0.2, 4, 1);
        break;

      case 'pickup': {
        const c = POWER_COLORS[d?.type] ?? 0xffffff;
        this._pillar(x, 0.2, 7, 1.7, 0.7, c, 0.6);
        this._pillar(x, 0.2, 5, 0.8, 0.5, 0xffffff, 0.7);
        this._ring(x, 0.05, 0, true, 0.4, 3.0, 0.55, c, 0.8);
        this._ring(x, 0.9, 0.2, false, 0.3, 2.0, 0.4, 0xffffff, 0.6);
        for (let k = 0; k < 10 * qf; k++) {
          const a = this.A.emit(EV_LO, EV_HI, STAR, BILLBOARD, x + (rnd() - 0.5) * 1.2, 0.3, 0.2 + (rnd() - 0.5) * 0.6, 0, 3 + rnd() * 3, 0, 0.26, 0.26, 0.05, 0.05, 0.7 + rnd() * 0.3, k & 1 ? c : 0xffffff, 1, -1, 0, 0, 0, 0.02);
          void a;
        }
        break;
      }

      case 'powerEnd': {
        const c = POWER_COLORS[d?.type] ?? 0xffffff;
        this._ring(x, y + 1.0, 0.3, false, 1.8, 0.2, 0.35, c, 0.5);
        break;
      }

      case 'hit': {
        const r = d?.result;
        if (r === 'shield') {
          this._ring(x, y + 1.0, 0.3, false, 0.4, 3.2, 0.4, 0x6dffa0, 0.85);
          this._flash(x, y + 1.0, 0.3, 0.4, 2.0, 0.28, 0xc9ffd9, 0.9);
          // shards of the broken bubble
          for (let k = 0; k < 12; k++) this._ray(x, y + 1.0, 0.3, (k / 12) * 6.2832 + rnd() * 0.3, 8 + rnd() * 3, 0.55, 0.09, 0.45, k & 1 ? 0xc9ffd9 : 0x6dffa0, 0.9);
        } else {
          // impact: big flash, rays and sparks (the bear's roar is on the character, not here)
          this._flash(x, y + 1.0, 0.5, 0.5, 2.8, 0.3, 0xffffff, 1);
          this._glow(x, y + 1.0, 0.4, 0.5, 3.0, 0.35, r === 'caught' ? 0xff7a5a : 0xffd0a0, 0.7);
          for (let k = 0; k < 10; k++) this._ray(x, y + 1.0, 0.5, (k / 10) * 6.2832 + rnd() * 0.4, 9 + rnd() * 4, 1.5, 0.12, 0.32, 0xfff2cf, 0.9);
          this._ring(x, 0.06, 0, true, 0.5, 3.4, 0.45, 0xffffff, 0.7, 1);
          for (let k = 0; k < 14 * qf; k++) this._sparkle(x, y + 0.9, 0.4, 7, 0.8, k & 1 ? 0xfff2cf : 0xff9d8a, 0.2 + rnd() * 0.12, 14);
        }
        break;
      }

      case 'escape':
        this._ring(x, y + 1.0, 0.3, false, 0.3, 2.4, 0.45, 0xffffff, 0.5);
        for (let k = 0; k < 8 * qf; k++) this._sparkle(x, y + 1.2, 0.3, 4, 0.7, 0xffe27a, 0.2, 4);
        break;

      case 'revive':
        this._pillar(x, 0.2, 8, 2.0, 0.9, 0xffe27a, 0.6);
        this._ring(x, 0.05, 0, true, 0.4, 3.6, 0.7, 0xffe27a, 0.8);
        this._flash(x, y + 1.0, 0.4, 0.4, 2.4, 0.4, 0xffffff, 0.9);
        break;

      case 'level': {
        const c = L.ground2;
        this._ring(x, y + 1.2, 0.5, false, 0.6, 9, 0.9, 0xffffff, 0.55);
        this._ring(x, y + 1.2, 0.5, false, 0.4, 6, 0.7, c, 0.7);
        this._ring(x, 0.05, 0, true, 0.6, 7, 0.9, c, 0.7, 1);
        this._flash(x, y + 1.3, 0.5, 0.8, 4, 0.5, 0xffffff, 0.8);
        this._pillar(x, 0.3, 10, 3, 1.0, c, 0.5);
        for (let k = 0; k < 18; k++) this._ray(x, y + 1.2, 0.5, (k / 18) * 6.2832, 13 + rnd() * 6, 2.4, 0.14, 0.7, k & 1 ? 0xffffff : c, 0.85);
        for (let k = 0; k < 14 * qf; k++) this._sparkle(x, y + 1.2, 0.5, 9, 1.1, LEVEL_SPARKS[k & 3], 0.28, 3);
        break;
      }

      default:
        break;
    }
  }

  // ---- per frame ------------------------------------------------------------------------------

  update(dt, ctx) {
    const p = ctx.player;
    if (p) {
      this.lastX = p.x;
      this.lastY = p.y;
    }
    this.speed = ctx.speed || 0;
    this.speedK = ctx.speedK || 0;
    const live = dt > 0 && (ctx.state === 'playing' || ctx.state === 'menu');
    if (live && this.q < 2) {
      if (ctx.state === 'playing') this._windLines(dt);
      this._ambient(dt);
    }
    this.A.update(dt, this.speed);
    this.N.update(dt, this.speed);
  }

  /** Wind streaks outside the lanes that grow with the speed (they never cross the track). */
  _windLines(dt) {
    const k = this.speedK;
    if (k < 0.12) return;
    this.speedAcc += dt * (4 + k * 34) * (this.mobile ? 0.55 : 1) * this.qf;
    const camX = this.camera.position.x;
    const col = this.look.wind;
    while (this.speedAcc >= 1) {
      this.speedAcc -= 1;
      const side = rnd() < 0.5 ? -1 : 1;
      const x = camX + side * (4.3 + rnd() * 5.5);
      const y = 0.3 + rnd() * rnd() * 7;
      const len = 3 + rnd() * 5 + k * 4;
      const w = 0.045 + rnd() * 0.05;
      this.A.emit(SPEED_LO, SPEED_HI, STREAK, ZSTREAK, x, y, -34 + rnd() * 26, 0, 0, this.speed * 0.5, w, len, w * 0.6, len * 1.1, 0.55 + rnd() * 0.3, col, 0.14 + k * 0.28, 0, 1, 0, 0, 0.15);
    }
  }

  /** Slow ambient life near the camera: leaves, dust motes, fireflies. */
  _ambient(dt) {
    const kind = this.look.ambient;
    if (!kind) return;
    const camX = this.camera.position.x;
    const rate = (kind === 'leaf' ? 3.2 : kind === 'mote' ? 7 : 3.5) * (this.mobile ? 0.6 : 1) * this.qf;
    this.ambAcc += dt * rate;
    while (this.ambAcc >= 1) {
      this.ambAcc -= 1;
      // a wide band to the sides and some above, near the camera; the lanes' height band stays clear
      const side = rnd() < 0.5 ? -1 : 1;
      const x = camX + side * (1.5 + rnd() * 7);
      const z = -2 - rnd() * 20;
      if (kind === 'leaf') {
        const c = LEAF_COLORS[(rnd() * LEAF_COLORS.length) | 0];
        this.N.emit(0, LEAF_CAP, LEAF, BILLBOARD, x, 4.5 + rnd() * 3, z, side * -(0.3 + rnd()), -0.9 - rnd() * 0.5, 0, 0.2, 0.28, 0.2, 0.28, 5.5, c, 0.95, 0, 1, rnd() * 6, (rnd() - 0.5) * 5, 0.1);
      } else if (kind === 'mote') {
        this.A.emit(AMB_LO, AMB_HI, GLOW, BILLBOARD, x, 1 + rnd() * 5, z, (rnd() - 0.5) * 0.3, 0.1 + rnd() * 0.15, 0, 0.14, 0.14, 0.14, 0.14, 4.5, 0xfff0c8, 0.55, 0, 1, 0, 0, 0.25, 2 + rnd() * 2);
      } else {
        // fireflies and pollen over the lake: warm green-yellow, they blink
        this.A.emit(AMB_LO, AMB_HI, GLOW, BILLBOARD, x, 0.5 + rnd() * 3, z, (rnd() - 0.5) * 0.8, (rnd() - 0.3) * 0.4, 0, 0.2, 0.2, 0.2, 0.2, 5, rnd() < 0.6 ? 0xd8ff7a : 0xfff0a0, 0.8, 0, 1, 0, 0, 0.2, 3 + rnd() * 4);
      }
    }
  }
}
