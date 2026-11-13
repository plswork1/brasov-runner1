import * as THREE from 'three';
import { CFG } from '../config.js';

/**
 * The chase camera of a run (the wardrobe close-up camera stays in game.js).
 *
 * Interface used by game.js (keep it):
 *   rig.reset()                 new run / back to the menu
 *   rig.addShake(amount)        screen shake (0.25 small ... 1.1 big); the bigger of old and new wins
 *   rig.on(event, data)         one-shot impulses, see EVENTS in view/fx.js (jump, land, lane, hit ...)
 *   rig.update(dt, ctx)         every rendered frame. ctx = {
 *       player,                 PlayerState (x, y, vy, laneVel, grounded, sliding, flying)
 *       speed,                  what the eye sees, units/s (already slowed by the clock power-up)
 *       speedK,                 0 at base speed ... 1 at top speed
 *       baseFov,                vertical FOV that keeps the three lanes on screen (depends on aspect)
 *       warp,                   0..1 portal stretch
 *       chase,                  true while a RIDING bear is visible (camera rises to show its vehicle)
 *       lifted,                 true while flying or landing from the jetpack
 *   }
 */
/** Damped spring on two plain numbers (no allocation). Sub-stepped so a long frame cannot blow it up. */
class Spring {
  constructor(omega, zeta) {
    this.w = omega;
    this.z = zeta;
    this.x = 0;
    this.v = 0;
  }

  step(target, dt) {
    let left = Math.min(dt, 0.1);
    while (left > 1e-9) {
      const h = Math.min(left, 1 / 90);
      left -= h;
      this.v += (this.w * this.w * (target - this.x) - 2 * this.z * this.w * this.v) * h;
      this.x += this.v * h;
    }
    return this.x;
  }

  reset() {
    this.x = 0;
    this.v = 0;
  }
}

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// "Reduced motion": the camera keeps following the boy, but rolls, kicks, punches and shake nearly vanish.
const REDUCED_GAIN = 0.15;

