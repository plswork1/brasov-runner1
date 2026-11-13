import * as THREE from 'three';
import { C, geo, mat, mesh } from './materials.js';
import { buildMagnet, buildJetpack, buildClock } from './powerupViews.js';
import { compactModel } from './obstacleViews.js';
import { buildPedalBoatHull } from './obstacles/lake.js';
import { SkinKit } from './skins/kit.js';
import { BOY_SKINS, BASE_COLORS } from './skins/boySkins.js';

/**
 * The boy, built from boxes and spheres. This class only draws: all the movement logic lives in
 * PlayerState. It is animated from that state (lean in turns, tuck in jumps, crouch in slides,
 * tumble after a hit).
 *
 * Rides (one per level, see BIOMES): 'snowboard' on the slope, 'skate' on Strada Republicii and in
 * the mall, 'bike' (a bicycle, sitting on the saddle and pedalling) on Pietonala Tractorul, 'boat'
 * (a pedal boat, sitting and pedalling) on Lacul Noua. Outfit: winter
 * (hat, goggles, scarf) or summer (cap, no scarf).
 *
 * Skins (v2, `setSkin`): the body is the same for every skin; a skin recolors the body materials
 * (owned by this view) and adds extra parts to the torso / head / arms through a SkinKit, which is
 * disposed when the skin is changed. So every skin works with all four rides and changing skins
 * never leaks GPU memory.
 */
export class PlayerView {
  constructor(scene) {
    this.root = new THREE.Group(); // position = (x, y, 0)
    scene.add(this.root);

    const box = (w, h, d) => geo(`b${w},${h},${d}`, () => new THREE.BoxGeometry(w, h, d));
    const sph = (r, ws = 12, hs = 9) => geo(`s${r},${ws},${hs}`, () => new THREE.SphereGeometry(r, ws, hs));
    // an ellipsoid: a sphere stretched to (sx, sy, sz) times its diameter (soft shoes, cheeks)
    const ell = (g, m, x, y, z, sx, sy, sz) => {
      const e = mesh(g, m, x, y, z);
      e.scale.set(sx, sy, sz);
      return e;
    };

    // --- snowboard ---
    const board = new THREE.Group();
    this.boardMat = mat(C.blue);
    this.boardGold = mat(0xffc531, { emissive: 0x6a4500 });
    this.deckParts = [];
    const deck = mesh(box(0.62, 0.09, 2.1), this.boardMat, 0, 0.06, 0);
    board.add(deck);
    this.deckParts.push(deck);
    board.add(mesh(box(0.2, 0.095, 1.6), mat(0xffffff), 0, 0.065, 0)); // center stripe
    for (const z of [-1, 1]) {
      const tip = mesh(box(0.62, 0.09, 0.36), this.boardMat, 0, 0.12, z * 1.1);
      tip.rotation.x = z * 0.4; // upturned nose and tail
      board.add(tip);
      this.deckParts.push(tip);
    }
    for (const z of [-0.5, 0.5]) board.add(mesh(box(0.36, 0.1, 0.3), mat(0x222a3a), 0, 0.15, z));
    this.root.add(board);
    this.board = board;

    // --- skateboard (pedestrian streets, mall) ---
    const skate = new THREE.Group();
    this.skateMat = mat(0x2a2a30);
    this.skateParts = [];
    const sdeck = mesh(box(0.5, 0.06, 1.6), this.skateMat, 0, 0.2, 0);
    skate.add(sdeck);
    this.skateParts.push(sdeck);
    skate.add(mesh(box(0.42, 0.065, 1.2), mat(0xe63946), 0, 0.205, 0)); // grip art
    for (const z of [-1, 1]) {
      const tail = mesh(box(0.5, 0.06, 0.3), this.skateMat, 0, 0.25, z * 0.9);
      tail.rotation.x = z * 0.35;
      skate.add(tail);
      this.skateParts.push(tail);
      skate.add(mesh(box(0.36, 0.06, 0.12), mat(0xb8bfc7), 0, 0.14, z * 0.55)); // truck
    }
    this.skateWheels = [];
    for (const z of [-0.55, 0.55]) {
      for (const x of [-0.2, 0.2]) {
        const w = mesh(geo('skwheel', () => new THREE.CylinderGeometry(0.075, 0.075, 0.08, 10).rotateZ(Math.PI / 2)), mat(0xfff1c1), x, 0.08, z);
        skate.add(w);
        this.skateWheels.push(w);
      }
    }
    skate.visible = false;
    this.root.add(skate);
    this.skate = skate;

    // --- bicycle (Pietonala Tractorul): the boy sits on the saddle and pedals ---
    const bike = new THREE.Group();
    this.bikeMat = mat(0x2d9cdb);
    this.bikeParts = [];
    const tube = (w, h, d, x, y, z, rx = 0) => {
      const m = mesh(box(w, h, d), this.bikeMat, x, y, z);
      m.rotation.x = rx;
      bike.add(m);
      this.bikeParts.push(m);
    };
    // Everything that turns with the handlebar (front wheel, fork, stem, bar, grips, light) lives in
    // `front`; `bikeSteer.rotation.y` turns it about the tilted steering axis (the barspin trick).
    const steerTilt = 0.194;
    const steerPivot = new THREE.Group();
    steerPivot.position.set(0, 0.66, -0.56);
    steerPivot.rotation.x = steerTilt;
    this.bikeSteer = new THREE.Group();
    const front = new THREE.Group();
    front.rotation.x = -steerTilt;
    front.position.copy(steerPivot.position).applyEuler(new THREE.Euler(-steerTilt, 0, 0)).negate();
    this.bikeSteer.add(front);
    steerPivot.add(this.bikeSteer);
    bike.add(steerPivot);
    this.bikeWheels = [];
    for (const z of [-0.62, 0.62]) {
      const w = new THREE.Group();
      w.position.set(0, 0.36, z);
      w.add(mesh(geo('bkTire', () => new THREE.TorusGeometry(0.33, 0.05, 6, 18).rotateY(Math.PI / 2)), mat(0x1a1a1a), 0, 0, 0));
      for (let k = 0; k < 3; k++) {
        const spoke = mesh(box(0.02, 0.62, 0.02), mat(0xd0d5db), 0, 0, 0);
        spoke.rotation.x = (k * Math.PI) / 3;
        w.add(spoke);
      }
      w.add(mesh(geo('bkHub', () => new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8).rotateZ(Math.PI / 2)), mat(0x888888), 0, 0, 0));
      (z < 0 ? front : bike).add(w);
      this.bikeWheels.push(w);
    }
    tube(0.06, 0.06, 0.7, 0, 0.86, -0.15); // top tube
    tube(0.06, 0.06, 0.67, 0, 0.58, -0.25, 0.72); // down tube
    tube(0.06, 0.58, 0.06, 0, 0.63, 0.09, 0.32); // seat tube
    tube(0.05, 0.05, 0.62, 0, 0.36, 0.31); // chain stay
    tube(0.05, 0.05, 0.68, 0, 0.62, 0.4, 0.87); // seat stay
    tube(0.05, 0.52, 0.05, 0, 0.6, -0.56, 0.24); // fork
    front.add(this.bikeParts[this.bikeParts.length - 1]);
    front.add(mesh(box(0.06, 0.2, 0.06), mat(0xb8bfc7), 0, 0.97, -0.5)); // stem
    front.add(mesh(geo('bkBar', () => new THREE.CylinderGeometry(0.025, 0.025, 0.62, 6).rotateZ(Math.PI / 2)), mat(0x333333), 0, 1.06, -0.5));
    for (const sx of [-1, 1]) front.add(mesh(box(0.06, 0.06, 0.1), mat(0x222222), sx * 0.3, 1.06, -0.5)); // grips
    bike.add(mesh(box(0.2, 0.07, 0.3), mat(0x222222), 0, 0.93, 0.2)); // saddle
    front.add(mesh(box(0.16, 0.1, 0.1), mat(0xf2f2f2), 0, 0.9, -0.66)); // front light
    bike.add(mesh(box(0.14, 0.06, 0.04), mat(0xe63946), 0, 0.88, 0.48)); // rear reflector
    const crank = new THREE.Group();
    crank.position.set(0, 0.36, 0);
    crank.add(mesh(geo('bkSprocket', () => new THREE.CylinderGeometry(0.11, 0.11, 0.05, 12).rotateZ(Math.PI / 2)), mat(0x777777), 0.06, 0, 0));
    for (const sx of [-1, 1]) {
      const arm = mesh(geo('bkCrank', () => new THREE.BoxGeometry(0.04, 0.3, 0.05).translate(0, -0.13, 0)), mat(0x666666), sx * 0.12, 0, 0);
      arm.rotation.x = sx > 0 ? Math.PI : 0;
      crank.add(arm);
    }
    bike.add(crank);
    this.bikeCrank = crank;
    bike.visible = false;
    this.root.add(bike);
    this.bike = bike;

