# Brașov Runner (v3)

Brașov-themed endless runner (Subway Surfers style) for a university project, with 5 levels (Poiana Brașov slope, Strada Republicii, Pietonala Tractorul, AFI Brașov mall, Lacul Noua). Vite + vanilla JS + Three.js, installable PWA, optional Android APK through Capacitor. No external assets: every model, texture and sound is built from code.

v2 added a meta game on top of the v1 runner: two more power-ups, a second (premium) currency, missions, a battle pass, skins / trails / emoji, revive ("Continui?") through a mock ad or crowns, one versioned save module. All in-game text is Romanian; code and comments are English.

## Commands
- `npm run dev` (add `-- --host` or use `npm run dev:host` to test on a phone on the same Wi-Fi)
- `npm run icons` draws the PWA icons into `public/icons` (pure Node, `scripts/make-icons.mjs`)
- `npm run build` then `npm run preview`
- `npm test` runs the unit tests (node:test, no extra dependencies)
- Browser tests (need `pip install playwright`, and `npm run build && npm run preview -- --port 4173` running):
  `python3 tests/browser/game_tests.py [filter ...]` (v1 checks + `v2_tests.py`); `python3 tests/browser/sw_update_test.py` (rebuilds the game, own server on 4175)
- `npm run build:capacitor` builds without the service worker; `npm run android:init` / `android:sync` drive Capacitor (the `android/` folder is generated, not committed)

## Architecture
- `src/config.js`: ALL tuning numbers (speed curve, jump, bear timings, generator spacing, obstacle collision boxes)
- `src/logic/*`: pure game logic with no 3D or DOM, covered by `tests/*.test.js`
  - `generator.js` pattern-based obstacle/coin generator. Guarantees every row is passable (see `advanceReach`)
  - `bear.js` bear state machine (none -> chasing 5 s -> leaving -> none, or caught)
  - `powerups.js` the 5 power-ups: timers, shield hit and the clock's time scale (`PowerUps`), when they appear (`PowerUpSchedule`), jetpack sky coin trail (`SkyTrail`), the rare crown item (`CrownSchedule`)
  - `collision.js` swept collision (no tunneling), `playerState.js` movement, `leaderboard.js`, `speed.js`
  - `biomes.js` the 5 levels: obstacle models per generator cell, ride (snowboard/skate/bike/boat), bear style (`bear`: unicycle/hydro, else run/swim); `movingS()` for moving obstacles
- `src/view/*`: Three.js visuals only (world, player, bear, obstacles with pooling, power-up models, particles, portal `gateView.js`)
  - `view/scenery/*.js` one scenery class per level (extends `Scenery` in `common.js`); `world.js` builds all of them at start-up and shows one
  - `view/obstacles/*.js` obstacle models of levels 2-5 and the `person()` helper
- `src/game.js`: loop, states (menu/playing/paused/dying/revive/gameover), simulation in 1/120 s substeps
- `src/ui.js`, `src/input.js`, `src/audio.js`, `src/main.js`
- v2 meta game, all pure logic in `src/logic/` with injected storage and clock:
  - `save.js` the ONLY module that touches localStorage: one JSON document, `SAVE_VERSION`, `MIGRATIONS`, `sanitizeState`, backup / corrupt / memory fallbacks
  - `economy.js` wallet (coins + crowns), `cosmetics.js` catalog and ownership, `missions.js` daily / weekly / per-run missions, `battlepass.js` season, tiers and rewards, `revive.js` the "Continui?" state machine, `dates.js` local-date helpers
  - `meta.js` the facade (`Meta`): the only code that changes those parts of the state; every method saves and is idempotent
- `src/ads/adProvider.js`: `AdProvider` interface + `MockAdProvider` / `MockAdSession` (no network, no SDK)
- `src/view/skins/`: `kit.js` (`SkinKit`: per-skin geometries and materials with `dispose`), `boySkins.js`, `bearSkins.js`
- `src/ui/metaScreens.js` (Misiuni, Pass, Garderobă), `src/ui/dom.js` (`h`, `onTap`), `src/pwa.js` (service worker + install)

