import tailwindTypography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';

import { brand, slate, success, warning, error, gray } from './colors.mjs';

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
        gray,
        green: success,
        success,
        red: error,
        error,
        yellow: warning,
        warning,
        slate,
        blueGray: slate
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
