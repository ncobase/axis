import React from 'react';

import { FieldProps } from '../types';

import { HierarchicalSelect, HierarchicalSelectProps } from './hierarchical-select';

export interface MultiSelectProps extends Omit<HierarchicalSelectProps & FieldProps, 'type'> {
  options: Array<{ label: string; value: any }>;
  placeholder?: string;
  disabled?: boolean;
}
export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ error, errors, name, ...hierarchicalSelectProps }, ref) => {
    return (
      <HierarchicalSelect
        {...hierarchicalSelectProps}
        multiple={true}
        error={!!error || (!!errors && !!name && !!errors[name])}
        ref={ref}
      />
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
