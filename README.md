# Brașov Runner v3.2 🐻👑

Joc de tip *endless runner* 3D pe trei culoare (ca Subway Surfers), cu tema **Brașov**: un băiat fuge de un urs prin cinci locuri din oraș, pe snowboard, pe skateboard, pe bicicletă și cu hidrobicicleta. Ursul aleargă, înoată sau te urmărește pe monociclu și pe un hidro-monociclu.

Proiect pentru facultate (UNITBV, informatică economică). Rulează în browser, se instalează pe telefon și pe calculator ca aplicație (PWA) și poate fi împachetat ca APK Android (Capacitor). **Nu folosește nicio resursă externă**: toate modelele 3D, texturile și sunetele sunt generate din cod.

**Ce aduce v2 față de v1:** două abilități noi, o a doua monedă (Coroane), misiuni, battle pass, skinuri pentru băiat și pentru urs, trail-uri și emoji, „Continui?” după ce te prinde ursul (reclamă simulată sau Coroane), un modul unic de salvare cu migrare, meniu adaptat pentru desktop, comenzi cu mouse și gamepad, configurație pentru APK. Tot textul din joc este în română.

**Ce aduce v3 față de v2** (regulile jocului sunt aceleași; s-a schimbat cum arată, cum se mișcă și cum sună):

- **Imagine:** cer cu soare și nori și altă oră a zilei pe fiecare nivel (dimineață rece la Poiana, apus la Lacul Noua), strălucire (*bloom*) doar pe ce trebuie să lucească, gradare de culoare și vignetă, apă animată cu sclipiri, zăpadă care scânteiază, podea lucioasă la AFI. Pe dispozitive slabe se opresc singure.
- **Animații:** băiatul și ursul sunt animați cu arcuri: se apleacă în viraje, se strâng înainte de săritură, fac câte o figură în aer pe fiecare vehicul (grab pe snowboard, kickflip pe skateboard, roata din față sus pe bicicletă), se turtesc la aterizare; băiatul are față și clipește, ursul galopează, rage și dă cu laba.
- **Control și cameră:** schimbarea culoarului este lină (fără smucitură și fără să treacă de culoar); camera urmărește cu arcuri, se înclină puțin în viraje, tresare la lovituri.
- **Efecte:** linii de viteză, urme la aterizare diferite pe zăpadă, piatră și apă, impact la lovitură, fascicul de lumină la abilități, frunze, praf în lumină și licurici pe niveluri.
- **Sunet:** efecte mai bogate și **muzică generată din cod**, alta pe fiecare nivel, care se schimbă cu viteza și când te urmărește ursul. Muzica are comutator separat în meniu.
- **Interfață:** margine roșie când te urmărește ursul, ecran de final cu numărătoare și „record nou”, indicii de control la primele curse.

**v3.1: clasament comun.** Cine se conectează cu Google apare într-un clasament care este **același pentru toți** cei care deschid jocul: un rând pe cont, cu numele contului și cel mai bun scor, salvat automat la finalul cursei (numele nu se poate schimba din joc). Invitații îl văd, dar scorurile lor rămân pe dispozitiv. Detalii și reguli la „Conturi”.

> **Onestitate de design.** Jocul nu are plăți cu bani reali și niciun formular de plată. Coroanele se câștigă doar jucând. Tot ce se cumpără din Garderobă și din pass este cosmetic (nu schimbă coliziunile, viteza sau regulile); singura altă folosire a Coroanelor este „Continui?”, limitat la 3 pe cursă și disponibil și cu reclamă. Nu există cronometre care te presează: ecranul „Continui?” așteaptă cât vrei, iar recompensele câștigate și nerevendicate se acordă automat când se schimbă ziua sau sezonul. Reclamele sunt o simulare: jocul nu contactează nicio rețea de reclame și nu urmărește pe nimeni.

## Nivelurile

După aproximativ **5 minute** într-un loc, pista se golește de obstacole, apare un **portal** cu numele următorului loc, ecranul se albește și te trezești în nivelul următor. După ultimul nivel o iei de la capăt. Din meniu („Pornește din”) poți porni direct din oricare nivel, util la prezentare.

