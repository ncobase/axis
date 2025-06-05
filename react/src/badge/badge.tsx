import * as React from 'react';

import { cn } from '@ncobase/utils';
import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-colors font-medium',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        success: 'bg-success-500 text-white hover:bg-success-600',
        warning: 'bg-warning-500 text-white hover:bg-warning-600',
        danger: 'bg-destructive text-white hover:bg-destructive-600',
        slate: 'bg-slate-500 text-white hover:bg-slate-600',
        blue: 'bg-blue-500 text-white hover:bg-blue-600',
        indigo: 'bg-indigo-500 text-white hover:bg-indigo-600',
        purple: 'bg-purple-500 text-white hover:bg-purple-600',
        pink: 'bg-pink-500 text-white hover:bg-pink-600',
        rose: 'bg-rose-500 text-white hover:bg-rose-600',
        orange: 'bg-orange-500 text-white hover:bg-orange-600',
        yellow: 'bg-yellow-500 text-white hover:bg-yellow-600',
        green: 'bg-green-500 text-white hover:bg-green-600',
        teal: 'bg-teal-500 text-white hover:bg-teal-600',
        cyan: 'bg-cyan-500 text-white hover:bg-cyan-600',
        'outline-primary': 'border border-primary text-primary hover:bg-primary/10',
        'outline-secondary': 'border border-secondary text-secondary hover:bg-secondary/10',
        'outline-success': 'border border-success-500 text-success-500 hover:bg-success-50',
        'outline-warning': 'border border-warning-500 text-warning-500 hover:bg-warning-50',
        'outline-danger': 'border border-destructive text-destructive hover:bg-destructive/10',
        'outline-slate': 'border border-slate-500 text-slate-500 hover:bg-slate-50',
        'outline-blue': 'border border-blue-500 text-blue-500 hover:bg-blue-50',
        'outline-indigo': 'border border-indigo-500 text-indigo-500 hover:bg-indigo-50',
        'outline-purple': 'border border-purple-500 text-purple-500 hover:bg-purple-50',
        'outline-pink': 'border border-pink-500 text-pink-500 hover:bg-pink-50',
        'outline-rose': 'border border-rose-500 text-rose-500 hover:bg-rose-50',
        'outline-orange': 'border border-orange-500 text-orange-500 hover:bg-orange-50',
        'outline-yellow': 'border border-yellow-500 text-yellow-500 hover:bg-yellow-50',
        'outline-green': 'border border-green-500 text-green-500 hover:bg-green-50',
        'outline-teal': 'border border-teal-500 text-teal-500 hover:bg-teal-50',
        'outline-cyan': 'border border-cyan-500 text-cyan-500 hover:bg-cyan-50'
      },
      size: {
        dot: 'w-2.5 h-2.5',
        xs: 'text-xs px-2 py-0.5',
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-sm px-3 py-1',
        xl: 'text-base px-3.5 py-1.5'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm'
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
      className={cn(badgeVariants({ variant, size: children ? size : 'dot' }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
