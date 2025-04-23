import React, { forwardRef, memo, useCallback, useState } from 'react';

import { cn, getValueByPath } from '@ncobase/utils';

import { Button } from '../button';
import { DatePicker } from '../datepicker';
import { Icons } from '../icon';
import { Switch } from '../switch';

import { MultiSelectField, TreeSelectField } from './advanced_select';
import { Checkbox } from './checkbox';
import { ColorPickerComponent } from './color_picker';
import { IconPickerComponent } from './icon_picker';
import { Input } from './input';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Textarea } from './textarea';
import type { FieldProps, FieldConfigProps } from './types';
import { Uploader, type UploaderProps } from './uploader';

export const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ title, className, error, errors, name, children, desc, rules, ...rest }, ref) => {
    const rendered = children || <Input {...rest} ref={ref as any} />;
    const errorMessage = errors
      ? getValueByPath(errors, name)?.message
      : error
        ? error?.message
        : null;
    const required = rules?.required || rest['required'] || false;

    if (rest['type'] === 'hidden') {
      return rendered;
    }

    return (
      <div className={cn('flex flex-col gap-y-2', className)} ref={ref}>
        {title && (
          <Label className='text-slate-900 font-medium'>
            {required && <span className='text-danger-400 pr-2'>*</span>}
            {title}
          </Label>
        )}
        {rendered}
        {errorMessage && <div className='text-danger-400'>{errorMessage}</div>}
        {desc && (
          <div className='text-slate-400/80 leading-5 text-wrap text-justify'>
            <Icons name='IconInfoCircle' className='mr-1 inline-block -mt-1' />
            {desc}
          </div>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';

export const FieldViewer = forwardRef<HTMLDivElement, FieldConfigProps>(
  ({ children, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <div className='border-b border-slate-100 py-2.5 max-h-16 overflow-auto w-full inline-block text-slate-600'>
          {children || '-'}
        </div>
      </Field>
    );
  }
);

FieldViewer.displayName = 'FieldViewer';

export const FieldRender = memo(
  forwardRef<HTMLDivElement, FieldProps>(({ type, ...props }, ref) => {
    switch (type) {
      case 'textarea':
        return <TextareaField ref={ref as any} {...props} />;
      case 'date':
        return <DateField ref={ref} {...props} />;
      case 'date-range':
        return <DateRangeField ref={ref} {...props} />;
      case 'select':
        return <SelectField ref={ref} {...props} />;
      case 'multi-select':
        return <MultiSelectField ref={ref} {...props} />;
      case 'tree-select':
        return <TreeSelectField ref={ref} {...props} />;
      case 'checkbox':
        return <CheckboxField ref={ref} {...props} />;
      case 'switch':
        return <SwitchField ref={ref} {...props} />;
      case 'radio':
        return <RadioField ref={ref} {...props} />;
      case 'uploader':
        return <UploaderField ref={ref} {...props} />;
      case 'color':
        return <ColorPickerField ref={ref} {...props} />;
      case 'icon':
        return <IconPickerField ref={ref} {...props} />;
      default:
        return <InputField type={type} ref={ref as any} {...props} />;
    }
  })
);

FieldRender.displayName = 'FieldRender';

const InputField = forwardRef<HTMLInputElement, FieldProps>(
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
            className={cn(rest['className'], prependIcon && 'pl-9', appendIcon && 'pr-9')}
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
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  onChange && onChange(newValue);
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
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  onChange && onChange(newValue);
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

const TextareaField = forwardRef<HTMLTextAreaElement, FieldProps>(
  (
    { onChange, defaultValue, placeholder, appendIcon, appendIconClick, valueComponent, ...rest },
    ref
  ) => {
    if (rest['value'] === undefined && defaultValue !== undefined) {
      rest['value'] = defaultValue;
    }
    return (
      <Field {...rest} ref={ref as any}>
        <div className='relative'>
          <Textarea onChange={onChange} placeholder={placeholder} {...rest} ref={ref} />
          {appendIcon && (
            <Button
              className={cn(
                'absolute right-1 top-1 cursor-default outline-hidden',
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

TextareaField.displayName = 'TextareaField';

const DateField = forwardRef<HTMLDivElement, FieldProps>((props, ref) => (
  <Field {...props} ref={ref}>
    <DatePicker mode='single' {...props} />
  </Field>
));

DateField.displayName = 'DateField';

const DateRangeField = forwardRef<HTMLDivElement, FieldProps>((props, ref) => (
  <Field {...props} ref={ref}>
    <DatePicker mode='range' {...props} />
  </Field>
));

DateRangeField.displayName = 'DateRangeField';

const SelectField = forwardRef<HTMLDivElement, FieldProps>(
  (
    {
      options,
      onChange,
      defaultValue,
      placeholder,
      prependIcon,
      prependIconClick,
      allowClear = false,
      emptyValue = '',
      ...rest
    },
    ref
  ) => {
    const [value, setValue] = useState(rest['value'] === undefined ? defaultValue : rest['value']);

    if (rest['value'] !== undefined && rest['value'] !== value) {
      setValue(rest['value']);
    }

    const handleValueChange = useCallback(
      (newValue: string) => {
        setValue(newValue);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChange && onChange(newValue);
      },
      [onChange]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setValue(emptyValue);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        onChange && onChange(emptyValue);
      },
      [onChange, emptyValue]
    );

    return (
      <Field {...rest} ref={ref}>
        <Select
          {...rest}
          value={value}
          onValueChange={handleValueChange}
          defaultValue={defaultValue}
        >
          <SelectTrigger
            className={cn('relative', prependIcon && 'pl-9')}
            allowClear={allowClear}
            onClear={handleClear}
            value={value}
          >
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
            <SelectValue placeholder={placeholder || 'Please select'} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option, index) => (
              <SelectItem key={index} value={String(option.value)}>
                {option.label || option.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    );
  }
);

SelectField.displayName = 'SelectField';

const RenderOption = memo(
  forwardRef<HTMLDivElement, any>(({ option, type, onChange, defaultValue, ...rest }, _ref) => {
    const { label, value } = typeof option === 'object' ? option : { label: option, value: option };
    const id = `${rest['name']}-${value}`.replace(/\./g, '-');

    return (
      <div className='inline-flex items-center space-x-2 hover:[&>label]:cursor-pointer'>
        {type === 'checkbox' ? (
          <Checkbox
            id={id}
            onCheckedChange={checked => {
              const updatedValue = checked
                ? [...(defaultValue || []), value]
                : (defaultValue || []).filter((val: any) => val !== value);
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onChange && onChange(updatedValue);
            }}
            defaultChecked={defaultValue?.includes(value)}
            {...rest}
          />
        ) : (
          <RadioGroupItem id={id} value={String(value)} />
        )}
        <Label htmlFor={id}>{label}</Label>
      </div>
    );
  })
);

RenderOption.displayName = 'RenderOption';

const CheckboxField = forwardRef<HTMLDivElement, FieldProps>(
  // Discard:
  //   - type
  ({ className, options = [], elementClassName, type: _, ...rest }, ref) => {
    const renderSingleOption = (label: string) => (
      <div className='inline-flex items-center space-x-2 hover:[&>label]:cursor-pointer'>
        <Checkbox
          id={`${rest['name']}`}
          onCheckedChange={rest['onChange']}
          defaultChecked={rest['defaultValue']}
          {...rest}
        />
        <Label htmlFor={`${rest['name']}`}>{label || rest['title']}</Label>
      </div>
    );
    return (
      <Field {...rest} ref={ref} className={className}>
        <div className={cn('flex flex-wrap gap-4 py-3.5', elementClassName)}>
          {options.length === 0 && renderSingleOption(rest['label'])}
          {options.length === 1 && renderSingleOption(options[0]['label'] || '')}
          {options.length > 1 &&
            options.map((option: unknown, index: React.Key | null | undefined) => (
              <RenderOption key={index} option={option} type='checkbox' {...rest} />
            ))}
        </div>
      </Field>
    );
  }
);

CheckboxField.displayName = 'CheckboxField';

const RadioField = forwardRef<HTMLDivElement, FieldProps>(
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

const SwitchField = forwardRef<HTMLDivElement, FieldProps>(
  // Discard:
  //   - type
  ({ onChange, defaultValue, elementClassName, type: _, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Switch
        onCheckedChange={onChange}
        defaultChecked={defaultValue}
        className={cn('my-3.5', elementClassName)}
        {...rest}
      />
    </Field>
  )
);

SwitchField.displayName = 'SwitchField';

const UploaderField = forwardRef<HTMLDivElement, FieldProps & UploaderProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <Uploader value={rest['value'] || defaultValue} onValueChange={onChange} {...rest} />
      </Field>
    );
  }
);

UploaderField.displayName = 'UploaderField';

const ColorPickerField = forwardRef<HTMLDivElement, FieldProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <ColorPickerComponent value={rest['value'] || defaultValue} onChange={onChange} {...rest} />
      </Field>
    );
  }
);

ColorPickerField.displayName = 'ColorPickerField';

const IconPickerField = forwardRef<HTMLDivElement, FieldProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <IconPickerComponent value={rest['value'] || defaultValue} onChange={onChange} {...rest} />
      </Field>
    );
  }
);

IconPickerField.displayName = 'IconPickerField';

export {
  InputField,
  TextareaField,
  DateField,
  DateRangeField,
  SelectField,
  CheckboxField,
  RadioField,
  ColorPickerField,
  IconPickerField,
  MultiSelectField,
  TreeSelectField,
  UploaderField
};