| # | Loc | Ce conduci | Obstacole care se mișcă | Alte obstacole |
|---|---|---|---|---|
| 1 | **Poiana Brașov** (pârtia): Tâmpa cu semnul BRAȘOV, un corp UNITBV în fundal, o cabană | snowboard | bulgăre uriaș | bușteni, movile, crengi de pin, pietre, oameni de zăpadă, cioturi |
| 2 | **Strada Republicii**: case colorate, terase, felinare, Biserica Neagră | skateboard | bicicliști | bănci, jardiniere, stâlpi cu lanțuri, copertine, chioșc de flori, mese de terasă |
| 3 | **Pietonala Tractorul** (Coresi): blocuri noi, hala și coșul vechii fabrici | bicicletă (ursul te urmărește pe **monociclu**) | bicicliști | rastele, garduri vii, pergole, cărucior de înghețată, roata dințată |
| 4 | **AFI Brașov** (mall): trei etaje de magazine, balustrade de sticlă, luminator | skateboard | mașina de curățat pardoseala | indicatoare „podea udă”, bănci, cordoane, bannere, chioșc, palmieri, manechine |
| 5 | **Lacul Noua**: sălcii, stuf, nuferi, rațe, debarcader | hidrobicicletă fără acoperiș (ursul pe **hidro-monociclu**) | alte hidrobiciclete | bușteni plutitori, geamanduri, baraj plutitor, ramuri de salcie, insulițe, piloni |

## Pornire rapidă