## Rules for changes
- Work in small steps; run `npm test` and `npm run build` after each step and fix errors before continuing.
- Keep gameplay numbers in `config.js`, not scattered in the code.
- Obstacle visuals must match their collision box in `config.js` (what you see is what you hit).
- Never create geometries/materials per frame or per obstacle: use the pools and the cached helpers in `view/materials.js`.
- Slide obstacles (the `...L`/`...R` pairs: `branchL`/`branchR`, `awningL`/`awningR`, ...) exist only on the left/right lane, and every slide row has an obstacle in the middle lane (tested in `generator.test.js`). Never put a SLIDE cell in lane 1.
- Obstacle meshes are pooled and the hit animation changes their position/scale/rotation: `ObstaclePool.acquire` must reset all of it (regression test in `tests/pool.test.js`).
- Scenery (trees, ground slabs, banks, poles, hills) is placed with `wrapRel(base, distance, ...)` every frame. Never move scenery incrementally ("if behind, add span"): after a restart the distance jumps back to 0 and incremental scenery is lost (old bug: trees vanished after the first death).
- Power-ups: no timer in the HUD (user request). The prop on the character blinks during the last `power.warnTime` seconds instead.
- Jetpack: collisions are skipped while flying and until `landGrace` ends; the generator keeps the predicted landing zone free (`ensure(..., {clear})`).
- Player names are rendered with `textContent` only (never `innerHTML`).
- Open the game with `?debug` to get `window.__game` (used by the browser tests).
- Levels: every level uses the SAME generator; only the models change (`BIOMES`). Each obstacle type keeps the same kind of collision box (see `config.js`). A transition is requested after `CFG.biome.duration` s; the generator leaves an empty zone around the gate and the switch happens when the player crosses `gateS` (hidden by the white warp). Obstacles of the next level stay invisible until then.
- Moving obstacles (`OBSTACLES[type].move`): position `s = rowS + k (rowS - d)` capped at `rowS + run`; collision is tested around `rowS` scaled by `1/(1+k)`. The generator reserves their lane (`reserved`) so nothing else is in their path (tested).
- Magnet: pulled coins move RELATIVE to the player (`c.rel`) and are always collected (old bug: a coin trailing behind forever at top speed).
- Obstacle models are compacted (`compactModel`): static parts merged per material. Anything animated must live in a group with `userData.dynamic = true` (or a mesh with `userData.keep = true`).
- Scenery recyclers inside one level must keep the same `span` when objects must not overlap (e.g. the cabin and the trees).
- AFI shop fronts use the names of real AFI Brașov tenants written in a plain font (no logos); each shop has a `theme` that picks the window drawing (`THEMES` in `scenery/afi.js`).
- Riding bear (`bearView.js`, modes 'unicycle'/'hydro'): it rides at `CFG.bear.riderDistance` and the game raises the camera while it chases (`camChase` in `game.js`) so the vehicle is visible without hiding the boy.

## Rules added in v2
- Persistence: nothing outside `logic/save.js` may call localStorage. New persistent data = a new section of the save document + its `sanitizeX` + (if the shape of old data changes) a bump of `SAVE_VERSION` and a step in `MIGRATIONS`. Never trust stored data: everything goes through `sanitizeState`.
- State changes of the meta game go through `Meta` methods only. They start with `_fresh()` (pick up a save of another tab) and end with `store.save()`. They must stay idempotent: a second call (double tap) returns null / `{ok: false}` and changes nothing.
- Time: logic never calls `new Date()` itself; `now` is passed in. Missions and the pass reset by LOCAL calendar date (`dates.js`), never by "24 h later". A date that moved back never grants anything and never blocks progress (`missions.sync`, `battlepass.sync`). `meta.sync()` is not called in the middle of a run.
- Economy honesty (user requirement): no real-money payment and no payment form, nothing pay-to-win (everything in the shop and the pass is cosmetic; the only other use of crowns is the revive, limited to 3 per run and also available for a mock ad), no pressure timers (the revive offer has no countdown), nothing earned is lost at a reset (auto-claim), every pass item can also be bought in the shop. Tests assert that a free player can afford the next premium pass.
- Ads: the game talks only to the `AdProvider` interface. Do not add a real ad network or any tracking. The reward is given only for `completed === true`; `ReviveSession` tokens make late / duplicate answers harmless.
- Bear rule and "always a way" are untouched by v2: the shield only removes one hit (`PowerUps.absorbHit`), the clock scales game time (`PowerUps.stepTimeScale`) while `bear.update` gets REAL time, and a revive clears already-generated obstacles (the generator itself is not changed).
- Time scale: in `Game.simStep(realH)`, `h = realH * timeScale` is game time. Everything uses `h` except the bear and the clock's own timer. The jetpack timer is in game time on purpose (a flight covers a fixed distance, so the landing zone stays right).
- Items on the track: at most one pending at a time (`generator.pendingPower`); the crown (`'crown'`) travels through the same pickup path but is not a power-up (`Game.applyPickup`).
- Skins: the body is shared; a skin recolors the view-owned materials and adds extras through its `SkinKit` (never through the global `mat()` / `geo()` caches). Extras attach only to torso / head / arms (boy) or to both bear bodies, never to rides, vehicles or the per-mode outfits, so every skin works on every ride / mode. Parts on the boy's back go in `noJet`. `setSkin` must dispose the previous kit (`tests/skins.test.js` counts live resources).
- Draw calls: new multi-part models go through `compactModel` / `SkinKit.compact` (merge per material). Animated parts live in a group with `userData.dynamic = true`. Transparent effects carry `userData.noShadow`.
- Runs: `Game.closeRun()` hands a run to `Meta` exactly once; currencies are banked incrementally (`bankRun`) at the revive offer, at run end and whenever the app is hidden. An abandoned run reports `runs: 0`.
- UI: Romanian text, `textContent` only, buttons through `onTap` (guards double taps on the same button or the same spot of the screen). Update of the PWA is never applied during a run (`registerType: 'prompt'`, offered on a menu).
- Browser tests use the debug hooks exposed with `?debug`: `__game`, `__meta`, `__store`, `__screens`, `__ads`.

