import React, { useMemo, useState } from 'react';

import { cn } from '@tone/utils';

import { Table } from './table';
import { TableProvider } from './table.context';
import { EmptyData } from './table.empty';
import { Pagination } from './table.pagination';
import { ITableHeaderCellProps } from './table.row';

interface ITableViewProps {
  paginated?: boolean;
  selected?: boolean;
  className?: string;
  data: any[];
  header: ITableHeaderCellProps[];
  pageSize?: number;
}

export const TableView: React.FC<ITableViewProps> = ({
  paginated = true,
  selected,
  data,
  header,
  pageSize = 10,
  className
}) => {
  const tableContextValue = useMemo(
    () => ({ selected, paginated, header, data, pageSize }),
    [selected, paginated, header, data, pageSize]
  );

  const [currentPage, setCurrentPage] = useState(1);

  const classes = cn(
    'flex flex-col justify-between h-full bg-white rounded-md overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  if (!data.length) return <EmptyData className={classes} />;

  if (!paginated) {
    return (
      <TableProvider value={tableContextValue}>
        <div className={classes}>
          <div className='flex-0 inline-flex overflow-auto'>
            <Table data={data} />
          </div>
        </div>
      </TableProvider>
    );
  }

  const totalItems = data.length;
  const clampedPageSize = Math.min(pageSize, totalItems);
  const lastItemIndex = currentPage * clampedPageSize;
  const firstItemIndex = lastItemIndex - clampedPageSize;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <TableProvider value={tableContextValue}>
      <div className={classes}>
        <div className='flex-0 inline-flex overflow-auto'>
          <Table data={currentItems} />
        </div>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </TableProvider>
  );
};