Ai nevoie doar de [Node.js](https://nodejs.org) 22 sau mai nou.

```bash
npm install
npm run dev          # deschide adresa afișată (de obicei http://localhost:5173)
```

Versiunea optimizată (funcționează și offline, se poate instala):

```bash
npm run build
npm run preview
```

## Cum se joacă

| Acțiune | Tastatură | Mouse | Telefon | Gamepad (opțional) |
|---|---|---|---|---|
| Schimbi culoarul | ← → sau A D | click în treimea din stânga / dreapta, sau tragi | swipe stânga / dreapta | săgeți sau stick |
| Sari | ↑, W sau Space | click în mijloc, sau tragi în sus | swipe sus | A sau sus |
| Aluneci | ↓ sau S | click dreapta, sau tragi în jos | swipe jos (în aer: cazi rapid) | B sau jos |
| Pauză | Esc sau P | butonul ❚❚ | butonul ❚❚ | Start |
| Emoji | E | butonul din HUD | butonul din HUD | Y |

- **Scor** = distanța parcursă + 10 puncte pentru fiecare bănuț. Viteza crește natural (curbă care se aplatizează spre un maxim).
- Obstacolele sunt de trei feluri în fiecare nivel: **joase** (le sari), **sus, doar pe culoarele laterale** (aluneci pe sub ele) și **solide** (schimbi culoarul). Unele **se mișcă** spre tine pe culoarul lor.
- **Regula ursului (neschimbată):** prima lovitură nu te oprește: apare ursul și te urmărește **exact 5 secunde**. Dacă te lovești încă o dată cât e după tine, te-a prins. Dacă reziști, rămâne în urmă, iar următoarea lovitură pornește o nouă urmărire.
- **Există mereu o cale (neschimbat):** generatorul verifică pentru fiecare rând de obstacole că există un culoar liber la care ai timp să ajungi.

### Abilități speciale

Obiecte strălucitoare pe pistă; intri în ele ca să le iei. Nu există cronometru pe ecran: obiectul de pe personaj clipește în ultimele 2 secunde.

| Abilitate | Cât de des | Durată | Ce face |
|---|---|---|---|
| **Magnet** (roșu) | ~1 pe minut | 15 s | bănuții de pe toate culoarele zboară la tine |
| **Placa de aur** | ~1 la 2 min | 10 s | sărituri peste orice obstacol |
| **Scutul Bastionului** (verde) 🆕 | ~1 la 2,5 min | 12 s | absoarbe **o** lovitură |
| **Jetpack** (albastru) | ~1 la 3 min | 10 s | zbori peste tot, cu șir de bănuți în aer |
| **Ceasul din Piața Sfatului** (violet) 🆕 | ~1 la 3,5 min | 6 s | încetinește lumea |

#### Cele două abilități noi: cum au fost alese

Abilitățile din v1 acopereau **bonusul** (magnet) și **spațiul** (placa de aur și jetpack-ul te duc peste obstacole). Lipseau **protecția** și **timpul**. Am cântărit patru idei:

| Idee | Mecanică | De ce da / de ce nu |
|---|---|---|
| **Scutul Bastionului** | protecție: absoarbe o lovitură | ✅ ales. Singura abilitate care iartă o greșeală; se leagă de bastioanele cetății (al Țesătorilor, al Graftului) |
| **Ceasul din Piața Sfatului** | timp: încetinire | ✅ ales. Ceasul din turnul Casei Sfatului; dă timp de reacție la viteze mari, fără să sară peste obstacole |
| Kürtőskalács ×2 | bonus: bănuți dubli | ❌ seamănă prea mult cu magnetul (tot „mai mulți bănuți”) |
| Telecabina spre Tâmpa | spațiu: te duce pe sus | ❌ practic un al doilea jetpack |

**Scutul Bastionului**
- *Vizual:* obiectul este un scut heraldic verde cu un turn auriu; cât e activ, băiatul stă într-o bulă verzuie înconjurată de un inel de creneluri care se rotește.
- *Durată:* 12 s sau până la prima lovitură. *Apare:* prima dată pe la secunda 45, apoi cam la 2,5 minute.
- *Cu ursul:* lovitura absorbită **nu pornește urmărirea**. Dacă ursul te urmărește deja, lovitura **nu te prinde**, dar cele 5 secunde curg mai departe și, fără scut, următoarea lovitură din aceeași urmărire te prinde. Regula ursului rămâne deci aceeași; scutul doar „șterge” o lovitură. După spargere ai 0,8 s de protecție, ca un grup de obstacole să conteze drept o singură lovitură.
- *Cu garanția „există mereu o cale”:* nu atinge generatorul deloc; traseul rămâne posibil și fără scut.

**Ceasul din Piața Sfatului**
- *Vizual:* cadranul turnului, cu acoperiș roșu; cât e activ plutește lângă umărul băiatului cu limbile învârtindu-se, iar marginea ecranului capătă o tentă violet.
- *Durată:* 6 secunde reale, la 55% din viteză. *Apare:* prima dată pe la secunda 95, apoi cam la 3,5 minute (cea mai rară).
- *Cu ursul:* **ursul nu este încetinit**. Urmărirea durează tot 5 secunde reale, deci regula rămâne exactă; în acele 5 secunde întâlnești mai puține obstacole, deci ceasul te ajută să scapi.
- *Cu garanția „există mereu o cale”:* rândurile de obstacole sunt distanțate în *timp* la viteza normală; mai încet înseamnă mai mult timp între ele, deci garanția se păstrează cu rezervă. Săriturile parcurg aceeași distanță ca de obicei (totul e încetinit la fel), deci obstacolele rămân corecte.
- *Cu jetpack-ul:* cronometrele celorlalte abilități merg în timpul încetinit al jocului, așa că un zbor acoperă aceeași distanță și zona de aterizare păstrată liberă de generator rămâne corectă chiar dacă iei ceasul în aer.

## Economia: bănuți și Coroane

| Monedă | De unde vine | Pe ce se dă |
|---|---|---|
| **Bănuți** | culeși în curse (intră în portofel la sfârșitul cursei), misiuni, pass | skinuri, trail-uri, emoji |
| **Coroane** 👑 (premium, rare) | misiuni săptămânale și bonusul zilnic, treptele pass-ului, rar pe pistă (cam una la 5 minute: cel mai rar obiect din joc) | pista premium a pass-ului, unele skinuri, „Continui?” |

De ce „Coroane”: Brașovul este *Kronstadt*, „Orașul Coroanei”, iar coroana este pe stema orașului.

Un jucător care nu plătește nimic (nici nu are cum) strânge într-un sezon mai mult decât costă pass-ul: pista gratuită dă 40 de Coroane, misiunile săptămânale 72, bonusurile zilnice până la 42. Pista premium dă înapoi 130 de Coroane pentru cele 80 cât costă. Aceste rapoarte sunt verificate de teste (`tests/battlepass.test.js`, `tests/save.test.js`).

## Misiuni

Trei grupe active în același timp (ecranul **Misiuni**):

- **Zilnice (3):** se schimbă la miezul nopții, după data locală. Exemple: „Adună 150 de bănuți”, „Scapă de urs de 2 ori”. Recompensă: XP + bănuți. Dacă le termini pe toate trei: bonus de 1 Coroană.
- **Săptămânale (3):** se schimbă lunea. Recompensă: XP, bănuți și 4 Coroane fiecare.
- **Pe cursă (3):** trebuie îndeplinite într-o singură cursă („Sari de 20 de ori într-o cursă”). După revendicare apare alta, iar după fiecare tur complet al listei obiectivele cresc cu 25%.

Cazurile cu ceasul (acceptăm că utilizatorul poate schimba ceasul telefonului, dar nimic nu trebuie să se strice):

| Situație | Ce se întâmplă |
|---|---|
| Data merge înainte | misiuni noi; cele terminate și nerevendicate se plătesc automat mai întâi |
| Ceasul este dat înapoi | misiunile, progresul și bifele rămân exact cum erau; nu se acordă nimic a doua oară și jocul nu rămâne blocat pe o dată din viitor |
| Telefonul rămâne deschis peste miezul nopții | data se verifică între curse, la revenirea în aplicație și la 30 de secunde în meniu |
| Miezul nopții trece în timpul unei curse | cursa contează pentru ziua în care a început, apoi încep misiunile noi |
| Zi cu 23 sau 25 de ore (ora de vară) | resetarea se face pe data din calendar, nu pe „24 de ore” |

## Battle pass: „Pass-ul Tâmpa”

- Sezon de **42 de zile**, **40 de trepte**, câte 120 XP fiecare. XP vine din misiuni și din cursele jucate.
- Două piste: **gratuită** și **premium**. Premium se deblochează cu 80 de Coroane.
- Recompense: bănuți, Coroane, câteva trail-uri și emoji și **doar două skinuri pe sezon**: **Schiorul din Poiana** la ultima treaptă gratuită și un skin de urs (**Ursul de Crăciun**) la ultima treaptă premium. Restul skinurilor se cumpără din Garderobă.
- Ecranul arată progresul, zilele rămase, buton de revendicare pe fiecare treaptă și „Revendică tot”. Cele două skinuri sunt afișate sus, cu numărul de trepte rămase.
- Ecranul este animat: treptele intră pe rând la deschidere, bara de XP se umple, recompensele gata de revendicat pulsează, iar la revendicare apar confetti. Dacă telefonul are activată opțiunea „reducere mișcare”, animațiile sunt oprite.
- Orice obiect din pass poate fi cumpărat și din Garderobă, deci nimic nu „dispare pentru totdeauna”. Dacă primești din pass un obiect pe care îl ai deja, primești bănuți în schimb.
- La schimbarea sezonului, recompensele deblocate și nerevendicate se acordă automat.

## Garderobă: skinuri, trail-uri, emoji

Ecran cu **previzualizare 3D**: modelul se rotește încet (îl poți roti și cu degetul sau cu mouse-ul), iar cu butoanele de sub taburi vezi skinul pe fiecare vehicul, respectiv ursul în fiecare mod.

| Băiatul | Ursul | Trail | Emoji |
|---|---|---|---|
| Clasic · Schior din Poiana · Salvamontist · Junele Brașovului · Stegarul · Mascota Ursuleț | Ursul brun · Ursul din Răcădău · Ursul de Crăciun | Fulgi de nea · Scântei aurii · Frunze de pe Tâmpa · Tricolor | 🐻 ⛷️ 🏔️ 🔥 😎 👑 |

- Fiecare skin al băiatului merge cu **toate cele 4 vehicule** (snowboard, skateboard, bicicletă, hidrobicicletă), iar fiecare skin al ursului cu **toate cele 4 moduri** (aleargă, înoată, monociclu, hidro-monociclu). Vehiculele și ținutele de mod (casca de pe monociclu, vesta și chipiul de pe lac) nu sunt atinse de skinuri.
- **Fără scurgeri de memorie:** fiecare skin își creează geometriile și materialele printr-un `SkinKit` care le eliberează (`dispose`) la schimbare. Testele schimbă skinurile de sute de ori și verifică numărul de resurse GPU.

## „Continui?” după ce te prinde ursul

După animația de prindere apare ecranul **Continui?** cu două opțiuni: **vezi o reclamă** sau **plătește cu Coroane**.

- Prețul crește la fiecare reluare din aceeași cursă: **2 → 4 → 8 Coroane**. Limita este de **3 reluări pe cursă**, dintre care cel mult 2 cu reclamă.
- După reluare ai **3 secunde de invulnerabilitate**, iar pista din față este **curățată de obstacole** (cam 3,5 secunde de drum). Ursul dispare, deci regula lui pornește de la zero.
- Fără numărătoare inversă: decizi când vrei. „Nu, mulțumesc” duce la ecranul de final.

### Reclame: interfața `AdProvider`

Jocul nu vorbește niciodată direct cu un SDK de reclame, ci cu o interfață (`src/ads/adProvider.js`):

```js
interface AdProvider {
  isAvailable(): { ok: boolean, reason?: 'offline' | 'busy' | 'unavailable' }
  showRewarded(): Promise<{ completed: boolean, reason?: string }>   // completed = true DOAR dacă reclama a fost văzută până la capăt
  cancel(): void
}
```

Implementarea implicită este **`MockAdProvider`**: un ecran de reclamă fals, etichetat „simulare”, cu numărătoare inversă de 5 secunde. Nu poate fi sărit (nu are niciun buton) și dă recompensa doar dacă a rulat până la capăt. **Nu este integrată nicio rețea reală și nu se colectează nimic despre utilizator.**

Cazurile tratate (toate au teste):

| Caz | Comportament |
|---|---|
| Tab-ul sau aplicația trece în fundal în timpul reclamei | numărătoarea stă pe loc și continuă la revenire |
| Utilizatorul închide aplicația în timpul reclamei | bănuții și Coroanele cursei erau deja în portofel; la următoarea pornire apare meniul normal, fără reluare „pe jumătate” |
| Offline | opțiunea cu reclamă este dezactivată și explicată; plata cu Coroane merge |
| Dublu-click pe butoane | o singură plată, o singură reclamă |
| Restart sau meniu în timpul reclamei | reclama se închide, iar răspunsul ei târziu este ignorat |

**Cum s-ar lega un SDK real** (nu este făcut aici, intenționat; codul de mai jos este o schiță netestată, de verificat cu documentația pluginului). Se scrie o clasă cu aceleași trei metode și se dă jocului în `src/main.js` în locul lui `MockAdProvider`:

```js
// Android, prin Capacitor + pluginul comunității pentru AdMob (npm i @capacitor-community/admob)
import { AdMob, RewardAdPluginEvents } from '@capacitor-community/admob';

export class AdMobProvider {
  constructor(adId) { this.adId = adId; this.busy = false; }
  isAvailable() {
    if (this.busy) return { ok: false, reason: 'busy' };
    return navigator.onLine === false ? { ok: false, reason: 'offline' } : { ok: true };
  }
  async showRewarded() {
    this.busy = true;
    let rewarded = false;
    const sub = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => { rewarded = true; });
    try {
      await AdMob.prepareRewardVideoAd({ adId: this.adId });
      await AdMob.showRewardVideoAd();          // se rezolvă când reclama se închide
      return { completed: rewarded };
    } catch (e) {
      return { completed: false, reason: 'error' };
    } finally {
      sub.remove();
      this.busy = false;
    }
  }
  cancel() {}                                   // o reclamă nativă nu poate fi închisă din cod
}
```

Pentru web, **Google H5 Games Ads** (Ad Placement API) are aceeași formă: `adBreak({ type: 'reward', beforeReward: (showAdFn) => showAdFn(), adViewed: () => resolve({ completed: true }), adDismissed: () => resolve({ completed: false }) })`.

Înainte de a porni o rețea reală trebuie: cont și ID-uri de reclamă, formular de consimțământ (GDPR, de exemplu prin Google UMP), politică de confidențialitate și, pentru magazinele de aplicații, declarațiile despre date. Nimic din acestea nu este necesar pentru varianta de acum.

## Conturi: Google sau invitat

La prima pornire jocul întreabă cum vrei să joci: **Continuă cu Google** sau **Joacă ca invitat**. Din meniu, butonul cu omuleț deschide oricând conectarea sau contul.

- **Invitat:** progresul rămâne pe dispozitiv, ca până acum.
- **Cont:** progresul (bănuți, Coroane, skinuri, pass, misiuni, Top 10) se salvează și în cont și îl regăsești pe orice dispozitiv.
- **Prima conectare:** ce ai jucat ca invitat se copiază în cont.
- **Fiecare cont are locul lui de salvare** pe dispozitiv, separat de invitat. Conectarea și deconectarea nu amestecă și nu șterg progresul nimănui.
- **Două dispozitive:** câștigă copia cu revizia cea mai nouă. Dacă joci offline pe două dispozitive în același timp, progresul celui rămas în urmă se pierde; joacă pe rând.
- **Fără internet:** jocul merge de pe dispozitiv și urcă progresul în cont când revine conexiunea.
- Nimic nu se schimbă în mijlocul unei curse; trecerea pe alt cont se face în meniu.

> ✅ **Proiectul Firebase `brasov-runnerbrasov-runner` este creat** (plan gratuit Spark, fără Analytics): Authentication cu Google activat, Firestore în Europa (`eur3`) cu regulile de mai jos publicate, aplicația web înregistrată, configurația este în `src/cloud/config.js`. Apple a fost scos: cere cont Apple Developer plătit (99 USD pe an). Codul pentru el există în `firebaseCloud.js`; se pornește adăugând `'apple'` în `LOGIN_PROVIDERS`.
>
> ✅ Regulile de mai jos, inclusiv cele pentru **clasamentul comun** (`scores`), sunt publicate în proiect.
>
> ⚠️ **Rămâne de făcut la publicare:** adaugă domeniul unde pui jocul (de exemplu `<utilizator>.github.io`) la *Authentication → Settings → Authorized domains*, altfel fereastra Google refuză conectarea. `localhost` este deja permis. Partea care vorbește cu Firebase (`src/cloud/firebaseCloud.js`) **nu a fost încă încercată cu o conectare Google reală de la cap la coadă**; logica din jurul ei (`src/cloud/account.js`) este testată cu un serviciu fals.

**Cum vezi fluxul fără Firebase:** adaugă `?mockauth` la adresă (de exemplu `http://localhost:5173/?mockauth`). Apare un cont de test (Google), iar „serverul” este tot pe dispozitiv.

**Cum activezi conectarea reală:**

1. [console.firebase.google.com](https://console.firebase.google.com) → *Add project*.
2. *Build → Authentication → Get started → Sign-in method* → activează **Google**.
3. *(Opțional)* **Apple**: activează *Apple* în aceeași listă. Ai nevoie de un cont **Apple Developer (plătit, 99 USD pe an)** și de un *Services ID*. Apoi adaugă `'apple'` în `LOGIN_PROVIDERS`.
4. *Authentication → Settings → Authorized domains* → adaugă domeniul jocului (`<utilizator>.github.io`).
5. *Build → Firestore Database → Create database*, apoi la *Rules* pune:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /saves/{uid} {
         allow read: if request.auth != null && request.auth.uid == uid;
         allow write: if request.auth != null && request.auth.uid == uid
                      && request.resource.data.data is string
                      && request.resource.data.data.size() < 200000
                      && request.resource.data.rev is int;
       }
       // clasamentul comun: un rând pe cont
       match /scores/{uid} {
         allow read: if true;
         allow create, update: if request.auth != null && request.auth.uid == uid
                      && request.resource.data.keys().hasOnly(['name', 'score', 'updatedAt'])
                      && request.resource.data.name is string
                      && request.resource.data.name == request.auth.token.name
                      && request.resource.data.score is int
                      && request.resource.data.score > 0
                      && request.resource.data.score <= 5000000
                      && (resource == null || request.resource.data.score > resource.data.score);
       }
     }
   }
   ```
   Fiecare jucător își poate citi și scrie doar propria salvare. Clasamentul îl poate citi oricine, dar fiecare își poate scrie doar rândul lui, doar cu numele contului lui și doar cu un scor mai mare decât cel vechi.
6. *Project settings → Your apps → Web (`</>`)* → copiază `firebaseConfig` în `src/cloud/config.js` (valorile nu sunt secrete).
7. `npm run build` și push. Verifică o conectare cu Google de pe două dispozitive.

Limite de știut:
- În **APK-ul Android** conectarea este dezactivată (Google nu permite conectarea într-un WebView); ar trebui un plugin nativ, de exemplu `@capacitor-firebase/authentication`.
- **Clasamentul comun** (v3.1): cine se conectează cu Google apare în „Clasament” cu **numele contului** și cu cel mai bun scor al lui, salvat automat la finalul cursei; numele nu se poate schimba din joc. Invitații văd clasamentul, dar scorurile lor rămân în Top 10 de pe dispozitiv. Lista este aceeași pentru toți cei care deschid jocul. Numele contului Google devine vizibil pentru oricine are linkul.
- Scorul este calculat pe dispozitivul jucătorului. Regulile de mai sus opresc ce se poate opri (alt rând, alt nume, scor mai mic, scor peste 5 milioane), dar nu pot dovedi că scorul a fost chiar jucat: cineva care știe programare poate trimite un scor fals în rândul lui. Dacă se întâmplă, rândul se șterge din consola Firebase (*Firestore → scores*).
- Salvarea este trimisă de joc, nu verificată de un server. Un jucător își poate modifica propria salvare; pentru un proiect de facultate este acceptabil.
- Cu un cont, în Firebase ajung identificatorul contului și progresul din joc. Jocul nu trimite altceva și nu are reclame reale sau analiză de trafic.

## Salvare

Un singur modul atinge `localStorage`: `src/logic/save.js`. Tot progresul stă într-un singur document JSON (`brasovRunner.save`): portofel, cosmetice, misiuni, pass, Top 10, setări, statistici.

- **Versiune și migrare:** documentul are câmpul `v`. Formatele vechi sunt aduse la zi pas cu pas (`MIGRATIONS`). Jocul v1 își ținea datele în trei chei separate (Top 10, nume, sunet); la prima pornire a lui v2 acestea sunt importate, deci **actualizarea nu pierde progres**. O salvare dintr-o versiune mai nouă este păstrată separat și citită cât se poate.
- **Validare strictă:** tot ce vine din stocare trece prin `sanitizeState`: tipuri verificate, valori limitate, id-uri necunoscute eliminate, combinații imposibile reparate (de exemplu trepte de pass revendicate fără XP).
- **Date corupte:** textul stricat este pus deoparte (`brasovRunner.save.corrupt`), apoi se încarcă copia de rezervă (`brasovRunner.save.bak`) sau o stare nouă. Jocul nu se oprește niciodată din cauza asta.
- **Stocare blocată** (mod privat, cookie-uri blocate): jocul merge din memorie și anunță în meniu că progresul se păstrează doar până la închidere.
- **Stocare plină:** se eliberează copia de rezervă și se încearcă din nou; dacă tot nu merge, starea rămâne în memorie, ultima salvare bună de pe disc rămâne intactă, iar meniul afișează un avertisment.
- **Două taburi:** un tab preia salvarea mai nouă a celuilalt, ca să nu o suprascrie.
- **Profiluri:** invitatul folosește `brasovRunner.save`; fiecare cont are `brasovRunner.save.u.<id>`. Cine a jucat ultimul este ținut în `brasovRunner.session`.
- **Actualizarea aplicației** nu atinge salvarea: service worker-ul ține doar fișierele jocului.

## Pe telefon și pe calculator

### PWA (instalare din browser)

- **Android / desktop (Chrome, Edge):** în meniu apare „⬇ Instalează aplicația” (sau iconița din bara de adrese).
- **iPhone / iPad (Safari):** Partajează → „Adaugă pe ecranul principal”. Meniul afișează acest indiciu pe iOS.
- **Offline:** după prima încărcare jocul merge fără internet (toate fișierele sunt în cache).
- **Actualizare:** versiunea nouă se descarcă în fundal. Nu se activează niciodată în mijlocul unei curse (ar reîncărca pagina). Se activează singură la următoarea pornire, iar dacă aplicația e deschisă apare în meniu „Este disponibilă o versiune nouă · Actualizează”.
- Instalarea cere HTTPS (GitHub Pages îl oferă).

### Layout

- **Telefon, portrait:** o singură coloană; garderoba este un panou jos, cu previzualizarea 3D deasupra. Pe orizontală, telefonul cere să fie rotit.
- **Desktop / ecran lat:** două bare laterale (meniul în stânga; pass, misiunile zilei și Top 10 în dreapta), cu scena 3D liberă la mijloc. În timpul cursei, câmpul vizual se adaptează la orice raport de aspect.

### APK Android (Capacitor)

Proiectul conține `capacitor.config.json` și workflow-ul `.github/workflows/android.yml`, care construiește un **APK debug** și îl atașează ca artefact.

> ⚠️ **Netestat.** În mediul în care a fost scrisă v2 nu există Android SDK, deci APK-ul **nu a fost construit și nu a fost rulat pe un telefon**. Au fost verificate doar: build-ul web pentru Capacitor (`npm run build:capacitor`) și generarea proiectului Android (`npx cap add android`, `npx cap sync`). Pașii de mai jos sunt cei standard pentru Capacitor 8.

Din GitHub: *Actions* → **APK Android (debug)** → *Run workflow* → la final descarci artefactul `brasov-runner-debug-apk`.

Local (ai nevoie de Android Studio sau de Android SDK + JDK 21):

```bash
npm install
npm run android:init     # o singură dată: build pentru Capacitor + creează folderul android/
node scripts/android-icons.mjs
npm run android:sync     # după fiecare modificare a jocului
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```

În APK nu există service worker (fișierele sunt în aplicație), iar salvarea rămâne în `localStorage`-ul WebView-ului.

## GitHub Pages

`.github/workflows/pages.yml` rulează testele unitare, construiește jocul și îl publică la fiecare push pe `main`.

Publicare într-un repo **nou** (nu peste cel vechi):

```bash
# 1. Pe github.com: New repository, de exemplu "brasov-runner-v2", public, FĂRĂ README / .gitignore / licență
# 2. În folderul proiectului (istoricul de commit-uri este deja în arhivă):
git remote add origin https://github.com/<utilizator>/brasov-runner-v2.git
git push -u origin main
# 3. În repo: Settings → Pages → Build and deployment → Source: "GitHub Actions"
# 4. Actions → "Publicare pe GitHub Pages" → aștepți bifa verde
```

Adresa jocului va fi `https://<utilizator>.github.io/brasov-runner-v2/`. Vezi și `AUDIT.md` pentru lista de buguri reparate și pentru ce nu a putut fi verificat.

