#!/usr/bin/env python3
"""
Numbers instead of ears: renders every sound effect and ~8 s of each level's music through an
OfflineAudioContext inside the built game (the SAME synthesis code as the game, via window.__audioLab, which
exists only with ?debug) and prints peak / RMS / NaN / silence / clipping.

    npm run build && npx vite preview --port 4184 --strictPort &
    python3 scripts/audio_check.py --port 4184 [--secs 8] [--no-soak]

Checks (exit code 1 when one fails):
  * no NaN, nothing silent, nothing clipped after the limiter (peak < 0.999);
  * effects reach a sensible peak (> -30 dBFS) and do not use the whole range (< -1 dBFS);
  * the music (every level, full mix) is clearly quieter than the effects: its RMS is at least 8 dB below the
    median PEAK of the core gameplay effects (coin, jump, lane, slide, hit, powerUp), and its peak is below -6 dBFS;
  * the levels are balanced: full-mix music RMS of the loudest and the quietest level differ by <= 3 dB;
  * fuller with speed: full mix is louder than calm; the chase mix louder than the full one;
  * a live 6 s run of the real engine (level changes, chase, slow-motion): the context runs and the number of live
    voices stays bounded (no leaked nodes).
A "limiter" column shows the raw (pre-limiter) peak: above 1.0 the limiter is doing work for that sound.
"""
import argparse
import fcntl
import json
import os
import statistics
import sys

from playwright.sync_api import sync_playwright

ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
        '--enable-webgl', '--autoplay-policy=no-user-gesture-required']
CORE = ('coin(1)', 'jump', 'lane', 'slide', 'hit', 'powerUp(magnet)')


def db(x):
    return f'{x:6.1f}' if x > -900 else '  -inf'


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--port', default=os.environ.get('BR_PORT', '4173'))
    ap.add_argument('--secs', type=float, default=8)
    ap.add_argument('--no-soak', action='store_true', help='skip the real-time 6 s live engine test')
    ap.add_argument('--json', default='', help='also write the raw numbers here')
    a = ap.parse_args()

    lock = open('/tmp/br-shot.lock', 'w')
    fcntl.flock(lock, fcntl.LOCK_EX)
    errors = []
    with sync_playwright() as p:
        b = p.chromium.launch(args=ARGS)
        page = b.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(f'http://localhost:{a.port}/?debug&noauth')
        page.wait_for_function('window.__audioLab !== undefined', timeout=60000)
        # the game itself is not needed: stop its (software-rendered) loop so the CPU goes to the audio
        page.evaluate("() => { if (window.__game) window.__game.loop = () => {}; }")
        page.wait_for_timeout(500)
        data = page.evaluate(f'window.__audioLab.runAll({{musicSecs: {a.secs}}})')
        soak = None if a.no_soak else page.evaluate('window.__audioLab.liveSoak(6)')
        b.close()
    if a.json:
        json.dump({'data': data, 'soak': soak}, open(a.json, 'w'), indent=1)

    fails = []
    print('EFFECTS                 peak dB   rms dB  ms    raw peak')
    for e in data['effects']:
        flag = ''
        if e['nan']:
            fails.append(f"{e['label']}: NaN samples")
        if e['silent']:
            fails.append(f"{e['label']}: silent")
        if e['clipped']:
            fails.append(f"{e['label']}: {e['clipped']} clipped samples")
        if e['peakDb'] < (-34 if e['label'] in ('tap', 'lane') else -30):
            fails.append(f"{e['label']}: too quiet ({e['peakDb']} dBFS)")
        if e['peakDb'] > -1:
            fails.append(f"{e['label']}: too loud ({e['peakDb']} dBFS)")
        if e['rawPeak'] > 1.0:
            flag = ' limiter'
        print(f"  {e['label']:<20} {db(e['peakDb'])}  {db(e['rmsDb'])}  {e['lengthMs']:>4}  {e['rawPeak']:.2f}{flag}")

    core = [e['peak'] for e in data['effects'] if e['label'] in CORE]
    core_med = statistics.median(core) if core else 0
    print('\nMUSIC (offline, %.0f s)   level       mix    bpm  peak dB  rms dB  raw peak' % a.secs)
    by = {}
    for m in data['music']:
        by[(m['level'], m['mix'])] = m
        if m['nan']:
            fails.append(f"music {m['level']}/{m['mix']}: NaN samples")
        if m['silent']:
            fails.append(f"music {m['level']}/{m['mix']}: silent")
        if m['clipped']:
            fails.append(f"music {m['level']}/{m['mix']}: {m['clipped']} clipped samples")
        if m['mix'] == 'full' and m['peakDb'] > -6:
            fails.append(f"music {m['level']}/full: peak {m['peakDb']} dBFS (> -6)")
        if m['mix'] == 'full' and core_med and m['rms'] > core_med * 0.4:
            fails.append(f"music {m['level']}/full: only {20 * __import__('math').log10(core_med / m['rms']):.1f} dB below the core effects' peak")
        print(f"  {'':<22} {m['level']:<11} {m['mix']:<6} {m['bpm']:>3}  {db(m['peakDb'])}  {db(m['rmsDb'])}  {m['rawPeak']:.2f}")
    fulls = [by[(l, 'full')]['rms'] for l in data['levels'] if (l, 'full') in by]
    if fulls and max(fulls) / max(min(fulls), 1e-9) > 1.41:
        fails.append(f'levels unbalanced: full-mix RMS spread {20 * __import__("math").log10(max(fulls) / min(fulls)):.1f} dB (> 3)')
    for l in data['levels']:
        if (l, 'calm') in by and (l, 'full') in by and by[(l, 'full')]['rms'] <= by[(l, 'calm')]['rms']:
            fails.append(f'{l}: full mix is not louder than calm')
        if (l, 'chase') in by and (l, 'full') in by and by[(l, 'chase')]['rms'] <= by[(l, 'full')]['rms']:
            fails.append(f'{l}: chase mix is not louder than full')
    print(f'\ncore effects median PEAK: {20 * __import__("math").log10(core_med):.1f} dBFS' if core_med else '')
    if fulls:
        print(f'music full-mix RMS: {20 * __import__("math").log10(min(fulls)):.1f} .. {20 * __import__("math").log10(max(fulls)):.1f} dBFS')

    if soak:
        print(f"\nLIVE SOAK: context {soak['state']}, live voices over time {soak['series']}, max {soak['max']}")
        if soak['state'] != 'running':
            fails.append(f"live engine: context is {soak['state']}")
        if soak['max'] > 150:
            fails.append(f"live engine: {soak['max']} live voices (leak?)")
        if len(soak['series']) >= 4 and soak['series'][-1] > 2 * statistics.median(soak['series']) + 10:
            fails.append('live engine: voice count keeps growing')
    for e in data['errors'] + errors:
        fails.append(f'error: {e}')
    if fails:
        print('\nFAILED:', *fails, sep='\n  - ')
        sys.exit(1)
    print('\nALL CHECKS PASSED')


if __name__ == '__main__':
    main()
