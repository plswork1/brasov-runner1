// Sound: synthesized sound effects + adaptive generative music (Web Audio, no audio files).
// Mobile browsers block audio until the first touch/click, so the context is created/resumed from `unlock()`,
// which main.js calls on the first user gesture. The mute state is remembered by the save module (this file
// never touches localStorage; it gets the initial state and reports changes through `onMutedChange`).
//
// The synthesis lives in src/audio/: synth.js (voices + effect recipes), music.js (songs + live engine),
// mixer.js (compressor / limiter chain), lab.js (offline measurement used by scripts/audio_check.py).
import { EFFECTS, makeEnv, noiseLoop } from './audio/synth.js';
import { createMixer, MASTER_GAIN } from './audio/mixer.js';
import { MusicEngine } from './audio/music.js';
import * as lab from './audio/lab.js';

export class Sfx {
  /**
   * @param opts.muted          initial mute state (from the save)
   * @param opts.onMutedChange  called with the new state when the player toggles the sound
   * @param opts.musicOn        initial state of the music switch (default on)
   * @param opts.onMusicChange  called with the new state when the music switch changes
   */
  constructor({ muted = false, onMutedChange, musicOn = true, onMusicChange } = {}) {
    this.ctx = null;
    this.mixer = null;
    this.env = null;
    this.music = null;
    this.muted = !!muted;
    this._musicOn = !!musicOn;
    this.onMutedChange = onMutedChange;
    this.onMusicChange = onMusicChange;
    this.jetLoop = null;
    this.windLoop = null;
    this._lastCoin = -1;
    this._windT = 0;
  }

  /** Must be called from a user gesture (touch/click/key). Safe to call repeatedly. */
  unlock() {
    try {
      if (!this.ctx) {
        const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.mixer = createMixer(this.ctx);
        const pitch = this.ctx.createConstantSource();
        pitch.offset.value = 0;
        pitch.start();
        this.env = makeEnv(this.ctx, { pitch });
        this.mixer.master.gain.value = this.muted ? 0 : MASTER_GAIN;
        this.music = new MusicEngine(this.env, this.mixer);
        this.windLoop = noiseLoop(this.env, this.mixer.sfx, { type: 'bandpass', freq: 500, q: 0.5 });
      }
      if (this.ctx.state === 'suspended') this.ctx.resume();
      this._syncMusic();
    } catch {
      /* audio is optional */
    }
  }

  get musicOn() {
    return this._musicOn;
  }

  setMusic(on) {
    this._musicOn = !!on;
    this.onMusicChange?.(this._musicOn);
    this._syncMusic();
  }

  setMuted(m) {
    this.muted = !!m;
    this.onMutedChange?.(this.muted);
    if (this.mixer) this.mixer.master.gain.value = this.muted ? 0 : MASTER_GAIN;
    if (m) this.jet(false);
    this._syncMusic();
  }

  /** The music runs only when it is switched on and the sound is not muted (muted = no CPU spent on it). */
  _syncMusic() {
    this.music?.setEnabled(this._musicOn && !this.muted && !!this.ctx);
  }

  /** Per frame (game.js): feeds the music and the wind with the state of the run. */
  update(dt, info) {
    if (!this.ctx || this.muted) return;
    this.music?.update(dt, info);
    const w = this.windLoop;
    if (w) {
      this._windT += dt;
      if (this._windT > 0.1) {
        this._windT = 0;
        const playing = info.state === 'playing' || info.state === 'dying';
        const k = Math.max(0, Math.min(1, info.speedK ?? 0));
        const now = this.ctx.currentTime;
        w.gain.gain.setTargetAtTime(playing ? 0.012 + 0.05 * k * k : 0, now, 0.3);
        w.filter.frequency.setTargetAtTime(350 + 1500 * k, now, 0.3);
      }
    }
  }

