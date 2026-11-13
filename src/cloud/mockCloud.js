/**
 * A FAKE sign-in service and cloud for the tests and for showing the flow without a Firebase
 * project (open the game with `?mockauth`). It implements the two interfaces of account.js.
 * Nothing leaves the device: the "accounts" are two fixed test users and the "cloud" is a text
 * slot next to the saves (`store.sideSlot`), so it also survives a reload like a real server would.
 */
const USERS = {
  google: { uid: 'mock-google', name: 'Cont de test (Google)', provider: 'google' },
  apple: { uid: 'mock-apple', name: 'Cont de test (Apple)', provider: 'apple' },
};

/**
 * @param o.slot         text slot of the fake SERVER (the saves of the accounts; shared by "devices" in the tests)
 * @param o.sessionSlot  text slot of THIS device: who is signed in here (like the SDK's remembered session)
 */
export function createMockCloud({ slot, sessionSlot, providers = ['google', 'apple'], isOnline = () => (typeof navigator === 'undefined' ? true : navigator.onLine !== false) } = {}) {
  const memSlot = () => {
    let mem = '';
    return { read: () => mem, write: (t) => void (mem = t) };
  };
  const io = slot ?? memSlot();
  const sio = sessionSlot ?? memSlot();
  const readDb = () => {
    let saves = {};
    let scores = {}; // the shared leaderboard: uid -> {name, score}
    try {
      const d = JSON.parse(io.read() || '{}');
      if (d.saves && typeof d.saves === 'object') saves = d.saves;
      if (d.scores && typeof d.scores === 'object') scores = d.scores;
    } catch {
      /* empty server */
    }
    const cur = sio.read();
    return { current: typeof cur === 'string' && USERS[cur] ? cur : null, saves, scores };
  };
  const writeDb = (d) => {
    io.write(JSON.stringify({ saves: d.saves, scores: d.scores }));
    sio.write(d.current ?? '');
  };
  let listener = null;
  const revOf = (doc) => (Number.isFinite(doc?.sync?.rev) ? doc.sync.rev : 0);

  const auth = {
    providers,
    async init() {},
    onChange(cb) {
      listener = cb;
      cb(USERS[readDb().current] ?? null); // like a real service: the remembered session first
    },
    async signIn(provider) {
      if (!USERS[provider]) return { ok: false, reason: 'unavailable' };
      if (!isOnline()) return { ok: false, reason: 'offline' };
      const d = readDb();
      d.current = provider;
      writeDb(d);
      listener?.(USERS[provider]);
      return { ok: true };
    },
    async signOut() {
      const d = readDb();
      d.current = null;
      writeDb(d);
      listener?.(null);
    },
  };
  const cloud = {
    async load(uid) {
      if (!isOnline()) throw new Error('offline');
      return readDb().saves[uid] ?? null;
    },
    async save(uid, doc) {
      if (!isOnline()) throw new Error('offline');
      const d = readDb();
      const remote = d.saves[uid];
      if (remote && revOf(remote) > revOf(doc)) return { ok: false, conflict: remote };
      d.saves[uid] = doc;
      writeDb(d);
      return { ok: true };
    },
    // the shared leaderboard (see scoreboard.js)
    async topScores(n) {
      if (!isOnline()) throw new Error('offline');
      return Object.entries(readDb().scores)
        .map(([uid, r]) => ({ uid, name: r?.name, score: r?.score }))
        .sort((a, b) => b.score - a.score)
        .slice(0, n);
    },
    async submitScore(uid, { name, score }) {
      if (!isOnline()) throw new Error('offline');
      const d = readDb();
      // like the server rules: only the signed-in account's own row, and only upward
      if (!d.current || USERS[d.current].uid !== uid) throw new Error('permission-denied');
      const old = d.scores[uid]?.score ?? -1;
      if (score <= old) return { ok: false, best: old };
      d.scores[uid] = { name: USERS[d.current].name, score };
      writeDb(d);
      return { ok: true, best: score };
    },
  };
  return { auth, cloud, users: USERS };
}
