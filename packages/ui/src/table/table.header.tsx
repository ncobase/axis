import React from 'react';

import { cn } from '@tone/utils';

import { Checkbox } from '../forms';

import { useTable } from './table.context';
import { TableHeaderCell, TableRow } from './table.row';

interface ITableHeaderProps {
  className?: string;
}

export const TableHeader: React.FC<ITableHeaderProps> = ({ className }) => {
  const { selected, header } = useTable();
  const calsses = cn(
    'sticky top-0 left-0 z-50 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );
  return (
    <thead className={calsses}>
      <TableRow>
        {selected && (
          <TableHeaderCell filter={false} className='w-4'>
            <Checkbox className='rounded-sm' />
          </TableHeaderCell>
        )}
        {header.map((props, index) => (
          <TableHeaderCell key={index} {...props} />
        ))}
      </TableRow>
    </thead>
  );
};