  _play(name, ...args) {
    if (!this.ctx || this.muted || !this.env) return;
    try {
      EFFECTS[name](this.env, this.mixer.sfx, this.ctx.currentTime + 0.005, ...args);
    } catch {
      /* audio is optional */
    }
  }

  /** A coin; `streak` is the number of coins in a row (the pitch climbs a pentatonic ladder and resets). */
  coin(streak = 1) {
    // the magnet can collect many coins at once: at most one coin sound every 45 ms
    const now = this.ctx ? this.ctx.currentTime : 0;
    if (now - this._lastCoin < 0.045) return;
    this._lastCoin = now;
    this._play('coin', streak);
  }
  nearMiss(chain = 1) { this._play('nearMiss', chain); }
  combo(streak = 10) { this._play('combo', streak); }
  powerUp(type) { this._play('powerUp', type); }
  shieldBreak() { this._play('shieldBreak'); }
  crown() { this._play('crown'); }
  claim() { this._play('claim'); }
  revive() { this._play('revive'); }
  deny() { this._play('deny'); }
  tap() { this._play('tap'); }
  powerEnd() { this._play('powerEnd'); }
  superJump() { this._play('superJump'); }
  warp() { this._play('warp'); }
  splash() { this._play('splash'); }
  jump() { this._play('jump'); }
  slide() { this._play('slide'); }
  lane() { this._play('lane'); }
  hit() { this._play('hit'); }
  growl() { this._play('growl'); }
  escape() { this._play('escape'); }
  start() { this._play('start'); }
  gameOver() { this._play('gameOver'); }

  /** Continuous jetpack rumble (looping filtered noise). */
  jet(on) {
    if (!this.ctx || !this.env) return;
    const now = this.ctx.currentTime;
    if (on && !this.jetLoop && !this.muted) {
      const l = noiseLoop(this.env, this.mixer.sfx, { type: 'lowpass', freq: 520 });
      l.gain.gain.setValueAtTime(0.0001, now);
      l.gain.gain.exponentialRampToValueAtTime(0.16, now + 0.25);
      this.jetLoop = l;
    } else if (!on && this.jetLoop) {
      const l = this.jetLoop;
      this.jetLoop = null;
      l.gain.gain.cancelScheduledValues(now);
      l.gain.gain.setValueAtTime(Math.max(0.0001, l.gain.gain.value), now);
      l.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
      l.src.stop(now + 0.32);
      l.src.onended = () => {
        l.src.disconnect();
        l.filter.disconnect();
        l.gain.disconnect();
      };
    }
  }
}

// Debug hook for scripts/audio_check.py (not exposed in normal play).
if (typeof location !== 'undefined' && /[?&]debug/.test(location.search)) {
  globalThis.__audioLab = {
    ...lab,
    /** Run the live engine for `secs` real seconds with a fast-changing run; reports the live voice count. */
    async liveSoak(secs = 6) {
      const sfx = new Sfx({ muted: false });
      sfx.unlock();
      const series = [];
      const levels = ['partie', 'republicii', 'tractorul', 'afi', 'noua'];
      const t0 = performance.now();
      let last = t0;
      let n = 0;
      await new Promise((resolve) => {
        const h = setInterval(() => {
          const now = performance.now();
          const dt = (now - last) / 1000;
          last = now;
          const el = (now - t0) / 1000;
          sfx.update(dt, { state: 'playing', biome: levels[Math.floor(el / 1.2) % 5], speedK: Math.min(1, el / 3), chasing: el > 3, timeScale: el > 4 ? 0.5 : 1 });
          if (n++ % 6 === 0) sfx.coin(1 + (n % 12));
          if (n % 50 === 0) series.push(sfx.env.live);
          if (el > secs) {
            clearInterval(h);
            resolve();
          }
        }, 16);
      });
      const result = { state: sfx.ctx && sfx.ctx.state, series, max: Math.max(...series, 0), musicOn: sfx.musicOn };
      sfx.music?.setEnabled(false);
      sfx.ctx?.close();
      return result;
    },
  };
}
