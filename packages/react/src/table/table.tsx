import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cleanJsonValues, cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { TableBody } from './table.body';
import { ITableContext, TableProvider } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface PaginationParams {
  cursor?: string;
  limit?: number;
  direction?: 'forward' | 'backward';
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
  loading?: boolean;
  filter?: {
    enabled: boolean;
    config: Record<string, any>;
  };
}

export const TableView: React.FC<TableViewProps> = ({
  header,
  data: initialData,
  fetchData,
  loading: initialLoading = false,
  selected,
  paginated,
  pageSize: initialPageSize,
  pageSizes = [5, 10, 20, 50, 100],
  paginationTexts,
  emptyDataLabel = 'No Data',
  className,
  filter = { enabled: false, config: {} },
  ...rest
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize || 20);
  const [internalData, setInternalData] = useState(initialData || []);
  const [originalData, setOriginalData] = useState(initialData || []);
  const [total, setTotal] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(initialLoading || false);
  const [currentFilter, setCurrentFilter] = useState(filter.config);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const isBackendPagination = useMemo(
    () => !!fetchData && !initialData?.length,
    [fetchData, initialData?.length]
  );

  const loadData = useCallback(
    async (params: PaginationParams) => {
      if (!isBackendPagination || !fetchData) return;
      setLoading(true);
      try {
        const result = await fetchData(cleanJsonValues(params) as PaginationParams);
        setInternalData(result?.items || []);
        setOriginalData(result?.items || []);
        setTotal(result?.total || 0);
        setNextCursor(result?.next_cursor || null);
        setPrevCursor(result?.prev_cursor || null);
        setHasNextPage(result?.has_next_page || false);
        setHasPrevPage(result?.has_prev_page || false);
      } catch (error) {
        console.error('Error fetching data:', error);
        return { items: [], total: 0, has_next_page: false, has_prev_page: false };
      } finally {
        setLoading(false);
      }
    },
    [isBackendPagination, fetchData]
  );

  useEffect(() => {
    if (isBackendPagination && !internalData.length && !initialData?.length) {
      loadData({ limit: currentPageSize });
    } else if (!isBackendPagination && initialData?.length) {
      setInternalData(initialData || []);
      setOriginalData(initialData || []);
      setTotal(initialData?.length);
    }
  }, [isBackendPagination, currentPageSize, initialData, loadData]);

  const handleFilter = useCallback(
    (newFilter: React.SetStateAction<Record<string, any>>) => {
      setCurrentFilter(newFilter);
      setCurrentPage(1);
      if (isBackendPagination) {
        loadData({ limit: currentPageSize, filter: newFilter });
      }
    },
    [isBackendPagination, currentPageSize, loadData]
  );

  const handlePageChange = useCallback(
    async (newPage: number) => {
      if (isBackendPagination) {
        const direction = newPage > currentPage ? 'forward' : 'backward';
        const cursor = direction === 'forward' ? nextCursor : prevCursor;
        await loadData({
          cursor,
          limit: currentPageSize,
          direction,
          filter: currentFilter
        });
      }
      setCurrentPage(newPage);
    },
    [
      isBackendPagination,
      currentPage,
      nextCursor,
      prevCursor,
      currentPageSize,
      loadData,
      currentFilter
    ]
  );

  const handlePageSizeChange = useCallback(
    (newSize: number) => {
      setCurrentPageSize(newSize);
      setCurrentPage(1);
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
      internalData: filteredData,
      setInternalData,
      originalData,
      setOriginalData,
      isBackendPagination,
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

  if (loading) {
    return <EmptyData loading={loading} className={classes} />;
  } else if (paginatedData.length === 0 && currentPage === 1) {
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
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </div>
    </TableProvider>
  );
};
