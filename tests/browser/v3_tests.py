"""
Browser tests for the v3 additions of Brașov Runner (run by game_tests.py, same report).

  [V]  no near misses / coin streaks any more (v3.2, owner's request): score = distance + coins
  [X]  v3.1 shared leaderboard: one row per account under the account's name, saved automatically,
       the same list for everybody; a guest sees it but stays on his device's Top 10
  [W]  feel and polish: hit stop, control hints in the first runs, the music switch, the new
       visual modules (effects, camera rig, post-processing) are alive in every level and at every
       quality level without errors
"""
import json
import time

import v2_tests as V2  # open_page, DIE_JS (its helpers are set when it is registered, before this file)

H = None  # helpers from game_tests.py: check, snap, new_page, BOT_JS


def register(helpers):
    global H
    H = helpers
    return [test_no_style, test_feel, test_scoreboard]


def js(page, body):
    return page.evaluate('() => {' + body + '}')


G = 'const g = window.__game;'
# A clean track at running speed, the real-time loop stopped (the test steps the game itself), and
# spies on the optional UI / sound hooks.
SETUP = G + """
  g.loop = () => {};
  g.startRun(); g.generationEnabled = false; g.powerupsEnabled = false;
  for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
  for (const c of g.coins) g.coinPool.release(c.mesh); g.coins.length = 0;
  g.stepSim(2.5, 1/60);
  if (!window.__spy) {
    window.__spy = {popups: [], coins: [], near: [], combo: []};
    const wrap = (obj, name, log) => { const orig = obj[name]?.bind(obj); obj[name] = (...a) => { log.push(a); return orig?.(...a); }; };
    wrap(g.ui, 'popup', window.__spy.popups); wrap(g.sfx, 'coin', window.__spy.coins);
    wrap(g.sfx, 'nearMiss', window.__spy.near); wrap(g.sfx, 'combo', window.__spy.combo);
  }
  for (const k in window.__spy) window.__spy[k].length = 0;
  const P = g.cfg.player, HALF = g.cfg.laneW / 2 - 0.12;
"""


