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
  // async onSuccess() {
  //   const fs = await import('fs/promises');

  //   // Copy CSS files to dist
  //   const cssFiles = [
  //     { src: 'src/styles/styles.css', dest: 'dist/styles.css' },
  //     { src: 'src/styles/variables.css', dest: 'dist/variables.css' }
  //   ];

  //   for (const { src, dest } of cssFiles) {
  //     const srcPath = resolve(src);
  //     const destPath = resolve(dest);

  //     if (existsSync(srcPath)) {
  //       const content = readFileSync(srcPath, 'utf8');
  //       await fs.writeFile(destPath, content);
  //       console.log(`✓ Copied ${src} → ${dest}`);
  //     }
  //   }
  // }
});
