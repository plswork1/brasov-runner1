// Generative music: one small "song" per level, played by a step sequencer (16 steps per bar).
// Works on any BaseAudioContext (live engine and the offline check render the very same code).
//
// Music-theory-safe by construction (nobody can listen while writing this, so nothing is left to chance):
//  * one scale per level, every chord is built from that scale, steady tempo, a 4-bar chord loop;
//  * the melody is a pure function of the phrase number (no drift, no state): strong beats land on chord
//    tones, the other notes move by step, so it always sounds like a tune and repeats every 8 bars;
//  * layers (pad, bass, arp, drums, melody, tension) fade in and out with the run, never the notes themselves.
import { mtof, mulberry32, tone, noiseBurst } from './synth.js';
import { MUSIC_GAIN } from './mixer.js';

export const LAYERS = ['pad', 'bass', 'arp', 'drums', 'mel', 'tension'];
const QUAL = { maj: [0, 4, 7], min: [0, 3, 7], maj7: [0, 4, 7, 11], min7: [0, 3, 7, 10] };

/** Lowest MIDI note >= lo with the given pitch class. */
const place = (pc, lo) => lo + ((((pc - lo) % 12) + 12) % 12);
const clamp01 = (x) => Math.max(0, Math.min(1, x));
const smooth = (x, a, b) => clamp01((x - a) / (b - a));

// Rhythm strings: one char per step, 'x' = hit, 'o' = soft hit, '.' = nothing. Melody rhythms are per 2 bars on an
// eighth-note grid (16 slots). Arp digits index [chord tones, the same an octave up]; 's' = short chord stab.
export const LEVELS = {
  // Poiana: crisp cold morning. D major, bright bells, light pulse.
  partie: {
    bpm: 112, seed: 11,
    chords: [{ pc: 2, q: 'maj' }, { pc: 11, q: 'min' }, { pc: 7, q: 'maj' }, { pc: 9, q: 'maj' }],
    scale: [2, 4, 6, 7, 9, 11, 1], melLo: 69, melHi: 90,
    rhythm: ['x.x.x...x.x.x...', 'x...x.x.x...x.x.', 'x.x...x.x.x.x...', 'x...x...x.x.x.x.'],
    bass: 'x.....x.x.....x.', arp: '0.1.2.1.0.1.2.3.', arpInstr: 'glock', melInstr: 'glock',
    kick: 'x.......x.......', snare: '....x.......x...', hat: '..o...o...o...o.',
    padLp: 1500, padVol: 0.028, arpVol: 0.05, melVol: 0.07, bassVol: 0.15,
  },
  // Republicii: Transylvanian flavour. A harmonic minor (the G sharp over the E chord), oom-pah bass, plucked țambal.
  republicii: {
    bpm: 118, seed: 23,
    chords: [{ pc: 9, q: 'min' }, { pc: 2, q: 'min' }, { pc: 4, q: 'maj' }, { pc: 9, q: 'min' }],
    scale: [9, 11, 0, 2, 4, 5, 8], melLo: 64, melHi: 86,
    rhythm: ['x.xxx.x.x.xxx.x.', 'x.x.xxx.x...x.x.', 'x.xxx.x.xxx.x.x.', 'x.x.x.xxx.......'],
    bass: 'x.....x.x.....x.', arp: '..s...s...s...s.', arpInstr: 'stab', melInstr: 'tambal',
    kick: 'x.......x.......', snare: '....o.......o...', hat: 'o.o.o.o.o.o.o.o.',
    padLp: 1100, padVol: 0.022, arpVol: 0.05, melVol: 0.075, bassVol: 0.16,
  },
  // Tractorul: warm late afternoon. F major, electric piano, a gentle groove.
  tractorul: {
    bpm: 104, seed: 37,
    chords: [{ pc: 5, q: 'maj7' }, { pc: 0, q: 'maj' }, { pc: 2, q: 'min7' }, { pc: 10, q: 'maj7' }],
    scale: [5, 7, 9, 10, 0, 2, 4], melLo: 65, melHi: 86,
    rhythm: ['x..x..x.x..x....', 'x.x...x..x..x.x.', 'x..x..x.x.....x.', 'x...x.x.x.x.....'],
    bass: 'x..x..x.x..x..x.', arp: '0.1.2.1.3.2.1.2.', arpInstr: 'epiano', melInstr: 'epiano',
    kick: 'x.....x...x.....', snare: '....x.......x...', hat: 'o.o.o.o.o.o.o.o.',
    padLp: 1300, padVol: 0.026, arpVol: 0.05, melVol: 0.07, bassVol: 0.16,
  },
  // AFI: indoor, shiny. G major, four on the floor, synth plucks.
  afi: {
    bpm: 120, seed: 53,
    chords: [{ pc: 4, q: 'min' }, { pc: 0, q: 'maj' }, { pc: 7, q: 'maj' }, { pc: 2, q: 'maj' }],
    scale: [7, 9, 11, 0, 2, 4, 6], melLo: 67, melHi: 91,
    rhythm: ['x.x.x.x.x.x.x...', 'x...x.x...x.x.x.', 'x.x...x.x.x.x...', 'x.x.x...x.....x.'],
    bass: 'x.x.x.x.x.x.x.x.', arp: '0.1.2.3.2.1.2.1.', arpInstr: 'pluck', melInstr: 'pluck',
    kick: 'x...x...x...x...', snare: '....x.......x...', hat: '..x...x...x...x.',
    padLp: 1800, padVol: 0.025, arpVol: 0.05, melVol: 0.065, bassVol: 0.15,
  },
  // Noua: sunset over the water. C major seventh chords, slow, soft, no kick.
  noua: {
    bpm: 90, seed: 71,
    chords: [{ pc: 0, q: 'maj7' }, { pc: 9, q: 'min7' }, { pc: 5, q: 'maj7' }, { pc: 7, q: 'maj' }],
    scale: [0, 2, 4, 5, 7, 9, 11], melLo: 67, melHi: 88,
    rhythm: ['x.......x...x...', 'x...x.......x...', 'x.......x.......', 'x...x...x.x.....'],
    bass: 'x.......x.......', arp: '0...1...2...1...', arpInstr: 'soft', melInstr: 'soft',
    kick: 'x...............', snare: '................', hat: 'o.o.o.o.o.o.o.o.',
    padLp: 1700, padVol: 0.032, arpVol: 0.05, melVol: 0.06, bassVol: 0.13,
  },
};
export const LEVEL_IDS = Object.keys(LEVELS);