def test_no_style(browser):
    print("\n[V] v3.2: no 'La limită!' and no coin streaks (removed at the owner's request); score = distance + coins")
    check = H.check
    page = H.new_page(browser, 960, 540)
    r = js(page, SETUP + """
      // pass right beside an obstacle, then collect a long row of coins
      g.player.lane = 1; g.player.x = HALF + P.halfW + 0.05;
      g.spawnDebug('log', 0, 0.3); g.stepSim(0.1, 1/120);
      for (let i = 0; i < 30; i++) g._addCoin({lane: 1, s: g.distance + 3 + i * 2.3, y: 1.0});
      const before = g.score, d0 = g.distance, c0 = g.coinsCollected;
      g.stepSim(6, 1/60); g.render(1/60);
      const gained = g.score - before, want = (g.distance - d0) * g.cfg.score.perUnit + (g.coinsCollected - c0) * g.cfg.score.perCoin;
      const meter = document.getElementById('combo');
      return {coins: g.coinsCollected - c0, hits: g.stats.hits, popups: window.__spy.popups.length, near: window.__spy.near.length, combo: window.__spy.combo.length,
              ladder: [...new Set(window.__spy.coins.map((x) => x[0] ?? null))], scoreOk: Math.abs(gained - want) < 2, style: 'style' in g || 'style' in g.cfg,
              meter: meter ? !meter.hidden : false};
    """)
    check('passing close and collecting 30 coins in a row: no note, no streak meter, no special sound', r['coins'] == 30 and r['hits'] == 0 and r['popups'] == 0 and r['near'] == 0 and r['combo'] == 0 and not r['meter'], str(r))
    check('the coin sound is the same every time (no climbing ladder)', r['ladder'] == [None], str(r['ladder']))
    check('score = distance + coins, nothing else', r['scoreOk'] and not r['style'], str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_feel(browser):
    print('\n[W] v3 feel: hit stop, control hints, music switch, effects alive in every level')
    check = H.check
    page = H.new_page(browser, 960, 540)

    r = js(page, SETUP + """
      g.spawnDebug('log', 0, 0.6); g.stepSim(0.1, 1/120);
      const stop = g.hitStop, d0 = g.distance;
      let t = performance.now(); g.last = t;
      t += 30; g.frame(t);                       // 30 ms later: still frozen
      const frozen = g.distance === d0 && g.hitStop > 0 && g.hitStop < stop;
      for (let i = 0; i < 6; i++) { t += 30; g.frame(t); }
      return {stop, frozen, moving: g.distance > d0, left: g.hitStop, state: g.state, want: g.cfg.feel.hitStop};
    """)
    check('a hit freezes the picture for a moment (hit stop), then the run goes on', r['stop'] == r['want'] and r['frozen'] and r['moving'] and r['left'] == 0 and r['state'] == 'playing', str(r))

    r = js(page, G + """
      g.loop = () => {};
      g.toMenu();
      g.meta.setSetting('hints', 0);
      const shown = [];
      const orig = g.ui.showHints?.bind(g.ui);
      const had = typeof g.ui.showHints === 'function';
      g.ui.showHints = (touch) => { shown.push(touch); orig?.(touch); };
      const runs = [];
      for (let i = 0; i < 4; i++) { g.startRun(); runs.push(shown.length); g.toMenu(); }
      return {had, runs, stored: g.meta.settings.hints, want: g.cfg.feel.hintRuns};
    """)
    check('the control hints are shown in the first runs only (and that is remembered)', r['had'] and r['runs'] == [1, 2, 2, 2] and r['stored'] == r['want'] == 2, str(r))

    r = js(page, G + """
      const btn = document.getElementById('btn-music');
      if (!btn) return {btn: false};
      const before = g.meta.settings.music, sfxBefore = g.sfx.musicOn;
      btn.click();
      return {btn: true, before, sfxBefore, off: {setting: g.meta.settings.music, sfx: g.sfx.musicOn, muted: g.sfx.muted}};
    """)
    if r.get('btn'):
        time.sleep(0.45)  # (buttons ignore a second tap right after the first one)
        r['on'] = js(page, G + "document.getElementById('btn-music').click(); return {setting: g.meta.settings.music, sfx: g.sfx.musicOn};")
    check('the music has its own switch: it is remembered and does not touch the sound effects', r.get('btn') and r['before'] is True and r['sfxBefore'] is True and r['off'] == {'setting': False, 'sfx': False, 'muted': False} and r['on'] == {'setting': True, 'sfx': True}, str(r))

    # every level at every quality level: play with the bot, draw, switch quality, look for errors and leaks
    page.evaluate('window.__makeBot = ' + H.BOT_JS)
    r = js(page, G + """
      const out = [];
      for (let i = 0; i < 5; i++) {
        g.setStartBiome(i); g.startRun();
        const bot = window.__makeBot(false);
        const mem = [];
        for (let q = 0; q < 4; q++) {
          g.qualityLevel = q; g.applyQuality();
          for (let k = 0; k < 8; k++) { g.stepSim(0.5, 1/60, bot); g.render(1/60); }
          mem.push([g.renderer.info.memory.geometries, g.renderer.info.memory.textures, g.renderer.info.render.calls]);
        }
        // back to the best quality and the same again: nothing may have been created a second time
        g.qualityLevel = 0; g.applyQuality();
        for (let k = 0; k < 8; k++) { g.stepSim(0.5, 1/60, bot); g.render(1/60); }
        const again = [g.renderer.info.memory.geometries, g.renderer.info.memory.textures];
        out.push({level: g.biomes[i].id, mem, again, state: g.state});
        g.toMenu();
      }
      return out;
    """)
    for x in r:
        print(f"      {x['level']:>11}: draw calls by quality {[m[2] for m in x['mem']]}, geometries {[m[0] for m in x['mem']]} -> {x['again'][0]}, textures {[m[1] for m in x['mem']]} -> {x['again'][1]}")
    check('every level draws at every quality level without errors', not page.errors and all(len(x['mem']) == 4 for x in r), '; '.join(page.errors[:3]))
    check('lower quality never costs more draw calls than the best one (+10 for what is in view)', all(x['mem'][3][2] <= x['mem'][0][2] + 10 for x in r), str([[m[2] for m in x['mem']] for x in r]))
    check('switching the quality back and forth does not leak GPU resources', all(x['again'][0] <= x['mem'][0][0] + 2 and x['again'][1] <= x['mem'][0][1] + 2 for x in r), str([(x['mem'][0][:2], x['again']) for x in r]))

    # a long run with everything on: the number of scene objects and GPU resources stays flat
    r = js(page, G + """
      g.setStartBiome(0); g.startRun();
      const bot = window.__makeBot(false);
      const count = () => { let n = 0; g.scene.traverse(() => n++); return n; };
      g.stepSim(20, 1/60, bot); g.render(1/60);
      const a = {objects: count(), geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, fx: document.querySelectorAll('#hud *, #fx *').length};
      for (let k = 0; k < 60; k++) { g.stepSim(1, 1/60, bot); g.render(1/60); if (g.state !== 'playing') g.startRun(); }
      const b = {objects: count(), geo: g.renderer.info.memory.geometries, tex: g.renderer.info.memory.textures, fx: document.querySelectorAll('#hud *, #fx *').length};
      return {a, b};
    """)
    a, b = r['a'], r['b']
    check('a minute of play does not grow the scene, the GPU memory or the HUD', b['objects'] <= a['objects'] + 60 and b['geo'] <= a['geo'] + 6 and b['tex'] <= a['tex'] + 4 and b['fx'] <= a['fx'] + 12, str(r))
    time.sleep(0.2)
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


# One run that ends with the bear catching the player, with `dist` metres on the clock.
RUN = V2.SETUP + 'g.reviveEnabled = false; g.distance = %d; window.__die(); return {state: g.state, score: g.result.score};'
BOARD_JS = """const rows = (id) => [...document.querySelectorAll('#' + id + ' li')].map((li) => li.classList.contains('empty') ? 'EMPTY' : [li.querySelector('.rank').textContent, li.querySelector('.name').textContent, +li.querySelector('.score').textContent, li.classList.contains('me')]);
  const server = () => JSON.parse(localStorage.getItem('brasovRunner.save.x.mockCloud') || '{}').scores || {};"""


def test_scoreboard(browser):
    print('\n[X] v3.1 shared leaderboard: account name, saved automatically, the same list for everybody')
    check = H.check
    others = {f'u-{i:02d}': {'name': f'Coleg {i}', 'score': 9000 - i * 500} for i in range(12)}  # 9000, 8500 ... 3500
    others['u-xss'] = {'name': '<img src=x onerror="window.__pwned=1">', 'score': 100}
    seed = {'brasovRunner.save.x.mockCloud': json.dumps({'saves': {}, 'scores': others})}

    # --- a guest: sees the class leaderboard, but his score stays in the Top 10 of his device
    page = V2.open_page(browser, '?debug&mockauth', init_storage=seed)
    page.evaluate(V2.DIE_JS)
    page.click('#btn-login-guest')
    page.wait_for_function("window.__scoreboard.status === 'ready'", timeout=15000)
    r = js(page, BOARD_JS + "return {title: document.getElementById('board-start-title').textContent, rows: rows('board-start'), note: document.getElementById('board-start-note').textContent};")
    check('a guest sees the shared leaderboard on the menu: the ten best, best first', r['title'] == 'Clasament' and len(r['rows']) == 10 and r['rows'][0] == ['1', 'Coleg 0', 9000, False] and r['rows'][9] == ['10', 'Coleg 9', 4500, False], str(r)[:300])
    check('...with a line that says his scores stay on the device until he signs in', 'invitat' in r['note'] and 'Conectează-te' in r['note'], r['note'])
    run = js(page, RUN % 2000)
    r = js(page, BOARD_JS + "return {form: !document.getElementById('name-form').hidden, title: document.getElementById('board-over-title').textContent, mine: Object.keys(server()).length};")
    check('a guest finishes a run: the name form and the Top 10 of the device, exactly as before', run['state'] == 'gameover' and r == {'form': True, 'title': 'Top 10', 'mine': 13}, f'{run} {r}')
    js(page, 'window.__game.submitName("Nutu"); window.__game.toMenu();')
    time.sleep(0.3)
    r = js(page, BOARD_JS + "return {server: Object.keys(server()).length, hasMe: Object.values(server()).some((x) => x.name === 'Nutu'), local: window.__meta.state.leaderboard.map((e) => e.name)};")
    check('...and nothing of a guest is written to the shared leaderboard', r == {'server': 13, 'hasMe': False, 'local': ['Nutu']}, str(r))

    # --- signing in: the best score of the device goes up under the ACCOUNT name
    page.click('#btn-account')
    page.click('#login-buttons [data-provider=google]')
    page.wait_for_function("window.__account.user && window.__account.status === 'synced'", timeout=15000)
    page.wait_for_function("window.__scoreboard.myRank > 0", timeout=15000)
    r = js(page, BOARD_JS + "return {me: server()['mock-google'], rows: rows('board-start'), note: document.getElementById('board-start-note').textContent, rank: window.__scoreboard.myRank};")
    guest_score = run['score']
    check('after signing in, the best score of the device is in the list under the account name (not the typed one)', r['me'] == {'name': 'Cont de test (Google)', 'score': guest_score} and r['rank'] == 13, str(r)[:400])
    check('his own row is shown under the top ten with its real place, highlighted', len(r['rows']) == 11 and r['rows'][10] == ['13', 'Cont de test (Google', guest_score, True], str(r['rows'][-2:]))
    check('the note says under which name he appears and where he is', 'Cont de test (Google' in r['note'] and 'locul 13' in r['note'], r['note'])

    # --- a better run: saved by itself, no name to type
    page.evaluate(V2.DIE_JS)
    run2 = js(page, RUN % 6100)
    page.wait_for_function("document.getElementById('over-note').textContent.includes('locul')", timeout=15000)
    r = js(page, BOARD_JS + """return {form: !document.getElementById('name-form').hidden, input: document.getElementById('name-input').offsetParent !== null, note: document.getElementById('over-note').textContent,
        title: document.getElementById('board-over-title').textContent, rows: rows('board-over'), me: server()['mock-google'], record: !document.getElementById('over-record').hidden};""")
    place = 1 + sum(1 for o in others.values() if o['score'] > run2['score'])
    check('signed in: a better score is saved automatically, with no name form', run2['state'] == 'gameover' and not r['form'] and not r['input'] and r['me'] == {'name': 'Cont de test (Google)', 'score': run2['score']}, str(r)[:300])
    check('...the game over screen says where he landed and shows the shared list with his row highlighted', f'locul {place}' in r['note'] and r['title'] == 'Clasament' and r['rows'][place - 1] == [str(place), 'Cont de test (Google', run2['score'], True] and r['record'], f"place {place}: {r['note']} {r['rows'][:place + 1]}")
    check('the name cannot be changed from the game: submitting another name does nothing', js(page, BOARD_JS + "window.__game.submitName('Hacker'); return [server()['mock-google'].name, window.__meta.state.leaderboard.some((e) => e.name === 'Hacker')];") == ['Cont de test (Google)', False])

    # --- a worse run does not replace the record
    js(page, 'window.__game.toMenu();')
    run3 = js(page, RUN % 3000)
    page.wait_for_function("document.getElementById('over-note').textContent.includes('rămâne')", timeout=15000)
    r = js(page, BOARD_JS + "return {note: document.getElementById('over-note').textContent, me: server()['mock-google'].score, record: !document.getElementById('over-record').hidden};")
    check('a worse run keeps the record (and says so)', run3['score'] < run2['score'] and r['me'] == run2['score'] and str(run2['score']) in r['note'] and not r['record'], str(r))

    # --- offline: nothing breaks; the score goes up when the connection is back
    js(page, 'window.__game.toMenu();')
    page.context.set_offline(True)
    run4 = js(page, RUN % 12000)
    page.wait_for_function("document.getElementById('over-note').textContent.includes('conexiune')", timeout=15000)
    r = js(page, BOARD_JS + "return {me: server()['mock-google'].score, state: window.__game.state};")
    check('offline: the run ends normally, the score waits on the device', r == {'me': run2['score'], 'state': 'gameover'}, str(r))
    js(page, 'window.__game.toMenu();')
    page.context.set_offline(False)
    page.evaluate("window.dispatchEvent(new Event('online'))")
    page.wait_for_function(f"JSON.parse(localStorage.getItem('brasovRunner.save.x.mockCloud')).scores['mock-google'].score === {run4['score']}", timeout=15000)
    time.sleep(0.3)
    r = js(page, BOARD_JS + "return {rows: rows('board-start'), rank: window.__scoreboard.myRank};")
    check('back online: the best score is sent and he is first', r['rank'] == 1 and r['rows'][0] == ['1', 'Cont de test (Google', run4['score'], True], str(r)[:300])

    # --- names from the server are shown as text, never as markup
    r = js(page, "window.__scoreboard.minGap = 0; return window.__scoreboard.refresh(true).then(() => ({imgs: document.querySelectorAll('.board img').length, pwned: window.__pwned === 1, names: window.__scoreboard.rows.map((x) => x.name).filter((n) => n.includes('img'))}));")
    check('a name with markup in the list is plain text (and cut to 20 characters)', r['imgs'] == 0 and not r['pwned'] and r['names'] == ['img src=x onerror="w'], str(r))

    # --- signing out: back to a guest, the list stays readable, the local Top 10 of the guest slot is back
    page.click('#btn-account')
    page.click('#btn-logout')
    page.wait_for_function('!window.__account.user', timeout=15000)
    time.sleep(0.4)
    r = js(page, BOARD_JS + "return {title: document.getElementById('board-start-title').textContent, first: rows('board-start')[0], note: document.getElementById('board-start-note').textContent, anyMe: rows('board-start').some((x) => x[3])};")
    check('signed out: still the shared list, nobody highlighted, the guest note again', r['title'] == 'Clasament' and r['first'][1] == 'Cont de test (Google' and not r['anyMe'] and 'invitat' in r['note'], str(r)[:300])
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()

    # --- without a server (?noauth) nothing changes: the local Top 10
    page = V2.open_page(browser, '?debug&noauth')
    r = js(page, "return {title: document.getElementById('board-start-title').textContent, note: document.getElementById('board-start-note').hidden, off: window.__scoreboard.status};")
    check('without a server the menu shows the Top 10 of the device, as before', r == {'title': 'Top 10', 'note': True, 'off': 'off'}, str(r))
    page.context.close()
