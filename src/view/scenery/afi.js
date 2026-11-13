import * as THREE from 'three';
import { glossPatch } from '../gfx/patches.js';
import { Scenery, TRACK_HALF, canvasTexture, lambertVC, merged, part, rand } from './common.js';

/**
 * Level 4, AFI Brașov: inside the shopping mall. A long gallery with a glossy cream floor, three
 * levels of lit shop fronts (stores that really are in AFI Brașov, each window drawn for its kind of
 * shop: clothes racks, shoe walls, cosmetics shelves, TVs, toys, coffee bar...), white slabs with
 * glass balustrades, round white columns, glass bridges between the two sides, and a skylight roof
 * with steel beams. Indoor lighting: warm and even, no sky.
 * The names are written in a plain font on a colored sign band (no logos are copied).
 */
const FOG = 0xf0e8dc;
const LEVEL_H = 5.6;
const SHOP_W = 12;
const CEIL = LEVEL_H * 3 + 0.8;

const SANS = 'Arial, Helvetica, sans-serif';
const SERIF = 'Georgia, "Times New Roman", serif';

// Tenants of AFI Brașov (from the mall's store directory, afibrasov.ro). `theme` picks what is drawn
// in the shop window; bg/sign/glow are the sign band, the letters and the light inside.
const SHOPS = [
  { name: 'ZARA', theme: 'fashion', bg: '#111111', sign: '#ffffff', glow: '#fff4e6', font: SERIF },
  { name: 'DEICHMANN', theme: 'shoes', bg: '#d7262e', sign: '#ffffff', glow: '#fff1ea' },
  { name: 'SEPHORA', theme: 'beauty', bg: '#0b0b0b', sign: '#ffffff', glow: '#fff0f3' },
  { name: 'JD SPORTS', theme: 'sport', bg: '#101010', sign: '#ffd200', glow: '#eef3ff' },
  { name: 'ALTEX', theme: 'tech', bg: '#e30613', sign: '#ffffff', glow: '#e9f4ff' },
  { name: 'NORIEL', theme: 'toys', bg: '#f7c600', sign: '#d4145a', glow: '#fff9e0' },
  { name: 'STARBUCKS', theme: 'coffee', bg: '#00704a', sign: '#ffffff', glow: '#ffe9c7' },
  { name: 'TEILOR', theme: 'jewelry', bg: '#1e2b3a', sign: '#e8c76a', glow: '#fff6dc', font: SERIF },
  { name: 'MANGO', theme: 'fashion', bg: '#2a2a2a', sign: '#f2e8da', glow: '#fff1df', font: SERIF },
  { name: 'SKECHERS', theme: 'shoes', bg: '#1f3b8f', sign: '#ffffff', glow: '#eef4ff' },
  { name: 'YVES ROCHER', theme: 'beauty', bg: '#2e6b34', sign: '#ffffff', glow: '#f2fbe9' },
  { name: 'INTERSPORT', theme: 'sport', bg: '#003a8c', sign: '#ffffff', glow: '#eaf2ff' },
  { name: 'ZARA HOME', theme: 'home', bg: '#3b3a36', sign: '#f4efe6', glow: '#fff3e2', font: SERIF },
  { name: 'INTIMISSIMI', theme: 'lingerie', bg: '#f3d9df', sign: '#7a2a3d', glow: '#fff3f6', font: SERIF },
  { name: 'BERSHKA', theme: 'fashion', bg: '#ffffff', sign: '#111111', glow: '#f1f1f1' },
  { name: 'CARREFOUR', theme: 'market', bg: '#0e4ea3', sign: '#ffffff', glow: '#eef6ff' },
  { name: 'LEVI’S', theme: 'denim', bg: '#c8102e', sign: '#ffffff', glow: '#eef2f8' },
  { name: 'NIKE', theme: 'sport', bg: '#f26b21', sign: '#ffffff', glow: '#fff3ea' },
  { name: 'ECCO', theme: 'shoes', bg: '#4a3a2c', sign: '#f3e6d3', glow: '#fff4e6' },
  { name: 'MAC', theme: 'beauty', bg: '#1a1a1a', sign: '#ffffff', glow: '#fbeef0' },
  { name: 'CALZEDONIA', theme: 'lingerie', bg: '#fdfdfd', sign: '#1f2a44', glow: '#fff4f6' },
  { name: 'THE NORTH FACE', theme: 'outdoor', bg: '#1b1b1b', sign: '#ffffff', glow: '#eef4f1' },
  { name: 'TOMMY HILFIGER', theme: 'fashion', bg: '#0c2340', sign: '#ffffff', glow: '#f2f5fb' },
  { name: 'VODAFONE', theme: 'tech', bg: '#e60000', sign: '#ffffff', glow: '#fff2f2' },
];

