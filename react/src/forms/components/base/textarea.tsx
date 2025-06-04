import React from 'react';

import { cn } from '@ncobase/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className='flex flex-col gap-1.5'>
        {label && <label className='text-sm font-medium text-slate-900'>{label}</label>}
        <textarea
          className={cn(
            'flex px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65 shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus:border-primary-600 text-slate-500 min-h-[5rem] rounded-md ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        {description && <p className='text-sm text-slate-500'>{description}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
