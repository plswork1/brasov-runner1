import './style.css';
import { Game } from './game.js';
import { UI } from './ui.js';
import { MetaScreens, grantedText } from './ui/metaScreens.js';
import { Input } from './input.js';
import { Sfx } from './audio.js';
import { createLeaderboard } from './logic/leaderboard.js';
import { Scoreboard, boardName } from './cloud/scoreboard.js';
import { createSaveStore, SAVE_KEY } from './logic/save.js';
import { Meta } from './logic/meta.js';
import { MockAdProvider } from './ads/adProvider.js';
import { setupPwa, isIosBrowser } from './pwa.js';
import { Account } from './cloud/account.js';
import { AccountUI } from './ui/accountScreen.js';
import { FIREBASE_CONFIG, LOGIN_PROVIDERS } from './cloud/config.js';

const canvas = document.getElementById('game-canvas');

// One persistence module for everything (wallet, missions, pass, cosmetics, leaderboard, settings).
const store = createSaveStore();
const meta = new Meta({ store });
const sfx = new Sfx({ muted: meta.settings.muted, onMutedChange: (m) => meta.setSetting('muted', m), musicOn: meta.settings.music });
const leaderboard = createLeaderboard(store.leaderboardStorage());

let game = null;
let screens = null;
let account = null; // sign-in + cloud save (null until it is set up; the game is playable before that)
let accountUI = null;
let scoreboard = null; // the shared leaderboard (v3.1)

const ui = new UI({
  onPlay: () => game?.startRun(),
  onResume: () => game?.resume(),
  onRestart: () => game?.startRun(),
  onMenu: () => game?.toMenu(),
  onPause: () => game?.pause(),
  onToggleMute: () => {
    sfx.setMuted(!sfx.muted);
    ui.setMuted(sfx.muted);
  },
  // v3: the music has its own switch (the sound effects keep theirs)
  onMusic: () => {
    const on = !meta.settings.music;
    meta.setSetting('music', on);
    sfx.setMusic?.(on);
    ui.setMusic?.(on);
  },
  onSubmitName: (name) => game?.submitName(name),
  onPickLevel: (i) => {
    game?.setStartBiome(i);
    ui.markLevel(i);
    meta.setSetting('startBiome', i);
  },
  onReviveAd: () => game?.reviveWithAd(),
  onReviveCrowns: () => game?.reviveWithCrowns(),
  onReviveNo: () => game?.declineRevive(),
  onEmote: () => game?.emote(),
  onOpen: (name) => {
    sfx.tap();
    screens?.show(name);
  },
  onHideAll: () => {
    screens?.closeSilently();
    accountUI?.closeSilently();
  },
  onMenuShown: () => {
    screens?.refreshMenu();
    showSaveWarning();
    offerUpdate();
    account?.resume(); // an account change that arrived during the run is applied now
    accountUI?.refresh();
    scoreboard?.sync(); // (asks the server at most every 20 s)
  },
  onInstall: () => installPrompt?.().then((ok) => ok && (ui.el.install.hidden = true)),
});

// Rewarded ads go through the AdProvider interface. The default is a mock: no SDK, no network, no
// tracking. To use a real network, pass another provider here (see README, "Reclame").
const ads = new MockAdProvider({ view: ui.adView() });

let installPrompt = null;
let pendingUpdate = null; // () => void: switch to the new version of the app (reloads the page)

/** A new version is waiting: offer it, but only on a menu, never during a run. */
function offerUpdate() {
  if (!pendingUpdate || (game && !['menu', 'gameover'].includes(game.state))) return;
  const apply = pendingUpdate;
  pendingUpdate = null;
  ui.toast('Este disponibilă o versiune nouă a jocului.', 'good', { sticky: true, action: { label: 'Actualizează', run: apply } });
}

function showFatal(message) {
  const p = document.createElement('div');
  p.style.cssText = 'position:absolute;inset:0;display:grid;place-items:center;padding:24px;text-align:center;font:600 18px system-ui;color:#fff;background:#0b2447';
  p.textContent = message;
  document.getElementById('app').appendChild(p);
}

/** Tell the player (once, quietly, on the menu) when progress cannot be written to the device. */
function showSaveWarning() {
  const st = store.status;
  const el = ui.el.saveWarning;
  if (st.mode === 'memory') el.textContent = 'Stocarea este blocată pe acest dispozitiv: progresul se păstrează doar până închizi jocul.';
  else if (!st.writeOk) el.textContent = 'Nu am putut salva progresul (spațiu de stocare plin?). Jocul merge mai departe din memorie.';
  else el.textContent = '';
  el.hidden = !el.textContent;
}

/** New day / week / season while the app is open: roll missions and tell the player. */
function syncMeta() {
  if (game && !['menu', 'gameover'].includes(game.state)) return; // never in the middle of a run
  const res = meta.sync();
  if (!res.changed) return;
  if (res.rolled.includes('season')) ui.toast('A început un sezon nou al pass-ului!', 'good');
  else if (res.rolled.length) ui.toast('Au apărut misiuni noi!', 'good');
  const text = grantedText(res.granted);
  if (text) ui.toast(`Recompense revendicate automat: ${text}`, 'good');
  screens?.refresh();
}

