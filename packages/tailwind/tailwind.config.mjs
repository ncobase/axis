import tailwindTypography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';

import { brand, slate, success, warning, error } from './colors.mjs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, jsx,ts,tsx}', '../**/src/**/*.{js, jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {
      colors: {
        blue: brand,
        brand,
        green: success,
        success,
        red: error,
        error,
        yellow: warning,
        warning,
        slate,
        blueGray: slate
      },
      fontSize: {
        base: ['0.75rem', { lineHeight: '1rem' }]
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      lineHeight: {
        12: '3rem'
      }
    }
  },
  plugins: [tailwindAnimate, tailwindTypography],
  ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
};
