import * as THREE from 'three';
import { CFG } from '../config.js';
import { BearPhase } from '../logic/bear.js';
import { geo, mat, mesh } from './materials.js';
import { SkinKit } from './skins/kit.js';
import { BEAR_SKINS, BEAR_BASE } from './skins/bearSkins.js';

const easeOut = (x) => 1 - (1 - x) * (1 - x);
const BASE_SCALE = 1.0;
const RIDER_SCALE = 0.85; // the upright riding bear is scaled so it is no taller than the running one

/**
 * The bear. Pure visuals: its position/pose is computed from the BearState (phase, elapsed time).
 *  - CHASING: runs right behind the player, galloping, bobbing side to side
 *  - LEAVING: slows down and falls behind (slides toward the camera and out of view)
 *  - CAUGHT : lunges onto the player
 *
 * Modes (BIOMES[i].bear): 'run' (on all fours), 'swim', and two riding modes where an upright bear
 * pedals a vehicle: 'unicycle' (Pietonala Tractorul) and 'hydro' (Lacul Noua: a big paddle-wheel
 * water unicycle, with a life vest and a captain's hat). A riding bear wobbles to keep its balance,
 * flails its arms, and when it gives up (LEAVING) it topples over sideways.
 *
 * Skins (v2, `setSkin`): the three fur materials are owned by this view and are recolored; the
 * extra parts of a skin (scarf, hat...) are built through a SkinKit and disposed when the skin
 * changes. A skin dresses both bodies, so it works in all four modes.
 */
export class BearView {
  constructor(scene) {
    this.root = new THREE.Group();
    this.root.visible = false;
    scene.add(this.root);

    // Fur materials owned by the view (not the shared cache), so a skin can recolor them.
    const own = (c) => new THREE.MeshLambertMaterial({ color: c, flatShading: true });
    const fur = own(BEAR_BASE.fur);
    const furDark = own(BEAR_BASE.dark);
    const furLight = own(BEAR_BASE.light);
    this.furMats = { fur, dark: furDark, light: furLight };
    const sph = (r, ws = 12, hs = 9) => geo(`bs${r},${ws},${hs}`, () => new THREE.SphereGeometry(r, ws, hs));
    const cyl = (rt, rb, h) => geo(`bc${rt},${rb},${h}`, () => new THREE.CylinderGeometry(rt, rb, h, 8));

    this.rig = new THREE.Group(); // everything is scaled/bobbed through this
    this.root.add(this.rig);
    this.rig.scale.setScalar(BASE_SCALE);

    // body: a big squashed sphere, longer along Z, with a shoulder hump
    const body = mesh(sph(1), fur, 0, 1.25, 0);
    body.scale.set(0.95, 0.9, 1.45);
    this.rig.add(body);
    const hump = mesh(sph(0.75), fur, 0, 1.85, -0.5);
    this.rig.add(hump);
    this.rig.add(mesh(sph(0.45, 8, 6), furDark, 0, 1.3, 1.45)); // rump / tail stub
    // head (faces -Z, toward the player)
    this.head = new THREE.Group();
    this.head.position.set(0, 1.75, -1.55);
    this.head.add(mesh(sph(0.62), fur, 0, 0, 0));
    const snout = mesh(sph(0.34, 10, 8), furLight, 0, -0.14, -0.5);
    snout.scale.set(1, 0.8, 1.2);
    this.head.add(snout);
    this.head.add(mesh(sph(0.1, 8, 6), mat(0x111111), 0, -0.04, -0.82)); // nose
    for (const sx of [-1, 1]) {
      this.head.add(mesh(sph(0.2, 8, 6), furDark, sx * 0.42, 0.5, 0.05)); // ears
      this.head.add(mesh(sph(0.075, 6, 5), mat(0xffe9a0), sx * 0.24, 0.12, -0.5)); // eyes
      this.head.add(mesh(sph(0.04, 6, 5), mat(0x111111), sx * 0.24, 0.12, -0.57));
    }
    // open mouth (dark red ellipsoid in the snout, hidden until the bear roars)
    this.mouth = mesh(sph(0.3, 10, 8), mat(0x5a1414), 0, -0.34, -0.62);
    this.mouth.scale.set(0.8, 0.01, 0.9);
    this.mouth.visible = false;
    this.head.add(this.mouth);
    this.rig.add(this.head);
    // legs (4), swung in a gallop
    this.legs = [];
    const legSpots = [
      [-0.55, -0.9],
      [0.55, -0.9],
      [-0.55, 0.9],
      [0.55, 0.9],
    ];
    for (const [x, z] of legSpots) {
      const leg = new THREE.Group();
      leg.position.set(x, 0.95, z);
      leg.add(mesh(cyl(0.3, 0.24, 1.0), fur, 0, -0.45, 0));
      leg.add(mesh(sph(0.3, 8, 6), furDark, 0, -0.95, -0.05)); // paw
      this.rig.add(leg);
      this.legs.push(leg);
    }

    this._buildRider({ fur, furDark, furLight, sph, cyl });

    this.t = 0;
    this.px = 0; // smoothed sideways position (lags a little behind the player)
    this.pedalPhase = 0;
    this.roar = 0; // 0..1, smoothed roar amount
    this.mode = 'run';
    this.riding = false;
    this.kit = null;
    this.extras = [];
    this.skinId = null;
    this.castShadows = true;
    this.setMode('run');
    this.setSkin('brun');
  }

