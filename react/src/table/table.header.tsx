import React from 'react';

import { cn } from '@ncobase/utils';

import { Button } from '../button';
import { Checkbox } from '../forms';
import { Icons } from '../icon';

import type { ITableBodyProps } from './table.body';
import { TableHeaderCell } from './table.cell';
import { useTable } from './table.context';
import { TableRow } from './table.row';

interface ITableHeaderProps {
  className?: string;
  expandComponent?: ITableBodyProps['expandComponent'];
  maxTreeLevel?: ITableBodyProps['maxTreeLevel'];
}

export const TableHeader: React.FC<ITableHeaderProps> = ({
  className,
  expandComponent,
  maxTreeLevel
}) => {
  const {
    selected,
    columns = [],
    onSelectAllRows,
    selectedRows,
    internalData,
    onExpandAll,
    onCollapseAll,
    isAllExpanded
  } = useTable();

  const classes = cn(
    'sticky top-0 left-0 z-50 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  const handleSelectAll = () => {
    if (!Array.isArray(internalData)) return;
    if (selectedRows?.length === internalData.length) {
      onSelectAllRows?.([]);
    } else {
      onSelectAllRows?.(internalData);
    }
  };

  const isAllSelected = selectedRows?.length === internalData?.length && internalData?.length > 0;

  const canTree =
    (maxTreeLevel !== undefined && maxTreeLevel !== 0) ||
    (expandComponent !== undefined && expandComponent !== null);

  return (
    <thead className={classes}>
      <TableRow>
        {selected && (
          <TableHeaderCell title='selection' filter={false} className='!w-4'>
            <Checkbox
              className='rounded-sm'
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
          </TableHeaderCell>
        )}
        {canTree && (
          <TableHeaderCell title='tree' filter={false} className='!w-0 [&>div]:!px-1'>
            <Button
              onClick={isAllExpanded ? onCollapseAll : onExpandAll}
              variant='unstyle'
              size='ratio'
            >
              <Icons name={isAllExpanded ? 'IconList' : 'IconListTree'} className='stroke-2' />
            </Button>
          </TableHeaderCell>
        )}
        {columns.map((props, index) => (
          <TableHeaderCell key={index} {...props} />
        ))}
      </TableRow>
    </thead>
  );
};
