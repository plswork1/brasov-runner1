# Brașov Runner v2: auditul de buguri

Acest fișier rezumă verificarea făcută la finalul lucrului la v2: ce s-a testat, ce buguri au fost găsite și reparate și ce **nu** a putut fi verificat.

## Ce s-a rulat

| Suită | v1 (punct de plecare) | v2 |
|---|---|---|
| Teste unitare (`npm test`) | 70 / 70 | **165 / 165** |
| Teste de browser (`tests/browser/game_tests.py`, Chromium headless) | 119 / 119 | **285 / 285** |
| Actualizarea service worker-ului (`tests/browser/sw_update_test.py`) | nu exista | **8 / 8** |

Testele unitare noi acoperă: economia și catalogul (`economy.test.js`), misiunile și datele (`missions.test.js`), battle pass-ul (`battlepass.test.js`), „Continui?” și reclama simulată (`revive.test.js`), salvarea și fațada `Meta` (`save.test.js`), skinurile pe toate vehiculele și scurgerile de memorie (`skins.test.js`), abilitățile noi (`powerups.test.js`).

### Teste v1 modificate (și de ce)

| Test | Ce s-a schimbat | Motiv |
|---|---|---|
| `powerups.test.js`: „schedule: magnet ~1/min...” | intervalul mediu dintre obiecte: 25-40 s → 20-32 s; verificări în plus pentru scut și ceas | sunt 5 abilități în loc de 3, deci apare un obiect cam la 25 s în loc de 30 s. Ritmul celor 3 abilități vechi are aceleași limite ca în v1 |
| `leaderboard.test.js`: `sanitizeName` | numele implicit `'Player'` → `'Jucător'` | tot textul din joc este în română |
| browser: „game over message mentions the bear” | caută „urs” în loc de „bear” | textul este în română |
| browser: 3 locuri care așteptau ecranul de final după a doua lovitură | întâi refuză oferta „Continui?” | în v2 oferta de reluare apare înaintea ecranului de final |
| browser: botul și abilitățile | folosește cele 5 abilități și Coroana, nu doar 3 | abilități noi |
| browser: botul (`BOT_JS`) | sare doar pentru obstacole aflate încă în față (`t >= 0`) | bug al botului, prezent și în v1 (vezi mai jos) |

Niciun test v1 nu a fost șters.

## Buguri găsite și reparate

