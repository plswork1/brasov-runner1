import { CFG } from '../config.js';
import { canAfford, spend } from './economy.js';

/**
 * Revive ("Continui?") state machine for ONE run (pure logic).
 *
 *   idle ──offer()──▶ offered ──payCrowns()──▶ idle   (revived, used + 1)
 *                        │  ▲
 *                 startAd()  adFinished(token, false)   (ad closed / failed: back to the offer)
 *                        ▼  │
 *                        ad ──adFinished(token, true)──▶ idle   (revived, used + 1)
 *             offered ──decline()──▶ over
 *
 * Every transition is only valid from one state, so double taps, a late answer of an old ad or a
 * restart in the middle of an ad can never revive twice or revive the wrong run:
 *  - `payCrowns` / `startAd` / `decline` do nothing unless the offer is on screen;
 *  - `adFinished` needs the token returned by `startAd` (a new token is made for every ad);
 *  - `cancel()` (restart, back to menu) invalidates everything.
 *
 * The price in crowns grows with every revive of the run (CFG.revive.costs) and the length of that
 * list is the limit of revives per run. At most `maxAds` of them can be paid by watching an ad.
 */
export class ReviveSession {
  constructor(cfg = CFG.revive) {
    this.cfg = cfg;
    this.used = 0;
    this.adsUsed = 0;
    this.state = 'idle'; // 'idle' | 'offered' | 'ad' | 'over'
    this.token = 0;
  }

  get limit() {
    return this.cfg.costs.length;
  }
  get left() {
    return Math.max(0, this.limit - this.used);
  }
  /** Can a revive be offered at all? */
  get available() {
    return this.state !== 'over' && this.used < this.limit;
  }
  /** Price of the next revive in crowns (null when the limit is reached). */
  get cost() {
    return this.used < this.limit ? this.cfg.costs[this.used] : null;
  }
  get adAllowed() {
    return this.adsUsed < this.cfg.maxAds;
  }

  /** The bear caught the player: show the offer. @returns true if there is an offer */
  offer() {
    if (this.state !== 'idle' || !this.available) return false;
    this.state = 'offered';
    return true;
  }

  /** @returns {{ok: true, cost} | {ok: false, reason: 'state'|'funds'}} */
  payCrowns(wallet) {
    if (this.state !== 'offered') return { ok: false, reason: 'state' };
    const cost = { crowns: this.cost };
    if (!canAfford(wallet, cost) || !spend(wallet, cost)) return { ok: false, reason: 'funds' };
    this._granted();
    return { ok: true, cost: cost.crowns };
  }

  /** @returns a token for adFinished(), or null if an ad cannot start now */
  startAd() {
    if (this.state !== 'offered' || !this.adAllowed) return null;
    this.state = 'ad';
    this.token++;
    return this.token;
  }

  /**
   * The ad provider answered.
   * @returns 'revived' | 'back' (ad not finished: the offer is shown again) | 'ignored'
   */
  adFinished(token, completed) {
    if (this.state !== 'ad' || token !== this.token) return 'ignored';
    if (completed !== true) {
      this.state = 'offered';
      return 'back';
    }
    this.adsUsed++;
    this._granted();
    return 'revived';
  }

  /** "Nu, mulțumesc". @returns true if the run is now really over */
  decline() {
    if (this.state !== 'offered') return false;
    this.state = 'over';
    return true;
  }

  /** Restart / back to menu: nothing of this session may have an effect any more. */
  cancel() {
    this.state = 'over';
    this.token++;
  }

  _granted() {
    this.used++;
    this.state = 'idle';
  }
}
