import type { Config } from 'tailwindcss';
import type { Config as PostCSSConfig } from 'postcss';

export const postcss: PostCSSConfig;
export const tailwind: Config;

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export const brand: ColorScale;
export const primary: ColorScale;
export const secondary: ColorScale;
export const success: ColorScale;
export const danger: ColorScale;
export const warning: ColorScale;

export const spacing: Record<string | number, string>;
export const fontSize: Record<string, string>;
export const keyframes: Record<string, Record<string, Record<string, string>>>;
