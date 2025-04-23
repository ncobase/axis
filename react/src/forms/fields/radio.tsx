import React from 'react';

import { cn } from '@ncobase/utils';

import { RadioGroup } from '../components';
import { FieldProps } from '../types';

import { Field } from './field';
import { RenderOption } from './render-option';

export const RadioField = React.forwardRef<HTMLDivElement, FieldProps>(
  ({ className, onChange, defaultValue, options = [], elementClassName, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref} className={className}>
        <RadioGroup
          {...rest}
          className={cn('flex flex-wrap gap-4 py-3.5', elementClassName)}
          defaultValue={defaultValue}
          onValueChange={onChange}
        >
          {options.length === 0 && (
            <RenderOption type='radio' option={{ label: rest['title'], value: '0' }} {...rest} />
          )}
          {options.length === 1 && <RenderOption type='radio' option={options[0]} {...rest} />}
          {options.length > 1 &&
            options?.map((option: unknown, index: React.Key | null | undefined) => (
              <RenderOption key={index} option={option} type='radio' {...rest} />
            ))}
        </RadioGroup>
      </Field>
    );
  }
);

RadioField.displayName = 'RadioField';
