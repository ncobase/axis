import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { TableBody } from './table.body';
import { ITableContext, TableProvider } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface TableViewProps extends ITableContext {
  fetchData?: (params: {
    cursor: string | null;
    limit: number;
    filter: Record<string, any>;
  }) => Promise<{
    content: any[];
    total: number;
    nextCursor: string | null;
  }>;
  className?: string;
  filter?: {
    enabled: boolean;
    config: Record<string, any>;
  };
}

export const TableView: React.FC<TableViewProps> = ({
  header,
  data: initialData,
  fetchData,
  selected,
  paginated,
  pageSize: initialPageSize = 20,
  pageSizes = [5, 10, 20, 50, 100],
  paginationTexts,
  emptyDataLabel,
  className,
  filter = { enabled: false, config: {} },
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);
  const [data, setData] = useState(initialData || []);
  // TODO: remove this, use remote data instead
  const [originalData, setOriginalData] = useState(initialData || []);
  const [total, setTotal] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState(filter.config);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const isBackendPagination = !!fetchData;

  useEffect(() => {
    if (!isBackendPagination) {
      setData(initialData || []);
      setOriginalData(initialData || []);
      setTotal(initialData?.length || 0);
    }
  }, [initialData, isBackendPagination]);

  const loadData = useCallback(
    async (cursor: string | null, limit: number, filter: Record<string, any>) => {
      if (!isBackendPagination) return;
      setLoading(true);
      try {
        const result = await fetchData({
          cursor: cursor || '',
          limit,
          filter
        });
        setData(result.content);
        setTotal(result.total);
        setCursor(result.nextCursor);
        return result;
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [fetchData, isBackendPagination]
  );

  useEffect(() => {
    if (isBackendPagination) {
      loadData(null, currentPageSize, currentFilter);
    }
  }, [loadData, currentPageSize, currentFilter, isBackendPagination]);

  const handleFilter = useCallback(
    (newFilter: Record<string, any>) => {
      setCurrentFilter(newFilter);
      setCurrentPage(1);
      if (isBackendPagination) {
        setCursor(null);
        setCursorStack([]);
      }
    },
    [isBackendPagination]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (isBackendPagination) {
        if (newPage > currentPage) {
          const result = await loadData(cursor, currentPageSize, currentFilter);
          if (result) {
            setCursorStack(prev => [...prev, cursor]);
            setCurrentPage(newPage);
          }
        } else if (newPage < currentPage && cursorStack.length > 0) {
          const prevCursor = cursorStack[cursorStack.length - 2] || null;
          const result = await loadData(prevCursor, currentPageSize, currentFilter);
          if (result) {
            setCursorStack(prev => prev.slice(0, -1));
            setCurrentPage(newPage);
          }
        }
      } else {
        setCurrentPage(newPage);
      }
    },
    [
      currentPage,
      cursor,
      currentPageSize,
      currentFilter,
      loadData,
      cursorStack,
      isBackendPagination
    ]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setCurrentPageSize(newSize);
      setCurrentPage(1);
      if (isBackendPagination) {
        setCursor(null);
        setCursorStack([]);
        loadData(null, newSize, currentFilter);
      }
    },
    [currentFilter, loadData, isBackendPagination]
  );

  const handleRowSelection = useCallback((row: any) => {
    setSelectedRows(prev => {
      const isSelected = prev.some(selectedRow => selectedRow.id === row.id);
      if (isSelected) {
        return prev.filter(selectedRow => selectedRow.id !== row.id);
      } else {
        return [...prev, row];
      }
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!isBackendPagination && filter?.enabled && filter?.config) {
      return data.filter(item =>
        Object.entries(filter.config).every(([key, value]) => {
          const itemValue = item[key];
          return (
            itemValue && itemValue.toString().toLowerCase().includes(value.toString().toLowerCase())
          );
        })
      );
    }
    return data;
  }, [data, filter, isBackendPagination]);

  const paginatedData = useMemo(() => {
    if (!isBackendPagination && paginated) {
      const startIndex = (currentPage - 1) * currentPageSize;
      return filteredData.slice(startIndex, startIndex + currentPageSize);
    }
    return filteredData;
  }, [filteredData, currentPage, currentPageSize, paginated, isBackendPagination]);

  const tableContextValue = useMemo(
    () => ({
      header,
      data: paginatedData,
      setData,
      originalData,
      setOriginalData,
      selected,
      paginated,
      pageSize: currentPageSize,
      pageSizes,
      paginationTexts,
      emptyDataLabel,
      filter: {
        ...filter,
        config: currentFilter,
        onFilterChange: handleFilter
      },
      selectedRows,
      onSelectRow: handleRowSelection,
      ...rest
    }),
    [
      header,
      paginatedData,
      selected,
      paginated,
      currentPageSize,
      pageSizes,
      paginationTexts,
      emptyDataLabel,
      filter,
      currentFilter,
      handleFilter,
      selectedRows,
      handleRowSelection,
      rest
    ]
  );

  const classes = cn(
    'flex flex-col justify-between h-full bg-white rounded-md overflow-auto shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  if (paginatedData.length === 0 && !loading) {
    return <EmptyData className={classes} label={emptyDataLabel} />;
  }

  return (
    <TableProvider value={tableContextValue}>
      <div className={classes}>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <TableHeader />
            <TableBody data={paginatedData} />
          </table>
        </div>
        {paginated && (
          <Pagination
            totalItems={isBackendPagination ? total : filteredData.length}
            pageSize={currentPageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            pageSizes={pageSizes}
            texts={paginationTexts}
          />
        )}
      </div>
    </TableProvider>
  );
};
