export type TButtonVariant =
  | 'primary'
  | 'outline-primary'
  | 'success'
  | 'outline-success'
  | 'warning'
  | 'outline-warning'
  | 'error'
  | 'outline-error'
  | 'slate'
  | 'outline-slate'
  | 'link'
  | 'unstyle';

export type TButtonSizes = 'sm' | 'md' | 'lg' | 'xl' | 'ratio';

export interface IButtonStyling {
  [key: string]: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}
// px-3 py-1.5 inline-block bg-white border border-slate-100 hover:bg-slate-100 rounded-md text-slate-500 disabled:opacity-55 disabled:pointer-events-none
enum buttonSizeStyling {
  sm = `px-2 py-1 rounded-sm text-xs inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`,
  md = `px-3 py-1.5 rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`,
  lg = `px-4 py-2 rounded-lg inline-flex  items-center gap-1.5 whitespace-nowrap transition-all justify-center`,
  xl = `px-5 py-2.5 rounded-xl inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`,
  ratio = `p-2 rounded-md inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`
}

enum buttonIconStyling {
  sm = 'h-2.5 w-2.5 inline-flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0',
  md = 'h-3.5 w-3.5 inline-flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0',
  lg = 'h-4.5 w-4.5 inline-flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0',
  xl = 'h-5.5 w-5.5 inline-flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0',
  ratio = `w-auto inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center`
}

export const buttonStyling: IButtonStyling = {
  primary: {
    default: `bg-brand-600 text-white`,
    hover: `hover:bg-brand-600/85`,
    pressed: `focus:bg-brand-700/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  success: {
    default: `bg-success-500 text-white`,
    hover: `hover:bg-success-500/85`,
    pressed: `focus:bg-success-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  warning: {
    default: `bg-warning-500 text-white`,
    hover: `hover:bg-warning-500/85`,
    pressed: `focus:bg-warning-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  error: {
    default: `bg-error-500 text-white`,
    hover: `hover:bg-error-500/85`,
    pressed: `focus:bg-error-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  slate: {
    default: `bg-slate-50 text-gray-500`,
    hover: `hover:bg-slate-100/85`,
    pressed: `focus:bg-slate-100/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  unstyle: {
    default: `bg-transparent text-slate-500`,
    hover: `hover:opacity-80`,
    pressed: `focus:opacity-90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  'outline-primary': {
    default: `border border-brand-600 text-brand-600`,
    hover: `hover:border-brand-600/65 hover:text-brand-600/65 hover:bg-brand-50`,
    pressed: `focus:border-brand-700/90 foucs:text-brand-700/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  'outline-success': {
    default: `border border-success-500 text-success-500`,
    hover: `hover:border-success-500/65 hover:text-success-500/65 hover:bg-success-50`,
    pressed: `focus:border-success-600/90 foucs:text-success-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  'outline-warning': {
    default: `border border-warning-500 text-warning-500`,
    hover: `hover:border-warning-500/65 hover:text-warning-500/65 hover:bg-warning-50`,
    pressed: `focus:border-warning-600/90 foucs:text-warning-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  'outline-error': {
    default: `border border-error-500 text-error-500`,
    hover: `hover:border-error-500/65 hover:text-error-500/65 hover:bg-error-50`,
    pressed: `focus:border-error-600/90 foucs:text-error-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  'outline-slate': {
    default: `border border-slate-100 text-slate-500`,
    hover: `hover:border-slate-100/65 hover:text-slate-500/65 hover:bg-slate-50`,
    pressed: `focus:border-slate-200/90 foucs:text-slate-600/90`,
    disabled: `cursor-not-allowed !opacity-75`
  },
  link: {
    default: `text-brand-500`,
    hover: `hover:text-brand-500/65`,
    pressed: `focus:text-brand-600/90 `,
    disabled: `cursor-not-allowed !text-brand-400`
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