| # | Fișier | Bug | Cum a fost găsit |
|---|---|---|---|
| 1 | `src/config.js` (`pass.epoch`) | Luna de start a sezonului era greșită cu o lună (octombrie în loc de noiembrie): pass-ul arăta „mai sunt 4 zile” în prima săptămână. | captură de ecran a meniului; test de regresie adăugat |
| 2 | `src/logic/meta.js` (`endRun`) | O cursă abandonată (restart / meniu din pauză) era numărată drept cursă jucată, deci misiunea „Joacă 3 curse” se putea termina apăsând restart. | test de browser „restart din pauză” |
| 3 | `src/logic/meta.js` (`runXp`) | Fiecare restart dădea 10 XP pentru pass, fără să joci. | recitirea codului după bugul 2 |
| 4 | `src/ui/dom.js` (`onTap`) | Dublu-tap pe „Deblochează pista premium”: după primul tap butonul dispare, „Revendică tot” îi ia locul și al doilea tap îl apasă pe acesta. Protecția era pe buton; acum ține cont și de locul de pe ecran. | test de browser cu dublu-click |
| 5 | `src/ads/adProvider.js` (`MockAdSession.tick`) | Pe un dispozitiv lent (cadre rare), reclama de 5 s dura mult mai mult: fiecare pas număra cel mult 0,25 s. | prima rulare în browser (reclama nu se termina) |
| 6 | `src/ui.js`, `src/main.js` | Mesajul „Salvarea era deteriorată” dispărea după 3,6 s, uneori înainte să apuce să fie văzut (primele secunde după pornire pot sacada). Acum rămâne până îl închizi. | test de browser cu salvare coruptă |
| 7 | `src/game.js` (`updatePreviewCamera`) | În garderobă, la ferestre pătrate sau tablete, capul personajului ieșea din cadru (distanță fixă a camerei). | planșa cu capturi ale skinurilor |
| 8 | `src/game.js` (`syncEntities`) | În previzualizarea din garderobă, obstacolele și bănuții de pe pistă treceau prin fața camerei. | captură de ecran |
| 9 | `src/logic/save.js`, `src/logic/meta.js` | Două taburi: tabul aflat în cursă suprascria la final salvarea mai nouă a celuilalt; salvarea unui scor în Top 10 putea da portofelul înapoi. Acum fiecare modificare pornește de la starea cea mai nouă (`_fresh`). | recitirea codului; test unitar „two tabs” |
| 10 | `src/config.js` (`economy.crownRun`) | Coroana apărea pe pistă mai des decât cea mai rară abilitate (~24 pe oră), deci cursele deveneau sursa principală de monedă premium. Acum este cel mai rar obiect (~una la 5 minute). | test de browser cu botul |
| 11 | `src/view/powerupViews.js`, `src/view/playerView.js`, `src/view/skins/kit.js` | Modelele noi (scut, ceas, coroană, piesele skinurilor) adăugau până la ~80 de draw calls. Acum sunt unite pe material; totalul a revenit la nivelul v1. | testul de performanță (v1: 260-363, v2 înainte: până la 441, v2 după: 240-410 în cel mai rău caz) |
| 12 | `src/logic/battlepass.js`, `src/logic/meta.js` (`sync`) | După un ceas dat puțin înapoi, `sync` raporta „schimbat” la fiecare apel, deci jocul rescria salvarea la fiecare 30 s. | test unitar |
| 13 | `src/game.js` (`reviveWithAd`) | Dacă un furnizor de reclame își respingea promisiunea (un SDK real care aruncă o eroare), ecranul „Continui?” rămânea blocat. | recitirea codului |
| 14 | `src/ads/adProvider.js` | `remaining` rămânea 1,7e-15 în loc de 0 la finalul reclamei (eroare de rotunjire). | test unitar |
| 15 | `src/logic/missions.js` | Textul „Ia 4 abilități” se citea „la 4 abilități” în fontul jocului. Acum: „Culege”. | captură de ecran |
| 16 | `src/style.css` (`#bear-bar`) | Pe telefon, bara „Te urmărește ursul” acoperea cipurile cu bănuți, Coroane și viteză din HUD. Acum stă sub ele pe ecranele înguste. | captură de ecran pe 390×844 |

### Un bug vechi din teste, nu din joc

| Fișier | Bug | Cum a fost găsit |
|---|---|---|
| `tests/browser/game_tests.py` (botul) | Imediat după o schimbare de culoar, botul sărea pentru un obstacol jos pe care tocmai îl depășise. Cu săritura normală nu conta, dar cu placa de aur (1 s în aer) ateriza pe rândul următor. Verificarea „30 de curse fără nicio lovitură” pica astfel cam o dată la 4 rulări complete. **Se întâmpla la fel și pe v1 nemodificat**: 1 cursă din 120 atât pe v1, cât și pe v2. După reparație: 0 lovituri din 240 de curse. Jocul nu a fost modificat pentru asta. | a doua rulare completă a picat; am reprodus pe ambele versiuni cu jurnal al comenzilor |

Observații despre arhiva primită (nu sunt buguri de cod):
- Arhiva nu conținea `.github/workflows/pages.yml`, deși promptul spunea că există. A fost creat.
- Textele din joc erau în engleză („PLAY”, „Paused”, „The bear got you!”). Au fost traduse în română.

## Ce s-a verificat, pe scurt