  /** Change the bear's look (v2): recolor the fur, free the old extras, build the new ones. */
  setSkin(id) {
    const spec = BEAR_SKINS[id] ?? BEAR_SKINS.brun;
    if (spec.id === this.skinId) return;
    for (const o of this.extras) o.removeFromParent();
    this.kit?.dispose();
    this.kit = new SkinKit();
    for (const [k, m] of Object.entries(this.furMats)) m.color.setHex(spec.colors[k] ?? BEAR_BASE[k]);
    const anchors = { rig: this.rig, head: this.head, rider: this.rider, riderHead: this.riderHead };
    this.extras = this.kit.compact(spec.build ? spec.build(this.kit, anchors) : []);
    for (const o of this.extras) o.traverse((x) => (x.castShadow = this.castShadows));
    this.skinId = spec.id;
  }

  /** Free the GPU resources of the skin (only needed when the view itself is thrown away). */
  dispose() {
    for (const o of this.extras) o.removeFromParent();
    this.extras = [];
    this.kit?.dispose();
    this.kit = null;
    this.skinId = null;
    for (const m of Object.values(this.furMats)) m.dispose();
  }

  /**
   * Wardrobe preview: show the bear standing at (x, z), in its current mode, turned by `yaw`,
   * running / pedalling on the spot.
   */
  showcase(x, z, yaw, dt, speed) {
    const fake = { phase: BearPhase.CHASING, elapsed: 99, remaining: 3, leaveProgress: 0 };
    this.px = x;
    this.update(fake, x, dt, speed);
    this.root.position.x = x;
    this.root.position.z = z;
    this.root.rotation.y = yaw;
  }

