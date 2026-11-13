import { CFG } from '../config.js';
import * as Economy from './economy.js';
import * as Cosmetics from './cosmetics.js';
import * as Missions from './missions.js';
import * as Pass from './battlepass.js';

/**
 * The "meta game" in one place (pure logic: storage and clock are injected).
 * It connects the save state with the economy, the cosmetics, the missions and the battle pass,
 * and it is the only code that changes those parts of the state. Every method saves when it changed
 * something and is safe to call twice (double taps never pay or reward twice).
 */
export class Meta {
  /**
   * @param store save store (see save.js)
   * @param now   () => Date
   */
  constructor({ store, now = () => new Date() }) {
    this.store = store;
    this.now = now;
    this.sync();
  }

  get state() {
    return this.store.state;
  }
  get wallet() {
    return this.state.wallet;
  }
  get cosmetics() {
    return this.state.cosmetics;
  }
  get missions() {
    return this.state.missions;
  }
  get pass() {
    return this.state.pass;
  }
  get settings() {
    return this.state.settings;
  }

  /**
   * Before changing anything: if another tab of the game saved meanwhile, continue from ITS state.
   * Every change here is a delta (add coins, mark claimed...), so applying it on top of the newer
   * state merges the two tabs instead of overwriting one with the other.
   */
  _fresh() {
    this.store.reload?.();
  }

  // ---- rewards -----------------------------------------------------------------------------------

  /**
   * Give a reward {coins?, crowns?, xp?, item?: {kind, id}} without saving.
   * @returns a list of what was really given, for the UI:
   *          [{type: 'coins'|'crowns'|'xp', amount} | {type: 'item', kind, id, name, duplicate, coins?}]
   */
  _grant(reward) {
    const out = [];
    const r = reward && typeof reward === 'object' ? reward : {};
    const added = Economy.earn(this.wallet, r);
    if (r.coins) out.push({ type: 'coins', amount: added.coins });
    if (r.crowns) out.push({ type: 'crowns', amount: added.crowns });
    if (r.xp) out.push({ type: 'xp', amount: Pass.addXp(this.pass, r.xp).added });
    if (r.item) {
      const item = Cosmetics.findItem(r.item.kind, r.item.id);
      if (item) {
        if (Cosmetics.unlock(this.cosmetics, r.item.kind, r.item.id)) {
          out.push({ type: 'item', kind: r.item.kind, id: item.id, name: item.name, duplicate: false });
        } else {
          // already bought in the shop: coins instead
          const coins = Cosmetics.duplicateValue(r.item.kind, r.item.id);
          Economy.earn(this.wallet, { coins });
          out.push({ type: 'item', kind: r.item.kind, id: item.id, name: item.name, duplicate: true, coins });
        }
      }
    }
    return out;
  }

  // ---- time --------------------------------------------------------------------------------------

  /**
   * Bring missions and the battle pass up to the local date (new day / week / season). Call it
   * between runs, when the app returns to the foreground and from a slow timer in the menu.
   * @returns {{changed: boolean, rolled: string[], granted: object[]}}
   */
  sync() {
    this._fresh();
    const now = this.now();
    const m = Missions.sync(this.missions, now);
    const p = Pass.sync(this.pass, now);
    const granted = [];
    // Season rewards first (they belong to the old season; the XP of old missions goes to the new one).
    for (const c of p.autoClaimed) granted.push(...this._grant(c.reward));
    for (const c of m.autoClaimed) granted.push(...this._grant(c.reward));
    const rolled = [...m.rolled];
    if (p.rolled) rolled.push('season');
    const changed = rolled.length > 0 || granted.length > 0 || m.clockWentBack || p.corrected;
    if (changed) this.store.save();
    return { changed, rolled, granted };
  }

  // ---- runs --------------------------------------------------------------------------------------

  /** Put currency collected in a run into the wallet right away (so closing the app loses nothing). */
  bank({ coins = 0, crowns = 0 } = {}) {
    this._fresh();
    if (!(coins > 0) && !(crowns > 0)) return;
    Economy.earn(this.wallet, { coins, crowns });
    this.store.save();
  }

