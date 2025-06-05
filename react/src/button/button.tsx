import * as React from 'react';

import { cn } from '@ncobase/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

import { Icons } from '@/icon';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-x-1.5 whitespace-nowrap rounded-md font-500 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground [&_svg]:text-primary-foreground hover:bg-primary/90',
        primary:
          'bg-primary text-primary-foreground [&_svg]:text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground [&_svg]:text-destructive-foreground hover:bg-destructive/90',
        danger:
          'bg-destructive text-destructive-foreground [&_svg]:text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground [&_svg]:text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground [&_svg]:text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground [&_svg]:text-foreground',
        link: 'text-primary [&_svg]:text-primary underline-offset-4 hover:underline',

        'outline-primary':
          'border border-primary text-primary [&_svg]:text-primary bg-transparent hover:bg-primary/10',
        'outline-secondary':
          'border border-secondary text-secondary [&_svg]:text-secondary bg-transparent hover:bg-secondary/10',
        'outline-success':
          'border border-success-500 text-success-500 [&_svg]:text-success-500 bg-transparent hover:bg-success-50',
        'outline-warning':
          'border border-warning-500 text-warning-500 [&_svg]:text-warning-500 bg-transparent hover:bg-warning-50',
        'outline-danger':
          'border border-destructive text-destructive [&_svg]:text-destructive bg-transparent hover:bg-destructive/10',
        'outline-slate':
          'border border-slate-200 text-slate-500 [&_svg]:text-slate-500 bg-transparent hover:bg-slate-50',

        success:
          'bg-success-500 text-success-foreground [&_svg]:text-success-foreground hover:bg-success-500/90',
        warning:
          'bg-warning-500 text-warning-foreground [&_svg]:text-warning-foreground hover:bg-warning-500/90',
        slate: 'bg-slate-100/50 text-slate-600 [&_svg]:text-slate-600 hover:bg-slate-200',
        blue: 'bg-blue-600 text-blue-foreground [&_svg]:text-blue-foreground hover:bg-blue-600/90',
        indigo:
          'bg-indigo-600 text-indigo-foreground [&_svg]:text-indigo-foreground hover:bg-indigo-600/90',
        purple:
          'bg-purple-600 text-purple-foreground [&_svg]:text-purple-foreground hover:bg-purple-600/90',
        pink: 'bg-pink-600 text-pink-foreground [&_svg]:text-pink-foreground hover:bg-pink-600/90',
        rose: 'bg-rose-600 text-rose-foreground [&_svg]:text-rose-foreground hover:bg-rose-600/90',
        orange:
          'bg-orange-600 text-orange-foreground [&_svg]:text-orange-foreground hover:bg-orange-600/90',
        yellow:
          'bg-yellow-500 text-yellow-foreground [&_svg]:text-yellow-foreground hover:bg-yellow-500/90',
        green:
          'bg-green-600 text-green-foreground [&_svg]:text-green-foreground hover:bg-green-600/90',
        teal: 'bg-teal-600 text-teal-foreground [&_svg]:text-teal-foreground hover:bg-teal-600/90',
        cyan: 'bg-cyan-600 text-cyan-foreground [&_svg]:text-cyan-foreground hover:bg-cyan-600/90',
        editor:
          'bg-transparent text-editor-toolbar-foreground [&_svg]:text-editor-toolbar-foreground hover:bg-secondary size-8 p-0',
        unstyle: 'bg-transparent text-slate-500 [&_svg]:text-slate-500 hover:opacity-80'
      },
      size: {
        xs: 'h-6 min-w-6 px-1.5 py-0.5 rounded-xs text-xs [&_svg]:size-3',
        sm: 'h-8 min-w-8 px-2 py-1 rounded-sm text-xs [&_svg]:size-3.5',
        md: 'h-9 min-w-9 px-3 py-1.5 rounded-md text-xs',
        lg: 'h-10 min-w-10 px-4 py-2 rounded-md [&_svg]:size-4.5',
        xl: 'h-12 min-w-12 px-5 py-2.5 rounded-lg text-base [&_svg]:size-5',
        icon: 'size-9 p-0',
        ratio: 'px-2 py-1.5 rounded-md text-xs',
        editorIcon: 'size-8 p-0'
      },
      isActive: {
        true: 'bg-editor-toolbar-active text-editor-toolbar-active-foreground [&_svg]:text-editor-toolbar-active-foreground',
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
          <Icons name='IconLoader2' className='mr-1.5 animate-spin' aria-hidden='true' />
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