  /** Upright bear (hips at y = 0 of `this.rider`) + the unicycle and the water unicycle. */
  _buildRider({ fur, furDark, furLight, sph, cyl }) {
    const rig = new THREE.Group();
    rig.scale.setScalar(RIDER_SCALE);
    this.root.add(rig);
    this.riderRig = rig;
    const rider = new THREE.Group();
    rig.add(rider);
    this.rider = rider;
    const torso = mesh(sph(1), fur, 0, 0.45, 0);
    torso.scale.set(0.62, 0.7, 0.52);
    rider.add(torso);
    const belly = mesh(sph(0.42), furLight, 0, 0.38, -0.3);
    belly.scale.set(1, 1.15, 0.5);
    rider.add(belly);
    // head with an open, very surprised mouth
    const head = new THREE.Group();
    head.position.set(0, 1.2, -0.05);
    head.add(mesh(sph(0.45), fur, 0, 0, 0));
    const snout = mesh(sph(0.24, 10, 8), furLight, 0, -0.1, -0.36);
    snout.scale.set(1.1, 0.85, 1.1);
    head.add(snout);
    head.add(mesh(sph(0.08, 8, 6), mat(0x111111), 0, -0.02, -0.6)); // nose
    const mouth = mesh(sph(0.1, 8, 6), mat(0x5a1414), 0, -0.24, -0.5);
    mouth.scale.set(1.2, 0.8, 0.5);
    head.add(mouth);
    for (const sx of [-1, 1]) {
      head.add(mesh(sph(0.15, 8, 6), furDark, sx * 0.3, 0.36, 0.04)); // ears
      head.add(mesh(sph(0.075, 6, 5), mat(0xffffff), sx * 0.17, 0.12, -0.37)); // big round eyes
      head.add(mesh(sph(0.04, 6, 5), mat(0x111111), sx * 0.17, 0.12, -0.44));
    }
    rider.add(head);
    this.riderHead = head;
    // arms (front legs): out to the sides for balance
    this.riderArms = [];
    for (const sx of [-1, 1]) {
      const arm = new THREE.Group();
      arm.position.set(sx * 0.5, 0.8, -0.05);
      arm.add(mesh(cyl(0.17, 0.14, 0.62), fur, 0, -0.31, 0));
      arm.add(mesh(sph(0.17, 8, 6), furDark, 0, -0.64, 0)); // paw
      rider.add(arm);
      this.riderArms.push(arm);
    }
    // legs (back legs) pushing the pedals
    this.riderLegs = [];
    for (const sx of [-1, 1]) {
      const leg = new THREE.Group();
      leg.position.set(sx * 0.26, 0.02, -0.08);
      const limb = mesh(geo('bearLegDown', () => new THREE.CylinderGeometry(0.2, 0.15, 1, 8).translate(0, -0.5, 0)), fur, 0, 0, 0);
      leg.add(limb);
      const paw = mesh(sph(0.19, 8, 6), furDark, 0, -0.7, -0.08);
      paw.scale.set(1, 0.7, 1.3);
      leg.add(paw);
      leg.userData = { limb, paw };
      rider.add(leg);
      this.riderLegs.push(leg);
    }
    // outfits: bike helmet on the unicycle, life vest + captain's hat on the lake
    const helmet = mesh(geo('bearHelmet', () => new THREE.SphereGeometry(0.47, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.45)), mat(0xffc531), 0, 0.12, 0.02);
    head.add(helmet);
    const vest = new THREE.Group();
    vest.add(mesh(cyl(0.6, 0.66, 0.62), mat(0xff6b1a), 0, 0.5, 0.02));
    for (const y of [0.32, 0.62]) vest.add(mesh(cyl(0.67, 0.67, 0.06), mat(0xf2f2f2), 0, y, 0.02)); // reflective stripes
    rider.add(vest);
    const hat = new THREE.Group();
    hat.position.set(0, 0.36, 0.02);
    hat.add(mesh(cyl(0.34, 0.36, 0.22), mat(0xffffff), 0, 0.1, 0));
    hat.add(mesh(cyl(0.48, 0.48, 0.04), mat(0x1b2230), 0, 0, -0.04)); // brim
    hat.add(mesh(cyl(0.355, 0.355, 0.06), mat(0x1b2230), 0, 0.04, 0)); // band
    hat.add(mesh(sph(0.06, 6, 5), mat(0xffc531), 0, 0.06, -0.35)); // golden anchor badge
    head.add(hat);
    this.outfits = { unicycle: [helmet], hydro: [vest, hat] };

    // --- the unicycle (Tractorul): wheel r = 0.42 under the saddle ---
    const uni = new THREE.Group();
    const uWheel = new THREE.Group();
    uWheel.position.set(0, 0.45, 0);
    uWheel.add(mesh(geo('uniTire', () => new THREE.TorusGeometry(0.4, 0.06, 6, 20).rotateY(Math.PI / 2)), mat(0x1a1a1a), 0, 0, 0));
    for (let k = 0; k < 4; k++) {
      const spoke = mesh(geo('uniSpoke', () => new THREE.BoxGeometry(0.03, 0.78, 0.03)), mat(0xd0d5db), 0, 0, 0);
      spoke.rotation.x = (k * Math.PI) / 4;
      uWheel.add(spoke);
    }
    uWheel.add(mesh(geo('uniHub', () => new THREE.CylinderGeometry(0.07, 0.07, 0.3, 8).rotateZ(Math.PI / 2)), mat(0x888888), 0, 0, 0));
    for (const sx of [-1, 1]) {
      const crank = mesh(geo('uniCrank', () => new THREE.BoxGeometry(0.04, 0.3, 0.05).translate(0, -0.13, 0)), mat(0x666666), sx * 0.17, 0, 0);
      crank.rotation.x = sx > 0 ? Math.PI : 0;
      uWheel.add(crank);
    }
    uni.add(uWheel);
    for (const sx of [-1, 1]) uni.add(mesh(geo('uniFork', () => new THREE.BoxGeometry(0.05, 0.8, 0.06)), mat(0xe63946), sx * 0.11, 0.85, 0));
    uni.add(mesh(geo('uniPost', () => new THREE.BoxGeometry(0.07, 0.22, 0.07)), mat(0xb8bfc7), 0, 1.3, 0));
    const saddle = mesh(sph(0.2, 10, 6), mat(0x222222), 0, 1.42, 0);
    saddle.scale.set(0.9, 0.35, 1.4);
    uni.add(saddle);
    rig.add(uni);

    // --- the water unicycle (Lacul Noua): big paddle wheel, side pontoons, chain drive ---
    const hydro = new THREE.Group();
    const hWheel = new THREE.Group();
    hWheel.position.set(0, 0.3, 0);
    hWheel.add(mesh(geo('hydroRim', () => new THREE.TorusGeometry(0.85, 0.1, 8, 24).rotateY(Math.PI / 2)), mat(0x2f9bd6), 0, 0, 0));
    hWheel.add(mesh(geo('hydroRim2', () => new THREE.TorusGeometry(0.55, 0.05, 6, 20).rotateY(Math.PI / 2)), mat(0xffffff), 0, 0, 0));
    for (let k = 0; k < 10; k++) {
      const a = (k / 10) * Math.PI * 2;
      const paddle = mesh(geo('hydroPaddle', () => new THREE.BoxGeometry(0.5, 0.07, 0.32)), mat(k % 2 ? 0xff9f1c : 0xffd21f), 0, Math.sin(a) * 0.95, Math.cos(a) * 0.95);
      paddle.rotation.x = -a;
      hWheel.add(paddle);
    }
    for (let k = 0; k < 3; k++) {
      const spoke = mesh(geo('hydroSpoke', () => new THREE.BoxGeometry(0.05, 1.7, 0.05)), mat(0xf2f2f2), 0, 0, 0);
      spoke.rotation.x = (k * Math.PI) / 3;
      hWheel.add(spoke);
    }
    hWheel.add(mesh(geo('hydroHub', () => new THREE.CylinderGeometry(0.12, 0.12, 0.6, 10).rotateZ(Math.PI / 2)), mat(0x888888), 0, 0, 0));
    hydro.add(hWheel);
    for (const sx of [-1, 1]) {
      // pontoons with a rounded nose, struts to the hub
      hydro.add(mesh(geo('hydroFloat', () => new THREE.CylinderGeometry(0.2, 0.2, 1.6, 10).rotateX(Math.PI / 2)), mat(0xffffff), sx * 0.85, 0.08, 0));
      hydro.add(mesh(sph(0.2, 10, 6), mat(0xe63946), sx * 0.85, 0.08, -0.8));
      const strut = mesh(geo('hydroStrut', () => new THREE.BoxGeometry(0.85, 0.06, 0.08)), mat(0x9aa3ad), sx * 0.45, 0.25, 0);
      strut.rotation.z = sx * 0.2;
      hydro.add(strut);
      hydro.add(mesh(geo('hydroFork', () => new THREE.BoxGeometry(0.07, 1.0, 0.08)), mat(0x2f9bd6), sx * 0.24, 0.85, 0));
    }
    // chain drive: pedals high up on the fork, chain down to the wheel
    const hCrank = new THREE.Group();
    hCrank.position.set(0, 0.92, -0.12);
    hCrank.add(mesh(geo('hydroSprocket', () => new THREE.CylinderGeometry(0.13, 0.13, 0.05, 12).rotateZ(Math.PI / 2)), mat(0x666666), 0.3, 0, 0));
    for (const sx of [-1, 1]) {
      const crank = mesh(geo('uniCrank', () => new THREE.BoxGeometry(0.04, 0.3, 0.05).translate(0, -0.13, 0)), mat(0x666666), sx * 0.33, 0, 0);
      crank.rotation.x = sx > 0 ? Math.PI : 0;
      hCrank.add(crank);
    }
    hydro.add(hCrank);
    hydro.add(mesh(geo('hydroChain', () => new THREE.BoxGeometry(0.03, 0.66, 0.05)), mat(0x333333), 0.3, 0.6, -0.06));
    const hSeat = mesh(sph(0.22, 10, 6), mat(0xff6b1a), 0, 1.38, 0.05);
    hSeat.scale.set(1, 0.35, 1.3);
    hydro.add(hSeat);
    // a little pennant on a whip pole at the back
    hydro.add(mesh(geo('hydroPole', () => new THREE.CylinderGeometry(0.02, 0.02, 1.4, 5)), mat(0xdddddd), 0.35, 1.5, 0.35));
    hydro.add(mesh(geo('hydroFlag', () => new THREE.BoxGeometry(0.02, 0.24, 0.4)), mat(0xe63946), 0.35, 2.08, 0.55));
    rig.add(hydro);

    this.vehicles = {
      unicycle: { group: uni, wheel: uWheel, crank: uWheel, seatY: 1.45, legLen: 0.95 },
      hydro: { group: hydro, wheel: hWheel, crank: hCrank, seatY: 1.42, legLen: 0.55 },
    };
  }

