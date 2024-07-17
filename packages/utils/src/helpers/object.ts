import { removeIllegalSQLChars } from './string';

/**
 * 从原始数据中获取指定路径的字段值
 * @param obj 原始数据
 * @param path 字符串路径由点号分隔嵌套路径或者字符串数组
 * @param defaultValue 当字段值是 null 或 undefined 时，返回默认值。否则返回 null
 * @returns 指定路径的字段值
 */
export function getValueByPath(obj: any, path: string | string[], defaultValue?: any): any {
  const paths = Array.isArray(path) ? path : path.split('.');
  const _isNull = (v: any) => v === null || v === undefined;
  let value = obj;

  for (let i = 0; i < paths.length; i++) {
    if (_isNull(value)) {
      break;
    }
    value = value[paths[i]];
  }

  return _isNull(value) ? (_isNull(defaultValue) ? null : defaultValue) : value;
}
/**
 * 去除值为 null 或 undefined 的字段
 * @param {object} obj 原始数据
 * @returns {object} 去除值为 null 或 undefined 后的数据
 */
export function cleanJsonValues(obj: Record<string, any>): Record<string, any> {
  const cleanedObject: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      if (typeof value === 'string') {
        let cleanedValue = value.trim();
        cleanedValue = removeIllegalSQLChars(cleanedValue);
        if (cleanedValue !== '') {
          cleanedObject[key] = cleanedValue;
        }
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        const nestedCleanedObject = cleanJsonValues(value);
        if (Object.keys(nestedCleanedObject).length > 0) {
          cleanedObject[key] = nestedCleanedObject;
        }
      } else if (Array.isArray(value)) {
        const cleanedArray = value
          .map(item => (typeof item === 'string' ? removeIllegalSQLChars(item.trim()) : item))
          .filter(item => item !== undefined && item !== null && item !== '');
        if (cleanedArray.length > 0) {
          cleanedObject[key] = cleanedArray;
        }
      } else {
        cleanedObject[key] = value;
      }
    }
  }

  return cleanedObject;
}
