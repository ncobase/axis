import React from 'react';

import { FieldProps } from '../types';

import { Field } from './field';

import { DatePicker } from '@/datepicker';

export const DateRangeField = React.forwardRef<HTMLDivElement, FieldProps>((props, ref) => (
  <Field {...props} ref={ref}>
    <DatePicker mode='range' {...props} />
  </Field>
));

DateRangeField.displayName = 'DateRangeField';
