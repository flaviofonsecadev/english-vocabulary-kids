import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [react(), VitePWA({
    strategies: 'injectManifest', srcDir: 'src', filename: 'sw.ts',
    registerType: 'prompt', injectRegister: false,
    includeAssets: ['favicon.svg', 'icons/*.png'],
    injectManifest: { globPatterns: ['**/*.{js,css,html,woff2}', 'icons/*.png', 'favicon.svg'], maximumFileSizeToCacheInBytes: 3_000_000 },
    manifest: {
      id: '/', name: 'English Games • Vocabulary', short_name: 'English Games',
      description: 'Um mundo de palavras para descobrir. Aprenda inglês brincando, também offline.',
      lang: 'pt-BR', start_url: '/', scope: '/', display: 'standalone',
      theme_color: '#5462d6', background_color: '#f8f9fe',
      icons: [
        { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
  })],
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