    // --- pedal boat (Lacul Noua): the boy sits on the bench and pedals ---
    const hull = buildPedalBoatHull({ seat: 0x2f9bd6 });
    hull.rotation.y = Math.PI; // the boy rides toward -z
    hull.visible = false;
    this.root.add(hull);
    this.hull = hull;
    this.hullParts = [];
    hull.traverse((o) => {
      if (o.isMesh && o.material === mat(0xf6f6f2)) this.hullParts.push(o);
    });
    this.hullMat = mat(0xf6f6f2);

    // --- body (scaled as a whole for the slide crouch) ---
    this.body = new THREE.Group();
    this.root.add(this.body);

    // Body materials are owned by this view (not the shared cache): a skin recolors them.
    const sm = {};
    for (const [k, c] of Object.entries(BASE_COLORS)) sm[k] = new THREE.MeshLambertMaterial({ color: c, flatShading: true });
    this.skinMats = sm;
    const pants = sm.pants;
    this.legs = [];
    for (const z of [-0.5, 0.5]) {
      const leg = new THREE.Group();
      leg.position.set(0, 0.2, z);
      leg.add(mesh(box(0.24, 0.9, 0.26), pants, 0, 0.45, 0));
      leg.add(ell(sph(0.5, 10, 8), sm.boots, 0, 0.07, -0.06, 0.34, 0.2, 0.52)); // rounded shoe
      leg.rotation.x = z > 0 ? -0.44 : 0.44; // knees together toward the hips
      this.body.add(leg);
      this.legs.push(leg);
    }

    // seated legs for the pedal boat: thighs forward (-z), shins down to the pedals
    this.seatLegs = [];
    for (const x of [-0.14, 0.14]) {
      const leg = new THREE.Group();
      leg.position.set(x, 1.02, 0);
      const thigh = mesh(box(0.22, 0.22, 0.55), pants, 0, 0, -0.26);
      leg.add(thigh);
      const shin = new THREE.Group();
      shin.position.set(0, 0, -0.52);
      shin.add(mesh(box(0.2, 0.55, 0.2), pants, 0, -0.26, 0));
      shin.add(ell(sph(0.5, 10, 8), sm.boots, 0, -0.55, -0.08, 0.27, 0.17, 0.44));
      leg.add(shin);
      leg.userData.shin = shin;
      leg.visible = false;
      this.body.add(leg);
      this.seatLegs.push(leg);
    }

