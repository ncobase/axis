import React from 'react';

import { cn } from '@tone/utils';

import { DropdownTrigger, DropdownContent, DropdownItem, Dropdown } from '../dropdown';
import { Icons } from '../icon';

import { TableDataCellActions } from './actions';

export interface ITableHeaderCellProps {
  className?: string;
  keyName?: string;
  parser?: any;
  name?: string;
  children?: React.ReactNode;
  icon?: string;
  actions?: any;
}

export const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  keyName,
  name,
  icon,
  className,
  children
}) => {
  if (
    (keyName || '').toLocaleLowerCase() === 'actions' ||
    (name || '').toLocaleLowerCase() === 'actions'
  ) {
    return <th scope='col' className={cn('bg-gray-50 text-start', className)} />;
  }

  return (
    <th scope='col' className={cn('bg-gray-50 text-start', className)}>
      <div className='h-9 w-full flex cursor-pointer items-center justify-between gap-x-1.5 px-3 py-2'>
        <div className='flex items-center gap-x-1.5 break-keep'>
          {icon && <Icons name={icon} className='stroke-slate-400/65' size={14} />}
          {children ? children : name}
        </div>
        <div className='flex ml-3 gap-x-1'>
          {/* <div className='flex items-center'>
   <Icons name='IconFilterCheck' size={12} />
   </div> */}
          <Dropdown>
            <DropdownTrigger>
              <Icons name='IconChevronDown' />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem className='py-1'>
                <Icons name='IconSortAZ' size={18} className='stroke-slate-400' />
              </DropdownItem>
              <DropdownItem className='py-1'>
                <Icons name='IconSortZA' size={18} className='stroke-slate-400' />
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    </th>
  );
};

export interface ITableDataCellProps extends ITableHeaderCellProps {
  className?: string;
  children?: React.ReactNode;
  record?: any;
}

export const TableDataCell: React.FC<ITableDataCellProps> = ({
  className,
  children,
  record,
  keyName,
  name,
  parser,
  actions
}) => {
  if (
    (keyName || '').toLocaleLowerCase() === 'actions' ||
    (name || '').toLocaleLowerCase() === 'actions'
  ) {
    return <ActionCell actions={actions} />;
  }

  return (
    <td
      className={cn(
        'h-11 min-w-8 after:absolute after:w-full border-b-[0.03125rem] border-gray-100 hover:bg-gray-50 truncate',
        className
      )}
      title={record[keyName] || ''}
    >
      <div className='w-full h-full max-w-full px-3 py-2 flex items-center'>
        {children ? children : parser ? parser(record[keyName]) : record[keyName]}
      </div>
    </td>
  );
};

interface ITableRowProps {
  className?: string;
  children?: React.ReactNode;
  index?: number;
}

export const TableRow: React.FC<ITableRowProps> = ({ className, children, index }) => {
  if (!children) return null;

  return (
    <tr
      className={cn(
        'odd:bg-white even:bg-gray-50 [&>th]:font-medium [&>th]:text-slate-600 text-slate-500',
        '[&>th:first-child]:sticky [&>th:first-child]:left-0 [&>th:first-child]:z-10 [&>th:last-child]:sticky [&>th:last-child]:right-0 [&>th:last-child]:z-10',
        '[&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:last-child]:sticky [&>td:last-child]:right-0 [&>td:last-child]:z-10',
        index % 2 === 0
          ? '[&>td]:bg-white [&>td]:hover:bg-gray-50]'
          : '[&>td]:bg-gray-50 [&>td]:hover:bg-gray-50',
        className
      )}
    >
      {children}
    </tr>
  );
};

export const ActionCell: React.FC<{ actions: any }> = ({ actions }) => {
  return (
    <td className='h-11 min-w-8 after:absolute after:w-full border-b-[0.03125rem] border-gray-100 hover:bg-gray-50 truncate'>
      <div className='w-full h-full inline-flex px-2 hover:[&>button]:bg-white [&>button]:p-2 [&>button]:rounded-full items-center justify-center'>
        <TableDataCellActions actions={actions} />
      </div>
    </td>
  );
};
