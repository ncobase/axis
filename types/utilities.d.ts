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
 * 这主要用于扩展多个组件的自定义道具类型
 * 使用 `as` props。
 */
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

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
