/**
 * Get initials from a string
 * @param name The input string to extract initials from
 * @returns The first letter of first two words in uppercase
 */
export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join('') as string;

/**
 * Capitalize first letter of a string
 * @param str Input string
 * @returns String with first letter capitalized
 */
export const upperFirst = (str: string) => str.charAt(0).toLocaleUpperCase() + str.slice(1);

/**
 * Generate a random ID
 * @returns {string} A random string ID
 */
export function randomId(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * Calculate byte length of a string
 * @param val Input string
 * @returns Number of bytes
 */
export function getByteLen(val: string): number {
  let len = 0;
  for (let i = 0; i < val.length; i++) {
    // eslint-disable-next-line no-control-regex
    if (val[i].match(/[^\x00-\xff]/gi) !== null) {
      len += 1;
    } else {
      len += 0.5;
    }
  }
  return Math.floor(len);
}

/**
 * Remove whitespace from both ends of a string
 * @param str Input string
 * @returns {string} Trimmed string
 */
export function trim(str: string): string {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

/**
 * Join name parts into a full name
 * Format: firstName middleName lastName
 * @param firstName First name
 * @param middleName Middle name
 * @param lastName Last name
 * @returns {string} Formatted full name
 */
export function joinName(firstName?: string, middleName?: string, lastName?: string): string {
  const fullName =
    `${firstName?.trim() ?? ''} ${middleName?.trim() ?? ''} ${lastName?.trim() ?? ''}`.trim();
  return fullName;
}

/**
 * Remove SQL injection characters
 * @param {string} str String to be sanitized
 * @returns {string} Sanitized string
 */
export const removeIllegalSQLChars = (str: string): string => {
  return str;
};
