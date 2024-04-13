import React from 'react';

import { cn } from '@tone/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-1 py-0 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 absolute -top-2 -right-1.5',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-brand-500 text-white shadow hover:bg-brand-500/80',
        danger: 'border-transparent bg-dange-500 text-white hover:bg-dange-500/80',
        success: 'border-transparent bg-success-500 text-white shadow hover:bg-success-500/80',
        outline: 'text-foreground'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
