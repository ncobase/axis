/**
 * 使用这种类型临时绕过 `any` 而不写 `any`
 * 注释该行以查找它的使用位置
 */
type TODO = any;

/**
 * 使用此类型来使用显式的 `any`
 */
type ExplicitAny = any;

/**
 * 使用此类型将第一种类型的键覆盖为第二种。
 */
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

/**
 * 任意对象类型
 */
type AnyObject = Record<string, unknown> | { [key: string]: unknown };

/**
 * 任意数组类型
 */
type AnyArray = Array<Record<string, unknown> | { [key: string]: unknown }>;

/**
 * 使用此类型标记 react-query QueryKeys
 */
type InferQueryKey<T extends (...args: any) => readonly any[]> = ReturnType<T>;

// /**
//  * 声明 Ethereum
//  */
//
// interface Window {
//   ethereum?: any;
// }
