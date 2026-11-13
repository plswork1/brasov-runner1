/**
 * Keyboard + touch + mouse + gamepad input. This module only turns raw events into game actions;
 * the game decides whether an action is allowed in the current state.
 *
 * Keyboard: arrows or WASD, Space/Up/W = jump, Down/S = slide, Esc or P = pause, Enter = confirm,
 *           E = emoji.
 * Touch / mouse drag: swipe left/right/up/down on the game canvas.
 * Mouse (v2): a plain click on the left / right third of the screen changes lane, a click in the
 *           middle jumps, the right button slides (so the game can be played with the mouse alone).
 * Gamepad (v2, optional): d-pad or left stick, A = jump / confirm, B = slide, Start = pause.
 */

const KEY_ACTIONS = {
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
  ArrowUp: 'jump',
  KeyW: 'jump',
  Space: 'jump',
  ArrowDown: 'slide',
  KeyS: 'slide',
  Escape: 'pause',
  KeyP: 'pause',
  Enter: 'enter',
  NumpadEnter: 'enter',
  KeyE: 'emote',
};

const CLICK_MAX_MOVE = 8; // pixels: more than this is a drag, not a click
const CLICK_MAX_MS = 450;
const STICK = 0.55; // how far the stick must be pushed

const SWIPE_MIN = 26; // pixels the finger must travel before it counts as a swipe
// A diagonal stroke whose two axes are within this ratio is "undecided": wait a little longer for the finger
// to commit to one axis instead of guessing (a lane change where a jump was meant is the worst misread).
const AXIS_RATIO = 1.3;
const SWIPE_DECIDE = 44; // ...but never wait beyond this many pixels, then take the larger axis

function isTyping(target) {
  const tag = target?.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target?.isContentEditable;
}

export class Input {
  /**
   * @param canvas   element that receives swipes
   * @param handlers {left,right,jump,slide,pause,enter}
   */
  constructor(canvas, handlers) {
    this.h = handlers;
    this.touch = null;

    window.addEventListener('keydown', (e) => {
      if (isTyping(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
      const action = KEY_ACTIONS[e.code];
      if (!action) return;
      // Stop arrows/space from scrolling the page or pressing a focused button.
      e.preventDefault();
      if (e.repeat) return; // holding a key must not spam jumps or lane changes
      this.h[action]?.();
    });
    window.addEventListener('keyup', (e) => {
      if (isTyping(e.target)) return;
      if (KEY_ACTIONS[e.code]) e.preventDefault(); // Space keyup would otherwise "click" a focused button
    });

    // Pointer events cover touch, pen and mouse with one code path.
    canvas.addEventListener('pointerdown', (e) => {
      // The newest finger always wins: a lost pointerup (alert, notification pull-down) must never leave
      // the old finger blocking all later swipes.
      this.touch = { id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), swiped: false, button: e.button };
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* not supported / already released */
      }
    });
    canvas.addEventListener('pointermove', (e) => {
      const t = this.touch;
      if (!t || t.id !== e.pointerId) return;
      const dx = e.clientX - t.x;
      const dy = e.clientY - t.y;
      // (wardrobe preview: dragging turns the model; the game ignores it everywhere else)
      const moved = e.clientX - (t.lx ?? t.x0);
      t.lx = e.clientX;
      if (moved) this.h.drag?.(moved);
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      const big = Math.max(ax, ay);
      if (big < SWIPE_MIN) return;
      // Fires the moment the stroke is long enough (not on release); only a near-45 degree stroke waits.
      if (big < SWIPE_DECIDE && big < Math.min(ax, ay) * AXIS_RATIO) return;
      t.swiped = true;
      if (ax > ay) this.h[dx < 0 ? 'left' : 'right']?.();
      else this.h[dy < 0 ? 'jump' : 'slide']?.();
      // Restart from here so one long drag can produce several swipes, and one swipe fires only once.
      t.x = e.clientX;
      t.y = e.clientY;
    });
    const end = (e) => {
      if (this.touch && this.touch.id === e.pointerId) this.touch = null;
    };
    // Mouse only: a click without a drag is a lane change / jump / slide, by where it lands.
    canvas.addEventListener('pointerup', (e) => {
      const t = this.touch;
      if (!t || t.id !== e.pointerId || e.pointerType !== 'mouse' || t.swiped) return;
      if (Math.hypot(e.clientX - t.x0, e.clientY - t.y0) > CLICK_MAX_MOVE || performance.now() - t.t0 > CLICK_MAX_MS) return;
      if (t.button === 2) return void this.h.slide?.();
      if (t.button !== 0) return;
      const r = canvas.getBoundingClientRect();
      const fx = (e.clientX - r.left) / Math.max(1, r.width);
      if (fx < 1 / 3) this.h.left?.();
      else if (fx > 2 / 3) this.h.right?.();
      else this.h.jump?.();
    });
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    canvas.addEventListener('lostpointercapture', end);

    window.addEventListener('blur', () => {
      this.touch = null;
    });

    // Block the browser's own gestures (scroll, pull-to-refresh, pinch-zoom, context menu, double-tap zoom).
    const stop = (e) => e.preventDefault();
    canvas.addEventListener('touchmove', stop, { passive: false });
    canvas.addEventListener('touchstart', stop, { passive: false });
    canvas.addEventListener('contextmenu', stop);
    document.addEventListener('gesturestart', stop); // iOS pinch
    document.addEventListener('dblclick', stop);

    // Gamepad: polled only while one is connected.
    this.pad = { buttons: [], axis: 0 };
    this.padLoop = this.padLoop.bind(this);
    this.padRunning = false;
    window.addEventListener('gamepadconnected', () => {
      if (!this.padRunning) {
        this.padRunning = true;
        requestAnimationFrame(this.padLoop);
      }
    });
  }

  padLoop() {
    let gp = null;
    try {
      gp = [...(navigator.getGamepads?.() ?? [])].find((g) => g && g.connected) ?? null;
    } catch {
      gp = null;
    }
    if (!gp) {
      this.padRunning = false;
      return;
    }
    requestAnimationFrame(this.padLoop);
    const down = (i) => !!gp.buttons[i]?.pressed;
    const edge = (i) => {
      const now = down(i);
      const was = !!this.pad.buttons[i];
      this.pad.buttons[i] = now;
      return now && !was;
    };
    if (edge(14)) this.h.left?.();
    if (edge(15)) this.h.right?.();
    if (edge(12)) this.h.jump?.();
    if (edge(13) || edge(1)) this.h.slide?.();
    if (edge(0)) {
      this.h.jump?.();
      this.h.enter?.();
    }
    if (edge(9)) this.h.pause?.();
    if (edge(3)) this.h.emote?.();
    // left stick: one lane change (or jump / slide) per push
    const ax = gp.axes[0] ?? 0;
    const ay = gp.axes[1] ?? 0;
    const dir = ax < -STICK ? 1 : ax > STICK ? 2 : ay < -STICK ? 3 : ay > STICK ? 4 : 0;
    if (dir !== this.pad.axis) {
      this.pad.axis = dir;
      if (dir === 1) this.h.left?.();
      else if (dir === 2) this.h.right?.();
      else if (dir === 3) this.h.jump?.();
      else if (dir === 4) this.h.slide?.();
    }
  }
}
