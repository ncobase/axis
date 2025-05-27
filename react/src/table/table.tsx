import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { cleanJsonValues, cn } from '@ncobase/utils';

import { EmptyData } from './components/empty';
import { BatchOperation, BatchOperations } from './features/batch_operations';
import { GlobalSearch } from './features/global_search';
import { ImportExportFeature } from './features/import_export';
import { KeyboardNavigation } from './features/keyboard_navigation';
import { type ITableBodyProps, TableBody } from './table.body';
import { type ITableContext, TableProvider, FilterConfig } from './table.context';
import { TableHeader } from './table.header';
import { Pagination } from './table.pagination';

export interface PaginationParams {
  children?: boolean;
  cursor?: string | null;
  limit?: number;
  direction?: 'forward' | 'backward';
  filter?: Record<string, any>;
}

export interface PaginationResult<T> {
  items: T[];
  total: number;
  next_cursor?: string;
  prev_cursor?: string;
  has_next_page?: boolean;
  has_prev_page?: boolean;
}

export interface TableViewProps<T = any> extends Partial<ITableContext<T>> {
  data?: T[];
  className?: string;
  loading?: boolean;
  filter?: {
    enabled: boolean;
    config: Record<string, FilterConfig>;
  };
  expandComponent?: ITableBodyProps<T>['expandComponent'];
  maxTreeLevel?: ITableBodyProps<T>['maxTreeLevel'];
  enableEditing?: boolean;
  enableColumnResize?: boolean;
  enableRowHighlight?: boolean;
  enableColumnHighlight?: boolean;
  enableAdvancedFilters?: boolean;
  enableKeyboardNavigation?: boolean;
  showImportExport?: boolean;
  showGlobalSearch?: boolean;
  batchOperations?: BatchOperation[];
  onCellValueChange?: (_key: string, _value: any, _recordId: string) => void;
}

