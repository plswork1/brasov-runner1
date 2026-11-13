import * as THREE from 'three';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

/**
 * v3: the last step of drawing a frame. game.js never calls renderer.render itself; it calls
 * post.render(), so post-processing (bloom, color grading, vignette ...) lives here.
 *
 * Interface used by game.js (keep it):
 *   new PostFx(renderer, scene, camera, {mobile})
 *   post.setSize(width, height, pixelRatio)   after every resize / quality change (CSS pixels + DPR)
 *   post.setQuality(level)                    0 = best ... 3 = lowest (adaptive quality of the game)
 *   post.setBiome(id, env)                    level changed; env = the scenery's `env` object
 *   post.render(dt)                           draw the frame
 *
 * Pipeline (quality 0/1): the scene is drawn into a half-float MSAA target WITHOUT tone mapping (three
 * skips it for render targets), a bright-pass + small blur chain makes the bloom, and ONE final pass adds
 * the bloom, applies the renderer's own tone mapping + exposure (so the picture has the same brightness
 * as the plain path), then a per-level grade (contrast / saturation / tint), the vignette and a bit of
 * dither against banding in the sky. Quality >= 2 bypasses everything: plain renderer.render.
 * Draw calls added: 6 (desktop, level 0), 4 (level 1 / mobile level 0), 1-2 on mobile level 1 (final pass only).
 *
 * What glows: the bright-pass keeps (a) anything above `thrW` in luminance (sun disc, glitter, skylights;
 * snow is lit but stays below it) and (b) SATURATED things above `thrC` (gold coins, lamps, power-up items,
 * the portal). White surfaces therefore never make the whole screen glow.
 */

