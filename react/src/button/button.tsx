import * as React from 'react';

import { cn } from '@ncobase/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { Icons } from '@/icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-x-1.5 whitespace-nowrap rounded-md font-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/80',
        primary:
          'bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:bg-destructive/80',
        danger:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:bg-destructive/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        'outline-primary':
          'border border-primary text-primary bg-transparent hover:bg-primary/10 hover:text-primary',
        'outline-secondary':
          'border border-secondary text-secondary bg-transparent hover:bg-secondary/10 hover:text-secondary',
        'outline-success':
          'border border-success-500 text-success-500 bg-transparent hover:bg-success-50 hover:text-success-600',
        'outline-warning':
          'border border-warning-500 text-warning-500 bg-transparent hover:bg-warning-50 hover:text-warning-600',
        'outline-danger':
          'border border-destructive text-destructive bg-transparent hover:bg-destructive/10 hover:text-destructive',
        'outline-slate':
          'border border-slate-200 text-slate-500 bg-transparent hover:bg-slate-50 hover:text-slate-600',
        'outline-blue':
          'border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50 hover:text-blue-700',
        'outline-indigo':
          'border border-indigo-600 text-indigo-600 bg-transparent hover:bg-indigo-50 hover:text-indigo-700',
        'outline-purple':
          'border border-purple-600 text-purple-600 bg-transparent hover:bg-purple-50 hover:text-purple-700',
        'outline-pink':
          'border border-pink-600 text-pink-600 bg-transparent hover:bg-pink-50 hover:text-pink-700',
        'outline-rose':
          'border border-rose-600 text-rose-600 bg-transparent hover:bg-rose-50 hover:text-rose-700',
        'outline-orange':
          'border border-orange-600 text-orange-600 bg-transparent hover:bg-orange-50 hover:text-orange-700',
        'outline-yellow':
          'border border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-50 hover:text-yellow-700',
        'outline-green':
          'border border-green-600 text-green-600 bg-transparent hover:bg-green-50 hover:text-green-700',
        'outline-teal':
          'border border-teal-600 text-teal-600 bg-transparent hover:bg-teal-50 hover:text-teal-700',
        'outline-cyan':
          'border border-cyan-600 text-cyan-600 bg-transparent hover:bg-cyan-50 hover:text-cyan-700',

        success:
          'bg-success-500 text-success-foreground hover:bg-success-500/90 focus-visible:bg-success-600',
        warning:
          'bg-warning-500 text-warning-foreground hover:bg-warning-500/90 focus-visible:bg-warning-600',
        slate: 'bg-slate-100/50 text-slate-600 hover:bg-slate-200 focus-visible:bg-slate-200/90',
        blue: 'bg-blue-600 text-blue-foreground hover:bg-blue-600/90 focus-visible:bg-blue-700',
        indigo:
          'bg-indigo-600 text-indigo-foreground hover:bg-indigo-600/90 focus-visible:bg-indigo-700',
        purple:
          'bg-purple-600 text-purple-foreground hover:bg-purple-600/90 focus-visible:bg-purple-700',
        pink: 'bg-pink-600 text-pink-foreground hover:bg-pink-600/90 focus-visible:bg-pink-700',
        rose: 'bg-rose-600 text-rose-foreground hover:bg-rose-600/90 focus-visible:bg-rose-700',
        orange:
          'bg-orange-600 text-orange-foreground hover:bg-orange-600/90 focus-visible:bg-orange-700',
        yellow:
          'bg-yellow-500 text-yellow-foreground hover:bg-yellow-500/90 focus-visible:bg-yellow-600',
        green:
          'bg-green-600 text-green-foreground hover:bg-green-600/90 focus-visible:bg-green-700',
        teal: 'bg-teal-600 text-teal-foreground hover:bg-teal-600/90 focus-visible:bg-teal-700',
        cyan: 'bg-cyan-600 text-cyan-foreground hover:bg-cyan-600/90 focus-visible:bg-cyan-700',
        editor: 'bg-transparent text-editor-toolbar-foreground hover:bg-secondary size-8 p-0',
        unstyle: 'bg-transparent text-slate-500 hover:opacity-80'
      },
      size: {
        xs: 'h-6 px-1.5 py-0.5 rounded-xs text-xs',
        sm: 'h-8 px-2 py-1 rounded-sm text-xs',
        md: 'h-9 px-3 py-1.5 rounded-md text-xs',
        lg: 'h-10 px-4 py-2 rounded-md',
        xl: 'h-12 px-5 py-2.5 rounded-lg text-base',
        icon: 'size-9 p-0',
        ratio: 'px-2 py-1.5 rounded-md text-xs',
        editorIcon: 'size-8 p-0'
      },
      isActive: {
        true: 'bg-editor-toolbar-active text-editor-toolbar-active-foreground',
        false: ''
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      isActive: false
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  prependIcon?: React.ReactNode;
  appendIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isActive,
      type = 'button',
      isLoading = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      prependIcon,
      appendIcon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isLoadingState = isLoading || loading;
    const isDisabled = disabled || isLoadingState;
    const effectiveStartIcon = startIcon || prependIcon;
    const effectiveEndIcon = endIcon || appendIcon;

    return (
      <Comp
        type={type}
        className={cn(buttonVariants({ variant, size, isActive }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        data-disabled={isDisabled || undefined}
        data-loading={isLoadingState || undefined}
        ref={ref}
        {...props}
      >
        {isLoadingState ? (
          <Icons name='IconLoader2' className='mr-1.5 size-4 animate-spin' aria-hidden='true' />
        ) : (
          effectiveStartIcon && (
            <span className='mr-1.5 inline-flex items-center justify-center'>
              {effectiveStartIcon}
            </span>
          )
        )}
        {children}
        {effectiveEndIcon && !isLoadingState && (
          <span className='ml-1.5 inline-flex items-center justify-center'>{effectiveEndIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
