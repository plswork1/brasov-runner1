import { sanitizeWallet } from './economy.js';
import { sanitizeCosmetics, defaultCosmetics } from './cosmetics.js';
import { sanitizeMissions, defaultMissions } from './missions.js';
import { sanitizePass, defaultPass } from './battlepass.js';
import { normalizeEntries, sanitizeName, STORAGE_KEY as LEGACY_LEADERBOARD_KEY } from './leaderboard.js';

/**
 * Persistence: the ONLY module that reads or writes localStorage.
 *
 * Everything the game remembers lives in ONE JSON document under SAVE_KEY:
 *   { v, wallet, cosmetics, missions, pass, leaderboard, settings, stats }
 *
 * Rules:
 *  - VERSION + MIGRATION: the document has a version (`v`). Older formats are upgraded step by step
 *    (`MIGRATIONS`); the v1 game kept its data in three separate keys (leaderboard, name, mute) and
 *    those are imported the first time v2 starts, so an app update never loses progress. A document
 *    from a NEWER version (downgrade) is kept under NEWER_KEY and read as well as possible.
 *  - STRICT VALIDATION: whatever comes out of storage goes through `sanitizeState`. Every field is
 *    type-checked and clamped, unknown ids are dropped, impossible combinations are repaired. The
 *    rest of the game can trust the state object completely.
 *  - CORRUPTED DATA: broken JSON is never fatal. The broken text is copied to CORRUPT_KEY (so it
 *    could still be recovered by hand), then the last good backup is used, or a fresh state.
 *  - STORAGE BLOCKED OR FULL: if storage cannot be read (private mode, blocked cookies) the game
 *    runs from memory; if a write fails (quota) the state stays in memory, the backup is dropped to
 *    make room and the write is tried again. `status` tells the UI what happened; nothing throws.
 *  - A backup of the last state that loaded correctly is kept under BACKUP_KEY.
 */
export const SAVE_KEY = 'brasovRunner.save';
export const SESSION_KEY = 'brasovRunner.session';
export const GUEST = 'guest';
export const BACKUP_KEY = 'brasovRunner.save.bak';
export const CORRUPT_KEY = 'brasovRunner.save.corrupt';
export const NEWER_KEY = 'brasovRunner.save.newer';
export const SAVE_VERSION = 2;
export const LEGACY_KEYS = Object.freeze({ leaderboard: LEGACY_LEADERBOARD_KEY, name: 'winterRunner.name', muted: 'winterRunner.muted' });

const MAX_BYTES = 200_000; // a save can never be legitimately bigger than this

const int = (v, max = 1e12) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(0, Math.floor(v))) : 0);

export function defaultState(now = new Date()) {
  return {
    v: SAVE_VERSION,
    wallet: { coins: 0, crowns: 0 },
    cosmetics: defaultCosmetics(),
    missions: defaultMissions(now),
    pass: defaultPass(now),
    leaderboard: [],
    settings: { muted: false, name: '', startBiome: 0, music: true, hints: 0 },
    stats: { runs: 0, bestScore: 0, totalDistance: 0, totalCoins: 0, revives: 0 },
    sync: { rev: 0, at: 0 },
  };
}

/** Revision counter + time of the last change: decides between the copy on the device and the one in the account. */
export function sanitizeSync(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  return { rev: int(r.rev, 1e9), at: int(r.at, 1e14) };
}

const PROFILE_RE = /^u\.[A-Za-z0-9_-]{1,80}$/;
/** 'guest' or 'u.<account id>'. Anything else is treated as the guest. */
export function cleanProfile(id) {
  return typeof id === 'string' && PROFILE_RE.test(id) ? id : GUEST;
}
/** The profile of an account id (ids with other characters are encoded so they are safe in a key). */
export function profileOf(uid) {
  const s = String(uid ?? '');
  const safe = /^[A-Za-z0-9_-]{1,80}$/.test(s) ? s : Array.from(s, (c) => c.charCodeAt(0).toString(16)).join('').slice(0, 80);
  return safe ? `u.${safe}` : GUEST;
}

export function sanitizeSession(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const text = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : '');
  return { profile: cleanProfile(r.profile), name: text(r.name, 40), provider: text(r.provider, 20), welcomed: r.welcomed === true };
}

