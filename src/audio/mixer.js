// The output chain, shared by the live game and the offline check:
//
//   sfx ───────────────────────────────┐
//   musicIn ─┬─────────────► filter ─► musicBus ─┤► master ► compressor ► limiter ► destination
//            └► reverb ─► filter                  │
//
// The compressor glues everything together, the limiter (ratio 20) catches what is left so nothing clips.
// `filter` is the music's lowpass: it closes when the game is paused or the clock slows time.
import { mulberry32 } from './synth.js';

/** A decaying-noise impulse response: a cheap, soft room (computed once per context). */
function reverbImpulse(ctx, secs = 1.3) {
  const len = Math.floor(ctx.sampleRate * secs);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    const r = mulberry32(777 + c * 31);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      lp += (r() * 2 - 1 - lp) * 0.45; // darken the tail
      d[i] = lp * Math.pow(1 - i / len, 2.4);
    }
  }
  return buf;
}

export const MASTER_GAIN = 0.9;
// Balance (measured with scripts/audio_check.py): effects clearly in front, music about 9 dB below their peaks.
export const SFX_GAIN = 2.2;
export const MUSIC_GAIN = 0.3;

export function createMixer(ctx, { dynamics = true, reverb = true } = {}) {
  const master = ctx.createGain();
  master.gain.value = MASTER_GAIN;
  const sfx = ctx.createGain();
  sfx.gain.value = SFX_GAIN;
  const musicIn = ctx.createGain();
  const musicFilter = ctx.createBiquadFilter();
  musicFilter.type = 'lowpass';
  musicFilter.frequency.value = 16000;
  musicFilter.Q.value = 0.5;
  const musicBus = ctx.createGain();
  musicBus.gain.value = MUSIC_GAIN;
  sfx.connect(master);
  musicIn.connect(musicFilter);
  if (reverb) {
    const conv = ctx.createConvolver();
    conv.buffer = reverbImpulse(ctx);
    const wet = ctx.createGain();
    wet.gain.value = 0.28;
    musicIn.connect(conv);
    conv.connect(wet);
    wet.connect(musicFilter);
  }
  musicFilter.connect(musicBus);
  musicBus.connect(master);
  let comp = null;
  let limiter = null;
  if (dynamics) {
    comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -20;
    comp.knee.value = 16;
    comp.ratio.value = 3;
    comp.attack.value = 0.006;
    comp.release.value = 0.25;
    limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -3;
    limiter.knee.value = 0;
    limiter.ratio.value = 20;
    limiter.attack.value = 0.001;
    limiter.release.value = 0.08;
    master.connect(comp);
    comp.connect(limiter);
    limiter.connect(ctx.destination);
  } else {
    master.connect(ctx.destination);
  }
  return { master, sfx, musicIn, musicFilter, musicBus, comp, limiter };
}
