import { CFG, OBSTACLES } from '../config.js';
import { mulberry32 } from './rng.js';
import { speedAt } from './speed.js';
import { BIOMES } from './biomes.js';

/**
 * Obstacle + coin generator (pure logic, no 3D).
 *
 * The track is made of "rows". A row is one obstacle position along the track with a cell per lane:
 *   EMPTY - nothing
 *   JUMP  - low obstacle, the player must jump over it
 *   SLIDE - tree bough over a SIDE lane (never the middle one), the player must slide under it
 *   BLOCK - solid, the player must be in another lane
 *
 * GUARANTEE: every row has at least one lane that is not BLOCK, and between two consecutive rows
 * there is always enough time (gap) to reach such a lane (lane-change time + jump/slide recovery).
 * This is checked while generating with `advanceReach`, so the game can never produce an
 * impossible pattern. Row spacing grows with speed (a fixed *time* gap), so it stays fair as the
 * run gets faster.
 *
 * LEVELS: every obstacle gets its model from the current biome (BIOMES[this.biome]). When the game
 * asks for a transition, the next rows are left empty for a few seconds, a portal ("gate") is placed
 * in the middle of that empty stretch and the rows after it use the next biome.
 *
 * MOVING obstacles (snowball, cyclists...) come toward the player from up to `run` units beyond
 * their row and reach the row exactly when the player does. Their lane is kept empty in front of
 * the row for that whole stretch, so they never drive through another obstacle or a coin.
 */

export const CELL = Object.freeze({ EMPTY: 0, JUMP: 1, SLIDE: 2, BLOCK: 3 });
const { EMPTY, JUMP, SLIDE, BLOCK } = CELL;

const ACTION_OF = { [EMPTY]: 'none', [JUMP]: 'jump', [SLIDE]: 'slide' };

/**
 * Given the lanes the player can be in after the previous row (`reach`: Map laneIndex -> action
 * performed there), return the lanes reachable after the next row.
 * Lane indices here are 0..2 (left, middle, right).
 */
export function advanceReach(reach, cells, gapTime, gen = CFG.gen) {
  const next = new Map();
  for (let b = 0; b < 3; b++) {
    if (cells[b] === BLOCK) continue;
    const need = ACTION_OF[cells[b]];
    for (const [a, prevAct] of reach) {
      let cost = Math.abs(a - b) * gen.laneTime;
      if (need !== 'none' && prevAct !== 'none' && prevAct !== need) cost += gen.recover;
      if (cost <= gapTime + 1e-9) {
        next.set(b, need);
        break;
      }
    }
  }
  return next;
}

export function initialReach() {
  return new Map([
    [0, 'none'],
    [1, 'none'],
    [2, 'none'],
  ]);
}

// ---- Row templates -------------------------------------------------------------------------

