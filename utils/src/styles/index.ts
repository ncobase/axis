import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并类名，并使用 tailwind-merge 处理
 * @param inputs - 类名或类名数组
 * @returns 合并后的类名字符串
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * 合并类名，使用 clsx 处理
 * @param inputs - 类名或类名数组
 * @returns 合并后的类名字符串
 */
export const cx = clsx;
