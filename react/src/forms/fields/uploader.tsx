import React from 'react';

import { FieldProps } from '../types';
import { UploaderProps, Uploader } from '../uploader';

import { Field } from './field';

export const UploaderField = React.forwardRef<HTMLDivElement, FieldProps & UploaderProps>(
  ({ onChange, defaultValue, ...rest }, ref) => {
    return (
      <Field {...rest} ref={ref}>
        <Uploader value={rest['value'] || defaultValue} onValueChange={onChange} {...rest} />
      </Field>
    );
  }
);

UploaderField.displayName = 'UploaderField';
