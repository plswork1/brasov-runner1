/**
 * The real sign-in service and cloud: Firebase Authentication (Google, Apple) + Firestore.
 * Implements the two interfaces of account.js. The Firebase SDK is loaded only when a project is
 * configured (src/cloud/config.js), so guests never download it.
 *
 * Cloud layout: one document per account, `saves/{uid}` = {data: <the save document as JSON text>,
 * rev: <revision>, updatedAt: <server time>}. With the rules from the README only the owner can
 * read or write it. Whatever comes back is validated by `sanitizeState` like every other save.
 *
 * The shared leaderboard is one document per account, `scores/{uid}` = {name, score, updatedAt}:
 * everybody may read them, only the owner may write his own, with the name of his account and
 * only with a higher score (rules in the README).
 *
 * NOTE: this file has not been run against the real project with a real sign-in yet (a sign-in
 * needs the owner's Google account). The logic around it (account.js, scoreboard.js) is tested
 * with the mock; test this part once with your own account (README, "Conturi").
 */
export async function createFirebaseCloud(config, providers) {
  const [{ initializeApp }, A, F] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore/lite')]);
  const app = initializeApp(config);
  const auth = A.getAuth(app);
  const db = F.getFirestore(app);
  const ref = (uid) => F.doc(db, 'saves', uid);
  const scoreRef = (uid) => F.doc(db, 'scores', uid);
  // (never the e-mail address: the name is shown to everybody in the leaderboard)
  const toUser = (u) => (u ? { uid: u.uid, name: u.displayName || 'Jucător', provider: (u.providerData?.[0]?.providerId || '').replace('.com', '') } : null);
  const makeProvider = (id) => {
    if (id === 'google') return new A.GoogleAuthProvider();
    if (id === 'apple') {
      const p = new A.OAuthProvider('apple.com');
      p.addScope('name');
      return p;
    }
    return null;
  };
  const reasonOf = (code) =>
    code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request' || code === 'auth/user-cancelled'
      ? 'cancelled'
      : code === 'auth/network-request-failed'
        ? 'offline'
        : code === 'auth/popup-blocked'
          ? 'popup'
          : code === 'auth/operation-not-allowed' || code === 'auth/unauthorized-domain'
            ? 'unavailable'
            : 'error';

  return {
    auth: {
      providers,
      async init() {
        await auth.authStateReady?.();
      },
      onChange(cb) {
        A.onAuthStateChanged(auth, (u) => cb(toUser(u)));
      },
      async signIn(id) {
        const provider = makeProvider(id);
        if (!provider) return { ok: false, reason: 'unavailable' };
        try {
          await A.signInWithPopup(auth, provider);
          return { ok: true };
        } catch (e) {
          return { ok: false, reason: reasonOf(e?.code) };
        }
      },
      async signOut() {
        await A.signOut(auth);
      },
    },
    cloud: {
      async load(uid) {
        const snap = await F.getDoc(ref(uid));
        if (!snap.exists()) return null;
        try {
          const doc = JSON.parse(snap.data().data);
          return doc && typeof doc === 'object' ? doc : null;
        } catch {
          return null; // unreadable cloud copy: treated as "no save yet"
        }
      },
      async save(uid, doc) {
        const rev = Number.isFinite(doc?.sync?.rev) ? doc.sync.rev : 0;
        return F.runTransaction(db, async (tx) => {
          const snap = await tx.get(ref(uid));
          if (snap.exists() && (snap.data().rev || 0) > rev) {
            try {
              return { ok: false, conflict: JSON.parse(snap.data().data) };
            } catch {
              /* broken remote copy: overwrite it */
            }
          }
          tx.set(ref(uid), { data: JSON.stringify(doc), rev, updatedAt: F.serverTimestamp() });
          return { ok: true };
        });
      },
      // the shared leaderboard (see scoreboard.js)
      async topScores(n) {
        const snap = await F.getDocs(F.query(F.collection(db, 'scores'), F.orderBy('score', 'desc'), F.limit(n)));
        return snap.docs.map((d) => ({ uid: d.id, name: d.data().name, score: d.data().score }));
      },
      async submitScore(uid, { score }) {
        // The server rules require the row to carry exactly the name of the signed-in account.
        const name = auth.currentUser?.uid === uid ? auth.currentUser.displayName : null;
        if (!name) throw new Error('no account name');
        return F.runTransaction(db, async (tx) => {
          const snap = await tx.get(scoreRef(uid));
          const old = snap.exists() ? Number(snap.data().score) || 0 : -1;
          if (score <= old) return { ok: false, best: old };
          tx.set(scoreRef(uid), { name, score, updatedAt: F.serverTimestamp() });
          return { ok: true, best: score };
        });
      },
    },
  };
}
