"""
Browser tests for the v2 features of Brașov Runner. They are run by game_tests.py (same command,
same report); this file only holds the test functions.

  [P]  the two new power-ups (shield, slow-motion clock) and the crown item
  [B]  the bot plays through all levels with the new power-ups forced on all the time
  [R]  revive: crowns / mock ad, growing price, limit, invulnerability, cleared track, and the ugly
       cases (double taps, tab in the background, restart during the ad, offline, app closed)
  [E]  economy screens: missions, battle pass, wardrobe (through the real buttons), persistence
  [K]  skins: every skin on every ride / in every bear mode, no GPU leak, change in mid-run
  [S]  the save module in a real browser: blocked / full / corrupted storage, update from v1, two tabs
  [T]  time: midnight during a run, new day while the menu is open, clock moved back
  [Y]  layout and input: desktop side bars, phones, resize, rotation, mouse, gamepad
  [X]  edge cases: pause in slow motion, background tab, double taps, abandoned runs
  [F]  performance budget: draw calls, triangles, simulation cost, DOM and GPU memory
"""
import json
import time

H = None  # helpers from game_tests.py: check, snap, new_page, BOT_JS


def register(helpers):
    global H
    H = helpers
    return [test_new_powers, test_bot_new_powers, test_revive, test_revive_edge_cases, test_meta_screens, test_pass_animated, test_accounts, test_skins, test_save_browser, test_time, test_layout_input, test_edge_cases, test_performance]


G = 'const g = window.__game;'
# A clean track at running speed: no generated obstacles, coins or power-ups.
SETUP = G + """
  g.startRun(); g.generationEnabled = false; g.powerupsEnabled = false;
  for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
  for (const c of g.coins) g.coinPool.release(c.mesh); g.coins.length = 0;
  g.stepSim(2.5, 1/60);
"""
# window.__die(): two hits in a row -> the bear catches the player; returns the state after the
# death animation ('revive' when an offer is shown, 'gameover' otherwise).
DIE_JS = """() => { window.__die = () => { const g = window.__game;
  g.bear.reset(); g.reviveGrace = 0; g.powers.reset();
  g.spawnDebug(g.biomes[g.biome].block[0], g.player.lane, 8);
  let n = 0; while (g.bear.phase === 'none' && n++ < 900) g.stepSim(1/60, 1/60);
  g.bear.graceLeft = 0;
  g.spawnDebug(g.biomes[g.biome].block[0], g.player.lane, 8);
  n = 0; while ((g.state === 'playing' || g.state === 'dying') && n++ < 3000) g.stepSim(1/60, 1/60);
  return g.state; }; }"""


def js(page, body):
    return page.evaluate('() => {' + body + '}')


