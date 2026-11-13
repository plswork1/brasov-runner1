"""
Service worker update test for Brașov Runner (separate from game_tests.py because it REBUILDS the
game twice and runs its own preview server on port 4175).

What it checks
  * first visit: the service worker installs and the game then loads with the network off;
  * a new version is published while a run is in progress: the page is NOT reloaded, the run goes on;
  * back on the menu the "Actualizează" offer appears; one tap switches to the new version;
  * progress (wallet, skins...) is untouched by the update;
  * the new version also works offline.

Run from the project root:   python3 tests/browser/sw_update_test.py
"""
import os
import subprocess
import sys
import re
import time

from playwright.sync_api import sync_playwright

PORT = 4175
URL = f'http://localhost:{PORT}/?debug&noauth'
ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
results = []


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))
    print(('  PASS  ' if cond else '  FAIL  ') + name + (f'   [{detail}]' if detail and not cond else ''))


def build(tag=''):
    env = dict(os.environ)
    env.pop('BUILD_TAG', None)
    if tag:
        env['BUILD_TAG'] = tag
    subprocess.run(['npm', 'run', 'build', '--silent'], cwd=ROOT, env=env, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    print('\n[U] Service worker: install, offline, update without losing a run or the progress')
    build('')
    server = subprocess.Popen(['npx', 'vite', 'preview', '--port', str(PORT), '--strictPort'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        time.sleep(2.5)
        with sync_playwright() as p:
            browser = p.chromium.launch(args=ARGS)
            ctx = browser.new_context(viewport={'width': 900, 'height': 600})
            page = ctx.new_page()
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.goto(URL)
            page.wait_for_function('window.__game !== undefined', timeout=60000)
            page.wait_for_function('navigator.serviceWorker.ready.then(() => true)', timeout=30000)
            page.wait_for_function('!!navigator.serviceWorker.controller || navigator.serviceWorker.getRegistration().then((r) => !!r.active)', timeout=30000)
            time.sleep(2)
            v1 = page.inner_text('#app-version')
            check('first visit: the service worker is active and the menu shows the version', re.search(r'v\d+\.\d+\.\d+', v1) is not None and '+' not in v1, v1)
            ctx.set_offline(True)
            page.reload()
            page.wait_for_function('window.__game !== undefined', timeout=60000)
            check('the game loads with the network off (everything is cached)', page.is_visible('#screen-start'))
            ctx.set_offline(False)

            # progress to keep, then a run in progress
            page.evaluate("() => { const m = window.__meta; m.bank({coins: 3234, crowns: 56}); m.buy('boy', 'schior'); m.equip('boy', 'schior'); window.__game.applyCosmetics(); window.__marker = 'same-page'; }")
            page.click('#btn-play')
            page.evaluate('() => { const g = window.__game; g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0; g.stepSim(3, 1/60); }')

            # a new version is published
            build('update-test')
            page.evaluate('navigator.serviceWorker.getRegistration().then((r) => r.update())')
            page.wait_for_function('navigator.serviceWorker.getRegistration().then((r) => !!r.waiting)', timeout=60000)
            time.sleep(1.5)
            r = page.evaluate("() => ({marker: window.__marker, state: window.__game.state, toast: document.getElementById('toasts').textContent, version: document.getElementById('app-version').textContent})")
            check('a new version arrives during a run: no reload, the run goes on, nothing pops up', r['marker'] == 'same-page' and r['state'] in ('playing', 'paused') and 'versiune' not in r['toast'] and r['version'] == v1, str(r))

            page.evaluate('window.__game.toMenu()')
            time.sleep(0.3)
            # the coins picked up during the run are banked when it ends; the update must keep exactly this
            wallet = page.evaluate('({...window.__meta.wallet})')
            toast = page.inner_text('#toasts')
            check('back on the menu the update is offered ("Actualizează")', 'versiune nouă' in toast and page.is_visible('#toasts .toast-btn'), toast)
            with page.expect_navigation(timeout=60000):
                page.click('#toasts .toast-btn')
            page.wait_for_function('window.__game !== undefined', timeout=60000)
            time.sleep(0.5)
            r = page.evaluate("() => ({marker: window.__marker ?? null, version: document.getElementById('app-version').textContent, wallet: {...window.__meta.wallet}, skin: window.__game.playerView.skinId, owned: window.__meta.cosmetics.owned.boy})")
            check('one tap: the page reloads into the new version', r['marker'] is None and '+update-test' in r['version'], str(r))
            check('progress survives the update (wallet, owned and equipped skin)', r['wallet'] == wallet and r['skin'] == 'schior' and 'schior' in r['owned'], str(r) + ' expected ' + str(wallet))
            ctx.set_offline(True)
            page.reload()
            page.wait_for_function('window.__game !== undefined', timeout=60000)
            check('the new version works offline too', '+update-test' in page.inner_text('#app-version') and page.evaluate('window.__meta.wallet.coins') == wallet['coins'])
            ctx.set_offline(False)
            check('no JavaScript errors', not errors, '; '.join(errors[:3]))
            browser.close()
    finally:
        server.terminate()
        build('')  # leave a normal build behind

    failed = [r for r in results if not r[1]]
    print(f'\n{len(results) - len(failed)}/{len(results)} checks passed')
    for name, _, detail in failed:
        print('FAILED:', name, detail)
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
