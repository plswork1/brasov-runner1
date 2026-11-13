import { CFG } from '../config.js';
import { mulberry32 } from './rng.js';

/**
 * Power-ups (pure logic, no 3D):
 *  - magnet  (15 s): coins in ALL lanes in front of the player fly to him
 *  - board   (10 s): super snowboard, jumps are high enough to clear every obstacle
 *  - jetpack (10 s): flies above everything, then lands with a short protection
 *  - shield  (12 s): "Scutul Bastionului". Absorbs ONE hit: the obstacle is smashed, the bear does
 *                    not start chasing (or, if it already chases, does not catch the player). The
 *                    shield is then used up and a short grace period follows.
 *  - slowmo  (6 s):  "Ceasul din Piața Sfatului". The whole world runs in slow motion (time scale
 *                    CFG.power.slowScale): the player, the obstacles, the other power-ups. Only two
 *                    things keep running in real time: the bear's 5 s chase timer and the clock itself.
 *
 * Time: `update(dt, realDt)` gets the (possibly slowed) game time and the real time of the step.
 * Every timer runs in game time except `slowmo`, which runs in real time. Because the jetpack timer
 * is in game time, a flight always covers the same DISTANCE, so the landing zone the generator keeps
 * free stays correct even when the clock is picked up in mid-air.
 */
export const POWER_TYPES = Object.freeze(['magnet', 'board', 'jetpack', 'shield', 'slowmo']);
const REAL_TIME = new Set(['slowmo']);

/** Active power-ups and their remaining time. Picking the same one again refreshes it. */
export class PowerUps {
  constructor() {
    this.reset();
  }

  reset() {
    this.remaining = Object.fromEntries(POWER_TYPES.map((t) => [t, 0]));
    this.landGrace = 0;
    this.shieldGrace = 0;
    this.timeScale = 1; // eased toward slowScale while the clock is active
  }

  activate(type) {
    if (!POWER_TYPES.includes(type)) throw new Error(`unknown power-up ${type}`);
    this.remaining[type] = CFG.power[type].duration;
  }

  active(type) {
    return this.remaining[type] > 0;
  }

  /** True during the last seconds of a power-up (the character's item blinks). */
  ending(type) {
    const r = this.remaining[type];
    return r > 0 && r < CFG.power.warnTime;
  }

  /**
   * The player hit something while the shield was up: the shield takes the hit.
   * @returns true if the hit was absorbed (the shield is now gone)
   */
  absorbHit() {
    if (!this.active('shield')) return false;
    this.remaining.shield = 0;
    this.shieldGrace = CFG.power.shieldGrace;
    return true;
  }

  /**
   * Advance the world time scale by a REAL time step and return it. It eases toward
   * CFG.power.slowScale while the clock is active and back to 1 after.
   */
  stepTimeScale(realDt) {
    const target = this.active('slowmo') ? CFG.power.slowScale : 1;
    this.timeScale += (target - this.timeScale) * (1 - Math.exp(-CFG.power.slowEase * realDt));
    if (Math.abs(target - this.timeScale) < 0.002) this.timeScale = target;
    return this.timeScale;
  }

  /**
   * Advance the timers. Returns the list of power-ups that just ran out.
   * @param dt     game time of the step (already slowed by the clock)
   * @param realDt real time of the step (default: the same)
   */
  update(dt, realDt = dt) {
    const ended = [];
    for (const t of POWER_TYPES) {
      if (this.remaining[t] > 0) {
        this.remaining[t] = Math.max(0, this.remaining[t] - (REAL_TIME.has(t) ? realDt : dt));
        if (this.remaining[t] === 0) ended.push(t);
      }
    }
    if (this.landGrace > 0) this.landGrace = Math.max(0, this.landGrace - dt);
    if (this.shieldGrace > 0) this.shieldGrace = Math.max(0, this.shieldGrace - dt);
    return ended;
  }
}

/**
 * Decides WHEN each power-up appears. Every type has its own rhythm (first appearance + interval,
 * both with a little randomness) and two power-ups are never closer than `minSeparation`.
 * With the default numbers: first one ~30 s into the run, then one about every 25 s on average.
 */
export class PowerUpSchedule {
  constructor(seed = (Math.random() * 2 ** 32) >>> 0) {
    this.rng = mulberry32(seed);
    this.due = {};
    for (const t of POWER_TYPES) this.due[t] = CFG.power[t].first + this._jitter();
    this.lastSpawn = -Infinity;
  }

  _jitter() {
    return (this.rng() * 2 - 1) * CFG.power.jitter;
  }

  /**
   * @param runTime seconds since the run started
   * @param blocked true while nothing should appear (e.g. while flying with the jetpack)
   * @returns the type to spawn now, or null
   */
  poll(runTime, blocked = false) {
    if (blocked || runTime - this.lastSpawn < CFG.power.minSeparation) return null;
    let best = null;
    for (const t of POWER_TYPES) {
      if (this.due[t] <= runTime && (best === null || this.due[t] < this.due[best])) best = t;
    }
    if (best === null) return null;
    this.due[best] = runTime + CFG.power[best].every + this._jitter();
    this.lastSpawn = runTime;
    return best;
  }
}

/**
 * Coin trail in the sky while flying with the jetpack: a line of coins at flight height that switches
 * to a neighbouring lane every few coins, so the player steers to collect it.
 */
export class SkyTrail {
  constructor(seed = 1) {
    this.rng = mulberry32(seed);
    this.active = false;
  }

  start(fromS, lane) {
    this.active = true;
    this.nextS = fromS;
    this.lane = lane;
    this.count = 0;
  }

  stop() {
    this.active = false;
  }

  /** Emit coins up to `untilS` (exclusive). Returns [{lane, s, y}]. */
  emit(untilS, y) {
    const out = [];
    if (!this.active) return out;
    while (this.nextS < untilS) {
      out.push({ lane: this.lane, s: this.nextS, y });
      this.nextS += CFG.coinSpacing;
      this.count++;
      if (this.count % 12 === 0) {
        // move one lane left or right (never off the slope), leaving a short gap to steer
        const options = [this.lane - 1, this.lane + 1].filter((l) => l >= -1 && l <= 1);
        this.lane = options[Math.floor(this.rng() * options.length)];
        this.nextS += CFG.coinSpacing * 2;
      }
    }
    return out;
  }
}

/**
 * When the rare premium item (a crown) appears on the track. Same idea as PowerUpSchedule, with its
 * own slow rhythm (CFG.economy.crownRun): about one crown every 5 minutes of play.
 */
export class CrownSchedule {
  constructor(seed = (Math.random() * 2 ** 32) >>> 0, cfg = CFG.economy.crownRun) {
    this.rng = mulberry32(seed);
    this.cfg = cfg;
    this.due = cfg.first + this._jitter();
  }

  _jitter() {
    return (this.rng() * 2 - 1) * this.cfg.jitter;
  }

  /** @returns true when a crown should be placed now (`blocked`: e.g. flying, another item pending) */
  poll(runTime, blocked = false) {
    if (blocked || runTime < this.due) return false;
    this.due = runTime + this.cfg.every + this._jitter();
    return true;
  }
}