/** Little helpers for the window drawings (all in canvas pixels). */
const PALETTE = ['#c0392b', '#2c3e50', '#16a085', '#8e44ad', '#f39c12', '#7f8c8d', '#e9c46a', '#264653', '#e76f51', '#f4f1ea'];
const pick = (r, list = PALETTE) => list[(r() * list.length) | 0];

function rrect(g, x, y, w, h, rad) {
  g.beginPath();
  g.moveTo(x + rad, y);
  g.arcTo(x + w, y, x + w, y + h, rad);
  g.arcTo(x + w, y + h, x, y + h, rad);
  g.arcTo(x, y + h, x, y, rad);
  g.arcTo(x, y, x + w, y, rad);
  g.closePath();
  g.fill();
}

function shelves(g, x0, x1, ys, color = 'rgba(90,70,55,0.55)') {
  g.fillStyle = color;
  for (const y of ys) g.fillRect(x0, y, x1 - x0, 4);
}

function tshirt(g, x, y, w, h, color) {
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(x + w * 0.3, y);
  g.lineTo(x + w * 0.7, y);
  g.lineTo(x + w, y + h * 0.22);
  g.lineTo(x + w * 0.86, y + h * 0.38);
  g.lineTo(x + w * 0.78, y + h * 0.3);
  g.lineTo(x + w * 0.78, y + h);
  g.lineTo(x + w * 0.22, y + h);
  g.lineTo(x + w * 0.22, y + h * 0.3);
  g.lineTo(x + w * 0.14, y + h * 0.38);
  g.lineTo(x, y + h * 0.22);
  g.closePath();
  g.fill();
}

function dress(g, x, y, w, h, color) {
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(x + w * 0.35, y);
  g.lineTo(x + w * 0.65, y);
  g.lineTo(x + w * 0.7, y + h * 0.35);
  g.lineTo(x + w, y + h);
  g.lineTo(x, y + h);
  g.lineTo(x + w * 0.3, y + h * 0.35);
  g.closePath();
  g.fill();
}

function shoe(g, x, y, w, color, sole = '#f4f4f4') {
  g.fillStyle = color;
  g.beginPath();
  g.moveTo(x, y);
  g.lineTo(x + w * 0.45, y);
  g.quadraticCurveTo(x + w * 0.6, y + w * 0.22, x + w, y + w * 0.3);
  g.lineTo(x + w, y + w * 0.45);
  g.lineTo(x, y + w * 0.45);
  g.closePath();
  g.fill();
  g.fillStyle = sole;
  g.fillRect(x, y + w * 0.4, w, w * 0.08);
}

function mannequin(g, x, y, h, outfit) {
  g.fillStyle = '#f2ece4';
  g.beginPath();
  g.arc(x, y + h * 0.08, h * 0.07, 0, Math.PI * 2);
  g.fill();
  dress(g, x - h * 0.18, y + h * 0.16, h * 0.36, h * 0.62, outfit);
  g.fillStyle = '#8a8a8a';
  g.fillRect(x - 2, y + h * 0.78, 4, h * 0.2);
  g.fillRect(x - h * 0.1, y + h * 0.97, h * 0.2, 3);
}

