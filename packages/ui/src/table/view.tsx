import React, { useState } from 'react';

import { cn } from '@tone/utils';

import { EmptyData } from './empty';
import { Pagination } from './pagination';
import { ITableHeaderCellProps } from './row';
import { Table } from './table';

interface ITableViewProps {
  paginated?: boolean;
  className?: string;
  data: any[];
  header: ITableHeaderCellProps[];
  pageSize?: number;
}

export const TableView: React.FC<ITableViewProps> = ({
  paginated = true,
  data,
  header,
  pageSize = 20,
  className
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!data.length) return <EmptyData />;

  const classes = cn(
    'flex flex-col justify-between h-full bg-white rounded-md mt-4 overflow-hidden',
    className
  );

  if (!paginated) {
    return (
      <div className={classes}>
        <div className='flex-0 inline-flex overflow-auto'>
          <Table data={data} header={header} />
        </div>
      </div>
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
    <div className={classes}>
      <div className='flex-0 inline-flex overflow-auto'>
        <Table data={currentItems} header={header} />
      </div>
      <Pagination
        totalItems={totalItems}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
