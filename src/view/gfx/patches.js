import * as THREE from 'three';

/**
 * Small shader patches (onBeforeCompile) for the standard Lambert / Phong materials of the scenery:
 * lights, fog and shadows keep working, the patch only changes the surface colour. Everything that
 * moves with the world is computed from ABSOLUTE track coordinates (world x, world z - distance), so a
 * pattern stays glued to the ground while the player runs over it, and nothing is created per frame:
 * the scenery writes `GFX.uDist` once a frame and all patched materials share these uniform objects.
 */
export const GFX = {
  uTime: { value: 0 },
  uDist: { value: 0 },
  uSunDir: { value: new THREE.Vector3(0, 0.4, -1).normalize() }, // direction TOWARD the sun disc (world)
  uSunCol: { value: new THREE.Color(1, 0.9, 0.7) },
  uSkyCol: { value: new THREE.Color(0.4, 0.6, 0.9) }, // reflected zenith colour
  uHorCol: { value: new THREE.Color(0.8, 0.85, 0.9) }, // reflected horizon colour
};

const NOISE = /* glsl */ `
float gHash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float gNoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(gHash(i), gHash(i + vec2(1.0, 0.0)), f.x), mix(gHash(i + vec2(0.0, 1.0)), gHash(i + vec2(1.0, 1.0)), f.x), f.y);
}`;

/**
 * @param material a MeshLambertMaterial / MeshPhongMaterial
 * @param key      program cache key (patches with different code need different keys)
 * @param o        {pars, color, out, uniforms}: GLSL pieces. `color` runs right after the map was applied
 *                 (it may change `diffuseColor`), `out` runs after the lighting (it may change `outgoingLight`).
 *                 Available: vGW (world position), GFX uniforms, gNoise(vec2), gHash(vec2).
 */
function patch(material, key, { pars = '', color = '', out = '', uniforms = null }) {
  material.customProgramCacheKey = () => key;
  material.onBeforeCompile = (sh) => {
    Object.assign(sh.uniforms, GFX);
    if (uniforms) Object.assign(sh.uniforms, uniforms);
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vGW;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvGW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    const decl = Object.keys(GFX).map((k) => `uniform ${k === 'uTime' || k === 'uDist' ? 'float' : 'vec3'} ${k};`).join('\n');
    const own = uniforms ? Object.entries(uniforms).map(([k, u]) => `uniform ${typeof u.value === 'number' ? 'float' : 'vec3'} ${k};`).join('\n') : '';
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>\nvarying vec3 vGW;\n${decl}\n${own}\n${NOISE}\n${pars}`)
      .replace('#include <color_fragment>', `#include <color_fragment>\n${color}`)
      .replace('#include <opaque_fragment>', `${out}\n#include <opaque_fragment>`);
  };
  material.needsUpdate = true;
  return material;
}

/** Lacul Noua: animated ripples, sun glitter, sky-tinted fresnel and foam along the banks. */
export function waterPatch(material, { bank }) {
  const u = {
    uBank: { value: bank },
    uDeep: { value: new THREE.Color(0x0d5f78) },
    uShallow: { value: new THREE.Color(0x3aa6b4) },
    uGlitter: { value: 1 },
  };
  patch(material, 'water1', {
    uniforms: u,
    pars: /* glsl */ `
      vec2 waterGrad(vec2 p, float t) {
        vec2 g = vec2(0.0);
        g += vec2(0.90, 0.43) * 0.50 * 1.7 * cos(dot(p, vec2(0.90, 0.43)) * 1.7 + t * 1.3);
        g += vec2(-0.50, 0.87) * 0.32 * 2.9 * cos(dot(p, vec2(-0.50, 0.87)) * 2.9 + t * 1.9);
        g += vec2(0.20, -0.98) * 0.20 * 5.1 * cos(dot(p, vec2(0.20, -0.98)) * 5.1 + t * 2.6);
        g += vec2(-0.95, -0.30) * 0.12 * 9.0 * cos(dot(p, vec2(-0.95, -0.30)) * 9.0 + t * 3.4);
        g += vec2(0.55, 0.83) * 0.08 * 15.0 * cos(dot(p, vec2(0.55, 0.83)) * 15.0 - t * 4.1);
        return g;
      }`,
    color: /* glsl */ `
      vec2 wp = vec2(vGW.x, vGW.z - uDist);
      float wvar = gNoise(wp * 0.35 + vec2(0.0, uTime * 0.05)) * 0.7 + gNoise(wp * 1.1) * 0.3;
      diffuseColor.rgb = mix(uDeep, uShallow, wvar);
      float wedge = uBank - abs(vGW.x);`,
    out: /* glsl */ `
      {
        vec2 g = waterGrad(wp, uTime);
        vec3 wn = normalize(vec3(-g.x * 0.05, 1.0, -g.y * 0.05));
        vec3 wv = normalize(cameraPosition - vGW);
        float wd = length(cameraPosition - vGW);
        float fres = 0.04 + 0.96 * pow(1.0 - clamp(dot(wn, wv), 0.0, 1.0), 4.0);
        vec3 wr = reflect(-wv, wn);
        vec3 refl = mix(uHorCol, uSkyCol, clamp(wr.y * 1.8, 0.0, 1.0));
        // (capped: the track must stay water-colored so the orange coins and buoys read against it)
        outgoingLight = mix(outgoingLight, refl, clamp(fres, 0.0, 0.55));
        // sun glitter: tiny bright flashes where a ripple faces the sun (HDR, so bloom picks them up)
        float sp = pow(max(dot(wr, uSunDir), 0.0), 140.0);
        float sp2 = pow(max(dot(wr, uSunDir), 0.0), 18.0);
        float fade = 1.0 - smoothstep(30.0, 110.0, wd) * 0.6;
        outgoingLight += uSunCol * (sp * 2.6 + sp2 * 0.03) * uGlitter * fade;
        // foam: a wobbly white band where the water meets the bank, plus a few streaks drifting off it
        float fw = 0.55 + 0.45 * sin(wp.y * 1.3 + uTime * 0.8 + vGW.x * 2.0) + (gNoise(wp * 2.2 + uTime * 0.3) - 0.5) * 0.9;
        float foam = (1.0 - smoothstep(0.0, max(1.25 * fw + 0.15, 0.05), wedge)) * (0.55 + 0.45 * gNoise(wp * 3.0 - uTime * 0.2));
        outgoingLight = mix(outgoingLight, vec3(0.95, 0.98, 1.0) * (0.75 + 0.25 * uSunCol), clamp(foam, 0.0, 0.85));
      }`,
  });
  return material;
}

