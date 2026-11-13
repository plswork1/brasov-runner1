import { CFG, OBSTACLES, OBSTACLE_HALF_W } from '../config.js';

/**
 * Swept overlap along the track. The player moved from `prevS` to `curS` during this step; the
 * obstacle sits at `s` with half-depth `halfDepth`. Testing the whole swept interval (not just the
 * end position) means an obstacle can never be skipped, even at high speed or after a long frame.
 */
export function sweptOverlap(prevS, curS, playerHalfDepth, obsS, obsHalfDepth) {
  const lo = Math.min(prevS, curS) - playerHalfDepth;
  const hi = Math.max(prevS, curS) + playerHalfDepth;
  return hi >= obsS - obsHalfDepth && lo <= obsS + obsHalfDepth;
}

/** Horizontal extent of an obstacle that covers the given lane indices (-1, 0, 1). */
export function obstacleXRange(lanes) {
  const xs = lanes.map((l) => l * CFG.laneW);
  return [Math.min(...xs) - OBSTACLE_HALF_W, Math.max(...xs) + OBSTACLE_HALF_W];
}

/**
 * Full player-vs-obstacle test.
 * player: {x, feetY, height, halfW, halfDepth}  obs: {type, lanes, s, rowS?}
 *
 * Moving obstacles (they have a `rowS`) are tested in the player's frame: the gap between the
 * player at d and the obstacle at rowS + k (rowS - d) is (1 + k) (rowS - d), so they overlap when
 * |rowS - d| < (halfDepths) / (1 + k). That is the same swept test, around rowS, scaled by 1 / (1 + k).
 */
export function playerHitsObstacle(prevS, curS, player, obs) {
  const def = OBSTACLES[obs.type];
  const scale = def.move ? 1 / (1 + def.move.k) : 1;
  const s = def.move ? obs.rowS : obs.s;
  if (!sweptOverlap(prevS, curS, player.halfDepth * scale, s, (def.depth / 2) * scale)) return false;
  const [x0, x1] = obstacleXRange(obs.lanes);
  if (player.x + player.halfW <= x0 || player.x - player.halfW >= x1) return false;
  const f = CFG.hitForgive;
  // Vertical overlap, with a little forgiveness at the feet/head so near-misses are not punished.
  const feetBelowTop = player.feetY + f < def.top;
  const headAboveBottom = player.feetY + player.height - f > def.bottom;
  return feetBelowTop && headAboveBottom;
}

/** Coin pickup test (swept along the track so fast frames cannot skip coins). */
export function playerCollectsCoin(prevS, curS, player, coin) {
  if (!sweptOverlap(prevS, curS, player.halfDepth + 0.25, coin.s, 0.3)) return false;
  if (Math.abs(coin.lane * CFG.laneW - player.x) > CFG.laneW * 0.42 + player.halfW) return false;
  return coin.y > player.feetY - 0.35 && coin.y < player.feetY + player.height + 0.35;
}
