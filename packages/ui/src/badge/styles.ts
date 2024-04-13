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
    default: 'bg-primary-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  secondary: {
    default: 'bg-secondary-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  success: {
    default: 'bg-success-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  warning: {
    default: 'bg-warning-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  danger: {
    default: 'bg-danger-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  slate: {
    default: 'bg-slate-500 text-white',
    hover: 'hover:bg-opacity-85'
  },
  'outline-primary': {
    default: 'text-primary-500 border border-primary-500',
    hover: 'hover:text-primary-500/95 hover:border-opacity-85'
  },
  'outline-secondary': {
    default: 'text-secondary-500 border border-secondary-500',
    hover: 'hover:text-secondary-500/95 hover:border-opacity-85'
  },
  'outline-success': {
    default: 'text-success-500 border border-success-500',
    hover: 'hover:text-success-500/95 hover:border-opacity-85'
  },
  'outline-warning': {
    default: 'text-warning-500 border border-warning-500',
    hover: 'hover:text-warning-500/95 hover:border-opacity-85'
  },
  'outline-danger': {
    default: 'text-danger-500 border border-danger-500',
    hover: 'hover:text-danger-500/95 hover:border-opacity-85'
  },
  'outline-slate': {
    default: 'text-slate-500 border border-slate-500',
    hover: 'hover:text-slate-500/95 hover:border-opacity-85'
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
