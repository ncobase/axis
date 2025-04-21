/**
 * Utility type definitions
 */

/**
 * Marks a TODO item, temporarily used instead of 'any'
 * @deprecated Please replace with specific types as soon as possible
 */
export type TODO = unknown;

/**
 * Explicitly declares any type
 * Only use when 'any' is absolutely necessary
 */
export type ExplicitAny = any;

/**
 * Represents a value that can be either synchronous or asynchronous
 */
export type AsyncOrSync<T> = T | Promise<T>;

/**
 * Extracts the return type of a synchronous or asynchronous function
 */
// eslint-disable-next-line no-unused-vars
export type AsyncOrSyncReturn<T extends (...args: any[]) => unknown> = T extends (
  // eslint-disable-next-line no-unused-vars
  ...args: any[]
) => AsyncOrSync<infer R>
  ? R
  : never;

/**
 * Merges two types, overwriting properties of the first type with properties from the second type
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;

/**
 * Represents a plain object type with string keys and unknown values
 */
export type PlainObject = Record<string, unknown>;

/**
 * Represents any object type with string, number, or symbol keys
 */
export type AnyObject = Record<string | number | symbol, unknown>;

/**
 * Represents an array of plain objects
 */
export type ObjectArray = PlainObject[];

/**
 * Ensures a type is non-nullable
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Extracts the value type from a Promise type
 */
export type Awaited<T> = T extends Promise<infer R> ? R : T;

/**
 * Makes all properties in an object structure optional recursively
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * Makes all properties in an object structure required recursively
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * Extracts the query key type from a react-query key factory function
 */
// eslint-disable-next-line no-unused-vars
export type QueryKey<T extends (...args: any[]) => readonly unknown[]> = ReturnType<T>;
