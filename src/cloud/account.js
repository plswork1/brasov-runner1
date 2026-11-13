import { profileOf, GUEST } from '../logic/save.js';

/**
 * Accounts and cloud saves (logic only: the sign-in service and the cloud are injected, so this
 * file is covered by unit tests with fakes and knows nothing about Firebase).
 *
 *   interface AuthProvider {
 *     providers: string[]                         // sign-in buttons to show: 'google', 'apple'
 *     init(): Promise<void>
 *     onChange(cb: (user | null) => void): void   // user = {uid, name, provider}
 *     signIn(provider): Promise<{ok: boolean, reason?: 'cancelled' | 'offline' | 'popup' | 'unavailable' | 'error'}>
 *     signOut(): Promise<void>
 *   }
 *   interface CloudStore {
 *     load(uid): Promise<object | null>           // the save document of the account, or null
 *     save(uid, doc): Promise<{ok: true} | {ok: false, conflict: object}>   // conflict = a NEWER document is already there
 *   }
 *
 * Rules (kept simple on purpose, so nobody loses progress by surprise):
 *  - Every account has its own save slot on the device; the guest has another one. Signing in or
 *    out switches slots and never merges two progresses.
 *  - First sign-in of an account that has no cloud save yet: the guest progress of this device is
 *    COPIED into the account (you keep what you played before signing in).
 *  - The account already has a cloud save: the copy with the higher revision wins (a device that
 *    was never used with this account always takes the cloud copy).
 *  - After that every change is uploaded a moment later; if the cloud meanwhile got a newer copy
 *    from another device, that copy is taken instead ("the newest one wins").
 *  - Nothing is switched in the middle of a run (`canSwitch`); it happens on the next menu.
 *  - No network: the game keeps running from the device copy and uploads when it can.
 */
export class Account {
  constructor({ store, auth, cloud, canSwitch = () => true, onChange = () => {}, schedule = (fn) => setTimeout(fn, 2500) }) {
    this.store = store;
    this.auth = auth;
    this.cloud = cloud;
    this.canSwitch = canSwitch;
    this.onChange = onChange;
    this.schedule = schedule;
    this.user = null; // {uid, name, provider}
    this.status = 'guest'; // 'guest' | 'syncing' | 'synced' | 'offline'
    this.busy = false; // a sign-in window is open
    this.pendingUser = undefined; // an auth change that waits for the end of the run
    this.pushQueued = false;
    this.chain = Promise.resolve(); // auth changes and uploads run one after the other
    store.onSaved = () => this._queuePush();
  }

  get providers() {
    return this.auth?.providers ?? [];
  }
  /** Is there any real sign-in at all? (false = the game is guest-only) */
  get available() {
    return this.providers.length > 0;
  }
  /** Show the welcome screen ("how do you want to play?") once per device. */
  get needsWelcome() {
    return this.available && !this.user && !this.store.session.welcomed;
  }

  async start() {
    if (!this.auth) return;
    try {
      await this.auth.init();
      this.auth.onChange((user) => this._onUser(user));
    } catch {
      this.auth = null; // sign-in could not start (blocked script, bad config): guest only
      this.onChange({ type: 'unavailable' });
    }
  }

  playAsGuest() {
    this.store.setSession({ welcomed: true });
    this.onChange({ type: 'guest' });
  }

  /** @returns {{ok: boolean, reason?: string}} */
  async signIn(provider) {
    if (!this.auth || this.busy) return { ok: false, reason: this.busy ? 'busy' : 'unavailable' };
    if (!this.providers.includes(provider)) return { ok: false, reason: 'unavailable' };
    this.busy = true;
    try {
      const res = await this.auth.signIn(provider);
      return res?.ok ? { ok: true } : { ok: false, reason: res?.reason || 'error' };
    } catch {
      return { ok: false, reason: 'error' };
    } finally {
      this.busy = false;
    }
  }

  async signOut() {
    if (!this.auth || !this.user) return;
    await this.flush(); // the last changes go to the account first
    try {
      await this.auth.signOut();
    } catch {
      /* the auth listener decides what happened */
    }
  }

  /** The game is back on a menu: apply an account change that arrived during the run. */
  resume() {
    if (this.pendingUser === undefined) return;
    const user = this.pendingUser;
    this.pendingUser = undefined;
    this._onUser(user);
  }

  /** Upload now (app goes to the background, sign-out). */
  flush() {
    if (!this.user) return Promise.resolve();
    this.pushQueued = false;
    return this._run(() => this._push());
  }