## Cum este făcut (pentru prezentare)

```
src/config.js        TOATE numerele de joc și de economie într-un singur loc
src/logic/           logică pură (fără grafică, fără DOM), acoperită de teste
  generator.js       generatorul de obstacole (garantează că orice rând se poate trece)
  bear.js            mașina de stări a ursului
  collision.js       coliziuni "swept"
  playerState.js     mișcarea jucătorului
  powerups.js        abilitățile (5), când apar, scara de timp a ceasului, programul Coroanelor
  biomes.js          cele 5 niveluri
  save.js            v2: singurul modul de persistență (versiune, migrare, validare)
  economy.js         v2: portofelul cu cele două monede
  missions.js        v2: motorul de misiuni (zilnice, săptămânale, pe cursă)
  battlepass.js      v2: sezonul, treptele, recompensele
  cosmetics.js       v2: catalogul de skinuri, trail-uri, emoji
  revive.js          v2: mașina de stări „Continui?”
  meta.js            v2: leagă salvarea de economie, misiuni, pass și cosmetice
  dates.js           v2: date locale (zi, săptămână), fără capcane de fus orar
  leaderboard.js     Top 10
src/ads/adProvider.js   v2: interfața AdProvider + reclama simulată
src/cloud/              v2.1: conturi și salvare în cloud
  account.js            logica (testată): profiluri, prima conectare, cine câștigă între copii
  firebaseCloud.js      legătura cu Firebase (Google, Firestore)
  mockCloud.js          serviciu fals pentru teste și pentru ?mockauth
  config.js             configurația proiectului Firebase (goală implicit)
src/view/            partea vizuală (Three.js)
  skins/             v2: SkinKit (resurse cu dispose) + skinurile băiatului și ale ursului
  scenery/           decorul fiecărui nivel
  obstacles/         obstacolele nivelurilor 2-5
src/ui.js            HUD, meniu, pauză, „Continui?”, final, reclama simulată, mesaje
src/ui/metaScreens.js   v2: Misiuni, Pass, Garderobă
src/game.js          bucla principală, stările jocului, simularea
src/pwa.js           v2: service worker cu actualizare sigură, instalare
src/input.js, audio.js, main.js
tests/               teste unitare (npm test) + teste de browser
```

