import { CFG } from '../config.js';

/**
 * Economy (pure logic): the wallet with the two currencies.
 *   coins  - "bănuți", collected in the runs
 *   crowns - "Coroane", the rare premium currency (missions, battle pass, rarely in a run)
 *
 * There is NO way to buy any of them with real money. All amounts are non-negative integers, every
 * operation validates its input and nothing can make a balance negative or not-a-number.
 * The functions work on a plain `wallet` object ({coins, crowns}) that lives inside the save state.
 */
export const CURRENCIES = Object.freeze(['coins', 'crowns']);
export const CURRENCY_NAMES = Object.freeze({ coins: 'bănuți', crowns: 'Coroane' });

const MAX = () => ({ coins: CFG.economy.maxCoins, crowns: CFG.economy.maxCrowns });

/** Clean integer in [0, max]; anything else (NaN, strings, negatives, objects) becomes 0. */
export function cleanAmount(v, max = Number.MAX_SAFE_INTEGER) {
  if (typeof v !== 'number' || !Number.isFinite(v)) return 0;
  return Math.min(max, Math.max(0, Math.floor(v)));
}

export function sanitizeWallet(raw) {
  const m = MAX();
  const r = raw && typeof raw === 'object' ? raw : {};
  return { coins: cleanAmount(r.coins, m.coins), crowns: cleanAmount(r.crowns, m.crowns) };
}

/** A cost / amount object with only the known currencies, as clean integers. */
export function cleanCost(cost) {
  const c = cost && typeof cost === 'object' ? cost : {};
  return { coins: cleanAmount(c.coins), crowns: cleanAmount(c.crowns) };
}

export function canAfford(wallet, cost) {
  const c = cleanCost(cost);
  return wallet.coins >= c.coins && wallet.crowns >= c.crowns;
}

/** Add currency (capped at the maximum). Returns what was really added. */
export function earn(wallet, amounts) {
  const a = cleanCost(amounts);
  const m = MAX();
  const added = {};
  for (const k of CURRENCIES) {
    const before = wallet[k];
    wallet[k] = Math.min(m[k], before + a[k]);
    added[k] = wallet[k] - before;
  }
  return added;
}

/**
 * Pay a cost. All or nothing: if the wallet cannot cover every currency of the cost, nothing changes.
 * @returns true if paid
 */
export function spend(wallet, cost) {
  const c = cleanCost(cost);
  // A cost that asked for something invalid (negative, NaN) must never turn into a free purchase.
  const raw = cost && typeof cost === 'object' ? cost : {};
  for (const k of CURRENCIES) {
    if (raw[k] !== undefined && raw[k] !== c[k]) return false;
  }
  if (!canAfford(wallet, c)) return false;
  wallet.coins -= c.coins;
  wallet.crowns -= c.crowns;
  return true;
}

/** "150 bănuți", "4 Coroane", "100 bănuți + 1 Coroană" (for the UI). */
export function formatCost(cost) {
  const c = cleanCost(cost);
  const parts = [];
  if (c.coins) parts.push(`${c.coins} ${c.coins === 1 ? 'bănuț' : 'bănuți'}`);
  if (c.crowns) parts.push(`${c.crowns} ${c.crowns === 1 ? 'Coroană' : 'Coroane'}`);
  return parts.join(' + ') || 'gratuit';
}
