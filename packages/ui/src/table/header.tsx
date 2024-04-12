import React from 'react';

import { cn } from '@tone/utils';

import { TableHeaderCell, ITableHeaderCellProps, TableRow } from './row';

interface ITableHeaderProps {
  className?: string;
  header: ITableHeaderCellProps[];
}

export const TableHeader: React.FC<ITableHeaderProps> = ({ className, header }) => {
  return (
    <thead
      className={cn(
        'sticky top-0 left-0 z-50 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
        className
      )}
    >
      <TableRow>
        {header.map((props, index) => (
          <TableHeaderCell key={index} {...props} />
        ))}
      </TableRow>
    </thead>
  );
};
