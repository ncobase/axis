import { isSameValue, verifyArray, verifyObject } from './validator';

/**
 * Generates an array of random numbers.
 * @param length The length of the array.
 * @param maxNumber The maximum value for random numbers. Defaults to 2000 if not specified or invalid.
 * @returns Array of random numbers
 */
export const mathArr = (length: number, maxNumber?: number | string): number[] => {
  const arr: number[] = [];
  const max: number =
    maxNumber && !Number.isNaN(parseFloat(maxNumber as string))
      ? parseFloat(maxNumber as string)
      : 2000;

  for (let i = 0; i < length; i++) {
    const r: number = Math.random() * (max - 1) + 1;
    arr.push(parseFloat(r.toFixed(2)));
  }

  return arr;
};

/**
 * Removes null or undefined elements from an array
 * @param actual The input array
 * @returns A new array with null or undefined elements removed
 */
export function cleanArray<T>(actual: Array<T | null | undefined>): T[] {
  const newArray: T[] = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== null && actual[i] !== undefined) {
      newArray.push(actual[i] as T);
    }
  }
  return newArray;
}

/**
 * Compares two arrays and returns elements that exist only in the left array
 * @param left The left array to compare
 * @param right The right array to compare against
 * @param opts Additional options
 * @param opts.lk Key to use for comparison from left array elements
 * @param opts.rk Key to use for comparison from right array elements
 * @returns Array of elements that exist only in the left array
 */
export function onlyInLeft<T, U>(left: T[], right: U[], opts: { lk?: keyof T; rk?: keyof U }): T[] {
  left = verifyArray(left);
  right = verifyArray(right);
  opts = verifyObject(opts);

  return left.filter(o => {
    return !right.some(t => {
      const lv = opts.lk ? o[opts.lk] : (o as unknown as { id: any }).id;
      const rv = opts.rk ? t[opts.rk] : (t as unknown as { id: any }).id;
      return isSameValue(lv, rv);
    });
  });
}
