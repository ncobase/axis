import React from 'react';

import { cn } from '@tone/utils';

import { TableBody } from './body';
import { TableHeader } from './header';
import { ITableHeaderCellProps } from './row';

interface ITableProps {
  className?: string;
  data: any[];
  header: ITableHeaderCellProps[];
}

export const Table: React.FC<ITableProps> = ({ data, header, className }) => {
  return (
    <table
      className={cn('divide-y divide-slate-100 border-0 w-full table-auto inline-table', className)}
    >
      <TableHeader header={header} />
      <TableBody header={header} data={data} />
    </table>
  );
};
