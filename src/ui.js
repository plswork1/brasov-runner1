import { NAME_MAX } from './logic/leaderboard.js';
import { BIOMES } from './logic/biomes.js';
import { h, onTap, pct } from './ui/dom.js';

const SHORT = ['Poiana', 'Republicii', 'Tractorul', 'AFI', 'Noua'];
const HUD_RESET = () => ({ score: -1, coins: -1, speed: -1, bear: -2, crowns: -1, combo: '' });
const MAX_POPUPS = 4;
const reducedMotion = () => !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * DOM overlay: HUD, start/pause/revive/game-over screens, leaderboard lists, toasts, the mock ad.
 * The meta screens (missions, pass, wardrobe) are in `ui/metaScreens.js`.
 * All text is Romanian. All user-provided text (player names) is inserted with textContent, never
 * innerHTML, so names cannot inject markup.
 */
export class UI {
  constructor(handlers) {
    this.h = handlers;
    const $ = (id) => document.getElementById(id);
    this.el = {
      flash: $('flash'),
      hud: $('hud'),
      score: $('hud-score'),
      coins: $('hud-coins'),
      crowns: $('hud-crowns'),
      crownChip: $('hud-crown-chip'),
      speed: $('hud-speed'),
      bearBar: $('bear-bar'),
      bearFill: $('bear-fill'),
      btnMute: $('btn-mute'),
      muteIcon: $('mute-icon'),
      btnSound: $('btn-sound'),
      btnPause: $('btn-pause'),
      btnEmote: $('btn-emote'),
      emote: $('emote'),
      edge: $('edge'),
      coinChip: $('hud-coins').parentElement,
      combo: $('combo'),
      comboX: $('combo-x'),
      comboFill: $('combo-fill'),
      popups: $('popups'),
      hints: $('hints'),
      btnMusic: $('btn-music'),
      overRecord: $('over-record'),
      overStyle: $('over-style'),
      start: $('screen-start'),
      pause: $('screen-pause'),
      over: $('screen-over'),
      revive: $('screen-revive'),
      rotate: $('screen-rotate'),
      boardStart: $('board-start'),
      boardOver: $('board-over'),
      boardStartTitle: $('board-start-title'),
      boardStartNote: $('board-start-note'),
      boardOverTitle: $('board-over-title'),
      overTitle: $('over-title'),
      overScore: $('over-score'),
      overCoins: $('over-coins'),
      overDistance: $('over-distance'),
      overCrowns: $('over-crowns'),
      overCrownsWrap: $('over-crowns-wrap'),
      overEarned: $('over-earned'),
      overMissions: $('over-missions'),
      nameForm: $('name-form'),
      nameInput: $('name-input'),
      nameMsg: $('name-msg'),
      overNote: $('over-note'),
      warp: $('warp'),
      slowmo: $('slowmo'),
      levelTitle: $('level-title'),
      levelNum: $('level-num'),
      levelName: $('level-name'),
      levelSub: $('level-sub'),
      hudLevel: $('hud-level'),
      levelPick: $('level-pick'),
      reviveSub: $('revive-sub'),
      reviveAd: $('btn-revive-ad'),
      reviveCrowns: $('btn-revive-crowns'),
      reviveNo: $('btn-revive-no'),
      reviveWallet: $('revive-wallet'),
      reviveMsg: $('revive-msg'),
      ad: $('ad-overlay'),
      adFill: $('ad-fill'),
      adCount: $('ad-count'),
      toasts: $('toasts'),
      install: $('btn-install'),
      iosHint: $('ios-hint'),
      saveWarning: $('save-warning'),
    };
    this.warpValue = -1;
    this.slowValue = -1;
    // Level picker on the start screen (start the run directly in any of the 5 places)
    this.pickButtons = BIOMES.map((b, i) => {
      const btn = h('button', { class: 'level-chip', attrs: { type: 'button', role: 'radio', 'data-level': i, title: b.name } }, [
        h('b', { text: i + 1 }),
        h('span', { text: SHORT[i] ?? b.name }),
      ]);
      onTap(btn, () => this.h.onPickLevel?.(i));
      this.el.levelPick.appendChild(btn);
      return btn;
    });
    this.markLevel(0);
    this.last = HUD_RESET();
    this.el.nameInput.maxLength = NAME_MAX;

    const click = (id, fn) => onTap($(id), fn);
    click('btn-play', () => this.h.onPlay());
    click('btn-resume', () => this.h.onResume());
    click('btn-restart', () => this.h.onRestart());
    click('btn-menu-pause', () => this.h.onMenu());
    click('btn-again', () => this.h.onPlay());
    click('btn-menu-over', () => this.h.onMenu());
    click('btn-pause', () => this.h.onPause());
    click('btn-mute', () => this.h.onToggleMute());
    click('btn-sound', () => this.h.onToggleMute());
    click('btn-music', () => this.h.onMusic?.());
    click('btn-emote', () => this.h.onEmote?.());
    click('btn-revive-ad', () => this.h.onReviveAd?.());
    click('btn-revive-crowns', () => this.h.onReviveCrowns?.());
    click('btn-revive-no', () => this.h.onReviveNo?.());
    click('btn-install', () => this.h.onInstall?.());
    click('btn-missions', () => this.h.onOpen?.('missions'));
    click('btn-pass', () => this.h.onOpen?.('pass'));
    click('side-pass', () => this.h.onOpen?.('pass'));
    click('btn-wardrobe', () => this.h.onOpen?.('wardrobe'));
    $('name-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.h.onSubmitName(this.el.nameInput.value);
    });
  }

  // --- HUD -----------------------------------------------------------------------------------
  showHud(on) {
    this.el.hud.hidden = !on;
    if (on) this.last = HUD_RESET();
    else {
      this.clearPopups();
      this.hideHints();
      this.el.edge.classList.remove('on', 'low');
    }
  }

  /** Restart a one-shot CSS animation class on an element. */
  retrigger(el, cls) {
    el.classList.remove(cls);
    void el.offsetWidth;
    el.classList.add(cls);
  }

  /** Only touches the DOM when a value actually changed (cheap per-frame call). */
  setHud(score, coins, kmh, crowns = 0) {
    const l = this.last;
    if (score !== l.score) {
      this.el.score.textContent = String(score);
      l.score = score;
    }
    if (coins !== l.coins) {
      this.el.coins.textContent = String(coins);
      if (l.coins >= 0 && coins > l.coins) this.retrigger(this.el.coinChip, 'bump');
      l.coins = coins;
    }
    if (kmh !== l.speed) {
      this.el.speed.textContent = String(kmh);
      l.speed = kmh;
    }
    if (crowns !== l.crowns) {
      this.el.crowns.textContent = String(crowns);
      this.el.crownChip.hidden = crowns <= 0; // the premium currency only shows once one was found
      l.crowns = crowns;
    }
  }

  /** fraction 1..0 while the bear chases, or null when there is no bear. */
  setBear(fraction) {
    const key = fraction === null ? -1 : Math.round(fraction * 200);
    if (key === this.last.bear) return;
    this.last.bear = key;
    if (fraction === null) {
      this.el.bearBar.hidden = true;
      this.el.bearBar.classList.remove('low');
      this.el.edge.classList.remove('on', 'low');
    } else {
      const f = Math.max(0, Math.min(1, fraction));
      this.el.bearBar.hidden = false;
      this.el.bearFill.style.transform = `scaleX(${f})`;
      // The last second and a half pulses faster: the bear is about to leave (or you are about to be caught).
      this.el.bearBar.classList.toggle('low', f < 0.3);
      this.el.edge.classList.add('on');
      this.el.edge.classList.toggle('low', f < 0.3);
    }
  }

  /** Coin-streak meter: shows from streak 3, drains with fraction 1 -> 0, pops when the streak grows. */
  setCombo(streak, fraction) {
    const key = streak < 3 ? '' : `${streak}|${Math.round(Math.max(0, Math.min(1, fraction)) * 40)}`;
    if (key === this.last.combo) return;
    const prev = this.last.combo ? Number(this.last.combo.split('|')[0]) : 0;
    this.last.combo = key;
    const e = this.el;
    if (!key) {
      e.combo.hidden = true;
      return;
    }
    const wasHidden = e.combo.hidden;
    e.combo.hidden = false;
    e.combo.dataset.heat = streak >= 25 ? '3' : streak >= 10 ? '2' : '1';
    e.comboFill.style.transform = `scaleX(${Math.max(0, Math.min(1, fraction))})`;
    if (streak !== prev) {
      e.comboX.textContent = `×${streak}`;
      this.retrigger(e.combo, wasHidden ? 'in' : 'pop');
      if (wasHidden) e.combo.classList.remove('pop');
    }
  }

  /** Floating note ("La limită! +25"). kind: 'near' | 'streak'. Auto-removes itself. */
  popup(text, kind = 'near') {
    const box = this.el.popups;
    if (!box || this.el.hud.hidden) return;
    while (box.children.length >= MAX_POPUPS) box.firstChild.remove();
    const p = h('div', { class: `popup ${kind}`, text });
    // Alternate sides a little so two notes in a row do not sit on top of each other.
    this.popupSide = (this.popupSide || 0) ^ 1;
    p.style.setProperty('--dx', `${this.popupSide ? 18 : -18}px`);
    p.style.setProperty('--dy', `${this.popupSide ? 40 : 0}px`);
    box.appendChild(p);
    setTimeout(() => p.remove(), 1500);
  }

  clearPopups() {
    this.el.popups?.replaceChildren();
  }

  /** First-run control hints for a few seconds. touch: swipe text, otherwise keyboard keys. */
  showHints(touch) {
    const box = this.el.hints;
    box.replaceChildren();
    if (touch) {
      box.appendChild(h('span', { text: 'Glisează ← → pentru benzi, ↑ sari, ↓ aluneci' }));
    } else {
      const key = (t) => h('kbd', { text: t });
      const item = (keys, t) => h('span', { class: 'hint-item' }, [...keys, h('span', { text: t })]);
      box.appendChild(item([key('←'), key('→')], 'schimbi culoarul'));
      box.appendChild(item([key('↑'), key('Space')], 'sari'));
      box.appendChild(item([key('↓')], 'aluneci'));
    }
    box.hidden = false;
    box.classList.remove('out');
    this.retrigger(box, 'in');
    clearTimeout(this.hintTimer);
    this.hintTimer = setTimeout(() => this.hideHints(), 5200);
  }

  hideHints() {
    clearTimeout(this.hintTimer);
    this.el.hints.hidden = true;
  }

  /** Highlight the chosen start level. */
  markLevel(i) {
    this.pickButtons.forEach((b, k) => {
      b.classList.toggle('on', k === i);
      b.setAttribute('aria-checked', k === i ? 'true' : 'false');
    });
  }

  /** Small chip in the HUD with the current place. */
  setLevel(i, name) {
    this.el.hudLevel.textContent = `${i + 1} · ${name}`;
  }

  /** White-out of the portal transition (0..1). */
  setWarp(v) {
    const k = Math.round(v * 100) / 100;
    if (k === this.warpValue) return;
    this.warpValue = k;
    this.el.warp.style.opacity = String(k);
  }

  /** Violet vignette while "Ceasul din Piața Sfatului" slows the world (0..1). */
  setSlowmo(v) {
    const k = Math.round(Math.max(0, Math.min(1, v)) * 50) / 50;
    if (k === this.slowValue) return;
    this.slowValue = k;
    this.el.slowmo.style.opacity = String(k);
  }

  /** Big title card when a new level starts. */
  showLevelTitle(name, subtitle, i) {
    const el = this.el.levelTitle;
    this.el.levelNum.textContent = `NIVELUL ${i + 1}`;
    this.el.levelName.textContent = name;
    this.el.levelSub.textContent = subtitle;
    el.hidden = false;
    el.classList.remove('show');
    void el.offsetWidth; // restart the CSS animation
    el.classList.add('show');
    clearTimeout(this.titleTimer);
    this.titleTimer = setTimeout(() => (el.hidden = true), 3200);
  }

  hideLevelTitle() {
    clearTimeout(this.titleTimer);
    this.el.levelTitle.hidden = true;
  }

  flash() {
    const f = this.el.flash;
    f.classList.remove('on');
    void f.offsetWidth; // restart the CSS animation
    f.classList.add('on');
  }

  setMuted(muted) {
    this.el.btnMute.classList.toggle('muted', muted);
    this.el.btnMute.setAttribute('aria-label', muted ? 'Pornește sunetul' : 'Oprește sunetul');
    this.el.muteIcon.textContent = muted ? '✕' : '♪';
    this.el.btnSound.textContent = muted ? 'Sunet: oprit' : 'Sunet: pornit';
  }

  /** Music switch (the handler is `onMusic`); the button stays hidden until the game tells its state. */
  setMusic(on) {
    const b = this.el.btnMusic;
    b.hidden = false;
    b.classList.toggle('off', !on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.textContent = on ? 'Muzică: pornită' : 'Muzică: oprită';
  }

  /** The equipped emoji ('' = none): shows / hides the HUD button. */
  setEmote(glyph) {
    this.el.btnEmote.hidden = !glyph;
    this.el.btnEmote.textContent = glyph || '';
  }

  /** Pop the emoji up for a moment. */
  showEmote(glyph) {
    if (!glyph) return;
    const e = this.el.emote;
    e.textContent = glyph;
    e.hidden = false;
    e.classList.remove('show');
    void e.offsetWidth;
    e.classList.add('show');
    clearTimeout(this.emoteTimer);
    this.emoteTimer = setTimeout(() => (e.hidden = true), 1600);
  }

  /**
   * Short message at the bottom of the screen. kind: '' | 'good' | 'warn' | 'emoji'.
   * `action` adds a button; `sticky` keeps it until the player closes it (for things that must not
   * be missed, e.g. "the save was damaged": the first seconds after start-up can stutter while the
   * graphics warm up, and a 3 s note could be gone before anyone sees it).
   */
  toast(text, kind = '', { action, sticky = false } = {}) {
    const box = this.el.toasts;
    while (box.children.length >= 3) box.firstChild.remove();
    const t = h('div', { class: `toast ${kind}`.trim() }, [h('span', { text })]);
    const close = () => t.remove();
    if (action) t.appendChild(onTap(h('button', { class: 'toast-btn', text: action.label, attrs: { type: 'button' } }), () => { close(); action.run(); }));
    if (sticky) t.appendChild(onTap(h('button', { class: 'toast-x', text: '✕', attrs: { type: 'button', 'aria-label': 'Închide' } }), close));
    else setTimeout(close, kind === 'warn' ? 7000 : 3600);
    box.appendChild(t);
    return t;
  }

  // --- screens -------------------------------------------------------------------------------
  hideAll() {
    this.hideLevelTitle();
    this.setWarp(0);
    this.setSlowmo(0);
    this.cancelCount();
    this.hideHints();
    this.el.start.hidden = true;
    this.el.pause.hidden = true;
    this.el.over.hidden = true;
    this.el.revive.hidden = true;
    this.h.onHideAll?.(); // closes Misiuni / Pass / Garderobă
  }

  /** True when the start screen itself (not a sub-screen) is in front. */
  startVisible() {
    return !this.el.start.hidden;
  }

  showStart(entries) {
    this.hideAll();
    this.showHud(false);
    this.renderBoard(this.el.boardStart, entries);
    this.el.start.hidden = false;
    this.h.onMenuShown?.();
  }

  showPause(on) {
    this.el.pause.hidden = !on;
  }

  showRotate(on) {
    this.el.rotate.hidden = !on;
  }

  // --- revive ("Continui?") ------------------------------------------------------------------
  /**
   * @param d {cost, crowns, canPay, used, limit, adAllowed, adAvailable, adReason, message}
   */
  showRevive(d) {
    const e = this.el;
    this.showHud(false);
    e.reviveSub.textContent = `Te-a prins ursul. Poți continua cursa de aici (reluarea ${d.used + 1} din ${d.limit}).`;
    e.reviveCrowns.textContent = `Plătește ${d.cost} 👑`;
    e.reviveCrowns.disabled = !d.canPay;
    e.reviveWallet.textContent = d.canPay ? `Ai ${d.crowns} 👑.` : `Ai ${d.crowns} 👑: nu ajung pentru această reluare.`;
    e.reviveAd.hidden = !d.adAllowed;
    e.reviveAd.disabled = !d.adAvailable;
    e.reviveAd.textContent = d.adAvailable ? '▶ Vezi o reclamă' : d.adReason === 'offline' ? 'Reclamă indisponibilă (offline)' : 'Reclamă indisponibilă';
    e.reviveMsg.hidden = !d.message;
    e.reviveMsg.textContent = d.message || '';
    e.reviveNo.disabled = false;
    e.revive.hidden = false;
  }

  /** While the ad runs nothing on the offer can be pressed. */
  setReviveBusy(busy) {
    this.el.reviveAd.disabled = busy;
    this.el.reviveCrowns.disabled = busy;
    this.el.reviveNo.disabled = busy;
  }

  hideRevive() {
    this.el.revive.hidden = true;
  }

  /** View of the mock ad (see ads/adProvider.js): {open, update, close}. */
  adView() {
    return {
      open: (s) => {
        this.el.ad.hidden = false;
        this.adView().update(s);
      },
      update: (s) => {
        this.el.adFill.style.width = pct(s.fraction);
        const left = Math.ceil(s.remaining);
        this.el.adCount.textContent = s.visible === false ? 'Pauză: revino în joc ca să continue.' : left === 1 ? 'Mai rămâne 1 secundă' : `Mai rămân ${left} secunde`;
      },
      close: () => {
        this.el.ad.hidden = true;
      },
    };
  }

  // --- game over -----------------------------------------------------------------------------
  /**
   * @param d {score, coins, crowns, distance, qualifies, entries, caught, lastName, xp, tiersGained, missions}
   */
  showGameOver(d) {
    this.hideAll();
    this.showHud(false);
    this.el.overTitle.textContent = d.caught ? 'Te-a prins ursul!' : 'Cursă încheiată';
    this.countUp(this.el.overScore, d.score);
    // Entries come before the new score is added, so "beats the first row" = a new record.
    // (with an account the game decides: `d.record` = better than the player's best so far)
    const record = d.record ?? (!!d.qualifies && d.score > 0 && !(d.entries?.length && d.entries[0].score >= d.score));
    this.el.overRecord.hidden = !record;
    if (record) this.retrigger(this.el.overRecord, 'in');
    const st = d.style;
    const styleEl = this.el.overStyle;
    styleEl.hidden = !(st && st.bonus > 0);
    if (!styleEl.hidden) {
      const parts = [`Bonus de stil +${st.bonus}`];
      if (st.nearMisses > 0) parts.push(`${st.nearMisses} la limită`);
      if (st.bestStreak >= 3) parts.push(`serie de ${st.bestStreak}`);
      styleEl.textContent = parts.join(' · ');
    }
    this.el.over.classList.remove('land');
    void this.el.over.offsetWidth;
    this.el.over.classList.add('land');
    this.el.overCoins.textContent = String(d.coins);
    this.el.overDistance.textContent = String(Math.floor(d.distance));
    this.el.overCrowns.textContent = String(d.crowns || 0);
    this.el.overCrownsWrap.hidden = !(d.crowns > 0);
    const earned = [`+${d.xp || 0} XP pentru pass`];
    if (d.tiersGained > 0) earned.push(d.tiersGained === 1 ? 'treaptă nouă în pass!' : `${d.tiersGained} trepte noi în pass!`);
    this.el.overEarned.textContent = earned.join(' · ');
    const list = this.el.overMissions;
    list.replaceChildren();
    for (const m of d.missions || []) list.appendChild(h('li', { text: `✓ ${m.text}` }));
    list.hidden = !list.children.length;
    this.el.overNote.hidden = true;
    if (d.auto) {
      // signed in: the score goes to the shared leaderboard by itself, under the account's name
      this.el.nameForm.hidden = true;
      this.el.overNote.hidden = false;
      this.el.overNote.textContent = d.score > 0 ? 'Scorul se salvează în clasament…' : 'Mai încearcă!';
      this.renderBoard(this.el.boardOver, d.entries);
      this.el.over.hidden = false;
    } else if (d.qualifies) {
      this.el.nameForm.hidden = false;
      this.el.nameMsg.textContent = 'Scor nou în Top 10! Scrie-ți numele:';
      this.el.nameInput.value = d.lastName || '';
      this.renderBoard(this.el.boardOver, d.entries);
      this.el.over.hidden = false;
      // Focus after the screen is visible; on phones this opens the keyboard, which is what we want here.
      setTimeout(() => this.el.nameInput.focus(), 50);
    } else {
      this.el.nameForm.hidden = true;
      this.el.overNote.hidden = false;
      this.el.overNote.textContent = d.score > 0 ? 'De data asta n-ai intrat în Top 10. Mai încearcă!' : 'Mai încearcă!';
      this.renderBoard(this.el.boardOver, d.entries);
      this.el.over.hidden = false;
    }
  }

  /** Count a number up with an ease-out; the end value is also forced by a timer (rAF stops in hidden tabs). */
  countUp(el, to, ms = 900) {
    this.cancelCount();
    const end = String(to);
    if (reducedMotion() || to < 20) {
      el.textContent = end;
      return;
    }
    const t0 = performance.now();
    el.textContent = '0';
    const step = (now) => {
      const k = Math.min(1, (now - t0) / ms);
      el.textContent = String(Math.round(to * (1 - (1 - k) ** 3)));
      this.countRaf = k < 1 ? requestAnimationFrame(step) : 0;
    };
    this.countRaf = requestAnimationFrame(step);
    this.countTimer = setTimeout(() => {
      this.cancelCount();
      el.textContent = end;
    }, ms + 250);
  }

  cancelCount() {
    cancelAnimationFrame(this.countRaf);
    clearTimeout(this.countTimer);
    this.countRaf = 0;
  }

  /** After saving the name: hide the form and show the new ranking, with the new entry highlighted. */
  showSaved(entries, entryId, rank) {
    this.el.nameForm.hidden = true;
    this.el.overNote.hidden = false;
    this.el.overNote.textContent = rank ? `Salvat! Ești pe locul ${rank}.` : 'Salvat!';
    this.renderBoard(this.el.boardOver, entries, entryId);
    this.el.nameInput.blur();
  }

  /** The line under the result on the game over screen (for example where the score landed in the leaderboard). */
  setOverNote(text) {
    if (this.el.over.hidden) return;
    this.el.overNote.hidden = !text;
    this.el.overNote.textContent = text || '';
  }

  /**
   * The shared leaderboard, when there is one: it replaces the local Top 10 on the start screen
   * and, for a signed-in player (`over`), on the game over screen too. null = local lists again.
   * @param b {title, entries: [{id, name, score, rank?}], meId, note, over} | null
   */
  setGlobalBoard(b) {
    this.globalBoard = b;
    this.el.boardStartTitle.textContent = b ? b.title : 'Top 10';
    this.el.boardOverTitle.textContent = b?.over ? b.title : 'Top 10';
    this.el.boardStartNote.hidden = !this.boardNote && !b?.note;
    this.el.boardStartNote.textContent = b?.note || this.boardNote || '';
    for (const list of [this.el.boardStart, this.el.boardOver]) this.renderBoard(list, ...(list._local || [[]]));
  }

  /** A line under the local Top 10 (for example: the shared leaderboard could not be loaded). */
  setBoardNote(text) {
    this.boardNote = text || '';
    if (!this.globalBoard) {
      this.el.boardStartNote.hidden = !text;
      this.el.boardStartNote.textContent = text || '';
    }
  }

  renderBoard(list, entries, highlightId) {
    list._local = [entries, highlightId]; // what the local list shows (kept for when the shared one goes away)
    const g = this.globalBoard;
    if (g && (list === this.el.boardStart || g.over)) {
      entries = g.entries;
      highlightId = g.meId;
    }
    list.replaceChildren();
    if (!entries.length) {
      list.appendChild(h('li', { class: 'empty', text: 'Niciun scor încă. Fii primul!' }));
      return;
    }
    entries.forEach((e, i) => {
      const li = h('li', { class: e.id === highlightId ? 'me' : '' }, [
        h('span', { class: 'rank', text: e.rank ?? i + 1 }),
        h('span', { class: 'name', text: e.name }),
        h('span', { class: 'score', text: e.score }),
      ]);
      list.appendChild(li);
    });
  }
}
