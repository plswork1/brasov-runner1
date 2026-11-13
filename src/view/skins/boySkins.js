/**
 * Skins of the boy (visual side; names, prices and ownership are in `logic/cosmetics.js`).
 *
 * A skin = colors for the base body + which base head parts are shown in the winter / summer
 * outfit + extra parts built from primitives (helmet, backpack, vest...).
 *
 * The body itself (legs, seated legs, torso, arms, head) is the same for every skin and is posed
 * by PlayerView for each ride, so EVERY skin works with all four rides (snowboard, skateboard,
 * bicycle, pedal boat): extras are only ever attached to the torso, the head or an arm, never to
 * the legs or to the ride.
 *
 * Coordinates: the boy looks toward -z. `torso` is the jacket (a 0.66 x 0.78 x 0.42 box from y = 0.01
 * to 0.79), `head` is a sphere of radius 0.27. Parts returned in `noJet` are hidden while the
 * jetpack is on his back.
 *
 * build(kit, a) -> {always?, winter?, summer?, noJet?}  (arrays of objects already attached to an
 * anchor: a.torso, a.head, a.armL, a.armR, a.scarfTail)
 */

export const BASE_COLORS = Object.freeze({
  jacket: 0xd93b30,
  hem: 0xffffff,
  pants: 0x1d3557,
  boots: 0x222a3a,
  mitten: 0x2d9cdb,
  skin: 0xf2c4a0,
  hat: 0x2d9cdb,
  pompom: 0xffffff,
  strap: 0x1b2230,
  lens: 0x7fd1ff,
  cap: 0xd93b30,
  hair: 0x4a2e1a,
  scarf: 0xffcf3f,
});

const add = (anchor, list, ...objs) => {
  for (const o of objs) {
    anchor.add(o);
    list.push(o);
  }
};

