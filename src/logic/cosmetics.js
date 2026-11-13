import { canAfford, spend } from './economy.js';

/**
 * Cosmetics (pure logic): the catalog of skins, trails and emoji, what the player owns and what is
 * equipped. Everything here is ONLY cosmetic: no item changes the hitbox, the speed or the rules.
 *
 * Every item has a shop price (coins or crowns), also the ones the battle pass gives away, so
 * nothing is "gone forever" when a season ends (no fear-of-missing-out pressure).
 *
 * The 3D side of the skins lives in `src/view/skins/` (same ids).
 */
export const KINDS = Object.freeze(['boy', 'bear', 'trail', 'emoji']);
export const KIND_NAMES = Object.freeze({ boy: 'Băiatul', bear: 'Ursul', trail: 'Trail', emoji: 'Emoji' });

export const COSMETICS = Object.freeze({
  boy: [
    { id: 'clasic', name: 'Clasic', desc: 'Geaca roșie și fularul galben de la prima cursă.', price: null },
    { id: 'schior', name: 'Schior din Poiana', desc: 'Combinezon de concurs, cască și dosar cu numărul 7.', price: { coins: 1500 } },
    { id: 'salvamont', name: 'Salvamontist', desc: 'Echipament Salvamont: cruce albă, rucsac și frontală.', price: { crowns: 30 } },
    { id: 'junii', name: 'Junele Brașovului', desc: 'Costum de sărbătoare al Junilor din Șchei, cu căciulă și brâu tricolor.', price: { crowns: 45 } },
    { id: 'stegar', name: 'Stegarul', desc: 'Galben-negru din cap până-n picioare, ca suporterii din Brașov.', price: { coins: 3000 } },
    { id: 'mascota', name: 'Mascota Ursuleț', desc: 'Costum de urs de pluș. Ursul adevărat nu se lasă păcălit.', price: { crowns: 60 } },
  ],
  bear: [
    { id: 'brun', name: 'Ursul brun', desc: 'Ursul carpatin, exact cum îl știi.', price: null },
    { id: 'racadau', name: 'Ursul din Răcădău', desc: 'Vine direct de la tomberoane: capac pe cap și bandană.', price: { coins: 4000 } },
    { id: 'craciun', name: 'Ursul de Crăciun', desc: 'Alb ca zăpada, cu fular și căciulă de la Târgul din Piața Sfatului.', price: { crowns: 40 } },
  ],
  trail: [
    { id: 'none', name: 'Fără trail', desc: 'Doar zăpada (sau apa) ridicată de tine.', price: null },
    { id: 'fulgi', name: 'Fulgi de nea', desc: 'Fulgi albaștri care plutesc în urma ta.', price: { coins: 800 } },
    { id: 'scantei', name: 'Scântei aurii', desc: 'Scântei de aur, ca la artificiile de Zilele Brașovului.', price: { coins: 2000 } },
    { id: 'frunze', name: 'Frunze de pe Tâmpa', desc: 'Frunze de toamnă luate de vânt.', price: { crowns: 15 } },
    { id: 'tricolor', name: 'Tricolor', desc: 'Trei dâre: roșu, galben și albastru.', price: { crowns: 25 } },
  ],
  emoji: [
    { id: 'none', name: 'Fără emoji', desc: 'Nicio reacție.', price: null, glyph: '' },
    { id: 'urs', name: 'Urs', desc: 'Pentru când scapi de el.', price: { coins: 300 }, glyph: '🐻' },
    { id: 'schi', name: 'Schior', desc: 'Poiana, venim!', price: { coins: 300 }, glyph: '⛷️' },
    { id: 'munte', name: 'Munte', desc: 'Tâmpa e a ta.', price: { coins: 500 }, glyph: '🏔️' },
    { id: 'foc', name: 'Foc', desc: 'Ești pe val.', price: { coins: 700 }, glyph: '🔥' },
    { id: 'cool', name: 'Ochelari', desc: 'Fără emoții.', price: { crowns: 5 }, glyph: '😎' },
    { id: 'coroana', name: 'Coroană', desc: 'Orașul Coroanei.', price: { crowns: 10 }, glyph: '👑' },
  ],
});

export const DEFAULTS = Object.freeze({ boy: 'clasic', bear: 'brun', trail: 'none', emoji: 'none' });

export function findItem(kind, id) {
  return COSMETICS[kind]?.find((it) => it.id === id) ?? null;
}

export function defaultCosmetics() {
  const owned = {};
  const equipped = {};
  for (const k of KINDS) {
    owned[k] = [DEFAULTS[k]];
    equipped[k] = DEFAULTS[k];
  }
  return { owned, equipped };
}

/** Strict clean-up of stored data: unknown kinds/ids are dropped, defaults are always owned. */
export function sanitizeCosmetics(raw) {
  const out = defaultCosmetics();
  const r = raw && typeof raw === 'object' ? raw : {};
  for (const k of KINDS) {
    const list = Array.isArray(r.owned?.[k]) ? r.owned[k] : [];
    for (const id of list) {
      if (typeof id === 'string' && findItem(k, id) && !out.owned[k].includes(id)) out.owned[k].push(id);
    }
    const eq = r.equipped?.[k];
    if (typeof eq === 'string' && out.owned[k].includes(eq)) out.equipped[k] = eq;
  }
  return out;
}

export function owns(cos, kind, id) {
  return !!cos.owned[kind]?.includes(id);
}

/** Give an item. @returns true if it is new, false if it was already owned / does not exist */
export function unlock(cos, kind, id) {
  if (!findItem(kind, id) || owns(cos, kind, id)) return false;
  cos.owned[kind].push(id);
  return true;
}

/** @returns true if the item is now equipped (it must be owned) */
export function equip(cos, kind, id) {
  if (!owns(cos, kind, id)) return false;
  cos.equipped[kind] = id;
  return true;
}

/**
 * Buy an item from the shop.
 * @returns {{ok: true} | {ok: false, reason: 'unknown'|'owned'|'funds'}}
 */
export function buy(cos, wallet, kind, id) {
  const item = findItem(kind, id);
  if (!item) return { ok: false, reason: 'unknown' };
  if (owns(cos, kind, id)) return { ok: false, reason: 'owned' };
  if (item.price && !canAfford(wallet, item.price)) return { ok: false, reason: 'funds' };
  if (item.price && !spend(wallet, item.price)) return { ok: false, reason: 'funds' };
  cos.owned[kind].push(id);
  return { ok: true };
}

/**
 * Coins given instead of an item the player already owns (e.g. a battle pass skin bought earlier in
 * the shop): half of its shop value, crowns counted as 50 coins each.
 */
export function duplicateValue(kind, id) {
  const p = findItem(kind, id)?.price;
  if (!p) return 100;
  return Math.max(100, Math.floor(((p.coins || 0) + (p.crowns || 0) * 50) / 2));
}
