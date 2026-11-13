/**
 * The shared leaderboard ("Clasament"): one row per ACCOUNT, holding that account's best score
 * under the name of the account. Everybody who opens the game sees the same list.
 *
 * Like account.js this file holds all the decisions and talks to the server only through a small
 * interface, so it is unit-tested with a fake (tests/scoreboard.test.js):
 *
 *   cloud.topScores(n): Promise<[{uid, name, score}]>            best first
 *   cloud.submitScore(uid, {name, score}): Promise<{ok, best}>   keeps the HIGHER of old and new; best = what is stored now
 *
 * Rules of the game (owner's request):
 *   - the name is the account's name; the player cannot type or change it here;
 *   - only signed-in players are in the list; a guest sees it but his scores stay on his device;
 *   - a score is sent automatically at the end of a run, and only a better one replaces the old;
 *   - nothing here can block or break a run: every failure just leaves the list as it was, and the
 *     best local score is sent again the next time `sync()` runs (start, menu, back online).
 *
 * Honesty note: scores are computed on the player's device. The server rules stop everything they
 * can (own row only, the name of the signed-in account, only upward, a sanity cap), but they cannot
 * prove that a score was really played.
 */
export const BOARD_SIZE = 20;
export const BOARD_NAME_MAX = 20;
export const SCORE_CAP = 5_000_000; // (the same cap as in the server rules)

/** A name as shown in the list: no control characters or markup, single spaces, at most 20 characters. */
export function boardName(raw) {
  let s = typeof raw === 'string' ? raw : '';
  s = s.replace(/[\u0000-\u001f\u007f<>]/g, '').replace(/\s+/g, ' ').trim();
  s = Array.from(s).slice(0, BOARD_NAME_MAX).join('').trim();
  return s || 'Jucător';
}

/** Whatever came from the server -> a clean list, best first, one row per account. */
export function cleanRows(any, size = BOARD_SIZE) {
  if (!Array.isArray(any)) return [];
  const seen = new Set();
  const rows = [];
  for (const r of any) {
    if (!r || typeof r !== 'object' || typeof r.uid !== 'string' || !r.uid || seen.has(r.uid)) continue;
    if (typeof r.score !== 'number' || !Number.isFinite(r.score) || r.score < 0) continue;
    seen.add(r.uid);
    rows.push({ id: r.uid, name: boardName(r.name), score: Math.min(SCORE_CAP, Math.floor(r.score)) });
  }
  rows.sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : 1));
  return rows.slice(0, size);
}

export class Scoreboard {
  /**
   * @param o.cloud      {topScores, submitScore} or null (no server: the game shows the local Top 10)
   * @param o.getUser    () => {uid, name} | null   the signed-in account
   * @param o.localBest  () => number               best score saved on this device for the current profile
   * @param o.onChange   () => void                 the list or its status changed (redraw)
   * @param o.now        () => ms
   */
  constructor({ cloud, getUser, localBest = () => 0, onChange = () => {}, now = () => Date.now(), minGap = 20000 }) {
    this.cloud = cloud && typeof cloud.topScores === 'function' && typeof cloud.submitScore === 'function' ? cloud : null;
    this.getUser = getUser;
    this.localBest = localBest;
    this.onChange = onChange;
    this.now = now;
    this.minGap = minGap; // do not ask the server for the list more often than this
    this.rows = [];
    this.status = this.cloud ? 'idle' : 'off'; // 'off' | 'idle' | 'loading' | 'ready' | 'offline'
    this.mine = {}; // uid -> best score known to be on the server
    this.lastLoad = -Infinity;
    this.busy = null;
  }

  get available() {
    return !!this.cloud;
  }

  /** True once a list has been received (it may be empty). */
  get loaded() {
    return this.status === 'ready' || (this.status === 'offline' && this.lastLoad > -Infinity);
  }

  get user() {
    return this.cloud ? this.getUser() : null;
  }

  /** 1-based place of the signed-in player in the loaded list, or 0. */
  get myRank() {
    const u = this.user;
    return u ? this.rows.findIndex((r) => r.id === u.uid) + 1 : 0;
  }

  /** The signed-in player's best score on the server, as far as we know (null = unknown). */
  get myBest() {
    const u = this.user;
    if (!u) return null;
    const row = this.rows.find((r) => r.id === u.uid);
    return row ? Math.max(row.score, this.mine[u.uid] ?? 0) : (this.mine[u.uid] ?? null);
  }

  /** Load the list (not more often than `minGap`, unless forced). Never throws. */
  async refresh(force = false) {
    if (!this.cloud) return false;
    if (this.busy) return this.busy;
    if (!force && this.now() - this.lastLoad < this.minGap) return true;
    this.status = this.loaded ? this.status : 'loading';
    this.busy = (async () => {
      try {
        this.rows = cleanRows(await this.cloud.topScores(BOARD_SIZE));
        this.lastLoad = this.now();
        this.status = 'ready';
        return true;
      } catch {
        this.status = 'offline';
        return false;
      } finally {
        this.busy = null;
        this.onChange();
      }
    })();
    return this.busy;
  }

  /**
   * Send a score of the signed-in player. Returns
   *   {ok: false, reason: 'off' | 'guest' | 'offline'}   nothing was sent
   *   {ok: true, improved, best, rank}                   best = his score on the server now
   */
  async submit(score) {
    if (!this.cloud) return { ok: false, reason: 'off' };
    const u = this.getUser();
    if (!u) return { ok: false, reason: 'guest' };
    score = Math.min(SCORE_CAP, Math.floor(Number(score) || 0));
    const known = this.mine[u.uid];
    if (score <= 0 || (known !== undefined && score <= known)) {
      return { ok: true, improved: false, best: known ?? 0, rank: this.myRank };
    }
    try {
      const r = await this.cloud.submitScore(u.uid, { name: String(u.name || ''), score });
      const best = Math.max(Number(r?.best) || 0, r?.ok ? score : 0);
      this.mine[u.uid] = best;
      // show it at once (the next refresh brings the real list)
      const rows = this.rows.filter((x) => x.id !== u.uid);
      rows.push({ uid: u.uid, name: u.name, score: best });
      this.rows = cleanRows(rows.map((x) => ({ uid: x.uid ?? x.id, name: x.name, score: x.score })));
      this.onChange();
      return { ok: true, improved: best === score && !!r?.ok, best, rank: this.myRank };
    } catch {
      this.status = 'offline';
      this.onChange();
      return { ok: false, reason: 'offline' };
    }
  }

  /**
   * Bring the list up to date and make sure the signed-in player's best LOCAL score is on the
   * server (covers runs played offline and the first sign-in of a device with old scores).
   */
  async sync(force = false) {
    if (!this.cloud) return;
    await this.refresh(force);
    const u = this.getUser();
    if (!u) return;
    const local = Math.floor(Number(this.localBest()) || 0);
    const best = this.myBest;
    if (local > 0 && (best === null || local > best)) await this.submit(local);
  }
}
