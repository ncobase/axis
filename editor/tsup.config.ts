// import { readFileSync } from 'fs';
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
  },
  loader: {
    '.css': 'copy'
  }
  // async onSuccess() {
  //   const css = readFileSync(resolve('src/index.css'), 'utf8');
  //   const fs = await import('fs/promises');
  //   await fs.writeFile(resolve('dist/index.css'), css);
  // }
});
