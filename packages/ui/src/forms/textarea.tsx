import React from 'react';

import { cn } from '@tone/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex px-3 py-2.5 w-full bg-slate-50/15 hover:bg-slate-50/65 border border-slate-100 focus:border-brand-600 text-slate-500 min-h-[80px] rounded-md ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
