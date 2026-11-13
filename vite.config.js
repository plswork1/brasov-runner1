import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// The version shown in the menu comes from package.json (BUILD_TAG adds a suffix; the service
// worker update test uses it to make a second, different build).
const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const version = pkg.version + (process.env.BUILD_TAG ? `+${process.env.BUILD_TAG}` : '');

// Relative base so the build works from any folder or sub-path (GitHub Pages, Netlify, file server...).
//
// Two targets:
//   npm run build            -> the web app / PWA in dist/ (service worker, offline, installable)
//   npm run build:capacitor  -> the same files for the Android APK (Capacitor, `--mode capacitor`).
//                               The service worker is switched off there: the files already live
//                               inside the app.
export default defineConfig(({ mode }) => {
  const capacitor = mode === 'capacitor';
  return {
  base: './',
  define: { __APP_VERSION__: JSON.stringify(version) },
  plugins: [
    VitePWA({
      disable: capacitor,
      // 'prompt': a new version is downloaded in the background and only activated when the player
      // accepts it on a menu (or on the next start), never in the middle of a run. See src/pwa.js.
      registerType: 'prompt',
      injectRegister: false,
      includeAssets: ['icons/icon.svg', 'icons/apple-touch-icon.png'],
      manifest: {
        name: 'Brașov Runner',
        short_name: 'Brașov Runner',
        description: 'Fugi de urs prin Brașov! Endless runner prin Poiana Brașov, Strada Republicii, Tractorul, AFI Brașov și Lacul Noua.',
        lang: 'ro',
        categories: ['games'],
        theme_color: '#0b2447',
        background_color: '#0b2447',
        display: 'fullscreen',
        display_override: ['fullscreen', 'standalone'],
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache everything so the game works fully offline after the first load.
        globPatterns: ['**/*.{js,css,html,png,svg,webmanifest,ico}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    chunkSizeWarningLimit: 1200,
  },
  };
});