function shuffle(rng, arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
const randLane = (rng) => Math.floor(rng() * 3);
const randSide = (rng) => (rng() < 0.5 ? 0 : 2); // left or right lane index

// Each template: weight(difficulty 0..1) and make(rng) -> {cells, wide?}
const TEMPLATES = [
  {
    name: 'singleBlock',
    weight: (d) => 3 - 1.6 * d,
    make: (rng) => {
      const c = [EMPTY, EMPTY, EMPTY];
      c[randLane(rng)] = BLOCK;
      return { cells: c };
    },
  },
  {
    name: 'singleJump',
    weight: () => 3,
    make: (rng) => {
      const c = [EMPTY, EMPTY, EMPTY];
      c[randLane(rng)] = JUMP;
      return { cells: c };
    },
  },
  {
    name: 'wideJump',
    weight: () => 2,
    make: () => ({ cells: [JUMP, JUMP, JUMP], wide: 'jump' }),
  },
  // ---- Slide rows: a pine bough over a SIDE lane (never the middle), always with an obstacle in
  // the middle lane. Either slide under the bough or dodge to the free side lane.
  {
    name: 'branchBlock', // bough on one side, solid obstacle in the middle, free lane on the other side
    weight: () => 2.4,
    make: (rng) => {
      const c = [EMPTY, BLOCK, EMPTY];
      c[randSide(rng)] = SLIDE;
      return { cells: c };
    },
  },
  {
    name: 'branchJump', // bough on one side, low log in the middle (jump it), free lane on the other side
    weight: (d) => 0.8 + 0.6 * d,
    make: (rng) => {
      const c = [EMPTY, JUMP, EMPTY];
      c[randSide(rng)] = SLIDE;
      return { cells: c };
    },
  },
  {
    name: 'branchTunnel', // boughs on both sides, solid obstacle in the middle: you must slide
    weight: (d) => 0.3 + 1.2 * d,
    make: () => ({ cells: [SLIDE, BLOCK, SLIDE] }),
  },
  {
    name: 'doubleBlock',
    weight: (d) => 1 + 3 * d,
    make: (rng) => {
      const c = [BLOCK, BLOCK, BLOCK];
      c[randLane(rng)] = EMPTY;
      return { cells: c };
    },
  },
  {
    name: 'blockJump',
    weight: (d) => 0.5 + 2 * d,
    make: (rng) => ({ cells: shuffle(rng, [BLOCK, JUMP, EMPTY]) }),
  },
  {
    name: 'blockJumpJump',
    weight: (d) => 0.2 + 1.6 * d,
    make: (rng) => ({ cells: shuffle(rng, [BLOCK, JUMP, JUMP]) }),
  },
];

function pickTemplate(rng, difficulty) {
  const weights = TEMPLATES.map((t) => Math.max(0.05, t.weight(difficulty)));
  let r = rng() * weights.reduce((a, b) => a + b, 0);
  for (let i = 0; i < TEMPLATES.length; i++) {
    r -= weights[i];
    if (r <= 0) return TEMPLATES[i];
  }
  return TEMPLATES[0];
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// ---- Generator -----------------------------------------------------------------------------

export class Generator {
  constructor(seed = (Math.random() * 2 ** 32) >>> 0, biome = 0) {
    this.seed = seed;
    this.rng = mulberry32(seed);
    this.last = { s: CFG.gen.firstRowS - 30, cells: [EMPTY, EMPTY, EMPTY] };
    this.reach = initialReach();
    this.rowCount = 0;
    this.pendingPower = null;
    this.biome = biome; // index into BIOMES, used for the obstacle models of new rows
    this.pendingTransition = null;
    this.zone = null; // {from, gateS, to, biome} empty stretch around the portal
    this.reserved = [-Infinity, -Infinity, -Infinity]; // per lane: kept empty up to this s (moving obstacles)
  }

  /** Ask for the change to biome `to`: empty track, a portal, then the new obstacles. */
  requestTransition(to) {
    this.pendingTransition = to;
  }

  /** Ask for a power-up item: it is placed between the next two rows, away from every obstacle. */
  requestPowerUp(type) {
    this.pendingPower = type;
  }

  /**
   * Generate everything up to `distance + ahead`.
   * @param distance current distance of the player along the track
   * @param speed    current speed (units/s)
   * @param runTime  seconds since the run started (drives difficulty and speed prediction)
   * @param opts     {clear: {from, to}} rows inside this range get no obstacles (jetpack landing zone)
   * @returns {{obstacles: object[], coins: object[], powerups: object[], rows: object[], transitions: object[]}} new entities
   */
  ensure(distance, speed, runTime, opts = {}) {
    const out = { obstacles: [], coins: [], powerups: [], rows: [], transitions: [] };
    this.clear = opts.clear || null;
    const horizon = distance + CFG.gen.ahead;
    let guard = 0;
    while (this._nextRowS(distance, speed, runTime).s < horizon && guard++ < 50) {
      const { s, gapTime } = this._nextRowS(distance, speed, runTime);
      this._makeRow(s, gapTime, runTime, out);
    }
    return out;
  }

  /** Where the next row goes. Spacing is a fixed *time* gap evaluated at the speed the player will have there. */
  _nextRowS(distance, speed, runTime) {
    const g = CFG.gen;
    if (this.rowCount === 0) {
      return { s: g.firstRowS, gapTime: 99 };
    }
    const diff = Math.min(1, runTime / g.difficultyTime);
    // Deterministic jitter per row index keeps the position stable across repeated calls.
    const jitter = mulberry32(this.seed + this.rowCount * 7919)();
    const gapTime = g.gapEasy + (g.gapHard - g.gapEasy) * diff + jitter * 0.55 * (1 - 0.5 * diff);
    let s = this.last.s + g.minGapDist;
    for (let i = 0; i < 3; i++) {
      const tArrive = runTime + Math.max(0, s - distance) / Math.max(speed, 1);
      const v = speedAt(tArrive) * 1.03; // small safety margin
      s = this.last.s + Math.max(gapTime * v, g.minGapDist);
    }
    return { s, gapTime };
  }

  _makeRow(s, gapTime, runTime, out) {
    const diff = Math.min(1, runTime / CFG.gen.difficultyTime);
    this._updateZone(s, runTime, out);
    const inZone = !!this.zone && s <= this.zone.to;
    const inClear = !!this.clear && s >= this.clear.from && s <= this.clear.to;
    const free = this.reserved.map((r) => s > r); // lanes not kept empty for a moving obstacle
    let chosen = null;
    if (inZone || inClear) {
      // Portal zone / jetpack landing zone: an empty row (passable from anywhere).
      const row = { cells: [EMPTY, EMPTY, EMPTY], empty: true };
      chosen = { row, next: advanceReach(this.reach, row.cells, gapTime) };
    }
    for (let attempt = 0; attempt < 8 && !chosen; attempt++) {
      const t = pickTemplate(this.rng, diff);
      const row = t.make(this.rng);
      if (row.cells.some((c, i) => c !== EMPTY && !free[i])) continue; // lane reserved by a moving obstacle
      const next = advanceReach(this.reach, row.cells, gapTime);
      if (next.size > 0) chosen = { row, next };
    }
    if (!chosen) {
      // Always-safe fallback: a log across the whole slope (passable from any lane), or an empty
      // row when a lane is reserved by a moving obstacle.
      const row = free.every(Boolean) ? { cells: [JUMP, JUMP, JUMP], wide: 'jump' } : { cells: [EMPTY, EMPTY, EMPTY], empty: true };
      chosen = { row, next: advanceReach(this.reach, row.cells, gapTime) };
    }
    const { row, next } = chosen;
    this.reach = next.size > 0 ? next : initialReach(); // (cannot be empty; defensive)
    this._emitObstacles(s, row, out, diff);
    const firstCoin = out.coins.length;
    this._emitCoins(this.last, { s, cells: row.cells }, out);
    if (this.pendingPower && this.rowCount > 0 && !inZone) this._emitPowerUp(this.last, { s, cells: row.cells }, out, firstCoin);
    out.rows.push({ s, cells: row.cells.slice(), gapTime, biome: this.biome });
    this.last = { s, cells: row.cells };
    this.rowCount++;
  }

  /** Start / finish the empty stretch around a portal. */
  _updateZone(s, runTime, out) {
    if (this.zone && s > this.zone.to) {
      this.biome = this.zone.biome; // rows after the portal belong to the next level
      this.zone = null;
    }
    if (this.pendingTransition !== null && !this.zone && this.rowCount > 0) {
      // Use the speed the player will have here, so the stretch lasts about the same TIME at any speed.
      const v = speedAt(runTime + 6) * 1.03;
      const from = this.last.s + 4;
      const gateS = Math.max(s, from + v * CFG.biome.preGate);
      this.zone = { from, gateS, to: gateS + v * CFG.biome.postGate, biome: this.pendingTransition };
      out.transitions.push({ gateS, from, to: this.zone.to, biome: this.pendingTransition, fromBiome: this.biome });
      this.pendingTransition = null;
    }
  }

  /** Place the requested power-up halfway between two rows, in a lane that is open on both sides. */
  _emitPowerUp(prev, row, out, firstCoin) {
    const rng = this.rng;
    const mid = (prev.s + row.s) / 2;
    const free = (l) => this.reserved[l] < mid; // never in the path of a moving obstacle
    let lanes = [0, 1, 2].filter((l) => prev.cells[l] !== BLOCK && row.cells[l] !== BLOCK && free(l));
    if (!lanes.length) lanes = [0, 1, 2].filter((l) => row.cells[l] !== BLOCK && free(l));
    if (!lanes.length) return; // try again between the next rows
    const lane = pick(rng, lanes) - 1;
    // No coin on top of the item
    for (let i = out.coins.length - 1; i >= firstCoin; i--) {
      const c = out.coins[i];
      if (c.lane === lane && Math.abs(c.s - mid) < 1.8) out.coins.splice(i, 1);
    }
    out.powerups.push({ type: this.pendingPower, lane, s: mid });
    this.pendingPower = null;
  }

  _emitObstacles(s, row, out, diff = 0) {
    if (row.empty) return;
    const rng = this.rng;
    const B = BIOMES[this.biome];
    if (row.wide === 'jump') {
      out.obstacles.push({ type: B.wide, lanes: [-1, 0, 1], s, cell: JUMP, biome: this.biome });
      return;
    }
    const chance = CFG.gen.movingChance.easy + (CFG.gen.movingChance.hard - CFG.gen.movingChance.easy) * diff;
    let movingUsed = false;
    for (let i = 0; i < 3; i++) {
      const cell = row.cells[i];
      if (cell === EMPTY) continue;
      const lane = i - 1;
      let type;
      if (cell === JUMP) type = pick(rng, B.jump);
      else if (cell === SLIDE) type = lane < 0 ? B.slide[0] : B.slide[1];
      else if (!movingUsed && this.rowCount >= 3 && rng() < chance) {
        // A moving obstacle: its lane stays empty in front of the row for the whole way it comes.
        type = B.moving;
        movingUsed = true;
        this.reserved[i] = s + OBSTACLES[type].move.run + OBSTACLES[type].depth + 4;
        out.obstacles.push({ type, lanes: [lane], s: s + OBSTACLES[type].move.run, rowS: s, hitS: s, cell, biome: this.biome });
        continue;
      } else type = pick(rng, B.block);
      out.obstacles.push({ type, lanes: [lane], s, cell, biome: this.biome });
    }
  }

  /** Coin lines between rows, and arcs over jump obstacles. Coins never overlap obstacles. */
  _emitCoins(prev, row, out) {
    const rng = this.rng;
    const spacing = CFG.coinSpacing;
    // Straight line in a lane that is free of solid obstacles at both ends.
    const spanStart = prev.s + 4.5;
    const spanEnd = row.s - 4.5;
    const len = spanEnd - spanStart;
    if (len >= 4 && rng() < 0.75) {
      // (never in a lane kept free for a moving obstacle: it would drive through the coins)
      const lanes = [0, 1, 2].filter((l) => prev.cells[l] !== BLOCK && row.cells[l] !== BLOCK && this.reserved[l] < prev.s);
      if (lanes.length) {
        const lane = pick(rng, lanes) - 1;
        const n = Math.min(1 + Math.floor(len / spacing), 9);
        const start = spanStart + (len - (n - 1) * spacing) / 2;
        for (let i = 0; i < n; i++) out.coins.push({ lane, s: start + i * spacing, y: 1.0 });
      }
    }
    // A few low coins under a bough (rewards sliding).
    for (const l of [0, 2]) {
      if (row.cells[l] === SLIDE && rng() < 0.6) {
        for (const off of [-1.4, 0, 1.4]) out.coins.push({ lane: l - 1, s: row.s + off, y: 0.5 });
      }
    }
    // Arc over a jump obstacle (rewards jumping).
    const jumpLanes = [0, 1, 2].filter((l) => row.cells[l] === JUMP);
    if (jumpLanes.length && rng() < 0.7) {
      const lane = pick(rng, jumpLanes) - 1;
      const offs = [-3.2, -1.6, 0, 1.6, 3.2];
      const ys = [1.0, 1.75, 2.15, 1.75, 1.0];
      for (let i = 0; i < 5; i++) out.coins.push({ lane, s: row.s + offs[i], y: ys[i] });
    }
  }
}
