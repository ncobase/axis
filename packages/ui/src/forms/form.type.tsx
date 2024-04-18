import React from 'react';

import { RegisterOptions } from 'react-hook-form';

import { DatePicker } from '../datepicker';

import { Checkbox } from './checkbox';
import { Input } from './input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
import { Textarea } from './textarea';

export interface FieldConfigProps {
  label?: string;
  name: string;
  defaultValue?: any;
  type?: string;
  rules?: RegisterOptions;
  options?: { label: string; value: string }[];
  required?: boolean;
  className?: string;
}

export const FieldRender = React.forwardRef<any, any>(
  ({ type = 'text', options, ...props }, ref) => {
    switch (type) {
      case 'textarea':
        return <Textarea ref={ref} {...props} />;
      case 'date':
        return <DatePicker mode='single' {...props} />;
      case 'date-range':
        return <DatePicker mode='range' {...props} />;
      case 'time':
        return <Input ref={ref} type='time' {...props} />;
      case 'select':
        return (
          <Select {...props} onValueChange={props?.onChange as any}>
            <SelectTrigger>
              <SelectValue placeholder='Please select' />
            </SelectTrigger>
            <SelectContent>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'checkbox':
        return <Checkbox {...props} />;
      default:
        return <Input ref={ref} type={type} {...props} />;
    }
  }
);
