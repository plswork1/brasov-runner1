import { PROVIDER_NAMES } from '../cloud/config.js';
import { h, onTap } from './dom.js';

/**
 * The sign-in screen ("Continuă cu Google / Apple / Joacă ca invitat"), the account panel (who is
 * signed in, is the progress in the account, sign out) and the small account button of the menu.
 *
 * @param o.account  Account (cloud/account.js)
 * @param o.ui       UI (toasts)
 * @param o.demo     true when the fake test accounts are used (?mockauth)
 */
const REASONS = {
  cancelled: 'Conectarea a fost anulată.',
  offline: 'Nu există conexiune la internet. Poți juca și ca invitat.',
  popup: 'Browserul a blocat fereastra de conectare. Permite ferestrele pop-up pentru acest site și încearcă din nou.',
  unavailable: 'Această metodă de conectare nu este activată încă.',
  busy: 'O conectare este deja în curs.',
  error: 'Conectarea nu a reușit. Încearcă din nou.',
};
const STATUS = {
  syncing: 'Se sincronizează cu contul…',
  synced: 'Progresul este salvat în cont ✓',
  offline: 'Fără conexiune: progresul este pe dispozitiv și se urcă în cont când revine internetul.',
  guest: '',
};

export class AccountUI {
  constructor({ account, ui, sfx, demo = false }) {
    this.account = account;
    this.ui = ui;
    this.sfx = sfx;
    this.demo = demo;
    const $ = (id) => document.getElementById(id);
    this.el = {
      start: $('screen-start'),
      screen: $('screen-login'),
      back: $('btn-login-back'),
      title: $('login-title'),
      text: $('login-text'),
      buttons: $('login-buttons'),
      guest: $('btn-login-guest'),
      box: $('account-box'),
      name: $('account-name'),
      status: $('account-status'),
      logout: $('btn-logout'),
      note: $('login-note'),
      msg: $('login-msg'),
      chip: $('btn-account'),
      chipText: $('account-chip-text'),
    };
    this.open = false;
    this.providerButtons = account.providers.map((id) => {
      const b = h('button', { class: `btn login-btn ${id}`, attrs: { type: 'button', 'data-provider': id } }, [
        h('span', { class: 'login-ico', text: (PROVIDER_NAMES[id] ?? id).charAt(0) }),
        h('span', { text: `Continuă cu ${PROVIDER_NAMES[id] ?? id}` }),
      ]);
      onTap(b, () => this.signIn(id));
      this.el.buttons.appendChild(b);
      return b;
    });
    onTap(this.el.guest, () => {
      this.account.playAsGuest();
      this.close();
    });
    onTap(this.el.back, () => this.close());
    onTap(this.el.logout, () => this.signOut());
    onTap(this.el.chip, () => this.show());
    this.refresh();
  }

  /** Open the screen. `welcome`: first start (no back button, "how do you want to play?"). */
  show(welcome = false) {
    this.sfx?.tap?.();
    this.welcome = welcome;
    this.open = true;
    this.el.msg.hidden = true;
    this.el.start.hidden = true;
    this.el.screen.hidden = false;
    this.refresh();
  }

  close() {
    if (!this.open) return;
    this.open = false;
    this.el.screen.hidden = true;
    this.el.start.hidden = false;
    this.ui.h.onMenuShown?.();
  }

  /** A run starts etc.: just get out of the way. */
  closeSilently() {
    this.open = false;
    this.el.screen.hidden = true;
  }

  async signIn(provider) {
    this.setBusy(true);
    const res = await this.account.signIn(provider);
    this.setBusy(false);
    if (!res.ok) {
      this.sfx?.deny?.();
      this.el.msg.textContent = REASONS[res.reason] ?? REASONS.error;
      this.el.msg.hidden = false;
      return;
    }
    this.close(); // the result (progress loaded / carried over) is announced by a toast
  }

  async signOut() {
    this.setBusy(true);
    await this.account.signOut();
    this.setBusy(false);
    this.refresh();
  }

  setBusy(busy) {
    for (const b of [...this.providerButtons, this.el.guest, this.el.logout, this.el.back]) b.disabled = busy;
    if (busy) {
      this.el.msg.textContent = 'Se conectează…';
      this.el.msg.hidden = false;
    } else if (this.el.msg.textContent === 'Se conectează…') this.el.msg.hidden = true;
  }

  /** Bring the screen and the menu button in line with who is signed in. */
  refresh() {
    const a = this.account;
    const e = this.el;
    const user = a.user;
    // menu button
    e.chip.hidden = !a.available;
    e.chipText.textContent = user ? user.name : 'Invitat · Conectează-te';
    e.chip.classList.toggle('in', !!user);
    e.chip.classList.toggle('warn', !!user && a.status === 'offline');
    if (!this.open) return;
    e.back.hidden = this.welcome && !user;
    e.buttons.hidden = !!user;
    e.guest.hidden = !!user || !this.welcome;
    e.box.hidden = !user;
    if (user) {
      e.title.textContent = 'Contul tău';
      e.text.textContent = '';
      e.name.textContent = `${user.name}${PROVIDER_NAMES[user.provider] ? ` · ${PROVIDER_NAMES[user.provider]}` : ''}`;
      e.status.textContent = STATUS[a.status] ?? '';
    } else {
      e.title.textContent = this.welcome ? 'Bine ai venit!' : 'Conectează-te';
      e.text.textContent = 'Conectează-te ca să îți păstrezi progresul (bănuți, Coroane, skinuri, pass, misiuni) și să îl regăsești pe orice dispozitiv. Ce ai jucat ca invitat se mută în cont la prima conectare.';
    }
    e.note.textContent = this.demo
      ? 'Mod demonstrativ: acestea sunt conturi de test, nimic nu părăsește dispozitivul.'
      : 'În cont se salvează doar progresul din joc. Fără reclame și fără urmărire.';
  }
}
