import React, { useMemo, useState } from 'react';

import { cn } from '@tone/utils';

import { Table } from './table';
import { ITableContext, TableProvider } from './table.context';
import { EmptyData } from './table.empty';
import { Pagination } from './table.pagination';

export interface TableViewProps extends ITableContext {}

export const TableView: React.FC<TableViewProps> = ({
  header,
  data,
  selected,
  paginated = true,
  pageSize = 10,
  className,
  filter = { enabled: false, config: {} },
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!filter?.enabled || !filter?.config) {
      return data;
    }

    return data.filter(item =>
      Object.entries(filter.config).every(([key, value]) => {
        const itemValue = item[key];
        return itemValue && itemValue.toString().includes(value.toString());
      })
    );
  }, [data, filter]);

  const tableContextValue = useMemo(
    () => ({
      header,
      data: filteredData,
      selected,
      paginated,
      pageSize,
      filter,
      ...rest
    }),
    [header, filteredData, selected, paginated, pageSize, filter, rest]
  );

  const classes = cn(
    'flex flex-col justify-between h-full bg-white rounded-md overflow-hidden shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  if (!filteredData.length) return <EmptyData className={classes} />;

  if (!paginated) {
    return (
      <TableProvider value={tableContextValue}>
        <div className={classes}>
          <div className='flex-0 inline-flex overflow-auto'>
            <Table data={filteredData} />
          </div>
        </div>
      </TableProvider>
    );
  }

  const totalItems = filteredData.length;
  const clampedPageSize = Math.min(pageSize, totalItems);
  const lastItemIndex = currentPage * clampedPageSize;
  const firstItemIndex = lastItemIndex - clampedPageSize;
  const currentItems = filteredData.slice(firstItemIndex, lastItemIndex);

  return (
    <TableProvider value={tableContextValue}>
      <div className={classes}>
        <Table data={currentItems} />
        {paginated && (
          <Pagination
            totalItems={filteredData.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </TableProvider>
  );
};
