import * as React from 'react';

import { cn } from '@ncobase/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all rounded-md font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-75',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-600 text-white [&>svg]:stroke-white hover:bg-primary-600/85 hover:[&>svg]:stroke-white/85 focus:bg-primary-700/90',
        secondary:
          'bg-secondary-100/45 text-secondary-400 hover:bg-secondary-100/85 hover:text-secondary-500 hover:[&>svg]:stroke-secondary-400 focus:bg-secondary-100/90',
        success:
          'bg-success-500 text-white [&>svg]:stroke-white hover:bg-success-500/85 hover:[&>svg]:stroke-white/85 focus:bg-success-600/90',
        warning:
          'bg-warning-500 text-white [&>svg]:stroke-white hover:bg-warning-500/85 hover:[&>svg]:stroke-white/85 focus:bg-warning-600/90',
        danger:
          'bg-danger-500 text-white [&>svg]:stroke-white hover:bg-danger-500/85 hover:[&>svg]:stroke-white/85 focus:bg-danger-600/90',
        slate:
          'bg-slate-100/45 text-slate-400 hover:bg-slate-100/85 hover:text-slate-500 hover:[&>svg]:stroke-slate-400 focus:bg-slate-100/90',
        blue: 'bg-blue-600 text-white [&>svg]:stroke-white hover:bg-blue-600/85 hover:[&>svg]:stroke-white/85 focus:bg-blue-700/90',
        indigo:
          'bg-indigo-600 text-white [&>svg]:stroke-white hover:bg-indigo-600/85 hover:[&>svg]:stroke-white/85 focus:bg-indigo-700/90',
        purple:
          'bg-purple-600 text-white [&>svg]:stroke-white hover:bg-purple-600/85 hover:[&>svg]:stroke-white/85 focus:bg-purple-700/90',
        pink: 'bg-pink-600 text-white [&>svg]:stroke-white hover:bg-pink-600/85 hover:[&>svg]:stroke-white/85 focus:bg-pink-700/90',
        rose: 'bg-rose-600 text-white [&>svg]:stroke-white hover:bg-rose-600/85 hover:[&>svg]:stroke-white/85 focus:bg-rose-700/90',
        orange:
          'bg-orange-600 text-white [&>svg]:stroke-white hover:bg-orange-600/85 hover:[&>svg]:stroke-white/85 focus:bg-orange-700/90',
        yellow:
          'bg-yellow-500 text-white [&>svg]:stroke-white hover:bg-yellow-500/85 hover:[&>svg]:stroke-white/85 focus:bg-yellow-600/90',
        green:
          'bg-green-600 text-white [&>svg]:stroke-white hover:bg-green-600/85 hover:[&>svg]:stroke-white/85 focus:bg-green-700/90',
        teal: 'bg-teal-600 text-white [&>svg]:stroke-white hover:bg-teal-600/85 hover:[&>svg]:stroke-white/85 focus:bg-teal-700/90',
        cyan: 'bg-cyan-600 text-white [&>svg]:stroke-white hover:bg-cyan-600/85 hover:[&>svg]:stroke-white/85 focus:bg-cyan-700/90',
        outline:
          'border border-gray-200/65 text-gray-500/65 [&>svg]:stroke-gray-400/65 hover:border-gray-100/65 hover:text-gray-500 hover:bg-gray-50 hover:[&>svg]:stroke-gray-400 focus:border-gray-200/90',
        'outline-primary':
          'border border-primary-600 text-primary-600 [&>svg]:stroke-primary-600 hover:border-primary-600/65 hover:bg-primary-50 hover:[&>svg]:stroke-primary-600/65 focus:border-primary-700/90',
        'outline-secondary':
          'border border-secondary-200/65 text-secondary-500/65 [&>svg]:stroke-secondary-400/65 hover:border-secondary-100/65 hover:text-secondary-500 hover:bg-secondary-50 hover:[&>svg]:stroke-secondary-400 focus:border-secondary-200/90',
        'outline-success':
          'border border-success-500 text-success-500 [&>svg]:stroke-success-500 hover:border-success-500/65 hover:bg-success-50 hover:[&>svg]:stroke-success-500/65 focus:border-success-600/90',
        'outline-warning':
          'border border-warning-500 text-warning-500 [&>svg]:stroke-warning-500 hover:border-warning-500/65 hover:bg-warning-50 hover:[&>svg]:stroke-warning-500/65 focus:border-warning-600/90',
        'outline-danger':
          'border border-danger-500 text-danger-500 [&>svg]:stroke-danger-500 hover:border-danger-500/65 hover:bg-danger-50 hover:[&>svg]:stroke-danger-500/65 focus:border-danger-600/90',
        'outline-slate':
          'border border-slate-200/65 text-slate-500/65 [&>svg]:stroke-slate-400/65 hover:border-slate-100/65 hover:text-slate-500 hover:bg-slate-50 hover:[&>svg]:stroke-slate-400 focus:border-slate-200/90',
        'outline-blue':
          'border border-blue-600 text-blue-600 [&>svg]:stroke-blue-600 hover:border-blue-600/65 hover:bg-blue-50 hover:[&>svg]:stroke-blue-600/65 focus:border-blue-700/90',
        'outline-indigo':
          'border border-indigo-600 text-indigo-600 [&>svg]:stroke-indigo-600 hover:border-indigo-600/65 hover:bg-indigo-50 hover:[&>svg]:stroke-indigo-600/65 focus:border-indigo-700/90',
        'outline-purple':
          'border border-purple-600 text-purple-600 [&>svg]:stroke-purple-600 hover:border-purple-600/65 hover:bg-purple-50 hover:[&>svg]:stroke-purple-600/65 focus:border-purple-700/90',
        'outline-pink':
          'border border-pink-600 text-pink-600 [&>svg]:stroke-pink-600 hover:border-pink-600/65 hover:bg-pink-50 hover:[&>svg]:stroke-pink-600/65 focus:border-pink-700/90',
        'outline-rose':
          'border border-rose-600 text-rose-600 [&>svg]:stroke-rose-600 hover:border-rose-600/65 hover:bg-rose-50 hover:[&>svg]:stroke-rose-600/65 focus:border-rose-700/90',
        'outline-orange':
          'border border-orange-600 text-orange-600 [&>svg]:stroke-orange-600 hover:border-orange-600/65 hover:bg-orange-50 hover:[&>svg]:stroke-orange-600/65 focus:border-orange-700/90',
        'outline-yellow':
          'border border-yellow-500 text-yellow-600 [&>svg]:stroke-yellow-600 hover:border-yellow-500/65 hover:bg-yellow-50 hover:[&>svg]:stroke-yellow-600/65 focus:border-yellow-600/90',
        'outline-green':
          'border border-green-600 text-green-600 [&>svg]:stroke-green-600 hover:border-green-600/65 hover:bg-green-50 hover:[&>svg]:stroke-green-600/65 focus:border-green-700/90',
        'outline-teal':
          'border border-teal-600 text-teal-600 [&>svg]:stroke-teal-600 hover:border-teal-600/65 hover:bg-teal-50 hover:[&>svg]:stroke-teal-600/65 focus:border-teal-700/90',
        'outline-cyan':
          'border border-cyan-600 text-cyan-600 [&>svg]:stroke-cyan-600 hover:border-cyan-600/65 hover:bg-cyan-50 hover:[&>svg]:stroke-cyan-600/65 focus:border-cyan-700/90',
        link: 'text-primary-500 hover:text-primary-600 [&>svg]:stroke-primary-500 [&>svg]:hover:text-primary-500/65 hover:text-primary-500/95 focus:text-primary-600/90',
        editor: 'bg-transparent text-editor-toolbar-foreground hover:bg-secondary size-8 p-0',
        unstyle:
          'bg-transparent text-slate-500 [&>svg]:stroke-slate-400/65 [&>svg]:hover:stroke-slate-400 [&>svg]:focus:stroke-slate-400 hover:opacity-80 focus:opacity-90',
        ghost:
          'bg-transparent text-slate-500 hover:bg-secondary hover:text-editor-toolbar-foreground [&>svg]:stroke-slate-400/65 [&>svg]:hover:stroke-slate-400 [&>svg]:focus:stroke-slate-400 hover:opacity-80 focus:opacity-90'
      },
      size: {
        xs: 'px-1.5 py-0.5 rounded-xs text-xs',
        sm: 'px-2 py-1 rounded-xs text-xs',
        md: 'px-3 py-1.5 rounded-md',
        lg: 'px-4 py-2 rounded-md',
        xl: 'px-5 py-2.5 rounded-lg',
        ratio: 'px-2 py-1.5 rounded-md',
        editorIcon: 'size-8',
        icon: 'size-9 p-0'
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
  loading?: boolean;
  prependIcon?: React.ReactElement;
  appendIcon?: React.ReactElement;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isActive,
      type = 'button',
      loading = false,
      disabled = false,
      prependIcon,
      appendIcon,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const Comp = asChild ? Slot : 'button';

    // Define icon styles based on size
    const getIconStyle = (size?: string) => {
      const sizes = {
        xs: 'h-1.5 w-1.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        sm: 'h-2.5 w-2.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        md: 'h-3.5 w-3.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        lg: 'h-4.5 w-4.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        xl: 'h-5.5 w-5.5 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        ratio: 'inline-flex items-center gap-1.5 whitespace-nowrap transition-all justify-center',
        editorIcon:
          'h-6 w-6 inline-flex justify-center items-center overflow-hidden my-0.5 shrink-0',
        icon: 'h-5 w-5 inline-flex justify-center items-center overflow-hidden shrink-0'
      };

      return sizes[size as keyof typeof sizes] || sizes.md;
    };

    const iconStyle = getIconStyle(size);

    return (
      <Comp
        type={type}
        className={cn(
          buttonVariants({ variant, size, isActive }),
          isDisabled && 'cursor-not-allowed opacity-75',
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {prependIcon && <div className={iconStyle}>{React.cloneElement(prependIcon)}</div>}
        {children}
        {appendIcon && <div className={iconStyle}>{React.cloneElement(appendIcon)}</div>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
