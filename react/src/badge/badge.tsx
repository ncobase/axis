import * as React from 'react';

import { cn } from '@ncobase/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white [&>svg]:stroke-white hover:bg-primary-600/85 [&>svg]:stroke-white/95',
        secondary:
          'bg-secondary-500 text-white [&>svg]:stroke-white hover:bg-secondary-500/85 [&>svg]:stroke-white/95',
        success:
          'bg-success-500 text-white [&>svg]:stroke-white hover:bg-success-500/85 [&>svg]:stroke-white/95',
        warning:
          'bg-warning-500 text-white [&>svg]:stroke-white hover:bg--warning-500/85 [&>svg]:stroke-white/95',
        danger:
          'bg-danger-500 text-white [&>svg]:stroke-white hover:bg-danger-500/85 [&>svg]:stroke-white/95',
        slate:
          'bg-slate-500 text-white [&>svg]:stroke-white hover:bg-slate-500/85 [&>svg]:stroke-white/95',
        blue: 'bg-blue-600 text-white [&>svg]:stroke-white hover:bg-blue-500/85 [&>svg]:stroke-white/95',
        indigo:
          'bg-indigo-600 text-white [&>svg]:stroke-white hover:bg-indigo-600/85 [&>svg]:stroke-white/95',
        purple:
          'bg-purple-600 text-white [&>svg]:stroke-white hover:bg-purple-600/85 [&>svg]:stroke-white/95',
        pink: 'bg-pink-600 text-white [&>svg]:stroke-white hover:bg-pink-600/85 [&>svg]:stroke-white/95',
        rose: 'bg-rose-600 text-white [&>svg]:stroke-white hover:bg-rose-600/85 [&>svg]:stroke-white/95',
        orange:
          'bg-orange-500 text-white [&>svg]:stroke-white hover:bg-orange-500/85 [&>svg]:stroke-white/95',
        yellow:
          'bg-yellow-500 text-white [&>svg]:stroke-white hover:bg-yellow-500/85 [&>svg]:stroke-white/95',
        green:
          'bg-green-600 text-white [&>svg]:stroke-white hover:bg-green-600/85 [&>svg]:stroke-white/95',
        teal: 'bg-teal-600 text-white [&>svg]:stroke-white hover:bg-teal-600/85 [&>svg]:stroke-white/95',
        cyan: 'bg-cyan-600 text-white [&>svg]:stroke-white hover:bg-cyan-600/85 [&>svg]:stroke-white/95',
        'outline-primary':
          'text-primary-600 border border-primary-600 [&>svg]:stroke-primary-600 hover:text-primary-600/95 hover:border-primary-600/85 [&>svg]:stroke-primary-600/95',
        'outline-secondary':
          'text-secondary-500 border border-secondary-500 [&>svg]:stroke-secondary-500 hover:text-secondary-500/95 hover:border-secondary-500/85 [&>svg]:stroke-secondary-500/95',
        'outline-success':
          'text-success-500 border border-success-500 [&>svg]:stroke-success-500 hover:text-success-500/95 hover:border-success-500/85 [&>svg]:stroke-success-500/95',
        'outline-warning':
          'text-warning-500 border border-warning-500 [&>svg]:stroke-warning-500 hover:text-warning-500/95 hover:border-warning-500/85 [&>svg]:stroke-warning-500/95',
        'outline-danger':
          'text-danger-500 border border-danger-500 [&>svg]:stroke-danger-500 hover:text-danger-500/95 hover:border-danger-500/85 [&>svg]:stroke-danger-500/95',
        'outline-slate':
          'text-slate-500 border border-slate-500 [&>svg]:stroke-slate-500 hover:text-slate-500/95 hover:border-slate-500/85 [&>svg]:stroke-slate-500/95',
        'outline-blue':
          'text-blue-600 border border-blue-600 [&>svg]:stroke-blue-600 hover:text-blue-600/95 hover:border-blue-600/85 [&>svg]:stroke-blue-600/95',
        'outline-indigo':
          'text-indigo-600 border border-indigo-600 [&>svg]:stroke-indigo-600 hover:text-indigo-600/95 hover:border-indigo-600/85 [&>svg]:stroke-indigo-600/95',
        'outline-purple':
          'text-purple-600 border border-purple-600 [&>svg]:stroke-purple-600 hover:text-purple-600/95 hover:border-purple-600/85 [&>svg]:stroke-purple-600/95',
        'outline-pink':
          'text-pink-600 border border-pink-600 [&>svg]:stroke-pink-600 hover:text-pink-600/95 hover:border-pink-600/85 [&>svg]:stroke-pink-600/95',
        'outline-rose':
          'text-rose-600 border border-rose-600 [&>svg]:stroke-rose-600 hover:text-rose-600/95 hover:border-rose-600/85 [&>svg]:stroke-rose-600/95',
        'outline-orange':
          'text-orange-500 border border-orange-500 [&>svg]:stroke-orange-500 hover:text-orange-500/95 hover:border-orange-500/85 [&>svg]:stroke-orange-500/95',
        'outline-yellow':
          'text-yellow-500 border border-yellow-500 [&>svg]:stroke-yellow-500 hover:text-yellow-500/95 hover:border-yellow-500/85 [&>svg]:stroke-yellow-500/95',
        'outline-green':
          'text-green-600 border border-green-600 [&>svg]:stroke-green-600 hover:text-green-600/95 hover:border-green-600/85 [&>svg]:stroke-green-600/95',
        'outline-teal':
          'text-teal-600 border border-teal-600 [&>svg]:stroke-teal-600 hover:text-teal-600/95 hover:border-teal-600/85 [&>svg]:stroke-teal-600/95',
        'outline-cyan':
          'text-cyan-600 border border-cyan-600 [&>svg]:stroke-cyan-600 hover:text-cyan-600/95 hover:border-cyan-600/85 [&>svg]:stroke-cyan-600/95'
      },
      size: {
        xs: 'h-1 w-1 text-xs [&>svg]:w-1 [&>svg]:h-1 [&>svg]:my-0.5',
        sm: 'h-2 w-2 text-xs [&>svg]:w-2 [&>svg]:h-2 [&>svg]:my-0.5',
        md: 'h-3 w-3 text-xs [&>svg]:w-3 [&>svg]:h-3 [&>svg]:my-0.5',
        lg: 'h-4 w-4 text-sm [&>svg]:w-3 [&>svg]:h-3 [&>svg]:my-0.5',
        xl: 'h-5 w-5 text-md [&>svg]:w-4 [&>svg]:h-4 [&>svg]:my-0.5'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

export const Badge = ({ className, variant, size, children, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        badgeVariants({ variant, size }),
        className,
        children && 'w-auto h-auto px-1.5 py-0'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
