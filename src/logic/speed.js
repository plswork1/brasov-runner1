import { CFG } from '../config.js';

/** Natural speed curve: fast gains at first, flattening out toward the maximum. */
export function speedAt(runTime, s = CFG.speed) {
  const t = Math.max(0, runTime);
  return s.base + (s.max - s.base) * (1 - Math.exp(-t / s.k));
}

/** 0..1 smooth ramp used at the very start of a run so the board accelerates instead of jumping to full speed. */
export function launchFactor(runTime, s = CFG.speed) {
  const x = Math.min(1, Math.max(0, runTime / s.launchTime));
  return x * x * (3 - 2 * x); // smoothstep
}

/** Score = distance traveled + bonus per coin. */
export function computeScore(distance, coins, sc = CFG.score) {
  return Math.floor(distance * sc.perUnit + coins * sc.perCoin);
}