/** Poiana: fine sparkles on the snow (sparse, twinkling, only near the camera so they never alias). */
export function snowPatch(material, { strength = 1 } = {}) {
  patch(material, 'snow1', {
    uniforms: { uSpark: { value: strength } },
    out: /* glsl */ `
      {
        vec2 sp = vec2(vGW.x, vGW.z - uDist) * 7.0;
        vec2 cell = floor(sp);
        float h = gHash(cell);
        float dd = length(cameraPosition - vGW);
        float on = step(0.93, h) * (1.0 - smoothstep(9.0, 34.0, dd));
        float tw = pow(max(0.0, sin(uTime * (2.0 + h * 4.0) + h * 80.0)), 6.0);
        vec2 f = fract(sp) - 0.5;
        float pt = smoothstep(0.32, 0.0, length(f + (vec2(gHash(cell + 7.0), gHash(cell + 3.0)) - 0.5) * 0.4));
        outgoingLight += vec3(0.9, 0.97, 1.0) * on * tw * pt * 5.0 * uSpark;
        // faint cool tint in the unlit (shadowed) parts: ambient light is bluer than the sun
        outgoingLight *= vec3(0.985, 0.995, 1.015);
      }`,
  });
  return material;
}

/** AFI: polished floor. The ceiling skylight (with its beams) is "reflected" at grazing angles. */
export function glossPatch(material, { ceilY, halfW }) {
  const u = { uCeil: { value: ceilY }, uHalfW: { value: halfW } };
  patch(material, 'gloss1', {
    uniforms: u,
    out: /* glsl */ `
      {
        vec3 gv = normalize(cameraPosition - vGW);
        vec3 gr = vec3(-gv.x, gv.y, -gv.z);
        float gt = (uCeil - vGW.y) / max(gr.y, 0.02);
        vec3 hit = vGW + gr * gt;
        float inside = smoothstep(uHalfW, uHalfW - 0.7, abs(hit.x));
        float beam = smoothstep(0.0, 0.5, abs(fract((hit.z - uDist) / 6.0 + 0.5) - 0.5) * 6.0 - 0.1);
        float distFade = 1.0 - smoothstep(25.0, 110.0, length(cameraPosition - vGW));
        float fres = pow(1.0 - clamp(gv.y, 0.0, 1.0), 3.0);
        float grout = 0.55 + 0.45 * smoothstep(0.35, 0.8, dot(diffuseColor.rgb, vec3(0.3, 0.5, 0.2)));
        float shine = 0.6 + 0.4 * gNoise(vec2(vGW.x * 0.7, vGW.z - uDist) * 0.5);
        outgoingLight += vec3(0.95, 0.98, 1.0) * inside * beam * fres * grout * shine * distFade * 0.85;
        // soft warm bounce from the shop windows at the sides
        outgoingLight += vec3(1.0, 0.82, 0.55) * smoothstep(3.0, 9.0, abs(vGW.x)) * fres * 0.10 * distFade;
      }`,
  });
  return material;
}

/** Streets / grass: a slow, large-scale variation of the tone (worn patches, damp stones) and a faint sheen. */
export function groundVariation(material, { scale = 0.18, amount = 0.14, warm = 0 } = {}) {
  patch(material, `var-${scale}-${amount}-${warm}`, {
    color: /* glsl */ `
      {
        vec2 vp = vec2(vGW.x, vGW.z - uDist);
        float vn = gNoise(vp * ${scale.toFixed(3)}) * 0.65 + gNoise(vp * ${(scale * 3.7).toFixed(3)}) * 0.35;
        diffuseColor.rgb *= 1.0 + (vn - 0.5) * ${amount.toFixed(3)} * 2.0;
        diffuseColor.rgb *= vec3(1.0 + ${warm.toFixed(3)} * (vn - 0.5), 1.0, 1.0 - ${warm.toFixed(3)} * (vn - 0.5));
      }`,
  });
  return material;
}
