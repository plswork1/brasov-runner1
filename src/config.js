// Central tuning file. All gameplay numbers live here so they are easy to explain and tweak.
// World units are "meters"; the player runs along the -Z axis, and everything is tracked by its
// distance coordinate `s` (how far down the slope it is), not by raw Z.

export const CFG = {
  laneW: 2.4, // distance between lane centers
  laneCount: 3,

  // Run speed (units/second). Eases from `base` toward `max`: v(t) = base + (max-base) * (1 - e^(-t/k))
  speed: { base: 15, max: 36, k: 55, launchTime: 1.1 },
  hitSlow: 0.55, // speed multiplier right after the first hit...
  hitSlowRecover: 1.8, // ...and how fast it recovers (higher = faster)

  // Vertical movement. Apex = v0^2 / (2g) ~ 1.94 units, air time ~ 0.68 s
  jump: { v0: 11.5, gravity: 34, fastFall: 26, buffer: 0.14 },
  slide: { duration: 0.75 },
  // Sideways movement: a slightly underdamped spring with an initial velocity kick (fast start,
  // clean stop, ~2 % overshoot). Reaches the lane (within 0.3) in ~0.075 s, well inside gen.laneTime.
  // Lane change: a critically damped spring (no overshoot), softened after play-testing (it felt abrupt).
  // It must stay within 0.3 of the lane in <= gen.laneTime (the generator's "always a way" assumes it).
  lane: { omega: 25, zeta: 1, kick: 1.5, overLimit: 0.12 }, // kick: start speed in lane widths / s

  // Player hitbox (slightly smaller than the visual model = forgiving)
  player: { halfW: 0.3, halfDepth: 0.3, height: 1.75, slideHeight: 0.7 },
  hitForgive: 0.12, // vertical forgiveness in units

  bear: {
    chaseTime: 5, // seconds the bear follows after the first hit
    grace: 1.0, // seconds of invulnerability after the first hit
    leaveTime: 1.3, // seconds of the "bear falls behind" animation
    enterTime: 0.5,
    distance: 4.4, // how far behind the player the bear runs
    riderDistance: 3.6, // ...and rides (unicycle / water unicycle: the camera rises to show it all)
  },

  score: { perUnit: 1, perCoin: 10 },

  // Obstacle generator
  gen: {
    ahead: 150, // spawn this far in front of the player
    behind: 14, // release things this far behind
    laneTime: 0.23, // seconds needed to change by one lane (conservative)
    recover: 0.5, // seconds to switch between jump and slide actions
    gapEasy: 2.3, // seconds between obstacle rows at the start...
    gapHard: 1.05, // ...and when fully ramped up
    difficultyTime: 150, // seconds to reach full difficulty
    minGapDist: 11, // never closer than this (units)
    firstRowS: 52, // first row of obstacles
  },

  coinSpacing: 2.3,
  coinRadius: 0.4,

  // Special abilities (power-ups). They appear as glowing items on the slope. On average one shows
  // up about every 25 s: the magnet about once a minute, the super board every 2 minutes, the
  // shield every 2.5 minutes, the jetpack every 3 minutes and the clock (the rarest) every 3.5 minutes. No timer is shown on screen; the item on the character only
  // blinks during the last `warnTime` seconds.
  power: {
    magnet: { duration: 15, first: 30, every: 60 },
    board: { duration: 10, first: 60, every: 120 },
    jetpack: { duration: 10, first: 120, every: 180 },
    // v2: "Scutul Bastionului" absorbs ONE hit (the bear does not start chasing / does not catch you)
    shield: { duration: 12, first: 45, every: 150 },
    // v2: "Ceasul din Piața Sfatului" slows the whole world down (but not the bear's 5 s timer)
    slowmo: { duration: 6, first: 95, every: 210 },
    shieldGrace: 0.8, // seconds of protection right after the shield breaks (one cluster = one hit)
    slowScale: 0.55, // world time scale while the clock is active
    slowEase: 5, // how fast the time scale eases in and out (1/s)
    jitter: 5, // +- seconds of randomness on every appearance
    minSeparation: 14, // two power-ups never appear closer than this (seconds)
    warnTime: 2,
    pickupY: 1.15, // floating height of the item on the slope
    magnetRange: 18, // coins up to this far ahead (in every lane) fly to the player
    boardJumpV0: 17, // super jump: apex ~4.25 units, higher than every obstacle (max top 3)
    jetHeight: 5.2, // flight height (feet), well above every obstacle
    jetRise: 5, // smoothing rate of the climb to flight height
    jetLandGrace: 0.7, // seconds of protection right after landing
    skyCoinY: 0.9, // coin trail height above the jetpack flight height
  },
};

