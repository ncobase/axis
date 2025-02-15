import React, { type ReactNode, useEffect, useState, useMemo } from 'react';

import { Checkbox } from '../forms';

import { TableCell } from './table.cell';
import { useTable } from './table.context';
import { TableRow } from './table.row';

export interface ITableBodyProps<T = any> {
  className?: string;
  data: T[];
  expandComponent?: React.ReactNode | ((item: T) => React.ReactNode);
  maxTreeLevel?: number;
}

export const TableBody: React.FC<ITableBodyProps> = ({
  className,
  data,
  expandComponent,
  maxTreeLevel = -1
}) => {
  const {
    selected,
    selectedRows = [],
    columns = [],
    onSelectRow = () => {},
    isAllExpanded
  } = useTable();
  const [treeRows, setTreedRows] = useState<Set<string>>(new Set());

  const isSelected = (record: any) => selectedRows.includes(record);

  const toggleExpand = (itemId: string) => {
    setTreedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const allExpandableIds = useMemo(() => {
    const ids = new Set<string>();
    const addIds = (items: any[], level: number = 0) => {
      items.forEach(item => {
        if (item.id) {
          ids.add(item.id);
        }
        if (item.children && (maxTreeLevel === -1 || level < maxTreeLevel)) {
          addIds(item.children, level + 1);
        }
      });
    };
    addIds(data);
    return ids;
  }, [data, maxTreeLevel]);

  useEffect(() => {
    if (isAllExpanded) {
      setTreedRows(allExpandableIds);
    } else {
      setTreedRows(new Set());
    }
  }, [isAllExpanded, allExpandableIds]);

  const renderRow = (item: any, level: number = 0): ReactNode => {
    const itemId = item.id || JSON.stringify(item);
    const canTree = maxTreeLevel !== undefined || expandComponent !== undefined;

    return (
      <TableRow
        key={itemId}
        level={level}
        item={item}
        expandComponent={expandComponent}
        isExpanded={treeRows.has(itemId)}
        onToggleExpand={() => toggleExpand(itemId)}
        renderNestedRows={(children, nextLevel) =>
          maxTreeLevel === -1 || nextLevel <= maxTreeLevel
            ? children.map(child => renderRow(child, nextLevel))
            : null
        }
        maxTreeLevel={maxTreeLevel}
      >
        {selected && (
          <TableCell key='selection' title='selection' record={item}>
            <Checkbox
              className='rounded-sm'
              checked={isSelected(item)}
              onCheckedChange={() => onSelectRow(item)}
            />
          </TableCell>
        )}
        {canTree && (
          <TableCell
            key='tree'
            title='tree'
            record={item}
            className='!w-0 [&>div]:!px-0 [&>div]:!pl-2'
          />
        )}
        {columns.map(column => (
          <TableCell key={column.code || column.title || 'default'} {...column} record={item} />
        ))}
      </TableRow>
    );
  };

  const renderRows = (items: any[], level: number = 0): ReactNode => {
    return items.map(item => renderRow(item, level));
  };

  return <tbody className={className}>{renderRows(data)}</tbody>;
};