  /**
   * 'run' on land, 'swim' on the lake (only the head and the back stick out of the water),
   * 'unicycle' / 'hydro' riding (see the class comment).
   */
  setMode(mode) {
    this.mode = mode;
    const v = this.vehicles[mode];
    this.riding = !!v; // the game pulls the camera back while a riding bear chases (to show the vehicle)
    this.rig.visible = !v;
    this.riderRig.visible = !!v;
    for (const [k, veh] of Object.entries(this.vehicles)) veh.group.visible = k === mode;
    for (const [k, parts] of Object.entries(this.outfits)) for (const o of parts) o.visible = k === mode;
    if (v) {
      this.rider.position.y = v.seatY;
      for (const leg of this.riderLegs) {
        leg.userData.limb.scale.y = v.legLen;
        leg.userData.paw.position.y = -v.legLen;
      }
    }
  }

  reset() {
    this.root.visible = false;
    this.t = 0;
  }

  /**
   * @param bear BearState
   * @param playerX current player x
   * @param dt   frame time
   * @param speed current world speed (for gallop rate)
   */
  update(bear, playerX, dt, speed) {
    this.t += dt;
    const phase = bear.phase;
    this.root.visible = phase !== BearPhase.NONE;
    if (!this.root.visible) {
      this.px = playerX;
      return;
    }
    // follow the player's lane with a short delay
    this.px += (playerX - this.px) * (1 - Math.exp(-6 * dt));

    const D = CFG.bear.distance;
    let z = D;
    let y = 0;
    let pitch = 0;
    let scale = 1;
    // gallop phase (rad). One bound per cycle: reach, push, airborne.
    const rate = (8 + speed * 0.12) * (this.mode === 'swim' ? 0.6 : 1);
    const g = this.t * rate;
    // roar: right after it arrives (the first hit) and while it lunges; a smoothed 0..1 amount
    const arrived = phase === BearPhase.CHASING ? bear.elapsed - CFG.bear.enterTime : -1;
    const roarT = (arrived > 0 && arrived < 0.8) || phase === BearPhase.CAUGHT ? 1 : 0;
    this.roar += (roarT - this.roar) * (1 - Math.exp(-(roarT ? 14 : 6) * dt));

    if (phase === BearPhase.CHASING) {
      const enter = Math.min(1, bear.elapsed / CFG.bear.enterTime);
      z = D + (1 - easeOut(enter)) * 6; // slides in from behind
      z += Math.sin(this.t * 4.2) * 0.35;
      y = Math.max(0, Math.sin(g + 0.6)) * 0.36 * (1 - 0.7 * this.roar); // synced with the legs: airborne between bounds
      // As the timer runs out the bear tires a little
      if (bear.remaining < 1) z += (1 - bear.remaining) * 1.2;
    } else if (phase === BearPhase.LEAVING) {
      const p = bear.leaveProgress;
      z = D + 1.2 + p * p * 16; // drops behind and out of view
      y = Math.abs(Math.sin(this.t * 6)) * 0.2 * (1 - p);
    } else if (phase === BearPhase.CAUGHT) {
      // lunge: the caller advances `caughtT`
      const k = Math.min(1, (this.caughtT ?? 0) / 0.4);
      z = D * (1 - easeOut(k)) + 0.6 * easeOut(k);
      y = Math.sin(k * Math.PI) * 1.4;
      pitch = -0.5 * k;
      scale = 1 + 0.15 * k;
    }

    const v = this.vehicles[this.mode];
    if (v) {
      this._updateRider(bear, v, dt, speed, z, y, pitch, scale);
      return;
    }
    if (this.mode === 'swim') y = y * 0.3 - 0.95 + Math.sin(this.t * 3) * 0.08;
    this.root.position.set(this.px, y, z);
    this.root.rotation.set(pitch, 0, Math.sin(this.t * 4.2) * 0.06);
    // heavy: squash on the push, stretch in the air; the roar rears the chest up and inflates it a little
    const bound = Math.sin(g + 0.6);
    const stretch = this.mode === 'swim' ? 0 : bound * 0.05;
    this.rig.scale.set(
      BASE_SCALE * scale * (1 - stretch * 0.5 + 0.04 * this.roar),
      BASE_SCALE * scale * (1 - stretch + 0.05 * this.roar),
      BASE_SCALE * scale * (1 + stretch),
    );
    this.rig.rotation.x = Math.cos(g + 0.6) * 0.06 + 0.12 * this.roar;

    // gallop: front pair reaches together, hind pair pushes a beat later; paws lift on the way forward
    const swing = phase === BearPhase.LEAVING ? 0.6 : 0.95;
    const fr = Math.sin(g) * swing;
    const hd = Math.sin(g - 0.9) * swing;
    this.legs[0].rotation.x = fr;
    this.legs[1].rotation.x = fr;
    this.legs[2].rotation.x = hd;
    this.legs[3].rotation.x = hd;
    for (let i = 0; i < 4; i++) this.legs[i].position.y = 0.95 + Math.max(0, Math.cos(g - (i < 2 ? 0 : 0.9))) * 0.14;
    // paw swipe: a front paw rakes down every ~1.7 s while it is close behind the boy, and on the catch
    let swipe = 0;
    if (this.mode !== 'swim') {
      if (phase === BearPhase.CAUGHT) swipe = Math.sin(Math.min(1, (this.caughtT ?? 0) / 0.4) * Math.PI);
      else if (phase === BearPhase.CHASING && arrived > 0.9 && bear.remaining > 1) {
        const c = (this.t * 0.6) % 1;
        swipe = c < 0.22 ? Math.sin((c / 0.22) * Math.PI) : 0;
      }
    }
    if (swipe > 0) {
      this.legs[1].rotation.x = -2.1 * swipe + fr * (1 - swipe);
      this.legs[1].rotation.z = -0.5 * swipe;
    } else this.legs[1].rotation.z = 0;
    // head: bobs against the body, snaps up to roar with the mouth open
    const open = this.roar * (0.75 + 0.25 * Math.sin(this.t * 30));
    this.head.rotation.x = Math.sin(g + 2.2) * 0.12 - 0.55 * this.roar;
    this.head.rotation.z = Math.sin(this.t * 3) * 0.1 * (1 - this.roar);
    this.head.position.y = 1.75 + Math.sin(g + 1.4) * 0.07;
    this.head.position.z = -1.55 - 0.1 * this.roar;
    this.mouth.visible = open > 0.05;
    this.mouth.scale.y = Math.max(0.01, open * 0.55);
  }

