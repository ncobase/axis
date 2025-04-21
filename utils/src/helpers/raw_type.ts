// noinspection JSUnusedGlobalSymbols

const _rawType = (o: unknown): string => Object.prototype.toString.call(o).slice(8, -1);

/**
 * Checks if a value is undefined.
 * @param un The value to check.
 * @returns Returns true if the value is undefined, false otherwise.
 */
export const isUndefined = (un: unknown): boolean => _rawType(un) === 'Undefined';

/**
 * Checks if a value is a number.
 * @param num The value to check.
 * @returns Returns true if the value is a number, false otherwise.
 */
export const isNumber = (num: unknown): boolean => _rawType(num) === 'Number';

/**
 * Checks if a value is a string.
 * @param str The value to check.
 * @returns Returns true if the value is a string, false otherwise.
 */
export const isString = (str: unknown): boolean => _rawType(str) === 'String';

/**
 * Checks if a value is a plain object.
 * @param obj The value to check.
 * @returns Returns true if the value is a plain object, false otherwise.
 */
export const isObject = (obj: unknown): boolean => _rawType(obj) === 'Object';

/**
 * Checks if a value is an array.
 * @param arr The value to check.
 * @returns Returns true if the value is an array, false otherwise.
 */
export const isArray = <T>(arr: unknown): arr is T[] => Array.isArray(arr);

/**
 * Checks if a value is a function.
 * @param fn The value to check.
 * @returns Returns true if the value is a function, false otherwise.
 */
export const isFunction = (fn: unknown): boolean => _rawType(fn) === 'Function';

/**
 * Checks if a value is a boolean.
 * @param bool The value to check.
 * @returns Returns true if the value is a boolean, false otherwise.
 */
export const isBoolean = (bool: unknown): boolean => _rawType(bool) === 'Boolean';

/**
 * Checks if a value is null.
 * @param n The value to check.
 * @returns Returns true if the value is null, false otherwise.
 */
export const isNull = (n: unknown): boolean => _rawType(n) === 'Null';
