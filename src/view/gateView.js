import * as THREE from 'three';
import { BIOMES } from '../logic/biomes.js';

/**
 * The portal between two levels: a glowing arch with a swirling center, a tunnel of light rings in
 * front of it and a sign with the name of the next place. Only one exists; it is moved to the next
 * gate position when the generator places one. Nothing is created after the constructor (the sign
 * is redrawn on the same canvas).
 */
const COLORS = {
  partie: [0x9fd3ff, 0xffffff, 0x5ab0ff],
  republicii: [0xffb703, 0xe63946, 0xfff1c1],
  tractorul: [0x2a9d8f, 0xf4a261, 0xffffff],
  afi: [0xff4fa3, 0x5ad1ff, 0xffffff],
  noua: [0x8db357, 0x5ad1ff, 0xfff6c8],
};
const RINGS = 6;
const RING_GAP = 9;

function swirlTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 4, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  // spiral arms
  g.strokeStyle = 'rgba(255,255,255,0.55)';
  g.lineWidth = 9;
  for (let arm = 0; arm < 4; arm++) {
    g.beginPath();
    for (let k = 0; k < 60; k++) {
      const a = arm * (Math.PI / 2) + k * 0.09;
      const r = k * 2;
      const x = 128 + Math.cos(a) * r;
      const y = 128 + Math.sin(a) * r;
      if (k === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Soft light rays fanning out from the center (for the portal's sunburst). */
function raysTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.translate(128, 128);
  for (let k = 0; k < 14; k++) {
    g.save();
    g.rotate((k / 14) * Math.PI * 2);
    const grad = g.createLinearGradient(0, 0, 128, 0);
    grad.addColorStop(0, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(128, -9 - (k % 3) * 3);
    g.lineTo(128, 9 + (k % 3) * 3);
    g.fill();
    g.restore();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class GateView {
  constructor(scene) {
    this.root = new THREE.Group();
    this.root.visible = false;
    scene.add(this.root);
    const add = (o) => (o.renderOrder = 3);
    this.glowMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    this.ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false, fog: false });
    this.swirlMat = new THREE.MeshBasicMaterial({ map: swirlTexture(), color: 0xffffff, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });

    // the arch (half torus) on two pillars
    this.arch = new THREE.Group();
    const arc = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.38, 10, 40, Math.PI), this.glowMat);
    arc.position.y = 1.2;
    this.arch.add(arc);
    for (const sx of [-1, 1]) {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.2, 10), this.glowMat);
      p.position.set(sx * 6.2, 0.6, 0);
      this.arch.add(p);
    }
    this.swirl = new THREE.Mesh(new THREE.CircleGeometry(6.0, 40), this.swirlMat); // (the part under the ground is hidden)
    this.swirl.position.y = 1.2;
    this.arch.add(this.swirl);
    // v3: a slowly turning sunburst behind the swirl and a soft pulsing halo around the whole arch
    this.raysMat = new THREE.MeshBasicMaterial({ map: raysTexture(), color: 0xffffff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, fog: false });
    this.rays = new THREE.Mesh(new THREE.CircleGeometry(11, 32), this.raysMat);
    this.rays.position.set(0, 1.2, -0.15);
    this.arch.add(this.rays);
    this.arch.traverse(add);
    this.root.add(this.arch);

    // tunnel of rings in front of the arch
    this.rings = [];
    const ringGeo = new THREE.TorusGeometry(5.6, 0.12, 6, 36, Math.PI);
    for (let i = 0; i < RINGS; i++) {
      const r = new THREE.Mesh(ringGeo, this.ringMat);
      r.position.set(0, 1.2, (i + 1) * RING_GAP);
      r.renderOrder = 3;
      this.root.add(r);
      this.rings.push(r);
    }

    // sign with the next place's name
    this.signCanvas = document.createElement('canvas');
    this.signCanvas.width = 1024;
    this.signCanvas.height = 192;
    this.signTex = new THREE.CanvasTexture(this.signCanvas);
    this.signTex.colorSpace = THREE.SRGBColorSpace;
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(13, 2.45), new THREE.MeshBasicMaterial({ map: this.signTex, transparent: true, depthWrite: false, fog: false }));
    sign.position.set(0, 9.1, 0.2);
    sign.renderOrder = 4;
    this.root.add(sign);
    this.colors = COLORS.partie;
  }

  _drawSign(name, color) {
    const g = this.signCanvas.getContext('2d');
    const { width: w, height: h } = this.signCanvas;
    g.clearRect(0, 0, w, h);
    g.fillStyle = 'rgba(11,36,71,0.78)';
    const r = 48;
    g.beginPath();
    g.moveTo(r, 0);
    g.arcTo(w, 0, w, h, r);
    g.arcTo(w, h, 0, h, r);
    g.arcTo(0, h, 0, 0, r);
    g.arcTo(0, 0, w, 0, r);
    g.fill();
    g.strokeStyle = '#' + new THREE.Color(color).getHexString();
    g.lineWidth = 10;
    g.stroke();
    g.fillStyle = '#ffffff';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const text = '→ ' + name.toUpperCase();
    let size = 92;
    do {
      g.font = `900 ${size}px Arial, Helvetica, sans-serif`;
      size -= 4;
    } while (g.measureText(text).width > w - 90 && size > 40); // shrink long names to fit
    g.fillText(text, w / 2, h / 2 + 4);
    this.signTex.needsUpdate = true;
  }

  /** Place the portal at track position gateS, leading to biome index `biome`. */
  show(gateS, biome) {
    const B = BIOMES[biome];
    this.gateS = gateS;
    this.colors = COLORS[B.id];
    this.glowMat.color.set(this.colors[0]);
    this.ringMat.color.set(this.colors[1]);
    this.swirlMat.color.set(this.colors[0]);
    this.raysMat.color.set(this.colors[2]);
    this._drawSign(B.name, this.colors[0]);
    this.root.visible = true;
  }

  hide() {
    this.root.visible = false;
  }

  /** @param secs seconds until the player reaches the gate */
  update(distance, t, secs) {
    if (!this.root.visible) return;
    this.root.position.z = -(this.gateS - distance);
    this.swirl.rotation.z = -t * 1.6;
    const pulse = 0.5 + 0.5 * Math.sin(t * 6);
    const near = THREE.MathUtils.clamp(1 - secs / 2.5, 0, 1);
    this.glowMat.opacity = 0.75 + 0.25 * pulse;
    this.swirlMat.opacity = 0.55 + 0.4 * near;
    this.arch.scale.setScalar(1 + near * 0.08 + pulse * 0.02);
    this.rays.rotation.z = t * 0.5;
    this.raysMat.opacity = 0.3 + 0.3 * near + 0.1 * pulse;
    for (let i = 0; i < this.rings.length; i++) {
      const r = this.rings[i];
      r.scale.setScalar(1 + 0.06 * Math.sin(t * 5 + i));
      r.rotation.z = Math.sin(t * 2 + i) * 0.04;
    }
  }
}
