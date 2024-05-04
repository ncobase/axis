import React from 'react';

import { cn, getValueByPath } from '@tone/utils';
import { FieldError, FieldValues, RegisterOptions } from 'react-hook-form';

import { DatePicker } from '../datepicker';
import { Switch } from '../switch';

import { Checkbox } from './checkbox';
import { Input } from './input';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { Textarea } from './textarea';

interface FieldConfigProps extends React.ComponentProps<any> {
  /**
   * The title of the field
   */
  title?: string;
  /**
   * The name of the field
   * @example
   *   name='name'
   *   name='profile.name'
   */
  name?: any;
  /**
   * The placeholder of the field, if type is 'input', 'password', 'textarea', 'number'
   */
  placeholder?: string;
  /**
   * The default value of the field
   */
  defaultValue?: any;
  /**
   * The type of the field
   * valid values: 'input', 'password', 'textarea', 'select', 'checkbox', 'radio', 'number', 'date', 'date-range'
   */
  type?: any;
  /**
   * The rules of the field
   * @see https://react-hook-form.com/api/useform/register
   */
  rules?: RegisterOptions;
  /**
   * The errors of the form
   * @see https://react-hook-form.com/api/useform
   */
  errors?: FieldValues;
  /**
   * The options of the field, if type is 'select', 'checkbox', 'radio'
   * @example
   *   options={['Option 1', 'Option 2', 'Option 3']}
   *   options={[{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }, { label: 'Option 3', value: 3 }]}
   *   options={[1, 2, 3]}
   */
  options?: { [key: string]: any }[] | string[] | number[];
  /**
   * If the field is required, the error message will be displayed
   */
  required?: boolean;
  /**
   * The className of the field
   */
  className?: string;
  /**
   * The className of the children wrapper, if type is 'checkbox', 'radio'
   */
  elementClassName?: string;
}

interface FieldProps extends FieldConfigProps {
  error?: FieldError;
}

const Field: React.FC<FieldProps> = React.forwardRef<any, FieldProps>(
  ({ title, className, error, errors, name, children, rules, ...rest }, ref) => {
    const rendered = children || <Input {...rest} ref={ref} />;
    const errorMessage = errors
      ? getValueByPath(errors, name)?.message
      : error
        ? error?.message
        : null || null;
    const required = rules?.required || rest.required || false;

    if (rest.type === 'hidden') {
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
      </div>
    );
  }
);

const FieldViewer = React.forwardRef<HTMLDivElement, FieldConfigProps>(
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
    case 'switch':
      return <SwitchField ref={ref} {...props} />;
    case 'radio':
      return <RadioField ref={ref} {...props} />;
    case 'number':
      return <NumberField ref={ref} {...props} />;
    default:
      return <InputField type={type} ref={ref} {...props} />;
  }
});

const InputField = React.forwardRef<HTMLInputElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, placeholder, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Input onChange={onChange} placeholder={placeholder} {...rest} ref={ref} />
    </Field>
  )
);

const NumberField = React.forwardRef<HTMLInputElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, placeholder, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Input type='number' onChange={onChange} placeholder={placeholder} {...rest} ref={ref} />
    </Field>
  )
);

const TextareaField = React.forwardRef<HTMLTextAreaElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, placeholder, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Textarea onChange={onChange} placeholder={placeholder} {...rest} ref={ref} />
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
  ({ options, onChange, defaultValue, placeholder, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Select {...rest} onValueChange={onChange} defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder || '请选择'} />
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
      <div className='inline-flex items-center space-x-2 [&>label]:hover:cursor-pointer'>
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
  ({ className, options = [], elementClassName, ...rest }, ref) => {
    const renderSingleOption = label => (
      <div className='inline-flex items-center space-x-2 [&>label]:hover:cursor-pointer'>
        <Checkbox
          id={`${rest.name}`}
          onCheckedChange={rest.onChange}
          defaultChecked={rest.defaultValue}
          {...rest}
        />
        <Label htmlFor={`${rest.name}`}>{label || rest.title}</Label>
      </div>
    );
    return (
      <Field {...rest} ref={ref} className={className}>
        <div className={cn('flex flex-wrap gap-4', elementClassName)}>
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
  ({ className, onChange, defaultValue, options = [], elementClassName, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref} className={className}>
        <RadioGroup
          {...rest}
          className={cn('flex flex-wrap gap-4', elementClassName)}
          defaultValue={defaultValue}
          onValueChange={onChange}
        >
          {options.length === 0 && (
            <RenderOption type='radio' option={{ label: rest.title, value: '0' }} {...rest} />
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

const SwitchField = React.forwardRef<HTMLDivElement, FieldConfigProps>(
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  ({ onChange, defaultValue, elementClassName, ...rest }, ref) => (
    <Field {...rest} ref={ref}>
      <Switch
        onCheckedChange={onChange}
        defaultChecked={defaultValue}
        {...rest}
        className={elementClassName}
      />
    </Field>
  )
);

export {
  Field,
  FieldViewer,
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
