export type TBadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'slate'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-warning'
  | 'outline-danger'
  | 'outline-slate';

export type TBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IBadgeStyling {
  [key: string]: {
    default: string;
    hover: string;
  };
}

enum badgeSizeStyling {
  xs = 'h-1 w-1 rounded-full inline-flex items-center justify-center text-xs',
  sm = 'h-2 w-2 rounded-full inline-flex items-center justify-center text-xs',
  md = 'h-3 w-3 rounded-full inline-flex items-center justify-center text-xs',
  lg = 'h-4 w-4 rounded-full inline-flex items-center justify-center text-xs',
  xl = 'h-5 w-5 rounded-full inline-flex items-center justify-center text-xs'
}

export const badgeStyling: IBadgeStyling = {
  primary: {
    default: 'bg-brand-400 text-white',
    hover: 'hover:bg-brand-500'
  },
  secondary: {
    default: 'bg-secondary-400 text-white',
    hover: 'hover:bg-secondary-500'
  },
  success: {
    default: 'bg-success-400 text-white',
    hover: 'hover:bg-success-500'
  },
  warning: {
    default: 'bg-warning-400 text-white',
    hover: 'hover:bg-warning-500'
  },
  danger: {
    default: 'bg-danger-400 text-white',
    hover: 'hover:bg-danger-500'
  },
  slate: {
    default: 'bg-slate-400 text-white',
    hover: 'hover:bg-slate-500'
  },
  'outline-primary': {
    default: 'text-brand-400 border border-brand-400',
    hover: 'hover:text-brand-500 hover:border-brand-500'
  },
  'outline-secondary': {
    default: 'text-secondary-400 border border-secondary-400',
    hover: 'hover:text-secondary-500 hover:border-secondary-500'
  },
  'outline-success': {
    default: 'text-success-400 border border-success-400',
    hover: 'hover:text-success-500 hover:border-success-500'
  },
  'outline-warning': {
    default: 'text-warning-400 border border-warning-400',
    hover: 'hover:text-warning-500 hover:border-warning-500'
  },
  'outline-danger': {
    default: 'text-danger-400 border border-danger-400',
    hover: 'hover:text-danger-500 hover:border-danger-500'
  },
  'outline-slate': {
    default: 'text-slate-400 border border-slate-400',
    hover: 'hover:text-slate-500 hover:border-slate-500'
  }
};

export const getBadgeStyle = (variant: TBadgeVariant, size: TBadgeSize) => {
  let _variant: string = ``;
  const currentVariant = badgeStyling[variant];

  _variant = `${currentVariant.default} ${currentVariant.hover}`;

  let _size: string = ``;
  if (size) _size = badgeSizeStyling[size];
  return `${_variant} ${_size}`;
};
