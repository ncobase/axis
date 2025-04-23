import React from 'react';

import { HierarchicalSelect, HierarchicalSelectProps } from '../components';
import { Field } from '../fields';
import { FieldProps } from '../types';

export interface TreeSelectFieldProps
  extends Omit<HierarchicalSelectProps & FieldProps, 'children'> {}

export const TreeSelectField = React.forwardRef<HTMLDivElement, TreeSelectFieldProps>(
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
          error={!!error || (!!errors && !!name && !!errors[name])}
        />
      </Field>
    );
  }
);

TreeSelectField.displayName = 'TreeSelectField';