Idei tehnice care merită menționate:

- **Generator corect prin construcție** (`advanceReach`): distanța dintre rânduri este un *timp* fix, deci jocul rămâne corect la orice viteză.
- **Simulare în pași ficși de 1/120 s** și coliziuni „swept”: jocul merge la fel pe 60 sau 144 Hz și nu se poate trece prin obstacole.
- **Timp de joc și timp real:** ceasul încetinește timpul *jocului*; ursul și ceasul însuși merg pe timp *real*. Așa regula ursului rămâne exactă.
- **Logică pură, ușor de testat:** misiunile, pass-ul, economia, salvarea și „Continui?” nu ating DOM-ul, iar ceasul și stocarea le sunt date din afară. Testele pot simula orice dată și orice defect de stocare.
- **Mașini de stări pentru acțiunile care costă:** un dublu-click, un răspuns întârziat al unei reclame sau un restart nu pot plăti ori recompensa de două ori.
- **Performanță:** object pooling, decor instanțiat, modele unite pe material, toate nivelurile construite o singură dată, calitate adaptivă (rezoluție, particule, umbre).
- **Securitate:** numele jucătorilor se afișează doar cu `textContent`.

## Teste

```bash
npm test                 # teste unitare
```

Testele de browser pornesc jocul într-un Chromium headless (ai nevoie de Python și Playwright):

