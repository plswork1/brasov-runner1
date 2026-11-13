import { CFG } from '../config.js';
import { COSMETICS, KINDS, KIND_NAMES, findItem, owns } from '../logic/cosmetics.js';
import { canAfford, formatCost } from '../logic/economy.js';
import * as Missions from '../logic/missions.js';
import * as Pass from '../logic/battlepass.js';
import { daysUntilNextWeek } from '../logic/dates.js';
import { h, onTap, pct } from './dom.js';

/**
 * The three meta screens opened from the menu: Misiuni, Pass (battle pass) and Garderobă (skins,
 * trails, emoji with a 3D preview). They only READ the state through `meta` and change it through
 * `meta`'s methods, which are all safe against double taps.
 *
 * @param o.meta   Meta (logic/meta.js)
 * @param o.ui     UI (for toasts)
 * @param o.game   () => Game (preview + applying cosmetics; may be null if WebGL failed)
 * @param o.sfx    Sfx
 */

const RIDES = [
  ['snowboard', 'Snowboard', 0],
  ['skate', 'Skateboard', 1],
  ['bike', 'Bicicletă', 2],
  ['boat', 'Hidrobicicletă', 4],
];
const BEAR_MODES = [
  ['run', 'Aleargă', 0],
  ['swim', 'Înoată', 4],
  ['unicycle', 'Monociclu', 2],
  ['hydro', 'Hidro-monociclu', 4],
];
const KIND_ICON = { boy: '🧥', bear: '🐻', trail: '✨', emoji: '😀' };
const ITEM_PREFIX = { boy: 'Skin', bear: 'Skin de urs', trail: 'Trail', emoji: 'Emoji' };

/** "150 bănuți", "5 👑", "Skin: Schior din Poiana" */
export function rewardLabel(r) {
  if (!r) return '';
  if (r.item) {
    const it = findItem(r.item.kind, r.item.id);
    return `${ITEM_PREFIX[r.item.kind] ?? 'Obiect'}: ${it?.glyph ? `${it.glyph} ` : ''}${it?.name ?? r.item.id}`;
  }
  const parts = [];
  if (r.xp) parts.push(`${r.xp} XP`);
  if (r.coins) parts.push(`${r.coins} bănuți`);
  if (r.crowns) parts.push(`${r.crowns} 👑`);
  return parts.join(' + ');
}

/** Short text for a pass cell (its icon already says what kind of thing it is). */
function cellLabel(r) {
  if (r.item) return findItem(r.item.kind, r.item.id)?.name ?? r.item.id;
  if (r.crowns) return r.crowns === 1 ? '1 Coroană' : `${r.crowns} Coroane`;
  return `${r.coins} bănuți`;
}

/** What was really given (list from Meta) as one line for a toast. */
export function grantedText(list) {
  const sum = { coins: 0, crowns: 0, xp: 0 };
  const items = [];
  for (const g of list || []) {
    if (g.type === 'item') {
      if (g.duplicate) {
        sum.coins += g.coins;
        items.push(`${g.name} (îl aveai deja: bănuți în schimb)`);
      } else items.push(`nou: ${g.name}`);
    } else sum[g.type] += g.amount;
  }
  const parts = [];
  if (sum.xp) parts.push(`+${sum.xp} XP`);
  if (sum.coins) parts.push(`+${sum.coins} bănuți`);
  if (sum.crowns) parts.push(`+${sum.crowns} 👑`);
  return [...parts, ...items].join(' · ');
}

