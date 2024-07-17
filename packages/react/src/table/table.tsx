import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cleanJsonValues, cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { TableBody } from './table.body';
import { ITableContext, TableProvider } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface TableViewProps extends ITableContext {
  data?: any[];
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
  pageSize,
  pageSizes = [5, 10, 20, 50, 100],
  paginationTexts,
  emptyDataLabel,
  className,
  filter = { enabled: false, config: {} },
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [internalData, setInternalData] = useState(initialData || []);
  const [originalData, setOriginalData] = useState(initialData || []);
  const [total, setTotal] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorStack, setCursorStack] = useState<string[]>([]);
  const [currentFilter, setCurrentFilter] = useState(filter.config);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const isBackendPagination = !!fetchData && !initialData?.length;

  const loadData = useCallback(
    async (cursor?: string, limit?: number) => {
      if (!isBackendPagination) return;
      setLoading(true);
      try {
        const result = await fetchData(cleanJsonValues({ cursor, limit }));
        setInternalData(result?.items || []);
        setOriginalData(result?.items || []);
        setTotal(result?.total || 0);
        setCursor(result?.next);
        return result || {};
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    },
    [isBackendPagination, fetchData]
  );

  useEffect(() => {
    if (isBackendPagination && !internalData?.length && !initialData?.length) {
      loadData('', currentPageSize);
    } else if (!isBackendPagination && initialData?.length) {
      setInternalData(initialData || []);
      setOriginalData(initialData || []);
    }
  }, [isBackendPagination, currentPageSize, initialData, loadData, fetchData]);

  const handleFilter = useCallback(
    (newFilter: Record<string, any>) => {
      setCurrentFilter(newFilter);
      setCurrentPage(1);
      setCursor(null);
      setCursorStack([]);
      if (isBackendPagination) {
        loadData('', currentPageSize);
      }
    },
    [isBackendPagination, loadData, currentPageSize, fetchData]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (isBackendPagination) {
        if (newPage > currentPage) {
          const result = await loadData(cursor, currentPageSize);
          if (result) {
            setCursorStack(prev => [...prev, cursor as string]);
            setCurrentPage(newPage);
          }
        } else if (newPage < currentPage && cursorStack.length > 0) {
          const prevCursor = cursorStack[cursorStack.length - 2] || null;
          const result = await loadData(prevCursor, currentPageSize);
          if (result) {
            setCursorStack(prev => prev.slice(0, -1));
            setCurrentPage(newPage);
          }
        }
      } else {
        setCurrentPage(newPage);
      }
    },
    [currentPage, cursor, currentPageSize, loadData, cursorStack, isBackendPagination]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setCurrentPageSize(newSize);
      setCurrentPage(1);
      setCursor(null);
      setCursorStack([]);
      if (isBackendPagination) {
        loadData('', newSize);
      }
    },
    [loadData, isBackendPagination]
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
      return internalData.filter(item =>
        Object.entries(filter.config).every(([key, value]) => {
          const itemValue = item[key];
          return (
            itemValue && itemValue.toString().toLowerCase().includes(value.toString().toLowerCase())
          );
        })
      );
    }
    return internalData || [];
  }, [internalData, filter, isBackendPagination]);

  const paginatedData = useMemo(() => {
    if (!isBackendPagination && paginated) {
      const startIndex = (currentPage - 1) * currentPageSize;
      return filteredData?.slice(startIndex, startIndex + currentPageSize);
    }
    return filteredData || [];
  }, [filteredData, currentPage, currentPageSize, paginated, isBackendPagination]);

  const tableContextValue = useMemo(
    () => ({
      header,
      internalData: paginatedData,
      setInternalData,
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