// Per-level look. bloom: strength; thrW / thrC: see above; contrast, sat, tint: the grade; vig: vignette.
const LOOKS = {
  partie: { bloom: 0.5, thrW: 3.4, thrC: 1.0, contrast: 1.05, sat: 1.1, tint: [0.985, 1.0, 1.035], vig: 0.26 },
  republicii: { bloom: 0.6, thrW: 2.6, thrC: 0.85, contrast: 1.07, sat: 1.12, tint: [1.035, 1.0, 0.955], vig: 0.3 },
  tractorul: { bloom: 0.55, thrW: 2.6, thrC: 0.85, contrast: 1.06, sat: 1.1, tint: [1.025, 1.0, 0.965], vig: 0.28 },
  afi: { bloom: 0.5, thrW: 2.4, thrC: 0.9, contrast: 1.04, sat: 1.05, tint: [1.01, 1.0, 0.985], vig: 0.2 },
  noua: { bloom: 0.75, thrW: 2.2, thrC: 0.8, contrast: 1.08, sat: 1.14, tint: [1.04, 0.995, 0.955], vig: 0.32 },
};

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }`;

const BRIGHT_FRAG = /* glsl */ `
  uniform sampler2D tScene;
  uniform vec2 uTexel;
  uniform float uThrW, uThrC;
  varying vec2 vUv;
  vec3 pass(vec3 c) {
    float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float mx = max(max(c.r, c.g), c.b);
    float sat = (mx - min(min(c.r, c.g), c.b)) / max(mx, 1e-3);
    float g = max(lum - uThrW, 0.0) + max(lum - uThrC, 0.0) * 2.5 * smoothstep(0.3, 0.65, sat);
    return min(c * (g / max(lum, 1e-3)), vec3(12.0)); // clamp: one tiny very bright pixel must not flicker the whole halo
  }
  void main() {
    vec3 s = pass(texture2D(tScene, vUv + vec2(-1.0, -1.0) * uTexel).rgb) + pass(texture2D(tScene, vUv + vec2(1.0, -1.0) * uTexel).rgb)
           + pass(texture2D(tScene, vUv + vec2(-1.0, 1.0) * uTexel).rgb) + pass(texture2D(tScene, vUv + vec2(1.0, 1.0) * uTexel).rgb);
    gl_FragColor = vec4(s * 0.25, 1.0);
  }`;

const BLUR_FRAG = /* glsl */ `
  uniform sampler2D tSrc;
  uniform vec2 uDir; // texel step along the blur axis, in the UV space of tSrc
  varying vec2 vUv;
  void main() {
    // 9-tap gaussian folded into 5 bilinear taps
    vec3 c = texture2D(tSrc, vUv).rgb * 0.2270270270;
    c += (texture2D(tSrc, vUv + uDir * 1.3846153846).rgb + texture2D(tSrc, vUv - uDir * 1.3846153846).rgb) * 0.3162162162;
    c += (texture2D(tSrc, vUv + uDir * 3.2307692308).rgb + texture2D(tSrc, vUv - uDir * 3.2307692308).rgb) * 0.0702702703;
    gl_FragColor = vec4(c, 1.0);
  }`;

const FINAL_FRAG = /* glsl */ `
  uniform sampler2D tScene, tBloomA, tBloomB;
  uniform float uBloomA, uBloomB, uContrast, uSat, uVig, uAspect;
  uniform vec3 uTint;
  varying vec2 vUv;
  void main() {
    vec3 c = texture2D(tScene, vUv).rgb;
    #ifdef BLOOM
      c += texture2D(tBloomA, vUv).rgb * uBloomA;
      #ifdef BLOOM2
        c += texture2D(tBloomB, vUv).rgb * uBloomB;
      #endif
    #endif
    gl_FragColor = vec4(c, 1.0);
    #ifdef TONE_MAPPING
      gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
    #endif
    // grade in the encoded (display) space, where contrast behaves as people expect
    vec3 s = linearToOutputTexel(gl_FragColor).rgb;
    s = (s - 0.5) * uContrast + 0.5;
    float l = dot(s, vec3(0.299, 0.587, 0.114));
    s = mix(vec3(l), s, uSat) * uTint;
    vec2 q = (vUv - 0.5) * vec2(uAspect, 1.0);
    s *= 1.0 - uVig * smoothstep(0.25, 1.05, length(q) * 1.25);
    // 1/255 triangular-ish dither: the smooth sky gradient would show bands otherwise
    s += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
    gl_FragColor = vec4(clamp(s, 0.0, 1.0), 1.0);
  }`;

function target(w, h, opts = {}) {
  return new THREE.WebGLRenderTarget(Math.max(2, w | 0), Math.max(2, h | 0), { type: THREE.HalfFloatType, depthBuffer: false, ...opts });
}

export class PostFx {
  constructor(renderer, scene, camera, opts = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.mobile = !!opts.mobile;
    // Rendering into half-float targets needs one of these extensions. An old phone without them
    // would show a black screen, so there the game simply draws without post-processing.
    const gl = renderer.getContext();
    this.supported = renderer.capabilities.isWebGL2 !== false && !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
    this.level = 0;
    this.w = this.h = 0;
    this.look = { ...LOOKS.partie };
    this.rt = null; // allocated by the first setSize

    this.quad = new FullScreenQuad(null);
    this.bright = new THREE.ShaderMaterial({
      uniforms: { tScene: { value: null }, uTexel: { value: new THREE.Vector2() }, uThrW: { value: 3 }, uThrC: { value: 1 } },
      vertexShader: VERT,
      fragmentShader: BRIGHT_FRAG,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.blur = new THREE.ShaderMaterial({
      uniforms: { tSrc: { value: null }, uDir: { value: new THREE.Vector2() } },
      vertexShader: VERT,
      fragmentShader: BLUR_FRAG,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.final = new THREE.ShaderMaterial({
      uniforms: {
        tScene: { value: null },
        tBloomA: { value: null },
        tBloomB: { value: null },
        uBloomA: { value: 0 },
        uBloomB: { value: 0 },
        uContrast: { value: 1 },
        uSat: { value: 1 },
        uVig: { value: 0 },
        uAspect: { value: 1 },
        uTint: { value: new THREE.Vector3(1, 1, 1) },
      },
      vertexShader: VERT,
      fragmentShader: FINAL_FRAG,
      depthTest: false,
      depthWrite: false,
      // toneMapped stays true: three then adds toneMapping() + linearToOutputTexel() with the renderer's own
      // tone mapping and exposure, which is what makes this path look like the plain one.
    });
    this._variant = '';
  }

  get active() {
    return this.level < 2 && !!this.rt;
  }

  setSize(width, height, pixelRatio) {
    const W = Math.max(2, Math.round(width * pixelRatio));
    const H = Math.max(2, Math.round(height * pixelRatio));
    this.w = W;
    this.h = H;
    this._alloc();
  }

  setQuality(level) {
    this.level = level;
    this._alloc();
  }

  setBiome(id, env) {
    Object.assign(this.look, LOOKS[id] || LOOKS.partie, env && env.post ? env.post : null);
    this.id = id;
  }

  /** Targets exist only while post-processing is on; they are rebuilt only when the size or the quality step changes. */
  _alloc() {
    if (this.level >= 2 || !this.w || !this.supported) {
      this._free();
      return;
    }
    const bloom = !(this.mobile && this.level >= 1);
    const two = bloom && !this.mobile && this.level === 0;
    const key = `${this.w}x${this.h}|${bloom}|${two}`;
    if (key === this._key) return;
    this._free();
    this._key = key;
    this.bloom = bloom;
    this.two = two;
    this.rt = new THREE.WebGLRenderTarget(this.w, this.h, { type: THREE.HalfFloatType, depthBuffer: true, samples: this.mobile ? 2 : 4 });
    if (bloom) {
      const div = this.mobile ? 6 : 4;
      const a = (n) => Math.max(2, Math.round(n / div));
      this.a1 = target(a(this.w), a(this.h));
      this.a2 = target(a(this.w), a(this.h));
      if (two) {
        this.b1 = target(a(this.w) >> 1, a(this.h) >> 1);
        this.b2 = target(a(this.w) >> 1, a(this.h) >> 1);
      }
    }
    const variant = (bloom ? 'B' : '') + (two ? '2' : '');
    if (variant !== this._variant) {
      this.final.defines = {};
      if (bloom) this.final.defines.BLOOM = '';
      if (two) this.final.defines.BLOOM2 = '';
      this.final.needsUpdate = true;
      this._variant = variant;
    }
  }

  _free() {
    for (const k of ['rt', 'a1', 'a2', 'b1', 'b2']) {
      if (this[k]) this[k].dispose();
      this[k] = null;
    }
    this._key = '';
  }

  _pass(material, out) {
    this.quad.material = material;
    this.renderer.setRenderTarget(out);
    this.quad.render(this.renderer);
  }

  render() {
    const r = this.renderer;
    if (!this.active) {
      r.setRenderTarget(null);
      r.render(this.scene, this.camera);
      return;
    }
    const L = this.look;
    r.setRenderTarget(this.rt);
    r.render(this.scene, this.camera);

    const fu = this.final.uniforms;
    if (this.bloom) {
      const bu = this.bright.uniforms;
      bu.tScene.value = this.rt.texture;
      bu.uTexel.value.set(0.5 / this.w, 0.5 / this.h);
      bu.uThrW.value = L.thrW;
      bu.uThrC.value = L.thrC;
      this._pass(this.bright, this.a1);
      const u = this.blur.uniforms;
      u.tSrc.value = this.a1.texture;
      u.uDir.value.set(1 / this.a1.width, 0);
      this._pass(this.blur, this.a2);
      u.tSrc.value = this.a2.texture;
      u.uDir.value.set(0, 1 / this.a2.height);
      this._pass(this.blur, this.a1);
      fu.tBloomA.value = this.a1.texture;
      fu.uBloomA.value = L.bloom * (this.two ? 0.65 : 1);
      if (this.two) {
        // second, wider level: the first blur reads the already blurred quarter-size image (= the downsample)
        u.tSrc.value = this.a1.texture;
        u.uDir.value.set(1 / this.a1.width, 0);
        this._pass(this.blur, this.b1);
        u.tSrc.value = this.b1.texture;
        u.uDir.value.set(0, 1 / this.b1.height);
        this._pass(this.blur, this.b2);
        fu.tBloomB.value = this.b2.texture;
        fu.uBloomB.value = L.bloom * 0.8;
      }
    }
    fu.tScene.value = this.rt.texture;
    fu.uContrast.value = L.contrast;
    fu.uSat.value = L.sat;
    fu.uVig.value = L.vig;
    fu.uAspect.value = this.w / this.h;
    fu.uTint.value.set(L.tint[0], L.tint[1], L.tint[2]);
    this._pass(this.final, null);
  }
}
