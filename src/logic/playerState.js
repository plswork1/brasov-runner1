import { CFG } from '../config.js';

/**
 * Player physics/state (pure logic, no 3D). The player stays at distance `s` along the track;
 * the game moves the world past him. Handles lane changes, jump, slide, and an input buffer so
 * presses slightly before landing are not lost.
 */
export class PlayerState {
  constructor() {
    this.reset();
  }

  reset() {
    this.lane = 0; // -1, 0, 1
    this.x = 0; // smoothed sideways position
    this.laneVel = 0; // sideways velocity (used for the lean animation)
    this.y = 0; // feet height
    this.vy = 0;
    this.grounded = true;
    this.sliding = false;
    this.slideT = 0;
    this.slideAfterLand = false; // fast-fall requested, slide as soon as we touch down
    this.jumpBuffer = 0; // seconds left in which a pending jump press is still valid
    this.superJump = false; // super board power-up: much higher jumps
    this.flying = false; // jetpack power-up: hovering at flight height
    this.events = []; // 'jump' | 'land' | 'slide' | 'lane' | 'edge' (consumed by the game for sfx/particles)
  }

  /** dir: -1 left, +1 right */
  moveLane(dir) {
    const target = Math.max(-1, Math.min(1, this.lane + dir));
    if (target === this.lane) {
      this.events.push('edge');
      return false;
    }
    this.lane = target;
    // Kick: the spring starts with a speed toward the new lane, so the reaction to a swipe is immediate
    // (a pure spring starts from rest and feels late). A change of mind reverses at once.
    const kick = dir * CFG.lane.kick * CFG.laneW;
    this.laneVel = dir > 0 ? Math.max(this.laneVel, kick) : Math.min(this.laneVel, kick);
    this.events.push('lane');
    return true;
  }

  jump() {
    if (this.flying) return;
    if (this.grounded) {
      this._startJump();
    } else {
      this.jumpBuffer = CFG.jump.buffer; // remember it for the landing
    }
  }

  slide() {
    if (this.flying) return;
    if (this.grounded) {
      this._startSlide();
    } else {
      // Pressing down in the air = drop quickly, then slide on landing (like Subway Surfers)
      this.vy = Math.min(this.vy, -CFG.jump.fastFall);
      this.slideAfterLand = true;
    }
  }

  _startJump() {
    this.vy = this.superJump ? CFG.power.boardJumpV0 : CFG.jump.v0;
    this.grounded = false;
    this.sliding = false; // jumping cancels a slide
    this.slideT = 0;
    this.slideAfterLand = false;
    this.events.push(this.superJump ? 'superjump' : 'jump');
  }

  /** Jetpack on: climb to flight height and stay there (no jumping/sliding while flying). */
  startFlight() {
    this.flying = true;
    this.grounded = false;
    this.sliding = false;
    this.slideT = 0;
    this.slideAfterLand = false;
    this.jumpBuffer = 0;
  }

  /** Jetpack off: fall back to the snow with normal gravity. */
  endFlight() {
    if (!this.flying) return;
    this.flying = false;
    this.vy = Math.min(this.vy, 0);
  }

  /** v2: back on the track after a revive: on the ground, upright, in the SAME lane. */
  revive() {
    this.y = 0;
    this.vy = 0;
    this.grounded = true;
    this.sliding = false;
    this.slideT = 0;
    this.slideAfterLand = false;
    this.jumpBuffer = 0;
    this.flying = false;
    this.events.length = 0;
  }

  _startSlide() {
    this.sliding = true;
    this.slideT = CFG.slide.duration;
    this.events.push('slide');
  }

  update(dt) {
    // Sideways: critically smooth approach to the lane center
    this._stepLane(dt);

    // Vertical
    if (this.flying) {
      const prevY = this.y;
      this.y += (CFG.power.jetHeight - this.y) * (1 - Math.exp(-CFG.power.jetRise * dt));
      this.vy = dt > 0 ? (this.y - prevY) / dt : 0;
    } else if (!this.grounded) {
      this.vy -= CFG.jump.gravity * dt;
      this.y += this.vy * dt;
      if (this.y <= 0) {
        this.y = 0;
        this.vy = 0;
        this.grounded = true;
        this.events.push('land');
        if (this.jumpBuffer > 0) {
          this.jumpBuffer = 0;
          this._startJump(); // buffered jump fires right on landing
        } else if (this.slideAfterLand) {
          this.slideAfterLand = false;
          this._startSlide();
        }
      }
    }
    if (this.jumpBuffer > 0) this.jumpBuffer = Math.max(0, this.jumpBuffer - dt);

    // Slide timer
    if (this.sliding) {
      this.slideT -= dt;
      if (this.slideT <= 0) {
        this.sliding = false;
        this.slideT = 0;
      }
    }
  }

  /** Spring toward the lane center, integrated in fixed sub-steps so any frame time behaves the same. */
  _stepLane(dt) {
    const L = CFG.lane;
    const targetX = this.lane * CFG.laneW;
    const limit = CFG.laneW + L.overLimit; // never leaves the track, even when overshooting
    let left = dt;
    while (left > 1e-9) {
      const h = Math.min(left, 1 / 240);
      left -= h;
      const acc = L.omega * L.omega * (targetX - this.x) - 2 * L.zeta * L.omega * this.laneVel;
      this.laneVel += acc * h;
      this.x += this.laneVel * h;
    }
    if (this.x > limit || this.x < -limit) {
      this.x = Math.max(-limit, Math.min(limit, this.x));
      this.laneVel = 0;
    }
    // Settled: snap so the boy rests exactly on the lane center
    if (Math.abs(targetX - this.x) < 0.002 && Math.abs(this.laneVel) < 0.05) {
      this.x = targetX;
      this.laneVel = 0;
    }
  }

  /** Hitbox used by the collision system. */
  box() {
    const p = CFG.player;
    return {
      x: this.x,
      feetY: this.y,
      height: this.sliding ? p.slideHeight : p.height,
      halfW: p.halfW,
      halfDepth: p.halfDepth,
    };
  }

  /** Returns and clears the queued events. */
  takeEvents() {
    const e = this.events;
    this.events = [];
    return e;
  }
}