    // torso group is turned sideways like a real snowboard stance
    this.torso = new THREE.Group();
    this.torso.position.set(0, 1.02, 0);
    this.torso.rotation.y = -0.75;
    this.body.add(this.torso);
    this.torso.add(mesh(box(0.66, 0.78, 0.42), sm.jacket, 0, 0.4, 0)); // jacket
    const hem = mesh(box(0.7, 0.14, 0.46), sm.hem, 0, 0.1, 0); // jacket hem stripe
    this.torso.add(hem);
    // arms
    this.armL = new THREE.Group();
    this.armR = new THREE.Group();
    for (const [arm, sx] of [
      [this.armL, -1],
      [this.armR, 1],
    ]) {
      arm.position.set(sx * 0.42, 0.72, 0);
      arm.add(mesh(box(0.2, 0.62, 0.22), sm.jacket, 0, -0.28, 0));
      arm.add(mesh(sph(0.13, 8, 6), sm.mitten, 0, -0.62, 0)); // mitten
      this.torso.add(arm);
    }
    // head, hat, goggles, scarf (winter) / cap and hair (summer)
    const head = new THREE.Group();
    head.position.set(0, 0.99, 0);
    head.scale.setScalar(1.14); // rounder, friendlier proportions (hats and helmets scale with it)
    head.add(mesh(sph(0.27), sm.skin, 0, 0, 0));
    const hat = mesh(
      geo('hat', () => new THREE.SphereGeometry(0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.58)),
      sm.hat,
      0,
      0.04,
      0,
    );
    head.add(hat);
    const pompom = mesh(sph(0.1, 8, 6), sm.pompom, 0, 0.34, 0);
    head.add(pompom);
    const strap = mesh(box(0.46, 0.14, 0.1), sm.strap, 0, 0.02, -0.26); // goggle strap front
    const lens = mesh(box(0.32, 0.11, 0.06), sm.lens, 0, 0.02, -0.3);
    head.add(strap, lens);
    // summer: red cap with the visor to the front, a bit of hair, eyes
    const cap = mesh(geo('pcap', () => new THREE.SphereGeometry(0.29, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.5)), sm.cap, 0, 0.05, 0);
    const visor = mesh(box(0.34, 0.04, 0.26), sm.cap, 0, 0.07, -0.33);
    const hair = mesh(box(0.5, 0.14, 0.2), sm.hair, 0, -0.06, 0.18);
    const eyes = new THREE.Group();
    for (const x of [-0.095, 0.095]) {
      eyes.add(mesh(sph(0.052, 8, 6), mat(0xffffff), x, 0.03, -0.235)); // white
      eyes.add(mesh(sph(0.034, 6, 5), mat(0x1a1a1a), x, 0.03, -0.275)); // pupil
    }
    compactModel(eyes); // two meshes instead of four (the group itself is scaled for blinking)
    // nose, rosy cheeks and a small smile: always there (goggles and helmets sit above them)
    const face = new THREE.Group();
    face.add(ell(sph(0.5, 8, 6), sm.skin, 0, -0.05, -0.27, 0.1, 0.09, 0.09));
    for (const x of [-0.15, 0.15]) face.add(ell(sph(0.5, 8, 6), mat(0xf29a8a), x, -0.08, -0.22, 0.1, 0.06, 0.05));
    face.add(mesh(box(0.1, 0.025, 0.03), mat(0x8a3a30), 0, -0.14, -0.245));
    compactModel(face);
    head.add(cap, visor, hair, eyes, face);
    this.head = head;
    this.torso.add(head);
    const scarf = mesh(geo('scarf', () => new THREE.TorusGeometry(0.27, 0.08, 6, 12)), sm.scarf, 0, 0.8, 0);
    scarf.rotation.x = Math.PI / 2;
    this.torso.add(scarf);
    this.scarfTail = mesh(box(0.14, 0.1, 0.7), sm.scarf, 0.12, 0.76, 0.45);
    this.torso.add(this.scarfTail);
    // Base parts a skin can show or hide, per outfit (see BOY_SKINS[...].winter / .summer)
    this.baseParts = { hem, hat, pompom, strap, lens, cap, visor, hair, eyes, scarf, scarfTail: this.scarfTail };
    this.face = face;
    this.winter = true;
    this.kit = null;
    this.extras = { always: [], winter: [], summer: [], noJet: [] };
    this.castShadows = true;
    this.skinId = null;
    this.ride = 'snowboard';