# ----------------------------------------------------------------------------------------------
def test_new_powers(browser):
    print('\n[P] v2 power-ups: Scutul Bastionului, Ceasul din Piața Sfatului, the crown item')
    check = H.check
    page = H.new_page(browser)

    # --- picking the items up
    r = js(page, SETUP + """
      const res = {};
      for (const type of ['shield', 'slowmo']) {
        g.powers.reset(); g.stepSim(1.5, 1/60);
        g.spawnPickup(type, 0, 12); g.stepSim(1.2, 1/60);
        res[type] = +g.powers.remaining[type].toFixed(2);
      }
      g.powers.reset(); g.stepSim(1.5, 1/60);
      const powersBefore = g.stats.powers;
      g.spawnPickup('crown', 0, 12); g.spawnPickup('crown', 1, 12); g.stepSim(1.2, 1/60); g.render(1/60);
      res.crowns = g.crownsCollected;
      res.crownIsNoPower = g.stats.powers === powersBefore && Object.values(g.powers.remaining).every((v) => v === 0);
      res.hudCrown = !document.getElementById('hud-crown-chip').hidden && document.getElementById('hud-crowns').textContent;
      res.walletDuringRun = g.meta.wallet.crowns;
      return res;
    """)
    check('running into the shield item activates it (12 s)', 10 < r['shield'] <= 12, str(r))
    check('running into the clock item activates it (6 s)', 4 < r['slowmo'] <= 6, str(r))
    check('crown item: collected only in the player lane, counted in the HUD, it is not a power-up', r['crowns'] == 1 and r['crownIsNoPower'] and r['hudCrown'] == '1', str(r))

    # --- shield
    r = js(page, SETUP + """
      g.givePower('shield'); g.render(1/60);
      const propOn = g.playerView.shieldProp.visible;
      const rock = g.spawnDebug('rock', 0, 12);
      g.stepSim(1.2, 1/60); g.render(1/60);
      return {propOn, bear: g.bear.phase, state: g.state, left: g.powers.remaining.shield, blocks: g.stats.shieldBlocks, hits: g.stats.hits,
              ghost: rock.ghost, propOff: !g.playerView.shieldProp.visible, slow: g.slow};
    """)
    check('shield: the bubble is shown around the boy while it is active', r['propOn'] and r['propOff'], str(r))
    check('shield absorbs the first hit: obstacle smashed, NO bear, no slowdown, shield used up', r['bear'] == 'none' and r['state'] == 'playing' and r['left'] == 0 and r['blocks'] == 1 and r['hits'] == 0 and r['ghost'] and r['slow'] > 0.99, str(r))

    r = js(page, SETUP + """
      g.givePower('shield');
      g.spawnDebug('rock', 0, 12); g.spawnDebug('rock', 0, 14.5); g.spawnDebug('snowman', 0, 16);
      g.stepSim(1.2, 1/60);
      const cluster = g.bear.phase;
      g.stepSim(1.5, 1/60);                       // grace long over
      g.spawnDebug('rock', 0, 12); g.stepSim(1.2, 1/60);
      return {cluster, later: g.bear.phase, state: g.state};
    """)
    check('shield: a cluster of obstacles right after the absorbed hit is harmless (short grace)', r['cluster'] == 'none', str(r))
    check('shield gone: the next hit starts the normal 5 s chase', r['later'] == 'chasing' and r['state'] == 'playing', str(r))

    r = js(page, SETUP + """
      g.spawnDebug('rock', 0, 12);
      while (g.bear.phase === 'none') g.stepSim(1/60, 1/60);
      g.stepSim(1.6, 1/60);                       // past the grace period of the first hit
      g.givePower('shield');
      const remBefore = g.bear.remaining;
      g.spawnDebug('stump', 0, 10);
      g.stepSim(1.0, 1/60);
      const absorbed = {state: g.state, bear: g.bear.phase, rem: g.bear.remaining, shield: g.powers.remaining.shield};
      // the chase goes on: without a shield the next hit catches the player
      g.stepSim(0.3, 1/60);
      g.spawnDebug('stump', 0, 10);
      let n = 0; while (g.state === 'playing' && n++ < 300) g.stepSim(1/60, 1/60);
      return {remBefore, absorbed, after: g.state, bearAfter: g.bear.phase};
    """)
    a = r['absorbed']
    check('shield while the bear chases: the hit does NOT catch you and the 5 s timer keeps running', a['state'] == 'playing' and a['bear'] == 'chasing' and a['shield'] == 0 and abs((r['remBefore'] - a['rem']) - 1.0) < 0.05, str(r))
    check('bear rule kept: the next hit during the same chase (no shield left) = caught', r['after'] == 'dying' and r['bearAfter'] == 'caught', str(r))

    r = js(page, SETUP + """
      g.givePower('shield');
      g.stepSim(11.5, 1/60); const still = g.powers.active('shield');
      g.stepSim(1.0, 1/60); const gone = !g.powers.active('shield');
      g.spawnDebug('rock', 0, 12); g.stepSim(1.2, 1/60);
      return {still, gone, bear: g.bear.phase};
    """)
    check('shield lasts 12 s, then a hit counts again', r['still'] and r['gone'] and r['bear'] == 'chasing', str(r))

    # --- clock
    r = js(page, SETUP + """
      const d0 = g.distance; g.stepSim(3, 1/60); const normal = g.distance - d0;
      """ + SETUP.replace(G, '') + """
      g.givePower('slowmo');
      const d1 = g.distance; g.stepSim(3, 1/60); const slowed = g.distance - d1;
      g.render(1/60);
      const vignette = +document.getElementById('slowmo').style.opacity;
      const hudKmh = +document.getElementById('hud-speed').textContent;
      return {normal, slowed, ratio: slowed / normal, scale: g.timeScale, target: g.cfg.power.slowScale, vignette, hudKmh, nominal: Math.round(g.speed * 3), prop: g.playerView.clockProp.visible};
    """)
    check('clock: the world runs in slow motion (time scale 0.55, distance per second drops accordingly)', abs(r['scale'] - r['target']) < 0.01 and 0.5 < r['ratio'] < 0.68, str(r))
    check('clock: shown on screen (vignette + clock beside the boy, HUD shows the slowed speed), no timer', r['vignette'] > 0.9 and r['prop'] and r['hudKmh'] < r['nominal'] * 0.7, str(r))

    r = js(page, SETUP + """
      g.spawnDebug('rock', 0, 12);
      while (g.bear.phase === 'none') g.stepSim(1/60, 1/60);
      g.givePower('slowmo');
      const rem0 = g.bear.remaining;
      g.stepSim(2, 1/60);
      const rem1 = g.bear.remaining;
      g.stepSim(3.2, 1/60);
      return {dropped: rem0 - rem1, phase: g.bear.phase, state: g.state};
    """)
    check('clock does NOT slow the bear: its chase still lasts 5 real seconds', abs(r['dropped'] - 2) < 0.05 and r['phase'] in ('leaving', 'none') and r['state'] == 'playing', str(r))

    r = js(page, SETUP + """
      g.givePower('magnet'); g.givePower('slowmo');
      g.stepSim(4, 1/60);
      const magnet = g.powers.remaining.magnet, clock = g.powers.remaining.slowmo;
      g.stepSim(1.5, 1/60); const on = g.powers.active('slowmo');
      g.stepSim(2.5, 1/60);                      // 6 s over + the short ease back to normal speed
      return {magnet, clock, on, off: !g.powers.active('slowmo'), scale: g.timeScale};
    """)
    check('clock lasts 6 real seconds; the other power-ups run in slowed game time meanwhile', abs(r['clock'] - 2) < 0.05 and 12.4 < r['magnet'] < 13.1 and r['on'] and r['off'], str(r))
    check('after the clock the time scale is back to exactly 1', r['scale'] == 1, str(r))

    r = js(page, SETUP + """
      const jump = (slow) => { """ + SETUP.replace(G, '') + """
        if (slow) { g.givePower('slowmo'); g.stepSim(1, 1/60); }
        g.runTime = 30; g.stepSim(0.2, 1/60);
        const d = g.distance; let apex = 0, steps = 0; g.actions.jump(); g.stepSim(1/60, 1/60);
        while (!g.player.grounded && steps++ < 600) { g.stepSim(1/60, 1/60); apex = Math.max(apex, g.player.y); }
        return {len: g.distance - d, apex, steps}; };
      return {normal: jump(false), slow: jump(true)};
    """)
    n, s = r['normal'], r['slow']
    check('clock: a jump covers the same distance and height in slow motion (only takes longer), so obstacles stay fair', abs(n['len'] - s['len']) < 1.2 and abs(n['apex'] - s['apex']) < 0.05 and s['steps'] > n['steps'] * 1.5, str(r))

    # --- pause freezes both new power-ups
    js(page, SETUP + "g.givePower('shield'); g.givePower('slowmo'); g.stepSim(1, 1/60); g.pause();")
    a = js(page, G + 'return {...g.powers.remaining, scale: g.timeScale, state: g.state};')
    time.sleep(1.2)
    b2 = js(page, G + 'return {...g.powers.remaining, scale: g.timeScale, state: g.state};')
    check('pause freezes the shield and the clock timers', a == b2 and a['state'] == 'paused', f'{a} -> {b2}')
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_bot_new_powers(browser):
    print('\n[B] Bot through all 5 levels with the new power-ups forced on (shield, clock, clock + jetpack)')
    check = H.check
    page = H.new_page(browser)
    page.evaluate('window.__makeBot = ' + H.BOT_JS)
    total_hits, first, biomes, runs = 0, None, set(), 15
    absorbed = 0
    combos = 0
    for i in range(runs):
        res = page.evaluate(
            """([jitter, start, mode]) => {
              const g = window.__game;
              g.setStartBiome(start); g.startRun();
              const hits = []; const seen = new Set(); let combos = 0;
              const orig = g.onHit.bind(g);
              g.onHit = (o) => { hits.push({type: o.type, t: +g.runTime.toFixed(1), lane: g.player.lane, y: +g.player.y.toFixed(2), scale: +g.timeScale.toFixed(2), powers: {...g.powers.remaining}, biome: g.biome}); orig(o); };
              const bot = window.__makeBot(jitter);
              let next = 6;
              const step = (g) => {
                for (const k of g.pickups) if (!k.taken) { k.taken = true; g.pickupPool.release(k.mesh); g.givePower(k.type); }
                if (!g.transitionPending && g.runTime - g.biomeStart > 40) g.forceTransition();
                seen.add(g.biome);
                if (g.runTime > next) {
                  next += mode === 0 ? 7 : 11;
                  // mode 0: the clock again and again (speed changes all the time)
                  // mode 1: clock + shield + super board together
                  // mode 2: jetpack, and the clock picked up in mid-air (landing zone must stay right)
                  if (mode === 0) g.givePower('slowmo');
                  else if (mode === 1) { g.givePower('slowmo'); g.givePower('shield'); g.givePower('board'); }
                  else if (!g.player.flying && !g.jetLanding) { g.givePower('jetpack'); g.__clockAt = g.runTime + 2 + Math.random() * 5; }
                }
                if (mode === 2 && g.__clockAt && g.runTime > g.__clockAt && g.player.flying) { g.givePower('slowmo'); g.__clockAt = 0; combos++; }
                bot(g);
              };
              g.stepSim(200, 1/60, step);
              g.onHit = orig;
              return {hits, seen: [...seen], state: g.state, runTime: g.runTime, blocks: g.stats.shieldBlocks, combos};
            }""",
            [i % 2 == 1, i % 5, i % 3],
        )
        biomes.update(res['seen'])
        total_hits += len(res['hits'])
        combos += res['combos']
        absorbed += res['blocks']
        if res['hits'] and first is None:
            first = (i, res['hits'][:2])
    check(f'{runs} bot runs x 200 s with the new power-ups always on: not a single hit ("there is always a way" still holds)', total_hits == 0, f'hits={total_hits}, first={first}')
    check('those runs went through all 5 levels', biomes == {0, 1, 2, 3, 4}, str(biomes))
    check('the clock was picked up in mid-air with the jetpack many times and every landing was safe', combos >= 20, str(combos))
    check('no JavaScript errors during the bot runs', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_revive(browser):
    print('\n[R] Revive: "Continui?" with crowns or a (mock) ad')
    check = H.check
    page = H.new_page(browser)
    page.evaluate(DIE_JS)
    js(page, 'window.__meta.bank({crowns: 20});')
    cfg = js(page, G + 'return g.cfg.revive;')

    r = js(page, SETUP + """
      g.coinsCollected = 7;                                    // coins of this run, not banked yet
      const st = window.__die();
      const far = g.spawnDebug('rock', 0, 30), near = g.spawnDebug('snowman', 1, 12), beyond = g.spawnDebug('rock', -1, 400);
      const e = (id) => document.getElementById(id);
      return {st, offer: !e('screen-revive').hidden, over: !e('screen-over').hidden, hud: !e('hud').hidden,
              pay: e('btn-revive-crowns').textContent, payEnabled: !e('btn-revive-crowns').disabled, ad: !e('btn-revive-ad').hidden && !e('btn-revive-ad').disabled,
              sub: e('revive-sub').textContent, wallet: {...g.meta.wallet}, frozen: g.distance};
    """)
    check('caught by the bear -> "Continui?" appears instead of game over, with both options', r['st'] == 'revive' and r['offer'] and not r['over'] and r['ad'] and r['payEnabled'], str(r))
    check(f"the price of the first revive is {cfg['costs'][0]} crowns and the screen says which revive it is", str(cfg['costs'][0]) in r['pay'] and '1 din 3' in r['sub'], str(r))
    check('coins of the run are in the wallet as soon as the offer appears (nothing is lost if the app is closed)', r['wallet']['coins'] == 7, str(r['wallet']))
    time.sleep(0.8)
    check('the game is frozen behind the offer', js(page, G + 'return g.distance;') == r['frozen'] and H.snap(page)['state'] == 'revive')
    page.keyboard.press('Enter')
    page.keyboard.press('Escape')
    page.keyboard.press('Space')
    check('keyboard (Enter / Esc / Space) does nothing on the offer', H.snap(page)['state'] == 'revive' and js(page, G + 'return g.revive.used;') == 0)

    page.click('#btn-revive-crowns')
    r = js(page, G + """
      const s = g.snapshot(); const clearTo = g.distance + 3.5 * 15;
      return {s, ahead: g.obstacles.filter((o) => (o.rowS ?? o.s) < clearTo).length, total: g.obstacles.length, offer: !document.getElementById('screen-revive').hidden,
              hud: !document.getElementById('hud').hidden, lane: g.player.lane, grounded: g.player.grounded, caught: g.caught};
    """)
    s = r['s']
    check('paying with crowns: the run continues, the crowns are taken once', s['state'] == 'playing' and s['wallet']['crowns'] == 20 - cfg['costs'][0] and s['revivesUsed'] == 1 and not r['offer'] and r['hud'], str(s['wallet']))
    check('after the revive: the bear is gone and the player is protected for a few seconds', s['bear'] == 'none' and s['protected'] and abs(s['reviveGrace'] - cfg['invulnerable']) < 0.2 and not r['caught'] and r['grounded'], str(s))
    check('after the revive: the track in front is cleared (obstacles far ahead stay)', r['ahead'] == 0 and r['total'] == 1, str(r))

    r = js(page, G + """
      g.spawnDebug('rock', g.player.lane, 6); g.stepSim(1.0, 1/60);
      const during = g.bear.phase;
      g.stepSim(2.6, 1/60);                       // 3.6 s after the revive: protection over
      const prot = g.invulnerable;
      g.spawnDebug('rock', g.player.lane, 8); g.stepSim(1.2, 1/60);
      return {during, prot, after: g.bear.phase, rem: g.bear.remaining, state: g.state};
    """)
    check('invulnerable right after the revive: an obstacle does not hit', r['during'] == 'none', str(r))
    check('then the bear rule starts fresh: first hit = 5 s chase, not game over', not r['prot'] and r['after'] == 'chasing' and r['rem'] > 3.5 and r['state'] == 'playing', str(r))

    # price grows, limit of 3
    seq = js(page, G + """
      const out = [];
      for (let k = 0; k < 4; k++) {
        const st = window.__die();
        out.push({st, cost: g.revive.cost, used: g.revive.used, wallet: g.meta.wallet.crowns, btn: document.getElementById('btn-revive-crowns').textContent});
        if (st !== 'revive') break;
        g.reviveWithCrowns();
        g.stepSim(4, 1/60);
      }
      return out;
    """)
    costs = [x['cost'] for x in seq if x['st'] == 'revive']
    check('the price grows with every revive of the same run (2 -> 4 -> 8 crowns)', costs == cfg['costs'][1:], str(seq))
    check('limit: after 3 revives the next catch is game over, no offer', seq[-1]['st'] == 'gameover' and seq[-1]['used'] == 3 and not page.is_visible('#screen-revive') and page.is_visible('#screen-over'), str(seq[-1]))
    w = js(page, 'return {...window.__meta.wallet, revives: window.__meta.state.stats.revives};')
    check('exactly 2 + 4 + 8 crowns were paid in total, and the statistics counted 3 revives', w['crowns'] == 20 - sum(cfg['costs']) and w['revives'] == 3, str(w))

    # a new run starts with a fresh price and limit
    r = js(page, SETUP + 'const st = window.__die(); return {st, cost: g.revive.cost, used: g.revive.used};')
    check('a new run starts again at the first price', r['st'] == 'revive' and r['cost'] == cfg['costs'][0] and r['used'] == 0, str(r))

    # not enough crowns
    r = js(page, G + """
      g.meta.wallet.crowns = 1; g.ui.showRevive(g.reviveInfo());
      const disabled = document.getElementById('btn-revive-crowns').disabled;
      const ok = g.reviveWithCrowns();
      return {disabled, ok, state: g.state, crowns: g.meta.wallet.crowns, msg: document.getElementById('revive-msg').textContent, walletText: document.getElementById('revive-wallet').textContent};
    """)
    check('not enough crowns: the button is disabled, nothing is taken, the run does not continue', r['disabled'] and r['ok'] is False and r['state'] == 'revive' and r['crowns'] == 1 and 'Coroane' in r['msg'], str(r))

    # decline
    page.click('#btn-revive-no')
    check('"Nu, mulțumesc" ends the run: game over screen', H.snap(page)['state'] == 'gameover' and page.is_visible('#screen-over') and not page.is_visible('#screen-revive'))
    r = js(page, G + 'return {a: g.declineRevive(), b: g.reviveWithCrowns(), c: g.reviveWithAd(), state: g.state};')
    check('after the run is over no revive action works any more', r == {'a': False, 'b': False, 'c': False, 'state': 'gameover'}, str(r))

    # --- ad
    js(page, SETUP + 'window.__die();')
    page.click('#btn-revive-ad')
    time.sleep(0.5)
    r = js(page, """const e = (id) => document.getElementById(id);
      return {ad: !e('ad-overlay').hidden, buttons: e('ad-overlay').querySelectorAll('button, a, [role=button]').length, text: e('ad-overlay').textContent,
              busy: e('btn-revive-crowns').disabled && e('btn-revive-no').disabled && e('btn-revive-ad').disabled, state: window.__game.state, session: window.__game.revive.state};""")
    check('watch an ad: the (mock) ad screen opens and says clearly that it is a simulation', r['ad'] and 'simulare' in r['text'] and r['state'] == 'revive' and r['session'] == 'ad', str(r)[:200])
    check('the ad cannot be skipped: it has no button at all, and the offer buttons are locked meanwhile', r['buttons'] == 0 and r['busy'], str(r)[:200])
    for key in ['Escape', 'Enter', 'Space', 'Backspace']:
        page.keyboard.press(key)
    page.mouse.click(640, 360)
    time.sleep(0.6)
    check('keys and clicks during the ad do not close it or give the reward early', page.is_visible('#ad-overlay') and H.snap(page)['state'] == 'revive')
    page.wait_for_function("window.__game.state === 'playing'", timeout=25000)
    r = js(page, G + 'return {used: g.revive.used, ads: g.revive.adsUsed, grace: g.reviveGrace, ad: !document.getElementById("ad-overlay").hidden, crowns: g.meta.wallet.crowns, bear: g.bear.phase};')
    check('the ad was watched to the end -> revived for free (no crowns taken)', r['used'] == 1 and r['ads'] == 1 and not r['ad'] and r['grace'] > 2 and r['bear'] == 'none', str(r))

    # ads per run are limited
    r = js(page, G + """
      g.meta.bank({crowns: 50});
      window.__die(); const second = !document.getElementById('btn-revive-ad').hidden;
      g.revive.adFinished(g.revive.startAd(), true); g.doRevive(); g.stepSim(4, 1/60);
      window.__die();
      return {second, thirdAdHidden: document.getElementById('btn-revive-ad').hidden, startAd: g.reviveWithAd(), state: g.state, cost: g.revive.cost, payEnabled: !document.getElementById('btn-revive-crowns').disabled};
    """)
    check('at most 2 revives of a run can be paid with an ad; the third one only with crowns (at the third price)', r['second'] and r['thirdAdHidden'] and r['startAd'] is False and r['state'] == 'revive' and r['cost'] == cfg['costs'][2] and r['payEnabled'], str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_revive_edge_cases(browser):
    print('\n[R2] Revive edge cases: double taps, background tab, restart / menu during the ad, offline, app closed')
    check = H.check
    page = H.new_page(browser)
    page.evaluate(DIE_JS)
    js(page, 'window.__meta.bank({crowns: 40});')

    # double tap / double click on "pay"
    js(page, SETUP + 'window.__die();')
    page.dblclick('#btn-revive-crowns')
    r = js(page, G + 'return {used: g.revive.used, crowns: g.meta.wallet.crowns, state: g.state};')
    check('double click on "Plătește": paid once, revived once', r == {'used': 1, 'crowns': 38, 'state': 'playing'}, str(r))
    r = js(page, SETUP + """window.__die();
      const a = g.reviveWithCrowns(), b = g.reviveWithCrowns(), c = g.reviveWithAd(), d = g.declineRevive();
      return {a, b, c, d, used: g.revive.used, crowns: g.meta.wallet.crowns, state: g.state};""")
    check('the same actions called twice in the same instant: only the first one counts', r == {'a': True, 'b': False, 'c': False, 'd': False, 'used': 1, 'crowns': 36, 'state': 'playing'}, str(r))

    # double tap on "watch ad": one ad
    js(page, SETUP + 'window.__die();')
    page.dblclick('#btn-revive-ad')
    r = js(page, G + 'const a = g.reviveWithAd(); return {again: a, token: g.revive.token, state: g.revive.state, busy: window.__ads.isAvailable()};')
    check('double click on "Vezi o reclamă": one ad starts, a second one is refused', r['again'] is False and r['state'] == 'ad' and r['busy'] == {'ok': False, 'reason': 'busy'}, str(r))

    # tab goes to the background during the ad: the countdown stands still
    js(page, """window.__hidden = true;
      Object.defineProperty(document, 'hidden', {get: () => window.__hidden, configurable: true});
      document.dispatchEvent(new Event('visibilitychange'));""")
    time.sleep(0.6)
    a = js(page, 'return {w: window.__ads.active?.session.watched ?? -1, state: window.__game.state, text: document.getElementById("ad-count").textContent};')
    time.sleep(7)
    b2 = js(page, 'return {w: window.__ads.active?.session.watched ?? -1, state: window.__game.state, ad: !document.getElementById("ad-overlay").hidden};')
    check('tab in the background during the ad: the countdown stops (7 s later still not finished, no reward)', b2['state'] == 'revive' and b2['ad'] and b2['w'] >= 0 and b2['w'] - a['w'] < 0.3 and 'Pauză' in a['text'], f'{a} -> {b2}')
    js(page, "window.__hidden = false; document.dispatchEvent(new Event('visibilitychange'));")
    page.wait_for_function("window.__game.state === 'playing'", timeout=25000)
    check('back in the foreground the ad finishes and only then gives the revive', js(page, G + 'return g.revive.used;') == 1)

    # restart in the middle of the ad
    js(page, SETUP + 'g.coinsCollected = 11; window.__die();')
    coins_before = js(page, 'return window.__meta.wallet.coins;')
    page.click('#btn-revive-ad')
    time.sleep(1.0)
    js(page, G + 'g.startRun(); g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;')
    r1 = js(page, G + 'return {state: g.state, ad: !document.getElementById("ad-overlay").hidden, offer: !document.getElementById("screen-revive").hidden, used: g.revive.used, session: g.revive.state, busy: window.__ads.active !== null, runTime: g.runTime};')
    time.sleep(6.5)  # longer than the ad would have taken
    r2 = js(page, G + 'return {state: g.state, used: g.revive.used, session: g.revive.state, grace: g.reviveGrace, ad: !document.getElementById("ad-overlay").hidden, coins: g.meta.wallet.coins, bear: g.bear.phase};')
    check('restart during the ad: the ad closes at once and a clean new run starts', r1['state'] == 'playing' and not r1['ad'] and not r1['offer'] and r1['used'] == 0 and r1['session'] == 'idle' and not r1['busy'] and r1['runTime'] < 0.5, str(r1))
    check('...and the old ad never revives or changes the new run later', r2['used'] == 0 and r2['grace'] == 0 and not r2['ad'] and r2['state'] in ('playing', 'paused'), str(r2))
    check('...and the coins of the abandoned run were kept', r2['coins'] == coins_before, f"{coins_before} -> {r2['coins']}")

    # back to the menu in the middle of the ad
    js(page, SETUP + 'window.__die();')
    page.click('#btn-revive-ad')
    time.sleep(0.6)
    js(page, G + 'g.toMenu();')
    time.sleep(6)
    r = js(page, G + 'return {state: g.state, ad: !document.getElementById("ad-overlay").hidden, offer: !document.getElementById("screen-revive").hidden, menu: !document.getElementById("screen-start").hidden, used: g.revive.used};')
    check('menu during the ad: ad and offer are gone, the menu stays (no surprise revive)', r == {'state': 'menu', 'ad': False, 'offer': False, 'menu': True, 'used': 0}, str(r))

    # offline
    page.context.set_offline(True)
    r = js(page, SETUP + """window.__die();
      const e = document.getElementById('btn-revive-ad');
      const res = {online: navigator.onLine, disabled: e.disabled, text: e.textContent, avail: window.__ads.isAvailable(), started: g.reviveWithAd(), state: g.state, session: g.revive.state, msg: document.getElementById('revive-msg').textContent};
      res.payWorks = g.reviveWithCrowns(); res.after = g.state;
      return res;""")
    check('offline: the ad option is disabled and explained, starting it is refused', r['online'] is False and r['disabled'] and 'offline' in r['text'] and r['avail'] == {'ok': False, 'reason': 'offline'} and r['started'] is False and r['session'] == 'offered' and 'internet' in r['msg'], str(r))
    check('offline: paying with crowns still works (the game itself runs offline)', r['payWorks'] is True and r['after'] == 'playing', str(r))
    # going offline while the ad is already playing does not break anything
    page.context.set_offline(False)
    js(page, SETUP + 'window.__die();')
    page.click('#btn-revive-ad')
    time.sleep(0.5)
    page.context.set_offline(True)
    page.wait_for_function("window.__game.state === 'playing'", timeout=25000)
    check('connection lost in the middle of the (already loaded) ad: it still finishes and revives', js(page, G + 'return g.revive.used;') == 1)
    page.context.set_offline(False)

    # the app is closed in the middle of the ad
    js(page, SETUP + 'g.coinsCollected = 23; g.crownsCollected = 1; window.__die();')
    before = js(page, 'return {...window.__meta.wallet};')
    page.click('#btn-revive-ad')
    time.sleep(0.8)
    page.reload()
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    time.sleep(0.5)
    r = js(page, G + 'return {state: g.state, wallet: {...g.meta.wallet}, ad: !document.getElementById("ad-overlay").hidden, offer: !document.getElementById("screen-revive").hidden, used: g.revive.used};')
    check('app closed during the ad: next start is a normal menu, no ad, no half-finished revive', r['state'] == 'menu' and not r['ad'] and not r['offer'] and r['used'] == 0, str(r))
    check('...and the coins and crowns of that run are in the wallet', r['wallet'] == before and before['coins'] >= 23, f"{before} -> {r['wallet']}")
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_meta_screens(browser):
    print('\n[E] Economy screens through the real buttons: missions, battle pass, wardrobe')
    check = H.check
    page = H.new_page(browser)
    cfg = js(page, G + 'return {m: g.cfg.missions, p: g.cfg.pass};')
    check('menu shows the wallet with both currencies at 0 and no badges', page.inner_text('#screen-start [data-wallet=coins]') == '0' and page.inner_text('#screen-start [data-wallet=crowns]') == '0' and not page.is_visible('#badge-missions') and not page.is_visible('#badge-pass'))
    check('no payment form or real-money price anywhere in the page', js(page, """const t = document.body.innerHTML.toLowerCase();
        return !document.querySelector('input[type=number], input[name*=card], form[action], iframe') && !/(\\beur\\b|€|\\$\\d|\\blei\\b|\\bron\\b|card bancar|paypal|checkout)/.test(t);"""))

    # a big run through the real game over path, so missions are complete
    js(page, 'window.__die = null;')
    page.evaluate(DIE_JS)
    js(page, SETUP + """g.reviveEnabled = false;
      Object.assign(g.stats, {jumps: 500, slides: 500, laneChanges: 500, powers: 50, escapes: 50, portals: 9});
      g.coinsCollected = 2000; g.distance = 30000; g.cleanT = 999;
      window.__die(); g.toMenu();""")
    b = js(page, 'return {b: window.__meta.badges(), w: {...window.__meta.wallet}, text: document.getElementById("badge-missions").textContent};')
    check('after a run the coins are in the wallet and the Misiuni button shows a badge', b['w']['coins'] == 2000 and b['b']['missions'] >= 3 and b['text'] == str(b['b']['missions']) and page.is_visible('#badge-missions'), str(b))

    page.click('#btn-missions')
    check('Misiuni opens with 3 daily missions and three tabs (Zilnice / Săptămânale / Pe cursă)', page.is_visible('#screen-missions') and not page.is_visible('#screen-start') and len(page.query_selector_all('#missions-list .mission')) == 3 and [t.inner_text() for t in page.query_selector_all('#mission-tabs .tab')] == ['Zilnice', 'Săptămânale', 'Pe cursă'])
    page.keyboard.press('Enter')
    check('Enter on a sub-screen does not start a run', H.snap(page)['state'] == 'menu')
    w0 = js(page, 'return {...window.__meta.wallet, xp: window.__meta.pass.xp};')
    page.dblclick('#missions-list .mission button[data-claim]')
    w1 = js(page, 'return {...window.__meta.wallet, xp: window.__meta.pass.xp};')
    check('claiming a mission (double click!) gives its coins and XP exactly once', w1['coins'] - w0['coins'] == cfg['m']['reward']['daily']['coins'] and w1['xp'] - w0['xp'] == cfg['m']['reward']['daily']['xp'], f'{w0} -> {w1}')
    check('the wallet on screen follows', page.inner_text('#screen-missions [data-wallet=coins]') == str(w1['coins']))
    check('the daily bonus is locked until all three are claimed', page.is_disabled('#btn-daily-bonus'))
    for _ in range(2):
        page.click('#missions-list .mission button[data-claim]:not([disabled])')
    page.dblclick('#btn-daily-bonus')
    w2 = js(page, 'return {...window.__meta.wallet};')
    check('all three claimed -> the bonus gives 1 crown, once', w2['crowns'] == cfg['m']['reward']['dailyBonus']['crowns'] and page.is_disabled('#btn-daily-bonus'), str(w2))
    page.click('#mission-tabs .tab >> nth=1')
    n_week = len(page.query_selector_all('#missions-list .mission'))
    page.click('#mission-tabs .tab >> nth=2')
    run_texts = [e.inner_text() for e in page.query_selector_all('#missions-list .mission-text')]
    check('weekly and "one run" tabs list 3 missions each, e.g. "Sari de 20 de ori într-o cursă"', n_week == 3 and len(run_texts) == 3 and 'Sari de 20 de ori într-o cursă' in run_texts, str(run_texts))
    page.click('#missions-list .mission button[data-claim]:not([disabled])')
    run_texts2 = [e.inner_text() for e in page.query_selector_all('#missions-list .mission-text')]
    check('a claimed "one run" mission is replaced by a new one', len(run_texts2) == 3 and run_texts2 != run_texts, str(run_texts2))
    page.click('#screen-missions [data-back]')
    check('Înapoi returns to the menu', page.is_visible('#screen-start') and not page.is_visible('#screen-missions'))

    # battle pass
    page.click('#btn-pass')
    info = js(page, 'return window.__meta.passInfo();')
    rows = len(page.query_selector_all('#pass-list .pass-row'))
    check(f"Pass opens: {cfg['p']['tiers']} tiers with a free and a premium reward each, season name, days left", rows == cfg['p']['tiers'] and len(page.query_selector_all('#pass-list .cell')) == rows * 2 and 'Sezonul' in page.inner_text('#pass-season') and 'zile' in page.inner_text('#pass-days') or 'zi' in page.inner_text('#pass-days'), page.inner_text('#pass-days'))
    check('days left on screen match the season calendar (1..42)', 1 <= info['daysLeft'] <= cfg['p']['seasonDays'] and str(info['daysLeft']) in page.inner_text('#pass-days'), str(info))
    check('XP from the run and the missions moved the pass forward', info['tier'] >= 1 and len(page.query_selector_all('#pass-list button.cell.can')) == info['tier'], str(info))
    check('premium rewards are locked and the premium button is disabled without enough crowns', len(page.query_selector_all('#pass-list .cell.premium.locked')) == rows and page.is_disabled('#btn-pass-premium') and str(cfg['p']['premiumCost']) in page.inner_text('#btn-pass-premium'))
    w0 = js(page, 'return {...window.__meta.wallet};')
    first = js(page, 'return document.querySelector("#pass-list button.cell.can .cell-reward").textContent;')
    page.dblclick('#pass-list button.cell.can')
    w1 = js(page, 'return {...window.__meta.wallet, claimed: window.__meta.pass.claimed.free.slice()};')
    check('claiming a tier (double click) gives its reward once', w1['claimed'] == [1] and w1['coins'] - w0['coins'] == int(first.split()[0]), f'{first}: {w0} -> {w1}')
    js(page, 'window.__meta.bank({crowns: 200}); window.__meta.pass.xp = 120 * 12; window.__meta.store.save(); window.__screens.refresh();')
    crowns0 = js(page, 'return window.__meta.wallet.crowns;')
    page.dblclick('#btn-pass-premium')
    p = js(page, 'return {premium: window.__meta.pass.premium, crowns: window.__meta.wallet.crowns};')
    check('buying the premium track (double click): crowns taken once, premium rewards unlock', p['premium'] and crowns0 - p['crowns'] == cfg['p']['premiumCost'] and not page.is_visible('#btn-pass-premium') and len(page.query_selector_all('#pass-list .cell.premium.locked')) == 0, str(p))
    n_can = len(page.query_selector_all('#pass-list button.cell.can'))
    page.dblclick('#btn-pass-claim-all')
    after = js(page, 'return {free: window.__meta.pass.claimed.free.length, premium: window.__meta.pass.claimed.premium.length, owned: window.__meta.cosmetics.owned, badge: window.__meta.badges().pass};')
    # v2.1: the pass gives only two skins (last tiers), so 12 tiers bring emoji but no skin yet
    check('"Revendică tot" claims every unlocked reward of both tracks once (the emoji of tiers 8 and 10 included, no skin yet)', n_can == 23 and after['free'] == 12 and after['premium'] == 12 and after['badge'] == 0 and after['owned']['boy'] == ['clasic'] and after['owned']['bear'] == ['brun'] and 'urs' in after['owned']['emoji'] and 'cool' in after['owned']['emoji'] and page.is_disabled('#btn-pass-claim-all'), str(after))
    page.click('#screen-pass [data-back]')

    # wardrobe
    page.click('#btn-wardrobe')
    time.sleep(0.4)
    r = js(page, G + 'return {preview: g.preview?.kind, cards: document.querySelectorAll("#wardrobe-list .card").length, tabs: [...document.querySelectorAll("#wardrobe-tabs .tab")].map(t => t.dataset.kind), skin: g.playerView.skinId};')
    check('Garderobă opens with a 3D preview of the boy and 4 tabs (boy, bear, trail, emoji)', page.is_visible('#screen-wardrobe') and r['preview'] == 'boy' and r['cards'] == 6 and r['tabs'] == ['boy', 'bear', 'trail', 'emoji'], str(r))
    page.click('#wardrobe-list [data-item=mascota]')
    r = js(page, G + 'return {shown: g.playerView.skinId, equipped: g.meta.cosmetics.equipped.boy, btn: document.getElementById("btn-wardrobe-action").textContent, disabled: document.getElementById("btn-wardrobe-action").disabled};')
    check('selecting a skin you do not own previews it on the model without equipping it, with its price', r['shown'] == 'mascota' and r['equipped'] == 'clasic' and '60' in r['btn'], str(r))
    rides = []
    for ride in ['snowboard', 'skate', 'bike', 'boat']:
        page.click(f'#wardrobe-rides [data-ride={ride}]')
        time.sleep(0.15)
        rides.append(js(page, G + 'g.render(1/60); return [g.playerView.ride, g.playerView.skinId, g.world.biomeId];'))
    check('the preview shows the skin on all 4 rides (with the matching level behind)', [x[0] for x in rides] == ['snowboard', 'skate', 'bike', 'boat'] and all(x[1] == 'mascota' for x in rides) and rides[3][2] == 'noua', str(rides))
    w0 = js(page, 'return {...window.__meta.wallet};')
    page.dblclick('#btn-wardrobe-action')
    r = js(page, G + 'return {wallet: {...g.meta.wallet}, owned: g.meta.cosmetics.owned.boy.includes("mascota"), equipped: g.meta.cosmetics.equipped.boy, shown: g.playerView.skinId};')
    check('buying a skin with crowns (double click): paid once, owned and equipped', w0['crowns'] - r['wallet']['crowns'] == 60 and r['owned'] and r['equipped'] == 'mascota' and r['shown'] == 'mascota', f'{w0} -> {r}')
    page.click('#wardrobe-list [data-item=stegar]')
    r = js(page, G + 'return {btn: document.getElementById("btn-wardrobe-action").textContent, disabled: document.getElementById("btn-wardrobe-action").disabled, coins: g.meta.wallet.coins};')
    affordable = r['coins'] >= 3000
    check('a skin that costs coins shows its price; the button is enabled only if you can afford it', '3000' in r['btn'] and r['disabled'] == (not affordable), str(r))
    page.click('#wardrobe-tabs [data-kind=bear]')
    time.sleep(0.3)
    modes = []
    page.click('#wardrobe-list [data-item=racadau]')
    for mode in ['run', 'swim', 'unicycle', 'hydro']:
        page.click(f'#wardrobe-rides [data-ride={mode}]')
        time.sleep(0.15)
        modes.append(js(page, G + 'g.render(1/60); return [g.bearView.mode, g.bearView.skinId, g.bearView.root.visible, g.playerView.root.visible, g.preview.kind];'))
    check('bear tab: the preview shows the bear skin in all 4 modes (run, swim, unicycle, water unicycle)', [m[0] for m in modes] == ['run', 'swim', 'unicycle', 'hydro'] and all(m[1] == 'racadau' and m[2] and not m[3] and m[4] == 'bear' for m in modes), str(modes))
    page.click('#wardrobe-tabs [data-kind=trail]')
    page.click('#wardrobe-list [data-item=tricolor]')
    t_prev = js(page, G + 'return [g.trailId, g.meta.cosmetics.equipped.trail];')
    page.click('#wardrobe-tabs [data-kind=emoji]')
    page.click('#screen-wardrobe [data-back]')
    r = js(page, G + 'g.render(1/60); return {preview: g.preview, skin: g.playerView.skinId, bear: g.bearView.skinId, trail: g.trailId, ride: g.playerView.ride, biome: g.world.biomeId, bearShown: g.bearView.root.visible, boyShown: g.playerView.root.visible, state: g.state};')
    check('previewed-but-not-bought items are NOT kept: leaving the wardrobe shows what is really equipped', t_prev == ['tricolor', 'none'] and r['preview'] is None and r['skin'] == 'mascota' and r['bear'] == 'brun' and r['trail'] == 'none' and r['ride'] == 'snowboard' and r['biome'] == 'partie' and not r['bearShown'] and r['boyShown'], str(r))

    # persistence
    saved = js(page, 'return JSON.stringify(window.__meta.state);')
    page.reload()
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    time.sleep(0.4)
    again = js(page, 'return JSON.stringify(window.__meta.state);')
    r = js(page, G + 'return {skin: g.playerView.skinId, coins: document.querySelector("#screen-start [data-wallet=coins]").textContent, real: g.meta.wallet.coins, keys: Object.keys(localStorage).sort()};')
    check('everything survives a reload: wallet, missions, pass, owned and equipped skins', saved == again and r['skin'] == 'mascota' and r['coins'] == str(r['real']), str(r))
    check('all of it lives in one save document (+ its backup) in localStorage', set(r['keys']) <= {'brasovRunner.save', 'brasovRunner.save.bak'} and 'brasovRunner.save' in r['keys'], str(r['keys']))
    # the equipped skin and emoji in a real run
    js(page, 'window.__meta.bank({coins: 300}); window.__meta.buy("emoji", "urs"); window.__meta.equip("emoji", "urs"); window.__game.applyCosmetics();')
    page.click('#btn-play')
    page.keyboard.press('e')
    time.sleep(0.2)
    r = js(page, G + 'return {skin: g.playerView.skinId, emote: !document.getElementById("emote").hidden && document.getElementById("emote").textContent, btn: !document.getElementById("btn-emote").hidden};')
    check('in the run: the equipped skin is worn and E (or the HUD button) shows the equipped emoji', r['skin'] == 'mascota' and r['emote'] == '🐻' and r['btn'], str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_pass_animated(browser):
    print('\n[N] v2.1 battle pass: two skins per season, showcase, animations')
    check = H.check
    page = H.new_page(browser, 390, 844, mobile=True)
    tiers = js(page, G + 'return g.cfg.pass.tiers;')
    js(page, 'window.__meta.bank({crowns: 200}); window.__meta.pass.xp = 120 * 5 + 30; window.__meta.store.save(); window.__screens.refresh();')
    page.click('#btn-pass')
    r = js(page, """const cells = [...document.querySelectorAll('#pass-list .cell.big')].map((c) => [c.dataset.tier, c.dataset.track, c.querySelector('.cell-reward').textContent]);
      const feats = [...document.querySelectorAll('#pass-featured .feat')].map((f) => [f.dataset.feat, f.querySelector('.feat-name').textContent, f.querySelector('.feat-state').textContent]);
      const top = document.querySelector('.pass-top').getBoundingClientRect(), fill = document.getElementById('pass-fill').getBoundingClientRect(), btn = document.getElementById('btn-pass-premium').getBoundingClientRect();
      return {cells, feats, intro: document.getElementById('screen-pass').classList.contains('intro'), topH: top.height, fillVisible: fill.height > 4 && fill.bottom <= top.bottom + 1, btnVisible: btn.height > 20 && btn.bottom <= top.bottom + 1,
              anim: getComputedStyle(document.querySelector('#pass-list button.cell.can')).animationName, rowAnim: getComputedStyle(document.querySelector('#pass-list .pass-row')).animationName, bg: getComputedStyle(document.querySelector('.pass-top')).animationName};""")
    check('the pass has only TWO skins: the skier on the last free tier and one bear skin on the last premium tier', r['cells'] == [[str(tiers), 'free', 'Schior din Poiana'], [str(tiers), 'premium', 'Ursul de Crăciun']], str(r['cells']))
    check('both are shown at the top of the screen with how far away they are', [f[:2] for f in r['feats']] == [['free', 'Schior din Poiana'], ['premium', 'Ursul de Crăciun']] and str(tiers) in r['feats'][0][2] and 'Premium' in r['feats'][1][2], str(r['feats']))
    check('the header is complete on a phone (season, XP bar and buttons are not cut off)', r['fillVisible'] and r['btnVisible'], str(r))
    check('the screen is animated: rows slide in when it opens, claimable rewards pulse, the header moves', r['intro'] and r['anim'] == 'can-pulse' and r['rowAnim'] == 'row-in' and r['bg'] == 'pass-bg', str(r))
    page.click('#pass-featured [data-feat=free]')
    # the scroll is smooth: wait until the list stops moving (a fixed pause was too short on a slow machine)
    page.wait_for_function("""(() => { const l = document.getElementById('pass-list'); const now = l.scrollTop; const same = window.__lastScroll === now; window.__lastScroll = now; return same && now > 0; })()""", timeout=8000, polling=250)
    vis = js(page, f"""const row = document.querySelector('#pass-list .pass-row[data-tier="{tiers}"]').getBoundingClientRect(), list = document.getElementById('pass-list').getBoundingClientRect();
      return row.top >= list.top - 2 && row.bottom <= list.bottom + 2;""")
    check('tapping a showcase card scrolls to its tier', vis)
    js(page, "document.querySelector('#pass-list .cell.can').scrollIntoView({block: 'center'});")
    coins0 = js(page, 'return window.__meta.wallet.coins;')
    page.dblclick('#pass-list button.cell.can')
    a = js(page, "return {confetti: document.querySelectorAll('#fx .confetti').length, pop: document.querySelectorAll('#pass-list .cell.pop').length, bump: document.querySelectorAll('#screen-pass .chip.bump').length, coins: window.__meta.wallet.coins, claimed: window.__meta.pass.claimed.free.length};")
    check('claiming a tier: confetti, the cell pops, the wallet chip bumps (and still exactly one claim on a double tap)', a['confetti'] == 16 and a['pop'] == 1 and a['bump'] == 1 and a['claimed'] == 1 and a['coins'] - coins0 == 100, str(a))
    # (it is removed by a 0.9 s timer; on a loaded machine timers run late, so wait for it instead of a fixed pause)
    try:
        page.wait_for_function("document.querySelectorAll('#fx *').length === 0", timeout=6000)
    except Exception:
        pass
    check('the confetti cleans up after itself (no DOM left behind)', js(page, "return document.querySelectorAll('#fx *').length;") == 0)
    page.click('#btn-pass-premium')
    time.sleep(0.4)
    page.click('#btn-pass-claim-all')
    a = js(page, "return {pop: document.querySelectorAll('#pass-list .cell.pop').length, left: window.__meta.badges().pass, confetti: document.querySelectorAll('#fx .confetti').length};")
    check('"Revendică tot": every tier that was just claimed pops, with confetti', a['pop'] == 4 + 5 and a['left'] == 0 and a['confetti'] == 16, str(a))
    # the last tiers really hand out the two skins
    js(page, f'window.__meta.pass.xp = 120 * {tiers}; window.__meta.store.save(); window.__screens.refresh();')
    time.sleep(0.4)
    page.click('#btn-pass-claim-all')
    o = js(page, 'return window.__meta.cosmetics.owned;')
    check('finishing the pass gives exactly those two skins', o['boy'] == ['clasic', 'schior'] and o['bear'] == ['brun', 'craciun'], str(o))
    reduced = browser.new_context(viewport={'width': 390, 'height': 844}, reduced_motion='reduce')
    p2 = reduced.new_page()
    p2.goto(H.BASE + '/?debug&noauth')
    p2.wait_for_function('window.__game !== undefined', timeout=60000)
    p2.evaluate("() => { window.__meta.pass.xp = 300; window.__screens.show('pass'); }")
    r = p2.evaluate("() => ({cell: getComputedStyle(document.querySelector('#pass-list button.cell.can')).animationName, bg: getComputedStyle(document.querySelector('.pass-top')).animationName})")
    check('"reduce motion" setting of the device switches the animations off', r == {'cell': 'none', 'bg': 'none'}, str(r))
    reduced.close()
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def open_page(browser, query, w=390, h=844, init_storage=None, offline=False):
    ctx = browser.new_context(viewport={'width': w, 'height': h})
    page = ctx.new_page()
    page.errors = []
    page.on('pageerror', lambda e: page.errors.append(str(e)))
    page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
    if init_storage:
        page.add_init_script('(() => { const d = ' + json.dumps(init_storage) + '; for (const k in d) if (localStorage.getItem(k) === null) localStorage.setItem(k, d[k]); })();')
    page.goto(H.BASE + '/' + query)
    page.wait_for_function('window.__account !== undefined', timeout=60000)
    time.sleep(0.6)
    return page


def test_accounts(browser):
    print('\n[A] v2.1 accounts: Google / Apple / guest, progress saved in the account')
    check = H.check

    # --- with ?noauth the game has no sign-in: guest only, exactly like before
    page = open_page(browser, '?debug&noauth')
    r = js(page, "return {available: window.__account.available, chip: !document.getElementById('btn-account').hidden, login: !document.getElementById('screen-login').hidden, menu: !document.getElementById('screen-start').hidden, profile: window.__store.profile};")
    check('?noauth (no sign-in): no login screen, no account button, everybody is a guest', r == {'available': False, 'chip': False, 'login': False, 'menu': True, 'profile': 'guest'}, str(r))
    check('...and nothing was requested from any sign-in or cloud server', not page.errors)
    page.context.close()

    # --- first start with sign-in available (the demo / test service)
    page = open_page(browser, '?debug&mockauth')
    page.evaluate(DIE_JS)
    r = js(page, "return {login: !document.getElementById('screen-login').hidden, menu: !document.getElementById('screen-start').hidden, buttons: [...document.querySelectorAll('#login-buttons button')].map((b) => b.textContent), guest: !document.getElementById('btn-login-guest').hidden, back: !document.getElementById('btn-login-back').hidden, title: document.getElementById('login-title').textContent};")
    check('first start: a welcome screen with "Continuă cu Google" and "Joacă ca invitat" (no Apple: it is not free)', r['login'] and not r['menu'] and len(r['buttons']) == 1 and 'Google' in r['buttons'][0] and r['guest'] and not r['back'], str(r))
    page.keyboard.press('Enter')
    check('Enter on the welcome screen does not start a run behind it', H.snap(page)['state'] == 'menu')
    page.click('#btn-login-guest')
    r = js(page, "return {login: !document.getElementById('screen-login').hidden, menu: !document.getElementById('screen-start').hidden, chip: document.getElementById('account-chip-text').textContent, profile: window.__store.profile};")
    check('"Joacă ca invitat": straight to the menu, the account button says "Invitat"', not r['login'] and r['menu'] and 'Invitat' in r['chip'] and r['profile'] == 'guest', str(r))

    # play as a guest, then sign in: the progress is carried into the account
    js(page, SETUP + 'g.reviveEnabled = false; g.coinsCollected = 64; g.distance = 3000; window.__die(); g.submitName("Nutu"); g.toMenu();')
    js(page, 'window.__meta.bank({coins: 1500}); window.__meta.buy("boy", "schior"); window.__meta.equip("boy", "schior"); window.__game.applyCosmetics(); window.__screens.refresh();')
    guest = js(page, 'return JSON.stringify([window.__meta.wallet, window.__meta.cosmetics, window.__meta.state.leaderboard.map((e) => e.name), window.__meta.state.stats.runs]);')
    page.click('#btn-account')
    r = js(page, "return {login: !document.getElementById('screen-login').hidden, back: !document.getElementById('btn-login-back').hidden, guest: !document.getElementById('btn-login-guest').hidden};")
    check('the account button opens the sign-in screen (with a way back)', r == {'login': True, 'back': True, 'guest': False}, str(r))
    page.dblclick('#login-buttons [data-provider=google]')
    page.wait_for_function("window.__account.user && window.__account.status === 'synced'", timeout=15000)
    page.wait_for_function("window.__scoreboard.myRank > 0", timeout=15000)  # v3.1: the menu shows the shared leaderboard
    time.sleep(0.3)
    r = js(page, """const cloud = JSON.parse(localStorage.getItem('brasovRunner.save.x.mockCloud')).saves;
      return {user: window.__account.user, profile: window.__store.profile, same: JSON.stringify([window.__meta.wallet, window.__meta.cosmetics, window.__meta.state.leaderboard.map((e) => e.name), window.__meta.state.stats.runs]),
              chip: document.getElementById('account-chip-text').textContent, menu: !document.getElementById('screen-start').hidden, toast: document.getElementById('toasts').textContent,
              cloudCoins: cloud['mock-google']?.wallet.coins, accounts: Object.keys(cloud), skin: window.__game.playerView.skinId, shown: document.querySelector('#screen-start [data-wallet=coins]').textContent, board: [...document.querySelectorAll('#board-start .name')].map((e) => e.textContent)};""")
    check('sign in with Google (double tap = one sign-in): signed in, back on the menu, the name on the account button', r['user']['provider'] == 'google' and r['profile'] == 'u.mock-google' and r['menu'] and 'Google' in r['chip'] and 'Bine ai venit' in r['toast'], str(r)[:300])
    check('the guest progress was carried into the account: wallet, skins, Top 10, statistics', r['same'] == guest and r['skin'] == 'schior' and r['shown'] == '64' and r['board'] == ['Cont de test (Google'] and 'salvat în cont' in r['toast'], str(r)[:400])
    check('...and uploaded to the account', r['cloudCoins'] == 64 and r['accounts'] == ['mock-google'], str(r)[:300])

    # progress made while signed in reaches the account by itself
    js(page, SETUP + 'g.reviveEnabled = false; g.coinsCollected = 36; window.__die(); g.toMenu();')
    page.wait_for_function("JSON.parse(localStorage.getItem('brasovRunner.save.x.mockCloud')).saves['mock-google'].wallet.coins === 100", timeout=15000)
    check('a run played while signed in is saved to the account a moment later', js(page, 'return window.__account.status;') == 'synced')

    # reload: still signed in, same progress
    page.reload()
    page.wait_for_function('window.__account !== undefined && window.__account.user', timeout=60000)
    time.sleep(0.5)
    r = js(page, "return {user: window.__account.user.uid, coins: window.__meta.wallet.coins, skin: window.__game.playerView.skinId, login: !document.getElementById('screen-login').hidden, chip: document.getElementById('account-chip-text').textContent};")
    check('closing and reopening the game: still signed in, same progress, no welcome screen again', r['user'] == 'mock-google' and r['coins'] == 100 and r['skin'] == 'schior' and not r['login'] and 'Google' in r['chip'], str(r))

    # account panel + sign out
    page.click('#btn-account')
    r = js(page, "return {title: document.getElementById('login-title').textContent, name: document.getElementById('account-name').textContent, status: document.getElementById('account-status').textContent, buttons: document.getElementById('login-buttons').hidden, logout: !document.getElementById('btn-logout').hidden};")
    check('account panel: who is signed in, that the progress is in the account, a sign-out button', r['title'] == 'Contul tău' and 'Google' in r['name'] and 'salvat în cont' in r['status'] and r['buttons'] and r['logout'], str(r))
    page.click('#btn-logout')
    page.wait_for_function('window.__account.user === null', timeout=15000)
    time.sleep(0.3)
    r = js(page, "return {profile: window.__store.profile, coins: window.__meta.wallet.coins, chip: document.getElementById('account-chip-text').textContent, cloud: JSON.parse(localStorage.getItem('brasovRunner.save.x.mockCloud')).saves['mock-google'].wallet.coins, buttons: !document.getElementById('login-buttons').hidden};")
    check('sign out: back to the guest slot of this device (its own progress), the account keeps its copy', r['profile'] == 'guest' and r['coins'] == 64 and 'Invitat' in r['chip'] and r['cloud'] == 100 and r['buttons'], str(r))

    # signing in again brings the account's progress back (not the guest's)
    page.click('#login-buttons [data-provider=google]')
    page.wait_for_function("window.__account.user && window.__account.status === 'synced'", timeout=15000)
    r = js(page, "return {profile: window.__store.profile, coins: window.__meta.wallet.coins};")
    check('signing in again: the progress of the account is back (100 coins, not the 64 of the guest)', r == {'profile': 'u.mock-google', 'coins': 100}, str(r))

    # an account change never happens in the middle of a run
    page.click('#btn-login-back') if page.is_visible('#btn-login-back') else None
    js(page, G + 'g.startRun(); g.stepSim(1, 1/60); window.__account.auth.signOut();')
    time.sleep(0.5)
    mid = js(page, G + 'return {state: g.state, profile: window.__store.profile, user: !!window.__account.user};')
    js(page, G + 'g.toMenu();')
    page.wait_for_function('window.__account.user === null', timeout=15000)
    after = js(page, 'return window.__store.profile;')
    check('signed out (elsewhere) during a run: the run goes on in the same slot, the switch happens on the menu', mid == {'state': 'playing', 'profile': 'u.mock-google', 'user': True} and after == 'guest', f'{mid} -> {after}')

    # offline
    page.context.set_offline(True)
    page.click('#btn-account')
    page.click('#login-buttons [data-provider=google]')
    time.sleep(0.4)
    r = js(page, "return {msg: document.getElementById('login-msg').textContent, shown: !document.getElementById('login-msg').hidden, user: window.__account.user, enabled: !document.querySelector('#login-buttons button').disabled};")
    check('offline: signing in explains that there is no connection; playing as a guest still works', r['shown'] and 'internet' in r['msg'] and r['user'] is None and r['enabled'], str(r))
    page.context.set_offline(False)
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()

    # --- a second device: the account already has progress
    cloud = {'saves': {'mock-google': {'v': 2, 'wallet': {'coins': 4321, 'crowns': 12}, 'cosmetics': {'owned': {'bear': ['brun', 'racadau']}, 'equipped': {'bear': 'racadau'}}, 'sync': {'rev': 57, 'at': 1}}}}
    page = open_page(browser, '?debug&mockauth', init_storage={'brasovRunner.save.x.mockCloud': json.dumps(cloud)})
    page.click('#btn-login-guest')
    js(page, 'window.__meta.bank({coins: 9});')
    page.click('#btn-account')
    page.click('#login-buttons [data-provider=google]')
    page.wait_for_function("window.__account.user && window.__account.status === 'synced'", timeout=15000)
    time.sleep(0.3)
    r = js(page, "return {wallet: {...window.__meta.wallet}, bear: window.__game.bearView.skinId, toast: document.getElementById('toasts').textContent, guest: JSON.parse(localStorage.getItem('brasovRunner.save')).wallet.coins, shown: document.querySelector('#screen-start [data-wallet=coins]').textContent};")
    check('a second device: signing in brings the progress of the account (wallet, skins) onto it', r['wallet'] == {'coins': 4321, 'crowns': 12} and r['bear'] == 'racadau' and r['shown'] == '4321' and 'din cont a fost încărcat' in r['toast'], str(r))
    check('...and what was played as a guest on this device stays in the guest slot', r['guest'] == 9, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_skins(browser):
    print('\n[K] Skins in the real renderer: every ride / mode, GPU memory, change during a run')
    check = H.check
    page = H.new_page(browser)
    r = js(page, G + """
      const out = {boy: 0, bear: 0, bad: []};
      const boy = ['clasic', 'schior', 'salvamont', 'junii', 'stegar', 'mascota'], bears = ['brun', 'racadau', 'craciun'];
      g.startRun(); g.generationEnabled = false; g.powerupsEnabled = false;
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      for (const [i, B] of g.biomes.entries()) {
        g.applyBiome(i);
        for (const id of boy) {
          g.playerView.setSkin(id);
          for (const pose of ['ride', 'jump', 'slide', 'jet']) {
            g.powers.reset(); g.player.revive(); g.jetLanding = false;
            if (pose === 'jump') g.actions.jump(); if (pose === 'slide') g.actions.slide(); if (pose === 'jet') g.givePower('jetpack');
            g.stepSim(0.25, 1/60); g.render(1/60);
            let meshes = 0; g.playerView.root.traverse((o) => { if (o.isMesh) meshes++; });
            if (g.playerView.ride !== B.ride || g.playerView.skinId !== id || meshes < 20) out.bad.push([B.id, id, pose, g.playerView.ride, meshes]);
            out.boy++;
          }
        }
        g.powers.reset(); g.player.revive(); g.jetLanding = false;
        for (const id of bears) {
          g.bearView.setSkin(id);
          g.bear.reset(); g.bear.hit(); g.stepSim(0.8, 1/60); g.render(1/60);
          const mode = g.bearView.mode;
          if (!g.bearView.root.visible || g.bearView.skinId !== id) out.bad.push([B.id, id, mode]);
          g.stepSim(4.6, 1/60); g.render(1/60);   // leaving animation
          out.bear++;
          out['mode_' + mode] = true;
        }
      }
      out.modes = Object.keys(out).filter((k) => k.startsWith('mode_')).sort();
      g.applyCosmetics();
      return out;
    """)
    check('every boy skin renders on the ride of each of the 5 levels (snowboard, skateboard, bicycle, pedal boat) in every pose', r['boy'] == 5 * 6 * 4 and not r['bad'], str(r['bad'][:4]))
    check('every bear skin renders in each mode the levels use (run, unicycle, water unicycle), chasing and leaving', r['bear'] == 15 and r['modes'] == ['mode_hydro', 'mode_run', 'mode_unicycle'], str(r))
    r = js(page, G + """
      const out = [];
      for (const id of ['brun', 'racadau', 'craciun']) { g.bearView.setSkin(id); g.bearView.setMode('swim'); g.bearView.showcase(0, 0, 2.5, 1/60, 14); g.render(1/60); out.push([g.bearView.mode, g.bearView.root.visible]); }
      g.applyBiome(g.startBiome); g.applyCosmetics();
      return out;
    """)
    check('...and in the fourth mode (swim) too', all(m == ['swim', True] for m in r), str(r))

    # GPU memory: geometries / textures / programs must not grow when skins are swapped
    r = js(page, G + """
      const boy = ['clasic', 'schior', 'salvamont', 'junii', 'stegar', 'mascota'], bears = ['brun', 'racadau', 'craciun'];
      g.toMenu();
      const cycle = () => { for (const id of boy) { g.playerView.setSkin(id); g.render(1/60); } for (const id of bears) { g.bearView.setSkin(id); g.bear.hit(); g.render(1/60); g.bear.reset(); } };
      cycle(); cycle();
      g.playerView.setSkin('clasic'); g.bearView.setSkin('brun'); g.render(1/60);
      const m = () => ({geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, prog: g.renderer.info.programs.length});
      const before = m();
      let peak = 0;
      for (let k = 0; k < 40; k++) { cycle(); peak = Math.max(peak, g.renderer.info.memory.geometries); }
      g.playerView.setSkin('clasic'); g.bearView.setSkin('brun'); g.render(1/60);
      const after = m();
      g.playerView.setSkin('mascota'); g.render(1/60);
      const withSkin = m();
      g.applyCosmetics(); g.render(1/60);
      return {before, after, peak, withSkin};
    """)
    check('no GPU leak: after 40 rounds of all skins the geometry, texture and shader counts are exactly as before', r['before'] == r['after'], str(r))
    check('a skin really owns GPU geometries while worn (and they were freed again above)', r['withSkin']['geo'] > r['before']['geo'] and r['peak'] <= r['before']['geo'] + 40, str(r))

    # change the skin in the middle of a run (the UI does not offer it, the game must still cope)
    page.evaluate('window.__makeBot = ' + H.BOT_JS)
    r = js(page, G + """
      g.meta.cosmetics.owned.boy.push('schior', 'junii'); g.meta.cosmetics.owned.bear.push('craciun'); g.meta.cosmetics.owned.trail.push('tricolor');
      g.startRun();
      const bot = window.__makeBot(false); const seen = []; let hits = 0;
      const orig = g.onHit.bind(g); g.onHit = (o) => { hits++; orig(o); };
      const order = ['schior', 'junii', 'clasic'];
      for (let k = 0; k < 9; k++) {
        g.meta.equip('boy', order[k % 3]); g.meta.equip('bear', k % 2 ? 'craciun' : 'brun'); g.meta.equip('trail', k % 2 ? 'tricolor' : 'none');
        g.applyCosmetics();
        if (k === 4) g.givePower('jetpack');
        g.stepSim(4, 1/60, bot); g.render(1/60);
        seen.push([g.playerView.skinId, g.bearView.skinId, g.trailId, g.state]);
      }
      g.onHit = orig;
      return {seen, hits, ride: g.playerView.ride, score: g.snapshot().score};
    """)
    check('changing skin, bear skin and trail 9 times during a run: the run goes on untouched', all(s[3] == 'playing' for s in r['seen']) and r['hits'] == 0 and [s[0] for s in r['seen'][:3]] == ['schior', 'junii', 'clasic'] and r['score'] > 300, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
BLOCK_STORAGE = """(() => { const fail = () => { throw new DOMException('The operation is insecure.', 'SecurityError'); };
  Storage.prototype.getItem = fail; Storage.prototype.setItem = fail; Storage.prototype.removeItem = fail; Storage.prototype.key = fail; })();"""


def test_save_browser(browser):
    print('\n[S] Save module in the browser: blocked / full / corrupted storage, update from v1, two tabs')
    check = H.check

    # --- storage completely blocked
    ctx = browser.new_context(viewport={'width': 1280, 'height': 720})
    page = ctx.new_page()
    page.errors = []
    page.on('pageerror', lambda e: page.errors.append(str(e)))
    page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
    page.add_init_script(BLOCK_STORAGE)
    page.goto(H.BASE + '/?debug&noauth')
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    time.sleep(0.4)
    page.evaluate(DIE_JS)
    r = js(page, 'return {mode: window.__store.status.mode, warn: document.getElementById("save-warning").textContent, shown: !document.getElementById("save-warning").hidden, menu: !document.getElementById("screen-start").hidden};')
    check('localStorage blocked: the game still starts and tells the player that progress cannot be kept', r['mode'] == 'memory' and r['menu'] and r['shown'] and 'blocată' in r['warn'], str(r))
    r = js(page, SETUP + """g.reviveEnabled = false; g.coinsCollected = 50; window.__die();
      g.submitName('Test'); g.toMenu();
      window.__meta.bank({crowns: 100}); const buy = window.__meta.buyPremiumPass();
      return {state: g.state, coins: g.meta.wallet.coins, buy, board: g.lb.getTop().map((e) => e.name), premium: g.meta.pass.premium};""")
    check('...a whole run, the leaderboard, the wallet and the shop work from memory', r['state'] == 'menu' and r['coins'] == 50 and r['buy'] == {'ok': True} and r['board'] == ['Test'] and r['premium'], str(r))
    check('...without a single JavaScript error', not page.errors, '; '.join(page.errors[:3]))
    ctx.close()

    # --- storage becomes full while playing
    page = H.new_page(browser)
    js(page, 'window.__meta.bank({coins: 10});')
    js(page, """window.__realSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function () { throw new DOMException('Quota exceeded', 'QuotaExceededError'); };
      window.__meta.bank({coins: 5}); window.__game.toMenu();""")
    r = js(page, 'return {ok: window.__store.status.writeOk, coins: window.__meta.wallet.coins, disk: JSON.parse(localStorage.getItem("brasovRunner.save")).wallet.coins, warn: document.getElementById("save-warning").textContent, shown: !document.getElementById("save-warning").hidden};')
    check('storage full: the game goes on from memory, says so, and the last good save on disk is intact', r['ok'] is False and r['coins'] == 15 and r['disk'] == 10 and r['shown'] and 'salva' in r['warn'], str(r))
    js(page, 'Storage.prototype.setItem = window.__realSet; window.__meta.bank({coins: 1}); window.__game.toMenu();')
    r = js(page, 'return {ok: window.__store.status.writeOk, disk: JSON.parse(localStorage.getItem("brasovRunner.save")).wallet.coins, shown: !document.getElementById("save-warning").hidden};')
    check('space is available again: the next save writes everything and the warning goes away', r == {'ok': True, 'disk': 16, 'shown': False}, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()

    # --- corrupted v2 save
    page = H.new_page(browser, init_storage={'brasovRunner.save': '{"v":2,"wallet":{"coins":12'})
    time.sleep(0.5)
    r = js(page, 'return {loaded: window.__store.status.loaded, coins: window.__meta.wallet.coins, menu: !document.getElementById("screen-start").hidden, toast: document.getElementById("toasts").textContent, rescue: localStorage.getItem("brasovRunner.save.corrupt")};')
    check('corrupted save: the game starts fresh, tells the player, and keeps the broken text aside for rescue', r['loaded'] == 'reset' and r['coins'] == 0 and r['menu'] and 'deteriorată' in r['toast'] and r['rescue'] == '{"v":2,"wallet":{"coins":12' and not page.errors, str(r))
    page.context.close()

    # --- corrupted main copy but a good backup
    good = json.dumps({'v': 2, 'wallet': {'coins': 777, 'crowns': 9}})
    page = H.new_page(browser, init_storage={'brasovRunner.save': '<<<garbage>>>', 'brasovRunner.save.bak': good})
    r = js(page, 'return {loaded: window.__store.status.loaded, wallet: {...window.__meta.wallet}};')
    check('corrupted save with a good backup: the backup is loaded', r == {'loaded': 'backup', 'wallet': {'coins': 777, 'crowns': 9}}, str(r))
    page.context.close()

    # --- edited save: values are validated
    evil = json.dumps({'v': 2, 'wallet': {'coins': -5, 'crowns': 'many'}, 'cosmetics': {'owned': {'boy': ['hacker']}, 'equipped': {'boy': 'hacker'}},
                       'pass': {'season': 0, 'xp': 5, 'premium': 1, 'claimed': {'free': [40], 'premium': [40]}}, 'leaderboard': [{'name': '<img src=x onerror=alert(1)>', 'score': 9}],
                       'missions': {'daily': {'key': 'x', 'list': 7}}, 'settings': {'startBiome': 77, 'muted': 'no'}})
    page = H.new_page(browser, init_storage={'brasovRunner.save': evil})
    r = js(page, G + 'return {wallet: {...g.meta.wallet}, skin: g.playerView.skinId, pass: g.meta.pass, daily: g.meta.missions.daily.list.length, biome: g.startBiome, board: [...document.querySelectorAll("#board-start .name")].map((e) => e.textContent), imgs: document.querySelectorAll("#board-start img").length};')
    check('edited save: every value is validated (no negative money, no unknown skin, no unreached pass rewards, no markup)', r['wallet'] == {'coins': 0, 'crowns': 0} and r['skin'] == 'clasic' and r['pass']['premium'] is False and r['pass']['claimed'] == {'free': [], 'premium': []} and r['daily'] == 3 and r['biome'] == 4 and r['imgs'] == 0 and '<' not in ''.join(r['board']) and not page.errors, str(r))
    page.context.close()

    # --- update from v1 (the three old keys)
    v1 = {'winterRunner.leaderboard.v1': json.dumps([{'id': 'a', 'name': 'Nutu', 'score': 4321, 'coins': 10, 'distance': 4000, 'date': '2026-10-30T10:00:00.000Z'}]), 'winterRunner.name': 'Nutu', 'winterRunner.muted': '1'}
    page = H.new_page(browser, init_storage=v1)
    page.evaluate(DIE_JS)
    r = js(page, G + 'return {loaded: window.__store.status.loaded, board: [...document.querySelectorAll("#board-start .name")].map((e) => e.textContent), muted: g.sfx.muted, sound: document.getElementById("btn-sound").textContent, v: JSON.parse(localStorage.getItem("brasovRunner.save")).v, old: localStorage.getItem("winterRunner.name")};')
    check('update from v1: the old Top 10 and the mute setting are carried over, nothing is lost', r['loaded'] == 'migrated' and r['board'] == ['Nutu'] and r['muted'] is True and 'oprit' in r['sound'] and r['v'] == 2 and r['old'] == 'Nutu', str(r))
    js(page, SETUP + 'g.reviveEnabled = false; g.distance = 9000; window.__die();')
    check('update from v1: the old player name is pre-filled for a new high score', page.input_value('#name-input') == 'Nutu', page.input_value('#name-input'))
    page.context.close()

    # --- two tabs of the game (small windows: two software-rendered pages at once are slow)
    ctx = browser.new_context(viewport={'width': 360, 'height': 300})
    try:
        a, b2 = ctx.new_page(), ctx.new_page()
        for p in (a, b2):
            p.goto(H.BASE + '/?debug&noauth')
            p.wait_for_function('window.__game !== undefined', timeout=90000)
        js(a, 'window.__meta.bank({coins: 321, crowns: 4});')
        b2.wait_for_function('window.__meta.wallet.coins === 321', timeout=30000)
        shown = b2.inner_text('#screen-start [data-wallet=coins]')
        js(b2, 'window.__meta.bank({coins: 9});')
        a.wait_for_function('window.__meta.wallet.coins === 330', timeout=30000)
        check('two tabs: a save in one tab reaches the other (shown in its menu), so they never overwrite each other', shown == '321' and js(a, 'return window.__meta.wallet.crowns;') == 4, shown)
    finally:
        ctx.close()


# ----------------------------------------------------------------------------------------------
def test_time(browser):
    print('\n[T] Dates: midnight during a run, new day with the menu open, clock moved back')
    check = H.check
    page = H.new_page(browser)
    page.evaluate(DIE_JS)
    js(page, """window.__clock = new Date(2026, 10, 10, 23, 58, 0); window.__meta.now = () => new Date(window.__clock.getTime());
      window.__meta.sync(); window.__screens.refresh();""")
    r = js(page, 'return {key: window.__meta.missions.daily.key, ids: window.__meta.missions.daily.list.map((e) => e.id)};')
    check('missions follow the (local) date of the device', r['key'] == '2026-11-10', str(r))
    day1 = r['ids']

    # a run that starts at 23:58 and ends after midnight
    r = js(page, SETUP + """g.reviveEnabled = false;
      Object.assign(g.stats, {jumps: 500, slides: 500, laneChanges: 500, powers: 50, escapes: 50});
      g.coinsCollected = 900; g.distance = 20000; g.cleanT = 500;
      window.__clock = new Date(2026, 10, 11, 0, 3, 0);            // midnight passes while playing
      const keyDuring = window.__meta.missions.daily.key;
      window.__die();
      return {keyDuring, state: g.state, key: window.__meta.missions.daily.key, ids: window.__meta.missions.daily.list.map((e) => e.id),
              fresh: window.__meta.missions.daily.list.every((e) => e.progress === 0 && !e.claimed), wallet: {...window.__meta.wallet}, xp: window.__meta.pass.xp, runs: window.__meta.state.stats.runs};
    """)
    cfg = js(page, G + 'return g.cfg.missions.reward;')
    check('midnight during a run: nothing changes in the middle of the run', r['keyDuring'] == '2026-11-10', str(r))
    check('...the run counts for the day it started in, then the new day begins with fresh missions', r['state'] == 'gameover' and r['key'] == '2026-11-11' and r['fresh'] and r['runs'] == 1, str(r))
    expect_coins = 900 + 3 * cfg['daily']['coins']
    check("...and yesterday's finished missions (and the daily bonus) were paid automatically, not lost", r['wallet']['coins'] == expect_coins and r['wallet']['crowns'] == cfg['dailyBonus']['crowns'], f"{r['wallet']} expected coins {expect_coins}")

    # the menu is left open over midnight
    js(page, G + 'g.toMenu();')
    js(page, 'document.getElementById("toasts").replaceChildren(); window.__clock = new Date(2026, 10, 12, 0, 0, 30); window.dispatchEvent(new Event("focus"));')
    r = js(page, 'return {key: window.__meta.missions.daily.key, toast: document.getElementById("toasts").textContent, side: [...document.querySelectorAll("#side-missions li b")].map((e) => e.textContent)};')
    check('phone left open over midnight: back in the app, the new missions appear with a note', r['key'] == '2026-11-12' and 'misiuni noi' in r['toast'] and all(t.startswith('0/') for t in r['side']), str(r))

    # clock moved back, then forward again
    js(page, """window.__meta.endRun({runs: 5, coins: 5000, jumps: 500, slides: 500, distance: 99999, score: 99999, powers: 50, escapes: 50, laneChanges: 500, cleanSeconds: 999});
      for (const e of [...window.__meta.missions.daily.list]) window.__meta.claimMission('daily', e.id);""")
    w = js(page, 'return {...window.__meta.wallet};')
    js(page, 'window.__clock = new Date(2026, 10, 5, 12, 0, 0); window.dispatchEvent(new Event("focus"));')
    r = js(page, 'return {key: window.__meta.missions.daily.key, claimed: window.__meta.missions.daily.list.every((e) => e.claimed), wallet: {...window.__meta.wallet}, again: window.__meta.missions.daily.list.map((e) => window.__meta.claimMission("daily", e.id)), season: window.__meta.pass.season};')
    check('clock moved a week back: the same missions stay claimed, nothing can be claimed twice, no crash', r['claimed'] and r['wallet'] == w and r['again'] == [None, None, None] and r['key'] == '2026-11-05', str(r))
    js(page, 'window.__clock = new Date(2026, 10, 6, 9, 0, 0); window.dispatchEvent(new Event("focus"));')
    r = js(page, 'return {key: window.__meta.missions.daily.key, fresh: window.__meta.missions.daily.list.every((e) => !e.claimed)};')
    check('...and the next day brings new missions as usual (the game is not stuck on the future date)', r == {'key': '2026-11-06', 'fresh': True}, str(r))

    # season roll-over in the pass screen
    # (4 tiers reached and not claimed: 100 + 100 + 100 coins and 5 crowns wait on the free track)
    js(page, 'for (const s of ["daily", "weekly", "run"]) for (const e of window.__meta.missions[s].list) e.progress = 0; window.__meta.pass.xp = 500; window.__meta.pass.claimed = {free: [], premium: []}; window.__meta.store.save();')
    w0 = js(page, 'return {...window.__meta.wallet};')
    js(page, 'document.getElementById("toasts").replaceChildren(); window.__clock = new Date(2026, 11, 20, 12, 0, 0); window.dispatchEvent(new Event("focus"));')
    r = js(page, 'return {season: window.__meta.pass.season, xp: window.__meta.pass.xp, claimed: window.__meta.pass.claimed, wallet: {...window.__meta.wallet}, info: window.__meta.passInfo(), toast: document.getElementById("toasts").textContent};')
    check('a new season starts by the calendar: XP and claims reset, the season name and the days left change', r['season'] == 1 and r['xp'] == 0 and r['claimed'] == {'free': [], 'premium': []} and 'Sezonul 2' in r['info']['name'] and 'sezon nou' in r['toast'], str(r))
    check('...and the rewards that were unlocked but not claimed in the old season arrive automatically', r['wallet']['coins'] - w0['coins'] == 300 and r['wallet']['crowns'] - w0['crowns'] == 5 and 'automat' in r['toast'], f"{w0} -> {r['wallet']}")
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
LAYOUT_JS = """() => { const r = (sel) => { const e = document.querySelector(sel); if (!e) return null; const b = e.getBoundingClientRect(); return {x: b.left, y: b.top, w: b.width, h: b.height, r: b.right, b: b.bottom}; };
  const mid = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
  return {w: innerWidth, h: innerHeight, main: r('.menu-main'), side: r('.menu-side'), play: r('#btn-play'), centerInPanel: !!mid.closest('.panel'),
          overflowX: document.documentElement.scrollWidth > innerWidth, overflowY: document.documentElement.scrollHeight > innerHeight,
          canvas: r('#game-canvas'), buf: [document.getElementById('game-canvas').width, document.getElementById('game-canvas').height]}; }"""


def test_layout_input(browser):
    print('\n[Y] Layout and input: desktop side bars, phones, resize, rotation, mouse, gamepad')
    check = H.check
    for (w, h) in [(1280, 720), (1920, 1080), (1024, 768)]:
        page = H.new_page(browser, w, h)
        L = page.evaluate(LAYOUT_JS)
        ok = L['main']['r'] < w * 0.42 and L['side']['x'] > w * 0.58 and not L['centerInPanel'] and L['main']['w'] <= 400 and L['side']['w'] <= 400
        check(f'desktop {w}x{h}: two side bars (menu left, pass / missions / Top 10 right), the 3D scene free in the middle', ok and not L['overflowX'] and not L['overflowY'], str(L))
        if w == 1280:
            # mouse: click zones on the canvas
            page.click('#btn-play')
            js(page, G + 'g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;')
            page.mouse.click(120, 400)
            a = H.snap(page)['lane']
            page.mouse.click(1160, 400)
            page.mouse.click(1160, 400)
            b2 = H.snap(page)['lane']
            page.mouse.click(640, 400)
            jumped = js(page, G + 'return g.stats.jumps;')
            js(page, G + 'g.stepSim(1, 1/60);')
            page.mouse.click(640, 400, button='right')
            slid = js(page, G + 'return g.stats.slides;')
            check('mouse only: click left / right changes lane, click in the middle jumps, right click slides', a == -1 and b2 == 1 and jumped == 1 and slid == 1, str((a, b2, jumped, slid)))
            # mouse drag still swipes, and a drag is not also a click
            js(page, G + 'g.stepSim(1, 1/60);')
            page.mouse.move(640, 400)
            page.mouse.down()
            page.mouse.move(600, 400, steps=4)   # 40 px: one swipe (a longer drag gives several, by design)
            page.mouse.up()
            check('a mouse drag is a swipe (one lane), not an extra click', H.snap(page)['lane'] == 0, str(H.snap(page)['lane']))
            # gamepad (simulated)
            r = js(page, G + """
              const pad = {connected: true, buttons: Array.from({length: 17}, () => ({pressed: false})), axes: [0, 0, 0, 0]};
              navigator.getGamepads = () => [pad];
              window.dispatchEvent(new Event('gamepadconnected'));
              const frame = () => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
              return (async () => {
                await frame();
                const out = {};
                pad.buttons[14].pressed = true; await frame(); await frame(); pad.buttons[14].pressed = false; await frame(); out.left = g.player.lane;
                pad.axes[0] = 1; await frame(); await frame(); await frame(); out.heldOnce = g.player.lane; pad.axes[0] = 0; await frame();
                pad.axes[0] = 1; await frame(); await frame(); pad.axes[0] = 0; await frame(); out.right = g.player.lane;
                const j = g.stats.jumps; pad.buttons[0].pressed = true; await frame(); pad.buttons[0].pressed = false; await frame(); out.jump = g.stats.jumps - j;
                pad.buttons[9].pressed = true; await frame(); pad.buttons[9].pressed = false; await frame(); out.paused = g.state;
                return out;
              })();
            """)
            check('gamepad (optional): d-pad / stick change lane once per push, A jumps, Start pauses', r == {'left': -1, 'heldOnce': 0, 'right': 1, 'jump': 1, 'paused': 'paused'}, str(r))
        check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
        page.context.close()

    for (w, h) in [(390, 844), (320, 568), (768, 1024)]:
        page = H.new_page(browser, w, h, mobile=True)
        L = page.evaluate(LAYOUT_JS)
        ok = L['main']['w'] > min(w, 460) * 0.85 and L['side']['y'] >= L['main']['b'] - 1 and L['main']['x'] >= 0 and L['main']['r'] <= w + 0.5
        check(f'phone / tablet portrait {w}x{h}: one column (menu, then pass / missions / Top 10), nothing cut off sideways', ok and not L['overflowX'] and not L['overflowY'], str(L))
        page.click('#btn-play')
        check(f'{w}x{h}: JOACĂ is reachable and starts the run; the canvas fills the screen', H.snap(page)['state'] == 'playing' and abs(L['canvas']['w'] - w) < 1 and abs(L['canvas']['h'] - h) < 2)
        js(page, G + 'g.toMenu();')
        fits = []
        for name in ['missions', 'pass', 'wardrobe']:
            page.click(f'#btn-{name}')
            time.sleep(0.2)
            fits.append(js(page, f"""const p = document.querySelector('#screen-{name} .panel').getBoundingClientRect(); const bk = document.querySelector('#screen-{name} [data-back]').getBoundingClientRect();
              return p.left >= -0.5 && p.right <= innerWidth + 0.5 && p.top >= -0.5 && p.bottom <= innerHeight + 0.5 && bk.top >= 0 && bk.bottom <= innerHeight && document.documentElement.scrollWidth <= innerWidth;"""))
            if name == 'wardrobe':
                top = js(page, "return document.querySelector('#screen-wardrobe .panel').getBoundingClientRect().top / innerHeight;")
                fits.append(top > 0.4)  # the upper part of the screen is left for the 3D preview
            page.click(f'#screen-{name} [data-back]')
        check(f'{w}x{h}: Misiuni, Pass and Garderobă fit on the screen (the wardrobe is a bottom sheet under the 3D preview)', all(fits), str(fits))
        check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
        page.context.close()

    # resizing the window while playing, then rotating a phone and coming back
    page = H.new_page(browser, 1280, 720)
    page.evaluate('window.__makeBot = ' + H.BOT_JS)
    page.click('#btn-play')
    sizes = [(1280, 720), (500, 900), (1920, 600), (360, 640), (1280, 720)]
    seen = []
    for (w, h) in sizes:
        page.set_viewport_size({'width': w, 'height': h})
        time.sleep(0.35)
        seen.append(js(page, G + 'g.stepSim(2, 1/60, window.__makeBot(false)); g.render(1/60); const c = document.getElementById("game-canvas"); return [c.clientWidth, c.clientHeight, Math.round(g.camera.aspect * 100) / 100, g.state, g.camera.fov >= 58 && g.camera.fov <= 104];'))
    ok = all(s[0] == w and s[1] == h and abs(s[2] - round(w / h, 2)) < 0.02 and s[3] == 'playing' and s[4] for s, (w, h) in zip(seen, sizes))
    check('resizing the window during a run: canvas and camera follow every size, the run goes on', ok and not page.errors, str(seen))
    page.context.close()

    page = H.new_page(browser, 390, 844, mobile=True)
    page.click('#btn-play')
    page.set_viewport_size({'width': 844, 'height': 390})
    time.sleep(0.4)
    a = {'rotate': page.is_visible('#screen-rotate'), 'state': H.snap(page)['state']}
    page.set_viewport_size({'width': 390, 'height': 844})
    time.sleep(0.4)
    b2 = {'rotate': page.is_visible('#screen-rotate'), 'state': H.snap(page)['state'], 'pause': page.is_visible('#screen-pause')}
    page.click('#btn-resume')
    check('phone rotated to landscape and back during a run: hint + pause, then the run can be resumed', a == {'rotate': True, 'state': 'paused'} and b2 == {'rotate': False, 'state': 'paused', 'pause': True} and H.snap(page)['state'] == 'playing' and not page.errors, f'{a} {b2}')
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_edge_cases(browser):
    print('\n[X] Edge cases: background tab, double taps, abandoned runs, pause')
    check = H.check
    page = H.new_page(browser)
    page.evaluate(DIE_JS)

    # double click on JOACĂ
    page.dblclick('#btn-play')
    time.sleep(0.3)
    r = js(page, G + 'return {state: g.state, runTime: g.runTime, runs: g.meta.state.stats.runs, open: g.runOpen};')
    check('double click on JOACĂ starts exactly one run', r['state'] == 'playing' and r['runs'] == 0 and r['open'], str(r))

    # tab to the background in the middle of a run
    js(page, G + 'g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0; g.coinsCollected = 14; g.crownsCollected = 1; g.givePower("slowmo");')
    js(page, """window.__hidden = true; Object.defineProperty(document, 'hidden', {get: () => window.__hidden, configurable: true});
      document.dispatchEvent(new Event('visibilitychange'));""")
    a = js(page, G + 'return {state: g.state, wallet: {...g.meta.wallet}, d: g.distance, slow: g.powers.remaining.slowmo, disk: JSON.parse(localStorage.getItem("brasovRunner.save")).wallet};')
    time.sleep(1.5)
    b2 = js(page, G + 'return {state: g.state, d: g.distance, slow: g.powers.remaining.slowmo};')
    check('tab in the background during a run: paused at once, and the coins / crowns so far are saved to disk', a['state'] == 'paused' and a['wallet'] == {'coins': 14, 'crowns': 1} and a['disk'] == a['wallet'], str(a))
    check('...and nothing moves while hidden (distance, clock timer)', b2['state'] == 'paused' and b2['d'] == a['d'] and b2['slow'] == a['slow'], f'{a} -> {b2}')
    js(page, "window.__hidden = false; document.dispatchEvent(new Event('visibilitychange')); window.dispatchEvent(new Event('focus'));")
    check('back in the foreground the run stays paused until the player resumes (no surprise)', H.snap(page)['state'] == 'paused' and page.is_visible('#screen-pause'))
    page.click('#btn-resume')
    js(page, G + 'g.coinsCollected = 20; g.stepSim(0.5, 1/60);')
    # hide again: only the NEW coins are added
    js(page, "window.__hidden = true; document.dispatchEvent(new Event('visibilitychange')); window.__hidden = false; document.dispatchEvent(new Event('visibilitychange'));")
    check('banking is incremental: hiding the tab again adds only the coins collected since', js(page, 'return window.__meta.wallet.coins;') == 20)

    # restart from the pause menu: the abandoned run keeps coins and progress but is not a "played run"
    js(page, G + 'g.stats.jumps = 33; g.coinsCollected = 26;')
    before = js(page, 'return {runs: window.__meta.state.stats.runs, coins: window.__meta.wallet.coins};')
    page.dblclick('#btn-restart')
    time.sleep(0.2)
    r = js(page, G + 'return {state: g.state, runTime: g.runTime, coins: g.meta.wallet.coins, runs: g.meta.state.stats.runs, total: g.meta.state.stats.totalCoins, collected: g.coinsCollected, crowns: g.crownsCollected};')
    check('restart from pause (double click): one clean new run; the old run kept its coins, but does not count as played', r['state'] == 'playing' and r['runTime'] < 1 and r['coins'] == 26 and r['runs'] == before['runs'] and r['total'] == 26 and r['collected'] == 0 and r['crowns'] == 0, str(r))

    # game over, double click on JOACĂ DIN NOU
    js(page, G + 'g.reviveEnabled = false; g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0; g.stepSim(2.5, 1/60); window.__die();')
    runs = js(page, 'return window.__meta.state.stats.runs;')
    page.dblclick('#btn-again')
    time.sleep(0.2)
    r = js(page, G + 'return {state: g.state, runs: g.meta.state.stats.runs, over: !document.getElementById("screen-over").hidden};')
    check('a finished run counts once; double click on JOACĂ DIN NOU starts one new run', runs == before['runs'] + 1 and r == {'state': 'playing', 'runs': runs, 'over': False}, str(r))

    # pause + resume in the middle of a jump with the clock on: physics continues exactly
    r = js(page, G + """
      g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      g.stepSim(2, 1/60); g.givePower('slowmo'); g.stepSim(1, 1/60); g.actions.jump(); g.stepSim(0.2, 1/60);
      const y0 = g.player.y, vy0 = g.player.vy;
      g.actions.pause(); const p = g.state; g.stepSim(1, 1/60); const yPaused = g.player.y; g.actions.pause();
      g.stepSim(1/60, 1/60);
      return {p, y0, vy0, yPaused, state: g.state, moved: g.player.y !== y0};
    """)
    check('pause in mid-air in slow motion: frozen exactly, continues from the same point', r['p'] == 'paused' and r['yPaused'] == r['y0'] and r['state'] == 'playing' and r['moved'], str(r))

    # mute persists (through the save module)
    page.click('#btn-mute')
    m1 = js(page, G + 'return [g.sfx.muted, JSON.parse(localStorage.getItem("brasovRunner.save")).settings.muted];')
    page.reload()
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    m2 = js(page, G + 'return [g.sfx.muted, document.getElementById("btn-sound").textContent];')
    check('the sound setting is saved and restored', m1 == [True, True] and m2[0] is True and 'oprit' in m2[1], f'{m1} {m2}')
    # chosen start level persists
    page.click('#level-pick .level-chip >> nth=2')
    page.reload()
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    time.sleep(0.3)
    r = js(page, G + 'return [g.startBiome, g.world.biomeId, document.querySelector("#level-pick .level-chip.on").dataset.level];')
    check('the chosen start level is remembered', r == [2, 'tractorul', '2'], str(r))
    import re  # (the version itself comes from package.json: any x.y.z is right)
    check('the version of the app is shown in the menu', re.search(r'v\d+\.\d+\.\d+', page.inner_text('#app-version')) is not None, page.inner_text('#app-version'))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# ----------------------------------------------------------------------------------------------
def test_performance(browser):
    print('\n[F] Performance budget (what a mid-range phone has to draw and compute)')
    check = H.check
    page = H.new_page(browser, 390, 844, mobile=True)
    page.evaluate('window.__makeBot = ' + H.BOT_JS)
    r = js(page, G + """
      g.meta.cosmetics.owned.boy.push('salvamont'); g.meta.cosmetics.owned.bear.push('racadau'); g.meta.cosmetics.owned.trail.push('tricolor');
      g.meta.equip('boy', 'salvamont'); g.meta.equip('bear', 'racadau'); g.meta.equip('trail', 'tricolor'); g.applyCosmetics();
      const out = [];
      for (let i = 0; i < 5; i++) {
        g.setStartBiome(i); g.startRun();
        const bot = window.__makeBot(false);
        g.stepSim(25, 1/60, bot);
        // worst case on screen: bear chasing, shield + clock + magnet active, trail, many coins
        g.bear.hit(); g.givePower('shield'); g.givePower('slowmo'); g.givePower('magnet');
        let calls = 0, tris = 0, n = 0;
        for (let k = 0; k < 12; k++) { g.stepSim(0.25, 1/60, bot); g.render(1/60); calls = Math.max(calls, g.renderer.info.render.calls); tris = Math.max(tris, g.renderer.info.render.triangles); n++; }
        // cost of the simulation alone (no drawing): one frame = advance(1/60)
        const t0 = performance.now(); let frames = 0;
        for (let k = 0; k < 600; k++) { bot(g); g.advance(1/60); frames++; }
        const simMs = (performance.now() - t0) / frames;
        out.push({level: g.biomes[i].id, calls, tris, simMs: +simMs.toFixed(3), obstacles: g.obstacles.length, coins: g.coins.length, particles: g.particles.capacity,
                  geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, shadow: g.world.sun.shadow.mapSize.x, dpr: g.renderer.getPixelRatio()});
      }
      return out;
    """)
    for x in r:
        print(f"      {x['level']:>11}: {x['calls']:>3} draw calls, {x['tris']:>6} triangles, sim {x['simMs']} ms/frame, {x['geo']} geometries, {x['tex']} textures")
    # Measured in the same scene: v1 needs 260-363 draw calls and 30k-73k triangles; v2 with a skin,
    # a bear skin, a trail, the shield and the clock on top needs 240-385 and 30k-75k (the new models
    # are merged per material). The numbers change by +-40 with the random obstacle rows in view, so
    # the budget leaves some room.
    check('draw calls stay inside the budget in every level, worst case (bear + 3 power-ups + skin + trail): <= 460', all(x['calls'] <= 460 for x in r), str([x['calls'] for x in r]))
    check('triangles per frame stay inside the budget: <= 120k', all(x['tris'] <= 120000 for x in r), str([x['tris'] for x in r]))
    check('the simulation itself is cheap: < 1.5 ms per frame even in software-rendered headless Chromium', all(x['simMs'] < 1.5 for x in r), str([x['simMs'] for x in r]))
    check('phone settings: 1024 px shadow map, pixel ratio capped at 2, at most 260 particles', all(x['shadow'] == 1024 and x['dpr'] <= 2 and x['particles'] <= 260 for x in r), str(r[0]))
    check('entities on the track stay bounded', all(x['obstacles'] < 40 and x['coins'] < 150 for x in r), str([(x['obstacles'], x['coins']) for x in r]))
    geo = [x['geo'] for x in r]
    check('GPU memory: all five levels loaded = a fixed set of geometries and textures (nothing created per run)', max(x['tex'] for x in r) <= 120, str([(x['geo'], x['tex']) for x in r]))

    # opening and closing every screen many times must not pile up DOM nodes or GPU resources
    js(page, G + 'g.toMenu(); window.__meta.bank({coins: 5000, crowns: 500});')
    r = js(page, G + """
      const count = () => ({dom: document.getElementsByTagName('*').length, geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures});
      const tour = () => { for (const name of ['missions', 'pass', 'wardrobe']) { window.__screens.show(name);
          if (name === 'wardrobe') for (const kind of ['boy', 'bear', 'trail', 'emoji']) { window.__screens.showKind(kind); g.render(1/60); }
          window.__screens.close(); }
        document.getElementById('toasts').replaceChildren(); g.render(1/60); };
      tour(); tour();
      const before = count();
      for (let k = 0; k < 25; k++) tour();
      return {before, after: count()};
    """)
    check('25 tours through Misiuni / Pass / Garderobă: the same number of DOM nodes, geometries and textures as before', r['before'] == r['after'], str(r))

    # adaptive quality still steps down on a slow device
    r = js(page, G + """
      g.startRun(); g.runTime = 5; const q0 = g.qualityLevel, sh0 = g.shadows;
      for (let k = 0; k < 8; k++) { g.fpsT = 1.6; g.fpsN = 30; g.trackFps(0.01); }   // ~19 fps measured, repeatedly
      return {q0, sh0, q: g.qualityLevel, shadows: g.shadows, limit: g.particles.limit, dpr: g.renderer.getPixelRatio()};
    """)
    check('adaptive quality: on a slow phone the game drops resolution, particles and shadows by itself', r['q'] > r['q0'] and r['shadows'] is False and r['limit'] < 260 and r['dpr'] <= 1, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()
