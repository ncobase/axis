/**
 * Utility functions for Tailwind version compatibility
 */

/**
 * Check if Tailwind version is v4
 * @returns {boolean}
 */
export function isTailwindV4() {
  try {
    // Dynamic import for ESM compatibility
    const path = require.resolve('tailwindcss/package.json');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const pkg = require(path);
    return pkg.version && pkg.version.startsWith('4');
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  } catch (e) {
    try {
      // Alternative approach for ESM environments
      const moduleUrl = new URL('tailwindcss/package.json', import.meta.url);
      // eslint-disable-next-line no-undef
      const pkgText = fs.readFileSync(moduleUrl, 'utf8');
      const pkg = JSON.parse(pkgText);
      return pkg.version && pkg.version.startsWith('4');
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (err) {
      // Default to false if we can't detect
      return false;
    }
  }
}
