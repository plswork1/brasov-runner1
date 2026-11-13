import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeWallet, earn, spend, canAfford, cleanAmount, formatCost, CURRENCIES } from '../src/logic/economy.js';
import { COSMETICS, KINDS, DEFAULTS, defaultCosmetics, sanitizeCosmetics, buy, equip, unlock, owns, findItem, duplicateValue } from '../src/logic/cosmetics.js';
import { CFG } from '../src/config.js';

test('wallet: two currencies, always clean non-negative integers', () => {
  assert.deepEqual([...CURRENCIES], ['coins', 'crowns']);
  assert.deepEqual(sanitizeWallet(undefined), { coins: 0, crowns: 0 });
  assert.deepEqual(sanitizeWallet({ coins: 12.9, crowns: '5' }), { coins: 12, crowns: 0 });
  assert.deepEqual(sanitizeWallet({ coins: -5, crowns: NaN }), { coins: 0, crowns: 0 });
  assert.deepEqual(sanitizeWallet({ coins: Infinity, crowns: 1e99 }), { coins: 0, crowns: CFG.economy.maxCrowns });
  assert.equal(cleanAmount('7'), 0);
  assert.equal(cleanAmount(7.99), 7);
});

test('earn: adds, ignores garbage, caps at the maximum and reports what was really added', () => {
  const w = { coins: 10, crowns: 1 };
  assert.deepEqual(earn(w, { coins: 5, crowns: 2 }), { coins: 5, crowns: 2 });
  assert.deepEqual(w, { coins: 15, crowns: 3 });
  earn(w, { coins: -100, crowns: NaN, gems: 50 });
  assert.deepEqual(w, { coins: 15, crowns: 3 });
  const added = earn(w, { coins: CFG.economy.maxCoins * 2 });
  assert.equal(w.coins, CFG.economy.maxCoins);
  assert.equal(added.coins, CFG.economy.maxCoins - 15);
});

test('spend: all or nothing, never negative, an invalid price is never a free purchase', () => {
  const w = { coins: 100, crowns: 3 };
  assert.equal(spend(w, { coins: 101 }), false);
  assert.equal(spend(w, { coins: 50, crowns: 4 }), false, 'one currency short = nothing is taken');
  assert.deepEqual(w, { coins: 100, crowns: 3 });
  assert.equal(spend(w, { coins: 50, crowns: 3 }), true);
  assert.deepEqual(w, { coins: 50, crowns: 0 });
  for (const bad of [{ coins: -10 }, { crowns: NaN }, { coins: '5' }, { coins: 1.5 }, { crowns: Infinity }]) {
    assert.equal(spend(w, bad), false, JSON.stringify(bad));
    assert.deepEqual(w, { coins: 50, crowns: 0 });
  }
  assert.equal(canAfford(w, { coins: 50 }), true);
  assert.equal(canAfford(w, { crowns: 1 }), false);
});

test('formatCost: Romanian wording', () => {
  assert.equal(formatCost({ coins: 150 }), '150 bănuți');
  assert.equal(formatCost({ crowns: 1 }), '1 Coroană');
  assert.equal(formatCost({ coins: 100, crowns: 4 }), '100 bănuți + 4 Coroane');
  assert.equal(formatCost(null), 'gratuit');
});

test('catalog: 6 boy skins, 3 bear skins, unique ids, a free default per kind, sane prices', () => {
  assert.equal(COSMETICS.boy.length, 6);
  assert.equal(COSMETICS.bear.length, 3);
  for (const kind of KINDS) {
    const ids = COSMETICS[kind].map((i) => i.id);
    assert.equal(new Set(ids).size, ids.length, `${kind} ids unique`);
    assert.equal(findItem(kind, DEFAULTS[kind]).price, null, `${kind} default is free`);
    for (const it of COSMETICS[kind]) {
      assert.ok(it.name && it.desc !== undefined);
      if (it.price) {
        const keys = Object.keys(it.price);
        assert.ok(keys.length === 1 && CURRENCIES.includes(keys[0]) && Number.isInteger(it.price[keys[0]]) && it.price[keys[0]] > 0, `${kind}/${it.id} price`);
      } else assert.equal(it.id, DEFAULTS[kind], `only the default of ${kind} is free`);
    }
  }
});

test('buy: pays the price once, cannot buy twice, cannot buy without funds or an unknown item', () => {
  const cos = defaultCosmetics();
  const w = { coins: 1500, crowns: 0 };
  assert.deepEqual(buy(cos, w, 'boy', 'salvamont'), { ok: false, reason: 'funds' });
  assert.deepEqual(buy(cos, w, 'boy', 'nope'), { ok: false, reason: 'unknown' });
  assert.deepEqual(buy(cos, w, 'hat', 'schior'), { ok: false, reason: 'unknown' });
  assert.deepEqual(buy(cos, w, 'boy', 'schior'), { ok: true });
  assert.equal(w.coins, 0);
  assert.deepEqual(buy(cos, w, 'boy', 'schior'), { ok: false, reason: 'owned' }); // double tap
  assert.equal(w.coins, 0);
  assert.equal(owns(cos, 'boy', 'schior'), true);
});

test('equip: only owned items; unlock: only once; duplicates are worth coins', () => {
  const cos = defaultCosmetics();
  assert.equal(equip(cos, 'bear', 'craciun'), false);
  assert.equal(cos.equipped.bear, 'brun');
  assert.equal(unlock(cos, 'bear', 'craciun'), true);
  assert.equal(unlock(cos, 'bear', 'craciun'), false);
  assert.equal(unlock(cos, 'bear', 'dragon'), false);
  assert.equal(equip(cos, 'bear', 'craciun'), true);
  assert.equal(cos.equipped.bear, 'craciun');
  assert.equal(duplicateValue('boy', 'schior'), 750);
  assert.equal(duplicateValue('bear', 'craciun'), 1000);
  assert.ok(duplicateValue('boy', 'clasic') >= 100);
});

test('sanitizeCosmetics: unknown ids and kinds are dropped, defaults always owned, equipped must be owned', () => {
  const c = sanitizeCosmetics({
    owned: { boy: ['schior', 'schior', 'hacker', 42, null], bear: 'craciun', trail: ['tricolor'], ufo: ['x'] },
    equipped: { boy: 'mascota', bear: 'brun', trail: 'tricolor', emoji: { id: 'x' } },
  });
  assert.deepEqual(c.owned.boy, ['clasic', 'schior']);
  assert.deepEqual(c.owned.bear, ['brun']);
  assert.deepEqual(c.owned.trail, ['none', 'tricolor']);
  assert.deepEqual(c.equipped, { boy: 'clasic', bear: 'brun', trail: 'tricolor', emoji: 'none' });
  assert.equal(c.ufo, undefined);
  assert.deepEqual(sanitizeCosmetics(null), defaultCosmetics());
  assert.deepEqual(sanitizeCosmetics('💥'), defaultCosmetics());
});
