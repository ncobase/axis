import React from 'react';

import { cn, getValueByPath } from '@tone/utils';
import { FieldError, FieldValues, RegisterOptions } from 'react-hook-form';

import { DatePicker } from '../datepicker';

import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { Textarea } from './textarea';

interface FieldConfigProps extends React.ComponentProps<any> {
  label?: string;
  name?: any;
  defaultValue?: any;
  type?: any;
  rules?: RegisterOptions;
  errors?: FieldValues;
  options?: { [key: string]: any }[] | string[] | number[];
  required?: boolean;
  className?: string;
}

interface FieldProps extends FieldConfigProps {
  error?: FieldError;
}

const Field: React.FC<FieldProps> = React.forwardRef<any, FieldProps>(
  ({ label, className, error, errors, name, children, rules, ...rest }, ref) => {
    const rendered = children || <Input {...rest} ref={ref} />;
    const errorMessage = errors ? getValueByPath(errors, name)?.message || error?.message : null;
    const required = rules?.required || rest.required || false;
    return (
      <div className={cn('flex flex-col gap-y-1', className)} ref={ref}>
        {label && (
          <Label className='text-slate-900 font-medium'>
            {required && <span className='text-danger-400 pr-2'>*</span>}
            {label}
          </Label>
        )}
        {rendered}
        {errorMessage && <div className='text-danger-400'>{errorMessage}</div>}
      </div>
    );
  }
);

const FieldRender = React.forwardRef<any, FieldConfigProps>(({ type, ...props }, ref) => {
  switch (type) {
    case 'textarea':
      return <TextareaField ref={ref} {...props} />;
    case 'date':
      return <DateField ref={ref} {...props} />;
    case 'date-range':
      return <DateRangeField ref={ref} {...props} />;
    case 'select':
      return <SelectField ref={ref} {...props} />;
    case 'checkbox':
      return <CheckboxField ref={ref} {...props} />;
    case 'radio':
      return <RadioField ref={ref} {...props} />;
    case 'number':
      return <NumberField ref={ref} {...props} />;
    default:
      return <InputField ref={ref} {...props} />;
  }
});

const InputField = React.forwardRef<HTMLInputElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <Input onChange={onChange} {...rest} ref={ref} />
      </Field>
    );
  }
);

const NumberField = React.forwardRef<HTMLInputElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Input type='number' onChange={onChange} {...rest} ref={ref} />
    </Field>
  )
);

const TextareaField = React.forwardRef<HTMLTextAreaElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Textarea onChange={onChange} {...rest} ref={ref} />
    </Field>
  )
);

const DateField = React.forwardRef<HTMLDivElement, FieldConfigProps>((props, ref) => (
  <Field {...props} ref={ref}>
    <DatePicker mode='single' {...props} />
  </Field>
));

const DateRangeField = React.forwardRef<HTMLDivElement, FieldConfigProps>((props, ref) => (
  <Field {...props} ref={ref}>
    <DatePicker mode='range' {...props} />
  </Field>
));

const SelectField = React.forwardRef<HTMLDivElement, FieldConfigProps>(
  ({ options, onChange, defaultValue, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Select {...rest} onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder='Please select' />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option, index) => (
            <SelectItem key={index} value={option.value as string}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )
);

const RenderOption = React.forwardRef<any, any>(
  ({ option, type, onChange, defaultValue, ...rest }, _ref) => {
    const { label, value } = typeof option === 'object' ? option : { label: option, value: option };
    const id = `${rest.name}-${value}`.replace(/\./g, '-');

    return (
      <div className='inline-flex items-center space-x-2'>
        {type === 'checkbox' ? (
          <Checkbox
            id={id}
            onCheckedChange={checked => {
              const updatedValue = checked
                ? [...(defaultValue || []), value]
                : (defaultValue || []).filter((val: any) => val !== value);
              onChange(updatedValue);
            }}
            defaultChecked={defaultValue?.includes(value)}
            {...rest}
          />
        ) : (
          <RadioGroupItem id={id} value={value} />
        )}
        <Label htmlFor={id}>{label}</Label>
      </div>
    );
  }
);

const CheckboxField = React.forwardRef<HTMLDivElement, FieldConfigProps>(
  ({ className, options = [], ...rest }, ref) => {
    const renderSingleOption = label => (
      <div className='inline-flex items-center space-x-2'>
        <Checkbox
          id={`${rest.name}`}
          onCheckedChange={rest.onChange}
          defaultChecked={rest.defaultValue}
          {...rest}
        />
        <Label htmlFor={`${rest.name}`}>{label || rest.label}</Label>
      </div>
    );
    return (
      <Field {...rest} ref={ref} className={className}>
        <div className='flex flex-wrap gap-4 py-3.5'>
          {options.length === 0 && renderSingleOption(rest.label)}
          {options.length === 1 && renderSingleOption(options[0]['label'] || '')}
          {options.length > 1 &&
            options.map((option, index) => (
              <RenderOption key={index} option={option} type='checkbox' {...rest} />
            ))}
        </div>
      </Field>
    );
  }
);

const RadioField = React.forwardRef<HTMLDivElement, FieldConfigProps>(
  ({ className, onChange, defaultValue, options = [], ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref} className={className}>
        <RadioGroup
          {...rest}
          className='flex flex-wrap gap-4 py-3.5'
          defaultValue={defaultValue}
          onValueChange={onChange}
        >
          {options.length === 0 && (
            <RenderOption type='radio' option={{ label: rest.label, value: '0' }} {...rest} />
          )}
          {options.length === 1 && <RenderOption type='radio' option={options[0]} {...rest} />}
          {options.length > 1 &&
            options?.map((option, index) => (
              <RenderOption key={index} option={option} type='radio' {...rest} />
            ))}
        </RadioGroup>
      </Field>
    );
  }
);

export {
  Field,
  FieldRender,
  InputField,
  TextareaField,
  DateField,
  DateRangeField,
  SelectField,
  CheckboxField,
  RadioField,
  NumberField,
  type FieldConfigProps
};
