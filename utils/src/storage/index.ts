import { isArray, isObject } from '../helpers/raw_type';

/**
 * Retrieves a value from localStorage by key
 * @param key - The key to retrieve from localStorage
 * @param parse - Whether to parse the value as JSON
 * @returns The value from localStorage, optionally parsed as JSON
 */
const get = (key: string, parse = false) => {
  let value = localStorage.getItem(key) as any;
  if (parse) {
    value = JSON.parse(value);
  }
  return value;
};

/**
 * Sets a value in localStorage
 * @param key - The key to set in localStorage
 * @param value - The value to store, objects and arrays will be stringified
 * @returns void
 */
const set = (key: string, value: any) => {
  if (isObject(value) || isArray(value)) {
    value = JSON.stringify(value);
  }
  return localStorage.setItem(key, value);
};

/**
 * Removes an item from localStorage by key
 * @param key - The key to remove from localStorage
 * @returns void
 */
const remove = (key: string) => {
  return localStorage.removeItem(key);
};

/**
 * Clears all data from localStorage
 * @returns void
 */
const clear = () => {
  return localStorage.clear();
};

/**
 * Gets the name of the key at the specified index in localStorage
 * @param index - The index of the key to retrieve
 * @returns The key name at the specified index
 */
const key = (index: number) => {
  return localStorage.key(index);
};

export const locals = {
  clear,
  get,
  key,
  remove,
  set
};