// Levels ("ambients"). The run starts in one of them and, after `duration` seconds in it, the track
// clears up, a portal appears and the player passes into the next one (in this order, then it loops).
CFG.biome = {
  duration: 300, // seconds spent in one ambient before the portal to the next one appears
  preGate: 2.6, // seconds of empty track (no obstacles) before the portal...
  postGate: 2.4, // ...and after it, so the change of scenery never happens next to an obstacle
};

// Moving obstacles (snowball, cyclists, cleaning machine, pedal boats) come toward the player.
// Their position is derived from the player's distance d:  s(d) = rowS + k * (rowS - d), capped at
// rowS + run. So they roll/drive at k times the player's speed and reach their row exactly when the
// player does: the generator's passability guarantee still holds, and they are visible on the way.
CFG.gen.movingChance = { easy: 0.22, hard: 0.38 }; // chance that a solid obstacle is a moving one

// Obstacle table: collision data for each obstacle type.
//  cell:   what the player has to do (JUMP over, SLIDE under, BLOCK = change lane)
//  lanes:  how many lanes wide it is (1 or 3)
//  depth:  collision depth along the track
//  bottom/top: vertical extent of the collision box
//  move:   (moving obstacles only) k = speed relative to the player, run = how far it travels
const jump = (depth = 1.0, top = 0.8) => ({ cell: 'JUMP', lanes: 1, depth, bottom: 0, top });
const wide = (depth = 1.0, top = 0.85) => ({ cell: 'JUMP', lanes: 3, depth, bottom: 0, top });
const slide = (depth = 0.9) => ({ cell: 'SLIDE', lanes: 1, depth, bottom: 1.35, top: 2.9 });
const block = (depth = 1.6) => ({ cell: 'BLOCK', lanes: 1, depth, bottom: 0, top: 3 });
const moving = (depth, k, run) => ({ ...block(depth), move: { k, run } });

export const OBSTACLES = {
  // --- Pârtia din Poiana Brașov (winter) ---
  log: jump(1.0, 0.8),
  ridge: jump(1.7, 0.7),
  wideLog: wide(1.0, 0.85),
  // Pine bough across a SIDE lane (never the middle one). Every slide obstacle exists as a mirrored
  // pair: the ...L model reaches over the left lane, the ...R model over the right lane.
  branchL: slide(),
  branchR: slide(),
  rock: block(1.9),
  snowman: block(1.5),
  stump: block(1.4),
  snowball: moving(2.2, 0.5, 50), // rolls down the slope toward the player
  // --- Strada Republicii ---
  bench: jump(1.0, 0.8),
  flowerBox: jump(1.0, 0.75),
  chainPosts: wide(0.6, 0.85),
  awningL: slide(1.9),
  awningR: slide(1.9),
  kiosk: block(1.8),
  treePlanter: block(1.6),
  terrace: block(1.8),
  cyclist: moving(1.9, 0.45, 50),
  // --- Pietonala Tractorul (Coresi) ---
  bikeRack: jump(0.8, 0.8),
  hedge: jump(1.0, 0.75),
  hedgeRow: wide(1.0, 0.8),
  pergolaL: slide(1.0),
  pergolaR: slide(1.0),
  cubePlanter: block(1.7),
  iceCream: block(1.7),
  gear: block(1.2),
  cyclistB: moving(1.9, 0.45, 50),
  // --- AFI Brașov (mall) ---
  wetFloor: jump(0.8, 0.8),
  mallBench: jump(1.0, 0.8),
  ropeLine: wide(0.6, 0.85),
  bannerL: slide(0.8),
  bannerR: slide(0.8),
  mallKiosk: block(1.8),
  palmPot: block(1.4),
  mannequins: block(1.6),
  scrubber: moving(2.0, 0.3, 40), // floor-cleaning machine
  // --- Lacul Noua (on the water) ---
  floatLog: jump(1.0, 0.7),
  buoys: jump(0.8, 0.75),
  boom: wide(0.8, 0.75),
  willowL: slide(1.0),
  willowR: slide(1.0),
  islet: block(2.0),
  duckHouse: block(1.6),
  pier: block(1.6),
  // open pedal boat (no roof): as tall as the passenger standing on the bench with her arm up
  pedalBoat: { ...moving(2.4, 0.35, 45), top: 2.6 },
};

