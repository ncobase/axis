export type TBadgeVariant =
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
  | 'outline-cyan';

export type TBadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IBadgeStyling {
  [key: string]: {
    default: string;
    hover: string;
  };
}

enum badgeSizeStyling {
  xs = 'h-1 w-1 rounded-full inline-flex items-center justify-center text-xs [&>svg]:w-1 [&>svg]:h-1 [&>svg]:my-0.5',
  sm = 'h-2 w-2 rounded-full inline-flex items-center justify-center text-xs [&>svg]:w-2 [&>svg]:h-2 [&>svg]:my-0.5',
  md = 'h-3 w-3 rounded-full inline-flex items-center justify-center text-xs [&>svg]:w-3 [&>svg]:h-3 [&>svg]:my-0.5',
  lg = 'h-4 w-4 rounded-full inline-flex items-center justify-center text-sm [&>svg]:w-3 [&>svg]:h-3 [&>svg]:my-0.5',
  xl = 'h-5 w-5 rounded-full inline-flex items-center justify-center text-md [&>svg]:w-4 [&>svg]:h-4 [&>svg]:my-0.5'
}

export const badgeStyling: IBadgeStyling = {
  primary: {
    default: 'bg-primary-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  secondary: {
    default: 'bg-secondary-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  success: {
    default: 'bg-success-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  warning: {
    default: 'bg-warning-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  danger: {
    default: 'bg-danger-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  slate: {
    default: 'bg-slate-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  blue: {
    default: 'bg-blue-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  indigo: {
    default: 'bg-indigo-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  purple: {
    default: 'bg-purple-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  pink: {
    default: 'bg-pink-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  rose: {
    default: 'bg-rose-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  orange: {
    default: 'bg-orange-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  yellow: {
    default: 'bg-yellow-500 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  green: {
    default: 'bg-green-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  teal: {
    default: 'bg-teal-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  cyan: {
    default: 'bg-cyan-600 text-white [&>svg]:stroke-white',
    hover: 'hover:bg-opacity-85 [&>svg]:stroke-white/95'
  },
  'outline-primary': {
    default: 'text-primary-600 border border-primary-600 [&>svg]:stroke-primary-600',
    hover: 'hover:text-primary-600/95 hover:border-opacity-85 [&>svg]:stroke-primary-600/95'
  },
  'outline-secondary': {
    default: 'text-secondary-500 border border-secondary-500 &[>svg]:stroke-secondary-500',
    hover: 'hover:text-secondary-500/95 hover:border-opacity-85 [&>svg]:stroke-secondary-500/95'
  },
  'outline-success': {
    default: 'text-success-500 border border-success-500 [&>svg]:stroke-success-500',
    hover: 'hover:text-success-500/95 hover:border-opacity-85 [&>svg]:stroke-success-500/95'
  },
  'outline-warning': {
    default: 'text-warning-500 border border-warning-500 &[>svg]:stroke-warning-500',
    hover: 'hover:text-warning-500/95 hover:border-opacity-85 [&>svg]:stroke-warning-500/95'
  },
  'outline-danger': {
    default: 'text-danger-500 border border-danger-500 [&>svg]:stroke-danger-500',
    hover: 'hover:text-danger-500/95 hover:border-opacity-85 [&>svg]:stroke-danger-500/95'
  },
  'outline-slate': {
    default: 'text-slate-500 border border-slate-500 [&>svg]:stroke-slate-500',
    hover: 'hover:text-slate-500/95 hover:border-opacity-85 [&>svg]:stroke-slate-500/95'
  },
  'outline-blue': {
    default: 'text-blue-600 border border-blue-600 [&>svg]:stroke-blue-600',
    hover: 'hover:text-blue-600/95 hover:border-opacity-85 [&>svg]:stroke-blue-600/95'
  },
  'outline-indigo': {
    default: 'text-indigo-600 border border-indigo-600 [&>svg]:stroke-indigo-600',
    hover: 'hover:text-indigo-600/95 hover:border-opacity-85 [&>svg]:stroke-indigo-600/95'
  },
  'outline-purple': {
    default: 'text-purple-600 border border-purple-600 [&>svg]:stroke-purple-600',
    hover: 'hover:text-purple-600/95 hover:border-opacity-85 [&>svg]:stroke-purple-600/95'
  },
  'outline-pink': {
    default: 'text-pink-600 border border-pink-600 [&>svg]:stroke-pink-600',
    hover: 'hover:text-pink-600/95 hover:border-opacity-85 [&>svg]:stroke-pink-600/95'
  },
  'outline-rose': {
    default: 'text-rose-600 border border-rose-600 [&>svg]:stroke-rose-600',
    hover: 'hover:text-rose-600/95 hover:border-opacity-85[&>svg]:stroke-rose-600/95'
  },
  'outline-orange': {
    default: 'text-orange-500 border border-orange-500 [&>svg]:stroke-orange-500',
    hover: 'hover:text-orange-500/95 hover:border-opacity-85 [&>svg]:stroke-orange-500/95'
  },
  'outline-yellow': {
    default: 'text-yellow-500 border border-yellow-500 [&>svg]:stroke-yellow-500',
    hover: 'hover:text-yellow-500/95 hover:border-opacity-85 [&>svg]:stroke-yellow-500/95'
  },
  'outline-green': {
    default: 'text-green-600 border border-green-600 [&>svg]:stroke-green-600',
    hover: 'hover:text-green-600/95 hover:border-opacity-85 [&>svg]:stroke-green-600/95'
  },
  'outline-teal': {
    default: 'text-teal-600 border border-teal-600 [&>svg]:stroke-teal-600',
    hover: 'hover:text-teal-600/95 hover:border-opacity-85 [&>svg]:stroke-teal-600/95'
  },
  'outline-cyan': {
    default: 'text-cyan-600 border border-cyan-600 [&>svg]:stroke-cyan-600',
    hover: 'hover:text-cyan-600/95 hover:border-opacity-85 [&>svg]:stroke-cyan-600/95'
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
