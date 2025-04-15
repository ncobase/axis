import { isTailwindV4 } from './utils.mjs';

/**
 * Generate appropriate PostCSS config for the detected Tailwind version
 */
function generatePostCSSConfig() {
  // Check for Tailwind v4
  const isV4 = isTailwindV4();

  if (isV4) {
    // V4 uses the @tailwindcss/postcss package instead
    return {
      plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        '@tailwindcss/postcss': {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
      }
    };
  } else {
    // V3 configuration
    return {
      plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        tailwindcss: {},
        autoprefixer: {},
        ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
      }
    };
  }
}

export default generatePostCSSConfig();
