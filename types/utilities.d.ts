/**
 * 工具类型定义
 */

/**
 * 标记待办项，用于临时替代 any
 * @deprecated 请尽快替换为具体类型
 */
export type TODO = unknown;

/**
 * 显式声明为任意类型
 * 仅在确实需要 any 时使用
 */
export type ExplicitAny = any;

/**
 * 同步或异步值
 */
export type AsyncOrSync<T> = T | Promise<T>;

/**
 * 提取同步或异步函数的返回值类型
 */
export type AsyncOrSyncReturn<T extends (...args: any[]) => unknown> = T extends (
  ...args: any[]
) => AsyncOrSync<infer R>
  ? R
  : never;

/**
 * 合并两个类型，用第二个类型的属性覆盖第一个类型的同名属性
 */
export type Overwrite<T, U> = Omit<T, keyof U> & U;

/**
 * 对象字面量类型
 */
export type PlainObject = Record<string, unknown>;

/**
 * 任意对象类型
 */
export type AnyObject = Record<string | number | symbol, unknown>;

/**
 * 对象数组类型
 */
export type ObjectArray = PlainObject[];

/**
 * 确保类型为非空
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 提取 Promise 类型的值类型
 */
export type Awaited<T> = T extends Promise<infer R> ? R : T;

/**
 * 深度 Partial
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

/**
 * 深度 Required
 */
export type DeepRequired<T> = T extends object
  ? {
      [P in keyof T]-?: DeepRequired<T[P]>;
    }
  : T;

/**
 * 提取 react-query 查询键类型
 */
export type QueryKey<T extends (...args: any[]) => readonly unknown[]> = ReturnType<T>;
