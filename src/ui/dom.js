/**
 * Small DOM helpers for the overlay screens. All text goes in through `textContent`
 * (never innerHTML), so nothing the player types or stores can inject markup.
 */

/** Create an element: h('button', {class: 'btn', text: 'OK', attrs: {type: 'button'}}, [children]) */
export function h(tag, opts = {}, children = []) {
  const el = document.createElement(tag);
  if (opts.class) el.className = opts.class;
  if (opts.text !== undefined) el.textContent = String(opts.text);
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) el.setAttribute(k, String(v));
  if (opts.on) for (const [k, fn] of Object.entries(opts.on)) el.addEventListener(k, fn);
  for (const c of children) if (c) el.appendChild(c);
  return el;
}

const DOUBLE_TAP_MS = 320;
const SAME_SPOT_PX = 32;
const last = { t: -Infinity, x: 0, y: 0, el: null }; // the last accepted tap, shared by ALL buttons

/**
 * Click handler that ignores the second click of a double tap / double click and takes the focus
 * off the button, so Space / Enter in the game never "press" it again.
 *
 * A second click counts as a repeat when it comes within 320 ms on the same button OR ON THE SAME
 * SPOT of the screen: after a tap the screen often changes under the finger (a button disappears
 * and its neighbour slides into its place), so the second tap would otherwise press a DIFFERENT
 * button. (Found by the tests: double-tapping "Deblochează pista premium" also pressed "Revendică
 * tot".) A quick tap on another button somewhere else is not affected.
 * The logic behind every button is safe against repeats on its own as well.
 */
export function onTap(el, fn) {
  el.addEventListener('click', (e) => {
    e.currentTarget.blur?.();
    const now = performance.now();
    const sameSpot = e.detail > 0 && Math.hypot(e.clientX - last.x, e.clientY - last.y) < SAME_SPOT_PX;
    if (now - last.t < DOUBLE_TAP_MS && (el === last.el || sameSpot)) return;
    last.t = now;
    last.x = e.clientX;
    last.y = e.clientY;
    last.el = el;
    fn(e);
  });
  return el;
}

/** 0..1 -> "37%" for progress bars. */
export function pct(fraction) {
  const f = Number.isFinite(fraction) ? Math.max(0, Math.min(1, fraction)) : 0;
  return `${Math.round(f * 100)}%`;
}