export class MetaScreens {
  constructor({ meta, ui, game, sfx }) {
    this.meta = meta;
    this.ui = ui;
    this.game = game;
    this.sfx = sfx;
    const $ = (id) => document.getElementById(id);
    this.el = {
      start: $('screen-start'),
      missions: $('screen-missions'),
      pass: $('screen-pass'),
      wardrobe: $('screen-wardrobe'),
      missionTabs: $('mission-tabs'),
      missionNote: $('missions-note'),
      missionList: $('missions-list'),
      bonus: $('daily-bonus'),
      bonusText: $('daily-bonus-text'),
      bonusBtn: $('btn-daily-bonus'),
      passSeason: $('pass-season'),
      passDays: $('pass-days'),
      passTier: $('pass-tier'),
      passXp: $('pass-xp'),
      passFill: $('pass-fill'),
      passPremium: $('btn-pass-premium'),
      passClaimAll: $('btn-pass-claim-all'),
      passNote: $('pass-note'),
      passList: $('pass-list'),
      passFeatured: $('pass-featured'),
      wardTabs: $('wardrobe-tabs'),
      wardRides: $('wardrobe-rides'),
      wardList: $('wardrobe-list'),
      wardName: $('wardrobe-name'),
      wardDesc: $('wardrobe-desc'),
      wardAction: $('btn-wardrobe-action'),
      badgeMissions: $('badge-missions'),
      badgePass: $('badge-pass'),
      sidePassName: $('side-pass-name'),
      sidePassSub: $('side-pass-sub'),
      sidePassFill: $('side-pass-fill'),
      sideMissions: $('side-missions'),
    };
    this.open = null; // 'missions' | 'pass' | 'wardrobe' | null
    this.scope = 'daily';
    this.kind = 'boy';
    this.selected = null; // item id selected in the wardrobe
    this.previewRide = null;

    for (const b of document.querySelectorAll('[data-back]')) onTap(b, () => this.close());
    onTap(this.el.bonusBtn, () => this.claim(() => this.meta.claimDailyBonus()));
    onTap(this.el.passPremium, () => this.buyPremium());
    onTap(this.el.passClaimAll, (ev) => {
      const before = new Set(this.meta.pass.claimed.free.map((t) => `free${t}`).concat(this.meta.pass.claimed.premium.map((t) => `premium${t}`)));
      const box = ev.currentTarget.getBoundingClientRect();
      const g = this.meta.claimAllPass();
      if (!g.length) return;
      this.afterGrant(g);
      this.burst(box.left + box.width / 2, box.top + box.height / 2, true);
      // every tier that was just claimed pops, one after the other
      let k = 0;
      for (const cell of this.el.passList.querySelectorAll('.cell.claimed')) {
        if (before.has(cell.dataset.track + cell.dataset.tier)) continue;
        cell.style.setProperty('--pop', `${Math.min(k++, 14) * 40}ms`);
        cell.classList.add('pop');
      }
    });
    onTap(this.el.wardAction, () => this.wardrobeAction());

    // tabs
    for (const scope of Missions.SCOPES) {
      this.el.missionTabs.appendChild(onTap(h('button', { class: 'tab', text: Missions.SCOPE_NAMES[scope], attrs: { type: 'button', role: 'tab', 'data-scope': scope } }), () => {
        this.scope = scope;
        this.renderMissions();
      }));
    }
    for (const kind of KINDS) {
      this.el.wardTabs.appendChild(onTap(h('button', { class: 'tab', text: `${KIND_ICON[kind]} ${KIND_NAMES[kind]}`, attrs: { type: 'button', role: 'tab', 'data-kind': kind } }), () => this.showKind(kind)));
    }
  }

  // ---- open / close ------------------------------------------------------------------------------

  show(name) {
    if (!['missions', 'pass', 'wardrobe'].includes(name)) return;
    this.meta.sync();
    this.hideScreens();
    this.open = name;
    this.el.start.hidden = true;
    this.el[name].hidden = false;
    if (name === 'missions') this.renderMissions();
    else if (name === 'pass') {
      this.renderPass();
      // bring the first reward that can be claimed (or the current tier) into view
      const target = this.el.passList.querySelector('.cell.can') ?? this.el.passList.querySelector('.pass-row.current');
      target?.scrollIntoView({ block: 'center' });
      // opening animation: rows slide in from the current tier outwards, the XP bar fills up
      const screen = this.el.pass;
      screen.classList.remove('intro');
      void screen.offsetWidth;
      screen.classList.add('intro');
      clearTimeout(this.introTimer);
      this.introTimer = setTimeout(() => screen.classList.remove('intro'), 1400);
    } else {
      this.previewRide = null;
      this.showKind(this.kind);
    }
    this.refreshWallet();
  }

  hideScreens() {
    for (const k of ['missions', 'pass', 'wardrobe']) this.el[k].hidden = true;
    if (this.open === 'wardrobe') this.leaveWardrobe();
    this.open = null;
  }

  /** Back to the start screen. */
  close() {
    if (!this.open) return;
    this.hideScreens();
    this.el.start.hidden = false;
    this.refreshMenu();
  }

