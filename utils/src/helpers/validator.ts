import { isArray, isNumber, isObject } from './raw_type';

/**
 * Validates if a value is a number or initializes it to 0
 * @param val The value to validate or initialize
 * @returns The number value if valid, or 0 if invalid/NaN
 */
export const verifyNumber = (val: unknown): number => {
  val = !isNumber(val) ? Number(val) : val || 0;
  if (Number.isNaN(val)) val = 0;
  return Number(val);
};

/**
 * Compares if two values are strictly equal
 * @param a First value to compare
 * @param b Second value to compare
 * @returns {boolean} True if values are strictly equal, false otherwise
 */
export function isSameValue<T>(a: T, b: T): boolean {
  return a === b;
}

/**
 * Validates if a value is an array or initializes it to empty array
 * @param arr The array to validate or initialize
 * @returns The original array if valid, or an empty array [] if invalid
 */
export const verifyArray = <T>(arr: unknown): T[] => (isArray<T>(arr) ? arr : []);

/**
 * Validates if a value is an object or initializes it to empty object
 * @param obj The object to validate or initialize
 * @returns The original object if valid, or an empty object {} if invalid
 */
export const verifyObject = <T extends object>(obj: unknown): T =>
  isObject(obj) ? (obj as T) : ({} as T);
