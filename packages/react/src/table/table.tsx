import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cleanJsonValues, cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { TableBody } from './table.body';
import { ITableContext, TableProvider } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface PaginationParams {
  limit?: number;
  cursor?: string;
  filter?: { [key: string]: any };
}

export interface PaginationResult<T> {
  items: T[];
  total: number;
  next_cursor?: string;
  prev_cursor?: string;
  has_next_page?: boolean;
  has_prev_page?: boolean;
}

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
  pageSize: initialPageSize,
  pageSizes = [5, 10, 20, 50, 100],
  paginationTexts,
  emptyDataLabel,
  className,
  filter = { enabled: false, config: {} },
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);
  const [internalData, setInternalData] = useState(initialData || []);
  const [originalData, setOriginalData] = useState(initialData || []);
  const [total, setTotal] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [cursorStack, setCursorStack] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(filter.config);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const isBackendPagination = !!fetchData;

  const loadData = useCallback(
    async (params: PaginationParams) => {
      if (!isBackendPagination)
        return {
          items: originalData,
          total: originalData.length,
          has_next_page: false,
          has_prev_page: false
        };
      setLoading(true);
      try {
        const result = await fetchData(cleanJsonValues(params) as PaginationParams);
        setInternalData(result?.items || []);
        setOriginalData(result?.items || []);
        setTotal(result?.total || 0);
        setCursor(result?.next_cursor || null);
        setHasNextPage(result?.has_next_page || false);
        setHasPrevPage(result?.has_prev_page || false);
        return result || { items: [], total: 0, has_next_page: false, has_prev_page: false };
      } catch (error) {
        console.error('Error fetching data:', error);
        return { items: [], total: 0, has_next_page: false, has_prev_page: false };
      } finally {
        setLoading(false);
      }
    },
    [isBackendPagination, originalData, fetchData]
  );

  useEffect(() => {
    if (isBackendPagination && !internalData.length) {
      loadData({ limit: currentPageSize });
    } else if (!isBackendPagination) {
      setInternalData(initialData || []);
      setOriginalData(initialData || []);
    }
  }, [isBackendPagination, currentPageSize, initialData, loadData]);

  const handleFilter = useCallback(
    newFilter => {
      setCurrentFilter(newFilter);
      setCurrentPage(1);
      setCursor(null);
      setCursorStack([]);
      if (isBackendPagination) {
        loadData({ limit: currentPageSize, filter: newFilter });
      }
    },
    [isBackendPagination, currentPageSize, loadData]
  );

  const handlePageChange = useCallback(
    async newPage => {
      if (isBackendPagination) {
        if (newPage > currentPage && cursor) {
          const result = await loadData({ cursor, limit: currentPageSize });
          if (result) {
            setCursorStack(prev => [...prev, cursor]);
            setCurrentPage(newPage);
          }
        } else if (newPage < currentPage && cursorStack.length > 0) {
          const prevCursor = cursorStack[cursorStack.length - 2] || null;
          const result = await loadData({ cursor: prevCursor, limit: currentPageSize });
          if (result) {
            setCursorStack(prev => prev.slice(0, -1));
            setCurrentPage(newPage);
          }
        }
      } else {
        setCurrentPage(newPage);
      }
    },
    [isBackendPagination, currentPage, cursor, currentPageSize, loadData, cursorStack]
  );

  const handlePageSizeChange = useCallback(
    newSize => {
      setCurrentPageSize(newSize);
      setCurrentPage(1);
      setCursor(null);
      setCursorStack([]);
      if (isBackendPagination) {
        loadData({ limit: newSize });
      }
    },
    [isBackendPagination, loadData]
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
    if (!isBackendPagination && filter?.enabled && currentFilter) {
      return internalData.filter(item =>
        Object.entries(currentFilter).every(([key, value]) => {
          const itemValue = item[key];
          return (
            itemValue && itemValue.toString().toLowerCase().includes(value.toString().toLowerCase())
          );
        })
      );
    }
    return internalData || [];
  }, [internalData, filter, currentFilter, isBackendPagination]);

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
            hasNextPage={
              isBackendPagination
                ? hasNextPage
                : currentPage * currentPageSize < filteredData.length
            }
            hasPrevPage={isBackendPagination ? hasPrevPage : currentPage > 1}
          />
        )}
      </div>
    </TableProvider>
  );
};
