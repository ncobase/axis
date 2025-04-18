import React, { createContext, useContext, useEffect, useState } from 'react';

import { isArray, isUndefined } from '@ncobase/utils';

import type { PaginationParams, PaginationResult } from './table';
import type { ITableBodyProps } from './table.body';
import type { ITableHeaderCellProps } from './table.cell';
import type { IPaginationProps } from './table.pagination';

export interface ITableContext<T = any> {
  // eslint-disable-next-line no-unused-vars
  fetchData?: (params: PaginationParams) => Promise<PaginationResult<T>>;
  loadData?: any;
  internalData?: ITableBodyProps<T>['data'];
  // eslint-disable-next-line no-unused-vars
  setInternalData?: (internalData: ITableBodyProps<T>['data']) => void;
  originalData?: ITableBodyProps<T>['data'];
  // eslint-disable-next-line no-unused-vars
  setOriginalData?: (data: ITableBodyProps<T>['data']) => void;
  isBackendPagination?: boolean;
  header?: ITableHeaderCellProps[];
  columns?: ITableHeaderCellProps[];
  // eslint-disable-next-line no-unused-vars
  setColumns?: (header: ITableHeaderCellProps[]) => void;
  // eslint-disable-next-line no-unused-vars
  toggleColumn?: (key: string) => void;
  paginated?: boolean;
  pageSize?: IPaginationProps['pageSize'];
  paginationTexts?: IPaginationProps['texts'];
  pageSizes?: IPaginationProps['pageSizes'];
  selected?: boolean;
  visibleControl?: boolean;
  className?: string;
  selectedRows?: ITableBodyProps<T>['data'];
  emptyDataLabel?: string;
  noMoreDataLabel?: string;
  // eslint-disable-next-line no-unused-vars
  onSelectRow?: (row: T) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllRows?: (rows: string | ITableBodyProps<T>['data']) => void;
  actions?: {
    [key: string]: () => void;
  };
  onExpandAll?: () => void;
  onCollapseAll?: () => void;
  isAllExpanded?: boolean;
  filter?: {
    enabled: boolean;
    config: Record<string, { value?: string | string[]; sortOrder?: 'asc' | 'desc' | null }>;
  };
  // eslint-disable-next-line no-unused-vars
  setFilter?: (filter: ITableContext<T>['filter']) => void;
}

const defaultTableContext: ITableContext = {
  internalData: [],
  header: [],
  selectedRows: [],
  filter: {
    enabled: false,
    config: {}
  }
};

const TableContext = createContext<ITableContext>(defaultTableContext);

export const TableProvider: React.FC<{ value: ITableContext; children: React.ReactNode }> = ({
  value,
  children
}) => {
  const [columns, setColumns] = useState<ITableHeaderCellProps[]>(defaultTableContext.header || []);
  const [selectedRows, setSelectedRows] = useState<any[]>(defaultTableContext.selectedRows || []);
  const [filter, setFilter] = useState<ITableContext['filter']>(defaultTableContext.filter);
  const [isAllExpanded, setIsAllExpanded] = useState(value.isAllExpanded || false);

  useEffect(() => {
    if (value.header && value.header.length > 0) {
      setColumns(value.header);
    }
  }, [value.header]);

  const handleSelectRow = (row: any) => {
    const isSelected = selectedRows?.some(r => r.id === row.id);
    const updatedSelectedRows = isSelected
      ? selectedRows.filter(r => r.id !== row.id)
      : [...selectedRows, row];

    // Recursive selection for child rows
    const recursivelySelectChildren = (children: any[], selected: any[]) => {
      children.forEach(child => {
        const isChildSelected = selected.some(r => r.id === child.id);
        if (isSelected && isChildSelected) {
          selected = selected.filter(r => r.id !== child.id);
        } else if (!isSelected && !isChildSelected) {
          selected.push(child);
        }
        if (child.children && child.children.length > 0) {
          selected = recursivelySelectChildren(child.children, selected);
        }
      });
      return selected;
    };

    if (row.children && row.children.length > 0) {
      setSelectedRows(recursivelySelectChildren(row.children, updatedSelectedRows));
    } else {
      setSelectedRows(updatedSelectedRows);
    }
  };

  const handleSelectAllRows = (rows: string | any[]) => {
    const flattenRows = (data: any[]): any[] => {
      return data.reduce((acc, item) => {
        acc.push(item);
        if (item.children && item.children.length > 0) {
          acc = acc.concat(flattenRows(item.children));
        }
        return acc;
      }, []);
    };

    if (isArray(rows)) {
      if (rows.length === 0) {
        setSelectedRows([]);
      } else {
        const allRows = flattenRows(rows as any[]);
        setSelectedRows(allRows);
      }
    } else {
      setSelectedRows(value.internalData || []);
    }
  };

  const tableContextValue: ITableContext = {
    ...defaultTableContext,
    ...value,
    columns,
    setColumns,
    selectedRows,
    toggleColumn: (key: string) => {
      const newHeader = columns.map(column =>
        // column visible is a undefined value, set it to false
        // reason: if not set, visible will be undefined, and the default value will be true
        column.accessorKey === key
          ? { ...column, visible: isUndefined(column.visible) ? false : !column.visible }
          : column
      );
      setColumns(newHeader || []);
    },
    filter,
    setFilter,
    onSelectRow: handleSelectRow,
    onSelectAllRows: handleSelectAllRows,
    onExpandAll: () => setIsAllExpanded(true),
    onCollapseAll: () => setIsAllExpanded(false),
    isAllExpanded
  };

  return <TableContext.Provider value={tableContextValue}>{children}</TableContext.Provider>;
};

export const useTable = () => useContext(TableContext);