export class CameraRig {
  constructor(camera) {
    this.camera = camera;
    // Springs: follow (x), banking roll, vertical dip/lift impulses, pull-back on a hit, zoom punch, speed FOV
    this.sx = new Spring(8, 0.9);
    this.roll = new Spring(9, 0.85); // nearly critically damped: a smooth bank, no wobble (the wobble felt abrupt)
    this.dip = new Spring(14, 0.55);
    this.back = new Spring(10, 0.6);
    this.punch = new Spring(16, 0.55);
    this.fovS = new Spring(5, 1);
    this.sway = new Spring(12, 0.6); // sideways kick on a hit
    this.reduced = false;
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reduced = mq.matches;
      mq.addEventListener?.('change', (e) => {
        this.reduced = e.matches;
      });
    } catch {
      /* no window (unit tests) or no matchMedia */
    }
    this.reset();
  }

  reset() {
    this.camX = 0;
    this.camLift = 0;
    this.camChase = 0;
    this.shake = 0; // trauma, 0..~1.1 (addShake)
    this.noiseT = 0;
    for (const s of [this.sx, this.roll, this.dip, this.back, this.punch, this.fovS, this.sway]) s.reset();
  }

  addShake(amount) {
    this.shake = Math.max(this.shake, amount);
  }

  /** One-shot impulses (velocity kicks into the springs: they ring and settle by themselves). */
  on(event, data) {
    const g = this.reduced ? REDUCED_GAIN : 1;
    switch (event) {
      case 'start':
      case 'revive':
        this.reset();
        break;
      case 'jump':
      case 'superjump':
        this.dip.v += 2.2 * g; // lift off
        break;
      case 'land':
        this.dip.v -= 4.5 * g; // the camera dips, then bounces back
        break;
      case 'slide':
        this.dip.v -= 1.2 * g;
        break;
      case 'nearMiss':
        this.punch.v -= 22 * g; // narrower FOV for a moment = a tiny zoom in
        break;
      case 'hit':
        this.back.v += (data?.result === 'shield' ? 3 : 7) * g;
        this.dip.v -= 3 * g;
        this.sway.v += (data && data.x < 0 ? 1 : -1) * 4 * g; // knocked toward the track center
        this.roll.v += (data && data.x < 0 ? -1 : 1) * 0.5 * g;
        break;
      case 'level':
        this.punch.v -= 18 * g;
        break;
      default:
    }
  }

  update(dt, ctx) {
    const cam = this.camera;
    const p = ctx.player;
    const g = this.reduced ? REDUCED_GAIN : 1;
    const portrait = cam.aspect < 0.75;
    const baseY = portrait ? 6.5 : 5.6;
    const baseZ = portrait ? 9.6 : 8.6;
    const vx = clamp(p.laneVel || 0, -14, 14);

    // Follow with a spring, and look a little into the lane change (the camera leads the boy)
    const camX = this.sx.step(p.x * 0.55 + vx * 0.045 * g, dt);
    this.camX = camX;
    // Banking: lean into the turn by ~2.5 degrees at most, with a small wobble after it
    const roll = this.roll.step(clamp(vx / 12, -1, 1) * 0.03 * g, dt);

    // Trauma shake: smooth noise (sum of sines), amplitude ~ trauma^2
    this.noiseT += dt;
    const T = this.noiseT;
    const tr = Math.min(1, this.shake);
    const amp = 0.4 * tr * tr * g;
    const sx = amp * (Math.sin(T * 31.3) + Math.sin(T * 47.1 + 1.7)) * 0.5;
    const sy = amp * (Math.sin(T * 36.9 + 0.6) + Math.sin(T * 53.3 + 2.9)) * 0.5;
    const sr = amp * 0.12 * Math.sin(T * 27.7 + 4.1);

    // The camera rises with the jetpack (and a little with the super-board jumps)
    const liftTarget = ctx.lifted ? p.y : Math.max(0, p.y - 2.2) * 0.6;
    this.camLift += (liftTarget - this.camLift) * (1 - Math.exp(-4 * dt));
    // Rises a touch with every jump (anticipating the apex) and dips on landing, through the dip spring
    const dip = this.dip.step(Math.min(p.y, 2.2) * 0.07 * g, dt);
    // A bear on a unicycle / water unicycle is the show: the camera rises and pulls back a little
    // while it chases, so the whole vehicle is in view below the boy.
    this.camChase += ((ctx.chase ? 1 : 0) - this.camChase) * (1 - Math.exp(-3 * dt));
    const cc = this.camChase;
    const back = this.back.step(0, dt);
    const sway = this.sway.step(0, dt);

    cam.position.set(
      camX + sx + sway * 0.12,
      baseY + this.camLift * 0.62 + sy + cc * 2.0 + dip,
      baseZ + cc * 1.0 + back * 0.12 - dip * 0.4
    );
    cam.lookAt(camX * 0.7 + vx * 0.03 * g, 0.9 + this.camLift * 0.5 + dip * 0.3, -9 + cc * 3);
    cam.rotateZ(-roll - sr);

    // Shake decays (smoothly, with a short linear tail so it never lingers)
    this.shake = Math.max(0, this.shake * Math.exp(-3.6 * dt) - 0.25 * dt);
    if (this.shake < 0.002) this.shake = 0;

    // Speed FOV (smoothed) + near-miss zoom punch + the portal "warp"
    const fovSpeed = this.fovS.step(ctx.speedK * (this.reduced ? 1.5 : 4.5), dt);
    const fov = ctx.baseFov + fovSpeed + this.punch.step(0, dt) + (ctx.warp || 0) * 16;
    if (Math.abs(fov - cam.fov) > 0.02) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  }
}

export const speedK = (speed) => THREE.MathUtils.clamp((speed - CFG.speed.base) / (CFG.speed.max - CFG.speed.base), 0, 1);
