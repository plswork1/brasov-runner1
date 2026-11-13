// Leaderboard: top 10 scores kept in localStorage. Written defensively - storage can be missing,
// full, blocked (private mode) or contain corrupted data, and none of that may crash the game.

export const STORAGE_KEY = 'winterRunner.leaderboard.v1';
export const MAX_ENTRIES = 10;
export const NAME_MAX = 12;

/** Trim, drop control characters, collapse spaces, limit to 12 chars. Empty -> "Jucător". */
export function sanitizeName(raw) {
  let s = typeof raw === 'string' ? raw : '';
  s = s.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim();
  s = Array.from(s).slice(0, NAME_MAX).join('').trim(); // Array.from keeps emoji intact
  return s || 'Jucător';
}

function validEntry(e) {
  return (
    e &&
    typeof e === 'object' &&
    typeof e.score === 'number' &&
    Number.isFinite(e.score) &&
    e.score >= 0
  );
}

/** Turn whatever was stored into a clean, sorted, max-10 list. Garbage entries are dropped. */
export function normalizeEntries(any) {
  if (!Array.isArray(any)) return [];
  const clean = any.filter(validEntry).map((e, i) => ({
    id: typeof e.id === 'string' ? e.id : `legacy-${i}`,
    name: sanitizeName(e.name),
    score: Math.min(1e9, Math.floor(e.score)),
    coins: Number.isFinite(e.coins) ? Math.max(0, Math.floor(e.coins)) : 0,
    distance: Number.isFinite(e.distance) ? Math.max(0, Math.floor(e.distance)) : 0,
    date: typeof e.date === 'string' ? e.date : '',
  }));
  clean.sort((a, b) => b.score - a.score || (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return clean.slice(0, MAX_ENTRIES);
}

/** localStorage if usable, otherwise an in-memory fallback so the game still works. */
export function safeStorage() {
  try {
    const ls = globalThis.localStorage;
    if (!ls) throw new Error('no storage');
    const probe = '__wr_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return ls;
  } catch {
    const mem = new Map();
    return {
      getItem: (k) => (mem.has(k) ? mem.get(k) : null),
      setItem: (k, v) => void mem.set(k, String(v)),
      removeItem: (k) => void mem.delete(k),
    };
  }
}

export function createLeaderboard(storage = safeStorage(), now = () => new Date()) {
  function read() {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      return raw ? normalizeEntries(JSON.parse(raw)) : [];
    } catch {
      return []; // corrupted JSON or blocked storage
    }
  }
  function write(entries) {
    try {
      storage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return true;
    } catch {
      return false; // quota exceeded / blocked: keep playing anyway
    }
  }
  let memoryCopy = null; // used if writing fails, so the session still shows the scores

  return {
    getTop() {
      return memoryCopy ?? read();
    },
    /** Would this score make it into the top 10? (0 never qualifies) */
    qualifies(score) {
      const s = Math.floor(score);
      if (!Number.isFinite(s) || s <= 0) return false;
      const top = this.getTop();
      return top.length < MAX_ENTRIES || s > top[top.length - 1].score;
    },
    /** Add a score. Returns {entries, entry, rank} where rank is 1-based or null if it did not make the top 10. */
    add({ name, score, coins = 0, distance = 0 }) {
      const entry = {
        id: `${now().getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
        name: sanitizeName(name),
        score: Math.floor(score),
        coins,
        distance,
        date: now().toISOString(),
      };
      const entries = normalizeEntries([...this.getTop(), entry]);
      const idx = entries.findIndex((e) => e.id === entry.id);
      memoryCopy = write(entries) ? null : entries;
      return { entries, entry, rank: idx >= 0 ? idx + 1 : null };
    },
    clear() {
      memoryCopy = null;
      try {
        storage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
    },
  };
}