## Rules added in v2.1 (accounts, pass)
- Accounts: `src/cloud/account.js` holds ALL the decisions (pure, injected `AuthProvider` + `CloudStore`); `firebaseCloud.js` and `mockCloud.js` only implement those two interfaces. Do not put sync logic in the Firebase file (it cannot be unit-tested).
- Save slots: guest = `brasovRunner.save`, account = `brasovRunner.save.u.<id>` (`store.switchProfile`). Signing in or out switches slots, never merges. First sign-in of an account with no cloud save copies the guest slot into it. Between two copies of one account the higher `state.sync.rev` wins (`rev` goes up by one per real change, in `save.js`).
- Never switch slots during a run: `Account.canSwitch` is false unless the game is on the menu; pending changes are applied by `account.resume()` (called from `onMenuShown`).
- Cloud documents are untrusted like every stored value: they only enter through `store.adopt` (-> `sanitizeState`).
- Login is Google + guest only (Apple needs a paid developer account; its code stays in `firebaseCloud.js`, add `'apple'` to `LOGIN_PROVIDERS` to use it). `FIREBASE_CONFIG` points at the real Firebase project; with it set to `null` (and without `?mockauth`) there is no login UI and nothing is fetched. `?mockauth` uses a fake Google account for the tests and for demos.
- Battle pass: only TWO skins per season, on the LAST tier of each track (free: `boy/schior`, premium: one bear skin). Asserted in `tests/battlepass.test.js`; other tiers may hold coins, crowns, trails, emoji.
- Pass animations are CSS only (plus `MetaScreens.burst` confetti in `#fx`, removed after 0.9 s) and are switched off under `prefers-reduced-motion`.

