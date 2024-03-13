/**
 * 获取字符串缩写
 * @param name
 */
export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map(v => v && v[0].toUpperCase())
    .join('') as string;

export const upperFirst = (str: string) => str.charAt(0).toLocaleUpperCase() + str.slice(1);

/**
 * 随机生成 ID
 * @returns {string} 随机生成的 ID.
 */
export function randomId(): string {
  return Math.random().toString(36).slice(2, 8);
}

/**
 * 计算一个字符串的字节长度
 * @param val 输入的字符串
 * @returns 字节长度
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