/** The save slot changed (signed in / out, a newer copy came from the account): show that progress. */
function applyProfile() {
  meta.sync();
  sfx.setMuted(meta.settings.muted);
  ui.setMuted(sfx.muted);
  sfx.setMusic?.(meta.settings.music);
  ui.setMusic?.(meta.settings.music);
  if (!game) return;
  game.setStartBiome(meta.settings.startBiome);
  ui.markLevel(game.startBiome);
  game.applyCosmetics();
  if (game.state === 'menu') {
    const sub = accountUI?.open;
    game.toMenu(); // redraws the menu (wallet, missions, pass, Top 10) from the new slot
    if (sub) accountUI.show(accountUI.welcome);
  }
}

const ACCOUNT_NOTES = {
  pulled: 'Progresul din cont a fost încărcat.',
  carried: 'Progresul tău de invitat a fost salvat în cont.',
  'signed-out': 'Te-ai deconectat. Acum joci ca invitat.',
};

/** Sign-in and cloud save. Set up after the game is on screen, so a slow network never delays playing. */
/** Show the shared leaderboard when there is one (and it could be loaded), else the Top 10 of this device. */
function drawBoard() {
  const sb = scoreboard;
  if (!sb?.available) return;
  if (!sb.loaded) {
    ui.setGlobalBoard(null);
    ui.setBoardNote(sb.status === 'offline' ? 'Clasamentul comun nu a putut fi încărcat (fără internet?). Vezi scorurile de pe acest dispozitiv.' : '');
    return;
  }
  const user = sb.user;
  const rank = sb.myRank;
  const entries = sb.rows.slice(0, 10).map((r, i) => ({ ...r, rank: i + 1 }));
  if (rank > 10) entries.push({ ...sb.rows[rank - 1], rank }); // his own row under the top ten
  let note;
  if (!user) note = 'Joci ca invitat: scorurile tale rămân pe acest dispozitiv. Conectează-te cu Google ca să apari în clasament.';
  else if (rank) note = `Apari ca „${boardName(user.name)}”: locul ${rank}, ${sb.rows[rank - 1].score} puncte.`;
  else if (sb.myBest) note = `Apari ca „${boardName(user.name)}”. Recordul tău: ${sb.myBest} puncte (încă în afara primelor ${sb.rows.length}).`;
  else note = `Apari ca „${boardName(user.name)}”. Termină o cursă ca să intri în clasament.`;
  if (sb.status === 'offline') note += ' (Fără conexiune: lista poate fi veche.)';
  ui.setGlobalBoard({ title: 'Clasament', entries, meId: user?.uid ?? null, note, over: !!user });
}

async function setupAccount() {
  const native = !!window.Capacitor?.isNativePlatform?.();
  const query = new URLSearchParams(location.search);
  const demo = query.has('mockauth');
  // ?noauth: no sign-in at all (everybody is a guest). Used by the browser tests of the game itself.
  const offline = query.has('noauth');
  let parts = null;
  try {
    if (demo) {
      const { createMockCloud } = await import('./cloud/mockCloud.js');
      parts = createMockCloud({ slot: store.sideSlot('mockCloud'), sessionSlot: store.sideSlot('mockSession'), providers: LOGIN_PROVIDERS });
    } else if (FIREBASE_CONFIG && !native && !offline) {
      // (inside the Android app Google blocks sign-in in a web view; that needs a native plugin)
      const { createFirebaseCloud } = await import('./cloud/firebaseCloud.js');
      parts = await createFirebaseCloud(FIREBASE_CONFIG, LOGIN_PROVIDERS);
    }
  } catch (err) {
    console.warn('sign-in is not available', err);
  }
  let warnedOffline = false;
  account = new Account({
    store,
    auth: parts?.auth ?? null,
    cloud: parts?.cloud ?? null,
    canSwitch: () => !game || game.state === 'menu',
    onChange: (e) => {
      if (['signed-in', 'signed-out', 'pulled', 'carried'].includes(e.type)) applyProfile();
      if (e.type === 'signed-in') ui.toast(`Bine ai venit, ${e.user.name}!`, 'good');
      if (ACCOUNT_NOTES[e.type]) ui.toast(ACCOUNT_NOTES[e.type], 'good');
      if (e.type === 'offline' && !warnedOffline) {
        warnedOffline = true;
        ui.toast('Fără conexiune la cont: progresul rămâne pe dispozitiv și se salvează în cont mai târziu.', 'warn');
      }
      if (e.type === 'saved') warnedOffline = false;
      accountUI?.refresh();
      if (['signed-in', 'signed-out', 'pulled', 'carried'].includes(e.type)) {
        drawBoard();
        scoreboard?.sync(true);
      }
    },
  });
  accountUI = new AccountUI({ account, ui, sfx, demo });
  // v3.1: the shared leaderboard (one row per account, the account's best score under its name)
  scoreboard = new Scoreboard({
    cloud: parts?.cloud ?? null,
    getUser: () => account.user,
    localBest: () => leaderboard.getTop()[0]?.score ?? 0,
    onChange: drawBoard,
  });
  if (game) {
    game.scoreboard = scoreboard;
    game.onAccountScore = async (score) => {
      const r = await scoreboard.submit(score);
      if (game.state !== 'gameover') return;
      if (!r.ok) ui.setOverNote('Fără conexiune: scorul rămâne pe dispozitiv și intră în clasament când revine internetul.');
      else if (r.improved) ui.setOverNote(r.rank ? `Record personal! Ești pe locul ${r.rank} în clasament.` : 'Record personal! Scorul a fost salvat în clasament.');
      else ui.setOverNote(`Recordul tău din clasament rămâne ${r.best}.`);
    };
  }
  await account.start();
  accountUI.refresh();
  scoreboard.sync();
  // first start on this device: how do you want to play?
  if (account.needsWelcome && game?.state === 'menu' && ui.startVisible()) accountUI.show(true);
  window.addEventListener('online', () => {
    account.flush();
    scoreboard.sync(true);
  });
  if (window.__game) {
    window.__scoreboard = scoreboard;
    window.__account = account;
    window.__accountUI = accountUI;
  }
}

