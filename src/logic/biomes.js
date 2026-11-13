import { OBSTACLES } from '../config.js';

/**
 * The five ambients ("levels") of Brașov Runner, in the order they follow each other. Each one
 * lists the obstacle models used for every kind of generator cell, so the generator stays the
 * same everywhere (same passability rules) and only the look changes.
 *
 *   jump   - low obstacles to jump over (one lane)
 *   wide   - low obstacle across all three lanes
 *   slide  - [left-lane model, right-lane model] to slide under (only over the side lanes)
 *   block  - solid obstacles (change lane)
 *   moving - solid obstacle that comes toward the player
 *   ride   - what the boy rides there (snowboard, skateboard, bicycle, pedal boat)
 *   bear   - how the bear chases him there (optional: 'unicycle', 'hydro'; default runs / swims)
 */
export const BIOMES = [
  {
    id: 'partie',
    name: 'Poiana Brașov',
    subtitle: 'Pârtia de schi',
    ride: 'snowboard',
    winter: true,
    jump: ['log', 'ridge'],
    wide: 'wideLog',
    slide: ['branchL', 'branchR'],
    block: ['rock', 'snowman', 'stump'],
    moving: 'snowball',
  },
  {
    id: 'republicii',
    name: 'Strada Republicii',
    subtitle: 'Centrul vechi',
    ride: 'skate',
    jump: ['bench', 'flowerBox'],
    wide: 'chainPosts',
    slide: ['awningL', 'awningR'],
    block: ['kiosk', 'treePlanter', 'terrace'],
    moving: 'cyclist',
  },
  {
    id: 'tractorul',
    name: 'Pietonala Tractorul',
    subtitle: 'Cartierul Coresi',
    ride: 'bike',
    bear: 'unicycle',
    jump: ['bikeRack', 'hedge'],
    wide: 'hedgeRow',
    slide: ['pergolaL', 'pergolaR'],
    block: ['cubePlanter', 'iceCream', 'gear'],
    moving: 'cyclistB',
  },
  {
    id: 'afi',
    name: 'AFI Brașov',
    subtitle: 'Mall-ul',
    ride: 'skate',
    indoor: true,
    jump: ['wetFloor', 'mallBench'],
    wide: 'ropeLine',
    slide: ['bannerL', 'bannerR'],
    block: ['mallKiosk', 'palmPot', 'mannequins'],
    moving: 'scrubber',
  },
  {
    id: 'noua',
    name: 'Lacul Noua',
    subtitle: 'Hidrobicicleta',
    ride: 'boat',
    bear: 'hydro',
    water: true,
    jump: ['floatLog', 'buoys'],
    wide: 'boom',
    slide: ['willowL', 'willowR'],
    block: ['islet', 'duckHouse', 'pier'],
    moving: 'pedalBoat',
  },
];

export const BIOME_COUNT = BIOMES.length;
export const nextBiome = (i) => (i + 1) % BIOMES.length;
export const biomeIndex = (id) => Math.max(0, BIOMES.findIndex((b) => b.id === id));

/** Every obstacle type used by a biome (for tests and for pre-building models). */
export function biomeTypes(b) {
  return [...b.jump, b.wide, ...b.slide, ...b.block, b.moving];
}

/**
 * Track position of a moving obstacle for the player distance `d` (see CFG.gen.movingChance):
 * it waits at rowS + run, then comes toward the player at k times his speed and meets him at rowS.
 */
export function movingS(o, d) {
  const { k, run } = OBSTACLES[o.type].move;
  return Math.min(o.rowS + run, o.rowS + k * (o.rowS - d));
}
