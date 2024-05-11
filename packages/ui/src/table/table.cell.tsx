import React, { useState, useEffect } from 'react';

import { cn, isString, isNumber, isUndefined, isBoolean } from '@tone/utils';

import { Button } from '../button';
import {
  Dropdown,
  DropdownCheckboxItem,
  DropdownContent,
  DropdownItem,
  DropdownTrigger
} from '../dropdown';
import { Input } from '../forms';
import { Icons } from '../icon';

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
   * column key
   */
  code?: string;
  /**
   * column value parser
   */
  parser?: T;
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

interface ITableCellProps extends ITableCellBaseProps {
  record?: any;
}

const TableCell: React.FC<ITableCellProps> = ({
  className,
  children,
  record,
  title,
  visible,
  code,
  parser,
  actions
}) => {
  if (isActionColumn(code) || isActionColumn(title)) {
    return <ActionCell record={record} actions={actions} />;
  }

  if (isBoolean(visible) && !visible) return null;

  const classes = cn(
    'h-11 min-w-8 after:absolute after:w-full border-b-[0.03125rem] border-gray-100 truncate',
    className
  );

  const tdAttributes = {
    title: isString(record?.[code]) || isNumber(record?.[code]) ? record[code] : undefined
  };

  return (
    <td className={classes} {...tdAttributes}>
      <div className='w-full h-full max-w-full px-3 py-2 flex items-center'>
        {children ? children : parser ? parser(record?.[code], record) : record?.[code]}
      </div>
    </td>
  );
};

const ActionCell: React.FC<ITableCellProps> = ({ actions = [], record }) => {
  return (
    <td className='h-11 min-w-8 after:absolute after:w-full border-b-[0.03125rem] border-gray-100 truncate'>
      <div className='w-full h-full inline-flex px-2 hover:[&>button]:bg-white [&>button]:p-2 [&>button]:rounded-full items-center justify-center'>
        <DropdownWrapper icon='IconDotsVertical'>
          {actions.map((action: any, index: number) => (
            <DropdownItem
              key={index}
              onClick={() => action?.onClick?.(record)}
              className='flex items-center space-x-2'
            >
              {action?.icon && <Icons name={action?.icon} className='-ml-0.5' />}
              <span>{action?.title || action?.name || action?.label}</span>
            </DropdownItem>
          ))}
        </DropdownWrapper>
      </div>
    </td>
  );
};

export interface ITableHeaderCellProps extends ITableCellBaseProps {
  filter?: boolean;
}

const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  visible,
  filter = true, // TODO: implement filter
  title,
  code,
  icon,
  className,
  children
}) => {
  const { filter: filterState, setFilter, visibleControl } = useTable();
  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  useEffect(() => {
    if (filterState.config[code]?.value !== filterValue) {
      // @ts-expect-error
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...prevFilter.config,
          [code]: {
            ...prevFilter.config[code],
            value: filterValue
          }
        }
      }));
    }
  }, [filterValue, code]);

  useEffect(() => {
    if (filterState.config[code]?.sortOrder !== sortOrder) {
      // @ts-expect-error
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...prevFilter.config,
          [code]: {
            ...prevFilter.config[code],
            sortOrder
          }
        }
      }));
    }
  }, [sortOrder, code]);

  if (isBoolean(visible) && !visible) return null;

  const classes = 'bg-gray-50 text-start';

  if (isActionColumn(code) || isActionColumn(title)) {
    return (
      <th scope='col' className={cn(classes, className, 'text-center w-8')}>
        <div className='h-9 w-full flex items-center justify-between gap-x-1.5 px-3 py-2'>
          {visibleControl && <CustomColumn />}
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
        {filter && (
          <FilterDropdown
            code={code}
            filterValue={filterValue}
            handleFilterChange={handleFilterChange}
            handleSortChange={handleSortChange}
          />
        )}
      </div>
    </th>
  );
};

const FilterDropdown: React.FC<{
  code: string;
  filterValue: string;
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (order: 'asc' | 'desc' | null) => void;
}> = ({ code, filterValue, handleFilterChange, handleSortChange }) => {
  const { filter: filterState } = useTable();

  return (
    <DropdownWrapper icon='IconChevronDown'>
      <DropdownItem onSelect={event => event.preventDefault()} className='hover:bg-white'>
        <Input
          type='text'
          value={filterValue}
          onChange={handleFilterChange}
          placeholder='Search...'
          className='max-w-28 py-1.5'
        />
      </DropdownItem>
      <DropdownItem
        onClick={() => handleSortChange('asc')}
        className={cn(
          'flex items-center gap-x-1',
          filterState.config[code]?.sortOrder === 'asc' &&
            'bg-slate-100 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortAZ' className='stroke-slate-400' />
        升序
      </DropdownItem>
      <DropdownItem
        onClick={() => handleSortChange('desc')}
        className={cn(
          'flex items-center gap-x-1',
          filterState.config[code]?.sortOrder === 'desc' &&
            'bg-slate-100 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortZA' className='stroke-slate-400' />
        降序
      </DropdownItem>
      {filterState.config[code]?.sortOrder && (
        <DropdownItem onClick={() => handleSortChange(null)} className='flex items-center gap-x-1'>
          <Icons name='IconRestore' className='stroke-slate-400' />
          重置
        </DropdownItem>
      )}
    </DropdownWrapper>
  );
};

const DropdownWrapper: React.FC<{ icon: string; children: React.ReactNode }> = ({
  icon,
  children
}) => {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant='unstyle' size='ratio' className='p-1 outline-none'>
          <Icons name={icon} />
        </Button>
      </DropdownTrigger>
      <DropdownContent>{children}</DropdownContent>
    </Dropdown>
  );
};

const CustomColumn: React.FC = () => {
  const { columns, toggleColumn } = useTable();
  return (
    <DropdownWrapper icon='IconColumns'>
      {columns.map((column, index) =>
        isActionColumn(column.code) || isActionColumn(column.title) ? null : (
          <DropdownCheckboxItem
            key={index}
            className='py-2'
            checked={isUndefined(column.visible) || (isBoolean(column.visible) && column.visible)}
            onCheckedChange={() => toggleColumn(column.code || '')}
          >
            {column.title}
          </DropdownCheckboxItem>
        )
      )}
    </DropdownWrapper>
  );
};

export { TableCell, TableHeaderCell };
