import * as THREE from 'three';
import { CFG, OBSTACLES } from './config.js';
import { Generator } from './logic/generator.js';
import { PlayerState } from './logic/playerState.js';
import { BearState, BearPhase } from './logic/bear.js';
import { speedAt, launchFactor, computeScore } from './logic/speed.js';
import { playerHitsObstacle, playerCollectsCoin, sweptOverlap } from './logic/collision.js';
import { PowerUps, PowerUpSchedule, SkyTrail, CrownSchedule } from './logic/powerups.js';
import { ReviveSession } from './logic/revive.js';
import { emptyRunStats, preview as previewMissions, describe as describeMission } from './logic/missions.js';
import { findItem } from './logic/cosmetics.js';
import { BIOMES, movingS, nextBiome } from './logic/biomes.js';
import { World } from './view/world.js';
import { GateView } from './view/gateView.js';
import { PickupPool, POWER_COLORS } from './view/powerupViews.js';
import { PlayerView } from './view/playerView.js';
import { BearView } from './view/bearView.js';
import { ObstaclePool, CoinPool } from './view/obstacleViews.js';
import { Particles } from './view/particles.js';
import { CameraRig, speedK } from './view/cameraRig.js';
import { GameFx } from './view/fx.js';
import { PostFx } from './view/post.js';

const MAX_FRAME = 0.1; // never simulate more than 100 ms per frame (tab switches, hiccups)
const SUBSTEP = 1 / 120; // physics/collision step: small enough that nothing is skipped at top speed
const DEATH_TIME = 1.5; // seconds of "bear catches you" animation before the game over screen
const IDLE_SPEED = 7; // background scrolling speed on the menu
const WARP_IN = 0.45; // seconds of white-out before the portal
const WARP_OUT = 1.0; // ...and fade back after it

/**
 * Game orchestrator: owns the 3D scene, the run state and the main loop.
 *
 * States: 'menu' -> 'playing' <-> 'paused' -> 'dying' (bear catches you) -> 'revive' ("Continui?")
 *         -> 'playing' again (revived) or 'gameover' -> 'menu'/'playing'
 *
 * v2: the meta game (wallet, missions, battle pass, cosmetics) lives in `meta` (logic/meta.js); the
 * game only reports what happened in a run (`stats`) and asks `meta` for the equipped cosmetics.
 * Rewarded ads go through the `ads` provider (ads/adProvider.js), never through an SDK directly.
 *
 * Levels: the run starts in `startBiome`. After CFG.biome.duration seconds in a level the generator
 * leaves the track empty around a portal (gate); crossing the gate switches the scenery, the ride
 * and the obstacle models to the next level, hidden behind a white "warp" flash.
 *
 * Structure of one frame:
 *   advance(dt)  - simulation (split into 1/120 s substeps): speed, player, bear, collisions, coins
 *   afterSteps() - generate new obstacles ahead, recycle the ones behind
 *   render(dt)   - place meshes, animate, camera, draw
 */
