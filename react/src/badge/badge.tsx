import * as React from 'react';

import { cn } from '@ncobase/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/85',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/85',
        success: 'bg-success-500 text-success-foreground hover:bg-success-500/85',
        warning: 'bg-warning-500 text-warning-foreground hover:bg-warning-500/85',
        danger: 'bg-destructive text-destructive-foreground hover:bg-destructive/85',
        slate: 'bg-slate-500 text-slate-foreground hover:bg-slate-500/85',
        blue: 'bg-blue-600 text-blue-foreground hover:bg-blue-500/85',
        indigo: 'bg-indigo-600 text-indigo-foreground hover:bg-indigo-600/85',
        purple: 'bg-purple-600 text-purple-foreground hover:bg-purple-600/85',
        pink: 'bg-pink-600 text-pink-foreground hover:bg-pink-600/85',
        rose: 'bg-rose-600 text-rose-foreground hover:bg-rose-600/85',
        orange: 'bg-orange-500 text-orange-foreground hover:bg-orange-500/85',
        yellow: 'bg-yellow-500 text-yellow-foreground hover:bg-yellow-500/85',
        green: 'bg-green-600 text-green-foreground hover:bg-green-600/85',
        teal: 'bg-teal-600 text-teal-foreground hover:bg-teal-600/85',
        cyan: 'bg-cyan-600 text-cyan-foreground hover:bg-cyan-600/85',
        'outline-primary':
          'text-primary border border-primary hover:text-primary/95 hover:border-primary/85',
        'outline-secondary':
          'text-secondary border border-secondary hover:text-secondary/95 hover:border-secondary/85',
        'outline-success':
          'text-success-500 border border-success-500 hover:text-success-500/95 hover:border-success-500/85',
        'outline-warning':
          'text-warning-500 border border-warning-500 hover:text-warning-500/95 hover:border-warning-500/85',
        'outline-danger':
          'text-destructive border border-destructive hover:text-destructive/95 hover:border-destructive/85',
        'outline-slate':
          'text-slate-500 border border-slate-500 hover:text-slate-500/95 hover:border-slate-500/85',
        'outline-blue':
          'text-blue-600 border border-blue-600 hover:text-blue-600/95 hover:border-blue-600/85',
        'outline-indigo':
          'text-indigo-600 border border-indigo-600 hover:text-indigo-600/95 hover:border-indigo-600/85',
        'outline-purple':
          'text-purple-600 border border-purple-600 hover:text-purple-600/95 hover:border-purple-600/85',
        'outline-pink':
          'text-pink-600 border border-pink-600 hover:text-pink-600/95 hover:border-pink-600/85',
        'outline-rose':
          'text-rose-600 border border-rose-600 hover:text-rose-600/95 hover:border-rose-600/85',
        'outline-orange':
          'text-orange-500 border border-orange-500 hover:text-orange-500/95 hover:border-orange-500/85',
        'outline-yellow':
          'text-yellow-500 border border-yellow-500 hover:text-yellow-500/95 hover:border-yellow-500/85',
        'outline-green':
          'text-green-600 border border-green-600 hover:text-green-600/95 hover:border-green-600/85',
        'outline-teal':
          'text-teal-600 border border-teal-600 hover:text-teal-600/95 hover:border-teal-600/85',
        'outline-cyan':
          'text-cyan-600 border border-cyan-600 hover:text-cyan-600/95 hover:border-cyan-600/85'
      },
      size: {
        xs: 'h-1 w-1 text-xs',
        sm: 'h-2 w-2 text-xs',
        md: 'h-3 w-3 text-xs',
        lg: 'h-4 w-4 text-xs',
        xl: 'h-5 w-5'
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