export function sanitizeSettings(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  const name = typeof r.name === 'string' && r.name.trim() ? sanitizeName(r.name) : '';
  // v3: `music` = the separate music switch (on unless switched off), `hints` = how many runs
  // already started with the control hints on screen (they are shown in the first few runs only)
  return { muted: r.muted === true, name, startBiome: Math.min(4, int(r.startBiome)), music: r.music !== false, hints: Math.min(9, int(r.hints)) };
}

export function sanitizeStats(raw) {
  const r = raw && typeof raw === 'object' ? raw : {};
  return { runs: int(r.runs), bestScore: int(r.bestScore, 1e9), totalDistance: int(r.totalDistance), totalCoins: int(r.totalCoins), revives: int(r.revives) };
}

/** Turn ANY value into a valid state of the current version. Never throws. */
export function sanitizeState(raw, now = new Date()) {
  const r = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  return {
    v: SAVE_VERSION,
    wallet: sanitizeWallet(r.wallet),
    cosmetics: sanitizeCosmetics(r.cosmetics),
    missions: sanitizeMissions(r.missions, now),
    pass: sanitizePass(r.pass, now),
    leaderboard: normalizeEntries(r.leaderboard),
    settings: sanitizeSettings(r.settings),
    stats: sanitizeStats(r.stats),
    sync: sanitizeSync(r.sync),
  };
}

/**
 * Upgrade steps, one per old version: MIGRATIONS[n] turns a document of version n into n + 1.
 * (Version 1 = the first release: only the three legacy keys, read by `readLegacy`.)
 */
export const MIGRATIONS = {
  1: (doc) => ({ ...doc, v: 2 }), // v1 fields (leaderboard, settings) keep their meaning; the rest gets defaults
};

export function migrate(doc) {
  let d = doc && typeof doc === 'object' && !Array.isArray(doc) ? { ...doc } : {};
  let v = Number.isInteger(d.v) && d.v >= 1 ? d.v : 1;
  let guard = 0;
  while (v < SAVE_VERSION && guard++ < 50) {
    const step = MIGRATIONS[v];
    d = step ? step(d) : { ...d, v: v + 1 };
    v = Number.isInteger(d.v) && d.v > v ? d.v : v + 1;
    d.v = v;
  }
  return d;
}

/** Data of the v1 game (three separate keys) as a version-1 document, or null if there is none. */
export function readLegacy(storage) {
  let found = false;
  const doc = { v: 1, leaderboard: [], settings: {} };
  try {
    const raw = storage.getItem(LEGACY_KEYS.leaderboard);
    if (raw) {
      found = true;
      try {
        doc.leaderboard = normalizeEntries(JSON.parse(raw));
      } catch {
        /* corrupted old leaderboard: start with an empty one */
      }
    }
    const name = storage.getItem(LEGACY_KEYS.name);
    if (typeof name === 'string' && name) {
      found = true;
      doc.settings.name = name;
    }
    const muted = storage.getItem(LEGACY_KEYS.muted);
    if (muted === '1' || muted === '0') {
      found = true;
      doc.settings.muted = muted === '1';
    }
  } catch {
    return null;
  }
  return found ? doc : null;
}

function memoryStorage() {
  const mem = new Map();
  return {
    getItem: (k) => (mem.has(k) ? mem.get(k) : null),
    setItem: (k, v) => void mem.set(k, String(v)),
    removeItem: (k) => void mem.delete(k),
  };
}

/** localStorage if it really works (read + write probe), else null. */
export function probeStorage() {
  try {
    const ls = globalThis.localStorage;
    if (!ls) return null;
    const probe = '__br_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return ls;
  } catch {
    return null;
  }
}

/**
 * @param opts.storage  object with getItem/setItem/removeItem (default: localStorage, or memory)
 * @param opts.now      () => Date
 * @returns the store: {state, status, save(), update(fn), reload(), leaderboardStorage(), exportText(), reset()}
 */
