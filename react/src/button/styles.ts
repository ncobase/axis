export type TButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'slate'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'rose'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-danger'
  | 'outline-slate'
  | 'outline-blue'
  | 'outline-indigo'
  | 'outline-purple'
  | 'outline-pink'
  | 'outline-rose'
  | 'outline-orange'
  | 'outline-yellow'
  | 'outline-green'
  | 'outline-teal'
  | 'outline-cyan'
  | 'link'
  | 'unstyle';

export type TButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'ratio';

export interface IButtonStyling {
  [key: string]: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

enum buttonSizeStyling {
  xs = `px-1.5 py-0.5 rounded-xs text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`,
  sm = `px-2 py-1 rounded-xs text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`,
  md = `px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`,
  lg = `px-4 py-2 rounded-md inline-flex  items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`,
  xl = `px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`,
  ratio = `px-2 py-1.5 rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center outline-hidden`
}

enum buttonIconStyling {
  xs = 'h-1.5 w-1.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
  sm = 'h-2.5 w-2.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
  md = 'h-3.5 w-3.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
  lg = 'h-4.5 w-4.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
  xl = 'h-5.5 w-5.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
  ratio = `inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`
}

export const buttonStyling: IButtonStyling = {
  primary: {
    default: `bg-primary-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-primary-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-primary-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-primary': {
    default: `border border-primary-600 text-primary-600 [&>svg]:stroke-primary-600`,
    hover: `hover:border-primary-600/65 hover:bg-primary-50 hover:[&>svg]:stroke-primary-600/65`,
    pressed: `focus:border-primary-700/90 foucs:text-primary-700/90 hover:[&>svg]:stroke-primary-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  secondary: {
    default: `bg-secondary-100/45 text-secondary-400`,
    hover: `hover:bg-secondary-100/85 hover:text-secondary-500 hover:[&>svg]:stroke-secondary-400`,
    pressed: `focus:bg-secondary-100/90 hover:[&>svg]:stroke-secondary-400`,
    disabled: `cursor-not-allowed opacity-75! [&>svg]:stroke-secondary-400/65`
  },
  'outline-secondary': {
    default: `border border-secondary-200/65 text-secondary-500/65 [&>svg]:stroke-secondary-400/65`,
    hover: `hover:border-secondary-100/65 hover:text-secondary-500 hover:bg-secondary-50 hover:[&>svg]:stroke-secondary-400`,
    pressed: `focus:border-secondary-200/90 foucs:text-secondary-600/90 hover:[&>svg]:stroke-secondary-400`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  success: {
    default: `bg-success-500 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-success-500/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-success-600/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-success': {
    default: `border border-success-500 text-success-500 [&>svg]:stroke-success-500`,
    hover: `hover:border-success-500/65 hover:bg-success-50 hover:[&>svg]:stroke-success-500/65`,
    pressed: `focus:border-success-600/90 foucs:text-success-600/90 hover:[&>svg]:stroke-success-600/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  warning: {
    default: `bg-warning-500 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-warning-500/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-warning-600/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-warning': {
    default: `border border-warning-500 text-warning-500 [&>svg]:stroke-warning-500`,
    hover: `hover:border-warning-500/65 hover:bg-warning-50 hover:[&>svg]:stroke-warning-500/65`,
    pressed: `focus:border-warning-600/90 foucs:text-warning-600/90 hover:[&>svg]:stroke-warning-600/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  danger: {
    default: `bg-danger-500 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-danger-500/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-danger-600/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-danger': {
    default: `border border-danger-500 text-danger-500 [&>svg]:stroke-danger-500`,
    hover: `hover:border-danger-500/65 hover:bg-danger-50 hover:[&>svg]:stroke-danger-500/65`,
    pressed: `focus:border-danger-600/90 foucs:text-danger-600/90 hover:[&>svg]:stroke-danger-600/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  slate: {
    default: `bg-slate-100/45 text-slate-400`,
    hover: `hover:bg-slate-100/85 hover:text-slate-500 hover:[&>svg]:stroke-slate-400`,
    pressed: `focus:bg-slate-100/90 hover:[&>svg]:stroke-slate-400`,
    disabled: `cursor-not-allowed opacity-75! [&>svg]:stroke-slate-400/65`
  },
  'outline-slate': {
    default: `border border-slate-200/65 text-slate-500/65 [&>svg]:stroke-slate-400/65`,
    hover: `hover:border-slate-100/65 hover:text-slate-500 hover:bg-slate-50 hover:[&>svg]:stroke-slate-400`,
    pressed: `focus:border-slate-200/90 foucs:text-slate-600/90 hover:[&>svg]:stroke-slate-400`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  blue: {
    default: `bg-blue-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-blue-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-blue-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-blue': {
    default: `border border-blue-600 text-blue-600 [&>svg]:stroke-blue-600`,
    hover: `hover:border-blue-600/65 hover:bg-blue-50 hover:[&>svg]:stroke-blue-600/65`,
    pressed: `focus:border-blue-700/90 focus:text-blue-700/90 hover:[&>svg]:stroke-blue-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  indigo: {
    default: `bg-indigo-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-indigo-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-indigo-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-indigo': {
    default: `border border-indigo-600 text-indigo-600 [&>svg]:stroke-indigo-600`,
    hover: `hover:border-indigo-600/65 hover:bg-indigo-50 hover:[&>svg]:stroke-indigo-600/65`,
    pressed: `focus:border-indigo-700/90 focus:text-indigo-700/90 hover:[&>svg]:stroke-indigo-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  purple: {
    default: `bg-purple-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-purple-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-purple-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-purple': {
    default: `border border-purple-600 text-purple-600 [&>svg]:stroke-purple-600`,
    hover: `hover:border-purple-600/65 hover:bg-purple-50 hover:[&>svg]:stroke-purple-600/65`,
    pressed: `focus:border-purple-700/90 focus:text-purple-700/90 hover:[&>svg]:stroke-purple-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  pink: {
    default: `bg-pink-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-pink-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-pink-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-pink': {
    default: `border border-pink-600 text-pink-600 [&>svg]:stroke-pink-600`,
    hover: `hover:border-pink-600/65 hover:bg-pink-50 hover:[&>svg]:stroke-pink-600/65`,
    pressed: `focus:border-pink-700/90 focus:text-pink-700/90 hover:[&>svg]:stroke-pink-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  rose: {
    default: `bg-rose-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-rose-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-rose-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-rose': {
    default: `border border-rose-600 text-rose-600 [&>svg]:stroke-rose-600`,
    hover: `hover:border-rose-600/65 hover:bg-rose-50 hover:[&>svg]:stroke-rose-600/65`,
    pressed: `focus:border-rose-700/90 focus:text-rose-700/90 hover:[&>svg]:stroke-rose-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  orange: {
    default: `bg-orange-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-orange-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-orange-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-orange': {
    default: `border border-orange-600 text-orange-600 [&>svg]:stroke-orange-600`,
    hover: `hover:border-orange-600/65 hover:bg-orange-50 hover:[&>svg]:stroke-orange-600/65`,
    pressed: `focus:border-orange-700/90 focus:text-orange-700/90 hover:[&>svg]:stroke-orange-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  yellow: {
    default: `bg-yellow-500 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-yellow-500/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-yellow-600/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-yellow': {
    default: `border border-yellow-500 text-yellow-600 [&>svg]:stroke-yellow-600`,
    hover: `hover:border-yellow-500/65 hover:bg-yellow-50 hover:[&>svg]:stroke-yellow-600/65`,
    pressed: `focus:border-yellow-600/90 focus:text-yellow-700/90 hover:[&>svg]:stroke-yellow-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  green: {
    default: `bg-green-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-green-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-green-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-green': {
    default: `border border-green-600 text-green-600 [&>svg]:stroke-green-600`,
    hover: `hover:border-green-600/65 hover:bg-green-50 hover:[&>svg]:stroke-green-600/65`,
    pressed: `focus:border-green-700/90 focus:text-green-700/90 hover:[&>svg]:stroke-green-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  teal: {
    default: `bg-teal-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-teal-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-teal-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-teal': {
    default: `border border-teal-600 text-teal-600 [&>svg]:stroke-teal-600`,
    hover: `hover:border-teal-600/65 hover:bg-teal-50 hover:[&>svg]:stroke-teal-600/65`,
    pressed: `focus:border-teal-700/90 focus:text-teal-700/90 hover:[&>svg]:stroke-teal-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  cyan: {
    default: `bg-cyan-600 text-white [&>svg]:stroke-white`,
    hover: `hover:bg-cyan-600/85 hover:[&>svg]:stroke-white/85`,
    pressed: `focus:bg-cyan-700/90 hover:[&>svg]:stroke-white/85`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  'outline-cyan': {
    default: `border border-cyan-600 text-cyan-600 [&>svg]:stroke-cyan-600`,
    hover: `hover:border-cyan-600/65 hover:bg-cyan-50 hover:[&>svg]:stroke-cyan-600/65`,
    pressed: `focus:border-cyan-700/90 focus:text-cyan-700/90 hover:[&>svg]:stroke-cyan-700/90`,
    disabled: `cursor-not-allowed opacity-75!`
  },
  link: {
    default: `text-primary-500 hover:text-primary-600 [&>svg]:stroke-primary-500 [&>svg]:hover:text-primary-500/65`,
    hover: `hover:text-primary-500/95`,
    pressed: `focus:text-primary-600/90`,
    disabled: `cursor-not-allowed text-primary-400! opacity-75!`
  },
  unstyle: {
    default: `bg-transparent text-slate-500 [&>svg]:stroke-slate-400/65 [&>svg]:hover:stroke-slate-400 [&>svg]:focus:stroke-slate-400`,
    hover: `hover:opacity-80 [&>svg]:stroke-slate-400`,
    pressed: `focus:opacity-90 [&>svg]:stroke-slate-400`,
    disabled: `cursor-not-allowed opacity-75! [&>svg]:stroke-slate-400/65`
  }
};

export const getButtonStyling = (
  variant: TButtonVariant,
  size: TButtonSizes,
  disabled: boolean = false
): string => {
  let _variant: string = ``;
  const currentVariant = buttonStyling[variant];

  _variant = `${currentVariant.default} ${disabled ? currentVariant.disabled : currentVariant.hover} ${
    currentVariant.pressed
  }`;

  let _size: string = ``;
  if (size) _size = buttonSizeStyling[size];
  return `${_variant} ${_size}`;
};

export const getIconStyling = (size: TButtonSizes): string => {
  let icon: string = ``;
  if (size) icon = buttonIconStyling[size];
  return icon;
};
