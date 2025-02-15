import tailwindTypography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';

import { brand, danger, primary, secondary, success, warning } from './colors.mjs';
import { spacing } from './spacing.mjs';
import { fontSize } from './typography.mjs';
import { keyframes } from './animations.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}'
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem'
      },
      colors: {
        brand,
        primary,
        secondary,
        success,
        danger,
        warning
      },
      screens: {
        '3xl': '112rem'
      },
      fontSize,
      padding: spacing,
      margin: spacing,
      space: spacing,
      gap: spacing,
      keyframes
    }
  },
  plugins: [tailwindAnimate, tailwindTypography]
};
