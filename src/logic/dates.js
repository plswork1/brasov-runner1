/**
 * Local-date helpers (pure). Missions and the battle pass reset by the LOCAL calendar date of the
 * device, so everything here works on year/month/day numbers and never on "24 h since ...".
 * That also makes it immune to daylight-saving changes (a day can have 23 or 25 hours).
 */

/** A valid Date, or the fallback when the clock gives garbage. */
export function safeDate(d, fallback = new Date(2026, 0, 1)) {
  return d instanceof Date && Number.isFinite(d.getTime()) ? d : fallback;
}

/** Number of the local calendar day (days since 1970-01-01, counted on the local date). */
export function dayNumber(date) {
  const d = safeDate(date);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000);
}

/** 'YYYY-MM-DD' of the local date. Keys of the same format compare correctly as strings. */
export function dayKey(date) {
  const d = safeDate(date);
  const p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(d.getFullYear(), 4)}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** Key of the week: the dayKey of its Monday (weeks run Monday..Sunday, local time). */
export function weekKey(date) {
  const d = safeDate(date);
  const back = (d.getDay() + 6) % 7; // Monday = 0 ... Sunday = 6
  return dayKey(new Date(d.getFullYear(), d.getMonth(), d.getDate() - back));
}

const KEY_RE = /^\d{4}-\d{2}-\d{2}$/;
export function isDayKey(s) {
  return typeof s === 'string' && KEY_RE.test(s);
}

/** Whole days from now until the next local Monday (1..7). */
export function daysUntilNextWeek(date) {
  const d = safeDate(date);
  return 7 - ((d.getDay() + 6) % 7);
}

/** Small deterministic string hash (FNV-1a), used to seed "today's missions". */
export function hashString(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
