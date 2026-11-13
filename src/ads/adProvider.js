import { CFG } from '../config.js';

/**
 * Rewarded ads behind one small interface, so the game never talks to an ad SDK directly.
 *
 *   interface AdProvider {
 *     // Can a rewarded ad be shown right now? reason: 'offline' | 'busy' | 'unavailable'
 *     isAvailable(): { ok: boolean, reason?: string }
 *     // Show one rewarded ad. Resolves (never rejects) when the ad is over:
 *     //   completed = true ONLY if the whole ad was watched; reason says why not otherwise
 *     //   ('cancelled' | 'offline' | 'busy' | 'error')
 *     showRewarded(): Promise<{ completed: boolean, reason?: string }>
 *     // Close the ad that is showing (restart, back to menu). It resolves with completed = false.
 *     cancel(): void
 *   }
 *
 * The default implementation is `MockAdProvider`: a FAKE "ad" screen with a countdown. No network
 * request, no SDK, no identifiers, no tracking. See README ("Reclame") for how a real SDK (AdMob
 * through Capacitor, Google H5 Games Ads) would implement the same three methods.
 */

/**
 * The countdown of the mock ad (pure logic, driven by `tick`, so it is easy to test).
 * Only time spent with the ad VISIBLE counts: while the tab/app is in the background the countdown
 * stands still, and a single huge time step (a suspended tab waking up) counts for 1 s at most.
 */
const MAX_STEP = 1; // seconds: the most one tick can count (a slow phone still finishes on time)

export class MockAdSession {
  constructor(duration = CFG.ads.mockSeconds) {
    this.duration = Math.max(0.1, duration);
    this.watched = 0;
    this.visible = true;
    this.state = 'playing'; // 'playing' | 'completed' | 'cancelled'
  }

  setVisible(v) {
    this.visible = !!v;
  }

  /** @param dt seconds since the last tick @returns the state after the step */
  tick(dt) {
    if (this.state !== 'playing' || !this.visible) return this.state;
    if (!(dt > 0) || !Number.isFinite(dt)) return this.state;
    this.watched = Math.min(this.duration, this.watched + Math.min(dt, MAX_STEP));
    if (this.watched >= this.duration - 1e-9) {
      this.watched = this.duration;
      this.state = 'completed';
    }
    return this.state;
  }

  cancel() {
    if (this.state === 'playing') this.state = 'cancelled';
    return this.state;
  }

  get remaining() {
    return Math.max(0, this.duration - this.watched);
  }
  get fraction() {
    return this.watched / this.duration;
  }
  /** The reward may only be given for a fully watched ad. */
  get rewardEarned() {
    return this.state === 'completed';
  }
}

/**
 * Mock provider. `view` draws the fake ad ({open(session), update(session), close()}); `schedule`
 * and `now` are injectable so the unit tests can drive time by hand.
 */
export class MockAdProvider {
  constructor({ view, duration = CFG.ads.mockSeconds, needsNetwork = CFG.ads.mockNeedsNetwork, isOnline, isVisible, schedule, now } = {}) {
    this.view = view ?? { open() {}, update() {}, close() {} };
    this.duration = duration;
    this.needsNetwork = needsNetwork;
    this.isOnline = isOnline ?? (() => (typeof navigator === 'undefined' ? true : navigator.onLine !== false));
    this.isVisible = isVisible ?? (() => (typeof document === 'undefined' ? true : !document.hidden));
    this.schedule = schedule ?? ((fn) => setTimeout(fn, 100));
    this.now = now ?? (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    this.active = null; // {session, resolve}
  }

  isAvailable() {
    if (this.active) return { ok: false, reason: 'busy' };
    if (this.needsNetwork && !this.isOnline()) return { ok: false, reason: 'offline' };
    return { ok: true };
  }

  showRewarded() {
    const avail = this.isAvailable();
    if (!avail.ok) return Promise.resolve({ completed: false, reason: avail.reason });
    return new Promise((resolve) => {
      const session = new MockAdSession(this.duration);
      const run = { session, resolve, last: this.now() };
      this.active = run;
      this.view.open(session);
      const step = () => {
        if (this.active !== run) return; // cancelled meanwhile
        const t = this.now();
        session.setVisible(this.isVisible());
        session.tick((t - run.last) / 1000);
        run.last = t;
        this.view.update(session);
        if (session.state === 'completed') this._finish(run, { completed: true });
        else this.schedule(step);
      };
      this.schedule(step);
    });
  }

  cancel() {
    const run = this.active;
    if (!run) return;
    run.session.cancel();
    this._finish(run, { completed: false, reason: 'cancelled' });
  }

  _finish(run, result) {
    if (this.active !== run) return;
    this.active = null;
    this.view.close();
    run.resolve(result);
  }
}