  /** Back in the foreground: did another device save something newer? */
  refresh() {
    if (!this.user || !this.canSwitch()) return Promise.resolve();
    return this._run(async () => {
      const uid = this.user.uid;
      const doc = await this._load(uid);
      if (doc && this.user?.uid === uid && rev(doc) > this.store.state.sync.rev && this.canSwitch()) {
        this.store.adopt(doc);
        this._set('synced', { type: 'pulled', user: this.user });
      }
    });
  }

  // ---- internals ---------------------------------------------------------------------------------

  _run(fn) {
    this.chain = this.chain.then(fn).catch(() => {});
    return this.chain;
  }

  _set(status, event) {
    this.status = status;
    if (event) this.onChange(event);
  }

  _onUser(user) {
    if (!this.canSwitch()) {
      this.pendingUser = user; // not in the middle of a run
      return this.chain;
    }
    return this._run(() => this._apply(user));
  }

  async _load(uid) {
    try {
      const doc = await this.cloud.load(uid);
      return doc && typeof doc === 'object' ? doc : null;
    } catch {
      return undefined; // not reachable
    }
  }

  async _apply(user) {
    if (!user) {
      const was = this.user;
      this.user = null;
      const wasAccount = this.store.profile !== GUEST;
      if (wasAccount) this.store.switchProfile(GUEST);
      // (a first start without a session must still show the welcome screen)
      if (was || wasAccount) this.store.setSession({ name: '', provider: '', welcomed: true });
      this._set('guest', was || wasAccount ? { type: 'signed-out' } : null);
      return;
    }
    const id = profileOf(user.uid);
    const sameAsBefore = this.store.profile === id;
    const fresh = !this.store.hasProfile(id); // this device never played with this account
    const guestDoc = this.store.profile === GUEST ? this.store.exportDoc() : null;
    this.user = { uid: String(user.uid), name: String(user.name || 'Jucător').slice(0, 40), provider: String(user.provider || '') };
    this.store.switchProfile(id);
    this.store.setSession({ name: this.user.name, provider: this.user.provider, welcomed: true });
    this._set('syncing', sameAsBefore ? null : { type: 'signed-in', user: this.user });

    const cloudDoc = await this._load(user.uid);
    if (this.user?.uid !== String(user.uid)) return; // signed out meanwhile
    if (cloudDoc === undefined) {
      // The account could not be reached. Start from the guest progress on a new device, but with
      // revision 0, so the cloud copy (if there is one) wins as soon as it can be read.
      if (fresh && guestDoc) this.store.adopt(guestDoc, { rev: 0 });
      this._set('offline', { type: 'offline', user: this.user });
      return;
    }
    if (cloudDoc && (fresh || rev(cloudDoc) >= this.store.state.sync.rev)) {
      this.store.adopt(cloudDoc);
      this._set('synced', { type: 'pulled', user: this.user });
      return;
    }
    let carried = false;
    if (!cloudDoc && fresh && guestDoc) {
      this.store.adopt(guestDoc); // first time with this account: keep what was played as a guest
      carried = true;
    }
    await this._push();
    if (this.status === 'synced') this.onChange({ type: carried ? 'carried' : 'pushed', user: this.user });
  }

  _queuePush() {
    if (!this.user || this.pushQueued) return;
    this.pushQueued = true;
    this.schedule(() => {
      if (!this.pushQueued) return;
      this.pushQueued = false;
      this._run(() => this._push());
    });
  }

  async _push() {
    const user = this.user;
    if (!user || this.store.profile !== profileOf(user.uid)) return;
    try {
      const res = await this.cloud.save(user.uid, this.store.exportDoc());
      if (this.user?.uid !== user.uid) return;
      if (res?.ok) return this._set('synced', { type: 'saved', user });
      if (res?.conflict && rev(res.conflict) > this.store.state.sync.rev) {
        if (!this.canSwitch()) return this._set('offline'); // a run is on: try again after it
        this.store.adopt(res.conflict); // another device was newer
        return this._set('synced', { type: 'pulled', user });
      }
      this._set('offline', { type: 'offline', user });
    } catch {
      if (this.user?.uid === user.uid) this._set('offline', { type: 'offline', user });
    }
  }
}

const rev = (doc) => {
  const r = doc?.sync?.rev;
  return typeof r === 'number' && Number.isFinite(r) ? Math.max(0, Math.floor(r)) : 0;
};