export function createSaveStore({ storage, now = () => new Date() } = {}) {
  const real = storage === undefined ? probeStorage() : storage;
  const st = real ?? memoryStorage();
  /**
   * status.mode:    'storage' (normal) | 'memory' (storage blocked: progress lasts until the tab closes)
   * status.loaded:  'fresh' | 'ok' | 'migrated' | 'backup' (main copy was corrupted) | 'reset' (corrupted, no backup)
   * status.writeOk: false after a failed write (quota exceeded...): the state is only in memory
   */
  const status = { mode: real ? 'storage' : 'memory', loaded: 'fresh', writeOk: true, lastError: '' };
  let state = defaultState(now());
  let lastWritten = null;
  // Profiles: the guest uses the plain keys (so a v2.0 save simply continues); every account has its
  // own slot, so signing in or out never mixes or overwrites the progress of someone else.
  let profile = GUEST;
  const keyOf = (base, p = profile) => (p === GUEST ? base : base.replace(SAVE_KEY, `${SAVE_KEY}.${p}`));
  let onSaved = null;

  const read = (key) => {
    try {
      const raw = st.getItem(key);
      return typeof raw === 'string' ? raw : null;
    } catch (e) {
      status.mode = 'memory';
      status.lastError = String(e?.message || e);
      return null;
    }
  };
  const parse = (raw) => {
    if (typeof raw !== 'string' || raw.length > MAX_BYTES) return undefined;
    try {
      const v = JSON.parse(raw);
      return v && typeof v === 'object' && !Array.isArray(v) ? v : undefined;
    } catch {
      return undefined;
    }
  };
  const tryWrite = (key, text) => {
    try {
      st.setItem(key, text);
      return true;
    } catch (e) {
      status.lastError = String(e?.message || e);
      return false;
    }
  };
  const tryRemove = (key) => {
    try {
      st.removeItem(key);
    } catch {
      /* ignore */
    }
  };

  function load() {
    const raw = read(keyOf(SAVE_KEY));
    let doc = raw === null ? undefined : parse(raw);
    let how = 'ok';
    if (raw !== null && doc === undefined) {
      // Corrupted main copy: keep the broken text for a manual rescue, fall back to the backup.
      tryWrite(keyOf(CORRUPT_KEY), raw.slice(0, MAX_BYTES));
      doc = parse(read(keyOf(BACKUP_KEY)));
      how = doc ? 'backup' : 'reset';
    }
    if (doc === undefined && how === 'ok') {
      // No v2 save yet: first start, or an update from the v1 game (only the guest can have v1 data).
      const legacy = profile === GUEST ? readLegacy(st) : null;
      if (legacy) {
        doc = legacy;
        how = 'migrated';
      } else {
        how = 'fresh';
      }
    }
    if (doc && Number.isInteger(doc.v) && doc.v > SAVE_VERSION) {
      // Written by a newer version of the game (downgrade): keep that copy untouched under its own
      // key, then read what this version understands.
      if (raw) tryWrite(keyOf(NEWER_KEY), raw);
      how = 'ok';
    } else if (doc && (!Number.isInteger(doc.v) || doc.v < SAVE_VERSION)) {
      doc = migrate(doc);
      if (how === 'ok') how = 'migrated';
    }
    state = doc ? sanitizeState(doc, now()) : defaultState(now());
    status.loaded = how;
    const text = JSON.stringify(state);
    if (how === 'ok' && raw === text) {
      lastWritten = text;
      // The copy that just loaded fine becomes the backup (only rewritten when it changed).
      if (read(keyOf(BACKUP_KEY)) !== text) tryWrite(keyOf(BACKUP_KEY), text);
    } else if (how !== 'fresh') {
      write(false); // write the repaired / migrated document back
    }
    return state;
  }

  /**
   * Write the state now. @returns true if it is safely in storage
   * @param bump true for a change made by the game: the revision goes up by one (that is what the
   *             cloud sync compares); false when a document is only stored as it is.
   */
  function write(bump) {
    let text;
    try {
      text = JSON.stringify(state);
      if (text === lastWritten && status.writeOk) return true;
      if (bump && text !== lastWritten) {
        state.sync.rev += 1;
        state.sync.at = now().getTime();
        text = JSON.stringify(state);
      }
    } catch (e) {
      status.writeOk = false;
      status.lastError = String(e?.message || e);
      return false;
    }
    let ok = tryWrite(keyOf(SAVE_KEY), text);
    if (!ok) {
      // Storage full? The backup and the rescue copy are the only things we can free. Try once more.
      tryRemove(keyOf(BACKUP_KEY));
      tryRemove(keyOf(CORRUPT_KEY));
      ok = tryWrite(keyOf(SAVE_KEY), text);
    }
    status.writeOk = ok;
    if (ok) {
      lastWritten = text;
      status.lastError = '';
    }
    if (bump) onSaved?.();
    return ok;
  }
  const save = () => write(true);

  // The session (who played last on this device) decides which slot is opened at start-up, so a
  // signed-in player sees his own progress at once, also without a network.
  const readSession = () => sanitizeSession(parse(read(SESSION_KEY)));
  let session = readSession();
  profile = session.profile;
  load();

  /** Another tab saved: take its state. @returns true if the state changed */
  function reload() {
    const raw = read(keyOf(SAVE_KEY));
    if (raw === null || raw === lastWritten) return false;
    const doc = parse(raw);
    if (!doc) return false;
    state = sanitizeState(migrate(doc), now());
    lastWritten = raw;
    return true;
  }

  return {
    get state() {
      return state;
    },
    status,
    save,
    /** Change the state with `fn(state)` and save. Returns what `fn` returned. */
    update(fn) {
      const out = fn(state);
      save();
      return out;
    },
    /**
     * Another tab saved: take its state (last writer wins) so this tab never overwrites newer
     * progress with an older copy. @returns true if the state changed
     */
    reload,
    /** A getItem/setItem view of `state.leaderboard` for the leaderboard module. */
    leaderboardStorage() {
      return {
        // (reads first pick up a save of another tab, so a new score is added to the newest list)
        getItem: () => {
          reload();
          return JSON.stringify(state.leaderboard);
        },
        setItem: (_k, v) => {
          reload();
          state.leaderboard = normalizeEntries(JSON.parse(v));
          save();
        },
        removeItem: () => {
          state.leaderboard = [];
          save();
        },
      };
    },
    /** Delete all progress of the current profile (used by the tests). */
    reset() {
      state = defaultState(now());
      lastWritten = null;
      tryRemove(keyOf(BACKUP_KEY));
      tryRemove(keyOf(CORRUPT_KEY));
      save();
      return state;
    },

    // ---- accounts (see src/cloud/account.js) ---------------------------------------------------
    /** 'guest' or 'u.<account id>'. */
    get profile() {
      return profile;
    },
    get session() {
      return { ...session };
    },
    /** Remember who is playing on this device (profile, display name, provider, "saw the welcome screen"). */
    setSession(patch) {
      session = sanitizeSession({ ...session, ...patch, profile });
      tryWrite(SESSION_KEY, JSON.stringify(session));
      return { ...session };
    },
    /** Does this profile already have a save on this device? */
    hasProfile(id) {
      return read(keyOf(SAVE_KEY, cleanProfile(id))) !== null;
    },
    /** Open the slot of another profile (the current one is already saved after every change). */
    switchProfile(id) {
      const next = cleanProfile(id);
      if (next === profile) return state;
      profile = next;
      lastWritten = null;
      status.loaded = 'fresh';
      status.writeOk = true;
      session = sanitizeSession({ ...session, profile });
      tryWrite(SESSION_KEY, JSON.stringify(session));
      return load();
    },
    /** A deep copy of the whole save document (what is sent to the account). */
    exportDoc() {
      return JSON.parse(JSON.stringify(state));
    },
    /**
     * Replace the state with a document that came from somewhere else (the account, or the guest
     * progress carried into a new account). It is validated like everything else; its revision is
     * kept as it is unless `rev` is given.
     */
    adopt(doc, { rev } = {}) {
      state = sanitizeState(migrate(doc), now());
      if (Number.isInteger(rev)) state.sync.rev = Math.max(0, rev);
      lastWritten = null;
      write(false);
      return state;
    },
    /** `fn()` is called after every change the game saved (used to schedule the upload). */
    set onSaved(fn) {
      onSaved = typeof fn === 'function' ? fn : null;
    },
    /** A tiny text slot next to the saves (used by the mock account server of the tests / demo). */
    sideSlot(name) {
      const key = `${SAVE_KEY}.x.${String(name).replace(/[^a-z0-9]/gi, '')}`;
      return { read: () => read(key), write: (text) => tryWrite(key, String(text)), clear: () => tryRemove(key) };
    },
  };
}
