import tailwindTypography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';

import { keyframes } from './animations.mjs';
import { brand, danger, primary, secondary, success, warning } from './colors.mjs';
import { spacing } from './spacing.mjs';
import { fontSize } from './typography.mjs';
import { isTailwindV4 } from './utils.mjs';

/**
 * Generate appropriate config for the detected Tailwind version
 */
function generateConfig() {
  // Base configuration shared between v3 and v4
  const baseConfig = {
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
    }
  };

  // Check for Tailwind v4
  const isV4 = isTailwindV4();

  if (isV4) {
    // V4-specific configuration
    return {
      ...baseConfig,
      theme: {
        ...baseConfig.theme,
        extend: {
          ...baseConfig.theme.extend,
          // V4 specific additions
          aria: {
            checked: 'checked',
            disabled: 'disabled',
            expanded: 'expanded',
            hidden: 'hidden',
            pressed: 'pressed',
            readonly: 'readonly',
            required: 'required',
            selected: 'selected'
          }
        }
      },
      // V4 uses a different plugins format
      plugins: [{ name: 'typography' }, { name: 'animate' }]
    };
  } else {
    // V3 configuration
    return {
      ...baseConfig,
      plugins: [tailwindTypography, tailwindAnimate]
    };
  }
}

/** @type {import('tailwindcss').Config} */
export default generateConfig();