- **Regula ursului și „există mereu o cale”:** botul joacă 30 de curse × 4 minute fără nicio lovitură, apoi încă 15 curse × 200 s cu abilitățile noi forțate tot timpul (ceas la câteva secunde, ceas + scut + placă, jetpack cu ceasul luat în aer), prin toate cele 5 niveluri.
- **„Continui?”:** preț 2 → 4 → 8, limită 3, cel mult 2 reclame, invulnerabilitate, pistă curățată, regula ursului de la zero; dublu-click, tab în fundal în timpul reclamei, restart și meniu în timpul reclamei, offline, pierderea conexiunii în timpul reclamei, aplicație închisă în timpul reclamei.
- **Economie:** misiuni, pass și garderobă prin butoanele reale, cu dublu-click peste tot; un jucător gratuit își permite pass-ul următor; nimic nu se plătește de două ori.
- **Skinuri:** 6 skinuri × 4 vehicule × ținută de iarnă / vară × 4 poziții; 3 skinuri de urs × 4 moduri; numărul de geometrii, texturi și shadere GPU este identic după 40 de ture complete; schimbare de skin în timpul cursei.
- **Salvare:** stocare blocată, plină, coruptă, coruptă cu copie de rezervă, editată de mână, venită din v1, venită dintr-o versiune mai nouă, două taburi.
- **Timp:** miezul nopții în timpul cursei, aplicație lăsată deschisă, ceas dat înapoi și apoi înainte, sezon nou, zile cu 23 / 25 de ore.
- **Layout și comenzi:** 1280×720, 1920×1080, 1024×768 (bare laterale), 390×844, 320×568, 768×1024 (o coloană), redimensionare în timpul cursei, rotirea telefonului, mouse, gamepad simulat.
- **PWA:** manifest, iconițe, cache, pornire offline, actualizare fără reîncărcare în timpul cursei și fără pierderea progresului.
- **Performanță** (telefon simulat 390×844, cel mai rău caz: urs + 3 abilități + skin + skin de urs + trail): 240-410 draw calls, 30-77 de mii de triunghiuri, simularea sub 0,03 ms pe cadru, hartă de umbre de 1024 px, cel mult 260 de particule; calitatea adaptivă coboară singură rezoluția, particulele și umbrele.

## Ce NU a putut fi verificat

1. **APK-ul Android.** Mediul de lucru nu are Android SDK și nu poate descărca Gradle. Au fost verificate doar build-ul web pentru Capacitor, `npx cap add android`, `npx cap sync` și scriptul de iconițe. APK-ul **nu a fost construit și nu a fost rulat pe niciun telefon**. Nici workflow-ul `android.yml` nu a fost rulat pe GitHub.
2. **Publicarea pe GitHub.** Nu a existat acces la un cont GitHub, deci repo-ul nu a fost creat, iar workflow-ul `pages.yml` nu a rulat niciodată. Fișierele sunt pregătite; pașii sunt în README și în raport.
3. **Dispozitive reale.** Totul a rulat în Chromium headless, cu randare software. Nu au fost testate: un telefon Android sau un iPhone real, Safari (iOS / macOS), Firefox, instalarea reală a PWA-ului pe ecranul principal, comportamentul la apel telefonic sau la economisirea bateriei.
4. **Fluiditatea reală (FPS).** Randarea software nu spune nimic despre FPS pe un telefon. S-a măsurat doar ce are de desenat și de calculat jocul (draw calls, triunghiuri, costul simulării) și s-a comparat cu v1. FPS-ul pe un telefon mediu trebuie verificat de mână.
5. **Un gamepad adevărat.** Controllerul a fost simulat prin `navigator.getGamepads`.
6. **Sunetul.** Efectele noi (scut, coroană, reluare) sunt generate cu WebAudio, dar nu pot fi ascultate într-un browser headless.
7. **Pierderea contextului WebGL** și memoria pe termen foarte lung pe un dispozitiv real (testul de 20 de minute simulate arată resurse constante, dar tot în headless).
8. **Integrarea unui SDK real de reclame.** Intenționat nefăcută; exemplul din README este o schiță netestată.
9. **Aspectul vizual** a fost verificat doar pe capturi de ecran din Chromium (meniu, pass, garderobă, toate skinurile pe toate vehiculele). Gusturile se discută: dacă un skin nu arată cum vrei, culorile și piesele lui sunt în `src/view/skins/`.

## Actualizarea v2.1 (conturi și pass)

Ce s-a schimbat: conectare cu Google / invitat (Apple scos: cere cont plătit) cu salvarea progresului în cont (`src/cloud/`), pass cu doar două skinuri pe sezon și ecran de pass animat.

