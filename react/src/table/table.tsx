import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cleanJsonValues, cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { type ITableBodyProps, TableBody } from './table.body';
import { type ITableContext, TableProvider } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface PaginationParams {
  children?: boolean;
  cursor?: string | null;
  limit?: number;
  direction?: 'forward' | 'backward';
  filter?: { [key: string]: any };
}

export interface PaginationResult<T> {
  items: ITableBodyProps<T>['data'];
  total: number;
  next_cursor?: string;
  prev_cursor?: string;
  has_next_page?: boolean;
  has_prev_page?: boolean;
}

export interface TableViewProps extends ITableContext {
  data?: ITableBodyProps['data'];
  className?: string;
  loading?: boolean;
  filter?: {
    enabled: boolean;
    config: Record<string, any>;
  };
  expandComponent?: ITableBodyProps['expandComponent'];
  maxTreeLevel?: ITableBodyProps['maxTreeLevel'];
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
  expandComponent,
  maxTreeLevel,
  isAllExpanded,
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
    () => !!fetchData && !(initialData && initialData.length > 0),
    [fetchData, initialData]
  );

  const loadData = useCallback(
    async (params: PaginationParams): Promise<any> => {
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
        return result;
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
    if (isBackendPagination && internalData.length === 0) {
      loadData({ limit: currentPageSize });
    } else if (!isBackendPagination && initialData) {
      setInternalData(initialData);
      setOriginalData(initialData);
      setTotal(initialData.length);
    }
  }, [isBackendPagination, currentPageSize, initialData, loadData, internalData.length]);

  // Update when initialData changes
  useEffect(() => {
    if (initialData) {
      setInternalData(initialData);
      setOriginalData(initialData);
      setTotal(initialData.length);
    }
  }, [initialData]);

  const handleFilter = useCallback(
    (newFilter: React.SetStateAction<Record<string, any>>) => {
      setCurrentFilter(prev => {
        const updatedFilter = typeof newFilter === 'function' ? newFilter(prev) : newFilter;
        setCurrentPage(1);
        if (isBackendPagination) {
          loadData({ limit: currentPageSize, filter: updatedFilter });
        }
        return updatedFilter;
      });
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
    const recursivelySelectChildren = (children: any[], selected: any[], select: boolean) => {
      children.forEach(child => {
        const isChildSelected = selected.some(r => r.id === child.id);
        if (select && !isChildSelected) {
          selected.push(child);
        } else if (!select && isChildSelected) {
          selected = selected.filter(r => r.id !== child.id);
        }
        if (child.children && child.children.length > 0) {
          selected = recursivelySelectChildren(child.children, selected, select);
        }
      });
      return selected;
    };

    setSelectedRows(prev => {
      const isSelected = prev.some(selectedRow => selectedRow.id === row.id);
      const updatedSelectedRows = isSelected
        ? prev.filter(selectedRow => selectedRow.id !== row.id)
        : [...prev, row];

      if (row.children && row.children.length > 0) {
        return recursivelySelectChildren(row.children, updatedSelectedRows, !isSelected);
      }
      return updatedSelectedRows;
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!isBackendPagination && filter?.enabled && currentFilter) {
      return internalData.filter(item =>
        Object.entries(currentFilter).every(([key, value]) => {
          if (!value) return true;
          const itemValue = item[key];
          return (
            itemValue && itemValue.toString().toLowerCase().includes(value.toString().toLowerCase())
          );
        })
      );
    }
    return internalData;
  }, [internalData, filter, currentFilter, isBackendPagination]);

  const paginatedData = useMemo(() => {
    if (!isBackendPagination && paginated) {
      const startIndex = (currentPage - 1) * currentPageSize;
      return filteredData.slice(startIndex, startIndex + currentPageSize);
    }
    return filteredData;
  }, [filteredData, currentPage, currentPageSize, paginated, isBackendPagination]);

  const effectiveMaxTreeLevel =
    maxTreeLevel !== undefined && maxTreeLevel !== 0 ? maxTreeLevel : undefined;
  const effectiveExpandComponent = expandComponent || undefined;
  const needsTreeColumn =
    effectiveMaxTreeLevel !== undefined || effectiveExpandComponent !== undefined;

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
      isAllExpanded: needsTreeColumn ? isAllExpanded : undefined,
      pageSize: currentPageSize,
      pageSizes,
      paginationTexts,
      emptyDataLabel,
      filter: {
        ...filter,
        config: currentFilter
      },
      setFilter: handleFilter,
      selectedRows,
      onSelectRow: handleRowSelection,
      // Pass the validated tree parameters
      maxTreeLevel: effectiveMaxTreeLevel,
      expandComponent: effectiveExpandComponent,
      ...rest
    }),
    [
      header,
      filteredData,
      originalData,
      selected,
      paginated,
      isAllExpanded,
      currentPageSize,
      pageSizes,
      paginationTexts,
      emptyDataLabel,
      filter,
      currentFilter,
      handleFilter,
      selectedRows,
      handleRowSelection,
      rest,
      setInternalData,
      setOriginalData,
      isBackendPagination,
      effectiveMaxTreeLevel,
      effectiveExpandComponent,
      needsTreeColumn
    ]
  );

  const classes = cn(
    'flex flex-col justify-between h-full bg-white rounded-md overflow-auto shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );

  if (loading && (!paginatedData || paginatedData.length === 0)) {
    return <EmptyData loading={loading} className={classes} />;
  } else if (!paginatedData || paginatedData.length === 0) {
    return <EmptyData className={classes} label={emptyDataLabel} />;
  }

  return (
    <TableProvider value={tableContextValue}>
      <div className={classes}>
        <div className='overflow-x-auto'>
          <table className='w-full table-auto'>
            <TableHeader
              expandComponent={effectiveExpandComponent}
              maxTreeLevel={effectiveMaxTreeLevel}
            />
            <TableBody
              data={paginatedData}
              expandComponent={effectiveExpandComponent}
              maxTreeLevel={effectiveMaxTreeLevel}
            />
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