// ---- instruments (all "pitched": they follow the slow-motion pitch bend) ------------------------------
const INSTR = {
  glock(env, d, t, m, dur, vol) {
    const f = mtof(m);
    tone(env, d, { t, f0: f, dur: 0.6, vol, attack: 0.003, pitched: true });
    tone(env, d, { t, f0: f * 2.76, dur: 0.25, vol: vol * 0.3, attack: 0.003, pitched: true });
  },
  tambal(env, d, t, m, dur, vol) {
    const f = mtof(m);
    tone(env, d, { t, f0: f, dur: 0.4, vol, type: 'triangle', attack: 0.003, pitched: true });
    tone(env, d, { t, f0: f, dur: 0.22, vol: vol * 0.45, type: 'sawtooth', lp: 3200, lp1: 700, attack: 0.002, pitched: true });
    tone(env, d, { t, f0: f * 1.004, dur: 0.3, vol: vol * 0.3, type: 'triangle', attack: 0.003, pitched: true, detune: 9 });
  },
  epiano(env, d, t, m, dur, vol) {
    const f = mtof(m);
    tone(env, d, { t, f0: f, dur: 0.7, vol, attack: 0.004, pitched: true });
    tone(env, d, { t, f0: f * 2, dur: 0.25, vol: vol * 0.35, attack: 0.002, pitched: true });
    tone(env, d, { t, f0: f * 4, dur: 0.08, vol: vol * 0.15, attack: 0.002, pitched: true });
  },
  pluck(env, d, t, m, dur, vol) {
    const f = mtof(m);
    tone(env, d, { t, f0: f, dur: 0.32, vol: vol * 0.7, type: 'sawtooth', lp: 4200, lp1: 500, attack: 0.002, pitched: true });
    tone(env, d, { t, f0: f * 0.5, dur: 0.2, vol: vol * 0.5, attack: 0.002, pitched: true });
  },
  soft(env, d, t, m, dur, vol) {
    const f = mtof(m);
    const len = Math.min(Math.max(dur, 0.4), 1.6);
    tone(env, d, { t, f0: f, dur: len, vol, attack: 0.05, sustain: true, release: len * 0.5, pitched: true });
    tone(env, d, { t, f0: f * 2, dur: len * 0.6, vol: vol * 0.2, attack: 0.05, pitched: true });
  },
  stab(env, d, t, m, dur, vol) {
    tone(env, d, { t, f0: mtof(m), dur: 0.14, vol, type: 'triangle', attack: 0.003, lp: 2400, pitched: true });
  },
};

