// Synthesis primitives and the sound-effect recipes. Everything here takes an explicit start time `t` and a
// destination node and works on ANY BaseAudioContext, so the same code runs live and in the offline check
// (scripts/audio_check.py renders it through an OfflineAudioContext and measures the result).
// Every voice disconnects itself when it ends (`onended`): a long session must not accumulate nodes.

export const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);

/** Small deterministic PRNG (used by the offline check and by the generative music). */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const noiseCache = new WeakMap();
/** Two seconds of white noise per context (deterministic, so offline renders are reproducible). */
export function noiseBuffer(ctx) {
  let b = noiseCache.get(ctx);
  if (!b) {
    const len = Math.floor(ctx.sampleRate * 2);
    b = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = b.getChannelData(0);
    const r = mulberry32(12345);
    for (let i = 0; i < len; i++) d[i] = r() * 2 - 1;
    noiseCache.set(ctx, b);
  }
  return b;
}

/** Synthesis environment: the context, a random source, the shared noise and the music pitch control. */
export function makeEnv(ctx, { rng = Math.random, pitch = null } = {}) {
  return { ctx, rng, noise: noiseBuffer(ctx), pitch, live: 0 };
}

/** 1 +- pct, for small random variation so repeats do not sound mechanical. */
export const jit = (env, pct) => 1 + (env.rng() * 2 - 1) * pct;

function finish(env, src, nodes) {
  env.live++;
  src.onended = () => {
    env.live--;
    src.disconnect();
    for (const n of nodes) n.disconnect();
  };
}

/**
 * One oscillator voice.
 * o: t, f0, f1 (glide target), glide (s), dur, type, vol, attack, sustain (hold until near the end instead of
 *    decaying), release, lp / lp1 (lowpass cutoff, sweeping to lp1 over the duration), detune (cents),
 *    pan (-1..1), pitched (follows the music pitch control: slow-motion), delay is already included in t.
 */
export function tone(env, dest, o) {
  const { ctx } = env;
  const t = o.t;
  const dur = o.dur ?? 0.12;
  const atk = Math.min(o.attack ?? 0.008, dur * 0.5);
  const vol = o.vol ?? 0.1;
  const f0 = o.f0;
  const f1 = o.f1 ?? f0;
  const osc = ctx.createOscillator();
  osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(f0, t);
  if (f1 !== f0) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + (o.glide ?? dur));
  if (o.detune) osc.detune.value = o.detune;
  if (o.pitched && env.pitch) env.pitch.connect(osc.detune);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(vol, t + atk);
  if (o.sustain) {
    const rel = Math.min(o.release ?? dur * 0.3, dur - atk);
    g.gain.setValueAtTime(vol, t + dur - rel);
  }
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  const nodes = [g];
  let head = osc;
  if (o.lp) {
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(o.lp, t);
    if (o.lp1) f.frequency.exponentialRampToValueAtTime(o.lp1, t + dur);
    f.Q.value = o.q ?? 0.7;
    head.connect(f);
    head = f;
    nodes.push(f);
  }
  head.connect(g);
  let out = g;
  if (o.pan && ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = o.pan;
    g.connect(p);
    out = p;
    nodes.push(p);
  }
  out.connect(dest);
  osc.start(t);
  osc.stop(t + dur + 0.03);
  finish(env, osc, nodes);
}

/**
 * A burst of filtered noise.
 * o: t, dur, vol, freq (filter), f1 (sweep target), q, type ('lowpass' | 'highpass' | 'bandpass'), attack, pan
 */
export function noiseBurst(env, dest, o) {
  const { ctx } = env;
  const t = o.t;
  const dur = o.dur ?? 0.2;
  const atk = Math.min(o.attack ?? 0.004, dur * 0.5);
  const src = ctx.createBufferSource();
  src.buffer = env.noise;
  const f = ctx.createBiquadFilter();
  f.type = o.type ?? 'lowpass';
  f.frequency.setValueAtTime(o.freq ?? 800, t);
  if (o.f1) f.frequency.exponentialRampToValueAtTime(o.f1, t + dur);
  f.Q.value = o.q ?? 0.7;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(o.vol ?? 0.2, t + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g);
  const nodes = [f, g];
  let out = g;
  if (o.pan && ctx.createStereoPanner) {
    const p = ctx.createStereoPanner();
    p.pan.value = o.pan;
    g.connect(p);
    out = p;
    nodes.push(p);
  }
  out.connect(dest);
  // random start offset: two identical hits never use the same slice of noise
  src.start(t, env.rng() * 0.9);
  src.stop(t + dur + 0.03);
  finish(env, src, nodes);
}

