import { CFG } from '../config.js';

/**
 * Bear state machine (pure logic).
 *
 *   NONE ──first hit──▶ CHASING (5 s) ──survive──▶ LEAVING (short "falls behind" animation) ──▶ NONE
 *                          │
 *                          └──hit again──▶ CAUGHT (game over)
 *
 * After the first hit there is a short grace period (invulnerability) so the same cluster of
 * obstacles cannot hit the player twice in a row. A hit while the bear is LEAVING counts as a new
 * first hit (the bear is already gone as far as the rules are concerned).
 * Time only advances through update(dt), so pausing the game pauses the bear timer too.
 */
export const BearPhase = Object.freeze({ NONE: 'none', CHASING: 'chasing', LEAVING: 'leaving', CAUGHT: 'caught' });

export class BearState {
  constructor(cfg = CFG.bear) {
    this.cfg = cfg;
    this.reset();
  }

  reset() {
    this.phase = BearPhase.NONE;
    this.elapsed = 0; // seconds since the chase started
    this.leaveT = 0; // seconds since the bear started leaving
    this.graceLeft = 0;
  }

  /** Seconds of chase left (0 when not chasing). */
  get remaining() {
    return this.phase === BearPhase.CHASING ? Math.max(0, this.cfg.chaseTime - this.elapsed) : 0;
  }
  /** 1 -> 0 while chasing, for the HUD bar. */
  get remainingFraction() {
    return this.remaining / this.cfg.chaseTime;
  }
  /** 0 -> 1 during the leave animation. */
  get leaveProgress() {
    return this.phase === BearPhase.LEAVING ? Math.min(1, this.leaveT / this.cfg.leaveTime) : 0;
  }
  get invulnerable() {
    return this.graceLeft > 0;
  }
  get visible() {
    return this.phase !== BearPhase.NONE;
  }

  /**
   * The player hit an obstacle.
   * @returns 'chase-start' | 'caught' | 'ignored'
   */
  hit() {
    if (this.phase === BearPhase.CAUGHT || this.invulnerable) return 'ignored';
    if (this.phase === BearPhase.CHASING) {
      this.phase = BearPhase.CAUGHT;
      return 'caught';
    }
    // NONE or LEAVING -> a fresh chase begins
    this.phase = BearPhase.CHASING;
    this.elapsed = 0;
    this.leaveT = 0;
    this.graceLeft = this.cfg.grace;
    return 'chase-start';
  }

  /** @returns 'escaped' on the step the 5 seconds run out, 'gone' when the leave animation ends, else null */
  update(dt) {
    if (this.graceLeft > 0) this.graceLeft = Math.max(0, this.graceLeft - dt);
    if (this.phase === BearPhase.CHASING) {
      this.elapsed += dt;
      if (this.elapsed >= this.cfg.chaseTime) {
        this.phase = BearPhase.LEAVING;
        this.leaveT = 0;
        return 'escaped';
      }
    } else if (this.phase === BearPhase.LEAVING) {
      this.leaveT += dt;
      if (this.leaveT >= this.cfg.leaveTime) {
        this.phase = BearPhase.NONE;
        return 'gone';
      }
    }
    return null;
  }
}
