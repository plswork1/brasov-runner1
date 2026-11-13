#!/usr/bin/env python3
"""
Screenshots of the built game for checking visual work (headless Chromium, software WebGL).

    npm run build && npx vite preview --port 4173 --strictPort &      # the game must be served
    python3 scripts/shot.py --out /tmp/shots --biome 0,4 --secs 6     # one picture per level
    python3 scripts/shot.py --out /tmp/shots --biome 1 --action jump --frames 8 --gap 0.08
    python3 scripts/shot.py --out /tmp/shots --menu --mobile

Options
  --port N         port of `vite preview` (default: $BR_PORT or 4173)
  --out DIR        where the PNG files go (created)
  --biome LIST     levels to capture, e.g. 0 or 0,2,4 (0 Poiana, 1 Republicii, 2 Tractorul, 3 AFI, 4 Noua)
  --secs S         seconds of run simulated before the first picture (default 6; obstacles do not hurt)
  --action A       jump | slide | left | right | hit | none: done right before the pictures
  --frames N       number of pictures (default 1); the game is stepped by --gap seconds between them,
                   deterministically (the real-time loop is stopped), so animations can be followed
  --gap S          game seconds between pictures (default 0.1)
  --js CODE        JavaScript run in the page before the first picture; `g` is the Game (window.__game)
  --each CODE      JavaScript run before EVERY picture
  --size WxH       viewport (default 960x540); --mobile = 390x844 touch device
  --menu           capture the start screen instead of a run
  --name PREFIX    file name prefix (default "shot")

Only one copy runs at a time (a lock file), because software rendering needs a whole CPU core.
Prints the files written and any JavaScript error of the page.
"""
import argparse
import fcntl
import os
import sys
import time

from playwright.sync_api import sync_playwright

ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']
ACTIONS = {
    'jump': 'g.player.jump();',
    'slide': 'g.player.slide();',
    'left': 'g.player.moveLane(-1);',
    'right': 'g.player.moveLane(1);',
    'hit': "g.checkCollisions = g.__realCollisions; g.spawnDebug('log', g.player.lane, 3);",
    'none': '',
}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--port', default=os.environ.get('BR_PORT', '4173'))
    ap.add_argument('--out', required=True)
    ap.add_argument('--biome', default='0')
    ap.add_argument('--secs', type=float, default=6)
    ap.add_argument('--action', default='none', choices=sorted(ACTIONS))
    ap.add_argument('--frames', type=int, default=1)
    ap.add_argument('--gap', type=float, default=0.1)
    ap.add_argument('--js', default='')
    ap.add_argument('--each', default='')
    ap.add_argument('--size', default='960x540')
    ap.add_argument('--mobile', action='store_true')
    ap.add_argument('--menu', action='store_true')
    ap.add_argument('--name', default='shot')
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    w, h = (390, 844) if a.mobile else map(int, a.size.split('x'))
    url = f'http://localhost:{a.port}/?debug&noauth'

    lock = open('/tmp/br-shot.lock', 'w')
    fcntl.flock(lock, fcntl.LOCK_EX)  # one software-rendered browser at a time
    errors = []
    with sync_playwright() as p:
        b = p.chromium.launch(args=ARGS)
        for biome in [int(x) for x in a.biome.split(',')]:
            ctx = b.new_context(viewport={'width': w, 'height': h}, is_mobile=a.mobile, has_touch=a.mobile)
            page = ctx.new_page()
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
            page.goto(url)
            page.wait_for_function('window.__game !== undefined', timeout=60000)
            time.sleep(0.5)
            page.evaluate(f'window.__game.setStartBiome({biome})')
            if not a.menu:
                page.evaluate(f"""() => {{
                    const g = window.__game;
                    g.startRun();
                    g.__realCollisions = g.checkCollisions;
                    g.checkCollisions = () => {{}};          // obstacles do not hurt while we take pictures
                    g.loop = () => {{}};                     // stop the real-time loop: we step the game ourselves
                    const dt = 1 / 60;
                    // (drawing is the slow part in software: only the last 1.5 s of the lead-in are drawn, enough for effects to settle)
                    const steps = Math.round({a.secs} / dt);
                    for (let i = 0; i < steps; i++) {{ g.advance(dt); if (i >= steps - 90) g.render(dt); }}
                }}""")
            else:
                time.sleep(1.0)
            if a.js:
                page.evaluate('() => { const g = window.__game; ' + a.js + ' }')
            if a.action != 'none' and not a.menu:
                page.evaluate('() => { const g = window.__game; ' + ACTIONS[a.action] + ' }')
            for i in range(a.frames):
                if not a.menu:
                    page.evaluate(f"""() => {{
                        const g = window.__game; {a.each}
                        const n = Math.max(1, Math.round({a.gap} * 60)), dt = {a.gap} / n;
                        for (let k = 0; k < n; k++) {{ g.advance(dt); g.render(dt); }}
                    }}""")
                elif a.each:
                    page.evaluate('() => { const g = window.__game; ' + a.each + ' }')
                path = os.path.join(a.out, f'{a.name}_b{biome}_{i:02d}.png')
                page.screenshot(path=path)
                print(path)
            ctx.close()
        b.close()
    if errors:
        print('PAGE ERRORS:', *sorted(set(errors))[:10], sep='\n  ')
        sys.exit(1)


if __name__ == '__main__':
    main()
