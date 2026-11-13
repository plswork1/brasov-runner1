// Offline rendering and measurement of the synthesis (used by scripts/audio_check.py through `window.__audioLab`,
// exposed only with ?debug). Renders through an OfflineAudioContext with the SAME mixer and the same code as the game.
import { EFFECTS, makeEnv, mulberry32 } from './synth.js';
import { createMixer } from './mixer.js';
import { LEVELS, LEVEL_IDS, Song, layerMix } from './music.js';

const SR = 44100;

/** Peak, RMS (over the audible part), NaN count, clipped samples, silence. */
export function analyze(buf) {
  let peak = 0;
  let sum = 0;
  let n = 0;
  let nan = 0;
  let clipped = 0;
  let first = -1;
  let last = -1;
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      const v = d[i];
      if (v !== v || !isFinite(v)) {
        nan++;
        continue;
      }
      const a = Math.abs(v);
      if (a > peak) peak = a;
      if (a >= 0.999) clipped++;
      if (a > 0.001) {
        if (first < 0 || i < first) first = i;
        if (i > last) last = i;
      }
    }
  }
  if (first >= 0) {
    for (let c = 0; c < buf.numberOfChannels; c++) {
      const d = buf.getChannelData(c);
      for (let i = first; i <= last; i++) {
        sum += d[i] * d[i];
        n++;
      }
    }
  }
  const rms = n ? Math.sqrt(sum / n) : 0;
  const db = (x) => (x > 0 ? Math.round(20 * Math.log10(x) * 10) / 10 : -Infinity);
  return { peak, rms, peakDb: db(peak), rmsDb: db(rms), nan, clipped, silent: peak < 0.003, lengthMs: first < 0 ? 0 : Math.round(((last - first) / buf.sampleRate) * 1000) };
}

/** Effect cases: [label, method, args]. */
export const EFFECT_CASES = [
  ['coin(1)', 'coin', [1]], ['coin(5)', 'coin', [5]], ['coin(12)', 'coin', [12]], ['coin(40)', 'coin', [40]],
  ['nearMiss(1)', 'nearMiss', [1]], ['nearMiss(5)', 'nearMiss', [5]],
  ['combo(10)', 'combo', [10]], ['combo(50)', 'combo', [50]],
  ['powerUp(magnet)', 'powerUp', ['magnet']], ['powerUp(board)', 'powerUp', ['board']], ['powerUp(jetpack)', 'powerUp', ['jetpack']],
  ['powerUp(shield)', 'powerUp', ['shield']], ['powerUp(slowmo)', 'powerUp', ['slowmo']],
  ['shieldBreak', 'shieldBreak', []], ['crown', 'crown', []], ['claim', 'claim', []], ['revive', 'revive', []],
  ['deny', 'deny', []], ['tap', 'tap', []], ['powerEnd', 'powerEnd', []], ['superJump', 'superJump', []], ['warp', 'warp', []],
  ['splash', 'splash', []], ['jump', 'jump', []], ['slide', 'slide', []], ['lane', 'lane', []], ['hit', 'hit', []],
  ['growl', 'growl', []], ['escape', 'escape', []], ['start', 'start', []], ['gameOver', 'gameOver', []],
];

async function renderEffect(method, args, secs, dynamics) {
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * secs), SR);
  const mixer = createMixer(ctx, { dynamics });
  const env = makeEnv(ctx, { rng: mulberry32(99) });
  EFFECTS[method](env, mixer.sfx, 0.01, ...args);
  const buf = await ctx.startRendering();
  return { buf, live: env.live };
}

const MIXES = {
  calm: { state: 'playing', speedK: 0, chasing: false },
  full: { state: 'playing', speedK: 1, chasing: false },
  chase: { state: 'playing', speedK: 1, chasing: true },
  menu: { state: 'menu', speedK: 0, chasing: false },
};

async function renderMusic(levelId, mixName, secs, dynamics) {
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * secs), SR);
  const mixer = createMixer(ctx, { dynamics });
  const pitch = ctx.createConstantSource();
  pitch.offset.value = 0;
  pitch.start();
  const env = makeEnv(ctx, { rng: mulberry32(5), pitch });
  const song = new Song(env, mixer.musicIn, levelId);
  song.next = 0.02;
  song.setMix(layerMix(MIXES[mixName]), true);
  song.scheduleUntil(secs);
  const buf = await ctx.startRendering();
  return buf;
}

/** Everything the check script needs: effects (with and without the limiter) and every level x mix. */
export async function runAll({ musicSecs = 8 } = {}) {
  const out = { effects: [], music: [], levels: LEVEL_IDS, errors: [] };
  for (const [label, method, args] of EFFECT_CASES) {
    try {
      const secs = method === 'warp' || method === 'gameOver' ? 2 : 1.4;
      const post = await renderEffect(method, args, secs, true);
      const raw = await renderEffect(method, args, secs, false);
      out.effects.push({ label, ...analyze(post.buf), rawPeak: analyze(raw.buf).peak, live: post.live });
    } catch (e) {
      out.errors.push(`${label}: ${e && e.message}`);
    }
  }
  for (const id of LEVEL_IDS) {
    for (const mix of Object.keys(MIXES)) {
      try {
        const post = analyze(await renderMusic(id, mix, musicSecs, true));
        const raw = analyze(await renderMusic(id, mix, musicSecs, false));
        out.music.push({ level: id, mix, bpm: LEVELS[id].bpm, ...post, rawPeak: raw.peak });
      } catch (e) {
        out.errors.push(`music ${id}/${mix}: ${e && e.message}`);
      }
    }
  }
  return out;
}