| Suită | v2.0 | v2.1 |
|---|---|---|
| Teste unitare | 165 / 165 | **181 / 181** |
| Teste de browser | 285 / 285 | **316 / 316** |

Teste modificate în v2.1: testele care verificau skinurile din pass (`tests/save.test.js`, `tests/browser/v2_tests.py`) așteaptă acum Schiorul la ultima treaptă gratuită și Ursul de Crăciun la ultima treaptă premium, la cererea de a avea mai puține skinuri într-un pass.

Buguri găsite și reparate în v2.1:

| Fișier | Bug | Cum a fost găsit |
|---|---|---|
| `src/cloud/account.js` | La prima pornire, serviciul de conectare anunța „nimeni conectat”, iar jocul nota asta drept „a văzut ecranul de bun venit”, deci ecranul nu mai apărea niciodată. | test unitar |
| `src/style.css` (`.pass-top`) | Pe telefon, după ce antetul pass-ului a primit fundal animat, lista de trepte îl strivea: numele sezonului, bara de XP și butoanele nu se mai vedeau. | captură de ecran pe 390×844; test adăugat |
| `src/ui/metaScreens.js` | Celulele din pass afișau iconița de două ori („👑 5 👑”, „😎 Emoji: 😎 Ochelari”). | captură de ecran |
| `src/ui/metaScreens.js` (`refreshWallet`) | Animația portofelului nu pornea la prima modificare a sumei. | test de browser |

## Actualizarea v2.2 (proiect Firebase real, doar Google)

Apple a fost scos, proiectul Firebase `brasov-runnerbrasov-runner` este creat (plan gratuit, fără Analytics) și configurația este în `src/cloud/config.js`. Rezultate: teste unitare **181 / 181**, teste de browser **316 / 316**, service worker **8 / 8**.

Teste modificate în v2.2 și de ce:
- Cu configurația reală, prima pornire arată ecranul de conectare, deci testele jocului (nu ale conturilor) deschid pagina cu `?noauth` (joc fără conectare, parametru nou în `src/main.js`). Testele conturilor rămân pe `?mockauth` și cele despre Apple au fost înlocuite cu „conectare din nou cu Google”.
- `tests/browser/v2_tests.py` („tapping a showcase card”): derularea lină a listei durează mai mult pe acest mediu; testul așteaptă acum oprirea derulării, nu o pauză fixă de 0,9 s.
- `tests/browser/game_tests.py` („swipe up jumps”): verifica săritura la 50 ms după gest și pica sporadic sub încărcare; urmărește acum primele cadre direct în pagină.
- `tests/browser/sw_update_test.py`: portofelul de comparat se citește după ce cursa s-a încheiat și și-a depus bănuții, nu înainte de ea (cursa strângea câțiva bănuți în timpul așteptării).
Niciuna dintre aceste trei schimbări nu a ascuns un bug al jocului: s-a verificat că funcția merge (lista ajunge la treapta 40, săritura apare).

Ce NU a putut fi verificat în v2.1 și v2.2:
- **Conectarea reală cu Google de la cap la coadă.** Proiectul Firebase există acum (Google activat, Firestore creat, reguli publicate, configurația în `src/cloud/config.js`), dar fereastra de conectare Google cere contul și parola proprietarului, iar domeniul public al jocului nu există încă. Deci `src/cloud/firebaseCloud.js` nu a fost încă încercat cu o conectare reală și cu salvarea în Firestore. Tot fluxul (invitat, prima conectare, al doilea dispozitiv, offline, deconectare) este testat cu serviciul fals.
- **Conectarea cu Apple** a fost scoasă (cere cont Apple Developer plătit); codul ei nu a fost încercat deloc.
- Regulile Firestore sunt publicate în proiectul real, dar nu au fost încă puse la încercare cu un jucător real (citire/scriere permisă pentru propriul document, refuzată pentru al altuia).

## Actualizarea v3 (grafică, animații, control, sunet) și v3.1 (clasament comun)

