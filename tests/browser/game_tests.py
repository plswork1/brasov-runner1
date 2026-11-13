"""
End-to-end browser tests for Brașov Runner (optional, for developers).

What it does
  * loads the built game in headless Chromium (with ?debug so the test hooks are exposed)
  * plays complete runs with a bot and checks it is never hit (= every obstacle pattern is passable)
  * checks the bear rules (first hit, 5 s chase, escape, second hit = game over, grace period)
  * checks pause/resume, restart, leaderboard persistence/corruption, keyboard + swipe controls
  * v2: the two new power-ups, crowns, revive (ad / crowns), missions, battle pass, wardrobe and
    skins (every ride / bear mode, no GPU leak), the save module (blocked / full / corrupted
    storage, update from v1), layouts (desktop side bars, phone), edge cases and a performance budget

Changes to the v1 checks (everything else is unchanged):
  * the game text is Romanian now, so the game over title is searched for "urs" instead of "bear";
  * after the bear catches the player the "Continui?" (revive) offer comes first, so the three
    places that waited for the game over screen now decline the offer first ("Nu, mulțumesc");
  * the bot uses the five power-ups (and the crown item) instead of three;
  * the bot no longer jumps for an obstacle it has already passed (a bug of the bot itself that made
    the "no hit" check fail about once in 4 full runs, also on v1: see the comment in BOT_JS).

How to run (from the project root, in two terminals):
  npm run build && npm run preview -- --port 4173
  pip install playwright && playwright install chromium
  python3 tests/browser/game_tests.py

The simulation runs without rendering (stepSim), so minutes of play take a second or two.
"""
import json
import os
import sys
import time
import types

from playwright.sync_api import sync_playwright

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import v2_tests  # noqa: E402  (the v2 test functions; they use the helpers of this file)
import v3_tests  # noqa: E402  (style, feel)

PORT = os.environ.get('BR_PORT', '4173')  # another port for a second copy of the game (git worktree)
BASE = f'http://localhost:{PORT}'
URL = BASE + '/?debug&noauth'
ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']

# ----------------------------------------------------------------------------------------------
# A bot that plays like a careful human: looks at the next obstacle rows, picks a lane that is
# reachable in time, changes lane only when the lane is clear, jumps/slides shortly before obstacles.
# It uses only public game state and the same input actions a player has (g.actions).
# ----------------------------------------------------------------------------------------------
BOT_JS = r"""
(jitter) => {
  const LANE_T = 0.23, RECOVER = 0.5;
  const ACT = ['none', 'jump', 'slide'];
  // Moving obstacles meet the player at their row (rowS); their effective depth is scaled by 1/(1+k)
  const hitS = (o) => (o.rowS ?? o.s);
  const halfD = (g, o) => { const d = g.defs[o.type]; return d.depth / 2 / (d.move ? 1 + d.move.k : 1); };
  function rowsAhead(g) {
    const map = new Map();
    for (const o of g.obstacles) {
      const s = hitS(o);
      if (o.ghost || s < g.distance - 0.5) continue;
      if (!map.has(s)) map.set(s, { s, cells: [0, 0, 0] });
      for (const l of o.lanes) map.get(s).cells[l + 1] = o.cell;
    }
    return [...map.values()].sort((a, b) => a.s - b.s).slice(0, 4);
  }
  function plan(g) {
    const d = g.distance, v = Math.max(g.speed, 1), rows = rowsAhead(g);
    function dfs(i, lane, act, tPrev) {
      if (i >= rows.length) return [];
      const row = rows[i], tRow = (row.s - d) / v, gap = Math.max(0, tRow - tPrev);
      const lanes = [0, 1, 2].sort((a, b) => Math.abs(a - lane) - Math.abs(b - lane));
      for (const L of lanes) {
        const cell = row.cells[L];
        if (cell === 3) continue;
        const need = ACT[cell];
        let cost = Math.abs(L - lane) * LANE_T;
        if (need !== 'none' && act !== 'none' && act !== need) cost += RECOVER;
        if (cost > gap + 1e-9) continue;
        const rest = dfs(i + 1, L, need, tRow);
        if (rest) return [L, ...rest];
      }
      return null;
    }
    return dfs(0, g.player.lane + 1, 'none', 0);
  }
  function laneClear(g, lane) {
    if (lane < -1 || lane > 1) return false;
    for (const o of g.obstacles) {
      if (o.ghost || !o.lanes.includes(lane)) continue;
      if (Math.abs(hitS(o) - g.distance) < halfD(g, o) + 1.3) return false;
    }
    return true;
  }
  const jt = 0.34 + (jitter ? (Math.random() - 0.5) * 0.24 : 0);
  const st = 0.30 + (jitter ? (Math.random() - 0.5) * 0.2 : 0);
  return function onStep(g) {
    const p = g.player;
    if (g.state !== 'playing') return;
    const path = plan(g);
    const target = path && path.length ? path[0] : p.lane + 1;
    if (target !== p.lane + 1) {
      const dir = Math.sign(target - (p.lane + 1));
      if (laneClear(g, p.lane) && laneClear(g, p.lane + dir)) (dir < 0 ? g.actions.left : g.actions.right)();
    }
    for (const o of g.obstacles) {
      if (o.ghost || !o.lanes.includes(p.lane)) continue;
      const t = (hitS(o) - g.distance) / Math.max(g.speed, 1);
      if (t < -0.2 || t > 1) continue;
      // v2 fix of the BOT (not of the game): only jump for an obstacle that is still ahead (t >= 0).
      // Right after a lane change the bot used to jump for the low obstacle it had just passed in
      // the new lane. Harmless with a normal jump, but with the super board (1 s in the air) it then
      // landed on the next row: about 1 run in 120 had such a hit, in the untouched v1 build too.
      if (o.cell === 1 && p.grounded && !p.sliding && t >= 0 && t <= jt) g.actions.jump();
      else if (o.cell === 2 && !p.sliding && t <= st) g.actions.slide();
    }
  };
}
"""

results = []


def check(name, cond, detail=''):
    results.append((name, bool(cond), detail))
    print(('  PASS  ' if cond else '  FAIL  ') + name + (f'   [{detail}]' if detail and not cond else ''))


def snap(page):
    return page.evaluate('window.__game.snapshot()')


def new_page(browser, w=1280, h=720, mobile=False, init_storage=None):
    ctx = browser.new_context(viewport={'width': w, 'height': h}, is_mobile=mobile, has_touch=mobile)
    page = ctx.new_page()
    page.errors = []
    page.on('pageerror', lambda e: page.errors.append(str(e)))
    page.on('console', lambda m: page.errors.append(m.text) if m.type == 'error' else None)
    if init_storage is not None:
        page.add_init_script(
            'try{ for (const [k,v] of Object.entries(%s)) localStorage.setItem(k,v) }catch(e){}' % json.dumps(init_storage)
        )
    page.goto(URL)
    page.wait_for_function('window.__game !== undefined', timeout=30000)
    return page


