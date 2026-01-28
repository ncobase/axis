// import { readFileSync, existsSync } from 'fs';
// import { resolve } from 'path';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  external: ['react', 'react-dom'],
  minify: true,
  clean: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";'
    };
    options.legalComments = 'none';
    options.jsx = 'automatic';
    options.jsxImportSource = 'react';
  },
  loader: {
    '.css': 'copy'
  }
});