const DRUM = {
  kick(env, d, t, v) {
    tone(env, d, { t, f0: 150, f1: 45, dur: 0.2, vol: 0.34 * v, attack: 0.002 });
  },
  snare(env, d, t, v) {
    noiseBurst(env, d, { t, dur: 0.14, vol: 0.12 * v, freq: 1900, type: 'bandpass', q: 0.8, attack: 0.002 });
    tone(env, d, { t, f0: 200, f1: 150, dur: 0.1, vol: 0.07 * v, type: 'triangle', attack: 0.002 });
  },
  hat(env, d, t, v) {
    noiseBurst(env, d, { t, dur: 0.045, vol: 0.045 * v, freq: 7500, type: 'highpass', attack: 0.001 });
  },
};

/** Melody of one 2-bar phrase (16 eighth slots): [{ m: midi, slots }] or null per slot. Pure function of its inputs. */
export function makePhrase(def, key) {
  const rng = mulberry32(def.seed * 1009 + key * 7919);
  const mel = [];
  for (let m = def.melLo; m <= def.melHi; m++) if (def.scale.includes(m % 12)) mel.push(m);
  const rhythm = def.rhythm[key % def.rhythm.length];
  const out = new Array(16).fill(null);
  let prev = Math.floor(mel.length * 0.4);
  for (let slot = 0; slot < 16; slot++) {
    if (rhythm[slot] !== 'x') continue;
    const ch = def.chords[(2 * key + (slot >= 8 ? 1 : 0)) % def.chords.length];
    const pcs = QUAL[ch.q].map((i) => (ch.pc + i) % 12);
    let idx = prev;
    if (slot % 4 === 0) {
      // strong beat: the nearest chord tone (random among the two closest)
      const cand = [];
      for (let i = Math.max(0, prev - 3); i <= Math.min(mel.length - 1, prev + 3); i++) if (pcs.includes(mel[i] % 12)) cand.push(i);
      if (cand.length) {
        cand.sort((a, b) => Math.abs(a - prev) - Math.abs(b - prev));
        idx = cand[Math.floor(rng() * Math.min(2, cand.length))];
      }
    } else {
      const r = rng();
      idx = prev + (r < 0.2 ? 0 : r < 0.62 ? 1 : -1);
      if (idx < 0 || idx >= mel.length) idx = prev;
    }
    prev = idx;
    out[slot] = { m: mel[idx], slots: 1 };
  }
  // durations: until the next onset (max 6 slots)
  for (let s = 0; s < 16; s++) {
    if (!out[s]) continue;
    let n = 1;
    while (s + n < 16 && !out[s + n] && n < 6) n++;
    out[s].slots = n;
  }
  return out;
}

/** The layer mix (0..1 each) for the state of the run. */
export function layerMix({ state = 'playing', speedK = 0, chasing = false } = {}) {
  const playing = state === 'playing' || state === 'dying';
  const k = clamp01(speedK);
  if (!playing) {
    const menu = state === 'menu';
    return { pad: 1, bass: menu ? 0.6 : 0.5, arp: 0.7, drums: 0, mel: menu ? 0.8 : 0.3, tension: 0 };
  }
  return {
    pad: 1,
    bass: 0.6 + 0.4 * k,
    arp: 0.55 + 0.45 * k,
    drums: smooth(k, 0.05, 0.35),
    mel: smooth(k, 0.3, 0.7),
    tension: chasing ? 1 : 0,
  };
}

/** One song playing into `dest`: owns a bus, one gain per layer and the step counter. */
export class Song {
  constructor(env, dest, levelId) {
    this.env = env;
    this.id = levelId;
    this.def = LEVELS[levelId];
    const { ctx } = env;
    this.bus = ctx.createGain();
    this.bus.connect(dest);
    this.layers = {};
    this.want = {};
    for (const n of LAYERS) {
      const g = ctx.createGain();
      g.gain.value = 0;
      g.connect(this.bus);
      this.layers[n] = g;
      this.want[n] = 0;
    }
    this.step = 0;
    this.next = 0; // time of the next step
    this.phrases = [];
  }

  stepDur(tempoMul = 1) {
    return 60 / (this.def.bpm * tempoMul) / 4;
  }

