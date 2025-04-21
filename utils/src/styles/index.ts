import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names and process with tailwind-merge
 * @param inputs - Class names or array of class names
 * @returns Merged class names as a string
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

/**
 * Merge class names using clsx
 * @param inputs - Class names or array of class names
 * @returns Merged class names as a string
 */
export const cx = clsx;
