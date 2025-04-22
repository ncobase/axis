import React, { useEffect, useRef, useState } from 'react';

import { cn, isBoolean, isNumber, isString } from '@ncobase/utils';
import { DateRange } from 'react-day-picker';

import { Actions } from './components/actions';
import { ToggleColumn } from './components/toggle_column';
import { ColumnFilter } from './filters/column';
import { DateFilter } from './filters/date';
import { NumberFilter } from './filters/number';
import { SelectFilter } from './filters/select';
import { SortFilter } from './filters/sort';
import { TextFilter } from './filters/text';
import { useTable } from './table.context';
import { isActionColumn } from './table.row';

import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/forms';
import { Icons } from '@/icon';

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
  parser?: (_value?: any, _record?: T) => React.ReactNode;
  /**
   * column icon
   */
  icon?: string;
  /**
   * column actions, last column will be actions
   */
  actions?: Array<{
    title?: string;
    name?: string;
    label?: string;
    icon?: string;
    onClick?: (_record: T) => void;
  }>;
  /**
   * column editable
   */
  editable?: boolean;
  /**
   * column cell type
   */
  cellType?: 'text' | 'number' | 'select' | 'date';
  /**
   * column options for select type
   */
  options?: { label: string; value: any }[];
  colSpan?: number;
  rowSpan?: number;
  className?: string;
  children?: React.ReactNode;
}

export interface ITableCellProps<T = any> extends ITableCellBaseProps<T> {
  record?: T;
  colSpan?: number;
  rowSpan?: number;
}

