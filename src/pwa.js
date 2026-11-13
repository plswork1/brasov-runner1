import { registerSW } from 'virtual:pwa-register';

/**
 * PWA glue (v2): service worker registration with SAFE updates, and the install button.
 *
 * Updates: the new version is downloaded in the background while the game runs from the cache.
 * It is NEVER activated in the middle of a run (that would reload the page and lose the run):
 *   - if nothing uses the app any more, the browser activates it by itself on the next start;
 *   - otherwise `onUpdateReady` is called and the menu offers "Actualizează" (one tap, reloads).
 * Progress is not touched by an update: it lives in localStorage (see logic/save.js), not in the
 * cache of the service worker.
 *
 * Inside the Capacitor APK there is no service worker at all (the files are in the app itself):
 * the Capacitor build disables the PWA plugin, and `registerSW` is then an empty function.
 *
 * @param o.onUpdateReady(apply)  a new version waits; call apply() to switch to it (reloads the page)
 * @param o.onOfflineReady()      everything is cached: the game now works without a network
 * @param o.onInstallable(prompt) the browser can install the app; call prompt() from a click
 * @param o.onInstalled()
 */
export function setupPwa({ onUpdateReady, onOfflineReady, onInstallable, onInstalled } = {}) {
  const native = typeof window !== 'undefined' && !!window.Capacitor?.isNativePlatform?.();
  if (!native) {
    try {
      const update = registerSW({
        immediate: true,
        onNeedRefresh: () => onUpdateReady?.(() => update(true)),
        onOfflineReady: () => onOfflineReady?.(),
        onRegisteredSW(_url, reg) {
          if (!reg) return;
          // Look for a new version when the app comes back to the front and once an hour.
          const check = () => {
            if (navigator.onLine !== false) reg.update().catch(() => {});
          };
          document.addEventListener('visibilitychange', () => !document.hidden && check());
          setInterval(check, 60 * 60 * 1000);
        },
        onRegisterError: () => {},
      });
    } catch {
      /* no service worker support: the game still works online */
    }
  }

  // Install button (Chrome / Edge on Android and desktop). iOS has no such event: see `isIosBrowser`.
  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    onInstallable?.(async () => {
      const ev = deferred;
      deferred = null;
      if (!ev) return false;
      ev.prompt();
      const choice = await ev.userChoice.catch(() => null);
      return choice?.outcome === 'accepted';
    });
  });
  window.addEventListener('appinstalled', () => {
    deferred = null;
    onInstalled?.();
  });
}

/** Already running as an installed app (home screen icon / desktop window / APK)? */
export function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone), (display-mode: fullscreen)').matches || window.navigator.standalone === true || !!window.Capacitor?.isNativePlatform?.();
}

/** Safari on iPhone / iPad: installing is done by hand from the Share menu. */
export function isIosBrowser() {
  const ua = navigator.userAgent || '';
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  return ios && !isStandalone();
}
