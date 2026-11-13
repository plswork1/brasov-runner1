import * as THREE from 'three';

/**
 * Sky dome shader: vertical gradient (zenith / middle / horizon), sun disc with halo and soft drifting
 * clouds (fbm noise projected on a plane). The dome is drawn LAST with depth = far plane, so the
 * (expensive) cloud pixels are only shaded where the sky is really visible (early depth test).
 * Colours are linear; tone mapping and output colour space are applied by the includes at the end,
 * exactly like for any other material, so the picture is the same with or without post-processing.
 */
export function createSkyMaterial(mobile) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTop: { value: new THREE.Color(0x3d7cc4) },
      uMid: { value: new THREE.Color(0x8fbfe9) },
      uHor: { value: new THREE.Color(0xd7e7f6) },
      uSunDir: { value: new THREE.Vector3(0, 0.3, -1).normalize() },
      uSunCol: { value: new THREE.Color(0xfff2d8) },
      uSun: { value: new THREE.Vector3(0.035, 0.8, 1) }, // x: angular radius, y: halo strength, z: disc strength
      uCloud: { value: new THREE.Vector3(0.45, 0.012, 1) }, // x: cover, y: drift speed, z: visibility
      uCloudLit: { value: new THREE.Color(0xffffff) },
      uCloudShade: { value: new THREE.Color(0xb7c8dc) },
      uTime: { value: 0 },
    },
    defines: { OCT: mobile ? 3 : 4 },
    side: THREE.BackSide,
    depthWrite: false,
    depthFunc: THREE.LessEqualDepth,
    fog: false,
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w * 0.99999;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uTop, uMid, uHor, uSunDir, uSunCol, uSun, uCloud, uCloudLit, uCloudShade;
      uniform float uTime;
      varying vec3 vDir;
      float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }
      float fbm(vec2 p) {
        float a = 0.5, s = 0.0;
        for (int i = 0; i < OCT; i++) { s += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
        return s;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(uHor, uMid, smoothstep(0.0, 0.22, h));
        c = mix(c, uTop, smoothstep(0.18, 0.85, h));
        float sd = max(dot(d, uSunDir), 0.0);
        // clouds: lit from the sun side, with a bright rim toward the sun
        if (h > 0.0 && uCloud.z > 0.0) {
          vec2 uv = d.xz / (h + 0.22) * 1.3 + vec2(uTime * uCloud.y, uTime * uCloud.y * 0.3);
          float n = fbm(uv);
          float cov = smoothstep(1.0 - uCloud.x, 1.0 - uCloud.x + 0.22, n);
          float n2 = fbm(uv + uSunDir.xz * 0.12);
          float lit = clamp(0.55 + (n - n2) * 3.5, 0.0, 1.0);
          vec3 cc = mix(uCloudShade, uCloudLit, lit);
          cc += uSunCol * pow(sd, 6.0) * 0.35 * lit;
          float fadeH = smoothstep(0.02, 0.2, h);
          c = mix(c, cc, cov * fadeH * uCloud.z);
        }
        // sun: wide halo, tight glow and a hard HDR disc (the bloom pass turns it into a shining sun)
        c += uSunCol * (pow(sd, 5.0) * 0.22 + pow(sd, 40.0) * 0.55) * uSun.y;
        float r = uSun.x;
        float disc = smoothstep(cos(r * 1.25), cos(r * 0.9), sd);
        c = mix(c, uSunCol * 9.0, disc * uSun.z);
        gl_FragColor = vec4(c, 1.0);
        #ifdef TONE_MAPPING
          gl_FragColor.rgb = toneMapping(gl_FragColor.rgb);
        #endif
        gl_FragColor = linearToOutputTexel(gl_FragColor);
      }`,
  });
}