    // --- power-up props (hidden until the power-up is active) ---
    this.magnetProp = buildMagnet();
    this.magnetProp.scale.setScalar(0.62);
    this.magnetProp.position.set(0, -0.86, 0);
    this.armR.add(this.magnetProp);
    this.jetProp = buildJetpack();
    this.jetProp.position.set(0, 0.42, 0.34); // on the back (the boy faces -z)
    this.torso.add(this.jetProp);
    const flameGeo = geo('jp-flame', () => new THREE.ConeGeometry(0.11, 0.6, 10).rotateX(Math.PI).translate(0, -0.3, 0));
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffa23a, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xfff3b0, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false });
    this.flames = [];
    for (const sx of [-1, 1]) {
      const f = new THREE.Group();
      f.position.set(sx * 0.19, -0.45, 0.06);
      f.add(new THREE.Mesh(flameGeo, flameMat));
      const core = new THREE.Mesh(flameGeo, coreMat);
      core.scale.set(0.5, 0.6, 0.5);
      f.add(core);
      this.jetProp.add(f);
      this.flames.push(f);
    }
    this.magnetProp.visible = false;
    this.jetProp.visible = false;

    // v2: "Scutul Bastionului" = a translucent bubble with a ring of battlements turning around it
    const shieldMat = new THREE.MeshBasicMaterial({ color: 0x6dffa0, transparent: true, opacity: 0.13, depthWrite: false, blending: THREE.AdditiveBlending });
    const shieldEdge = new THREE.MeshBasicMaterial({ color: 0xc9ffd9, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending });
    this.shieldProp = new THREE.Group();
    this.shieldProp.position.set(0, 1.0, 0);
    const bubble = new THREE.Mesh(geo('shield-bubble', () => new THREE.SphereGeometry(1.3, 20, 14)), shieldMat);
    bubble.scale.set(1, 1.08, 1);
    this.shieldProp.add(bubble);
    this.shieldRing = new THREE.Group();
    this.shieldRing.add(new THREE.Mesh(geo('shield-ring', () => new THREE.TorusGeometry(1.32, 0.03, 5, 40).rotateX(Math.PI / 2)), shieldEdge));
    for (let k = 0; k < 12; k++) {
      const a = (k / 12) * Math.PI * 2;
      const merlon = new THREE.Mesh(geo('shield-merlon', () => new THREE.BoxGeometry(0.2, 0.2, 0.05)), shieldEdge);
      merlon.position.set(Math.sin(a) * 1.32, 0.12, Math.cos(a) * 1.32);
      merlon.rotation.y = a;
      this.shieldRing.add(merlon);
    }
    compactModel(this.shieldRing); // ring + 12 battlements = one draw call
    this.shieldProp.add(this.shieldRing);
    this.shieldProp.traverse((o) => (o.userData.noShadow = true));
    this.shieldProp.visible = false;
    this.root.add(this.shieldProp);
    this.shieldMat = shieldMat;

    // v2: "Ceasul din Piața Sfatului" floats beside the boy's shoulder, its hands spinning
    this.clockProp = compactModel(buildClock());
    this.clockProp.traverse((o) => (o.userData.noShadow = true)); // a small floating prop: not worth a shadow pass
    this.clockProp.scale.setScalar(0.7);
    this.clockProp.position.set(0.85, 2.15, 0.1);
    this.clockHands = this.clockProp.getObjectByName('hands');
    this.clockProp.visible = false;
    this.root.add(this.clockProp);

    // --- blob shadow (only used when real shadows are switched off) ---
    this.shadow = mesh(
      geo('shadow', () => new THREE.CircleGeometry(0.95, 16).rotateX(-Math.PI / 2)),
      new THREE.MeshBasicMaterial({ color: 0x1a2c4a, transparent: true, opacity: 0.2, depthWrite: false }),
      0,
      0.04,
      0,
    );
    scene.add(this.shadow);

    // damped springs {x: value, v: velocity}: events kick them, update() lets them settle
    const sp = () => ({ x: 0, v: 0 });
    this.roll = sp(); // lean into lane changes (overshoots a little)
    this.yaw = sp(); // nose turn into lane changes
    this.sq = sp(); // squash (-) and stretch (+) about the feet
    this.hop = sp(); // bounce after a landing (the pedal boat splashes)
    this.flinch = sp(); // startled by a near miss
    this.joy = sp(); // small pump on a coin
    this.crouch = sp(); // 0..1 slide duck (a spring: soft start, tiny overshoot)
    this.look = 0; // head turn toward the lane he is going to
    this.airK = 0;
    this.deadK = 0;
    this.airT = -1;
    this.superAir = false;
    this.flipDir = 1;
    this.flipA = 0;
    this.spinA = 0; // whole-body trick angle (snowboard 360)
    this.barA = 0; // bike barspin angle
    this.lastVy = 0;
    this.blinkT = 2;
    this.t = 0;
    this.tumble = 0; // seconds of tumble left
    this.tumbleTotal = 0.55;
    this.flicker = false;
    this.goldBoard = false;
    this.blob = true;
    this.setSkin('clasic');
  }

  /**
   * Change the outfit (v2). Recolors the body, removes the extra parts of the old skin and FREES
   * their geometries and materials, then builds the extras of the new one.
   * Works at any time, also in the middle of a run.
   */
  setSkin(id) {
    const spec = BOY_SKINS[id] ?? BOY_SKINS.clasic;
    if (spec.id === this.skinId) return;
    for (const list of Object.values(this.extras)) for (const o of list) o.removeFromParent();
    this.kit?.dispose();
    this.kit = new SkinKit();
    for (const [k, m] of Object.entries(this.skinMats)) m.color.setHex(spec.colors[k] ?? BASE_COLORS[k]);
    const anchors = { torso: this.torso, head: this.head, armL: this.armL, armR: this.armR, scarfTail: this.scarfTail };
    const built = spec.build ? spec.build(this.kit, anchors) : {};
    // (each list is merged per material: a skin adds a handful of draw calls, not dozens)
    const pack = (list) => this.kit.compact(list ?? []);
    this.extras = { always: pack(built.always), winter: pack(built.winter), summer: pack(built.summer), noJet: pack(built.noJet) };
    for (const list of Object.values(this.extras)) for (const o of list) o.traverse((x) => (x.castShadow = this.castShadows));
    this.skin = spec;
    this.skinId = spec.id;
    this._applyOutfit();
  }

  /** Show the base parts and the extras that belong to the current skin and season. */
  _applyOutfit() {
    const spec = this.skin;
    if (!spec) return;
    const shown = new Set(this.winter ? spec.winter : spec.summer);
    for (const [name, part] of Object.entries(this.baseParts)) part.visible = shown.has(name);
    for (const o of this.extras.winter) o.visible = this.winter;
    for (const o of this.extras.summer) o.visible = !this.winter;
  }

  /** Free the GPU resources of the current skin (only needed when the view itself is thrown away). */
  dispose() {
    for (const list of Object.values(this.extras)) for (const o of list) o.removeFromParent();
    this.extras = { always: [], winter: [], summer: [], noJet: [] };
    this.kit?.dispose();
    this.kit = null;
    this.skinId = null;
    for (const m of Object.values(this.skinMats)) m.dispose();
  }

  /** Real shadow maps on -> hide the fake blob shadow. */
  setBlobShadow(on) {
    this.blob = on;
    this.shadow.visible = on;
  }

  /** Swap the ride between its normal colors and the golden super board. */
  _setGold(on) {
    if (on === this.goldBoard) return;
    this.goldBoard = on;
    for (const m of this.deckParts) m.material = on ? this.boardGold : this.boardMat;
    for (const m of this.skateParts) m.material = on ? this.boardGold : this.skateMat;
    for (const m of this.hullParts) m.material = on ? this.boardGold : this.hullMat;
    for (const m of this.bikeParts) m.material = on ? this.boardGold : this.bikeMat;
  }

  /** Body offset for the seated rides: on the bench of the boat, on the saddle of the bike. */
  _seat() {
    if (this.ride === 'boat') return { y: -0.36, z: 0 };
    if (this.ride === 'bike') return { y: -0.08, z: 0.16 };
    return { y: 0, z: 0 };
  }

  /**
   * Change what the boy rides and how he is dressed (called when the level changes).
   * @param ride 'snowboard' | 'skate' | 'bike' | 'boat'
   * @param winter true: hat, goggles and scarf; false: cap
   */
  setRide(ride, winter) {
    this.ride = ride;
    this.board.visible = ride === 'snowboard';
    this.skate.visible = ride === 'skate';
    this.hull.visible = ride === 'boat';
    this.bike.visible = ride === 'bike';
    const seated = ride === 'boat' || ride === 'bike';
    for (const l of this.legs) l.visible = !seated;
    for (const l of this.seatLegs) l.visible = seated;
    this.torso.rotation.y = seated ? 0 : -0.75; // sideways stance on boards, facing forward when seated
    const seat = this._seat();
    this.body.position.set(0, seat.y, seat.z);
    this.winter = !!winter;
    this._applyOutfit();
    const g = this.goldBoard;
    this.goldBoard = !g;
    this._setGold(g); // re-apply the gold state to the new ride
  }

  /** Start the short stumble animation (after the first hit). */
  startTumble() {
    this.tumble = this.tumbleTotal;
  }

  reset() {
    for (const s of [this.roll, this.yaw, this.sq, this.hop, this.flinch, this.joy, this.crouch]) s.x = s.v = 0;
    this.look = this.airK = this.deadK = this.flipA = this.spinA = this.barA = 0;
    this.airT = -1;
    this.tumble = 0;
    this.root.visible = true;
    this.root.rotation.set(0, 0, 0);
    this.body.scale.set(1, 1, 1);
    const seat = this._seat();
    this.body.position.set(0, seat.y, seat.z);
    this.flicker = false;
    this.magnetProp.visible = false;
    this.jetProp.visible = false;
    this.shieldProp.visible = false;
    this.clockProp.visible = false;
    this._setGold(false);
  }

  /**
   * Is a ride 'seated' (bike, boat) or standing (snowboard, skate)?
   * (Standing rides turn the torso sideways, so the head is turned back toward the direction of travel.)
   */
  _headBase() {
    return this.ride === 'boat' || this.ride === 'bike' ? 0 : 0.55;
  }

  /** React to the events of the last frame: each one kicks a spring, the springs do the animation. */
  _onEvents(events, p) {
    for (const e of events) {
      if (e === 'jump' || e === 'superjump') {
        // quick squat, then the spring throws him up past rest height (anticipation + stretch)
        this.sq.x = -0.13;
        this.sq.v = e === 'superjump' ? 12 : 9;
        this.airT = 0;
        this.superAir = e === 'superjump';
        this.flipDir = Math.random() < 0.5 ? -1 : 1;
        this.hop.v += 1.2;
      } else if (e === 'land') {
        const hard = Math.min(1, this.lastVy / 11);
        this.sq.x = -0.08 - 0.14 * hard; // squash, then recovers with a little overshoot
        this.sq.v = 0;
        this.hop.v += this.ride === 'boat' ? 2.6 + 2 * hard : 0.4;
        this.airT = -1;
      } else if (e === 'nearMiss') {
        this.flinch.v += 7;
      } else if (e === 'coin') {
        this.joy.v += 3.2;
      } else if (e === 'slide') {
        this.sq.v -= 1.5;
      }
    }
  }

  /**
   * @param p  PlayerState
   * @param dt frame time
   * @param o  {invulnerable, dead, riding(bool), speed, speedK, events: string[], state,
   *            power: {magnet, board, jetpack, shield, slowmo, ending: {type: bool}},
   *            previewYaw?: number (wardrobe turntable: the boy is turned by this angle)}
   * All motion is procedural: small damped springs (roll, yaw, squash, flinch...) that the events
   * of the frame kick, so the boy overshoots and settles instead of following the state like a rigid box.
   */
  update(p, dt, o = {}) {
    this.t += dt;
    const r = this.root;
    r.position.set(p.x, p.y, 0);
    const T = this.t;
    const dtc = Math.min(dt, 1 / 30);
    const boat = this.ride === 'boat';
    const bike = this.ride === 'bike';
    const skate = this.ride === 'skate';
    const seated = boat || bike;
    const sk = o.speedK ?? 0;
    const menu = o.state === 'menu';
    if (o.events && o.events.length && dt > 0) this._onEvents(o.events, p);
    if (!p.grounded) this.lastVy = -p.vy;
    // air time since take-off (-1 on the ground)
    if (p.grounded || p.flying) this.airT = -1;
    else if (this.airT < 0) this.airT = 0;
    else this.airT += dt;
    const air = this.airT >= 0 ? Math.min(1, this.airT / (this.superAir ? 1.0 : 0.68)) : 0;

    if (dt > 0) {
      // --- springs (semi-implicit Euler, two sub-steps keep them stable at low frame rates)
      const lv = THREE.MathUtils.clamp(p.laneVel, -30, 30);
      const rollT = THREE.MathUtils.clamp(-lv * (boat ? 0.016 : 0.012), -0.5, 0.5);
      const yawT = -lv * (boat ? 0.03 : 0.008);
      const stiff = 240;
      const damp = 2 * Math.sqrt(stiff) * 0.8; // damping ratio 0.8: a soft lean with almost no overshoot (0.5 felt jerky)
      for (let i = 0; i < 2; i++) {
        const h = dtc / 2;
        this.roll.v += ((rollT - this.roll.x) * stiff - this.roll.v * damp) * h;
        this.roll.x += this.roll.v * h;
        this.yaw.v += ((yawT - this.yaw.x) * 160 - this.yaw.v * 2 * Math.sqrt(160) * 0.8) * h;
        this.yaw.x += this.yaw.v * h;
        this.sq.v += (-this.sq.x * 420 - this.sq.v * 2 * Math.sqrt(420) * 0.32) * h;
        this.sq.x += this.sq.v * h;
        this.hop.v += (-this.hop.x * 300 - this.hop.v * 2 * Math.sqrt(300) * 0.22) * h;
        this.hop.x += this.hop.v * h;
        this.flinch.v += (-this.flinch.x * 260 - this.flinch.v * 2 * Math.sqrt(260) * 0.35) * h;
        this.flinch.x += this.flinch.v * h;
        this.joy.v += (-this.joy.x * 260 - this.joy.v * 2 * Math.sqrt(260) * 0.3) * h;
        this.joy.x += this.joy.v * h;
        const slideT = p.sliding ? 1 : 0;
        this.crouch.v += ((slideT - this.crouch.x) * 700 - this.crouch.v * 2 * Math.sqrt(700) * 0.85) * h;
        this.crouch.x += this.crouch.v * h;
      }
      this.sq.x = THREE.MathUtils.clamp(this.sq.x, -0.3, 0.3);
      this.crouch.x = THREE.MathUtils.clamp(this.crouch.x, -0.05, 1.08);
      const k = 1 - Math.exp(-10 * dt);
      this.look += (THREE.MathUtils.clamp(-lv * 0.035, -0.6, 0.6) - this.look) * k;
      this.airK += ((air > 0 || !p.grounded ? 1 : 0) - this.airK) * (1 - Math.exp(-14 * dt));
      this.deadK += ((o.dead ? 1 : 0) - this.deadK) * (1 - Math.exp(-9 * dt));
      // blink: eyes close for ~0.12 s every 2-5 s
      this.blinkT -= dt;
      if (this.blinkT < -0.12) this.blinkT = 2 + Math.random() * 3;
    }
    const crouch = this.crouch.x;
    this.crouchView = crouch;

    // --- root: lean (roll), yaw into the turn, pitch with vertical speed, plus the tumble
    const pitch = THREE.MathUtils.clamp(p.vy * 0.016, -0.35, 0.3);
    const wobble = o.riding === false ? 0 : boat ? Math.sin(T * 2.3) * 0.045 : Math.sin(T * 9) * 0.025 * (p.grounded ? 1 : 0.3);
    const bobPitch = boat && p.grounded ? Math.sin(T * 2.9 + 1) * 0.03 : 0;
    let rx = pitch + bobPitch + (boat && !p.grounded ? -0.12 * Math.sin(Math.min(1, air * 1.6) * Math.PI) : 0);
    let rz = this.roll.x + wobble;
    let ry = o.previewYaw !== undefined ? o.previewYaw : this.yaw.x;
    let lift = 0;
    if (boat && p.grounded) lift = Math.sin(T * 2.3) * 0.045 + 0.02;
    if (boat) lift += Math.max(-0.12, this.hop.x) * 0.5; // the hull bobs after a landing
    if (this.tumble > 0 && dt > 0) this.tumble = Math.max(0, this.tumble - dt);
    if (this.tumble > 0) {
      // a forward somersault with a sideways wobble and a hop (ends exactly at 0 so nothing snaps back)
      const k = 1 - this.tumble / this.tumbleTotal;
      const e = k * k * (3 - 2 * k);
      rx = -e * Math.PI * 2 + pitch * (1 - k);
      rz += Math.sin(k * Math.PI * 2) * 0.35;
      lift += Math.sin(k * Math.PI) * 0.7;
    }
    rx = rx * (1 - this.deadK) + (boat ? -0.35 : -1.1) * this.deadK;
    lift += 0.1 * this.deadK;
    // --- snowboard trick: a 360 spin of the whole boy with his board (two turns on a super jump).
    // The angle ends on a whole turn before the landing.
    const snow = this.ride === 'snowboard';
    const TURN = Math.PI * 2;
    if (this.airT >= 0 && !p.flying && !o.dead && this.tumble <= 0 && snow) {
      this.spinA = THREE.MathUtils.smoothstep(air, 0.06, 0.8) * TURN * (this.superAir ? 2 : 1) * this.flipDir;
    } else if (this.spinA) {
      // landed (or fell) mid-trick: finish to the nearest whole turn quickly, then reset
      const whole = Math.round(this.spinA / TURN) * TURN;
      this.spinA += (whole - this.spinA) * (1 - Math.exp(-22 * dt));
      if (Math.abs(whole - this.spinA) < 0.05 || dt <= 0) this.spinA = 0;
    }
    if (this.spinA && snow) ry += this.spinA;
    if (bike && this.airT >= 0 && !p.flying && !o.dead && this.tumble <= 0) {
      // the bike turns a little sideways in the air, so the spinning handlebar is not hidden behind his back
      ry += 0.6 * this.flipDir * Math.sin(THREE.MathUtils.clamp((air - 0.04) / 0.92, 0, 1) * Math.PI);
    }
    r.rotation.set(rx, ry, rz);
    r.position.y += lift;

    // --- body: squash and stretch about the feet, slide duck, air tuck
    const airTuck = 0.18 * this.airK;
    const breathe = menu ? Math.sin(T * 2.2) * 0.012 : 0;
    const sq = this.sq.x;
    this.body.scale.set(1 - sq * 0.55, (1 - 0.46 * crouch - airTuck) * (1 + sq) + breathe, 1 - sq * 0.55);
    // torso: bends into the slide (and the bike), tucks at speed, rocks back when startled
    const tuck = seated ? 0 : 0.2 * sk * (1 - crouch);
    let torsoX = 0.85 * crouch - (bike ? 0.35 * (1 - crouch) : 0) + tuck - 0.3 * this.flinch.x;
    this.torso.rotation.z = THREE.MathUtils.clamp(-this.roll.x * 0.5, -0.3, 0.3); // spine counter-leans a little
    // --- arms: balance against the lean; a quick throw up for a flinch and a small pump for a coin
    const swing = p.grounded ? Math.sin(T * 6) * 0.3 : 0;
    const armSpread = p.grounded ? 0 : 0.9;
    const bal = this.roll.x * 1.6;
    let aLz = -0.4 - swing - armSpread - bal - this.flinch.x * 1.2;
    let aRz = 0.4 + swing + armSpread - bal + this.flinch.x * 1.2;
    let aLx = -this.joy.x * 1.2;
    let aRx = -this.joy.x * 1.2;
    // --- head: looks where he is going, stays level against the lean, nods on coins
    let headX = -0.45 * crouch + this.joy.x * 0.4 + this.flinch.x * 0.2;
    let headY = this._headBase() + this.look;
    if (menu) headY += Math.sin(T * 0.8) * 0.3; // idle: looks around
    if (menu) aLz += Math.sin(T * 1.7) * 0.06;
    const fall = this.deadK;

    // --- per-ride air poses (all driven by `air`, 0..1 over the jump)
    const u = air;
    const bump = (a, b) => {
      // smooth 0 -> 1 -> 0 hump between a and b
      const x = THREE.MathUtils.clamp((u - a) / (b - a), 0, 1);
      return Math.sin(x * Math.PI);
    };
    const board = this.board;
    board.rotation.set(0, 0, 0);
    board.position.set(0, 0, 0);
    const sg = this.skate;
    sg.rotation.set(0, 0, 0);
    sg.position.set(0, 0, 0);
    const bk = this.bike;
    bk.rotation.set(0, 0, 0);
    bk.position.set(0, 0, 0);
    const seat = this._seat();
    this.body.position.set(0, seat.y, seat.z);
    this.body.rotation.set(0, 0, 0);
    this.hull.position.y = 0;
    let barOff = 0; // 0..1: hands off the handlebar
    if (!bike) this.barA = 0;
    if (this.airT >= 0 && !p.flying) {
      if (this.ride === 'snowboard') {
        // 360 with a grab (the root spins, see spinA): knees up, one hand on the board, nose pulled up
        const w = Math.min(1, bump(0.1, 0.92) * 1.6);
        board.rotation.z = 0.22 * w;
        board.rotation.x = -0.18 * w;
        torsoX += 0.35 * w;
        aRz = aRz * (1 - w) + (0.15 + this.roll.x) * w;
        aRx = aRx * (1 - w) + 0.9 * w;
        aLz = aLz * (1 - w) + (-1.5) * w;
        headX += 0.15 * w;
      } else if (skate) {
        // kickflip: the board spins about its long axis under the feet, he leans back a little
        const f = THREE.MathUtils.smoothstep(u, 0.1, 0.72) * Math.PI * 2 * this.flipDir;
        this.flipA = f;
        const c = Math.cos(f);
        const s = Math.sin(f);
        sg.rotation.z = f;
        sg.position.set(0.2 * s, 0.2 - 0.2 * c, 0);
        torsoX -= 0.12 * bump(0.1, 0.9);
        aLz -= 0.4 * bump(0.1, 0.9);
        aRz += 0.4 * bump(0.1, 0.9);
      } else if (bike) {
        // barspin: front wheel up, he lets go and the handlebar spins a full turn, then he catches it
        const w = bump(0.05, 0.95);
        const a = 0.3 * w;
        this._pivot(bk, a, 0.36, 0.62);
        this.body.rotation.x = a * 0.9;
        this._pivotPos(this.body, a * 0.9, 0.36, 0.62, seat);
        torsoX -= 0.1 * w;
        this.barA = THREE.MathUtils.smoothstep(u, 0.12, 0.74) * Math.PI * 2 * this.flipDir;
        barOff = bump(0.08, 0.8);
      } else if (boat) {
        // a hop: the bow lifts, legs kick out
        this.hull.position.y = 0.05 * bump(0, 1);
      }
    } else if (bike && this.barA) {
      // landed (or fell) mid-spin: finish to the nearest whole turn quickly
      const whole = Math.round(this.barA / (Math.PI * 2)) * Math.PI * 2;
      this.barA += (whole - this.barA) * (1 - Math.exp(-22 * dt));
      if (Math.abs(whole - this.barA) < 0.05 || dt <= 0) this.barA = 0;
    } else if (skate && this.flipA) {
      // landed (or fell) mid-flip: finish to the nearest whole turn quickly, then reset
      this.flipA += (Math.round(this.flipA / (Math.PI * 2)) * Math.PI * 2 - this.flipA) * (1 - Math.exp(-22 * dt));
      if (Math.abs(Math.round(this.flipA / (Math.PI * 2)) * Math.PI * 2 - this.flipA) < 0.05) this.flipA = 0;
      sg.rotation.z = this.flipA;
      sg.position.set(0.2 * Math.sin(this.flipA), 0.2 - 0.2 * Math.cos(this.flipA), 0);
    }
    this.torso.rotation.x = torsoX;
    this.bikeSteer.rotation.y = this.barA;

    // legs / pedalling / wheels
    if (boat) {
      const speed = o.speed ?? 15;
      this.pedalPhase = (this.pedalPhase ?? 0) + dt * (4 + speed * 0.25);
      for (let i = 0; i < this.seatLegs.length; i++) {
        const a = this.pedalPhase + i * Math.PI;
        this.seatLegs[i].rotation.x = -0.2 + Math.sin(a) * 0.32 - (p.grounded ? 0 : 0.35);
        this.seatLegs[i].userData.shin.rotation.x = -0.25 + Math.cos(a) * 0.35;
      }
      this.hull.userData.wheel.rotation.x = this.pedalPhase * 1.4;
      if (p.grounded) {
        aLz = -0.25 - bal;
        aRz = 0.25 - bal;
        aLx = 0.35;
        aRx = 0.35;
      }
    } else if (bike) {
      const speed = o.speed ?? 15;
      const spin = (dt * speed) / 0.33;
      for (const w of this.bikeWheels) w.rotation.x -= spin;
      this.pedalPhase = (this.pedalPhase ?? 0) + spin * 0.45;
      this.bikeCrank.rotation.x = -this.pedalPhase;
      for (let i = 0; i < this.seatLegs.length; i++) {
        const a = this.pedalPhase + i * Math.PI;
        this.seatLegs[i].rotation.x = -0.42 + Math.sin(a) * 0.28;
        this.seatLegs[i].userData.shin.rotation.x = -0.3 + Math.cos(a) * 0.35;
      }
      // hands on the grips; during the barspin they let go (up and out of the bar's way)
      aLz = -0.15 - bal * 0.5 - 0.7 * barOff;
      aRz = 0.15 - bal * 0.5 + 0.7 * barOff;
      aLx = 0.95 - this.flinch.x * 0.8 - 0.55 * barOff;
      aRx = 0.95 - this.flinch.x * 0.8 - 0.55 * barOff;
    } else {
      if (skate) {
        const spin = dt * (o.speed ?? 15) * 9;
        for (const w of this.skateWheels) w.rotation.x -= spin;
      }
      // standing legs: knees bend in the air and on the slide, a bit of push on the skateboard
      const kick = skate && p.grounded ? Math.sin(T * 5) * 0.06 : 0;
      this.legs[0].rotation.x = 0.44 + 0.2 * this.airK + kick;
      this.legs[1].rotation.x = -0.44 - 0.2 * this.airK + kick;
    }

    // tumble / limp: arms flail, then hang
    if (this.tumble > 0) {
      const f = Math.sin(T * 38) * 0.5;
      aLz = -1.7 + f;
      aRz = 1.7 - f;
    }
    if (fall > 0.01) {
      aLz = aLz * (1 - fall) + -0.9 * fall;
      aRz = aRz * (1 - fall) + 0.9 * fall;
    }
    this.armL.rotation.z = aLz;
    this.armR.rotation.z = aRz;
    this.armL.rotation.x = aLx;
    this.armR.rotation.x = aRx;
    this.head.rotation.set(headX, headY, -this.roll.x * 0.6 + this.torso.rotation.z * 0.4);
    // eyes close for a blink
    this.baseParts.eyes.scale.y = this.blinkT < 0 ? 0.12 : 1;

    // secondary motion: the scarf tail streams behind (flutters more with speed, lags in turns),
    // the pompom swings against the head movement
    const flutter = 0.35 + 0.65 * sk;
    this.scarfTail.rotation.y = Math.sin(T * 11) * 0.3 * flutter - this.roll.v * 0.05;
    this.scarfTail.rotation.x = THREE.MathUtils.clamp(-0.25 * sk + p.vy * 0.03 + Math.sin(T * 8) * 0.1 * flutter, -0.6, 0.6);
    this.scarfTail.position.z = 0.45 + Math.sin(T * 13) * 0.05 * flutter;
    this.baseParts.pompom.position.set(-this.roll.v * 0.01, 0.34 - sq * 0.3 + this.joy.x * 0.03, Math.max(0, -sq) * 0.2);

    // power-up props. They blink during the last seconds instead of showing a timer on screen.
    const pw = o.power;
    const blink = Math.floor(T * 9) % 2 === 0;
    const show = (type) => !!pw && pw[type] && (!pw.ending[type] || blink);
    this.magnetProp.visible = show('magnet');
    this.jetProp.visible = !!pw && pw.jetpack;
    this._setGold(show('board'));
    if (this.jetProp.visible) {
      // flames flicker; they blink off for a moment when the fuel runs out
      const on = !pw.ending.jetpack || blink;
      for (let i = 0; i < this.flames.length; i++) {
        const f = this.flames[i];
        f.visible = on;
        const k = 0.8 + Math.sin(T * 40 + i * 2) * 0.15 + Math.random() * 0.15;
        f.scale.set(1, k, 1);
      }
      // flying pose: Superman-ish, arms spread, legs hang and trail a little
      this.armL.rotation.z = -1.1;
      this.armR.rotation.z = 1.1;
      this.legs[0].rotation.x = 0.44 + 0.25;
      this.legs[1].rotation.x = -0.44 - 0.25;
    }
    if (this.magnetProp.visible) {
      this.armR.rotation.z = 2.3; // hold the magnet up in front
      this.armR.rotation.x = 0;
    }
    // skin parts that sit on the back make room for the jetpack
    const backFree = !this.jetProp.visible;
    for (const part of this.extras.noJet) part.visible = backFree;
    // shield bubble: pulses, its ring of battlements turns; clock: floats, hands spin
    this.shieldProp.visible = show('shield');
    if (this.shieldProp.visible) {
      this.shieldRing.rotation.y = T * 1.6;
      this.shieldRing.position.y = Math.sin(T * 2.2) * 0.35;
      this.shieldMat.opacity = 0.12 + Math.sin(T * 5) * 0.04;
      const sy = (p.sliding ? 0.72 : 1) + Math.sin(T * 5) * 0.015;
      this.shieldProp.scale.set(1, sy, 1);
      this.shieldProp.position.y = p.sliding ? 0.75 : 1.0;
      this.shieldProp.rotation.z = -r.rotation.z; // stays upright while the boy leans
    }
    this.clockProp.visible = show('slowmo');
    if (this.clockProp.visible) {
      this.clockProp.position.y = 2.15 + Math.sin(T * 2.4) * 0.08;
      this.clockProp.rotation.y = Math.sin(T * 1.3) * 0.5 - r.rotation.y;
      for (const h of this.clockHands.children) h.rotation.z = -T * (h.name === 'minute' ? 7 : 0.9) - (h.name === 'hour' ? 1 : 0);
    }

    // blink while invulnerable
    if (o.invulnerable) {
      this.flicker = !this.flicker || Math.floor(T * 14) % 2 === 0;
      r.visible = Math.floor(T * 14) % 2 === 0;
    } else {
      r.visible = true;
    }

    // blob shadow follows x and shrinks with height
    this.shadow.position.x = p.x;
    const sc = 1 / (1 + p.y * 0.5);
    this.shadow.scale.set(sc, 1, sc);
    this.shadow.material.opacity = 0.2 * sc;
    this.shadow.visible = this.blob;
  }

  /** Rotate `obj` about the x axis through the point (0, py, pz) of its parent (it starts at the origin). */
  _pivot(obj, a, py, pz) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    obj.rotation.x = a;
    obj.position.set(0, py - (py * c - pz * s), pz - (py * s + pz * c));
  }

  /** Same pivot for an object that sits at `base` instead of the origin. */
  _pivotPos(obj, a, py, pz, base) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    obj.position.set(0, base.y + py - (py * c - pz * s), base.z + pz - (py * s + pz * c));
  }
}