  /** Called when a run starts etc.: the sub-screens must not stay on top. */
  closeSilently() {
    this.hideScreens();
  }

  /** Re-render whatever is on screen (after a sync, a save from another tab...). */
  refresh() {
    this.refreshMenu();
    if (this.open === 'missions') this.renderMissions();
    else if (this.open === 'pass') this.renderPass();
    else if (this.open === 'wardrobe') this.renderWardrobe();
  }

  // ---- menu: wallet, badges, side panel -----------------------------------------------------------

  refreshWallet() {
    const w = this.meta.wallet;
    for (const el of document.querySelectorAll('[data-wallet]')) {
      const text = String(w[el.dataset.wallet] ?? 0);
      if (el.textContent === text) continue;
      el.textContent = text;
      if (el.offsetParent === null) continue; // not on screen
      // the amount changed in front of the player: a small bump of the chip
      const chip = el.closest('.chip') ?? el;
      chip.classList.remove('bump');
      void chip.offsetWidth;
      chip.classList.add('bump');
    }
  }

  refreshMenu() {
    this.refreshWallet();
    const b = this.meta.badges();
    for (const [el, n] of [
      [this.el.badgeMissions, b.missions],
      [this.el.badgePass, b.pass],
    ]) {
      el.hidden = n <= 0;
      el.textContent = String(n);
    }
    const info = this.meta.passInfo();
    this.el.sidePassName.textContent = info.name;
    this.el.sidePassSub.textContent = `Treapta ${info.tier} din ${CFG.pass.tiers} · ${this.daysText(info.daysLeft)}`;
    this.el.sidePassFill.style.width = pct(info.done ? 1 : info.into / info.need);
    const list = this.el.sideMissions;
    list.replaceChildren();
    for (const e of this.meta.missions.daily.list) {
      const goal = Missions.goalOf('daily', e);
      const done = e.progress >= goal;
      list.appendChild(
        h('li', { class: done ? 'done' : '' }, [h('span', { text: Missions.describe('daily', e) }), h('b', { text: e.claimed ? '✓' : done ? 'gata!' : `${Math.min(e.progress, goal)}/${goal}` })]),
      );
    }
  }

  daysText(n) {
    return n === 1 ? 'ultima zi' : `mai sunt ${n} zile`;
  }

  afterGrant(granted) {
    this.sfx?.claim?.();
    const text = grantedText(granted);
    if (text) this.ui.toast(text, 'good');
    // a skin or trail won from the pass may now be equipped; nothing changes on the model by itself
    this.refresh();
  }

  claim(fn) {
    const granted = fn();
    if (granted) this.afterGrant(granted);
  }

  // ---- missions ---------------------------------------------------------------------------------

  renderMissions() {
    const ms = this.meta.missions;
    for (const t of this.el.missionTabs.children) t.classList.toggle('on', t.dataset.scope === this.scope);
    const scope = this.scope;
    this.el.missionNote.textContent =
      scope === 'daily'
        ? 'Se schimbă în fiecare zi, la miezul nopții (după ceasul telefonului).'
        : scope === 'weekly'
          ? `Se schimbă lunea (${this.daysText(daysUntilNextWeek(this.meta.now()))}).`
          : 'Fiecare trebuie îndeplinită într-o singură cursă. După revendicare apare una nouă.';
    const list = this.el.missionList;
    list.replaceChildren();
    for (const e of ms[scope].list) {
      const goal = Missions.goalOf(scope, e);
      const done = e.progress >= goal;
      const btn = e.claimed
        ? h('span', { class: 'claimed', text: 'Revendicat ✓' })
        : onTap(h('button', { class: 'btn small primary', text: 'Revendică', attrs: { type: 'button', 'data-claim': e.id } }), () => this.claim(() => this.meta.claimMission(scope, e.id)));
      if (!e.claimed) btn.disabled = !done;
      list.appendChild(
        h('li', { class: `mission${done ? ' done' : ''}${e.claimed ? ' claimed' : ''}` }, [
          h('div', { class: 'mission-main' }, [
            h('span', { class: 'mission-text', text: Missions.describe(scope, e) }),
            h('span', { class: 'mission-reward', text: rewardLabel(Missions.rewardOf(scope)) }),
            h('span', { class: 'xp-bar' }, [h('span', { attrs: { style: `width:${pct(e.progress / goal)}` } })]),
            h('span', { class: 'mission-count', text: `${Math.min(e.progress, goal)} / ${goal}` }),
          ]),
          btn,
        ]),
      );
    }
    const bonus = scope === 'daily';
    this.el.bonus.hidden = !bonus;
    if (bonus) {
      const claimed = ms.daily.bonusClaimed;
      this.el.bonusText.textContent = `Bonus pentru toate cele ${ms.daily.list.length} misiuni zilnice: ${rewardLabel(CFG.missions.reward.dailyBonus)}`;
      this.el.bonusBtn.textContent = claimed ? 'Revendicat ✓' : 'Revendică';
      this.el.bonusBtn.disabled = claimed || !Missions.dailyBonusReady(ms);
    }
  }

