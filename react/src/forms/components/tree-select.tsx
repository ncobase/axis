import React from 'react';

import { FieldProps } from '../types';

import { HierarchicalSelect, HierarchicalSelectProps } from './hierarchical-select';

export interface TreeSelectProps extends Omit<HierarchicalSelectProps & FieldProps, 'children'> {}

export const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  ({ error, errors, name, ...hierarchicalSelectProps }, ref) => {
    return (
      <HierarchicalSelect
        {...hierarchicalSelectProps}
        error={!!error || (!!errors && !!name && !!errors[name])}
        ref={ref}
      />
    );
  }
);

TreeSelect.displayName = 'TreeSelect';