### Cum s-a lucrat
Un orchestrator a pregătit punctele de legătură în cod (`view/cameraRig.js`, `view/fx.js`, `view/post.js`, evenimentele `Game.emit`) și mecanicile noi de „stil”, apoi șase agenți au lucrat în paralel, fiecare pe ramura lui și doar în fișierele lui: **render** (post-procesare, cer, apă, zăpadă), **character** (băiatul și ursul), **fx** (efecte), **audio** (sunete și muzică), **ui** (HUD și ecrane), **feel** (cameră, schimbarea culoarului, input). Ramurile au fost unite una câte una, cu testele rulate după fiecare. Regulile jocului (coliziuni, săritură, generator, urs, economie, salvare) nu au fost schimbate.

### Ce s-a rulat pe versiunea finală
- Teste unitare: **209 / 209** (noi: 11 pentru stil, 7 pentru schimbarea culoarului, 10 pentru clasament).
- Teste de browser: **355 de verificări** (noi: `[V]` stil, `[W]` feel, `[X]` clasament). Ultima rulare completă, pe versiunea livrată: **355 / 355**. Rulările dinainte: 338/338 (înainte de clasament), 354/355 (pica doar verificarea care căuta textul „v2.” în versiune) și 353/355 (două verificări de confetti dependente de timp, vezi mai jos); cele trei verificări au fost corectate.
- Actualizarea service worker-ului: **8 / 8**.
- `scripts/audio_check.py`: 31 de efecte și muzica celor 5 niveluri redate offline: fără NaN, fără liniște, fără clipping după limitator; numărul de voci active nu crește în timp.
- Capturi de ecran privite una câte una: toate nivelurile, săritura pe snowboard și skateboard, lovitura, ecranul de final, meniul pe desktop și pe telefon, HUD-ul cu mesaje și contor de serie, clasamentul.

### Probleme găsite la integrare și reparate
1. **„La limită!” aproape imposibil de obținut lateral.** După ce schimbarea culoarului a devenit de ~2 ori mai rapidă, fereastra în care băiatul era încă lângă obstacol a scăzut la câteva sutimi de secundă. Acum contează și eschiva târzie: ai părăsit culoarul obstacolului cu mai puțin de 0,2 s înainte să treci de el.
2. **Lacul Noua: bănuții nu se mai vedeau.** Reflexia portocalie a apusului și sclipirile acopereau culoarele; reflexia a fost plafonată și sclipirile înjumătățite.
3. **Ecran negru posibil pe telefoane vechi.** Post-procesarea desenează în texturi „half-float”, care cer o extensie WebGL. Dacă extensia lipsește, jocul desenează acum direct, fără post-procesare.
4. **Numărul de apeluri de desenare era măsurat greșit** odată ce un cadru are mai multe treceri: se numără acum pe cadru întreg (`renderer.info.autoReset = false`), deci bugetul din testul de performanță include și trecerile de post-procesare.
5. **Unealta de capturi arăta efecte „înghețate”** (toate efectele din primele secunde suprapuse): era o greșeală a uneltei, nu a jocului; acum desenează ultimele 1,5 s înainte de captură.
6. **Eroare a mea în ajutoarele de test** (`H.BASE` lipsea), care ar fi stricat patru teste v2 rulate pe alt port; reparată înainte să ajungă în ramura principală.
7. **Adresa de e-mail putea ajunge nume de jucător** când contul nu are nume afișat (`displayName || email`). Cu un clasament public asta ar fi fost o scurgere de date: acum se folosește doar numele afișat.

### Teste existente modificate și de ce
- `tests/physics.test.js` („converge smoothly”): cerea mișcare strict monotonă spre culoar; arcul nou depășește intenționat ținta cu ~2,6 %. Testul cere acum mișcare monotonă până la prima atingere, apoi depășire de cel mult 4 %.
- `tests/save.test.js`: setările au două câmpuri noi (`music`, `hints`).
- `tests/browser/v2_tests.py` (conturi): după conectare, meniul arată clasamentul comun, deci lista conține numele contului, nu numele tastat ca invitat. Faptul că Top 10-ul local a fost mutat în cont este verificat în continuare, pe datele salvate.
- `tests/browser/v2_tests.py` (pass animat): curățarea confetti-urilor era verificată după o pauză fixă de 1,2 s și a picat o dată din trei rulări complete, când mașina era încărcată (în izolare trece 3 din 3). Testul așteaptă acum dispariția lor, cel mult 6 s. Verificările de versiune acceptă orice `x.y.z` (versiunea vine din `package.json`).
- `tests/browser/game_tests.py`: portul vine din `BR_PORT`; rulează un singur browser o dată (fișier de blocare comun cu `scripts/shot.py`).