export const OBSTACLE_HALF_W = CFG.laneW / 2 - 0.12; // obstacle half-width inside a lane

// v3 game feel (not gameplay): a very short freeze of the picture when the player is hit.
CFG.feel = { hitStop: 0.07, hitStopCaught: 0.12, hintRuns: 2 };

// ------------------------------------------------------------------------------------------------
// v2: meta game (economy, missions, battle pass, revive, ads). Everything here is cosmetic or
// convenience: nothing can be bought with real money and nothing makes the runs easier to "win".
// ------------------------------------------------------------------------------------------------

// Two currencies: "bănuți" (coins collected in the runs) and the rare premium "Coroane" (crowns:
// Brașov = Kronstadt, the Crown City). Crowns come from missions, the battle pass and, rarely, runs.
CFG.economy = {
  maxCoins: 9_999_999,
  maxCrowns: 99_999,
  // A crown item appears on the track like a power-up item, about once every 5 minutes: it is the
  // rarest thing on the track (rarer than every power-up), so runs are the smallest source of crowns.
  crownRun: { first: 150, every: 300, jitter: 60 },
};

// "Continui?" after the bear catches you: watch a (mock) ad or pay crowns. The price grows with
// every revive of the same run; `costs.length` is also the limit of revives per run.
CFG.revive = {
  costs: [2, 4, 8],
  maxAds: 2, // at most this many of the revives of one run can be paid with an ad
  invulnerable: 3, // seconds of protection after the revive
  clearTime: 3.5, // seconds of track in front of the player that are cleared of obstacles
  restartSlow: 0.35, // speed factor right after the revive (recovers like after a hit)
};

CFG.ads = {
  mockSeconds: 5, // length of the fake ad (it cannot be skipped)
  mockNeedsNetwork: true, // behave like a real ad network: no ad while the device is offline
};

// Battle pass ("Pass-ul Tâmpa"): one season = `seasonDays` days, counted from `epoch` (local date).
CFG.pass = {
  tiers: 40,
  xpPerTier: 120,
  seasonDays: 42,
  epoch: [2026, 11, 2], // year, month (1-12), day: Monday 2 November 2026 = first day of season 1
  premiumCost: 80, // crowns
};

// XP for the battle pass from simply playing (missions give most of it).
CFG.xp = { perRun: 10, per100m: 2, perPortal: 15, maxPerRun: 120 };

// Missions: 3 daily, 3 weekly and 3 "one run" missions are active at any time.
CFG.missions = {
  dailyCount: 3,
  weeklyCount: 3,
  runCount: 3,
  reward: {
    daily: { xp: 60, coins: 100 },
    dailyBonus: { xp: 50, crowns: 1 }, // for finishing all the daily missions
    weekly: { xp: 250, coins: 300, crowns: 4 },
    run: { xp: 40, coins: 60 },
  },
  runGoalGrowth: 0.25, // every full round of "one run" missions raises their goals by 25%
};
