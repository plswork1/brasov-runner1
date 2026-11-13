/**
 * Skins of the bear (visual side; names and prices are in `logic/cosmetics.js`).
 *
 * A skin = three fur colors + extra parts. The bear has two bodies: the one on all fours (modes
 * 'run' and 'swim') and the upright rider (modes 'unicycle' and 'hydro'). A skin dresses BOTH, so
 * it works in all four modes. The vehicles and the outfits that belong to a mode (bike helmet on
 * the unicycle, life vest and captain's hat on the lake) are never touched: on the rider a skin only
 * adds things that do not collide with them (scarf, bandana, something on the back, the nose).
 *
 * Anchors: a.head (running head: sphere r 0.62 looking toward -z), a.rig (running body), a.riderHead
 * (rider head: sphere r 0.45), a.rider (rider torso, hips at y = 0, neck at y ~ 0.98).
 * build(kit, a) -> objects already attached to an anchor
 */

export const BEAR_BASE = Object.freeze({ fur: 0x6e4524, dark: 0x4f301a, light: 0x9a6a3c });

const add = (anchor, list, ...objs) => {
  for (const o of objs) {
    anchor.add(o);
    list.push(o);
  }
};

/** A ring around the neck of both bodies (scarf / bandana) with a hanging end. */
function neckwear(kit, a, list, color, tail = true) {
  const m = kit.mat(color);
  // running body: the neck goes forward and up from the shoulders to the head
  add(a.rig, list, kit.mesh(kit.torus(0.56, 0.11, 6, 14), m, 0, 1.68, -1.08, 1.05, 0, 0));
  if (tail) add(a.rig, list, kit.mesh(kit.box(0.2, 0.5, 0.1), m, 0.28, 1.25, -1.42, 0.25, 0, -0.15));
  // rider: a level ring under the chin
  add(a.rider, list, kit.mesh(kit.torus(0.34, 0.08, 6, 14), m, 0, 0.96, -0.03, Math.PI / 2, 0, 0));
  if (tail) add(a.rider, list, kit.mesh(kit.box(0.14, 0.36, 0.07), m, 0.17, 0.76, -0.33, 0.15, 0, -0.1));
}

export const BEAR_SKINS = Object.freeze({
  // ---- the Carpathian brown bear ---------------------------------------------------------------
  brun: { id: 'brun', colors: {}, build: null },

  // ---- Ursul din Răcădău: straight from the bins, with a lid for a hat and a red bandana ---------
  racadau: {
    id: 'racadau',
    colors: { fur: 0x5c3b22, dark: 0x3b2413, light: 0x8a6238 },
    build(kit, a) {
      const out = [];
      const steel = kit.mat(0x9aa7b4);
      const steelDark = kit.mat(0x6c7884);
      neckwear(kit, a, out, 0xd62828, false);
      // bandana knot + corner
      add(a.rig, out, kit.mesh(kit.cone(0.2, 0.36, 4), kit.mat(0xd62828), 0, 1.3, -1.5, Math.PI + 0.5, 0, 0));
      add(a.rider, out, kit.mesh(kit.cone(0.15, 0.3, 4), kit.mat(0xd62828), 0, 0.8, -0.36, Math.PI + 0.2, 0, 0));
      // running bear: bin lid worn as a hat, tilted, with its handle
      const lid = [kit.mesh(kit.cyl(0.52, 0.56, 0.07, 14), steel, 0.05, 0.62, 0.02, 0.12, 0, -0.22), kit.mesh(kit.cyl(0.3, 0.5, 0.09, 14), steelDark, 0.07, 0.69, 0.03, 0.12, 0, -0.22), kit.mesh(kit.box(0.2, 0.09, 0.06), steelDark, 0.09, 0.77, 0.04, 0.12, 0, -0.22)];
      add(a.head, out, ...lid);
      // rider: the lid hangs on its back like a shield (the head already has the helmet / captain's hat)
      add(a.rider, out, kit.mesh(kit.cyl(0.44, 0.44, 0.06, 14), steel, 0, 0.5, 0.5, Math.PI / 2 - 0.1, 0, 0));
      add(a.rider, out, kit.mesh(kit.cyl(0.24, 0.4, 0.07, 14), steelDark, 0, 0.5, 0.55, Math.PI / 2 - 0.1, 0, 0));
      // a banana peel that came along
      const peel = kit.mat(0xffd84a);
      add(a.rig, out, kit.mesh(kit.box(0.34, 0.05, 0.1), peel, 0.2, 2.42, -0.5, 0, 0.6, 0.25), kit.mesh(kit.box(0.1, 0.05, 0.3), peel, 0.12, 2.43, -0.42, 0.2, 0.6, 0));
      return out;
    },
  },

  // ---- Ursul de Crăciun: white as snow, scarf and Santa hat from the Christmas market ------------
  craciun: {
    id: 'craciun',
    colors: { fur: 0xefe9dd, dark: 0xcdc3b0, light: 0xffffff },
    build(kit, a) {
      const out = [];
      const red = kit.mat(0xc62828);
      const white = kit.mat(0xffffff);
      neckwear(kit, a, out, 0xc62828, true);
      // running bear: Santa hat leaning back, white brim and pompom
      add(a.head, out, kit.mesh(kit.torus(0.4, 0.11, 6, 14), white, 0, 0.45, 0.06, Math.PI / 2 - 0.2, 0, 0));
      add(a.head, out, kit.mesh(kit.cone(0.4, 0.8, 10), red, 0, 0.86, 0.2, -0.45, 0, 0));
      add(a.head, out, kit.mesh(kit.sph(0.14, 8, 6), white, 0, 1.22, 0.4));
      // a red nose on both bodies
      add(a.head, out, kit.mesh(kit.sph(0.125, 8, 6), kit.mat(0xe53935, { emissive: 0x4a0000 }), 0, -0.04, -0.82));
      add(a.riderHead, out, kit.mesh(kit.sph(0.1, 8, 6), kit.mat(0xe53935, { emissive: 0x4a0000 }), 0, -0.02, -0.6));
      // rider: a sack of presents on its back
      add(a.rider, out, kit.mesh(kit.sph(0.3, 10, 8), kit.mat(0x8d5a2b), 0, 0.5, 0.52));
      add(a.rider, out, kit.mesh(kit.torus(0.09, 0.03, 5, 10), kit.mat(0xffd84a), 0, 0.8, 0.5, Math.PI / 2, 0, 0));
      return out;
    },
  },
});

export const BEAR_SKIN_IDS = Object.freeze(Object.keys(BEAR_SKINS));
