import React from 'react';

import { cn, getValueByPath } from '@tone/utils';
import { Control, Controller, FieldError, FieldValues } from 'react-hook-form';

import { Field } from './form.field';
import { FieldConfigProps, FieldRender } from './form.type';

interface FormViewProps extends React.FormHTMLAttributes<HTMLFormElement> {
  control?: Control;
  errors?: FieldValues;
  children?: React.ReactNode;
  fields: FieldConfigProps[];
}
export const Form = React.forwardRef<HTMLFormElement, FormViewProps>(
  ({ children, className, onSubmit, fields, control, errors, ...props }, ref) => {
    if (!fields && !children) return null;
    return (
      <form
        ref={ref}
        className={cn('grid grid-cols-1 sm:grid-cols-2 md:col-span-3 gap-4', className)}
        {...props}
        onSubmit={e => {
          e.preventDefault();
          onSubmit?.(e);
        }}
      >
        {children ? children : null}
        {fields &&
          fields.map(item => (
            <Controller
              key={item.name}
              name={item.name}
              rules={item.rules}
              control={control}
              defaultValue={item.defaultValue}
              render={({ field }) => {
                return (
                  <Field
                    label={item.label}
                    required={!!item.rules?.required}
                    error={getValueByPath(errors, item.name) as FieldError}
                    className={item.className}
                  >
                    <FieldRender
                      type={item.type}
                      ref={field.ref}
                      options={item.options}
                      {...field}
                    />
                  </Field>
                );
              }}
            />
          ))}
      </form>
    );
  }
);

Form.displayName = 'Form';