## Rules added in v3 (graphics, animation, feel, sound)
- v3 is presentation and feel only. Collision boxes, jump, slide, speed curve, generator, bear rule, economy and save format are the same as v2.
- Seams (keep the interfaces documented at the top of each file): `view/cameraRig.js` (`CameraRig`: springs, roll, kicks, shake), `view/fx.js` (`GameFx`: every one-shot effect and the ambient life; draws through `view/fx/layer.js`, ONE instanced mesh per blend mode), `view/post.js` (`PostFx`: bloom + grade + vignette; game.js never calls `renderer.render` itself). `Game.emit(event, data)` is the only way gameplay tells them (and the character animation, through `o.events`) what happened; the event list is in `view/fx.js`.
- `renderer.info.autoReset` is false and `Game.render` resets it, so `renderer.info.render.calls` counts ALL passes of a frame (the performance test relies on it).
- Quality: `Game.applyQuality` forwards the level to `fx.setQuality` and `post.setQuality`. Level >= 2 bypasses post-processing completely and must stay close to the same brightness. New visual work must be cheaper at level >= 2.
- Bloom is selective (HDR or bright saturated pixels): things that should glow use emissive / `toneMapped: false` colors above 1. Never make large white surfaces HDR (level 1 is a ski slope).
- Sky, sun, fog and light per level live in the `env` object of each scenery file (`env.sky`); the sky dome is `view/gfx/sky.js`, surface shaders (water, snow sparkle, glossy floor) are `onBeforeCompile` patches in `view/gfx/patches.js` so fog and shadows keep working.
- Character animation (`playerView.js`, `bearView.js`) is procedural: damped springs kicked by events. The pose must keep matching the hitbox (standing ~1.75, sliding ~0.7). Skins are untouched by animation code.
- Lane change is a critically damped spring (`CFG.lane`), tested in `tests/lane.test.js`: within 0.3 of the lane in <= `CFG.gen.laneTime`, one smooth speed hump, no visible overshoot. The owner found the snappy v3.0 version (overshoot, camera wobble) abrupt; v3.2 softened it (~0.15 s). Never slower than `gen.laneTime`: the generator's "always a way" guarantee assumes it.
- v3.2: "La limită!" (near misses), coin streaks and the extra coin-pickup effect (ring, flash, pink/purple sparkles) were REMOVED at the owner's request. Score = distance + coins. Do not bring them back. (The `nearMiss` / `combo` sound recipes, `ui.popup` / `ui.setCombo` and the `#combo` element are unused leftovers.)
- Hit stop (`CFG.feel.hitStop`) freezes the real-time loop only (`Game.frame`); `stepSim` is not affected.
- Sound: `src/audio/` (`synth.js` recipes, `music.js` generative music per level, `mixer.js` buses + limiter, `lab.js` offline analysis under `?debug`). Nobody can listen in CI: `python3 scripts/audio_check.py` renders every effect and every level's music offline and checks peak / RMS / NaN / clipping / voice leaks. Music has its own switch (`settings.music`), separate from `settings.muted`.
- UI additions: `ui.popup`, `ui.setCombo`, `ui.showHints` / `hideHints`, `ui.setMusic`; all DOM writes only when a value changes (they are called every frame).
- `scripts/shot.py` takes screenshots of any level / action as frame bursts with the game stepped deterministically; use it to LOOK at visual changes. It and the browser tests share a lock (one software-rendered browser at a time). `BR_PORT` selects the preview port.

## Rules added in v3.1 (shared leaderboard)
- `src/cloud/scoreboard.js` (`Scoreboard`) holds all the decisions, like `account.js`; the server is two more methods of the cloud interface (`topScores`, `submitScore`), implemented by `firebaseCloud.js` (collection `scores/{uid}` = {name, score, updatedAt}) and by `mockCloud.js`. Unit tests: `tests/scoreboard.test.js`; browser: `[X]` in `tests/browser/v3_tests.py` (with `?mockauth`).
- One row per ACCOUNT: its best score under the account's name. The name is never typed or editable in the game (the Firestore rules require `name == request.auth.token.name`), only a higher score replaces the row, guests never write. Never put the e-mail address in a name (the list is public).
- Signed in: `Game.finishRun` saves the score by itself (`d.auto`, no name form) and `onAccountScore` sends it; guests keep the local Top 10 with the name form. Runs played offline reach the server later through `Scoreboard.sync()` (it sends the best LOCAL score when it is higher than the server's).
- UI: `ui.setGlobalBoard(b | null)` replaces the local lists (menu always; game over only when signed in); `renderBoard` remembers the local list so it comes back when the shared one goes away. Names from the server are untrusted: `boardName()` + `textContent`.
- If the list cannot be loaded (offline, rules not published), the game silently shows the local Top 10 plus a short note. Nothing about the leaderboard may block or break a run.
- The Firestore rules live in README ("Conturi"); when the `scores` document shape changes, change the rules there AND in the Firebase console.

## Rules added in v3.3 (owner feedback after play-testing)
- Camera on a lane change: it only glides sideways after the boy (`CameraRig.sx`, critically damped). No lead, no banking, no change of view direction: the owner found every version of those shaky. Do not add them back.
- Every standing/riding level has a jump trick: skateboard kickflip (`flipA`), snowboard 360 with a grab (`spinA`, the whole root turns; two turns on a super jump) and bike barspin (`barA` turns `bikeSteer`, the handlebar + fork + front wheel; a backflip was tried and the owner found it too much). The angle reaches a whole turn before the landing and is finished quickly if he lands early.
- v3.3.2: on Lacul Noua the buoy lines run between the lanes AND on both outer edges (`edge` in `noua.js`), so all three lanes are marked.