### Ce NU a putut fi verificat în v3 și v3.1
- **Cum sună.** Nimeni nu a ascultat efectele sau muzica: sunt verificate doar prin măsurători (nivel, clipping, voci). Muzica folosește câte o gamă și o progresie simplă pe nivel tocmai ca riscul să fie mic, dar poate să nu-ți placă; are comutator separat în meniu.
- **Cum se simte în mișcare.** Animațiile, camera și efectele au fost privite doar în cadre statice și serii de cadre, nu în timp real. Direcția înclinării camerei în viraje și tăria arcurilor trebuie judecate cu jocul în mână.
- **Viteza pe un telefon real.** Totul a rulat pe un procesor grafic software. Apelurile de desenare sunt în buget (cel mult 394 din 460 în cel mai rău caz măsurat), dar costul real al post-procesării, al cerului cu nori și al apei pe un telefon nu este măsurat. Calitatea adaptivă le oprește dacă scad cadrele pe secundă.
- **Vibrația, gesturile pe ecran tactil real, `prefers-reduced-motion`** (calea există în cod, nu a fost rulată într-un browser).
- **Clasamentul cu serviciul real, partea de scriere.** Regulile Firestore noi pentru `scores` sunt **publicate** în proiectul real (13 noiembrie) și am verificat direct pe server că lista se poate citi fără cont (răspuns gol, fără eroare) și că salvările altora rămân refuzate (403). Ce nu s-a putut verifica: **scrierea unui scor cu o conectare Google reală** (cere contul unui om) și, deci, `firebaseCloud.js` de la cap la coadă. Logica din jur este testată cu serviciul fals, care aplică aceleași reguli. Dacă scrierea ar fi refuzată, jocul nu se strică: scorul rămâne pe dispozitiv și apare nota „Fără conexiune…”.
- **Scoruri false.** Regulile opresc alt rând, alt nume, scor mai mic și scor peste 5 milioane, dar nu pot dovedi că un scor a fost jucat.

## Actualizarea v3.2 (după prima joacă a proprietarului)

Cerut: mișcarea stânga–dreapta era „puțin cam bruscă”; efectul de la bănuți și „aura mov” nu plăceau; „La limită!” și seriile de bănuți nu plăceau.

- **Schimbarea culoarului**: arcul a devenit critic amortizat, fără depășire (`CFG.lane` omega 32 → 25, zeta 0,72 → 1, impuls inițial 4 → 1,5). Ajunge la 0,3 de culoar în 0,15 s (era 0,075 s; limita generatorului este 0,23 s, deci garanția „există mereu o cale” rămâne), viteza laterală maximă scade de la 36 la 23 unități/s, fără tremur la final. Și înclinarea băiatului (amortizare 0,5 → 0,8) și a camerei (amplitudine −33 %, fără oscilație) sunt mai blânde.
- **Efectul de bănuț**: inelul, fulgerul și scânteile colorate (care deveneau roz-mov la serii lungi, „aura” din jurul băiatului) sunt scoase, la fel explozia mare de la pragurile seriilor. Au rămas doar scânteile mici, galbene, din v2.
- **„La limită!” și seriile de bănuți**: scoase complet (logică, puncte, mesaje, contor, sunete speciale, linia din ecranul de final). Scorul este din nou distanță + bănuți. Sunetul bănuțului este același de fiecare dată.
- Teste: cele 11 teste unitare de stil și grupa de browser `[V]` au fost scoase; `[V]` verifică acum că nu mai există nimic din ele. Testele de culoar cer acum „o singură cocoașă de viteză, fără depășire vizibilă, sub 0,23 s” în loc de „nu mai lent decât varianta veche”.
- Rezultate: teste unitare 198 / 198, teste de browser 345 / 345 (10 verificări de stil scoase).
- Neverificat: senzația în mână (doar cadre succesive au fost privite).