```bash
npm run build && npm run preview -- --port 4173      # într-un terminal
pip install playwright && playwright install chromium
python3 tests/browser/game_tests.py                  # în alt terminal (toate)
python3 tests/browser/game_tests.py revive skins     # doar unele grupe
python3 tests/browser/sw_update_test.py              # actualizarea service worker-ului (reconstruiește jocul)
python3 scripts/audio_check.py                       # v3: sunetele și muzica, redate offline și măsurate (nu se pot „asculta” automat)
python3 scripts/shot.py --out /tmp/poze --biome 0,4  # v3: capturi de ecran pe niveluri / acțiuni, ca să VEZI schimbările grafice
```

Ce acoperă: un bot joacă zeci de curse prin toate cele 5 niveluri fără nicio lovitură (și cu abilitățile noi forțate tot timpul), regulile ursului, toate abilitățile, „Continui?” cu toate cazurile limită, misiunile, pass-ul și garderoba prin butoanele reale, skinurile pe toate vehiculele și memoria GPU, salvarea cu stocare blocată, plină sau coruptă, schimbarea zilei, layout-urile, mouse și gamepad, un buget de performanță.

## Personalizare

Totul se reglează în `src/config.js`: cât stai într-un nivel (`biome.duration`), viteza (`speed`), ursul (`bear`), abilitățile (`power`), economia (`economy`), „Continui?” (`revive`), reclama simulată (`ads`), pass-ul (`pass`), XP-ul (`xp`), misiunile (`missions`). Catalogul de skinuri și prețurile sunt în `src/logic/cosmetics.js`, iar lista misiunilor în `src/logic/missions.js`.
