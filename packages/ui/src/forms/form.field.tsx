import React from 'react';

import { cn } from '@tone/utils';
import { FieldError } from 'react-hook-form';

import { Label } from './label';

interface FieldProps extends React.ComponentPropsWithoutRef<'div'> {
  required?: boolean;
  className?: string;
  label?: React.ReactNode;
  elements?: React.ReactNode;
  error?: FieldError;
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ required, label, elements, children, className, error }, ref) => {
    const renderedChildren = children ? children : elements;
    if (!renderedChildren) return null;
    return (
      <div ref={ref} className={cn('flex flex-col gap-y-1', className)}>
        {label && (
          <Label className='text-slate-900 font-medium'>
            {required && <span className='text-danger-400 pr-2'>*</span>}
            {label}
          </Label>
        )}
        {renderedChildren}
        {error && <div className='text-danger-400'>{error.message}</div>}
      </div>
    );
  }
);

export const FieldViewer = React.forwardRef<HTMLDivElement, any>(
  ({ label, elements, children, className, description }, ref) => {
    const renderedChildren = children ? children : elements;
    return (
      <div ref={ref} className={cn('flex flex-col gap-y-1', className)}>
        {label && <Label className='text-slate-900 font-medium'>{label}</Label>}
        <div className='border-b border-slate-100 py-2.5 max-h-16 overflow-auto w-full inline-block text-slate-600'>
          {renderedChildren || '-'}
        </div>
        {description && <div className='text-slate-500'>{description}</div>}
      </div>
    );
  }
);
