import React from 'react';

import { HierarchicalSelect, HierarchicalSelectProps } from '../components';
import { Field } from '../fields';
import { FieldProps } from '../types';

export interface MultiSelectFieldProps extends Omit<HierarchicalSelectProps & FieldProps, 'type'> {
  options: Array<{ label: string; value: any }>;
  placeholder?: string;
  disabled?: boolean;
}
export const MultiSelectField = React.forwardRef<HTMLDivElement, MultiSelectFieldProps>(
  ({ title, desc, error, errors, name, rules, required, ...hierarchicalSelectProps }, ref) => {
    return (
      <Field
        title={title}
        desc={desc}
        error={error}
        errors={errors}
        name={name}
        rules={rules}
        required={required}
        ref={ref}
      >
        <HierarchicalSelect
          {...hierarchicalSelectProps}
          multiple={true}
          error={!!error || (!!errors && !!name && !!errors[name])}
        />
      </Field>
    );
  }
);

MultiSelectField.displayName = 'MultiSelectField';
