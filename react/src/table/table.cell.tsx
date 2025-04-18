import React, { useEffect, useState } from 'react';

import { cn, isBoolean, isNumber, isString } from '@ncobase/utils';

import { Icons } from '../icon';

import { Actions } from './components/actions';
import { ToggleColumn } from './components/toggle_column';
import { SortFilter } from './filters/sort';
import { useTable } from './table.context';
import { isActionColumn } from './table.row';

export interface ITableCellBaseProps<T = any> {
  /**
   * this column will be visible, default is true
   */
  visible?: boolean;
  /**
   * column title
   */
  title?: string;
  /**
   * column accessor key
   */
  accessorKey?: string;
  /**
   * column value parser
   */
  // eslint-disable-next-line no-unused-vars
  parser?: (value?: string, record?: T) => React.ReactNode | T;
  /**
   * column icon
   */
  icon?: string;
  /**
   * column actions, last column will be actions
   */
  actions?: T[];
  className?: string;
  children?: React.ReactNode;
}

interface ITableCellProps<T extends object> extends ITableCellBaseProps {
  record?: T;
}

const TableCell: React.FC<ITableCellProps<any>> = ({
  className,
  children,
  record,
  title,
  visible,
  accessorKey = '',
  parser,
  actions
}) => {
  if (isActionColumn(accessorKey) || isActionColumn(title)) {
    return <ActionCell record={record} actions={actions} />;
  }

  if (isBoolean(visible) && !visible) return null;

  const classes = cn('h-11 min-w-8 border-b-[0.03125rem] border-gray-100 truncate', className);

  const getValueFromRecord = (key: string | string[] | object) => {
    if (Array.isArray(key)) {
      return key.map((k: string | number) => record?.[k]).filter(val => val !== undefined);
    } else if (typeof key === 'object') {
      return Object.entries(key).reduce(
        (acc, [k, v]) => {
          acc[k] = record?.[v];
          return acc;
        },
        {} as Record<string, any>
      );
    } else if (typeof key === 'string' && key.includes('.')) {
      const keys = key.split('.');
      return keys.reduce((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), record);
    } else {
      return record?.[key];
    }
  };

  const value = getValueFromRecord(accessorKey);

  const formatValue = (val: any) => {
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val);
    }
    return val;
  };

  const tdAttributes = {
    title: isString(value) || isNumber(value) ? value : undefined
  };

  return (
    <td className={classes} {...tdAttributes}>
      <div className='w-full h-full max-w-full px-3 py-2 flex items-center'>
        {children ? children : parser ? parser(formatValue(value), record) : formatValue(value)}
      </div>
    </td>
  );
};

const ActionCell: React.FC<ITableCellProps<any>> = ({ actions = [], record }) => {
  return (
    <td className='h-11 min-w-8 border-b-[0.03125rem] border-gray-100 truncate'>
      <div className='w-full h-full inline-flex px-2 hover:[&>button]:bg-white [&>button]:p-2 [&>button]:rounded-full items-center justify-center'>
        <Actions record={record} actions={actions} />
      </div>
    </td>
  );
};

export interface ITableHeaderCellProps extends ITableCellBaseProps {
  filter?: 'sort' | 'toggle' | 'date' | 'date-range' | boolean;
}

const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  visible,
  filter = 'sort',
  title,
  accessorKey = '',
  icon,
  className,
  children
}) => {
  const { filter: filterState, setFilter, visibleControl } = useTable();
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    if (filterState?.config[accessorKey]?.value !== filterValue) {
      // @ts-expect-error
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...prevFilter.config,
          [accessorKey]: {
            ...prevFilter.config[accessorKey],
            value: filterValue
          }
        }
      }));
    }
  }, [filterValue, accessorKey]);

  useEffect(() => {
    if (filterState?.config[accessorKey]?.sortOrder !== sortOrder) {
      // @ts-expect-error
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...prevFilter.config,
          [accessorKey]: {
            ...prevFilter.config[accessorKey],
            sortOrder
          }
        }
      }));
    }
  }, [sortOrder, accessorKey]);

  if (isBoolean(visible) && !visible) return null;

  const classes = 'bg-gray-50 text-start';

  if (isActionColumn(accessorKey) || isActionColumn(title)) {
    return (
      <th scope='col' className={cn(classes, className, 'text-center w-8')}>
        <div className='h-9 w-full flex items-center justify-between gap-x-1.5 px-3 py-2'>
          {visibleControl && <ToggleColumn />}
        </div>
      </th>
    );
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleSortChange = (order: 'asc' | 'desc' | null) => {
    setSortOrder(order);
  };

  return (
    <th scope='col' className={cn(classes, className)}>
      <div className='h-9 w-full flex cursor-pointer items-center justify-between gap-x-1.5 px-3 py-2'>
        <div className='flex items-center gap-x-1.5 break-keep'>
          {icon && <Icons name={icon} className='stroke-slate-400/65' size={14} />}
          {children ? children : title}
        </div>
        {filter && filter === 'sort' && (
          <SortFilter
            accessorKey={accessorKey}
            filterValue={filterValue}
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
          />
        )}
      </div>
    </th>
  );
};
export { TableCell, TableHeaderCell };