/** What is drawn inside the window for each kind of shop (area x0..x1, top..bottom). */
const THEMES = {
  fashion(g, r, x0, x1, top, bot) {
    // a clothes rail with hangers + two mannequins near the entrance
    g.fillStyle = 'rgba(60,60,60,0.8)';
    g.fillRect(x0 + 10, top + 30, x1 - x0 - 20, 3);
    for (let x = x0 + 18; x < x1 - 40; x += 30) {
      if (Math.abs(x - (x0 + x1) / 2) < 70) continue;
      g.fillStyle = 'rgba(60,60,60,0.7)';
      g.fillRect(x + 11, top + 26, 2, 8);
      (r() < 0.5 ? tshirt : dress)(g, x, top + 34, 24, 52 + r() * 18, pick(r));
    }
    mannequin(g, (x0 + x1) / 2 - 34, top + 22, bot - top - 26, pick(r));
    mannequin(g, (x0 + x1) / 2 + 34, top + 22, bot - top - 26, pick(r));
  },
  denim(g, r, x0, x1, top, bot) {
    const blues = ['#1f3a68', '#2c5288', '#3e6aa8', '#5b84bf', '#18304f'];
    shelves(g, x0 + 8, x1 - 8, [top + 52, top + 100, top + 148]);
    for (const y of [top + 52, top + 100, top + 148]) {
      for (let x = x0 + 14; x < x1 - 30; x += 22) {
        if (Math.abs(x - (x0 + x1) / 2) < 60) continue;
        g.fillStyle = pick(r, blues);
        rrect(g, x, y - 14, 18, 14, 2); // folded jeans
        g.fillStyle = 'rgba(255,255,255,0.25)';
        g.fillRect(x + 2, y - 9, 14, 1);
      }
    }
    mannequin(g, (x0 + x1) / 2, top + 22, bot - top - 26, '#2c5288');
  },
  shoes(g, r, x0, x1, top, bot) {
    const ys = [top + 44, top + 82, top + 120, top + 158];
    shelves(g, x0 + 8, x1 - 8, ys, 'rgba(255,255,255,0.85)');
    for (const y of ys) {
      for (let x = x0 + 14; x < x1 - 36; x += 34) {
        if (Math.abs(x - (x0 + x1) / 2) < 60) continue;
        shoe(g, x, y - 13, 28, pick(r, ['#1a1a1a', '#7b4a2b', '#c0392b', '#f4f4f4', '#2c3e50', '#d4a373', '#e76f51']));
      }
    }
    // a bench and a mirror in the middle
    g.fillStyle = '#b07a4c';
    g.fillRect((x0 + x1) / 2 - 40, bot - 26, 80, 10);
    g.fillStyle = 'rgba(200,230,240,0.8)';
    g.fillRect((x0 + x1) / 2 - 14, top + 20, 28, 90);
  },
  sport(g, r, x0, x1, top, bot) {
    // sneaker wall on the left, jerseys on the right, balls on the floor
    const ys = [top + 44, top + 80, top + 116, top + 152];
    shelves(g, x0 + 8, (x0 + x1) / 2 - 50, ys, 'rgba(255,255,255,0.9)');
    for (const y of ys) for (let x = x0 + 14; x < (x0 + x1) / 2 - 80; x += 32) shoe(g, x, y - 12, 26, pick(r, ['#ffffff', '#111111', '#e63946', '#2a9d8f', '#ffd166', '#4361ee']));
    for (let x = (x0 + x1) / 2 + 56; x < x1 - 30; x += 34) {
      tshirt(g, x, top + 36, 30, 60, pick(r, ['#e63946', '#1d3557', '#ffd166', '#2a9d8f', '#111111', '#ffffff']));
      g.fillStyle = 'rgba(255,255,255,0.9)';
      g.font = `900 16px ${SANS}`;
      g.textAlign = 'center';
      g.fillText(String(((r() * 30) | 0) + 1), x + 15, top + 72);
    }
    for (let i = 0; i < 4; i++) {
      const bx = (x0 + x1) / 2 + 60 + i * 44;
      g.fillStyle = i % 2 ? '#f77f00' : '#ffffff';
      g.beginPath();
      g.arc(bx, bot - 18, 14, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = 'rgba(0,0,0,0.5)';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(bx, bot - 18, 14, 0, Math.PI * 2);
      g.moveTo(bx - 14, bot - 18);
      g.lineTo(bx + 14, bot - 18);
      g.stroke();
    }
  },
  outdoor(g, r, x0, x1, top, bot) {
    // puffer jackets, backpacks, a tent
    for (let x = x0 + 16; x < (x0 + x1) / 2 - 60; x += 36) {
      const c = pick(r, ['#e63946', '#f4a261', '#264653', '#1b1b1b', '#2a9d8f', '#ffd166']);
      tshirt(g, x, top + 34, 32, 74, c);
      g.fillStyle = 'rgba(0,0,0,0.18)';
      for (let k = 1; k < 5; k++) g.fillRect(x + 8, top + 34 + k * 14, 16, 2); // quilting
    }
    g.fillStyle = '#e9a23b';
    g.beginPath();
    g.moveTo((x0 + x1) / 2 + 50, bot - 6);
    g.lineTo((x0 + x1) / 2 + 120, top + 70);
    g.lineTo((x0 + x1) / 2 + 190, bot - 6);
    g.closePath();
    g.fill();
    g.fillStyle = '#3d2b1f';
    g.beginPath();
    g.moveTo((x0 + x1) / 2 + 105, bot - 6);
    g.lineTo((x0 + x1) / 2 + 120, top + 120);
    g.lineTo((x0 + x1) / 2 + 135, bot - 6);
    g.fill();
    for (let i = 0; i < 2; i++) {
      g.fillStyle = pick(r, ['#2a9d8f', '#e63946', '#264653']);
      rrect(g, x1 - 60 + i * 26, bot - 60, 22, 50, 6);
    }
  },
  beauty(g, r, x0, x1, top, bot) {
    // glossy shelves full of bottles and lipsticks, a makeup counter in the middle
    const ys = [top + 50, top + 92, top + 134];
    shelves(g, x0 + 8, x1 - 8, ys, 'rgba(255,255,255,0.95)');
    for (const y of ys) {
      for (let x = x0 + 14; x < x1 - 20; x += 14) {
        if (Math.abs(x - (x0 + x1) / 2) < 56) continue;
        const h = 14 + r() * 18;
        g.fillStyle = pick(r, ['#f4a6b8', '#d63384', '#1a1a1a', '#f1c6a8', '#b5179e', '#ffd6a5', '#ffffff', '#c9184a']);
        rrect(g, x, y - h, 9, h, 2);
        g.fillStyle = r() < 0.5 ? '#d4af37' : '#222222';
        g.fillRect(x + 2, y - h - 5, 5, 5);
      }
    }
    g.fillStyle = '#ffffff';
    g.fillRect((x0 + x1) / 2 - 46, bot - 40, 92, 34);
    g.fillStyle = '#111111';
    g.fillRect((x0 + x1) / 2 - 46, bot - 40, 92, 5);
    g.fillStyle = 'rgba(255,255,255,0.95)';
    g.beginPath();
    g.arc((x0 + x1) / 2, top + 60, 26, 0, Math.PI * 2); // round mirror with bulbs
    g.fill();
    g.fillStyle = '#ffe9a8';
    for (let k = 0; k < 10; k++) {
      g.beginPath();
      g.arc((x0 + x1) / 2 + Math.cos((k / 10) * Math.PI * 2) * 32, top + 60 + Math.sin((k / 10) * Math.PI * 2) * 32, 3.5, 0, Math.PI * 2);
      g.fill();
    }
  },
  jewelry(g, r, x0, x1, top, bot) {
    // dark velvet displays with gold rings, necklaces and sparkles
    g.fillStyle = 'rgba(25,35,50,0.85)';
    g.fillRect(x0 + 10, top + 10, x1 - x0 - 20, bot - top - 20);
    for (let i = 0; i < 6; i++) {
      const cx = x0 + 40 + i * ((x1 - x0 - 80) / 5);
      if (Math.abs(cx - (x0 + x1) / 2) < 40) continue;
      g.fillStyle = '#f5f0e6';
      g.beginPath(); // neck bust
      g.moveTo(cx - 22, bot - 30);
      g.lineTo(cx - 10, top + 60);
      g.lineTo(cx + 10, top + 60);
      g.lineTo(cx + 22, bot - 30);
      g.fill();
      g.strokeStyle = '#e8c76a';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(cx, top + 64, 16, 0.15 * Math.PI, 0.85 * Math.PI);
      g.stroke();
      g.fillStyle = pick(r, ['#e63946', '#4cc9f0', '#80ed99', '#ffffff']);
      g.beginPath();
      g.arc(cx, top + 81, 3.5, 0, Math.PI * 2);
      g.fill();
    }
    // glass counter with rings
    g.fillStyle = 'rgba(220,240,255,0.5)';
    g.fillRect(x0 + 14, bot - 34, x1 - x0 - 28, 28);
    g.strokeStyle = '#e8c76a';
    g.lineWidth = 2;
    for (let x = x0 + 24; x < x1 - 20; x += 20) {
      g.beginPath();
      g.arc(x, bot - 20, 5, 0, Math.PI * 2);
      g.stroke();
    }
    g.fillStyle = '#ffffff';
    for (let i = 0; i < 18; i++) {
      const sx = x0 + r() * (x1 - x0);
      const sy = top + r() * (bot - top);
      g.fillRect(sx - 4, sy, 9, 1.5); // sparkles
      g.fillRect(sx, sy - 4, 1.5, 9);
    }
  },
  lingerie(g, r, x0, x1, top, bot) {
    g.fillStyle = 'rgba(255,214,224,0.45)';
    g.fillRect(x0 + 10, top + 6, x1 - x0 - 20, bot - top - 12);
    for (let x = x0 + 20; x < x1 - 30; x += 34) {
      if (Math.abs(x - (x0 + x1) / 2) < 70) continue;
      const c = pick(r, ['#d63384', '#ffffff', '#1a1a1a', '#f4a6b8', '#7a2a3d', '#f1c6a8']);
      g.fillStyle = 'rgba(60,60,60,0.7)';
      g.fillRect(x + 12, top + 26, 2, 10);
      dress(g, x, top + 36, 26, 60, c); // nightdresses
      g.fillStyle = pick(r, ['#ffe0e9', '#f8f9fa', '#ffccd5', '#e7c6ff']);
      rrect(g, x + 3, top + 110, 20, 36, 4); // folded socks / tights
    }
    mannequin(g, (x0 + x1) / 2, top + 22, bot - top - 26, '#d63384');
  },
  tech(g, r, x0, x1, top, bot) {
    // a wall of TVs with bright pictures, phones on a counter
    for (let row = 0; row < 2; row++) {
      for (let x = x0 + 16; x < x1 - 70; x += 74) {
        if (Math.abs(x + 32 - (x0 + x1) / 2) < 60) continue;
        const y = top + 16 + row * 62;
        g.fillStyle = '#111111';
        g.fillRect(x, y, 66, 44);
        const gr = g.createLinearGradient(x, y, x + 66, y + 44);
        gr.addColorStop(0, pick(r, ['#4cc9f0', '#f72585', '#80ed99', '#ffd166', '#4361ee']));
        gr.addColorStop(1, pick(r, ['#3a0ca3', '#06d6a0', '#ef476f', '#118ab2']));
        g.fillStyle = gr;
        g.fillRect(x + 3, y + 3, 60, 38);
      }
    }
    g.fillStyle = '#ffffff';
    g.fillRect(x0 + 14, bot - 34, x1 - x0 - 28, 28);
    for (let x = x0 + 26; x < x1 - 26; x += 22) {
      if (Math.abs(x - (x0 + x1) / 2) < 50) continue;
      g.fillStyle = '#1a1a1a';
      rrect(g, x, bot - 52, 12, 22, 2);
      g.fillStyle = pick(r, ['#4cc9f0', '#80ed99', '#ffd166', '#f72585']);
      g.fillRect(x + 1.5, bot - 50, 9, 17);
    }
  },
  toys(g, r, x0, x1, top, bot) {
    const ys = [top + 60, top + 112, top + 164];
    shelves(g, x0 + 8, x1 - 8, ys, 'rgba(255,255,255,0.9)');
    for (const y of ys) {
      for (let x = x0 + 16; x < x1 - 30; x += 30) {
        if (Math.abs(x - (x0 + x1) / 2) < 60) continue;
        const kind = (r() * 3) | 0;
        g.fillStyle = pick(r, ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#f72585', '#ff9f1c']);
        if (kind === 0) rrect(g, x, y - 34, 22, 34, 3); // toy box
        else if (kind === 1) {
          g.beginPath();
          g.arc(x + 11, y - 12, 12, 0, Math.PI * 2); // ball
          g.fill();
        } else {
          g.fillStyle = '#b07a4c'; // teddy bear
          g.beginPath();
          g.arc(x + 11, y - 12, 11, 0, Math.PI * 2);
          g.arc(x + 11, y - 30, 8, 0, Math.PI * 2);
          g.arc(x + 4, y - 37, 3.5, 0, Math.PI * 2);
          g.arc(x + 18, y - 37, 3.5, 0, Math.PI * 2);
          g.fill();
        }
      }
    }
    // balloons over the entrance
    for (let i = 0; i < 5; i++) {
      const bx = (x0 + x1) / 2 - 40 + i * 20;
      g.fillStyle = pick(r, ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#f72585']);
      g.beginPath();
      g.ellipse(bx, top + 24 + (i % 2) * 8, 9, 11, 0, 0, Math.PI * 2);
      g.fill();
    }
  },
  coffee(g, r, x0, x1, top, bot) {
    // a menu board, a coffee counter with cups, round tables
    g.fillStyle = '#2b2b2b';
    g.fillRect(x0 + 20, top + 14, 150, 70);
    g.fillStyle = '#f4efe6';
    g.font = `700 13px ${SANS}`;
    g.textAlign = 'left';
    ['LATTE', 'CAPPUCCINO', 'FRAPPUCCINO', 'ESPRESSO'].forEach((t, i) => g.fillText(t, x0 + 30, top + 32 + i * 15));
    g.fillStyle = '#7a4b2a';
    g.fillRect(x0 + 14, bot - 46, 200, 40);
    for (let x = x0 + 22; x < x0 + 206; x += 18) {
      g.fillStyle = '#ffffff';
      g.fillRect(x, bot - 62, 11, 16);
      g.fillStyle = '#00704a';
      g.fillRect(x, bot - 56, 11, 4);
    }
    for (let i = 0; i < 3; i++) {
      const tx = (x0 + x1) / 2 + 70 + i * 52;
      g.fillStyle = '#3b2a1e';
      g.fillRect(tx - 2, bot - 40, 4, 34);
      g.beginPath();
      g.ellipse(tx, bot - 42, 18, 5, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = '#ffffff';
      g.fillRect(tx - 8, bot - 54, 7, 10);
    }
  },
  home(g, r, x0, x1, top, bot) {
    // a sofa, lamps, vases and cushions
    g.fillStyle = '#c9b79c';
    rrect(g, x0 + 24, bot - 60, 150, 50, 8);
    g.fillStyle = '#b3a080';
    rrect(g, x0 + 24, bot - 84, 150, 30, 8);
    for (let i = 0; i < 3; i++) {
      g.fillStyle = pick(r, ['#e9c46a', '#264653', '#e76f51', '#f4f1ea']);
      rrect(g, x0 + 36 + i * 46, bot - 76, 32, 26, 5);
    }
    for (const lx of [(x0 + x1) / 2 + 70, x1 - 50]) {
      g.fillStyle = '#3b3a36';
      g.fillRect(lx - 2, top + 60, 4, bot - top - 66);
      g.fillStyle = '#fff1cf';
      g.beginPath();
      g.moveTo(lx - 22, top + 62);
      g.lineTo(lx - 12, top + 30);
      g.lineTo(lx + 12, top + 30);
      g.lineTo(lx + 22, top + 62);
      g.fill();
    }
    shelves(g, (x0 + x1) / 2 + 100, x1 - 80, [top + 90, top + 130], 'rgba(120,100,80,0.8)');
    for (let x = (x0 + x1) / 2 + 106; x < x1 - 90; x += 18) {
      g.fillStyle = pick(r, ['#f4f1ea', '#d4a373', '#a3b18a', '#6c757d']);
      rrect(g, x, top + 70, 12, 20, 5);
      rrect(g, x, top + 112, 12, 18, 5);
    }
  },
  market(g, r, x0, x1, top, bot) {
    // supermarket aisles full of colorful products, a cart
    const ys = [top + 42, top + 78, top + 114, top + 150];
    shelves(g, x0 + 8, x1 - 8, ys, 'rgba(140,150,160,0.9)');
    for (const y of ys) {
      for (let x = x0 + 12; x < x1 - 14; x += 11) {
        if (Math.abs(x - (x0 + x1) / 2) < 52) continue;
        g.fillStyle = pick(r, ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#f4a261', '#ffffff', '#8338ec']);
        const h = 16 + r() * 14;
        g.fillRect(x, y - h, 9, h);
      }
    }
    g.strokeStyle = '#555555';
    g.lineWidth = 3;
    const cx = (x0 + x1) / 2 - 22;
    g.strokeRect(cx, bot - 46, 44, 28);
    g.beginPath();
    g.arc(cx + 8, bot - 10, 5, 0, Math.PI * 2);
    g.arc(cx + 36, bot - 10, 5, 0, Math.PI * 2);
    g.stroke();
  },
};

function shopTexture(s, seed) {
  return canvasTexture(512, 240, (g, w, h) => {
    const r = rand(seed);
    g.fillStyle = s.bg;
    g.fillRect(0, 0, w, h);
    // sign band with the shop name (shrunk to fit long names)
    g.fillStyle = s.sign;
    let size = 48;
    g.font = `900 ${size}px ${s.font ?? SANS}`;
    while (g.measureText(s.name).width > w - 40 && size > 20) {
      size -= 2;
      g.font = `900 ${size}px ${s.font ?? SANS}`;
    }
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText(s.name, w / 2, 34);
    g.textBaseline = 'alphabetic';
    // lit window
    const top = 66;
    const grad = g.createLinearGradient(0, top, 0, h);
    grad.addColorStop(0, s.glow);
    grad.addColorStop(1, '#f6efe6');
    g.fillStyle = grad;
    g.fillRect(14, top, w - 28, h - top - 6);
    // what this shop sells
    THEMES[s.theme](g, r, 14, w - 14, top, h - 6);
    // glass mullions and the entrance
    g.fillStyle = 'rgba(40,40,45,0.9)';
    for (let x = 14; x <= w - 14; x += 124) g.fillRect(x - 3, top, 6, h - top);
    g.fillStyle = 'rgba(255,255,255,0.14)';
    g.fillRect(w / 2 - 50, top + 10, 100, h - top - 16);
    // reflections
    g.fillStyle = 'rgba(255,255,255,0.16)';
    for (let i = 0; i < 5; i++) {
      g.beginPath();
      const x = r() * w;
      g.moveTo(x, top);
      g.lineTo(x + 30, top);
      g.lineTo(x - 30, h);
      g.lineTo(x - 60, h);
      g.fill();
    }
  });
}

function floorTexture(aniso) {
  return canvasTexture(
    256,
    256,
    (g, w, h) => {
      const r = rand(31);
      for (let y = 0; y < h; y += 64) {
        for (let x = 0; x < w; x += 64) {
          g.fillStyle = ['#efe7da', '#ebe2d3', '#f3ece1', '#e6dccb'][(r() * 4) | 0];
          g.fillRect(x, y, 64, 64);
          // marble veins
          g.strokeStyle = 'rgba(160,140,120,0.18)';
          g.lineWidth = 1;
          g.beginPath();
          g.moveTo(x + r() * 64, y);
          g.bezierCurveTo(x + r() * 64, y + 20, x + r() * 64, y + 44, x + r() * 64, y + 64);
          g.stroke();
          g.fillStyle = 'rgba(120,105,90,0.35)';
          g.fillRect(x, y, 64, 1);
          g.fillRect(x, y, 1, 64);
        }
      }
    },
    12,
    12,
    aniso,
  );
}

export class AfiScenery extends Scenery {
  constructor(ctx) {
    super(ctx);
    this.env = {
      fog: FOG,
      fogNear: this.mobile ? 36 : 46,
      fogFar: this.mobile ? 140 : 175,
      sky: null, // indoor
      clouds: false,
      sunGlow: false,
      hemi: { sky: 0xfff7ec, ground: 0xc9b8a2, intensity: 1.75 },
      sun: { color: 0xfff6e6, intensity: 1.25, offset: [-4, 24, 3] },
      exposure: 1.0,
      marks: { color: 0xb9a68e, opacity: 0.45 },
      weather: 'none',
      confetti: [0xff4fa3, 0x5ad1ff, 0xffd166, 0xffffff, 0x9b5de5],
    };
    // v3: polished marble: the skylight and its beams are reflected as light streaks at grazing angles
    const floor = glossPatch(new THREE.MeshPhongMaterial({ map: floorTexture(this.aniso), specular: 0x6a5a48, shininess: 70 }), { ceilY: CEIL + 0.45, halfW: TRACK_HALF + 1.5 });
    this.ground(floor, null, { width: 40 });
    this._shops();
    this._levels();
    this._ceiling();
    this._furniture();
  }

  _shops() {
    const span = SHOP_W * 22;
    const by = SHOPS.map(() => []);
    for (const side of [-1, 1]) {
      for (let lvl = 0; lvl < 3; lvl++) {
        const front = TRACK_HALF + 5 + lvl * 0.9;
        for (let i = 0; i < 22; i++) {
          const k = (i * 7 + lvl * 5 + (side > 0 ? 11 : 0)) % SHOPS.length; // 7 is coprime with 24: every row shows all the shops
          by[k].push({ o: i * SHOP_W + (side > 0 ? 5 : 0), x: side * (front + 2), y: lvl * LEVEL_H, rot: side < 0 ? 0 : Math.PI });
        }
      }
    }
    const geo = new THREE.BoxGeometry(4, LEVEL_H - 0.6, SHOP_W - 0.4).translate(0, (LEVEL_H - 0.6) / 2, 0);
    const wall = new THREE.MeshLambertMaterial({ color: 0xe9e2d7 });
    SHOPS.forEach((s, k) => {
      const front = new THREE.MeshBasicMaterial({ map: shopTexture(s, k + 9) }); // shop windows are lit: no shading
      this.recycler(geo, [front, wall, wall, wall, wall, wall], by[k], span, 30);
    });
    // white pilasters between the shops
    const pil = [];
    for (const side of [-1, 1]) for (let lvl = 0; lvl < 3; lvl++) for (let i = 0; i < 22; i++) pil.push({ o: i * SHOP_W + (side > 0 ? 5 : 0) + SHOP_W / 2, x: side * (TRACK_HALF + 5 + lvl * 0.9 + 0.1), y: lvl * LEVEL_H });
    this.recycler(new THREE.BoxGeometry(0.5, LEVEL_H, 0.7).translate(0, LEVEL_H / 2, 0), new THREE.MeshLambertMaterial({ color: 0xf7f3ec }), pil, span, 30);
  }

  _levels() {
    const span = 24 * 11;
    const slabs = [];
    const glass = [];
    const rails = [];
    for (const side of [-1, 1]) {
      for (let lvl = 1; lvl < 3; lvl++) {
        const edge = TRACK_HALF + 2.6 + lvl * 0.5;
        for (let i = 0; i < 11; i++) {
          const o = i * 24;
          slabs.push({ o, x: side * (edge + 4), y: lvl * LEVEL_H - 0.35 });
          glass.push({ o, x: side * (edge + 0.1), y: lvl * LEVEL_H });
          rails.push({ o, x: side * (edge + 0.1), y: lvl * LEVEL_H + 1.1 });
        }
      }
    }
    this.recycler(new THREE.BoxGeometry(8, 0.7, 24.02), new THREE.MeshLambertMaterial({ color: 0xfbf8f3 }), slabs, span, 30, { cast: true });
    this.recycler(
      new THREE.BoxGeometry(0.06, 1.1, 24).translate(0, 0.55, 0),
      new THREE.MeshPhongMaterial({ color: 0xbfe3ea, transparent: true, opacity: 0.32, shininess: 90, specular: 0xffffff, depthWrite: false }),
      glass,
      span,
      30,
    );
    this.recycler(new THREE.BoxGeometry(0.12, 0.08, 24), new THREE.MeshLambertMaterial({ color: 0xb8bcc2 }), rails, span, 30);
    // a glass bridge between the two sides on the top level, now and then
    const bridges = [{ o: 60 }, { o: 190 }].map((b) => ({ ...b, x: 0, y: LEVEL_H * 2 - 0.35 }));
    const bridgeGeo = merged([
      part(new THREE.BoxGeometry(TRACK_HALF * 2 + 6, 0.5, 4), 0xf6f2ea),
      part(new THREE.BoxGeometry(TRACK_HALF * 2 + 6, 0.12, 0.1), 0xb8bcc2, 0, 1.35, 1.95),
      part(new THREE.BoxGeometry(TRACK_HALF * 2 + 6, 0.12, 0.1), 0xb8bcc2, 0, 1.35, -1.95),
    ]);
    this.recycler(bridgeGeo, lambertVC(), bridges, span, 30, { cast: true });
    // round white columns
    const cols = [];
    for (const side of [-1, 1]) for (let i = 0; i < 11; i++) cols.push({ o: i * 24 + 12, x: side * (TRACK_HALF + 2.2) });
    this.recycler(new THREE.CylinderGeometry(0.45, 0.45, CEIL, 14).translate(0, CEIL / 2, 0), new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 40 }), cols, span, 30, { cast: true });
  }

  _ceiling() {
    const span = 6 * 44;
    const ceil = new THREE.Mesh(new THREE.PlaneGeometry(60, 400).rotateX(Math.PI / 2), new THREE.MeshLambertMaterial({ color: 0xf4efe7 }));
    ceil.position.set(0, CEIL + 0.5, -150);
    this.group.add(ceil);
    // skylight: bright glass panels between steel beams
    const sky = new THREE.Mesh(new THREE.PlaneGeometry(TRACK_HALF * 2 + 3, 400).rotateX(Math.PI / 2), new THREE.MeshBasicMaterial({ color: new THREE.Color(0xdff3ff).multiplyScalar(2.6) })); // HDR: the bloom pass makes it glow
    sky.position.set(0, CEIL + 0.45, -150);
    this.group.add(sky);
    const beams = [];
    for (let i = 0; i < 44; i++) beams.push({ o: i * 6, x: 0, y: CEIL });
    this.recycler(new THREE.BoxGeometry(TRACK_HALF * 2 + 4, 0.35, 0.25), new THREE.MeshLambertMaterial({ color: 0x9aa3ad }), beams, span, 30);
    // hanging banners (fabric, swaying a little) high above the gallery
    const banners = [];
    const r = rand(33);
    for (let i = 0; i < 12; i++) banners.push({ o: i * 22 + 7, x: (i % 2 ? 1 : -1) * (TRACK_HALF - 0.6), y: CEIL - 6.3, tint: [0xff4fa3, 0x5ad1ff, 0xffd166, 0x9b5de5][(r() * 4) | 0] });
    this.recycler(new THREE.BoxGeometry(0.06, 5, 1.8).translate(0, 2.5, 0), new THREE.MeshLambertMaterial({ color: 0xffffff }), banners, span, 30, { tint: true });
  }

  _furniture() {
    const r = rand(34);
    // big planters with palms and benches along the edges
    const palms = [];
    const benches = [];
    for (const side of [-1, 1]) {
      for (let i = 0; i < 11; i++) {
        palms.push({ o: i * 24 + 4 + (side > 0 ? 8 : 0), x: side * (TRACK_HALF + 1.2), s: 0.85 + r() * 0.2, rot: r() * 6 });
        benches.push({ o: i * 24 + 18 + (side > 0 ? -6 : 0), x: side * (TRACK_HALF + 1.0), rot: side < 0 ? 0 : Math.PI });
      }
    }
    const palm = [part(new THREE.CylinderGeometry(0.7, 0.55, 0.9, 10), 0xd9d2c6, 0, 0.45, 0), part(new THREE.CylinderGeometry(0.1, 0.14, 2.2, 6), 0x7a5a3a, 0, 2.0, 0)];
    for (let k = 0; k < 7; k++) {
      const leaf = new THREE.ConeGeometry(0.25, 1.9, 4);
      leaf.rotateZ(Math.PI / 2 - 0.5);
      leaf.translate(0.95, 0, 0);
      leaf.rotateY((k / 7) * Math.PI * 2);
      palm.push(part(leaf, k % 2 ? 0x3e8a3c : 0x4e9e44, 0, 3.0, 0));
    }
    this.recycler(merged(palm), lambertVC(), palms, 264, 30, { cast: true });
    const bench = merged([
      part(new THREE.BoxGeometry(0.8, 0.45, 2.4), 0xb07a4c, 0, 0.42, 0),
      part(new THREE.BoxGeometry(0.7, 0.2, 2.2), 0x8b8f96, 0, 0.1, 0),
    ]);
    this.recycler(bench, lambertVC(), benches, 264, 30, { cast: true });
  }
}
