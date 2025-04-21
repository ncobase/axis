/**
 * Convert parameters to URL query string
 * @param {object} params Parameters to convert
 * @returns {string} URL query string
 */

import { cleanArray } from '../helpers/array';
import { isObject } from '../helpers/raw_type';
import { removeIllegalSQLChars } from '../helpers/string';

export function buildQueryString(params: Record<string, any>): string {
  if (!isObject(params) || params === null) {
    return '';
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      let trimmedValue = String(value).trim();
      trimmedValue = removeIllegalSQLChars(trimmedValue);
      if (trimmedValue !== '') {
        searchParams.append(key, trimmedValue);
      }
    }
  }

  return searchParams.toString();
}

/**
 * Convert JSON object to URL query string
 * @param {object} json JSON object to convert
 * @returns {string} URL query string
 */
export function param(json: Record<string, any> | null | undefined): string {
  if (!json) {
    return '';
  }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) {
        return '';
      }
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
    })
  ).join('&');
}

/**
 * Convert URL query string to JSON object
 * @param {string} url URL containing query string
 * @returns {object} Parsed JSON object
 */
export function param2Obj(url: string): Record<string, any> {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  );
}

/**
 * Check if current path matches target path up to specified depth
 * @param {string} currentPath Current path to check
 * @param {string} to Target path to match against
 * @param {number} depth Match depth, defaults to 1
 * @returns {boolean} Whether paths match
 */
export const isPathMatching = (currentPath: string, to: string, depth: number = 1): boolean => {
  if (!!to && currentPath === to) {
    return true;
  }
  const currentPathParts = splitPath(currentPath);
  const toPathParts = splitPath(to);
  for (let i = 0; i < depth; i++) {
    if (currentPathParts[i] !== toPathParts[i]) {
      return false;
    }
  }
  return true;
};

/**
 * Split path into array and remove empty strings
 * @param {string} path Path to split
 * @returns {string[]} Array of path segments
 */
export const splitPath = (path: string): string[] => path.split('/').filter(p => p);

/**
 * Join path segments into a single path
 * @param {string[]} pathParts Path segments to join
 * @returns {string} Joined path
 */
export const joinPath = (...pathParts: string[]): string => {
  return pathParts.filter(p => p).join('/');
};

/**
 * Check if path is an external URL
 * @param {string} path Path to check
 * @returns {boolean} Whether path is external
 */
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * Check if path is an internal link
 * @param {string} path Path to check
 * @returns {boolean} Whether path is internal
 */
export const isInLink = (path: string): boolean => {
  return !isExternal(path);
};

/**
 * Check if path is absolute
 * @param {string} path Path to check
 * @returns {boolean} Whether path is absolute
 */
export const isAbsolute = (path: string): boolean => {
  return path.startsWith('/');
};

/**
 * Check if path is relative
 * @param {string} path Path to check
 * @returns {boolean} Whether path is relative
 */
export const isRelative = (path: string): boolean => {
  return !isAbsolute(path);
};

/**
 * Check if path is root path
 * @param {string} path Path to check
 * @returns {boolean} Whether path is root
 */
export const isRoot = (path: string): boolean => {
  return path === '/';
};