  // ---- battle pass ------------------------------------------------------------------------------

  renderPass() {
    const info = this.meta.passInfo();
    const pass = this.meta.pass;
    const e = this.el;
    e.passSeason.textContent = info.name;
    e.passDays.textContent = info.daysLeft === 1 ? 'Ultima zi a sezonului' : `Mai sunt ${info.daysLeft} zile`;
    e.passTier.textContent = `Treapta ${info.tier} din ${CFG.pass.tiers}`;
    e.passXp.textContent = info.done ? 'Pass terminat!' : `${info.into} / ${info.need} XP până la treapta următoare`;
    e.passFill.style.width = pct(info.done ? 1 : info.into / info.need);
    const canBuy = canAfford(this.meta.wallet, { crowns: CFG.pass.premiumCost });
    e.passPremium.hidden = info.premium;
    e.passPremium.textContent = `Deblochează pista premium · ${CFG.pass.premiumCost} 👑`;
    e.passPremium.disabled = !canBuy;
    e.passClaimAll.disabled = info.claimable === 0;
    e.passClaimAll.textContent = info.claimable ? `Revendică tot (${info.claimable})` : 'Revendică tot';
    e.passNote.textContent = info.premium
      ? 'Pista premium este deblocată în acest sezon.'
      : canBuy
        ? 'Pista premium se cumpără doar cu Coroane câștigate în joc. Nu există plăți cu bani reali.'
        : `Îți mai trebuie ${CFG.pass.premiumCost - this.meta.wallet.crowns} 👑. Coroanele vin din misiuni, din pass și, rar, din curse. Nu există plăți cu bani reali.`;
    const reached = info.tier;

    // The two big rewards of the season (the only skins of the pass), always in view at the top.
    const feat = Pass.featuredRewards();
    e.passFeatured.replaceChildren();
    for (const track of Pass.TRACKS) {
      const f = feat[track];
      const it = findItem(f.item.kind, f.item.id);
      const claimed = pass.claimed[track].includes(f.tier);
      const can = Pass.canClaim(pass, f.tier, track);
      const locked = track === 'premium' && !pass.premium;
      const state = claimed ? 'Al tău ✓' : can ? 'Gata de revendicat!' : locked ? `🔒 Premium · treapta ${f.tier}` : `Treapta ${f.tier} · mai ai ${Math.max(0, f.tier - reached)}`;
      e.passFeatured.appendChild(
        onTap(
          h('button', { class: `feat ${track}${claimed ? ' claimed' : ''}${can ? ' can' : ''}`, attrs: { type: 'button', 'data-feat': track } }, [
            h('span', { class: 'feat-ico', text: KIND_ICON[f.item.kind] }),
            h('span', { class: 'feat-body' }, [
              h('span', { class: 'feat-track', text: track === 'free' ? 'Gratuit' : 'Premium' }),
              h('span', { class: 'feat-name', text: it?.name ?? '' }),
              h('span', { class: 'feat-state', text: state }),
            ]),
          ]),
          () => e.passList.querySelector(`.pass-row[data-tier="${f.tier}"]`)?.scrollIntoView({ block: 'center', behavior: 'smooth' }),
        ),
      );
    }

    const list = e.passList;
    list.replaceChildren();
    const focus = Math.min(CFG.pass.tiers, reached + 1); // the row the list opens on
    for (const row of Pass.rewardTable()) {
      const cells = Pass.TRACKS.map((track) => {
        const claimed = pass.claimed[track].includes(row.tier);
        const can = Pass.canClaim(pass, row.tier, track);
        const lockedPremium = track === 'premium' && !pass.premium;
        const r = row[track];
        const big = !!r.item && (r.item.kind === 'boy' || r.item.kind === 'bear');
        const cls = `cell ${track}${claimed ? ' claimed' : ''}${can ? ' can' : ''}${lockedPremium ? ' locked' : ''}${big ? ' big' : ''}`;
        const icon = h('span', { class: `cell-ico${r.coins ? ' coin' : ''}`, text: r.coins ? '' : r.crowns ? '👑' : findItem(r.item.kind, r.item.id)?.glyph || KIND_ICON[r.item.kind] });
        const label = h('span', { class: 'cell-reward', text: cellLabel(r) });
        const attrs = { 'data-tier': row.tier, 'data-track': track };
        if (can) {
          return onTap(h('button', { class: cls, attrs: { type: 'button', ...attrs } }, [icon, label, h('span', { class: 'cell-state', text: 'Revendică' })]), (ev) => this.claimPassCell(row.tier, track, ev));
        }
        const state = claimed ? '✓' : lockedPremium ? '🔒' : '';
        return h('div', { class: cls, attrs }, [icon, label, h('span', { class: 'cell-state', text: state })]);
      });
      const li = h('li', { class: `pass-row${row.tier <= reached ? ' reached' : ''}${row.tier === focus ? ' current' : ''}`, attrs: { 'data-tier': row.tier } }, [h('span', { class: 'tier-num', text: row.tier }), ...cells]);
      li.style.setProperty('--i', String(Math.min(12, Math.abs(row.tier - focus)))); // stagger of the opening animation
      list.appendChild(li);
    }
  }

