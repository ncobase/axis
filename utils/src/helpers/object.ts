import { removeIllegalSQLChars } from './string';

/**
 * Gets the field value from the original data by specified path
 * @param obj The source object
 * @param path A string path with dot notation for nested paths or an array of strings
 * @param defaultValue Returns this value when the field value is null or undefined. Otherwise returns null
 * @returns The field value at the specified path
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
 * Removes fields with null or undefined values from an object
 * @param {object} obj The source object
 * @returns {object} The cleaned object with null and undefined values removed
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
