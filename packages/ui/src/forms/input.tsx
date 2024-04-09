import React from 'react';

import { cn } from '@tone/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex px-3 py-2.5 bg-slate-50/15 hover:bg-slate-50/65 border border-slate-100 focus:border-brand-600 text-slate-500 rounded-md transition-colors file:border-0 file:bg-transparent file:font-medium disabled:cursor-not-allowed disabled:opacity-55 disabled:pointer-events-none',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