export const TableView = <T extends Record<string, any> = any>({
  header = [],
  data: initialData = [],
  fetchData,
  loading: initialLoading = false,
  selected = false,
  paginated = false,
  pageSize: initialPageSize = 20,
  pageSizes = [5, 10, 20, 50, 100],
  paginationTexts,
  emptyDataLabel = 'No Data',
  className,
  expandComponent,
  maxTreeLevel,
  isAllExpanded = false,
  filter = { enabled: false, config: {} },
  enableEditing = false,
  enableColumnResize = false,
  enableRowHighlight = true,
  enableColumnHighlight = true,
  enableAdvancedFilters = false,
  enableKeyboardNavigation = false,
  showImportExport = false,
  showGlobalSearch = false,
  batchOperations = [],
  onCellValueChange,
  ...rest
}: TableViewProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);
  const [internalData, setInternalData] = useState<T[]>(initialData);
  const [originalData, setOriginalData] = useState<T[]>(initialData);
  const [total, setTotal] = useState(initialData?.length || 0);
  const [loading, setLoading] = useState(initialLoading);
  const [currentFilter, setCurrentFilter] = useState<Record<string, FilterConfig>>(filter.config);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const isBackendPagination = useMemo(
    () => !!fetchData && !(initialData && initialData.length > 0),
    [fetchData, initialData]
  );

  const loadData = useCallback(
    async (params: PaginationParams): Promise<PaginationResult<T> | undefined> => {
      if (!isBackendPagination || !fetchData) return undefined;

      setLoading(true);
      try {
        const result = await fetchData(cleanJsonValues(params) as PaginationParams);
        if (!result) return undefined;

        setInternalData(result.items || []);
        setOriginalData(result.items || []);
        setTotal(result.total || 0);
        setNextCursor(result.next_cursor || null);
        setPrevCursor(result.prev_cursor || null);
        setHasNextPage(result.has_next_page || false);
        setHasPrevPage(result.has_prev_page || false);
        return result;
      } catch (error) {
        console.error('Error fetching data:', error);
        return {
          items: [],
          total: 0,
          has_next_page: false,
          has_prev_page: false
        };
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

  // Handle cell value change
  const handleCellValueChange = useCallback(
    (key: string, value: any, recordId: string) => {
      if (!key || !recordId) return;

      // Call the callback if provided
      if (onCellValueChange) {
        onCellValueChange(key, value, recordId);
      }

      // Update internal data if editing is enabled
      if (enableEditing) {
        setInternalData(prevData =>
          prevData.map(item => {
            if (item['id'] === recordId) {
              return {
                ...item,
                [key]: value
              };
            }
            return item;
          })
        );
      }
    },
    [enableEditing, onCellValueChange]
  );

  const columnsWithEditing = useMemo(() => {
    if (!enableEditing) return header;

    return header.map(column => ({
      ...column,
      editable: column.accessorKey !== 'action'
    }));
  }, [header, enableEditing]);

  const handleFilter = useCallback(
    (newFilter: React.SetStateAction<Record<string, FilterConfig>>) => {
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

  const handleRowSelection = useCallback((row: T) => {
    if (!row) return;

    const recursivelySelectChildren = (children: T[], selected: T[], select: boolean): T[] => {
      if (!children || !Array.isArray(children)) return selected;

      return children.reduce((acc, child: any) => {
        if (!child || !child.id) return acc;

        const isChildSelected = acc.some((r: any) => r.id === child.id);
        if (select && !isChildSelected) {
          acc.push(child);
        } else if (!select && isChildSelected) {
          acc = acc.filter((r: any) => r.id !== child.id);
        }
        if (child.children && child.children.length > 0) {
          acc = recursivelySelectChildren(child.children, acc, select);
        }
        return acc;
      }, selected);
    };

    setSelectedRows(prev => {
      const isSelected = prev.some((selectedRow: any) => selectedRow.id === (row as any).id);
      const updatedSelectedRows = isSelected
        ? prev.filter((selectedRow: any) => selectedRow.id !== (row as any).id)
        : [...prev, row];

      if ((row as any).children && (row as any).children.length > 0) {
        return recursivelySelectChildren((row as any).children, updatedSelectedRows, !isSelected);
      }
      return updatedSelectedRows;
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!isBackendPagination && filter?.enabled && currentFilter) {
      return internalData.filter(item => {
        return Object.entries(currentFilter).every(([key, config]) => {
          // Check for advanced filters
          if (config.advancedFilters && config.advancedFilters.length > 0) {
            // Apply each advanced filter condition
            return config.advancedFilters.every(condition => {
              const itemValue = item[key];
              // Skip if no value to filter on
              if (itemValue === undefined || itemValue === null) return true;
              // Different operators
              switch (condition.operator) {
                case 'contains':
                  return String(itemValue)
                    .toLowerCase()
                    .includes(String(condition.value).toLowerCase());
                case 'equals':
                  return String(itemValue) === String(condition.value);
                case 'startsWith':
                  return String(itemValue)
                    .toLowerCase()
                    .startsWith(String(condition.value).toLowerCase());
                case 'endsWith':
                  return String(itemValue)
                    .toLowerCase()
                    .endsWith(String(condition.value).toLowerCase());
                case 'greaterThan':
                  return Number(itemValue) > Number(condition.value);
                case 'lessThan':
                  return Number(itemValue) < Number(condition.value);
                case 'between':
                  return (
                    Number(itemValue) >= Number(condition.value) &&
                    Number(itemValue) <= Number(condition.valueEnd || condition.value)
                  );
                case 'in': {
                  const valueList = String(condition.value)
                    .split(',')
                    .map(v => v.trim());
                  return valueList.includes(String(itemValue));
                }
                default:
                  return true;
              }
            });
          }

          // Simple text filters
          if (config.value) {
            const itemValue = item[key];
            if (itemValue === undefined || itemValue === null) return false;
            const filterValue = config.value;
            if (Array.isArray(filterValue)) {
              return filterValue.some(val =>
                String(itemValue).toLowerCase().includes(String(val).toLowerCase())
              );
            }
            return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
          }
          return true;
        });
      });
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

  const effectiveMaxTreeLevel = maxTreeLevel !== undefined ? maxTreeLevel : undefined;
  const effectiveExpandComponent = expandComponent || undefined;
  const needsTreeColumn =
    effectiveMaxTreeLevel !== undefined || effectiveExpandComponent !== undefined;

  const tableContextValue = useMemo(
    () => ({
      header: columnsWithEditing,
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
        enabled: filter.enabled,
        config: currentFilter
      },
      setFilter: handleFilter,
      selectedRows,
      onSelectRow: handleRowSelection,
      onSelectAllRows: (rows: T[]) => setSelectedRows(rows),
      // Pass feature flags
      enableColumnResize,
      enableRowHighlight,
      enableColumnHighlight,
      enableAdvancedFilters,
      // Pass the validated tree parameters
      maxTreeLevel: effectiveMaxTreeLevel,
      expandComponent: effectiveExpandComponent,
      onCellValueChange: handleCellValueChange,
      ...rest
    }),
    [
      columnsWithEditing,
      filteredData,
      originalData,
      selected,
      paginated,
      isAllExpanded,
      currentPageSize,
      pageSizes,
      paginationTexts,
      emptyDataLabel,
      filter.enabled,
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
      needsTreeColumn,
      enableColumnResize,
      enableRowHighlight,
      enableColumnHighlight,
      enableAdvancedFilters,
      handleCellValueChange
    ]
  );

  const classes = cn(
    'flex flex-col bg-white rounded-md shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );
  const containerClasses = cn(classes, 'h-full max-h-full flex flex-col');
  if (loading && (!paginatedData || paginatedData.length === 0)) {
    return <EmptyData loading={loading} className={containerClasses} />;
  } else if (!paginatedData || paginatedData.length === 0) {
    return <EmptyData className={containerClasses} label={emptyDataLabel} />;
  }

  return (
    <TableProvider
      value={{
        ...tableContextValue,
        setFilter: (
          filter: React.SetStateAction<{ enabled: boolean; config: Record<string, FilterConfig> }>
        ) => {
          if (typeof filter === 'function') {
            // @ts-expect-error
            handleFilter(prev => filter(prev).config);
          } else {
            handleFilter(filter.config);
          }
        }
      }}
    >
      <div className={containerClasses}>
        {/* Toolbar - Import/Export, Global Search, etc. */}
        {(showImportExport || showGlobalSearch || batchOperations.length > 0) && (
          <div className='flex-none border-b border-gray-100'>
            <div className='flex items-center justify-between p-3'>
              <div className='flex items-center gap-2'>
                {/* Table name */}
                <h3 className='text-lg font-medium'>{rest.title || ''}</h3>
              </div>
              <div className='flex items-center gap-3'>
                {/* Global search */}
                {showGlobalSearch && <GlobalSearch />}
                {/* Import/Export features */}
                {showImportExport && <ImportExportFeature />}
              </div>
            </div>
            {/* Batch operations bar */}
            {batchOperations.length > 0 && <BatchOperations operations={batchOperations} />}
          </div>
        )}
        {/* Table content */}
        <div className='flex-1 flex flex-col min-h-0'>
          {/* Fixed header */}
          <div className='flex-none bg-white'>
            <table className='w-full table-auto'>
              <TableHeader
                expandComponent={effectiveExpandComponent}
                maxTreeLevel={effectiveMaxTreeLevel}
              />
            </table>
          </div>
          {/* Scrollable body */}
          <div className='flex-1 overflow-auto'>
            <table className='w-full table-auto'>
              <TableBody
                data={paginatedData}
                expandComponent={effectiveExpandComponent}
                maxTreeLevel={effectiveMaxTreeLevel}
              />
            </table>
          </div>
        </div>
        {/* Fixed pagination */}
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
        {enableKeyboardNavigation && <KeyboardNavigation />}
      </div>
    </TableProvider>
  );
};