  /** XP for the battle pass earned by a run (missions give most of the XP). */
  runXp(stats) {
    const x = CFG.xp;
    const dist = Economy.cleanAmount(stats?.distance);
    const portals = Economy.cleanAmount(stats?.portals);
    // The flat part is only for runs played to the end: restarting again and again must not give XP.
    const base = Economy.cleanAmount(stats?.runs) > 0 ? x.perRun : 0;
    return Math.min(x.maxPerRun, base + Math.floor(dist / 100) * x.per100m + portals * x.perPortal);
  }

  /**
   * A run is over: count it for the missions, the pass XP and the statistics.
   * (The currencies were already banked with `bank()`.)
   * @returns {{xp, tiersGained, completed: {scope, id, text}[]}}
   */
  endRun(stats) {
    this._fresh();
    const s = stats && typeof stats === 'object' ? stats : {};
    const completed = Missions.applyRun(this.missions, s).map((c) => ({
      ...c,
      text: Missions.describe(c.scope, this.missions[c.scope].list.find((e) => e.id === c.id)),
    }));
    const xp = this.runXp(s);
    const { added, tiersGained } = Pass.addXp(this.pass, xp);
    const st = this.state.stats;
    st.runs += Economy.cleanAmount(s.runs) > 0 ? 1 : 0; // (an abandoned run reports runs: 0)
    st.bestScore = Math.max(st.bestScore, Economy.cleanAmount(s.score, 1e9));
    st.totalDistance += Economy.cleanAmount(s.distance);
    st.totalCoins += Economy.cleanAmount(s.coins);
    st.revives += Economy.cleanAmount(s.revives);
    this.store.save();
    return { xp: added, tiersGained, completed };
  }

  // ---- missions ----------------------------------------------------------------------------------

  /** @returns the list of things given, or null if there was nothing to claim */
  claimMission(scope, id) {
    this._fresh();
    const reward = Missions.claim(this.missions, scope, id);
    if (!reward) return null;
    const granted = this._grant(reward);
    this.store.save();
    return granted;
  }

  claimDailyBonus() {
    this._fresh();
    const reward = Missions.claimDailyBonus(this.missions);
    if (!reward) return null;
    const granted = this._grant(reward);
    this.store.save();
    return granted;
  }

  // ---- battle pass -------------------------------------------------------------------------------

  claimPass(tier, track) {
    this._fresh();
    const reward = Pass.claim(this.pass, tier, track);
    if (!reward) return null;
    const granted = this._grant(reward);
    this.store.save();
    return granted;
  }

  /** Claim everything that is unlocked. @returns the list of things given (empty if nothing) */
  claimAllPass() {
    this._fresh();
    const granted = [];
    for (const c of Pass.claimable(this.pass)) {
      const reward = Pass.claim(this.pass, c.tier, c.track);
      if (reward) granted.push(...this._grant(reward));
    }
    if (granted.length) this.store.save();
    return granted;
  }

  /** Buy the premium track with crowns. @returns {{ok: true} | {ok: false, reason: 'owned'|'funds'}} */
  buyPremiumPass() {
    this._fresh();
    if (this.pass.premium) return { ok: false, reason: 'owned' };
    if (!Economy.spend(this.wallet, { crowns: CFG.pass.premiumCost })) return { ok: false, reason: 'funds' };
    Pass.unlockPremium(this.pass);
    this.store.save();
    return { ok: true };
  }

  passInfo() {
    const now = this.now();
    const p = Pass.progress(this.pass);
    return {
      name: Pass.seasonName(this.pass.season),
      daysLeft: Pass.daysLeft(now),
      tier: p.tier,
      into: p.into,
      need: p.need,
      done: p.done,
      premium: this.pass.premium,
      claimable: Pass.claimable(this.pass).length,
    };
  }

  // ---- shop / wardrobe ---------------------------------------------------------------------------

  buy(kind, id) {
    this._fresh();
    const res = Cosmetics.buy(this.cosmetics, this.wallet, kind, id);
    if (res.ok) this.store.save();
    return res;
  }

  equip(kind, id) {
    this._fresh();
    const ok = Cosmetics.equip(this.cosmetics, kind, id);
    if (ok) this.store.save();
    return ok;
  }

  // ---- settings ----------------------------------------------------------------------------------

  setSetting(key, value) {
    this._fresh();
    if (!(key in this.settings)) return;
    this.settings[key] = value;
    this.store.save();
  }

  /** Numbers for the little red badges of the menu buttons. */
  badges() {
    return { missions: Missions.claimableCount(this.missions), pass: Pass.claimable(this.pass).length };
  }
}
