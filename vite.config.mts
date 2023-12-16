import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import pkg from './package.json';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const setupPlugins = ({ VITE_PWA, VITE_APP_NAME }: ImportMetaEnv) => ([
  react(),
  VITE_PWA === 'true' && VitePWA({
    injectRegister: 'auto',
    manifest: {
      name: VITE_APP_NAME,
      short_name: VITE_APP_NAME,
      icons: [
        { src: 'paw-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: 'paw-512x512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    workbox: {
      runtimeCaching: []
    }
  })
]);

// noinspection JSUnusedGlobalSymbols
export default defineConfig(({ mode }: { mode: string }) => {
  const root = pathResolve('.');
  const ENV = loadEnv(mode, root) as unknown as ImportMetaEnv;
  return {
    define: {
      _APP_VERSION: JSON.stringify(pkg.version),
      'process.env': {}
    },
    plugins: setupPlugins(ENV),
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: `${root}/src/`
        },
        {
          find: /\/@\//,
          replacement: `${root}/src/`
        },
        // /#/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: `${root}/types/`
        },
        {
          find: /\/#\//,
          replacement: `${root}/types/`
        }
      ]
    },
    server: {
      port: +ENV.VITE_PORT || 3200,
      proxy: {
        '/api': {
          target: ENV.VITE_API_URL || 'http://localhost:3200',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
