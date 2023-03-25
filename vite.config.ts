import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
// import { VitePWA } from 'vite-plugin-pwa';

import pkg from './package.json';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// VitePWA({
//   injectRegister: 'auto',
//   manifest: {
//     name: 'Stone CMS',
//     short_name: 'Stone CMS',
//     icons: [
//       { src: 'paw-192x192.png', sizes: '192x192', type: 'image/png' },
//       { src: 'paw-512x512.png', sizes: '512x512', type: 'image/png' },
//     ],
//   },
//   workbox: {
//     runtimeCaching: [],
//   },
// })

const config = defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true
    }),
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
});

// noinspection JSUnusedGlobalSymbols
export default ({ mode }: { mode: string }): typeof config => {
  const root = process.cwd();
  const { VITE_PORT, VITE_API_URL } = loadEnv(mode, root);

  return {
    ...config,
    define: {
      _APP_VERSION: JSON.stringify(pkg.version),
      'process.env': {}
    },
    server: {
      port: +VITE_PORT || 3200,
      proxy: {
        '/api': {
          target: VITE_API_URL || 'http://localhost:3200',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
};