  /** Move the layers towards `mix`; `immediate` (offline) sets them at once. */
  setMix(mix, immediate = false) {
    const now = this.env.ctx.currentTime;
    for (const n of LAYERS) {
      const v = mix[n] ?? 0;
      this.want[n] = v;
      const p = this.layers[n].gain;
      if (immediate) p.setValueAtTime(v, now);
      else p.setTargetAtTime(v, now, 0.35);
    }
  }

  /** Schedule every step that starts before `tEnd`. */
  scheduleUntil(tEnd, tempoMul = 1) {
    const sd = this.stepDur(tempoMul);
    while (this.next < tEnd) {
      this.playStep(this.step, this.next, sd);
      this.next += sd;
      this.step++;
    }
  }

  playStep(step, t, sd) {
    const { env, def, layers: L, want } = this;
    const bar = (step / 16) | 0;
    const s = step % 16;
    const ch = def.chords[bar % def.chords.length];
    const iv = QUAL[ch.q];

    if (want.pad > 0.02 && s === 0) {
      const dur = sd * 16 * 1.05;
      const atk = Math.min(0.4, sd * 16 * 0.3);
      iv.forEach((i, n) => {
        const f = mtof(place((ch.pc + i) % 12, 55));
        tone(env, L.pad, { t, f0: f, dur, vol: def.padVol, type: 'sawtooth', lp: def.padLp, attack: atk, sustain: true, release: 0.4, detune: n % 2 ? 7 : -7, pitched: true });
        tone(env, L.pad, { t, f0: f, dur, vol: def.padVol * 1.2, attack: atk, sustain: true, release: 0.4, pitched: true });
      });
    }

    const bc = def.bass[s];
    if (want.bass > 0.02 && bc !== '.') {
      const root = place(ch.pc, 33);
      const m = bc === 'o' ? root + 12 : bc === 'f' ? root + 7 : root;
      const f = mtof(m);
      const dur = sd * 2.4;
      tone(env, L.bass, { t, f0: f, dur, vol: def.bassVol, type: 'triangle', lp: 700, attack: 0.01, pitched: true });
      tone(env, L.bass, { t, f0: f, dur, vol: def.bassVol * 0.7, attack: 0.01, pitched: true });
    }

    const ac = def.arp[s];
    if (want.arp > 0.02 && ac !== '.') {
      const tones = iv.map((i) => place((ch.pc + i) % 12, 60));
      if (ac === 's') {
        for (const m of tones) INSTR.stab(env, L.arp, t, m, sd, def.arpVol * 0.8);
      } else {
        const d = +ac;
        const m = d < tones.length ? tones[d] : tones[d % tones.length] + 12;
        INSTR[def.arpInstr](env, L.arp, t, m, sd * 2, def.arpVol);
      }
    }

    if (want.drums > 0.02) {
      if (def.kick[s] !== '.') DRUM.kick(env, L.drums, t, def.kick[s] === 'o' ? 0.6 : 1);
      if (def.snare[s] !== '.') DRUM.snare(env, L.drums, t, def.snare[s] === 'o' ? 0.6 : 1);
      if (def.hat[s] !== '.') DRUM.hat(env, L.drums, t, def.hat[s] === 'o' ? 0.6 : 1);
    }

    if (want.mel > 0.02 && s % 2 === 0) {
      const key = ((bar / 2) | 0) % 4;
      const ph = this.phrases[key] || (this.phrases[key] = makePhrase(def, key));
      const note = ph[(bar % 2) * 8 + s / 2];
      if (note) INSTR[def.melInstr](env, L.mel, t, note.m, note.slots * sd * 2, def.melVol);
    }

    if (want.tension > 0.02) {
      if (s === 0) {
        const f = mtof(place(ch.pc, 36));
        const dur = sd * 16 * 1.05;
        tone(env, L.tension, { t, f0: f, dur, vol: 0.06, type: 'sawtooth', lp: 260, attack: 0.3, sustain: true, release: 0.4, pitched: true });
        tone(env, L.tension, { t, f0: f * 1.5, dur, vol: 0.03, type: 'sawtooth', lp: 320, attack: 0.3, sustain: true, release: 0.4, detune: 14, pitched: true });
      }
      if (s % 8 === 0 || s % 8 === 2) tone(env, L.tension, { t, f0: 85, f1: 42, dur: 0.18, vol: s % 8 === 0 ? 0.2 : 0.13, attack: 0.002 });
      if (s % 2 === 1) noiseBurst(env, L.tension, { t, dur: 0.03, vol: 0.025, freq: 8000, type: 'highpass' });
    }
  }