interface EditableCellProps {
  value: any;
  record: any;
  accessorKey: string;
  onValueChange: (_key: string, _value: any) => void;
  cellType?: 'text' | 'number' | 'select' | 'date';
  options?: { label: string; value: any }[];
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  accessorKey,
  onValueChange,
  cellType = 'text',
  options = []
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Update editValue when value prop changes
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editValue !== value) {
      onValueChange(accessorKey, editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className='w-full h-full cursor-pointer' onDoubleClick={handleDoubleClick}>
        {cellType === 'select' && options.length > 0
          ? options.find(opt => opt.value === value)?.label || value
          : value !== undefined
            ? value
            : ''}
      </div>
    );
  }

  if (cellType === 'select' && options.length > 0) {
    return (
      <Select
        value={String(editValue ?? '')}
        onValueChange={val => {
          setEditValue(val);
          onValueChange(accessorKey, val);
          setIsEditing(false);
        }}
      >
        <SelectTrigger className='h-8 min-h-0' onBlur={handleBlur}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  if (cellType === 'date') {
    return (
      <Input
        type='date'
        ref={inputRef}
        value={editValue instanceof Date ? editValue.toISOString().split('T')[0] : editValue || ''}
        onChange={e => setEditValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className='h-8 py-1'
      />
    );
  }

  return (
    <Input
      type={cellType === 'number' ? 'number' : 'text'}
      ref={inputRef}
      value={editValue ?? ''}
      onChange={e => setEditValue(cellType === 'number' ? Number(e.target.value) : e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className='h-8 py-1'
    />
  );
};

export const TableCell = <T extends Record<string, any> = any>({
  className,
  children,
  record,
  title,
  visible,
  accessorKey = '',
  parser,
  actions,
  editable = false,
  cellType = 'text',
  options = [],
  colSpan = 1,
  rowSpan = 1
}: ITableCellProps<T>): JSX.Element | null => {
  if (isActionColumn(accessorKey) || isActionColumn(title)) {
    return <ActionCell record={record} actions={actions} />;
  }

  if (isBoolean(visible) && !visible) return null;

  const { onCellValueChange, highlightedColumn, enableColumnHighlight } = useTable();

  const isHighlighted = enableColumnHighlight && highlightedColumn === accessorKey;

  const classes = cn(
    'h-11 min-w-8 border-b-[0.03125rem] border-gray-100 truncate',
    isHighlighted && 'bg-blue-50/75',
    className
  );

  const getValueFromRecord = (key: string): any => {
    if (!record) return undefined;

    if (typeof key === 'string' && key.includes('.')) {
      const keys = key.split('.');
      return keys.reduce((acc, k) => {
        return acc && typeof acc === 'object' ? acc[k] : undefined;
      }, record);
    }

    return record[key];
  };

  const value = getValueFromRecord(accessorKey);

  const formatValue = (val: any): string | number | undefined => {
    if (val === null || val === undefined) return '';

    if (typeof val === 'object') {
      return JSON.stringify(val);
    }

    return val;
  };

  const formattedValue = formatValue(value);
  const tdAttributes = {
    title: isString(formattedValue) || isNumber(formattedValue) ? String(formattedValue) : undefined
  };

  const handleCellValueChange = (key: string, newValue: any) => {
    if (onCellValueChange && record) {
      onCellValueChange(key, newValue, record['id']);
    }
  };

  return (
    <td className={classes} {...tdAttributes} colSpan={colSpan} rowSpan={rowSpan}>
      <div className='w-full h-full max-w-full px-3 py-2 flex items-center'>
        {children ? (
          children
        ) : editable ? (
          <EditableCell
            value={formattedValue}
            record={record}
            accessorKey={accessorKey}
            onValueChange={handleCellValueChange}
            cellType={cellType}
            options={options}
          />
        ) : parser && record ? (
          parser(formattedValue, record)
        ) : (
          formattedValue
        )}
      </div>
    </td>
  );
};

export const ActionCell = <T extends Record<string, any> = any>({
  actions = [],
  record
}: ITableCellProps<T>): JSX.Element => {
  return (
    <td className='h-11 min-w-8 border-b-[0.03125rem] border-gray-100 truncate'>
      <div className='w-full h-full inline-flex px-2 [&>button]:hover:bg-white [&>button]:p-2 [&>button]:rounded-full items-center justify-center'>
        <Actions record={record} actions={actions} />
      </div>
    </td>
  );
};

export interface ITableHeaderCellProps extends ITableCellBaseProps {
  filter?: 'sort' | 'date' | 'select' | 'number' | 'text' | 'toggle' | boolean;
  filterConfig?: {
    min?: number;
    max?: number;
    step?: number;
    options?: { label: string; value: string | number }[];
    placeholder?: string;
  };
  style?: React.CSSProperties;
}

export const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  visible,
  filter = 'sort',
  filterConfig = {},
  style,
  title,
  accessorKey = '',
  icon,
  className,
  children
}) => {
  const {
    filter: filterState,
    setFilter,
    visibleControl,
    highlightedColumn,
    setHighlightedColumn,
    enableColumnHighlight,
    enableAdvancedFilters
  } = useTable();

  const [filterValue, setFilterValue] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  // Sync filter value and sort order with the table's filter state
  useEffect(() => {
    if (filterState?.config?.[accessorKey]?.value !== filterValue && setFilter) {
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...(prevFilter?.config || {}),
          [accessorKey]: {
            ...(prevFilter?.config?.[accessorKey] || {}),
            value: filterValue
          }
        }
      }));
    }
  }, [filterValue, accessorKey, filterState?.config, setFilter]);

  useEffect(() => {
    if (filterState?.config?.[accessorKey]?.sortOrder !== sortOrder && setFilter) {
      setFilter(prevFilter => ({
        ...prevFilter,
        config: {
          ...(prevFilter?.config || {}),
          [accessorKey]: {
            ...(prevFilter?.config?.[accessorKey] || {}),
            sortOrder
          }
        }
      }));
    }
  }, [sortOrder, accessorKey, filterState?.config, setFilter]);

  if (isBoolean(visible) && !visible) return null;

  const isHighlighted = enableColumnHighlight && highlightedColumn === accessorKey;
  const classes = cn('bg-gray-50 text-start', isHighlighted && 'bg-blue-50/75', className);

  const handleMouseEnter = () => {
    if (enableColumnHighlight && setHighlightedColumn) {
      setHighlightedColumn(accessorKey);
    }
  };

  const handleMouseLeave = () => {
    if (enableColumnHighlight && setHighlightedColumn) {
      setHighlightedColumn(null);
    }
  };

  if (isActionColumn(accessorKey) || isActionColumn(title)) {
    return (
      <th scope='col' className={cn(classes, className, 'text-center w-8')}>
        <div className='h-11 w-full flex items-center justify-between gap-x-1.5 px-3 py-2'>
          {visibleControl && <ToggleColumn />}
        </div>
      </th>
    );
  }

  const handleDateFilterChange = (dateRange: DateRange) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      config: {
        ...(prevFilter?.config || {}),
        [accessorKey]: {
          ...(prevFilter?.config?.[accessorKey] || {}),
          dateRange,
          enabled: dateRange.from !== null || dateRange.to !== null
        }
      }
    }));
  };

  const handleSelectFilterChange = (selectedValues: (string | number)[]) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      config: {
        ...(prevFilter?.config || {}),
        [accessorKey]: {
          ...(prevFilter?.config?.[accessorKey] || {}),
          selectedValues,
          enabled: selectedValues.length > 0
        }
      }
    }));
  };

  const handleNumberFilterChange = (range: [number | null, number | null]) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      config: {
        ...(prevFilter?.config || {}),
        [accessorKey]: {
          ...(prevFilter?.config?.[accessorKey] || {}),
          numberRange: range,
          enabled: range[0] !== null || range[1] !== null
        }
      }
    }));
  };

  const handleTextFilterChange = (value: string) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      config: {
        ...(prevFilter?.config || {}),
        [accessorKey]: {
          ...(prevFilter?.config?.[accessorKey] || {}),
          value,
          enabled: value !== ''
        }
      }
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleSortChange = (order: 'asc' | 'desc' | null) => {
    setSortOrder(order);
  };

  const isSpecialColumn = (key: string = ''): boolean => {
    if (!key) return true;
    const specialColumns = [...(isActionColumn(key) ? [key] : [])];
    return specialColumns.includes(key);
  };

  return (
    <th
      scope='col'
      className={cn(classes, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      <div className='h-11 w-full flex cursor-pointer items-center justify-between gap-x-1.5 px-3 py-2'>
        <div className='flex items-center gap-x-1.5 break-keep'>
          {icon && <Icons name={icon} className='stroke-slate-400/65' size={14} />}
          {children ? children : title}
          {enableAdvancedFilters && !isSpecialColumn(accessorKey) && (
            <ColumnFilter column={accessorKey} />
          )}
        </div>
        <div className='flex items-center'>
          {filter && (
            <>
              {filter === 'sort' && (
                <SortFilter
                  accessorKey={accessorKey}
                  filterValue={filterValue}
                  handleFilterChange={handleFilterChange}
                  handleSortChange={handleSortChange}
                />
              )}
              {filter === 'date' && (
                <DateFilter
                  accessorKey={accessorKey}
                  filterValue={filterValue}
                  handleFilterChange={handleDateFilterChange}
                />
              )}
              {filter === 'select' && (
                <SelectFilter
                  accessorKey={accessorKey}
                  options={filterConfig.options || []}
                  handleFilterChange={handleSelectFilterChange}
                />
              )}
              {filter === 'number' && (
                <NumberFilter
                  accessorKey={accessorKey}
                  min={filterConfig.min}
                  max={filterConfig.max}
                  step={filterConfig.step}
                  handleFilterChange={handleNumberFilterChange}
                />
              )}
              {filter === 'text' && (
                <TextFilter
                  accessorKey={accessorKey}
                  placeholder={filterConfig.placeholder}
                  handleFilterChange={handleTextFilterChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </th>
  );
};

export const ResizableHeaderCell: React.FC<ITableHeaderCellProps> = props => {
  const { columnWidths, setColumnWidth, enableColumnResize } = useTable();
  const resizeRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const { accessorKey = '' } = props;

  const width = columnWidths?.[accessorKey] || 'auto';

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableColumnResize) return;

    e.preventDefault();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = resizeRef.current?.parentElement?.getBoundingClientRect().width || 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const newWidth = Math.max(startWidth + e.clientX - startX, 50);
      if (setColumnWidth) {
        setColumnWidth(accessorKey, newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <TableHeaderCell {...props} className={cn(props.className, 'relative')} style={{ width }}>
      {enableColumnResize && (
        <div
          ref={resizeRef}
          className='absolute right-0 top-0 h-full w-2 cursor-col-resize bg-transparent hover:bg-blue-200'
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </TableHeaderCell>
  );
};
