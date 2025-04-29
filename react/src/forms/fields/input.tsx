import React from 'react';

import { cn } from '@ncobase/utils';

import { Input } from '../components';
import { FieldProps } from '../types';

import { Field } from './field';

import { Button } from '@/button';
import { Icons } from '@/icon';

export const InputField = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      onChange,
      defaultValue,
      placeholder,
      prependIcon,
      prependIconClick,
      appendIcon,
      appendIconClick,
      valueComponent,
      ...rest
    },
    ref
  ) => {
    if (rest['value'] === undefined && defaultValue !== undefined) {
      rest['value'] = defaultValue;
    }

    return (
      <Field {...rest} ref={ref}>
        <div className='relative'>
          {prependIcon && (
            <Button
              className={cn(
                'absolute left-1 top-1/2 transform -translate-y-1/2 cursor-default outline-hidden',
                prependIconClick && 'cursor-pointer'
              )}
              onClick={prependIconClick}
              variant='unstyle'
              size='ratio'
            >
              <Icons name={prependIcon} />
            </Button>
          )}
          <Input
            onChange={onChange}
            placeholder={placeholder}
            {...rest}
            ref={ref}
            className={cn(rest['className'], prependIcon && 'pl-9!', appendIcon && 'pr-9!')}
          />
          {rest['type'] === 'number' && (
            <div
              className={cn('flex flex-col absolute right-1 top-1/2 transform -translate-y-1/2')}
            >
              <Button
                className={cn('outline-hidden py-0 mt-0.5')}
                variant='unstyle'
                size='ratio'
                onClick={() => {
                  const newValue = parseInt(rest['value']) + 1 || 0;
                  onChange?.(newValue);
                }}
              >
                <Icons name='IconChevronUp' />
              </Button>
              <Button
                className={cn('outline-hidden py-0 -mt-0.5')}
                variant='unstyle'
                size='ratio'
                onClick={() => {
                  const newValue = parseInt(rest['value']) - 1 || 0;
                  onChange?.(newValue);
                }}
              >
                <Icons name='IconChevronDown' />
              </Button>
            </div>
          )}
          {rest['type'] !== 'number' && appendIcon && (
            <Button
              className={cn(
                'absolute right-1 top-1/2 transform -translate-y-1/2 cursor-default outline-hidden',
                appendIconClick && 'cursor-pointer'
              )}
              variant='unstyle'
              onClick={appendIconClick}
              size='ratio'
            >
              <Icons name={appendIcon} />
            </Button>
          )}
        </div>
        {valueComponent && valueComponent({ onChange, ...rest })}
      </Field>
    );
  }
);

InputField.displayName = 'InputField';
