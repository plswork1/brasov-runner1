// Generates the app icons (PNG + SVG) from code, so the project has no image files to copy.
// Run once from the project folder:   npm run icons
// Uses only Node.js itself (no extra packages): it draws the pixels and writes the PNG format by hand.
import { mkdirSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { deflateSync } from 'node:zlib';

// ---- tiny PNG writer -------------------------------------------------------------------------
const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}
/** rgb: Uint8Array of size*size*3 */
function encodePNG(size, rgb) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: RGB
  const raw = Buffer.alloc(size * (size * 3 + 1));
  for (let y = 0; y < size; y++) {
    raw[y * (size * 3 + 1)] = 0; // filter: none
    Buffer.from(rgb.buffer, y * size * 3, size * 3).copy(raw, y * (size * 3 + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---- the drawing: blue gradient, snow hill, white snowflake, golden center --------------------
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

export function drawIcon(size, maskable = false) {
  const S = 3; // 3x3 samples per pixel = smooth edges
  const scale = maskable ? 0.66 : 0.78; // maskable icons keep the motif inside the safe zone
  const R = (size * scale) / 2;
  const cx = size / 2;
  const cy = size / 2 - R * 0.12;
  const width = Math.max(1, size * 0.028);
  // snowflake: 6 arms, each with two pairs of small branches
  const segs = [];
  for (let k = 0; k < 6; k++) {
    const a = ((60 * k - 90) * Math.PI) / 180;
    const ex = cx + Math.cos(a) * R * 0.78;
    const ey = cy + Math.sin(a) * R * 0.78;
    segs.push([cx, cy, ex, ey]);
    for (const f of [0.45, 0.7]) {
      const bx = cx + (ex - cx) * f;
      const by = cy + (ey - cy) * f;
      for (const sgn of [-1, 1]) {
        const ba = a + (sgn * 50 * Math.PI) / 180;
        segs.push([bx, by, bx + Math.cos(ba) * R * 0.2, by + Math.sin(ba) * R * 0.2]);
      }
    }
  }
  const top = [22, 86, 160];
  const bottom = [8, 30, 70];
  const snow = [238, 246, 255];
  const rgb = new Uint8Array(size * size * 3);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const acc = [0, 0, 0];
      for (let sy = 0; sy < S; sy++) {
        for (let sx = 0; sx < S; sx++) {
          const px = x + (sx + 0.5) / S;
          const py = y + (sy + 0.5) / S;
          const t = py / size;
          let c = top.map((v, i) => v + (bottom[i] - v) * t);
          // snow hill: big ellipse at the bottom
          const hx = (px - size * 0.5) / (size * 0.7);
          const hy = (py - size * 1.17) / (size * 0.43);
          if (hx * hx + hy * hy <= 1) c = snow;
          // snowflake arms
          for (const s of segs) {
            if (distToSegment(px, py, ...s) <= width / 2) {
              c = [255, 255, 255];
              break;
            }
          }
          // golden center
          if (Math.hypot(px - cx, py - cy) <= size * 0.035) c = [255, 207, 63];
          acc[0] += c[0];
          acc[1] += c[1];
          acc[2] += c[2];
        }
      }
      const i = (y * size + x) * 3;
      rgb[i] = Math.round(acc[0] / (S * S));
      rgb[i + 1] = Math.round(acc[1] / (S * S));
      rgb[i + 2] = Math.round(acc[2] / (S * S));
    }
  }
  return encodePNG(size, rgb);
}

// ---- write the files (only when this script is run directly; android-icons.mjs imports drawIcon) ----
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('Drawing the icons (takes about 10-20 seconds)...');
  mkdirSync('public/icons', { recursive: true });
  writeFileSync('public/icons/icon-192.png', drawIcon(192));
  writeFileSync('public/icons/icon-512.png', drawIcon(512));
  writeFileSync('public/icons/icon-maskable-512.png', drawIcon(512, true));
  writeFileSync('public/icons/apple-touch-icon.png', drawIcon(180, true));

  const arms = [];
  for (let k = 0; k < 6; k++) {
    const a = ((60 * k - 90) * Math.PI) / 180;
    arms.push(`<line x1="32" y1="30" x2="${(32 + Math.cos(a) * 20).toFixed(1)}" y2="${(30 + Math.sin(a) * 20).toFixed(1)}"/>`);
  }
  writeFileSync(
    'public/icons/icon.svg',
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#1656a0"/><stop offset="1" stop-color="#081e46"/></linearGradient></defs>' +
      '<rect width="64" height="64" rx="14" fill="url(#g)"/>' +
      '<ellipse cx="32" cy="66" rx="44" ry="16" fill="#eef6ff"/>' +
      `<g stroke="#fff" stroke-width="3" stroke-linecap="round">${arms.join('')}</g>` +
      '<circle cx="32" cy="30" r="3" fill="#ffcf3f"/></svg>',
  );
  console.log('Icons written to public/icons');
}