try {
  game = new Game({ canvas, ui, sfx, leaderboard, meta, ads });
} catch (err) {
  console.error(err);
  showFatal('Ne pare rău, jocul are nevoie de WebGL, care nu este disponibil în acest browser sau pe acest dispozitiv.');
}

if (game) {
  screens = new MetaScreens({ meta, ui, game: () => game, sfx });
  new Input(canvas, game.actions);

  // Browsers only allow audio after a user gesture: unlock on the first one.
  const unlock = () => sfx.unlock();
  for (const ev of ['pointerdown', 'keydown', 'touchend']) window.addEventListener(ev, unlock, { passive: true });

  ui.setMuted(sfx.muted);
  sfx.setMusic?.(meta.settings.music);
  ui.setMusic?.(meta.settings.music);
  if (meta.settings.startBiome) {
    game.setStartBiome(meta.settings.startBiome);
    ui.markLevel(meta.settings.startBiome);
  }

  window.addEventListener('resize', () => game.resize());
  window.addEventListener('orientationchange', () => setTimeout(() => game.resize(), 250));
  window.visualViewport?.addEventListener('resize', () => game.resize());

  // Pause automatically whenever the game is not in front of the player. Going to the background
  // can be the last thing the app ever sees (phones kill background tabs), so the coins and crowns
  // of the run in progress are put in the wallet right then.
  const toBackground = () => {
    game.autoPause();
    game.bankRun();
    account?.flush(); // signed in: the progress goes to the account before the app may be closed
  };
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return toBackground();
    syncMeta();
    account?.refresh(); // did another device save something newer to the account?
  });
  window.addEventListener('blur', () => game.autoPause());
  window.addEventListener('pagehide', toBackground);
  window.addEventListener('focus', syncMeta);

  // The phone was left open over midnight: check the date now and then while a menu is showing.
  setInterval(syncMeta, 30_000);

  // Another tab of the game saved: take its (newer) state instead of overwriting it later.
  window.addEventListener('storage', (e) => {
    if (e.key !== SAVE_KEY && e.key !== null) return;
    if (game.state !== 'menu' && game.state !== 'gameover') return; // (checked again when the run ends)
    if (store.reload()) {
      game.applyCosmetics();
      screens.refresh();
    }
  });

  // Mobile browsers may drop the WebGL context when the app is in the background: pause, and let
  // three.js rebuild its GPU resources when the context comes back.
  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    game.autoPause();
  });

  game.toMenu();
  game.start();

  if (store.status.loaded === 'backup') ui.toast('Salvarea era deteriorată: am încărcat copia de rezervă.', 'warn', { sticky: true });
  else if (store.status.loaded === 'reset') ui.toast('Salvarea era deteriorată și nu a putut fi citită. Începi de la zero.', 'warn', { sticky: true });

  setupPwa({
    onUpdateReady: (apply) => {
      // Never reload in the middle of a run: the offer waits for the next menu / game over screen.
      pendingUpdate = apply;
      offerUpdate();
    },
    onOfflineReady: () => ui.toast('Gata: jocul merge acum și fără internet.', 'good'),
    onInstallable: (prompt) => {
      installPrompt = prompt;
      ui.el.install.hidden = false;
    },
    onInstalled: () => {
      ui.el.install.hidden = true;
      ui.toast('Aplicația a fost instalată.', 'good');
    },
  });
  ui.el.iosHint.hidden = !isIosBrowser();
  document.getElementById('app-version').textContent = `Brașov Runner v${__APP_VERSION__}`;

  // Debug/test hook: open the page with ?debug to get window.__game (and the meta objects)
  if (import.meta.env.DEV || new URLSearchParams(location.search).has('debug')) {
    window.__game = game;
    window.__meta = meta;
    window.__store = store;
    window.__screens = screens;
    window.__ads = ads;
  }
  setupAccount();
}