export class Game {
  constructor({ canvas, ui, sfx, leaderboard, meta, ads }) {
    this.canvas = canvas;
    this.ui = ui;
    this.sfx = sfx;
    this.lb = leaderboard;
    this.meta = meta;
    this.ads = ads;

    this.isTouch = typeof matchMedia === 'function' && matchMedia('(pointer: coarse)').matches;
    this.mobile = this.isTouch || Math.min(window.innerWidth, window.innerHeight) < 600;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: !this.mobile,
      powerPreference: 'high-performance',
    });
    this.renderer.setClearColor(0xd7e7f6);
    // Neutral tone mapping keeps the snow white but gives softer, richer colors than none at all
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    // Real shadows from the sun (switched off automatically if the device is too slow)
    this.shadows = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(58, 1, 0.1, 320);
    this.rig = new CameraRig(this.camera);
    this.baseFov = 58;
    // Draw calls and triangles are counted per FRAME (a frame can be several passes, see view/post.js)
    this.renderer.info.autoReset = false;

    // Adaptive quality: pixel-ratio steps (index 0 = best)
    const maxDpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dprSteps = [maxDpr, Math.min(maxDpr, 1.5), 1, 0.75];
    this.qualityLevel = 0;
    this.fpsT = 0;
    this.fpsN = 0;
    this.lowFpsCount = 0;

    this.world = new World(this.scene, {
      mobile: this.mobile,
      shadows: this.shadows,
      anisotropy: Math.min(8, this.renderer.capabilities.getMaxAnisotropy()),
    });
    this.playerView = new PlayerView(this.scene);
    this.bearView = new BearView(this.scene);
    // (transparent effects like the shield bubble are marked `noShadow`)
    for (const root of [this.playerView.root, this.bearView.root]) root.traverse((o) => (o.castShadow = !o.userData.noShadow));
    this.playerView.setBlobShadow(!this.shadows);
    this.obstaclePool = new ObstaclePool(this.scene);
    this.coinPool = new CoinPool(this.scene, { castShadow: !this.mobile });
    this.pickupPool = new PickupPool(this.scene);
    this.particles = new Particles(this.scene, this.mobile ? 260 : 400);
    this.gate = new GateView(this.scene);
    // v3: juice effects and the post-processing of the picture (both purely visual)
    this.fx = new GameFx({ scene: this.scene, camera: this.camera, particles: this.particles, mobile: this.mobile });
    this.post = new PostFx(this.renderer, this.scene, this.camera, { mobile: this.mobile });
    this.frameEvents = []; // what happened since the last drawn frame (for the character animation)
    this.hitStop = 0;
    this.startBiome = 0;
    this.biome = -1;

    this.player = new PlayerState();
    this.bear = new BearState();
    this.powers = new PowerUps();
    this.skyTrail = new SkyTrail();
    this.powerupsEnabled = true; // tests can switch the automatic power-ups off
    this.reviveEnabled = true; // tests can switch the "Continui?" offer off
    this.revive = new ReviveSession();
    this.stats = emptyRunStats();
    this.runOpen = false; // a run whose results were not handed to `meta` yet
    this.preview = null; // wardrobe preview: {kind: 'boy' | 'bear', yaw}
    this.timeScale = 1;
    this.trailId = 'none';
    this.emoji = '';
    this.obstacles = [];
    this.coins = [];
    this.pickups = [];

    this.state = 'menu';
    this.generationEnabled = true;
    this.clock = 0;
    this.last = performance.now();
    this.applyCosmetics();
    this.resetRun();
    this.resize();
    this.loop = this.loop.bind(this);
  }

  /** Put on what is equipped in the wardrobe (safe at any time, also in the middle of a run). */
  applyCosmetics() {
    const eq = this.meta.cosmetics.equipped;
    this.playerView.setSkin(eq.boy);
    this.bearView.setSkin(eq.bear);
    this.trailId = eq.trail;
    this.emoji = findItem('emoji', eq.emoji)?.glyph ?? '';
    this.ui.setEmote?.(this.emoji);
  }

  // ---------------------------------------------------------------------------------------------
  // Run lifecycle
  // ---------------------------------------------------------------------------------------------

  /** Put everything back to the initial state. Used for every restart, so nothing leaks between runs. */
  resetRun() {
    this.closeRun(false); // an abandoned run (restart / menu) still keeps its coins and progress
    this.cancelRevive();
    this.revive = new ReviveSession();
    this.stats = emptyRunStats();
    this.cleanT = 0;
    this.crownsCollected = 0;
    this.banked = { coins: 0, crowns: 0 };
    this.reviveGrace = 0;
    this.timeScale = 1;
    this.announced = new Set();
    this.missionT = 0;
    this.crownSchedule = new CrownSchedule();
    for (const o of this.obstacles) this.obstaclePool.release(o.mesh);
    for (const c of this.coins) this.coinPool.release(c.mesh);
    for (const k of this.pickups) this.pickupPool.release(k.mesh);
    this.obstacles.length = 0;
    this.coins.length = 0;
    this.pickups.length = 0;
    this.generator = new Generator(undefined, this.startBiome);
    this.transitions = [];
    this.transitionPending = false;
    this.biomeStart = 0;
    this.warpOut = WARP_OUT; // (no fade-back running)
    this.gate.hide();
    this.applyBiome(this.startBiome);
    this.schedule = new PowerUpSchedule();
    this.powers.reset();
    this.skyTrail.stop();
    this.jetLanding = false;
    this.rig.reset();
    this.hitStop = 0;
    this.frameEvents.length = 0;
    this.sfx.jet(false);
    this.distance = 0;
    this.runTime = 0;
    this.speed = 0;
    this.slow = 1;
    this.coinsCollected = 0;
    this.deathT = 0;
    this.caughtT = 0;
    this.caught = false;
    this.saved = false;
    this.player.reset();
    this.bear.reset();
    this.playerView.reset();
    this.bearView.reset();
    this.particles.clear();
    this.fx.clear();
    this.populate();
  }

  /** Level picker on the start screen: the menu background shows the chosen level right away. */
  setStartBiome(i) {
    if (i === this.startBiome || i < 0 || i >= BIOMES.length) return;
    this.startBiome = i;
    if (this.state === 'menu') {
      this.resetRun();
      this.speed = IDLE_SPEED;
      if (this.preview) this.setPreview(this.preview); // keep the wardrobe preview on the new level
    }
  }

  /**
   * Wardrobe preview (only on the menu): the camera comes close and the model turns slowly.
   * @param p {kind: 'boy' | 'bear', ride?: string, mode?: string} or null to leave the preview
   */
  setPreview(p) {
    if (this.state !== 'menu') return;
    const B = BIOMES[this.biome];
    if (!p) {
      this.preview = null;
      this.playerView.setRide(B.ride, !!B.winter);
      this.bearView.setMode(B.bear ?? (B.water ? 'swim' : 'run'));
      this.bearView.reset();
      this.playerView.root.visible = true;
      return;
    }
    const kind = p.kind === 'bear' ? 'bear' : 'boy';
    this.preview = { kind, yaw: this.preview?.kind === kind ? this.preview.yaw : 2.5, ride: p.ride, mode: p.mode };
    const ride = p.ride ?? B.ride;
    this.playerView.setRide(ride, p.ride ? ride === 'snowboard' : !!B.winter);
    this.bearView.setMode(p.mode ?? B.bear ?? (B.water ? 'swim' : 'run'));
    if (kind !== 'bear') this.bearView.reset();
  }

  /** Dragging on the canvas turns the model of the wardrobe preview. */
  rotatePreview(dx) {
    if (this.preview) this.preview.yaw += dx * 0.012;
  }

  /** Switch scenery, ride, bear style and colors to biome `i` (instant: hidden by the warp flash). */
  applyBiome(i) {
    if (i === this.biome) return;
    this.biome = i;
    const B = BIOMES[i];
    this.world.setBiome(B.id);
    this.renderer.setClearColor(this.world.env.fog);
    this.renderer.toneMappingExposure = this.world.env.exposure ?? 1.05;
    this.playerView.setRide(B.ride, !!B.winter);
    this.bearView.setMode(B.bear ?? (B.water ? 'swim' : 'run'));
    this.fx.setBiome(B.id, B.ride);
    this.post.setBiome(B.id, this.world.env);
    this.ui.setLevel?.(i, B.name);
  }

  /** The player crossed the portal: new level. */
  enterBiome(i) {
    this.applyBiome(i);
    this.biomeStart = this.runTime;
    this.transitionPending = false;
    this.warpOut = 0;
    this.gate.hide();
    this.rig.addShake(0.25);
    this.emit('level', { id: BIOMES[i].id });
    const B = BIOMES[i];
    this.ui.showLevelTitle?.(B.name, B.subtitle, i);
    this.stats.portals++;
    this.sfx.warp?.();
    const p = this.player;
    this.particles.burst(p.x, p.y + 1.2, -1, 46, 9, 1.1, this.world.env.confetti);
  }

  startRun() {
    if (this.preview) this.setPreview(null);
    this.meta.sync(); // a new day? new missions before the run starts (a run counts for the day it starts in)
    this.resetRun();
    this.runOpen = true;
    this.state = 'playing';
    this.ui.hideAll();
    this.ui.showHud(true);
    this.ui.setBear(null);
    this.ui.setMuted(this.sfx.muted);
    this.sfx.start();
    this.emit('start');
    // v3: the first few runs start with a short reminder of the controls
    if (this.meta.settings.hints < CFG.feel.hintRuns) {
      this.meta.setSetting('hints', this.meta.settings.hints + 1);
      this.ui.showHints?.(this.isTouch);
    } else {
      this.ui.hideHints?.();
    }
  }

  toMenu() {
    this.resetRun();
    this.speed = IDLE_SPEED;
    this.state = 'menu';
    this.preview = null;
    this.ui.hideHints?.();
    this.meta.sync();
    this.ui.showStart(this.lb.getTop());
  }

  pause() {
    if (this.state !== 'playing') return;
    this.state = 'paused';
    this.ui.showPause(true);
  }

  resume() {
    if (this.state !== 'paused') return;
    this.state = 'playing';
    this.ui.showPause(false);
    this.last = performance.now(); // do not count the time spent paused
  }

  /** Called when the tab/app goes to the background or the phone is rotated away. */
  autoPause() {
    if (this.state === 'playing') this.pause();
  }

  finishRun() {
    this.state = 'gameover';
    this.sfx.jet(false);
    const score = this.score;
    this.result = { score, coins: this.coinsCollected, crowns: this.crownsCollected, distance: this.distance };
    const summary = this.closeRun(true);
    const sync = this.meta.sync(); // midnight passed during the run? roll the missions now
    // v3.1: with an account the score is saved by itself, under the account's name: no name to type.
    // (A guest keeps the Top 10 of his device and types a name, as before.)
    const user = this.scoreboard?.user ?? null;
    const before = Math.max(this.lb.getTop()[0]?.score ?? 0, this.scoreboard?.myBest ?? 0);
    if (user && score > 0 && this.lb.qualifies(score)) {
      this.lb.add({ name: user.name, score, coins: this.result.coins, distance: Math.floor(this.distance) });
      this.saved = true;
    }
    this.ui.showGameOver({
      ...this.result,
      auto: !!user,
      record: user ? score > 0 && score > before : undefined,
      qualifies: !user && this.lb.qualifies(score),
      entries: this.lb.getTop(),
      caught: this.caught,
      lastName: this.meta.settings.name,
      xp: summary?.xp ?? 0,
      tiersGained: summary?.tiersGained ?? 0,
      missions: summary?.completed ?? [],
      autoClaimed: sync.granted,
    });
    this.ui.h.onMenuShown?.(); // wallet, badges, a waiting app update
    this.sfx.gameOver();
    if (user && score > 0) this.onAccountScore?.(score);
  }

  submitName(name) {
    if (this.state !== 'gameover' || this.saved || !this.result) return;
    const r = this.lb.add({ name, score: this.result.score, coins: this.result.coins, distance: Math.floor(this.result.distance) });
    this.saved = true;
    this.meta.setSetting('name', r.entry.name);
    this.ui.showSaved(r.entries, r.entry.id, r.rank);
  }

  // ---------------------------------------------------------------------------------------------
  // v2: run results, banking, revive
  // ---------------------------------------------------------------------------------------------

  /** Statistics of the run so far (see logic/missions.js `emptyRunStats`). */
  liveStats() {
    const s = this.stats;
    s.coins = this.coinsCollected;
    s.crowns = this.crownsCollected;
    s.distance = Math.floor(this.distance);
    s.score = this.score;
    s.time = Math.floor(this.runTime);
    s.cleanSeconds = Math.max(s.cleanSeconds, Math.floor(this.cleanT));
    return s;
  }

  /**
   * Put the coins and crowns collected so far into the wallet. Called when the run ends, when the
   * "Continui?" offer appears and whenever the app goes to the background, so closing the app in
   * the middle of a run (or of an ad) never loses them. Only the part not banked yet is added.
   */
  bankRun() {
    if (!this.runOpen) return;
    const coins = this.coinsCollected - this.banked.coins;
    const crowns = this.crownsCollected - this.banked.crowns;
    if (coins <= 0 && crowns <= 0) return;
    this.banked.coins = this.coinsCollected;
    this.banked.crowns = this.crownsCollected;
    this.meta.bank({ coins, crowns });
  }

  /**
   * Hand the results of the run to the meta game: exactly once per run.
   * @param finished false for a run that was abandoned (restart / menu): it keeps its coins and
   *                 mission progress but does not count as a played run
   */
  closeRun(finished) {
    if (!this.runOpen) return null;
    this.bankRun();
    this.runOpen = false;
    const stats = { ...this.liveStats(), runs: finished ? 1 : 0 };
    return this.meta.endRun(stats);
  }

  /** The death animation is over: offer a revive if one is left, otherwise the run ends. */
  afterDeath() {
    if (this.reviveEnabled && this.revive.offer()) {
      this.state = 'revive';
      this.sfx.jet(false);
      this.bankRun(); // crowns found in this run can pay for the revive
      this.ui.showRevive(this.reviveInfo());
    } else {
      this.finishRun();
    }
  }

  reviveInfo(message = '') {
    const r = this.revive;
    const avail = this.ads.isAvailable();
    return {
      cost: r.cost,
      crowns: this.meta.wallet.crowns,
      canPay: this.meta.wallet.crowns >= r.cost,
      used: r.used,
      limit: r.limit,
      adAllowed: r.adAllowed,
      adAvailable: avail.ok,
      adReason: avail.reason ?? '',
      message,
    };
  }

  /** "Continui?" -> pay with crowns. Double taps are harmless (the session only pays from 'offered'). */
  reviveWithCrowns() {
    if (this.state !== 'revive') return false;
    const res = this.revive.payCrowns(this.meta.wallet);
    if (!res.ok) {
      if (res.reason === 'funds') this.ui.showRevive(this.reviveInfo('Nu ai destule Coroane.'));
      return false;
    }
    this.meta.store.save();
    this.doRevive();
    return true;
  }

  /** "Continui?" -> watch an ad. The reward is given only if the provider says the ad was completed. */
  reviveWithAd() {
    if (this.state !== 'revive') return false;
    const avail = this.ads.isAvailable();
    if (!avail.ok) {
      this.ui.showRevive(this.reviveInfo(avail.reason === 'offline' ? 'Reclama nu este disponibilă fără internet.' : 'Reclama nu este disponibilă acum.'));
      return false;
    }
    const session = this.revive;
    const token = session.startAd();
    if (token === null) return false;
    this.ui.setReviveBusy(true);
    this.ads.showRewarded().then((result) => {
      // A restart or "menu" in the meantime replaced the session: this answer belongs to a dead run.
      if (session !== this.revive || this.state !== 'revive') return;
      const out = session.adFinished(token, result?.completed === true);
      if (out === 'revived') this.doRevive();
      else if (out === 'back') this.ui.showRevive(this.reviveInfo('Reclama nu a fost vizionată până la capăt.'));
    }, () => {
      // A provider that breaks its promise (a real SDK throwing): same as an ad that was not watched.
      if (session !== this.revive || this.state !== 'revive') return;
      if (session.adFinished(token, false) === 'back') this.ui.showRevive(this.reviveInfo('Reclama nu a putut fi afișată.'));
    });
    return true;
  }

  declineRevive() {
    if (this.state !== 'revive' || !this.revive.decline()) return false;
    this.ui.hideRevive();
    this.finishRun();
    return true;
  }

  /** Restart / menu while the offer or an ad is showing. */
  cancelRevive() {
    this.revive.cancel();
    this.ads?.cancel();
    this.ui.hideRevive?.();
  }

  /**
   * Back in the run: the bear is gone (so its rule starts fresh: the next hit starts a new 5 s chase),
   * a few seconds of invulnerability, and the track in front of the player is cleared.
   */
  doRevive() {
    this.stats.revives++;
    this.caught = false;
    this.deathT = 0;
    this.caughtT = 0;
    this.bear.reset();
    this.bearView.reset();
    this.player.revive();
    this.jetLanding = false;
    this.reviveGrace = CFG.revive.invulnerable;
    this.slow = CFG.revive.restartSlow;
    this.cleanT = 0;
    // Clear the track ahead. Everything up to the horizon is already generated, so the obstacles are
    // simply removed. After an empty stretch any lane is fine for the next row (lane changes need at
    // most 2 x gen.laneTime, far less than the stretch), so "there is always a way" still holds.
    const clearTo = this.distance + speedAt(this.runTime) * CFG.revive.clearTime;
    let w = 0;
    for (const o of this.obstacles) {
      if ((o.rowS ?? o.s) <= clearTo) this.obstaclePool.release(o.mesh);
      else this.obstacles[w++] = o;
    }
    this.obstacles.length = w;
    this.state = 'playing';
    this.last = performance.now();
    this.ui.hideRevive();
    this.ui.showHud(true);
    this.ui.setBear(null);
    this.sfx.revive?.();
    this.emit('revive');
    const p = this.player;
    this.particles.burst(p.x, p.y + 1.0, 0, 40, 7, 0.9, [0xffe27a, 0xffffff, 0xff6fd8]);
  }

  /** True while nothing can hurt the player (after a hit, after a broken shield, after a revive). */
  get invulnerable() {
    return this.bear.invulnerable || this.powers.shieldGrace > 0 || this.reviveGrace > 0;
  }

  /** Show the equipped emoji above the HUD (key E / the HUD button / automatically after an escape). */
  emote() {
    if (this.emoji && (this.state === 'playing' || this.state === 'paused')) this.ui.showEmote?.(this.emoji);
  }

  /** Input actions (only valid while playing). Returned object is handed to Input / used by tests. */
  get actions() {
    const playing = () => this.state === 'playing';
    return {
      left: () => playing() && this.player.moveLane(-1),
      right: () => playing() && this.player.moveLane(1),
      jump: () => playing() && this.player.jump(),
      slide: () => playing() && this.player.slide(),
      pause: () => {
        if (this.state === 'playing') this.pause();
        else if (this.state === 'paused') this.resume();
      },
      enter: () => {
        // (on the menu only from the start screen itself, not from Misiuni / Pass / Garderobă)
        if (this.state === 'menu') this.ui.startVisible() && this.startRun();
        else if (this.state === 'paused') this.resume();
        else if (this.state === 'gameover' && this.ui.el.nameForm.hidden) this.startRun();
      },
      emote: () => this.emote(),
      drag: (dx) => this.rotatePreview(dx),
    };
  }

  // ---------------------------------------------------------------------------------------------
  // Spawning / recycling
  // ---------------------------------------------------------------------------------------------

  /** Generate everything up to the horizon in front of the player and create meshes for it. */
  populate() {
    if (!this.generationEnabled) return; // only switched off by tests that place obstacles by hand
    const v = Math.max(this.speed, speedAt(this.runTime) * 0.5);
    let clear = null;
    if (this.powers.active('jetpack')) {
      // Keep the landing spot free of obstacles, and lay a coin trail in the sky until then.
      const landS = this.distance + v * this.powers.remaining.jetpack;
      clear = { from: landS - v * 1.0 - 6, to: landS + v * 1.6 + 6 };
      const until = Math.min(this.distance + CFG.gen.ahead, landS - v * 1.2);
      for (const d of this.skyTrail.emit(until, CFG.power.jetHeight + CFG.power.skyCoinY)) this._addCoin(d);
    }
    const out = this.generator.ensure(this.distance, speedAt(this.runTime), this.runTime, { clear });
    for (const t of out.transitions) {
      this.transitions.push(t);
      this.gate.show(t.gateS, t.biome);
    }
    for (const d of out.powerups) {
      const mesh = this.pickupPool.acquire(d.type);
      this.pickups.push({ ...d, mesh, taken: false });
    }
    for (const d of out.obstacles) {
      const mesh = this.obstaclePool.acquire(d.type);
      const cx = (d.lanes.reduce((a, b) => a + b, 0) / d.lanes.length) * CFG.laneW;
      mesh.position.x = cx;
      const o = { ...d, mesh, ghost: false, knockT: 0 };
      if (o.rowS !== undefined) o.s = movingS(o, this.distance);
      this.obstacles.push(o);
    }
    for (const d of out.coins) this._addCoin(d);
  }

  _addCoin(d) {
    const mesh = this.coinPool.acquire();
    this.coins.push({ ...d, x: d.lane * CFG.laneW, mesh, spin: Math.random() * 6, pull: false, rel: 0, pullT: 0 });
  }

  /** Release everything that is behind the player. */
  cull() {
    const minS = this.distance - CFG.gen.behind;
    let w = 0;
    for (let i = 0; i < this.obstacles.length; i++) {
      const o = this.obstacles[i];
      if (o.s < minS) this.obstaclePool.release(o.mesh);
      else this.obstacles[w++] = o;
    }
    this.obstacles.length = w;
    w = 0;
    for (let i = 0; i < this.coins.length; i++) {
      const c = this.coins[i];
      if (c.s < minS) this.coinPool.release(c.mesh);
      else this.coins[w++] = c;
    }
    this.coins.length = w;
    w = 0;
    for (let i = 0; i < this.pickups.length; i++) {
      const k = this.pickups[i];
      if (k.taken || k.s < minS) {
        if (!k.taken) this.pickupPool.release(k.mesh);
      } else this.pickups[w++] = k;
    }
    this.pickups.length = w;
  }

  // ---------------------------------------------------------------------------------------------
  // Simulation
  // ---------------------------------------------------------------------------------------------

  advance(dt) {
    let remaining = Math.min(dt, MAX_FRAME);
    while (remaining > 1e-9 && (this.state === 'playing' || this.state === 'dying')) {
      const h = Math.min(remaining, SUBSTEP);
      this.simStep(h);
      remaining -= h;
    }
    this.populate();
    this.cull();
  }

  simStep(realH) {
    const dying = this.state === 'dying';
    // v2: "Ceasul din Piața Sfatului" slows the WORLD down. `h` is game time (what the player, the
    // obstacles and the other power-ups feel), `realH` is real time (the bear's 5 s and the clock
    // itself). Without the clock both are the same.
    this.timeScale = dying ? 1 : this.powers.stepTimeScale(realH);
    const h = realH * this.timeScale;
    if (!dying) {
      this.runTime += h;
      // Speed = natural curve * launch ramp * (temporary slowdown after a hit)
      this.slow += (1 - this.slow) * (1 - Math.exp(-CFG.hitSlowRecover * h));
      this.speed = speedAt(this.runTime) * launchFactor(this.runTime) * this.slow;
    } else {
      this.speed *= Math.exp(-4.5 * h); // skid to a stop
      this.deathT += h;
      this.caughtT += h;
    }

    const prevS = this.distance;
    if (!dying) {
      // Time for the next level? The generator then clears the track ahead and places the portal.
      if (!this.transitionPending && this.runTime - this.biomeStart >= CFG.biome.duration) {
        this.generator.requestTransition(nextBiome(this.biome));
        this.transitionPending = true;
      }
      for (const type of this.powers.update(h, realH)) this.onPowerEnd(type);
      this.player.superJump = this.powers.active('board');
      // One item at a time: nothing new is asked for while the generator still has one to place.
      if (this.powerupsEnabled && this.generator.pendingPower === null) {
        const blocked = this.powers.active('jetpack') || this.jetLanding;
        const type = this.schedule.poll(this.runTime, blocked);
        if (type) this.generator.requestPowerUp(type);
        else if (this.crownSchedule.poll(this.runTime, blocked)) this.generator.requestPowerUp('crown');
      }
      if (this.reviveGrace > 0) this.reviveGrace = Math.max(0, this.reviveGrace - h);
      this.cleanT += realH;
    }
    this.player.update(h);
    this.distance += this.speed * h;
    this.handlePlayerEvents();
    for (const o of this.obstacles) if (o.rowS !== undefined) o.s = movingS(o, this.distance);
    const tr = this.transitions[0];
    if (tr && !dying && this.distance >= tr.gateS) {
      this.transitions.shift();
      this.enterBiome(tr.biome);
    }

    if (!dying) {
      const ev = this.bear.update(realH); // the bear is never slowed: its chase lasts 5 real seconds
      if (ev === 'escaped') {
        this.emit('escape');
        this.sfx.escape();
        this.stats.escapes++;
        if (this.emoji) this.ui.showEmote?.(this.emoji);
      }
      // Flying, and the moment right after the jetpack landing, are safe from obstacles
      const safe = this.player.flying || this.jetLanding || this.powers.landGrace > 0;
      if (!safe) this.checkCollisions(prevS);
      if (this.state === 'playing') {
        this.collectCoins(prevS, h);
        this.collectPickups(prevS);
      }
    } else if (this.deathT >= DEATH_TIME) {
      this.afterDeath();
    }
  }

  checkCollisions(prevS) {
    const box = this.player.box();
    for (const o of this.obstacles) {
      if (o.ghost) continue;
      const hs = o.rowS ?? o.s; // moving obstacles meet the player at their row
      if (hs > this.distance + 8 || hs < prevS - 8) continue;
      if (!playerHitsObstacle(prevS, this.distance, box, o)) continue;
      // Re-evaluated for every obstacle: right after the first hit the grace period starts, so the
      // rest of the same obstacle cluster is harmless instead of instantly "catching" the player.
      if (this.invulnerable) {
        o.ghost = true;
        continue;
      }
      this.onHit(o);
      if (this.state !== 'playing') break;
    }
  }

  /** v3: tell the purely visual parts (effects, camera, character animation) what just happened. */
  emit(event, data) {
    const p = this.player;
    const d = { x: p.x, y: p.y, ...data };
    this.fx.on(event, d);
    this.rig.on(event, d);
    if (this.frameEvents.length < 32) this.frameEvents.push(event);
  }

  /** A short vibration on phones (does nothing where it is not supported or not allowed). */
  haptic(pattern) {
    if (!this.isTouch || this.hapticsOff) return;
    try {
      navigator.vibrate?.(pattern);
    } catch {
      /* not allowed: fine */
    }
  }

  /** Score of the run so far: distance + coins. */
  get score() {
    return computeScore(this.distance, this.coinsCollected);
  }

  onHit(o) {
    const p = this.player;
    // v2: the shield takes the hit: the obstacle is smashed, the bear rules are not touched at all
    // (no chase starts; a chase that is already running goes on, but this hit does not catch you).
    if (this.powers.absorbHit()) {
      o.ghost = true;
      o.knockT = 0;
      this.stats.shieldBlocks++;
      this.rig.addShake(0.5);
      this.hitStop = CFG.feel.hitStop;
      this.emit('hit', { result: 'shield' });
      this.haptic(30);
      this.sfx.shieldBreak?.();
      this.particles.burst(p.x, p.y + 1.0, 0, 34, 8, 0.8, [0x6dffa0, 0xffffff, 0xc9ffd9]);
      return;
    }
    const result = this.bear.hit();
    o.ghost = true;
    o.knockT = 0;
    if (result !== 'ignored') {
      this.stats.hits++;
      this.stats.cleanSeconds = Math.max(this.stats.cleanSeconds, Math.floor(this.cleanT));
      this.cleanT = 0;
      this.emit('hit', { result });
      this.hitStop = result === 'caught' ? CFG.feel.hitStopCaught : CFG.feel.hitStop;
      this.haptic(result === 'caught' ? [60, 40, 120] : 60);
    }
    if (result === 'chase-start') {
      this.slow = CFG.hitSlow;
      this.rig.addShake(0.8);
      this.ui.flash();
      this.sfx.hit();
      this.sfx.growl();
      this.playerView.startTumble();
      this.particles.burst(p.x, p.y + 0.9, 0, 26, 7, 0.8, [0xffffff, 0xcfe8ff, 0xa9d6f5]);
    } else if (result === 'caught') {
      this.caught = true;
      this.state = 'dying';
      this.deathT = 0;
      this.caughtT = 0;
      this.rig.addShake(1.1);
      this.ui.flash();
      this.ui.setBear(null);
      this.sfx.hit();
      this.sfx.growl();
      this.particles.burst(p.x, p.y + 0.9, 0.5, 34, 8, 0.9, [0xffffff, 0xcfe8ff, 0xff9d8a]);
    }
  }

  collectCoins(prevS, h = 1 / 120) {
    const p = this.player;
    const box = p.box();
    const magnet = this.powers.active('magnet');
    const range = CFG.power.magnetRange;
    const k = 1 - Math.exp(-12 * h);
    const tx = p.x;
    const ty = p.y + 1.0;
    let removed = false;
    for (const c of this.coins) {
      if (c.collected) continue;
      const ahead = c.s - this.distance;
      // Magnet: every coin in front of the player, in ANY lane, flies to him
      if (magnet && !c.pull && ahead < range && ahead > -1.5) {
        c.pull = true;
        c.rel = ahead;
        c.pullT = 0;
      }
      if (c.pull) {
        // The flight is computed RELATIVE to the player. (It used to chase his absolute position,
        // which lags ~2.7 units behind at top speed: such coins followed him forever, never caught.)
        // A pulled coin is always collected, also after the magnet has run out.
        c.pullT += h;
        c.rel += (0.2 - c.rel) * k;
        c.x += (tx - c.x) * k;
        c.y += (ty - c.y) * k;
        c.s = this.distance + c.rel;
        const near = Math.abs(c.rel) < 1.0 && Math.abs(c.x - tx) < 0.9 && Math.abs(c.y - ty) < 1.4;
        if (!near && c.pullT < 0.9) continue;
      } else {
        if (c.s > this.distance + 4 || c.s < prevS - 4) continue;
        if (!playerCollectsCoin(prevS, this.distance, box, c)) continue;
      }
      c.collected = true;
      removed = true;
      this.coinsCollected++;
      this.sfx.coin();
      this.emit('coin', { cx: c.x, cy: c.y });
      this.particles.burst(c.x, c.y, 0, 7, 3.2, 0.45, [0xffe27a, 0xffcf3f, 0xffffff]);
      this.coinPool.release(c.mesh);
    }
    if (removed) this.coins = this.coins.filter((c) => !c.collected);
  }

  /** Glowing power-up items on the slope. */
  collectPickups(prevS) {
    const p = this.player;
    for (const k of this.pickups) {
      if (k.taken) continue;
      if (!sweptOverlap(prevS, this.distance, CFG.player.halfDepth + 0.4, k.s, 0.5)) continue;
      if (Math.abs(k.lane * CFG.laneW - p.x) > CFG.laneW * 0.45 + CFG.player.halfW) continue;
      if (!p.flying && p.y > CFG.power.pickupY + 0.9) continue; // jumped over it
      k.taken = true;
      this.pickupPool.release(k.mesh);
      this.applyPickup(k.type);
    }
  }

  /** An item was picked up: a power-up, or the rare crown (premium currency). */
  applyPickup(type) {
    if (type !== 'crown') return this.activatePower(type);
    this.crownsCollected++;
    this.emit('pickup', { type });
    this.sfx.crown?.();
    const p = this.player;
    this.particles.burst(p.x, p.y + 1.0, 0, 26, 6, 0.9, [POWER_COLORS.crown, 0xffe27a, 0xffffff]);
  }

  activatePower(type) {
    this.powers.activate(type);
    this.stats.powers++;
    this.emit('pickup', { type });
    this.sfx.powerUp(type);
    const p = this.player;
    const c = POWER_COLORS[type];
    this.particles.burst(p.x, p.y + 1.0, 0, 30, 6, 0.8, [c, 0xffffff, c]);
    if (type === 'jetpack') {
      this.jetLanding = false;
      p.startFlight();
      this.skyTrail.start(this.distance + 14, p.lane);
    }
  }

  onPowerEnd(type) {
    this.emit('powerEnd', { type });
    this.sfx.powerEnd();
    if (type === 'jetpack') {
      this.player.endFlight();
      this.jetLanding = true; // protected until touching the snow (+ a short grace after)
      this.skyTrail.stop();
    }
  }

  handlePlayerEvents() {
    const p = this.player;
    for (const e of p.takeEvents()) {
      const fx = this.groundFx();
      this.emit(e, e === 'lane' ? { dir: Math.sign(p.lane * CFG.laneW - p.x) || 1 } : undefined);
      if (e === 'jump') {
        this.stats.jumps++;
        this.sfx.jump();
        this.particles.burst(p.x, 0.15, 0.2, fx.n, fx.speed, 0.4, fx.colors);
      } else if (e === 'superjump') {
        this.stats.jumps++;
        this.sfx.superJump();
        this.particles.burst(p.x, 0.15, 0.2, 18, 5, 0.5, [0xffe27a, 0xffffff, 0xffc531]);
      } else if (e === 'land') {
        if (this.jetLanding) {
          this.jetLanding = false;
          this.powers.landGrace = CFG.power.jetLandGrace;
          this.rig.addShake(0.35);
        }
        // a big splash on the lake, a puff of snow on the slope, a little dust on the stones
        this.particles.burst(p.x, 0.15, 0.2, fx.n + 4, fx.speed * 1.2, 0.5, fx.colors);
        if (fx.splash) this.sfx.splash?.();
      } else if (e === 'slide') {
        this.stats.slides++;
        this.sfx.slide();
      } else if (e === 'lane') {
        this.stats.laneChanges++;
        this.sfx.lane();
      }
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------------------------------

  /** Place meshes of obstacles and coins for the current distance. */
  syncEntities(dt) {
    const d = this.distance;
    const t = this.clock;
    // (wardrobe preview: the track is shown empty, so nothing drives through the close-up camera)
    const show = !(this.preview && this.state === 'menu');
    for (const o of this.obstacles) {
      const m = o.mesh;
      if (o.rowS !== undefined) o.s = movingS(o, d);
      m.position.z = -(o.s - d);
      // Obstacles of the next level stay hidden until the portal has switched the scenery.
      m.visible = show && (o.biome === undefined || o.biome === this.biome);
      if (o.ghost) {
        // Hit obstacles get smashed away: they pop up, spin and shrink.
        o.knockT += dt;
        const k = Math.min(1, o.knockT / 0.45);
        m.scale.setScalar(Math.max(0.001, 1 - k));
        m.position.y = k * 2.5;
        m.rotation.z = k * 2.5;
      } else if (m.userData.animate) {
        // per-model animation (rolling snowball, pedalling cyclists, swaying willows...).
        // `travel` = how far a moving obstacle has come so far.
        const travel = o.rowS !== undefined ? o.rowS + OBSTACLES[o.type].move.run - o.s : 0;
        m.userData.animate(travel, t, o.s);
      }
    }
    for (const c of this.coins) {
      c.mesh.visible = show;
      c.mesh.position.set(c.x, c.y + Math.sin(t * 3 + c.spin) * 0.06, -(c.s - d));
      c.mesh.rotation.y = t * (c.pull ? 12 : 4) + c.spin;
    }
    for (const k of this.pickups) {
      const m = k.mesh;
      m.visible = show && !k.taken;
      const y = CFG.power.pickupY + Math.sin(t * 2.6 + k.s) * 0.15;
      m.position.set(k.lane * CFG.laneW, y, -(k.s - d));
      const spin = m.getObjectByName('spin');
      spin.rotation.y = t * 2.2;
      const halo = m.getObjectByName('halo');
      halo.scale.setScalar(2.2 + Math.sin(t * 5) * 0.25);
      const ring = m.getObjectByName('ring');
      ring.position.y = -y + 0.04;
      ring.scale.setScalar(1 + Math.sin(t * 5) * 0.12);
    }
  }

  /** Particles for jumps and landings, depending on the ground of the level. */
  groundFx() {
    const ride = BIOMES[this.biome].ride;
    if (ride === 'boat') return { n: 16, speed: 4.5, colors: [0xffffff, 0xd6f1f6, 0x9fd6e0], splash: true };
    if (ride === 'skate' || ride === 'bike') return { n: 5, speed: 2, colors: [0xd8d2c8, 0xeeeeee] };
    return { n: 8, speed: 3, colors: [0xffffff, 0xdbeafc] };
  }

  /** v2: the equipped cosmetic trail (purely visual; a few particles per frame from the shared pool). */
  emitTrail() {
    const id = this.trailId;
    if (id === 'none') return;
    const p = this.player;
    this.trailTick = (this.trailTick ?? 0) + 1;
    if (this.mobile && this.trailTick % 2) return; // half the particles on phones
    const y = p.y;
    const r = Math.random;
    if (id === 'fulgi') {
      this.particles.emit(p.x + (r() - 0.5) * 1.0, y + 0.4 + r() * 1.3, 0.8, (r() - 0.5) * 1.2, 2.2 + r(), 0, 0.8, r() < 0.5 ? 0xffffff : 0xbfe3ff);
    } else if (id === 'scantei') {
      this.particles.emit(p.x + (r() - 0.5) * 0.5, y + 0.2, 0.9, (r() - 0.5) * 3, 3 + r() * 3, 0, 0.5, r() < 0.5 ? 0xffd75e : r() < 0.5 ? 0xffffff : 0xff9f1c);
    } else if (id === 'frunze') {
      const c = [0xe07a1f, 0xc8443a, 0x8d5a2b, 0xf2b441];
      this.particles.emit(p.x + (r() - 0.5) * 1.2, y + 0.5 + r(), 1.0, (r() - 0.5) * 2.5, 2.5 + r() * 1.5, 0, 0.9, c[(r() * c.length) | 0]);
    } else if (id === 'tricolor') {
      const c = [0x2a5bd7, 0xfcd116, 0xe5303f];
      for (let i = 0; i < 3; i++) this.particles.emit(p.x + (i - 1) * 0.24, y + 0.3, 0.9, 0, 1.2, 0, 0.7, c[i]);
    }
  }

  /** Spray behind the ride: snow on the slope, nothing on stone floors, water + wake on the lake. */
  emitRideParticles() {
    const p = this.player;
    const ride = BIOMES[this.biome].ride;
    if (ride === 'snowboard') {
      const n = p.sliding ? 3 : 1;
      for (let i = 0; i < n; i++) {
        this.particles.emit(p.x + (Math.random() - 0.5) * 0.4, 0.12, 0.9, (Math.random() - 0.5) * 2.2, 1.2 + Math.random() * 1.6, 0, 0.45 + Math.random() * 0.25, Math.random() < 0.5 ? 0xffffff : 0xdbeafc);
      }
    } else if (ride === 'boat') {
      // foam wake from both floats + droplets from the paddle wheel
      for (const sx of [-0.55, 0.55]) {
        this.particles.emit(p.x + sx, 0.06, 1.3, sx * 2.2, 0.4 + Math.random() * 0.6, 0, 0.7 + Math.random() * 0.3, Math.random() < 0.5 ? 0xffffff : 0xd6f1f6);
      }
      if (Math.random() < 0.7) this.particles.emit(p.x + (Math.random() - 0.5) * 0.5, 0.35, 1.5, (Math.random() - 0.5) * 1.5, 2 + Math.random() * 2.5, 1, 0.45, 0xe8fbff);
      if (Math.abs(p.laneVel) > 3 && Math.random() < 0.8) {
        this.particles.emit(p.x - Math.sign(p.laneVel) * 0.9, 0.1, 0.2, -Math.sign(p.laneVel) * 3, 2.5, 0, 0.5, 0xffffff);
      }
    }
  }

  /**
   * Portal effects: the gate glows and pulls particles in, the screen fades to white just before it,
   * the level is switched behind the white (in simStep), then the picture fades back with a title.
   */
  updateWarp(dt) {
    const tr = this.transitions[0];
    let white = 0;
    this.warpAmt = 0;
    if (tr) {
      const secs = (tr.gateS - this.distance) / Math.max(this.speed, 4);
      this.gate.update(this.distance, this.clock, secs);
      if (secs < WARP_IN) white = Math.min(1, (1 - secs / WARP_IN) ** 2);
      this.warpAmt = THREE.MathUtils.clamp(1 - secs / 1.6, 0, 1);
      // streaks of light rushing from the portal toward the player
      if (secs < 3 && secs > 0 && dt > 0 && this.state === 'playing') {
        const c = this.gate.colors;
        for (let i = 0; i < 3; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = 1.5 + Math.random() * 3.5;
          this.particles.emit(Math.cos(a) * r, 2.6 + Math.sin(a) * r * 0.8, -(tr.gateS - this.distance) + 2, -Math.cos(a) * 2, 1.5, 10 + Math.random() * 6, 0.8, c[(Math.random() * c.length) | 0]);
        }
      }
    }
    if (this.warpOut < WARP_OUT) {
      this.warpOut += dt;
      white = Math.max(white, 1 - this.warpOut / WARP_OUT);
      this.warpAmt = Math.max(this.warpAmt, 1 - this.warpOut / WARP_OUT);
    }
    this.ui.setWarp?.(white);
  }

  /** Jetpack flames/smoke and golden sparkles from the super board. */
  emitPowerParticles() {
    const p = this.player;
    if (p.flying) {
      for (const sx of [-0.25, 0.1]) {
        this.particles.emit(p.x + sx, p.y + 0.55, 0.35, (Math.random() - 0.5) * 0.6, -6 - Math.random() * 3, 1.5, 0.35, Math.random() < 0.6 ? 0xffa23a : 0xfff0b0);
      }
      if (Math.random() < 0.5) this.particles.emit(p.x, p.y + 0.3, 0.6, (Math.random() - 0.5) * 1.2, -2, 2.5, 0.7, 0xeef4fb);
    }
    if (this.powers.active('board') && Math.random() < 0.7) {
      this.particles.emit(p.x + (Math.random() - 0.5) * 0.5, p.y + 0.12, 0.9, (Math.random() - 0.5) * 1.5, 1 + Math.random() * 1.5, 0.5, 0.5, Math.random() < 0.5 ? 0xffd75e : 0xffffff);
    }
  }

  /** Wardrobe camera: close to the model, which sits in the part of the screen the panel leaves free. */
  updatePreviewCamera() {
    const aspect = this.camera.aspect;
    const bear = this.preview.kind === 'bear';
    // Size of what must fit (the model turns, so its width is its longest side): height H, width W.
    const H = bear ? 3.3 : 2.4;
    const W = bear ? 4.4 : 2.7;
    const fov = THREE.MathUtils.degToRad(this.baseFov);
    const tan = Math.tan(fov / 2);
    if (aspect < 1.25) {
      // phones / narrow windows: the panel is a sheet at the bottom, the model fills the upper half.
      // The distance comes from the field of view, so it fits at every aspect ratio (found with a
      // square window: a fixed distance cut the head off).
      const dist = Math.max(H / (0.4 * 2 * tan), W / (0.92 * 2 * tan * aspect));
      const camY = H * 0.42;
      this.camera.position.set(0, camY, dist);
      this.camera.lookAt(0, camY - dist * Math.tan(fov * 0.235), 0);
    } else {
      // wide screens: the panel is on the right, the model stands left of the middle
      const dist = Math.max(H / (0.58 * 2 * tan), W / (0.42 * 2 * tan * aspect));
      const shift = tan * aspect * dist * 0.4;
      this.camera.position.set(shift, H * 0.62, dist);
      this.camera.lookAt(shift, H * 0.44, 0);
    }
    if (Math.abs(this.baseFov - this.camera.fov) > 0.05) {
      this.camera.fov = this.baseFov;
      this.camera.updateProjectionMatrix();
    }
  }

  updateCamera(dt) {
    if (this.preview && this.state === 'menu') return this.updatePreviewCamera();
    this.rig.update(dt, {
      player: this.player,
      speed: this.speed * this.timeScale,
      speedK: speedK(this.speed * this.timeScale),
      baseFov: this.baseFov,
      warp: this.warpAmt || 0,
      chase: this.bearView.riding && this.bearView.root.visible,
      lifted: this.player.flying || this.jetLanding,
    });
  }

  render(dt) {
    this.renderer.info.reset(); // (counted per frame, see the constructor)
    this.clock += dt;
    const playing = this.state === 'playing';
    const dying = this.state === 'dying';
    const gameover = this.state === 'gameover';

    // The menu/background keeps scrolling slowly so the scene feels alive
    if (this.state === 'menu') this.distance += IDLE_SPEED * dt;

    // What the eye sees moves at the slowed speed while the clock is active.
    const viewSpeed = this.speed * this.timeScale;
    const preview = this.state === 'menu' ? this.preview : null;
    if (preview && dt > 0) preview.yaw += dt * 0.5; // slow turntable

    this.syncEntities(dt);
    this.world.update(this.distance, viewSpeed, dt, this.camera, this.player.x);
    this.updateWarp(dt);
    this.ui.setSlowmo?.(playing || this.state === 'paused' ? (1 - this.timeScale) / (1 - CFG.power.slowScale) : 0);

    this.playerView.update(this.player, dt, {
      invulnerable: playing && (this.invulnerable || this.powers.landGrace > 0),
      dead: this.caught && (dying || gameover || this.state === 'revive'),
      riding: !gameover && !this.caught,
      speed: viewSpeed,
      speedK: speedK(viewSpeed),
      events: this.frameEvents, // v3: 'jump', 'land', 'lane', 'coin', 'hit' ... since the last frame
      state: this.state,
      previewYaw: preview ? preview.yaw : undefined,
      power: {
        magnet: this.powers.active('magnet'),
        board: this.powers.active('board'),
        jetpack: this.powers.active('jetpack') || this.jetLanding,
        shield: this.powers.active('shield'),
        slowmo: this.powers.active('slowmo'),
        ending: {
          magnet: this.powers.ending('magnet'),
          board: this.powers.ending('board'),
          jetpack: this.powers.ending('jetpack') || this.jetLanding,
          shield: this.powers.ending('shield'),
          slowmo: this.powers.ending('slowmo'),
        },
      },
    });
    this.sfx.jet(playing && this.player.flying);
    if (playing && dt > 0) this.emitPowerParticles();

    this.bearView.caughtT = this.caughtT;
    if (preview?.kind === 'bear') {
      // wardrobe: the bear stands where the boy usually is and turns slowly
      this.playerView.root.visible = false;
      this.playerView.shadow.visible = false;
      this.bearView.showcase(0, 0, preview.yaw, dt, IDLE_SPEED * 2);
    } else {
      this.bearView.update(this.bear, this.player.x, dt, this.speed);
    }

    // Snow spray behind the board / water spray and wake behind the pedal boat
    if ((playing || this.state === 'menu') && this.player.grounded && dt > 0 && preview?.kind !== 'bear') this.emitRideParticles();
    if ((playing || this.state === 'menu') && dt > 0 && preview?.kind !== 'bear') this.emitTrail();
    if (this.bearView.root.visible && BIOMES[this.biome].water && dt > 0 && Math.random() < 0.6) {
      const z = this.bearView.root.position.z;
      const bx = this.bearView.root.position.x;
      if (this.bearView.mode === 'hydro') {
        // the paddle wheel churns the water: droplets thrown up and back + foam at the pontoons
        this.particles.emit(bx + (Math.random() - 0.5) * 0.5, 0.5, z + 0.4, (Math.random() - 0.5) * 1.5, 3 + Math.random() * 3, 3, 0.55, Math.random() < 0.5 ? 0xffffff : 0xbfe6f0);
        const sx = Math.random() < 0.5 ? -0.85 : 0.85;
        this.particles.emit(bx + sx * 0.85, 0.08, z - 0.4, sx * 1.5, 0.6, 0, 0.6, 0xe8fbff);
      } else {
        this.particles.emit(bx + (Math.random() - 0.5) * 1.6, 0.1, z - 1.2, (Math.random() - 0.5) * 2, 2 + Math.random() * 2, 0, 0.5, Math.random() < 0.5 ? 0xffffff : 0xbfe6f0);
      }
    }
    this.particles.update(dt, viewSpeed);
    const k = speedK(viewSpeed);
    this.fx.update(dt, {
      state: this.state,
      player: this.player,
      speed: viewSpeed,
      speedK: k,
      distance: this.distance,
      timeScale: this.timeScale,
      chasing: this.bear.phase === BearPhase.CHASING,
    });
    // (the sound can follow the run too: music layers, wind ... `update` is optional)
    this.sfx.update?.(dt, { state: this.state, biome: BIOMES[this.biome].id, speedK: k, chasing: this.bear.phase === BearPhase.CHASING, timeScale: this.timeScale, flying: this.player.flying });
    this.frameEvents.length = 0;

    this.updateCamera(dt);

    if (playing || dying) {
      this.ui.setHud(this.score, this.coinsCollected, Math.round(viewSpeed * 3), this.crownsCollected);
      this.ui.setBear(this.bear.phase === BearPhase.CHASING ? this.bear.remainingFraction : null);
    }
    if (playing && dt > 0) this.announceMissions(dt);

    this.post.render(dt);
  }

  /** A short note on screen the moment a mission is completed by the run in progress (twice a second). */
  announceMissions(dt) {
    this.missionT += dt;
    if (this.missionT < 0.5) return;
    this.missionT = 0;
    for (const m of previewMissions(this.meta.missions, this.liveStats())) {
      const key = `${m.scope}:${m.id}`;
      if (!m.complete || m.claimed || this.announced.has(key)) continue;
      this.announced.add(key);
      // (missions that were already complete before this run are not announced again)
      const entry = this.meta.missions[m.scope].list.find((e) => e.id === m.id);
      if (!entry || entry.progress >= m.goal) continue;
      this.ui.toast?.(`Misiune îndeplinită: ${describeMission(m.scope, entry)}`, 'good');
      this.sfx.claim?.();
    }
  }

  // ---------------------------------------------------------------------------------------------
  // Main loop, resize, adaptive quality
  // ---------------------------------------------------------------------------------------------

  start() {
    this.last = performance.now();
    requestAnimationFrame(this.loop);
  }

  loop(now) {
    requestAnimationFrame(this.loop);
    this.frame(now);
  }

  /** One frame of the real-time loop (`now` in milliseconds). */
  frame(now) {
    const real = Math.max(0, (now - this.last) / 1000);
    this.last = now;
    const dt = Math.min(real, MAX_FRAME);

    // v3 "hit stop": the picture freezes for a few hundredths of a second when the player is hit
    const frozen = this.hitStop > 0;
    if (frozen) this.hitStop = Math.max(0, this.hitStop - real);
    else if (this.state === 'playing' || this.state === 'dying') this.advance(dt);
    this.render(frozen || this.state === 'paused' || this.state === 'revive' ? 0 : dt); // frozen picture behind those screens
    this.trackFps(real);
  }

  resize() {
    const w = Math.max(1, this.canvas.clientWidth || window.innerWidth);
    const h = Math.max(1, this.canvas.clientHeight || window.innerHeight);
    this.renderer.setPixelRatio(this.dprSteps[this.qualityLevel]);
    this.renderer.setSize(w, h, false);
    this.post.setSize(w, h, this.dprSteps[this.qualityLevel]);
    const aspect = w / h;
    this.camera.aspect = aspect;
    // Keep the three lanes fully visible on narrow (portrait) screens by widening the vertical FOV
    const need = (2 * Math.atan(0.52 / aspect) * 180) / Math.PI;
    this.baseFov = Math.min(88, Math.max(58, need));
    this.camera.fov = this.baseFov;
    this.camera.updateProjectionMatrix();

    // Phones held sideways: ask for portrait and pause
    const badOrientation = this.isTouch && window.innerWidth > window.innerHeight && window.innerHeight < 520;
    this.ui.showRotate(badOrientation);
    if (badOrientation) this.autoPause();
  }

  /** If the frame rate stays below ~45 fps, step down the quality (lower resolution, fewer particles). */
  trackFps(real) {
    if (this.state !== 'playing' || this.runTime < 2.5 || document.hidden) {
      this.fpsT = 0;
      this.fpsN = 0;
      return;
    }
    this.fpsT += real;
    this.fpsN++;
    if (this.fpsT < 1.5) return;
    const fps = this.fpsN / this.fpsT;
    this.fps = fps;
    this.fpsT = 0;
    this.fpsN = 0;
    this.lowFpsCount = fps < 45 ? this.lowFpsCount + 1 : 0;
    if (this.lowFpsCount >= 2 && this.qualityLevel < this.dprSteps.length - 1) {
      this.qualityLevel++;
      this.lowFpsCount = 0;
      this.applyQuality();
    }
  }

  applyQuality() {
    const lvl = this.qualityLevel;
    this.setShadows(lvl < (this.mobile ? 1 : 2)); // phones drop the shadows at the first sign of trouble
    this.world.setSnowAmount([1, 0.6, 0.35, 0.2][lvl]);
    this.particles.limit = Math.max(40, Math.floor(this.particles.capacity * [1, 0.6, 0.35, 0.2][lvl]));
    this.particles.cursor = 0;
    this.fx.setQuality(lvl);
    this.post.setQuality(lvl);
    this.resize();
  }

  setShadows(on) {
    this.shadows = on;
    this.world.setShadows(on);
    this.playerView.setBlobShadow(!on);
  }

  // ---------------------------------------------------------------------------------------------
  // Test / debug helpers (used by the automated browser tests, harmless in production)
  // ---------------------------------------------------------------------------------------------

  /** Advance the simulation without rendering. `onStep(game)` runs before each step (lets a bot play). */
  stepSim(seconds, dt = 1 / 60, onStep) {
    for (let t = 0; t < seconds - 1e-9; t += dt) {
      if (onStep) onStep(this);
      if (this.state === 'playing' || this.state === 'dying') this.advance(dt);
      else break;
    }
  }

  /** Test helper: place one obstacle `ahead` units in front of the player. */
  spawnDebug(type, lane, ahead) {
    const def = OBSTACLES[type];
    const lanes = def.lanes === 3 ? [-1, 0, 1] : [lane];
    const mesh = this.obstaclePool.acquire(type);
    mesh.position.x = lane * CFG.laneW * (def.lanes === 3 ? 0 : 1);
    const o = { type, lanes, s: this.distance + ahead, cell: def.cell, mesh, ghost: false, knockT: 0, biome: this.biome };
    if (def.move) {
      o.rowS = o.s; // a moving obstacle placed by hand MEETS the player `ahead` units from here
      o.s = movingS(o, this.distance);
    }
    this.obstacles.push(o);
    return o;
  }

  /** Test/debug helper: activate a power-up right now. */
  givePower(type) {
    this.applyPickup(type);
  }

  /** Test helper: place a power-up item `ahead` units in front of the player. */
  spawnPickup(type, lane, ahead) {
    const mesh = this.pickupPool.acquire(type);
    const k = { type, lane, s: this.distance + ahead, mesh, taken: false };
    this.pickups.push(k);
    return k;
  }

  /** Level table, tuning and obstacle table (for the browser tests). */
  get biomes() {
    return BIOMES;
  }
  get cfg() {
    return CFG;
  }
  get defs() {
    return OBSTACLES;
  }

  /** Test/debug helper: start the change to the next level right now (portal appears ahead). */
  forceTransition() {
    this.biomeStart = this.runTime - CFG.biome.duration;
  }

  snapshot() {
    return {
      biome: this.biome,
      biomeId: BIOMES[this.biome].id,
      transitions: this.transitions.length,
      powers: { ...this.powers.remaining },
      landGrace: this.powers.landGrace,
      timeScale: this.timeScale,
      crowns: this.crownsCollected,
      revivesUsed: this.revive.used,
      reviveState: this.revive.state,
      reviveGrace: this.reviveGrace,
      skin: this.playerView.skinId,
      bearSkin: this.bearView.skinId,
      wallet: { ...this.meta.wallet },
      flying: this.player.flying,
      superJump: this.player.superJump,
      pickups: this.pickups.length,
      state: this.state,
      distance: this.distance,
      speed: this.speed,
      runTime: this.runTime,
      score: this.score,
      coins: this.coinsCollected,
      bear: this.bear.phase,
      bearRemaining: this.bear.remaining,
      invulnerable: this.bear.invulnerable,
      protected: this.invulnerable,
      obstacles: this.obstacles.length,
      coinEntities: this.coins.length,
      meshesCreated: this.obstaclePool.created + this.coinPool.created + this.pickupPool.created,
      quality: this.qualityLevel,
      lane: this.player.lane,
      x: this.player.x,
      y: this.player.y,
      geometries: this.renderer.info.memory.geometries,
      textures: this.renderer.info.memory.textures,
    };
  }
}
