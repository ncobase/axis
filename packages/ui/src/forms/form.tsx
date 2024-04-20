import React from 'react';

import { cn } from '@tone/utils';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { FieldConfigProps, FieldRender } from './form.field';

interface FormViewProps extends React.FormHTMLAttributes<HTMLFormElement> {
  control?: Control;
  errors?: FieldValues;
  children?: React.ReactNode;
  fields?: FieldConfigProps[];
}
export const Form = React.forwardRef<HTMLFormElement, FormViewProps>(
  ({ children, className, onSubmit, fields, control, ...props }, ref) => {
    if (!fields && !children) return null;
    return (
      <form
        ref={ref}
        className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4', className)}
        {...props}
        onSubmit={e => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        {children ? children : null}
        {fields &&
          fields.map(item => {
            return (
              <Controller
                key={item.name}
                name={item.name}
                rules={item.rules}
                control={control}
                defaultValue={item.defaultValue}
                render={({ field }) => {
                  return <FieldRender type={item.type} {...props} {...item} {...field} />;
                }}
              />
            );
          })}
      </form>
    );
  }
);

Form.displayName = 'Form';