def freeze_loop(page):
    """Stop the real-time loop from advancing the sim while we step it by hand."""
    page.evaluate('window.__game.__advance = window.__game.advance; window.__game.advance = function(){}; window.__realAdvance = window.__game.__advance')
    # stepSim calls this.advance, so give it the real one again through a wrapper
    page.evaluate('window.__game.advance = window.__game.__advance')


# ----------------------------------------------------------------------------------------------
def test_bot_runs(browser):
    print('\n[1] Bot plays full runs: no obstacle pattern may ever be impossible')
    page = new_page(browser)
    page.evaluate('window.__makeBot = ' + BOT_JS)
    total_hits = 0
    worst = None
    runs = 30
    used = {'magnet': 0, 'board': 0, 'jetpack': 0, 'shield': 0, 'slowmo': 0, 'crown': 0}
    biomes_seen = set()
    for i in range(runs):
        res = page.evaluate(
            """([jitter, usePowers, start]) => {
              const g = window.__game;
              g.setStartBiome(start);
              g.startRun();
              const seen = new Set();
              const hits = [];
              const used = {magnet: 0, board: 0, jetpack: 0, shield: 0, slowmo: 0, crown: 0};
              const orig = g.onHit.bind(g);
              g.onHit = (o) => { hits.push({type:o.type, lanes:o.lanes, s:+o.s.toFixed(1), dist:+g.distance.toFixed(1), t:+g.runTime.toFixed(1), lane:g.player.lane, y:+g.player.y.toFixed(2), sliding:g.player.sliding, powers: {...g.powers.remaining}}); orig(o); };
              const bot = window.__makeBot(jitter);
              // In some runs every power-up that appears is used at once, so the bot plays whole runs
              // with the magnet, the super board, the jetpack (including the landings), the shield and
              // the slow-motion clock; the rare crown item is collected the same way.
              const step = (g) => {
                if (usePowers) for (const k of g.pickups) if (!k.taken) { k.taken = true; g.pickupPool.release(k.mesh); g.givePower(k.type); used[k.type]++; }
                // a new level every 50 s (instead of 5 minutes), so every run crosses several portals
                if (!g.transitionPending && g.runTime - g.biomeStart > 50) g.forceTransition();
                seen.add(g.biome);
                bot(g);
              };
              g.stepSim(240, 1/60, step);   // 4 simulated minutes per run
              g.onHit = orig;
              const s = g.snapshot();
              return {hits, used, seen: [...seen], state:s.state, runTime:s.runTime, speed:s.speed, score:s.score, coins:s.coins, bear:s.bear};
            }""",
            [i % 2 == 1, i % 3 != 0, i % 5],  # random timing every 2nd run, power-ups in 2 of 3, every start level
        )
        biomes_seen.update(res['seen'])
        for k in used: used[k] += res['used'][k]
        total_hits += len(res['hits'])
        if res['hits'] and worst is None:
            worst = (i, res['hits'][:3])
        if i == 0:
            print(f"      run 1: {res['runTime']:.0f}s survived, final speed {res['speed']:.1f} u/s, score {res['score']}, coins {res['coins']}")
    check(f'{runs} bot runs x 4 simulated minutes without a single hit (all 5 levels, portals every 50 s)', total_hits == 0, f'hits={total_hits}, first={worst}')
    check('the bot runs went through all 5 levels', biomes_seen == {0, 1, 2, 3, 4}, str(biomes_seen))
    print(f'      power-ups used by the bot: {used}')
    check('power-ups appear during normal runs (magnet, board, jetpack, shield and clock all used)', all(used[k] > 0 for k in ('magnet', 'board', 'jetpack', 'shield', 'slowmo')), str(used))
    check('magnet is the most common, then the board, then the jetpack (as in v1); the clock is the rarest', used['magnet'] > used['board'] > used['jetpack'] and used['slowmo'] <= used['jetpack'] and used['shield'] > used['slowmo'], str(used))
    check('the crown item (premium currency) is the rarest item: never more crowns than any power-up', 0 < used['crown'] <= min(used[k] for k in ('magnet', 'board', 'jetpack', 'shield', 'slowmo')), str(used))
    check('no JavaScript errors during the bot runs', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_trees_after_death(browser):
    """Regression: after dying once the trees beside the slope disappeared for good."""
    print('\n[1c] Scenery after dying and restarting')
    page = new_page(browser)
    r = page.evaluate("""() => {
      const g = window.__game;
      const out = [];
      for (let run = 0; run < 3; run++) {
        g.startRun();
        g.distance = 2500 + run * 1700;      // a long run...
        g.stepSim(0.1, 1/60); g.render(1/60);
        out.push({phase: 'long run', trees: g.world.visibleTreeCount(g.distance)});
        g.state = 'dying'; g.stepSim(2, 1/60); // ...that ends
        g.startRun();                        // restart: distance goes back to 0
        g.stepSim(0.5, 1/60); g.render(1/60);
        const slabUnder = g.world.active.slabs.list.some((sl) => sl.position.z + 30 > 0 && sl.position.z - 30 < 0);
        out.push({phase: 'restart', trees: g.world.visibleTreeCount(g.distance), slabUnder});
      }
      g.toMenu(); g.render(1/60);
      out.push({phase: 'menu', trees: g.world.visibleTreeCount(g.distance)});
      return out;
    }""")
    check('trees are there during a long run', all(x['trees'] >= 20 for x in r if x['phase'] == 'long run'), str(r))
    check('trees are still there after dying and restarting', all(x['trees'] >= 20 for x in r if x['phase'] != 'long run'), str(r))
    check('the snow ground is under the player after a restart', all(x.get('slabUnder', True) for x in r), str(r))
    page.context.close()


def test_powerups(browser):
    print('\n[1d] Power-ups: magnet, super board, jetpack')
    page = new_page(browser)
    G = 'const g = window.__game;'
    setup = G + """
      g.startRun(); g.generationEnabled = false; g.powerupsEnabled = false;
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      for (const c of g.coins) g.coinPool.release(c.mesh); g.coins.length = 0;
      g.stepSim(2.5, 1/60);
    """
    # picking up the item activates the power-up with the right duration
    r = page.evaluate("() => {" + setup + """
      const res = {};
      for (const [type, lane] of [['magnet', 0], ['board', 0], ['jetpack', 0]]) {
        g.powers.reset(); g.player.endFlight(); g.jetLanding = false; g.stepSim(1.5, 1/60);
        g.spawnPickup(type, lane, 12);
        g.stepSim(1.2, 1/60);
        res[type] = +g.powers.remaining[type].toFixed(2);
      }
      return res;
    }""")
    check('running into the magnet item activates it (15 s)', 13 < r['magnet'] <= 15, str(r))
    check('running into the board item activates it (10 s)', 8 < r['board'] <= 10, str(r))
    check('running into the jetpack item activates it (10 s)', 8 < r['jetpack'] <= 10, str(r))

    r = page.evaluate("() => {" + setup + """
      g.spawnPickup('magnet', 1, 12);           // item in ANOTHER lane is not collected
      g.stepSim(1.5, 1/60);
      const otherLane = g.powers.remaining.magnet;
      g.givePower('magnet');
      // coins in the left and right lanes (the player stays in the middle)
      for (let i = 0; i < 6; i++) { g._addCoin({lane: -1, s: g.distance + 8 + i * 2.3, y: 1}); g._addCoin({lane: 1, s: g.distance + 8 + i * 2.3, y: 1}); }
      const before = g.coinsCollected;
      g.stepSim(2, 1/60);
      const pulled = g.coinsCollected - before;
      g.stepSim(14, 1/60);                       // magnet over (15 s)
      const after = g.powers.remaining.magnet;
      for (let i = 0; i < 4; i++) g._addCoin({lane: 1, s: g.distance + 8 + i * 2.3, y: 1});
      const b2 = g.coinsCollected;
      g.stepSim(2, 1/60);
      return {otherLane, pulled, after, noMagnet: g.coinsCollected - b2, lane: g.player.lane};
    }""")
    check('an item in another lane is not picked up', r['otherLane'] == 0, str(r))
    check('magnet collects the coins of the left AND right lanes', r['pulled'] == 12, str(r))
    check('magnet lasts 15 s, then side-lane coins are no longer collected', r['after'] == 0 and r['noMagnet'] == 0, str(r))

    r = page.evaluate("() => {" + setup + """
      const res = {};
      for (const type of ['rock', 'snowman', 'snowball', 'stump', 'branchR', 'wideLog']) {
        g.givePower('board');                    // (re)activate: each obstacle gets a fresh board
        g.spawnDebug(type, 0, 30);
        g.stepSim(2.2, 1/60, (g) => { const o = g.obstacles.find(x => x.type === type && !x.done); if (o && g.player.grounded && ((o.rowS ?? o.s) - g.distance) / g.speed < 0.34) { g.actions.jump(); o.done = true; } });
        res[type] = g.bear.phase;
      }
      g.givePower('board');
      g.stepSim(9.6, 1/60);
      res.superJump = g.player.superJump;       // still on after 9.6 s
      g.stepSim(0.6, 1/60);
      res.after = g.player.superJump;           // off after 10 s
      g.stepSim(1.5, 1/60);
      g.spawnDebug('rock', 0, 30);
      g.stepSim(2, 1/60, (g) => { const o = g.obstacles.find(x => x.type === 'rock' && !x.ghost); if (o && g.player.grounded && ((o.rowS ?? o.s) - g.distance) / g.speed < 0.34) g.actions.jump(); });
      res.rockWithoutBoard = g.bear.phase;
      return res;
    }""")
    check('super board: jumps over rock, snowman, snowball, stump, bough and log without a hit',
          all(r[t] == 'none' for t in ['rock', 'snowman', 'snowball', 'stump', 'branchR', 'wideLog']), str(r))
    check('super board lasts 10 s', r['superJump'] is True and r['after'] is False, str(r))
    check('without the board a rock can not be jumped again', r['rockWithoutBoard'] == 'chasing', str(r))

    r = page.evaluate("() => {" + setup + """
      g.givePower('jetpack');
      g.stepSim(1.2, 1/60);
      const y = g.player.y;
      // a wall of rocks in every lane right under the flight path
      for (let i = 0; i < 6; i++) for (const lane of [-1, 0, 1]) g.spawnDebug('rock', lane, 20 + i * 14);
      g.actions.jump(); g.actions.slide();      // ignored while flying
      g.stepSim(5, 1/60);
      const midFlight = {bear: g.bear.phase, flying: g.player.flying, sliding: g.player.sliding};
      g.stepSim(4.2, 1/60);                      // 10 s total: jetpack runs out
      const landedT = (() => { let t = 0; while (!g.player.grounded && t < 3) { g.stepSim(1/60, 1/60); t += 1/60; } return t; })();
      return {y, midFlight, flying: g.player.flying, grounded: g.player.grounded, landedT, grace: g.powers.landGrace, state: g.state};
    }""")
    check('jetpack climbs high above the obstacles', r['y'] > 4.5, str(r))
    check('jetpack flies over a wall of rocks in every lane without a hit', r['midFlight']['bear'] == 'none' and r['midFlight']['flying'], str(r))
    check('jump/slide do nothing while flying', r['midFlight']['sliding'] is False, str(r))
    check('after 10 s the jetpack stops and the boy lands with a short protection', not r['flying'] and r['grounded'] and r['landedT'] < 1.2 and r['grace'] > 0, str(r))

    # jetpack in a real run: sky coins are collected, the landing zone is free, no hit
    page.evaluate('window.__makeBot = ' + BOT_JS)
    r = page.evaluate("""() => {
      const g = window.__game;
      const res = [];
      for (let k = 0; k < 6; k++) {
        g.startRun(); g.powerupsEnabled = false; g.generationEnabled = true;
        g.stepSim(20 + k * 15, 1/60, window.__makeBot(false));
        if (g.state !== 'playing') { res.push({skip: true}); continue; }
        const c0 = g.coinsCollected;
        g.givePower('jetpack');
        let hit = false;
        const orig = g.onHit.bind(g); g.onHit = (o) => { hit = true; orig(o); };
        const bot = window.__makeBot(false);
        g.stepSim(13, 1/60, (g) => {
          if (!g.player.flying && !g.jetLanding) { bot(g); return; }
          const sky = g.coins.filter(c => c.y > 4 && c.s > g.distance + 1).sort((a, b) => a.s - b.s)[0];
          if (sky && sky.lane !== g.player.lane && (sky.s - g.distance) < 10) g.actions[sky.lane < g.player.lane ? 'left' : 'right']();
        });
        g.onHit = orig;
        res.push({coins: g.coinsCollected - c0, hit, state: g.state});
      }
      return res;
    }""")
    ok = [x for x in r if not x.get('skip')]
    check('jetpack in real runs: no hit during the flight or the landing', len(ok) >= 4 and not any(x['hit'] for x in ok), str(r))
    check('jetpack: the coin trail in the sky is collected', all(x['coins'] >= 40 for x in ok), str(r))

    # No timer is shown for the power-ups
    r = page.evaluate("() => {" + setup + """
      g.givePower('magnet'); g.givePower('board'); g.givePower('jetpack');
      g.render(1/60);
      const visible = [...document.querySelectorAll('#hud *')].filter(e => e.offsetParent !== null).map(e => (e.id || e.className) + ':' + e.textContent.trim()).join(' | ');
      return {bearBarHidden: document.getElementById('bear-bar').hidden || getComputedStyle(document.getElementById('bear-bar')).display === 'none', visible};
    }""")
    check('no power-up timer on screen', r['bearBarHidden'] and not any(w in r['visible'].lower() for w in ['magnet', 'jetpack', 'board', 'power']), str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_map_after_hits(browser):
    """Regression: after hits and restarts the map must stay clean (no floating or shrunken obstacles)."""
    print('\n[1b] Map integrity after hits and restarts')
    page = new_page(browser)
    r = page.evaluate("""() => {
      const g = window.__game;
      const bad = [];
      let hits = 0, slideLanes = new Set(), midSlide = 0;
      const audit = (g) => {
        for (const o of g.obstacles) {
          if (o.ghost) continue;
          const m = o.mesh;
          if (m.position.y !== 0 || m.scale.x !== 1 || m.rotation.z !== 0) bad.push([o.type, m.position.y, m.scale.x, m.rotation.z]);
          if (o.cell === 2) { slideLanes.add(o.lanes[0]); if (o.lanes[0] === 0) midSlide++; }
        }
      };
      for (let run = 0; run < 6; run++) {
        g.startRun();
        // play without any input: it hits several obstacles, the bear shows up, the run ends; then restart
        let n = 0;
        while (g.state === 'playing' && n++ < 60 * 90) { g.stepSim(1/60, 1/60); g.syncEntities(1/60); audit(g); } // syncEntities plays the knock-away animation
        if (g.bear.phase !== 'none' || g.caught) hits++;
        g.stepSim(0, 1/60);
        g.state = 'dying'; g.stepSim(2, 1/60);
      }
      return { bad: bad.slice(0, 5), badCount: bad.length, hits, lanes: [...slideLanes].sort(), midSlide };
    }""")
    check('no floating/shrunken obstacles after hits and restarts', r['badCount'] == 0, str(r))
    check('the runs really had hits', r['hits'] >= 3, str(r))
    check('boughs appear only over the left/right lanes', r['midSlide'] == 0 and set(r['lanes']) <= {-1, 1}, str(r))
    page.context.close()


def test_bear_rules(browser):
    print('\n[2] Bear rules')
    page = new_page(browser)
    G = 'const g = window.__game;'
    setup = G + """
      g.startRun(); g.generationEnabled = false;
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      for (const c of g.coins) g.coinPool.release(c.mesh); g.coins.length = 0;
      g.stepSim(2.5, 1/60);                 // get up to speed
    """
    # --- first hit starts the chase and does NOT end the game
    r = page.evaluate("() => {" + setup + """
      const before = g.snapshot();
      g.spawnDebug('rock', 0, 12);
      let t = 0; while (g.bear.phase === 'none' && t < 5) { g.stepSim(1/60, 1/60); t += 1/60; }
      const atHit = g.snapshot();
      g.stepSim(1.2, 1/60);   // let the speed dip show
      return {before, atHit, after: g.snapshot(), slow: g.slow};
    }""")
    check('bear is not present before the first hit', r['before']['bear'] == 'none')
    check('first hit: game continues and the bear starts chasing', r['atHit']['state'] == 'playing' and r['atHit']['bear'] == 'chasing')
    check('chase timer starts at 5 seconds', abs(r['atHit']['bearRemaining'] - 5) < 0.05, str(r['atHit']['bearRemaining']))
    check('grace period right after the first hit', r['atHit']['invulnerable'] is True)
    page.evaluate("() => { const g = window.__game; }")

    # --- bear visible during the chase, hidden after
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('rock', 0, 12);
      while (g.bear.phase === 'none') g.stepSim(1/60, 1/60);
      const out = {};
      g.stepSim(1, 1/60); g.render(1/60);
      out.visibleDuring = g.bearView.root.visible;
      const rem1 = g.bear.remaining;
      g.stepSim(3.5, 1/60);
      out.remMid = g.bear.remaining;
      g.stepSim(1.4, 1/60);   // total ~5.9 s after the hit: survived the full 5 seconds
      out.phaseAfter5 = g.bear.phase;
      g.stepSim(1.6, 1/60); g.render(1/60);
      out.phaseLater = g.bear.phase;
      out.visibleLater = g.bearView.root.visible;
      out.state = g.state;
      // the next hit starts a NEW chase instead of ending the game
      g.spawnDebug('snowman', 0, 12);
      let n = 0; while (g.bear.phase === 'none' && n++ < 600) g.stepSim(1/60, 1/60);
      out.secondChase = g.bear.phase; out.stateAfterSecond = g.state; out.rem2 = g.bear.remaining;
      return out;
    }""")
    check('bear is visible while chasing', r['visibleDuring'] is True)
    check('timer counts down in game time (5 s minus ~4.5 s = ~0.5 s left)', 0.4 < r['remMid'] < 0.6, str(r['remMid']))
    check('surviving 5 seconds: bear is left behind and disappears', r['phaseLater'] == 'none' and r['visibleLater'] is False, str(r))
    check('game still running after escaping the bear', r['state'] == 'playing')
    check('a later hit starts a fresh 5 s chase (not game over)', r['secondChase'] == 'chasing' and r['stateAfterSecond'] == 'playing' and r['rem2'] > 4.8, str(r))

    # --- second hit during the chase = caught
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('rock', 0, 12);
      while (g.bear.phase === 'none') g.stepSim(1/60, 1/60);
      g.stepSim(1.6, 1/60);                     // past the grace period
      g.spawnDebug('stump', 0, 10);
      let n = 0; while (g.state === 'playing' && n++ < 1200) g.stepSim(1/60, 1/60);
      const dying = g.snapshot();
      // let the catch animation finish (advance only runs in playing/dying)
      let m = 0; while (g.state === 'dying' && m++ < 600) g.stepSim(1/60, 1/60);
      // v2: the "Continui?" offer comes before the game over screen; here it is declined
      const offer = {state: g.state, visible: !document.getElementById('screen-revive').hidden};
      g.declineRevive();
      return {dying, offer, final: g.snapshot(), overVisible: !document.getElementById('screen-over').hidden, title: document.getElementById('over-title').textContent};
    }""")
    check('second hit while the bear chases = caught (dying animation)', r['dying']['state'] == 'dying' and r['dying']['bear'] == 'caught', str(r['dying']))
    check('v2: after the catch animation the "Continui?" offer is shown', r['offer']['state'] == 'revive' and r['offer']['visible'], str(r['offer']))
    check('then (offer declined) the game over screen appears', r['final']['state'] == 'gameover' and r['overVisible'])
    check('game over message mentions the bear ("urs": the text is Romanian in v2)', 'urs' in r['title'].lower(), r['title'])

    # --- hits during the grace period are ignored (a cluster of obstacles is one hit)
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('rock', 0, 12); g.spawnDebug('rock', 0, 14.5); g.spawnDebug('snowman', 0, 16);
      g.stepSim(2.0, 1/60);
      return g.snapshot();
    }""")
    check('obstacles right after the first hit do not instantly catch the player', r['state'] == 'playing' and r['bear'] == 'chasing', str(r))

    # --- jumping/sliding avoids obstacles (no hit)
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('log', 0, 30);
      const lines = [];
      g.stepSim(3, 1/60, (g) => { const o = g.obstacles[0]; if (o && g.player.grounded && ((o.rowS ?? o.s) - g.distance) / g.speed < 0.34) g.actions.jump(); });
      const a = g.snapshot().bear;
      g.spawnDebug('branchR', 0, 30);
      g.stepSim(3, 1/60, (g) => { const o = g.obstacles.find(x => x.type === 'branchR'); if (o && !g.player.sliding && (o.s - g.distance) / g.speed < 0.3 && (o.s - g.distance) > -2) g.actions.slide(); });
      return {afterLog: a, afterGate: g.snapshot().bear};
    }""")
    check('jumping over a log: no hit', r['afterLog'] == 'none', str(r))
    check('sliding under a bough: no hit', r['afterGate'] == 'none', str(r))

    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('branchR', 0, 30);          // standing still must hit a bough
      g.stepSim(3, 1/60);
      return g.snapshot().bear;
    }""")
    check('standing in front of a bough: hit', r == 'chasing', str(r))
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('rock', 0, 30);          // a rock cannot be jumped
      g.stepSim(3, 1/60, (g) => { const o = g.obstacles[0]; if (o && g.player.grounded && ((o.rowS ?? o.s) - g.distance) / g.speed < 0.34) g.actions.jump(); });
      return g.snapshot().bear;
    }""")
    check('jumping over a rock does not work (must change lane)', r == 'chasing', str(r))
    r = page.evaluate("() => {" + setup + """
      g.spawnDebug('rock', 0, 30);
      g.actions.left();
      g.stepSim(3, 1/60);
      return g.snapshot();
    }""")
    check('changing lane avoids the rock', r['bear'] == 'none' and r['lane'] == -1, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_scoring_speed_coins(browser):
    print('\n[3] Speed, score, coins')
    page = new_page(browser)
    r = page.evaluate("""() => {
      const g = window.__game;
      g.startRun(); g.generationEnabled = false;
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      const speeds = [];
      for (let i = 0; i < 12; i++) { g.stepSim(10, 1/60); speeds.push(+g.speed.toFixed(2)); }
      const mono = speeds.every((v, i) => i === 0 || v >= speeds[i-1]);
      const s1 = g.snapshot();
      // coins: place coins in lane 0 right in front and collect them
      g.coins.length = 0;
      const before = g.coinsCollected;
      const scoreBefore = g.snapshot().score;
      const mesh1 = g.coinPool.acquire(); g.coins.push({lane:0, s:g.distance + 10, y:1.0, mesh:mesh1, spin:0});
      const mesh2 = g.coinPool.acquire(); g.coins.push({lane:1, s:g.distance + 12, y:1.0, mesh:mesh2, spin:0});
      g.stepSim(2, 1/60);
      const dist = g.distance;
      return {speeds, mono, s1, collected: g.coinsCollected - before, scoreGain: g.snapshot().score - scoreBefore, dist, coinsLeft: g.coins.length};
    }""")
    check('speed increases smoothly and monotonically over a 2 minute run', r['mono'], str(r['speeds']))
    check('speed stays below the maximum (36 u/s)', r['speeds'][-1] < 36.0001, str(r['speeds'][-1]))
    check('speed starts around 15 and has grown after 10 s', r['speeds'][0] > 15.5, str(r['speeds'][:3]))
    check('coin in the player lane is collected, coin in another lane is not', r['collected'] == 1, str(r['collected']))
    check('score includes the 10 point coin bonus', r['scoreGain'] >= 10, str(r['scoreGain']))
    page.context.close()


def test_pause_restart_soak(browser):
    print('\n[4] Pause, restart and long-run stability')
    page = new_page(browser)
    page.evaluate("""() => { const g = window.__game; g.startRun(); g.generationEnabled = false;
        for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0; g.stepSim(2.5, 1/60);
        g.spawnDebug('rock', 0, 12); }""")
    time.sleep(1.0)  # real-time loop is running: wait until the hit happened
    page.wait_for_function("window.__game.bear.phase === 'chasing' || window.__game.state !== 'playing'", timeout=15000)
    page.evaluate("window.__game.actions.pause()")
    a = snap(page)
    time.sleep(1.5)
    b = snap(page)
    check('pause freezes the game (distance and bear timer do not move)', a['state'] == 'paused' and a['distance'] == b['distance'] and a['bearRemaining'] == b['bearRemaining'], f'{a["bearRemaining"]} -> {b["bearRemaining"]}')
    page.keyboard.press('Escape')
    time.sleep(0.4)
    c = snap(page)
    check('Esc resumes the game', c['state'] == 'playing')
    page.evaluate("document.dispatchEvent(new Event('visibilitychange')); window.dispatchEvent(new Event('blur'))")
    check('losing focus pauses automatically', snap(page)['state'] == 'paused')
    page.evaluate("window.__game.resume()")

    # restart from the menu many times: nothing may pile up
    created = []
    for i in range(8):
        page.evaluate("() => { const g = window.__game; g.startRun(); g.stepSim(8, 1/60, (g) => { if (Math.random() < 0.01) g.actions.jump(); }); g.toMenu(); }")
        created.append(snap(page)['meshesCreated'])
    check('restart resets everything and the pools do not grow between runs', created[-1] == created[3] or created[-1] - created[3] <= 4, str(created))
    s = page.evaluate("() => { const g = window.__game; g.startRun(); return g.snapshot(); }")
    check('a new run starts clean (score 0, no bear, lane 0)', s['score'] == 0 and s['bear'] == 'none' and s['lane'] == 0 and s['coins'] == 0, str(s))

    # soak test: 20 simulated minutes of bot play, then check for leaks / NaNs
    page.evaluate('window.__makeBot = ' + BOT_JS)
    r = page.evaluate("""() => {
      const g = window.__game; g.startRun();
      const bot = window.__makeBot(true);
      // levels change every 60 s here; the first 6 minutes visit all 5 levels (warm-up: every model,
      // texture and pool is created once), then 14 more minutes must not create anything new
      const step = (g) => { if (!g.transitionPending && g.runTime - g.biomeStart > 60) g.forceTransition(); bot(g); };
      for (let k = 0; k < 6; k++) { g.stepSim(60, 1/60, step); g.render(1/60); }
      const g0 = g.snapshot();
      for (let k = 0; k < 14; k++) { g.stepSim(60, 1/60, step); g.render(1/60); }
      const s = g.snapshot();
      return {g0, s};
    }""")
    s0, s1 = r['g0'], r['s']
    check('20 minute soak: still playing', s1['state'] == 'playing', str(s1))
    check('20 minute soak: no NaN values', all(isinstance(s1[k], (int, float)) and s1[k] == s1[k] for k in ('distance', 'speed', 'score', 'x', 'y')))
    check('20 minute soak: mesh pool bounded (and stopped growing after the first round of levels)', s1['meshesCreated'] < 450 and s1['meshesCreated'] - s0['meshesCreated'] <= 12, f"{s0['meshesCreated']} -> {s1['meshesCreated']}")
    check('20 minute soak: GPU geometries/textures did not grow', s1['geometries'] <= s0['geometries'] + 6 and s1['textures'] <= s0['textures'] + 1, f'{s0["geometries"]}->{s1["geometries"]}, {s0["textures"]}->{s1["textures"]}')
    check('20 minute soak: went round all the levels', s1['biome'] in range(5), str(s1['biome']))
    check('20 minute soak: active entities stay bounded', s1['obstacles'] < 40 and s1['coinEntities'] < 150, str((s1['obstacles'], s1['coinEntities'])))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_ui_flow(browser):
    print('\n[5] UI flow: keyboard, game over, leaderboard, persistence')
    page = new_page(browser, 800, 450)
    check('start screen visible with the Top 10 list', page.is_visible('#screen-start') and page.is_visible('#board-start'))
    page.click('#btn-play', timeout=60000)
    time.sleep(0.4)
    check('Play starts the run and shows the HUD', snap(page)['state'] == 'playing' and page.is_visible('#hud'))
    page.keyboard.press('ArrowLeft')
    time.sleep(0.2)
    check('ArrowLeft changes lane', snap(page)['lane'] == -1)
    page.keyboard.press('d')
    page.keyboard.press('d')
    time.sleep(0.2)
    check('D moves right (clamped at the edge)', snap(page)['lane'] == 1)
    page.keyboard.press('ArrowUp')
    try:
        page.wait_for_function('window.__game.player.y > 0.2', timeout=3000)  # polled: headless GL runs at a low frame rate
        jumped = True
    except Exception:
        jumped = False
    check('ArrowUp jumps', jumped)
    page.evaluate('window.__game.stepSim(1, 1/60)')  # finish the jump (headless software GL renders only a few frames per second)
    # force a game over quickly: two hits
    page.evaluate("""() => { const g = window.__game; g.generationEnabled = false;
        for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
        g.player.moveLane(-1); g.player.moveLane(-1);
        g.spawnDebug('rock', g.player.lane, 8); }""")
    page.wait_for_function("window.__game.bear.phase === 'chasing'", timeout=15000)
    # wait in *game* time (not wall-clock) until the grace period is over but the chase is still on
    page.wait_for_function("window.__game.bear.remaining > 0 && window.__game.bear.remaining < 3.8", timeout=15000)
    page.evaluate("() => { const g = window.__game; g.spawnDebug('rock', g.player.lane, 8); }")
    # v2: the revive offer comes first; "Nu, mulțumesc" leads to the game over screen
    page.wait_for_selector('#screen-revive:not([hidden])', timeout=15000)
    check('v2: caught by the bear -> the "Continui?" screen with both options', page.is_visible('#btn-revive-ad') and page.is_visible('#btn-revive-crowns') and page.is_visible('#btn-revive-no'))
    page.click('#btn-revive-no')
    page.wait_for_selector('#screen-over:not([hidden])', timeout=15000)
    check('game over screen shows the score and the name form', page.is_visible('#name-form') and int(page.inner_text('#over-score')) >= 0)
    page.fill('#name-input', '  <img src=x onerror=alert(1)> Marius Druga Long Name ')
    page.click('#btn-save')
    time.sleep(0.2)
    names = page.eval_on_selector_all('#board-over .name', 'els => els.map(e => e.textContent)')
    check('name is saved, trimmed to 12 chars, with markup characters removed', len(names) == 1 and len(names[0]) <= 12 and '<' not in names[0], str(names))
    check('no HTML was injected into the page', page.eval_on_selector_all('#board-over img', 'els => els.length') == 0)
    check('the new entry is highlighted', page.eval_on_selector_all('#board-over li.me', 'els => els.length') == 1)
    page.reload()
    page.wait_for_function('window.__game !== undefined')
    time.sleep(0.5)
    names2 = page.eval_on_selector_all('#board-start .name', 'els => els.map(e => e.textContent)')
    check('leaderboard persists after reload', names2 == names, str((names, names2)))
    # Enter on the menu starts a run, Play Again works
    page.keyboard.press('Enter')
    time.sleep(0.3)
    check('Enter starts the game from the menu', snap(page)['state'] == 'playing')
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_storage_corruption(browser):
    print('\n[6] Corrupted storage')
    page = new_page(browser, init_storage={'winterRunner.leaderboard.v1': '{{{not json', 'winterRunner.muted': 'banana'})
    check('game loads with corrupted leaderboard data', page.is_visible('#screen-start') and not page.errors, '; '.join(page.errors[:3]))
    page.close()
    bad = json.dumps([None, 5, {'name': 'x'}, {'name': 'Ok', 'score': 123}, {'name': 'Neg', 'score': -1}])
    page = new_page(browser, init_storage={'winterRunner.leaderboard.v1': bad})
    names = page.eval_on_selector_all('#board-start .name', 'els => els.map(e => e.textContent)')
    check('invalid entries are ignored, valid ones are kept', names == ['Ok'], str(names))
    page.context.close()


def test_swipes_phone(browser):
    print('\n[7] Phone layout and swipe controls')
    page = new_page(browser, 390, 844, mobile=True)
    page.click('#btn-play')
    time.sleep(0.3)
    page.evaluate("() => { const g = window.__game; g.generationEnabled = false; for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0; }")
    box = page.locator('#game-canvas').bounding_box()
    cx, cy = box['x'] + box['width'] / 2, box['y'] + box['height'] * 0.6

    def swipe(dx, dy):
        page.mouse.move(cx, cy)
        page.mouse.down()
        page.mouse.move(cx + dx / 2, cy + dy / 2, steps=3)
        page.mouse.move(cx + dx, cy + dy, steps=3)
        page.mouse.up()
        time.sleep(0.25)

    swipe(-90, 0)
    check('swipe left changes lane left', snap(page)['lane'] == -1)
    swipe(90, 0)
    swipe(90, 0)
    check('two swipes right reach the right lane', snap(page)['lane'] == 1)
    swipe(0, -90)
    # watch inside the page for the first frames after the swipe (a Python sleep + round trip can miss a short jump on a loaded machine)
    page.evaluate('''() => { window.__jumped = false; const t0 = performance.now(); const f = () => { const p = window.__game.player; if (p.y > 0 || p.vy !== 0) window.__jumped = true; if (!window.__jumped && performance.now() - t0 < 1500) requestAnimationFrame(f); }; f(); }''')
    time.sleep(0.3)
    check('swipe up jumps', snap(page)['y'] > 0 or page.evaluate('window.__jumped'))
    time.sleep(0.9)
    swipe(0, 90)
    check('swipe down slides', page.evaluate('window.__game.player.sliding'))
    overflow = page.evaluate('[document.documentElement.scrollWidth <= innerWidth, document.documentElement.scrollHeight <= innerHeight]')
    check('page never scrolls horizontally or vertically', all(overflow), str(overflow))
    vp = page.evaluate("document.querySelector('meta[name=viewport]').content")
    check('viewport blocks pinch zoom', 'user-scalable=no' in vp and 'viewport-fit=cover' in vp)
    check('canvas fills the screen', abs(box['width'] - 390) < 1 and abs(box['height'] - 844) < 2, str(box))
    page.set_viewport_size({'width': 844, 'height': 390})
    time.sleep(0.5)
    check('phone in landscape: rotate hint shown and game paused', page.is_visible('#screen-rotate') and snap(page)['state'] in ('paused', 'dying', 'revive', 'gameover'))
    page.context.close()


def test_pwa(browser):
    print('\n[8] PWA')
    page = new_page(browser)
    mf = page.evaluate("fetch(document.querySelector('link[rel=manifest]').href).then(r => r.json())")
    check('manifest: name, fullscreen, portrait', mf['name'] == 'Brașov Runner' and mf['display'] == 'fullscreen' and mf['orientation'] == 'portrait', str(mf)[:200])
    sizes = sorted(i['sizes'] for i in mf['icons'])
    check('manifest: 192, 512 and maskable icons', sizes == ['192x192', '512x512', '512x512'] and any(i.get('purpose') == 'maskable' for i in mf['icons']))
    for icon in mf['icons']:
        ok = page.evaluate("(u) => fetch(u).then(r => r.ok)", page.url.split('?')[0] + icon['src'])
        check(f"icon {icon['src']} loads", ok)
    page.wait_for_function("navigator.serviceWorker.getRegistration().then(r => !!(r && (r.active || r.waiting || r.installing)))", timeout=15000)
    check('service worker registered', True)
    page.wait_for_function("navigator.serviceWorker.ready.then(() => true)", timeout=15000)
    time.sleep(2)
    keys = page.evaluate("caches.keys().then(async ks => { let n = 0; for (const k of ks) n += (await (await caches.open(k)).keys()).length; return n; })")
    check('files are cached for offline play', keys >= 8, str(keys))
    page.context.set_offline(True)
    page.reload()
    page.wait_for_function('window.__game !== undefined', timeout=20000)
    check('game loads with the network switched off', page.is_visible('#screen-start'))
    page.context.close()


def test_levels(browser):
    print('\n[L] Levels: picker, portal, empty track, new scenery/ride/obstacles, loop')
    page = new_page(browser)
    # level picker on the start screen
    chips = page.query_selector_all('#level-pick .level-chip')
    check('start screen has a picker with the 5 levels', len(chips) == 5, str(len(chips)))
    chips[3].click()
    s = snap(page)
    check('picking a level shows it in the menu background', s['biomeId'] == 'afi' and page.evaluate("document.querySelectorAll('#level-pick .level-chip.on').length") == 1, str(s['biomeId']))
    page.click('#btn-play')
    s = snap(page)
    check('the run starts in the chosen level', s['state'] == 'playing' and s['biomeId'] == 'afi', str(s['biomeId']))
    check('HUD shows the place', 'AFI' in page.inner_text('#hud-level'), page.inner_text('#hud-level'))
    page.evaluate("() => { const g = window.__game; g.toMenu(); }")
    page.click('#level-pick .level-chip >> nth=0')

    r = page.evaluate("""() => {
      const g = window.__game; g.startRun(); g.powerupsEnabled = false; g.checkCollisions = () => {};
      const out = [];
      for (let lvl = 0; lvl < 6; lvl++) {
        const from = g.biome;
        g.stepSim(12, 1/60);
        g.forceTransition();
        let n = 0;
        while (!g.transitions.length && n++ < 4000) g.stepSim(1/60, 1/60);
        const tr = g.transitions[0];
        if (!tr) { out.push({error: 'no portal'}); break; }
        // nothing that meets the player inside the empty stretch
        const inZone = g.obstacles.filter((o) => { const s = o.rowS ?? o.s; return s >= tr.from && s <= tr.to; }).length;
        const gateShown = g.gate.root.visible;
        // obstacles of the next level stay hidden until the switch
        g.render(1/60);
        const hiddenNext = g.obstacles.filter((o) => o.biome === tr.biome).every((o) => !o.mesh.visible);
        n = 0;
        while (g.transitions.length && n++ < 6000) g.stepSim(1/60, 1/60);
        g.stepSim(8, 1/60);
        g.render(1/60);
        const B = g.biomes[g.biome];
        const allowed = new Set([...B.jump, B.wide, ...B.slide, ...B.block, B.moving]);
        const ahead = g.obstacles.filter((o) => (o.rowS ?? o.s) > g.distance + 5);
        out.push({
          from, to: g.biome, inZone, gateShown, hiddenNext,
          ride: g.playerView.ride, wantRide: B.ride,
          worldId: g.world.biomeId, id: B.id,
          typesOk: ahead.every((o) => allowed.has(o.type)), nAhead: ahead.length,
          visibleOk: g.obstacles.filter((o) => o.mesh.visible).every((o) => o.biome === g.biome || o.ghost),
          title: document.getElementById('level-name').textContent,
          gateHidden: !g.gate.root.visible,
          state: g.state,
        });
      }
      return out;
    }""")
    ok = all('error' not in x for x in r) and len(r) == 6
    check('a portal appears after the time in a level (forced here), 6 times in a row', ok, str(r)[:300])
    if ok:
        check('order of the levels: Poiana -> Republicii -> Tractorul -> AFI -> Noua -> Poiana again', [x['to'] for x in r] == [1, 2, 3, 4, 0, 1], str([x['to'] for x in r]))
        check('no obstacle in the empty stretch around the portal', all(x['inZone'] == 0 for x in r), str([x['inZone'] for x in r]))
        check('the portal is visible ahead, then removed after crossing it', all(x['gateShown'] and x['gateHidden'] for x in r))
        check('obstacles of the next level are hidden until the portal', all(x['hiddenNext'] for x in r))
        check('after the portal: new scenery, new ride (snowboard / skateboard / pedal boat)', all(x['worldId'] == x['id'] and x['ride'] == x['wantRide'] for x in r), str([(x['worldId'], x['ride']) for x in r]))
        check('after the portal: only obstacles of the new level ahead', all(x['typesOk'] and x['nAhead'] >= 1 for x in r), str([(x['typesOk'], x['nAhead']) for x in r]))
        check('only obstacles of the current level are visible', all(x['visibleOk'] for x in r))
        check('the title card shows the new place', [x['title'] for x in r][:5] == ['Strada Republicii', 'Pietonala Tractorul', 'AFI Brașov', 'Lacul Noua', 'Poiana Brașov'], str([x['title'] for x in r]))

    # crossing the portal with the jetpack, and dying right before a portal, then restarting
    r = page.evaluate("""() => {
      const g = window.__game; g.setStartBiome(0); g.startRun(); g.powerupsEnabled = false;
      g.stepSim(10, 1/60); g.forceTransition();
      let n = 0; while (!g.transitions.length && n++ < 4000) g.stepSim(1/60, 1/60);
      g.givePower('jetpack');
      n = 0; while (g.transitions.length && n++ < 6000) g.stepSim(1/60, 1/60);
      g.stepSim(12, 1/60);
      const jet = {biome: g.biome, state: g.state, flying: g.player.flying, bear: g.bear.phase};
      // die just before the next portal
      g.forceTransition();
      n = 0; while (!g.transitions.length && n++ < 4000) g.stepSim(1/60, 1/60);
      g.generationEnabled = false;
      delete g.checkCollisions;                     // (switched off above: collisions back on)
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      g.bear.hit(); g.bear.graceLeft = 0;          // the bear is already chasing
      const tr = g.transitions[0];
      g.distance = tr.gateS - 3;
      g.spawnDebug(g.biomes[g.biome].block[0], g.player.lane, 1.5);
      g.stepSim(3, 1/60);
      g.declineRevive();                             // v2: "Continui?" -> no
      const dead = {state: g.state, biome: g.biome};
      g.generationEnabled = true;
      g.startRun();
      const again = {biome: g.biome, world: g.world.biomeId, ride: g.playerView.ride, transitions: g.transitions.length, gate: g.gate.root.visible};
      return {jet, dead, again};
    }""")
    check('jetpack through a portal: lands safely in the next level', r['jet']['biome'] == 1 and r['jet']['state'] == 'playing' and r['jet']['bear'] == 'none' and not r['jet']['flying'], str(r['jet']))
    check('caught by the bear right before a portal: game over, no level switch while dying', r['dead']['state'] == 'gameover' and r['dead']['biome'] == 1, str(r['dead']))
    check('restart after a portal: back in the start level, no portal left over', r['again']['biome'] == 0 and r['again']['world'] == 'partie' and r['again']['ride'] == 'snowboard' and r['again']['transitions'] == 0 and not r['again']['gate'], str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def test_moving_and_magnet(browser):
    print('\n[M] Moving obstacles (snowball, cyclists, cleaning machine, pedal boat) and the magnet fix')
    page = new_page(browser)
    r = page.evaluate("""() => {
      const g = window.__game;
      const out = {};
      g.biomes.forEach((B, i) => {
        const type = B.moving;
        const run = (dodge) => {
          g.setStartBiome(i); g.startRun(); g.powerupsEnabled = false; g.generationEnabled = false;
          for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
          g.stepSim(1, 1/60);
          const o = g.spawnDebug(type, 0, 30);       // meets the player 30 units ahead
          const s0 = o.s;
          g.stepSim(0.3, 1/60);
          const s1 = o.s;
          if (dodge) g.actions.left();
          g.stepSim(3, 1/60);
          return {s0, s1, bear: g.bear.phase, metAt: o.rowS};
        };
        const stay = run(false);
        const dodge = run(true);
        out[type] = {comes: stay.s1 < stay.s0 && stay.s0 > stay.metAt, startsFar: stay.s0 > stay.metAt + 5, hitIfStay: stay.bear === 'chasing', okIfDodge: dodge.bear === 'none'};
      });
      return out;
    }""")
    for t, v in r.items():
        check(f'{t}: comes toward the player, hits him if he stays, misses him if he changes lane', all(v.values()), str(v))

    r = page.evaluate("""() => {
      const g = window.__game;
      g.setStartBiome(0); g.startRun(); g.powerupsEnabled = false; g.generationEnabled = false;
      for (const o of g.obstacles) g.obstaclePool.release(o.mesh); g.obstacles.length = 0;
      for (const c of g.coins) g.coinPool.release(c.mesh); g.coins.length = 0;
      g.runTime = 600;                          // top speed: the old bug only happened when fast
      g.stepSim(1, 1/60);
      g.givePower('magnet');
      for (let i = 0; i < 8; i++) { g._addCoin({lane: -1, s: g.distance + 6 + i * 2.3, y: 1}); g._addCoin({lane: 1, s: g.distance + 6 + i * 2.3, y: 1}); }
      const before = g.coinsCollected;
      g.stepSim(2.5, 1/60);
      const got = g.coinsCollected - before;
      // coins pulled in the very last moment of the magnet must also arrive
      g.powers.remaining.magnet = 0.15;
      for (let i = 0; i < 4; i++) g._addCoin({lane: 1, s: g.distance + 12 + i * 1.5, y: 1});
      g.stepSim(3, 1/60);
      const stuck = g.coins.filter((c) => c.pull).length;
      const behind = g.coins.filter((c) => c.s < g.distance - 0.5 && c.s > g.distance - 14).length;
      return {speed: g.speed, got, stuck, behind, magnet: g.powers.remaining.magnet};
    }""")
    check('magnet at top speed: every coin of both side lanes is collected', r['got'] == 16, str(r))
    check('magnet runs out: no coin stays stuck behind the player following him', r['stuck'] == 0 and r['behind'] == 0 and r['magnet'] == 0, str(r))
    check('no JavaScript errors', not page.errors, '; '.join(page.errors[:3]))
    page.context.close()


def main():
    # one software-rendered browser at a time on this machine (the same lock as scripts/shot.py)
    import fcntl
    lock = open('/tmp/br-shot.lock', 'w')
    fcntl.flock(lock, fcntl.LOCK_EX)
    only = sys.argv[1:]
    with sync_playwright() as p:
        browser = p.chromium.launch(args=ARGS)
        tests = [test_levels, test_moving_and_magnet, test_bot_runs, test_trees_after_death, test_powerups, test_map_after_hits, test_bear_rules, test_scoring_speed_coins, test_pause_restart_soak, test_ui_flow, test_storage_corruption, test_swipes_phone, test_pwa]
        helpers = types.SimpleNamespace(check=check, snap=snap, new_page=new_page, BOT_JS=BOT_JS, BASE=BASE)
        tests += v2_tests.register(helpers)
        tests += v3_tests.register(helpers)
        for t in tests:
            if only and not any(o in t.__name__ for o in only):
                continue
            try:
                t(browser)
            except Exception as e:  # report the crash as a failure and keep going
                check(f'{t.__name__} crashed', False, repr(e)[:300])
        browser.close()
    failed = [r for r in results if not r[1]]
    print(f'\n{len(results) - len(failed)}/{len(results)} checks passed')
    for name, _, detail in failed:
        print('FAILED:', name, detail)
    sys.exit(1 if failed else 0)


if __name__ == '__main__':
    main()
