import React from 'react';

import { cn } from '@tone/utils';

import { TableBody } from './table.body';
import { TableHeader } from './table.header';

interface ITableProps {
  className?: string;
  data: any[];
}

export const Table: React.FC<ITableProps> = ({ className, data }) => {
  const classes = cn(
    'divide-y divide-slate-100 border-0 w-full table-auto inline-table',
    className
  );

  return (
    <table className={classes}>
      <TableHeader />
      <TableBody data={data} />
    </table>
  );
};
