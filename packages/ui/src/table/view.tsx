import React, { useState } from 'react';

import { cn } from '@tone/utils';

import { EmptyData } from './empty';
import { Pagination } from './pagination';
import { ITableHeaderCellProps } from './row';
import { Table } from './table';

interface ITableViewProps {
  className?: string;
  data: any[];
  header: ITableHeaderCellProps[];
  itemsPerPage?: number;
}

export const TableView: React.FC<ITableViewProps> = ({
  data,
  header,
  itemsPerPage = 10,
  className
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = data.length;
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = data.slice(firstItemIndex, lastItemIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (!data.length) return <EmptyData />;

  return (
    <div
      className={cn(
        'flex flex-col justify-between h-full bg-white rounded-md mt-4 overflow-hidden',
        className
      )}
    >
      <div className='flex-0 inline-flex overflow-auto'>
        <Table data={currentItems} header={header} />
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