  /** Fade out and free everything (the already scheduled notes die with the bus). */
  dispose() {
    try {
      this.bus.disconnect();
      for (const n of LAYERS) this.layers[n].disconnect();
    } catch {
      /* already gone */
    }
  }
}

// ---- live engine -----------------------------------------------------------------------------------------
const STATE_GAIN = { menu: 0.65, playing: 1, dying: 0.5, paused: 0.3, revive: 0.3, gameover: 0.35 };
const STATE_LP = { menu: 9000, playing: 16000, dying: 1500, paused: 800, revive: 800, gameover: 900 };
const AHEAD = 0.5; // seconds scheduled in advance
const TICK_MS = 100;

export class MusicEngine {
  /**
   * @param env    synthesis env (env.pitch = ConstantSourceNode feeding the music oscillators' detune)
   * @param mixer  result of createMixer
   */
  constructor(env, mixer) {
    this.env = env;
    this.mixer = mixer;
    this.song = null;
    this.timer = null;
    this.fadeTimers = new Set();
    this.info = { state: 'menu', biome: 'partie', speedK: 0, chasing: false, timeScale: 1 };
    this.acc = 1;
    this.enabled = false;
  }

  /** Start / stop everything (music off, muted, or the page is not allowed to make sound). */
  setEnabled(on) {
    on = !!on;
    if (on === this.enabled) return;
    this.enabled = on;
    if (on) {
      if (!this.timer) this.timer = setInterval(() => this.tick(), TICK_MS);
      this.acc = 1;
      this.apply(true);
    } else {
      clearInterval(this.timer);
      this.timer = null;
      this.dropSong(this.song, 0.15);
      this.song = null;
    }
  }

  update(dt, info) {
    Object.assign(this.info, info);
    if (!this.enabled) return;
    this.acc += dt;
    if (this.acc < 0.1) return;
    this.acc = 0;
    this.apply(false);
  }

  /** Song of the current level, layer mix, bus level, filter and slow-motion bend. */
  apply(first) {
    const { ctx } = this.env;
    const now = ctx.currentTime;
    const info = this.info;
    if (!this.song || this.song.id !== info.biome) {
      if (!LEVELS[info.biome]) return;
      const old = this.song;
      this.song = new Song(this.env, this.mixer.musicIn, info.biome);
      this.song.next = now + 0.08;
      this.song.bus.gain.setValueAtTime(0.0001, now);
      this.song.bus.gain.linearRampToValueAtTime(1, now + (first || !old ? 0.3 : 0.9));
      this.song.setMix(layerMix(info), true);
      this.dropSong(old, 0.8);
    }
    this.song.setMix(layerMix(info));
    const ts = Math.max(0.3, Math.min(1, info.timeScale ?? 1));
    const slow = 1 - ts; // 0 normal .. ~0.7
    const { musicBus, musicFilter } = this.mixer;
    musicBus.gain.setTargetAtTime(MUSIC_GAIN * (STATE_GAIN[info.state] ?? 1), now, 0.25);
    musicFilter.frequency.setTargetAtTime(Math.min(STATE_LP[info.state] ?? 16000, 16000 - slow * 16000), now, 0.3);
    if (this.env.pitch) this.env.pitch.offset.setTargetAtTime(1200 * Math.log2(0.7 + 0.3 * ts), now, 0.3);
    if (first) this.tick();
  }

  tick() {
    const song = this.song;
    if (!song) return;
    const { ctx } = this.env;
    const now = ctx.currentTime;
    const ts = Math.max(0.3, Math.min(1, this.info.timeScale ?? 1));
    if (song.next < now) song.next = now + 0.03; // the page was busy or hidden: resume without a burst
    song.scheduleUntil(now + AHEAD, 0.6 + 0.4 * ts);
  }

  dropSong(song, fade) {
    if (!song) return;
    const { ctx } = this.env;
    const now = ctx.currentTime;
    song.bus.gain.cancelScheduledValues(now);
    song.bus.gain.setValueAtTime(song.bus.gain.value, now);
    song.bus.gain.linearRampToValueAtTime(0.0001, now + fade);
    const h = setTimeout(() => {
      this.fadeTimers.delete(h);
      song.dispose();
    }, (fade + AHEAD + 0.5) * 1000);
    this.fadeTimers.add(h);
  }
}
