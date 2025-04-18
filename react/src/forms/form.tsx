import React, { forwardRef } from 'react';

import { cn } from '@ncobase/utils';
import { Controller, FieldValues } from 'react-hook-form';

import { FormProvider } from './context';
import { FieldRender } from './form.field';
import type { FormProps, FormLayout } from './types';

const getLayoutClasses = (layout: FormLayout) => {
  switch (layout) {
    case 'default':
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';
    case 'single':
      return 'grid grid-cols-1 gap-4';
    case 'inline':
      return 'flex flex-wrap gap-4 items-end';
    case 'custom':
      return '';
    default:
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4';
  }
};

export const Form = forwardRef(
  <TFieldValues extends FieldValues = FieldValues>(
    {
      id,
      children,
      className,
      onSubmit,
      fields,
      control,
      errors,
      layout = 'default',
      ...props
    }: FormProps<TFieldValues>,
    ref: React.Ref<HTMLFormElement>
  ) => {
    if (!fields && !children) return null;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!onSubmit) {
        return;
      }
      e.stopPropagation();
      // Get form values from control if available
      const formValues = control?._formValues as TFieldValues;
      // Call onSubmit with form values if control exists, otherwise just pass the event
      onSubmit(e, formValues ?? undefined);
    };

    return (
      <form
        id={id}
        ref={ref}
        className={cn(getLayoutClasses(layout), className)}
        {...props}
        onSubmit={handleSubmit}
      >
        <FormProvider control={control} errors={errors}>
          {children}
          {fields &&
            fields.map(item => {
              return (
                <Controller
                  key={String(item.name)}
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
        </FormProvider>
      </form>
    );
  }
);

Form.displayName = 'Form';