  /** Claim one tier, with a little celebration where the finger is. */
  claimPassCell(tier, track, ev) {
    const box = ev?.currentTarget?.getBoundingClientRect?.();
    const granted = this.meta.claimPass(tier, track);
    if (!granted) return;
    this.afterGrant(granted);
    if (box) this.burst(box.left + box.width / 2, box.top + box.height / 2, track === 'premium');
    this.el.passList.querySelector(`.cell[data-tier="${tier}"][data-track="${track}"]`)?.classList.add('pop');
  }

  /** Confetti: a few coloured bits flying out of a point (pure CSS animation, removed afterwards). */
  burst(x, y, gold = false) {
    const layer = document.getElementById('fx');
    if (!layer || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const colors = gold ? ['#ffe27a', '#ffb300', '#fff', '#ff8fe0'] : ['#2ec4f1', '#7df0c2', '#fff', '#ffcf3f'];
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + Math.random() * 0.5;
      const d = 46 + Math.random() * 60;
      const bit = h('i', { class: 'confetti' });
      bit.style.left = `${x}px`;
      bit.style.top = `${y}px`;
      bit.style.background = colors[i % colors.length];
      bit.style.setProperty('--dx', `${Math.cos(a) * d}px`);
      bit.style.setProperty('--dy', `${Math.sin(a) * d - 20}px`);
      bit.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
      layer.appendChild(bit);
      setTimeout(() => bit.remove(), 900);
    }
  }

  buyPremium() {
    const res = this.meta.buyPremiumPass();
    if (res.ok) {
      this.sfx?.claim?.();
      this.ui.toast('Pista premium este deblocată!', 'good');
    } else {
      this.sfx?.deny?.();
      if (res.reason === 'funds') this.ui.toast('Nu ai destule Coroane.', 'warn');
    }
    this.refresh();
  }

  // ---- wardrobe ---------------------------------------------------------------------------------

  showKind(kind) {
    this.kind = kind;
    this.selected = this.meta.cosmetics.equipped[kind];
    this.previewRide = null;
    this.renderWardrobe();
    this.applyPreview();
  }