export const BOY_SKINS = Object.freeze({
  // ---- the original look -----------------------------------------------------------------------
  clasic: {
    id: 'clasic',
    colors: {},
    winter: ['hem', 'hat', 'pompom', 'strap', 'lens', 'scarf', 'scarfTail'],
    summer: ['hem', 'cap', 'visor', 'hair', 'eyes'],
    build: null,
  },

  // ---- Schior din Poiana: racing suit, helmet with goggles, bib number 7 ------------------------
  schior: {
    id: 'schior',
    colors: { jacket: 0x1565c0, hem: 0xffffff, pants: 0x1565c0, boots: 0xe9eef5, mitten: 0x111827, strap: 0x111827, lens: 0xff9f1c },
    winter: ['hem', 'strap', 'lens'],
    summer: ['hem', 'strap', 'lens'],
    build(kit, a) {
      const always = [];
      const noJet = [];
      const white = kit.mat(0xffffff);
      const red = kit.mat(0xe63946);
      // helmet with a red stripe and ear pads
      add(a.head, always, kit.mesh(kit.sph(0.31, 12, 8, Math.PI * 2, Math.PI * 0.6), white, 0, 0.04, 0));
      add(a.head, always, kit.mesh(kit.box(0.1, 0.05, 0.5), red, 0, 0.325, 0));
      for (const sx of [-1, 1]) add(a.head, always, kit.mesh(kit.sph(0.09, 8, 6), kit.mat(0x111827), sx * 0.28, -0.08, 0.02));
      // race bib: white panel with a red "7", front and back
      const seven = (z, list) => {
        add(a.torso, list, kit.mesh(kit.box(0.5, 0.44, 0.03), white, 0, 0.47, z));
        add(a.torso, list, kit.mesh(kit.box(0.2, 0.055, 0.04), red, 0, 0.6, z));
        add(a.torso, list, kit.mesh(kit.box(0.055, 0.28, 0.04), red, 0.03, 0.46, z, 0, 0, z < 0 ? 0.32 : -0.32));
      };
      seven(-0.225, always);
      seven(0.225, noJet);
      // white stripe down the arms
      for (const arm of [a.armL, a.armR]) add(arm, always, kit.mesh(kit.box(0.21, 0.5, 0.06), white, 0, -0.28, 0));
      return { always, noJet };
    },
  },

  // ---- Salvamontist: mountain rescue jacket with the white cross, backpack, head torch -----------
  salvamont: {
    id: 'salvamont',
    colors: { jacket: 0xd62828, hem: 0x1d3557, pants: 0x1d3557, boots: 0x4a3320, mitten: 0x111827, hat: 0xd62828, pompom: 0xffffff, cap: 0xd62828 },
    winter: ['hem', 'hat', 'pompom', 'eyes'],
    summer: ['hem', 'cap', 'visor', 'hair', 'eyes'],
    build(kit, a) {
      const always = [];
      const winter = [];
      const noJet = [];
      const white = kit.mat(0xffffff);
      const navy = kit.mat(0x1d3557);
      // navy shoulders
      add(a.torso, always, kit.mesh(kit.box(0.68, 0.16, 0.44), navy, 0, 0.72, 0));
      // white cross on the chest
      add(a.torso, always, kit.mesh(kit.box(0.26, 0.08, 0.03), white, 0, 0.42, -0.225), kit.mesh(kit.box(0.08, 0.26, 0.03), white, 0, 0.42, -0.225));
      // coil of rope on the hip
      add(a.torso, always, kit.mesh(kit.torus(0.15, 0.04, 5, 12), kit.mat(0xf08a24), -0.36, 0.16, 0, 0, Math.PI / 2, 0));
      // backpack with a sleeping mat on top and a small cross
      const pack = kit.mat(0x264a73);
      add(a.torso, noJet, kit.mesh(kit.box(0.46, 0.5, 0.2), pack, 0, 0.42, 0.31));
      add(a.torso, noJet, kit.mesh(kit.cyl(0.09, 0.09, 0.46, 8), kit.mat(0xf08a24), 0, 0.74, 0.3, 0, 0, Math.PI / 2));
      add(a.torso, noJet, kit.mesh(kit.box(0.2, 0.06, 0.02), white, 0, 0.45, 0.415), kit.mesh(kit.box(0.06, 0.2, 0.02), white, 0, 0.45, 0.415));
      // head torch (winter outfit): band around the hat + lamp
      add(a.head, winter, kit.mesh(kit.torus(0.285, 0.025, 5, 14), navy, 0, 0.09, 0, Math.PI / 2, 0, 0));
      add(a.head, winter, kit.mesh(kit.box(0.11, 0.09, 0.07), kit.mat(0xfff3b0, { emissive: 0x8a7a20 }), 0, 0.1, -0.3));
      return { always, winter, noJet };
    },
  },

  // ---- Junele Brașovului: festive costume of the Juni from Șchei --------------------------------
  junii: {
    id: 'junii',
    colors: { jacket: 0xf5f1e6, pants: 0x18181b, boots: 0x18181b, mitten: 0xf2c4a0, hair: 0x2b1d14 },
    winter: ['eyes', 'hair'],
    summer: ['eyes', 'hair'],
    build(kit, a) {
      const always = [];
      const black = kit.mat(0x18181b);
      const gold = kit.mat(0xd4a017, { emissive: 0x3a2a00 });
      // black vest with golden trim (open at the front)
      for (const sx of [-1, 1]) {
        add(a.torso, always, kit.mesh(kit.box(0.2, 0.58, 0.03), black, sx * 0.22, 0.48, -0.225));
        add(a.torso, always, kit.mesh(kit.box(0.03, 0.58, 0.035), gold, sx * 0.115, 0.48, -0.226));
        add(a.torso, always, kit.mesh(kit.box(0.03, 0.58, 0.44), black, sx * 0.335, 0.48, 0));
      }
      add(a.torso, always, kit.mesh(kit.box(0.66, 0.58, 0.03), black, 0, 0.48, 0.225));
      // tricolor sash around the waist: blue, yellow, red
      const sash = [0x002b7f, 0xfcd116, 0xce1126];
      sash.forEach((c, i) => add(a.torso, always, kit.mesh(kit.box(0.7, 0.055, 0.46), kit.mat(c), 0, 0.05 + i * 0.055, 0)));
      // tall black fur hat with a tricolor cockade
      add(a.head, always, kit.mesh(kit.cyl(0.25, 0.285, 0.36, 10), kit.mat(0x15120f), 0, 0.32, 0));
      sash.forEach((c, i) => add(a.head, always, kit.mesh(kit.box(0.045, 0.1, 0.03), kit.mat(c), (i - 1) * 0.045, 0.32, -0.275)));
      // white cuffs with red embroidery
      for (const arm of [a.armL, a.armR]) add(arm, always, kit.mesh(kit.box(0.215, 0.07, 0.235), kit.mat(0xce1126), 0, -0.5, 0));
      return { always };
    },
  },

  // ---- Stegarul: yellow and black from head to toe -----------------------------------------------
  stegar: {
    id: 'stegar',
    colors: { jacket: 0xffd200, hem: 0x18181b, pants: 0x18181b, boots: 0x2a2a2a, mitten: 0x18181b, hat: 0xffd200, pompom: 0x18181b, cap: 0xffd200, scarf: 0xffd200 },
    winter: ['hem', 'hat', 'pompom', 'scarf', 'scarfTail', 'eyes'],
    summer: ['hem', 'cap', 'visor', 'hair', 'eyes', 'scarf', 'scarfTail'],
    build(kit, a) {
      const always = [];
      const noJet = [];
      const black = kit.mat(0x18181b);
      // black stripes on the shirt (front and back) and on the sleeves
      for (const sx of [-1, 1]) {
        add(a.torso, always, kit.mesh(kit.box(0.1, 0.62, 0.03), black, sx * 0.17, 0.47, -0.225));
        add(a.torso, noJet, kit.mesh(kit.box(0.1, 0.62, 0.03), black, sx * 0.17, 0.47, 0.225));
      }
      for (const arm of [a.armL, a.armR]) add(arm, always, kit.mesh(kit.box(0.21, 0.1, 0.23), black, 0, -0.2, 0), kit.mesh(kit.box(0.21, 0.1, 0.23), black, 0, -0.44, 0));
      // black blocks on the fan scarf (they ride along with the flapping tail)
      for (const z of [-0.2, 0.1]) add(a.scarfTail, always, kit.mesh(kit.box(0.145, 0.105, 0.14), black, 0, 0, z));
      return { always, noJet };
    },
  },

  // ---- Mascota Ursuleț: a plush bear costume -----------------------------------------------------
  mascota: {
    id: 'mascota',
    colors: { jacket: 0x9a6a3c, pants: 0x9a6a3c, boots: 0x5b3a1c, mitten: 0x5b3a1c, scarf: 0xd62828 },
    winter: ['scarf', 'scarfTail', 'eyes'],
    summer: ['eyes'],
    build(kit, a) {
      const always = [];
      const noJet = [];
      const fur = kit.mat(0x9a6a3c);
      const dark = kit.mat(0x5b3a1c);
      const light = kit.mat(0xe2c79c);
      // hood pushed back so the face stays visible, with round ears and a little bear face on top
      add(a.head, always, kit.mesh(kit.sph(0.315, 12, 8, Math.PI * 2, Math.PI * 0.62), fur, 0, 0.03, 0.04, 0.38, 0, 0));
      for (const sx of [-1, 1]) {
        add(a.head, always, kit.mesh(kit.sph(0.105, 8, 6), fur, sx * 0.21, 0.3, 0.06));
        add(a.head, always, kit.mesh(kit.sph(0.055, 6, 5), light, sx * 0.21, 0.3, -0.01));
        add(a.head, always, kit.mesh(kit.sph(0.03, 5, 4), kit.mat(0x111111), sx * 0.09, 0.27, -0.2));
      }
      add(a.head, always, kit.mesh(kit.sph(0.085, 8, 6), light, 0, 0.2, -0.25));
      add(a.head, always, kit.mesh(kit.sph(0.035, 6, 5), kit.mat(0x111111), 0, 0.22, -0.325));
      // light belly and a tail stub
      add(a.torso, always, kit.mesh(kit.box(0.38, 0.46, 0.03), light, 0, 0.38, -0.225));
      add(a.torso, noJet, kit.mesh(kit.sph(0.1, 8, 6), dark, 0, 0.1, 0.26));
      return { always, noJet };
    },
  },
});

export const BOY_SKIN_IDS = Object.freeze(Object.keys(BOY_SKINS));