  /** Riding bear: pedals furiously, wobbles for balance, flails its arms, topples over when it gives up. */
  _updateRider(bear, v, dt, speed, z, y, pitch, scale) {
    const phase = bear.phase;
    const water = this.mode === 'hydro';
    z += CFG.bear.riderDistance - CFG.bear.distance;
    // no gallop: only a small bounce from the pedalling (and the waves on the lake)
    if (phase !== BearPhase.CAUGHT) y = Math.abs(Math.sin(this.t * 7)) * 0.06;
    if (water) y += Math.sin(this.t * 2.6) * 0.06;
    let roll = Math.sin(this.t * 3.3) * 0.12 + Math.sin(this.t * 7.9) * 0.04; // balance wobble
    let yaw = Math.sin(this.t * 2.1) * 0.12;
    let pedalRate = 7 + speed * 0.28;
    if (phase === BearPhase.CHASING && bear.remaining < 1) roll *= 1.8; // getting tired, wobbling more
    if (phase === BearPhase.LEAVING) {
      // gives up: topples over sideways (on the lake it tips into the water)
      const p = bear.leaveProgress;
      roll = Math.min(1, p * 1.6) * 1.35;
      if (water) y -= p * 1.2;
      pedalRate *= 1 - p;
      yaw = 0;
    }
    this.root.position.set(this.px, y, z);
    this.root.rotation.set(pitch * 0.6, yaw, roll);
    this.riderRig.scale.setScalar(RIDER_SCALE * scale);

    this.pedalPhase += dt * pedalRate;
    const a = this.pedalPhase;
    v.wheel.rotation.x = -a * (water ? 0.6 : 1);
    if (v.crank !== v.wheel) v.crank.rotation.x = -a;
    for (let i = 0; i < this.riderLegs.length; i++) this.riderLegs[i].rotation.x = Math.sin(a + i * Math.PI) * 0.45 - 0.15;
    // arms out for balance, flailing (wildly while it falls)
    const flail = phase === BearPhase.LEAVING ? 0.9 : 0.35;
    this.riderArms[0].rotation.z = -1.25 + Math.sin(this.t * 6.5) * flail - roll * 0.6;
    this.riderArms[1].rotation.z = 1.25 + Math.sin(this.t * 6.5 + 2) * flail - roll * 0.6;
    this.riderArms[0].rotation.x = Math.sin(this.t * 5) * 0.3;
    this.riderArms[1].rotation.x = Math.sin(this.t * 5 + 1.5) * 0.3;
    if (phase === BearPhase.CAUGHT) {
      // grab!
      for (const arm of this.riderArms) arm.rotation.x = 2.4;
    }
    this.rider.rotation.x = -0.12 + Math.sin(a * 2) * 0.03; // leaning toward the boy, pushing with every pedal stroke
    this.rider.scale.y = 1 + Math.sin(a * 2) * 0.025;
    this.riderHead.rotation.x = Math.sin(this.t * 4) * 0.08;
    this.riderHead.rotation.z = -roll * 0.5 + Math.sin(this.t * 3) * 0.08; // head stays level-ish
  }
}