  renderWardrobe() {
    const kind = this.kind;
    const cos = this.meta.cosmetics;
    for (const t of this.el.wardTabs.children) t.classList.toggle('on', t.dataset.kind === kind);
    // ride / mode chips: look at the skin on every ride (boy) or in every mode (bear)
    const chips = this.el.wardRides;
    chips.replaceChildren();
    const options = kind === 'bear' ? BEAR_MODES : kind === 'emoji' ? [] : RIDES;
    for (const [id, name] of options) {
      chips.appendChild(
        onTap(h('button', { class: `level-chip${this.previewRide === id ? ' on' : ''}`, text: name, attrs: { type: 'button', 'data-ride': id } }), () => {
          this.previewRide = this.previewRide === id ? null : id;
          this.renderWardrobe();
          this.applyPreview();
        }),
      );
    }
    chips.hidden = options.length === 0;
    const list = this.el.wardList;
    list.replaceChildren();
    for (const it of COSMETICS[kind]) {
      const own = owns(cos, kind, it.id);
      const equipped = cos.equipped[kind] === it.id;
      const tag = equipped ? 'Echipat' : own ? 'Al tău' : formatCost(it.price).replace('Coroane', '👑').replace('Coroană', '👑');
      list.appendChild(
        onTap(
          h('button', { class: `card${this.selected === it.id ? ' on' : ''}${own ? ' own' : ''}${equipped ? ' equipped' : ''}`, attrs: { type: 'button', 'data-item': it.id } }, [
            h('span', { class: 'card-ico', text: it.glyph || KIND_ICON[kind] }),
            h('span', { class: 'card-name', text: it.name }),
            h('span', { class: 'card-tag', text: tag }),
          ]),
          () => {
            this.selected = it.id;
            this.renderWardrobe();
            this.applyPreview();
          },
        ),
      );
    }
    const it = findItem(kind, this.selected) ?? COSMETICS[kind][0];
    const own = owns(cos, kind, it.id);
    const equipped = cos.equipped[kind] === it.id;
    this.el.wardName.textContent = it.name;
    this.el.wardDesc.textContent = it.desc;
    const btn = this.el.wardAction;
    if (equipped) {
      btn.textContent = 'Echipat ✓';
      btn.disabled = true;
    } else if (own) {
      btn.textContent = 'Echipează';
      btn.disabled = false;
    } else {
      const ok = canAfford(this.meta.wallet, it.price);
      btn.textContent = ok ? `Cumpără · ${formatCost(it.price)}` : `Costă ${formatCost(it.price)}`;
      btn.disabled = !ok;
    }
  }

  wardrobeAction() {
    const kind = this.kind;
    const id = this.selected;
    if (!id) return;
    if (!owns(this.meta.cosmetics, kind, id)) {
      const res = this.meta.buy(kind, id);
      if (!res.ok) {
        this.sfx?.deny?.();
        if (res.reason === 'funds') this.ui.toast('Nu ai destul pentru acest obiect.', 'warn');
        this.renderWardrobe();
        return;
      }
      this.ui.toast(`Ai cumpărat: ${findItem(kind, id).name}`, 'good');
    }
    if (this.meta.equip(kind, id)) this.sfx?.claim?.();
    this.refreshWallet();
    this.renderWardrobe();
    this.applyPreview();
  }

  /** Show the selected item on the 3D model (without equipping it). */
  applyPreview() {
    const g = this.game();
    if (!g || this.open !== 'wardrobe') return;
    const eq = this.meta.cosmetics.equipped;
    const kind = this.kind;
    const sel = this.selected;
    g.playerView.setSkin(kind === 'boy' ? sel : eq.boy);
    g.bearView.setSkin(kind === 'bear' ? sel : eq.bear);
    g.trailId = kind === 'trail' ? sel : eq.trail;
    const table = kind === 'bear' ? BEAR_MODES : RIDES;
    const opt = table.find((o) => o[0] === this.previewRide);
    // the level behind the model matches the ride (water for the boats...); back to the chosen one otherwise
    g.applyBiome(opt ? opt[2] : g.startBiome);
    if (kind === 'bear') g.setPreview({ kind: 'bear', mode: opt?.[0] });
    else g.setPreview({ kind: 'boy', ride: opt?.[0] });
    if (kind === 'emoji') {
      const glyph = findItem('emoji', sel)?.glyph;
      if (glyph) this.ui.toast(glyph, 'emoji');
    }
  }

  leaveWardrobe() {
    const g = this.game();
    if (!g) return;
    g.applyBiome(g.startBiome);
    g.setPreview(null);
    g.applyCosmetics(); // back to what is really equipped
  }
}