// ---- sound effects --------------------------------------------------------------------------------
// MIDI notes of a C major pentatonic ladder: the coin sound climbs it with the streak.
export const COIN_LADDER = [72, 74, 76, 79, 81, 84, 86, 88, 91, 93, 96];

const chord = (env, d, t, notes, o = {}) =>
  notes.forEach((m, i) => tone(env, d, { t: t + i * (o.gap ?? 0.06), f0: mtof(m), type: 'triangle', vol: 0.1, dur: 0.16, ...o.voice }));

export const EFFECTS = {
  /** A coin: a small bell whose pitch climbs the pentatonic ladder with the streak. */
  coin(env, d, t, streak = 1) {
    const i = Math.min(Math.max(1, streak | 0) - 1, COIN_LADDER.length - 1);
    const f = mtof(COIN_LADDER[i]) * jit(env, 0.004);
    tone(env, d, { t, f0: f, dur: 0.26, vol: 0.1, attack: 0.002 });
    tone(env, d, { t, f0: f * 2.01, dur: 0.14, vol: 0.05, attack: 0.002 });
    tone(env, d, { t, f0: f * 3.98, dur: 0.07, vol: 0.022, attack: 0.002 });
    noiseBurst(env, d, { t, dur: 0.025, vol: 0.03, freq: 6500, type: 'highpass' });
    if (streak >= 10) tone(env, d, { t: t + 0.05, f0: f * 2, dur: 0.2, vol: 0.04, attack: 0.002 });
  },
  nearMiss(env, d, t, chain = 1) {
    const k = 1 + 0.07 * Math.min(Math.max(1, chain | 0) - 1, 6);
    noiseBurst(env, d, { t, dur: 0.26, vol: 0.2, freq: 500 * k, f1: 3800 * k, q: 1.4, type: 'bandpass', attack: 0.05, pan: 0.0 });
    tone(env, d, { t, f0: 620 * k, f1: 1500 * k, dur: 0.18, vol: 0.06, type: 'triangle' });
    if (chain >= 2) tone(env, d, { t: t + 0.12, f0: 1760 * k, dur: 0.18, vol: 0.06, attack: 0.002 });
  },
  /** Milestone fanfare for a coin streak (10, 20, 30...). */
  combo(env, d, t, streak = 10) {
    const root = 72 + Math.min(Math.floor(streak / 10), 5) * 2;
    [0, 4, 7, 12].forEach((s, i) => {
      const last = i === 3;
      tone(env, d, { t: t + i * 0.065, f0: mtof(root + s), type: 'triangle', dur: last ? 0.5 : 0.18, vol: 0.1 });
      tone(env, d, { t: t + i * 0.065, f0: mtof(root + s + 12) * 1.002, dur: last ? 0.4 : 0.12, vol: 0.04 });
    });
    noiseBurst(env, d, { t: t + 0.2, dur: 0.4, vol: 0.05, freq: 7000, type: 'highpass' });
  },
  powerUp(env, d, t, type) {
    const base = { magnet: 523, board: 659, jetpack: 784, shield: 587, slowmo: 440 }[type] ?? 600;
    [1, 1.25, 1.5, 2].forEach((k, i) => {
      tone(env, d, { t: t + i * 0.07, f0: base * k, dur: 0.16, type: 'triangle', vol: 0.11 });
      tone(env, d, { t: t + i * 0.07, f0: base * k * 2, dur: 0.1, vol: 0.03 });
    });
    if (type === 'jetpack') noiseBurst(env, d, { t: t + 0.1, dur: 0.6, vol: 0.22, freq: 300, f1: 1600 });
    if (type === 'slowmo') tone(env, d, { t, f0: 880, f1: 220, dur: 0.5, vol: 0.08 });
    if (type === 'shield') noiseBurst(env, d, { t, dur: 0.3, vol: 0.06, freq: 5000, type: 'highpass' });
  },
  shieldBreak(env, d, t) {
    noiseBurst(env, d, { t, dur: 0.3, vol: 0.22, freq: 4200, type: 'highpass', f1: 2000 });
    [1320, 990, 660].forEach((f, i) => tone(env, d, { t: t + i * 0.05, f0: f * jit(env, 0.01), dur: 0.14, type: 'triangle', vol: 0.11 }));
    tone(env, d, { t, f0: 180, f1: 60, dur: 0.2, vol: 0.15 });
  },
  crown(env, d, t) {
    chord(env, d, t, [79, 83, 86, 91], { gap: 0.06, voice: { dur: 0.22, vol: 0.1 } });
    tone(env, d, { t: t + 0.18, f0: mtof(103), dur: 0.35, vol: 0.04 });
  },
  claim(env, d, t) {
    tone(env, d, { t, f0: 660, dur: 0.1, type: 'triangle', vol: 0.1 });
    tone(env, d, { t: t + 0.08, f0: 990, dur: 0.2, type: 'triangle', vol: 0.1 });
    tone(env, d, { t: t + 0.08, f0: 1980, dur: 0.12, vol: 0.03 });
  },
  revive(env, d, t) {
    tone(env, d, { t, f0: 220, f1: 880, dur: 0.45, vol: 0.13 });
    noiseBurst(env, d, { t, dur: 0.45, vol: 0.06, freq: 500, f1: 4000, type: 'bandpass' });
    chord(env, d, t + 0.3, [72, 76, 79, 84], { gap: 0.07, voice: { dur: 0.3, vol: 0.1 } });
  },
  deny(env, d, t) {
    tone(env, d, { t, f0: 200, f1: 150, dur: 0.16, type: 'square', vol: 0.06, lp: 900 });
    tone(env, d, { t: t + 0.09, f0: 170, f1: 120, dur: 0.16, type: 'square', vol: 0.05, lp: 900 });
  },
  tap(env, d, t) {
    tone(env, d, { t, f0: 520 * jit(env, 0.02), dur: 0.045, type: 'triangle', vol: 0.08 });
  },
  powerEnd(env, d, t) {
    tone(env, d, { t, f0: 660, f1: 330, dur: 0.28, type: 'triangle', vol: 0.1 });
    tone(env, d, { t: t + 0.04, f0: 330, f1: 165, dur: 0.28, vol: 0.05 });
  },
  superJump(env, d, t) {
    tone(env, d, { t, f0: 300, f1: 900, dur: 0.24, vol: 0.14 });
    tone(env, d, { t, f0: 150, f1: 450, dur: 0.24, vol: 0.08, type: 'triangle' });
    noiseBurst(env, d, { t, dur: 0.25, vol: 0.1, freq: 800, f1: 5000, type: 'bandpass' });
  },
  warp(env, d, t) {
    noiseBurst(env, d, { t, dur: 0.9, vol: 0.22, freq: 400, f1: 5200, type: 'bandpass', q: 1.2, attack: 0.5 });
    tone(env, d, { t, f0: 200, f1: 1200, dur: 0.6, vol: 0.12 });
    tone(env, d, { t, f0: 100, f1: 600, dur: 0.6, vol: 0.07, type: 'triangle' });
    [72, 76, 79, 84].forEach((m, i) => {
      tone(env, d, { t: t + 0.35 + i * 0.06, f0: mtof(m), dur: 0.45, type: 'triangle', vol: 0.09 });
      tone(env, d, { t: t + 0.35 + i * 0.06, f0: mtof(m + 12), dur: 0.35, vol: 0.03 });
    });
  },
  splash(env, d, t) {
    noiseBurst(env, d, { t, dur: 0.4, vol: 0.18, freq: 2600, f1: 500 });
    noiseBurst(env, d, { t: t + 0.03, dur: 0.18, vol: 0.07, freq: 5000, type: 'highpass' });
    tone(env, d, { t, f0: 260, f1: 90, dur: 0.18, vol: 0.1 });
  },
  jump(env, d, t) {
    const k = jit(env, 0.04);
    tone(env, d, { t, f0: 280 * k, f1: 560 * k, dur: 0.15, vol: 0.13 });
    tone(env, d, { t, f0: 560 * k, f1: 1120 * k, dur: 0.1, vol: 0.03, type: 'triangle' });
    noiseBurst(env, d, { t, dur: 0.08, vol: 0.03, freq: 3000, type: 'highpass' });
  },
  slide(env, d, t) {
    noiseBurst(env, d, { t, dur: 0.28, vol: 0.13, freq: 2600 * jit(env, 0.05), f1: 900, type: 'bandpass', q: 0.9 });
  },
  lane(env, d, t) {
    const k = jit(env, 0.05);
    tone(env, d, { t, f0: 420 * k, f1: 330 * k, dur: 0.06, type: 'triangle', vol: 0.08 });
    noiseBurst(env, d, { t, dur: 0.06, vol: 0.04, freq: 2200, type: 'bandpass' });
  },
  hit(env, d, t) {
    noiseBurst(env, d, { t, dur: 0.35, vol: 0.34, freq: 2400, f1: 200 });
    tone(env, d, { t, f0: 130, f1: 38, dur: 0.38, vol: 0.34 });
    tone(env, d, { t, f0: 160, f1: 50, dur: 0.3, type: 'sawtooth', vol: 0.1, lp: 900 });
    noiseBurst(env, d, { t, dur: 0.03, vol: 0.14, freq: 3000, type: 'highpass' });
  },
  growl(env, d, t) {
    const s = t + 0.1;
    tone(env, d, { t: s, f0: 95, f1: 60, dur: 0.7, type: 'sawtooth', vol: 0.11, lp: 420, attack: 0.08 });
    tone(env, d, { t: s, f0: 98, f1: 62, dur: 0.7, type: 'sawtooth', vol: 0.08, lp: 420, attack: 0.08, detune: 12 });
    tone(env, d, { t: s, f0: 140, f1: 80, dur: 0.6, type: 'square', vol: 0.04, lp: 500, attack: 0.08 });
    noiseBurst(env, d, { t: s, dur: 0.7, vol: 0.06, freq: 350, type: 'bandpass', q: 1.5, attack: 0.1 });
  },
  escape(env, d, t) {
    [440, 660, 880].forEach((f, i) => {
      tone(env, d, { t: t + i * 0.1, f0: f, dur: i === 2 ? 0.25 : 0.12, type: 'triangle', vol: 0.12 });
      tone(env, d, { t: t + i * 0.1, f0: f * 2, dur: 0.1, vol: 0.03 });
    });
  },
  start(env, d, t) {
    [392, 523, 784].forEach((f, i) => {
      tone(env, d, { t: t + i * 0.1, f0: f, dur: i === 2 ? 0.22 : 0.12, type: 'triangle', vol: 0.12 });
      tone(env, d, { t: t + i * 0.1, f0: f * 2, dur: 0.1, vol: 0.03 });
    });
  },
  gameOver(env, d, t) {
    [400, 320, 240, 160].forEach((f, i) => {
      tone(env, d, { t: t + i * 0.18, f0: f, f1: f * 0.94, dur: 0.24, type: 'sawtooth', vol: 0.1, lp: 1400 });
      tone(env, d, { t: t + i * 0.18, f0: f / 2, dur: 0.24, vol: 0.08 });
    });
  },
};

/**
 * A looping noise bed (wind or jetpack): returns { src, gain, filter }. The caller owns it and must stop it.
 */
export function noiseLoop(env, dest, { type = 'lowpass', freq = 500, q = 0.7 } = {}) {
  const { ctx } = env;
  const src = ctx.createBufferSource();
  src.buffer = env.noise;
  src.loop = true;
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = freq;
  filter.Q.value = q;
  const gain = ctx.createGain();
  gain.gain.value = 0;
  src.connect(filter).connect(gain).connect(dest);
  src.start();
  return { src, gain, filter };
}
