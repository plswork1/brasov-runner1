// Draws the launcher icons of the Android app (Capacitor project in ./android) from code, with the
// same drawing as the PWA icons, so the APK does not show the default Capacitor icon.
// Run after `npx cap add android`:   node scripts/android-icons.mjs
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { drawIcon } from './make-icons.mjs';

const RES = 'android/app/src/main/res';
if (!existsSync(RES)) {
  console.error('No Android project found. Run "npm run android:init" first.');
  process.exit(1);
}
// The adaptive-icon XML (API 26+) would override the PNGs with the default Capacitor drawing.
rmSync(`${RES}/mipmap-anydpi-v26`, { recursive: true, force: true });
const SIZES = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
for (const [density, size] of Object.entries(SIZES)) {
  const dir = `${RES}/mipmap-${density}`;
  mkdirSync(dir, { recursive: true });
  const png = drawIcon(size, true);
  for (const name of ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png']) writeFileSync(`${dir}/${name}`, png);
}
console.log('Android launcher icons written.');
