import React, { ReactNode, useState } from 'react';

import { Checkbox } from '../forms';

import { TableCell } from './table.cell';
import { useTable } from './table.context';
import { TableRow } from './table.row';

export interface ITableBodyProps<T = any> {
  className?: string;
  data: T[];
  expandedContent?: React.ReactNode | ((item: T) => React.ReactNode);
  maxLevel?: number;
}

export const TableBody: React.FC<ITableBodyProps> = ({
  className,
  data,
  expandedContent,
  maxLevel = -1 // -1 means no limit
}) => {
  const { selected, selectedRows, columns = [], onSelectRow } = useTable();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const isSelected = (record: any) => selectedRows.includes(record);

  const toggleExpand = (itemId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const renderRow = (item: any, level: number = 0): ReactNode => {
    const itemId = item.id || JSON.stringify(item);
    return (
      <TableRow
        key={itemId}
        level={level}
        item={item}
        expandedContent={expandedContent}
        isExpanded={expandedRows.has(itemId)}
        onToggleExpand={() => toggleExpand(itemId)}
        renderNestedRows={(children, nextLevel) =>
          maxLevel === -1 || nextLevel <= maxLevel
            ? children.map(child => renderRow(child, nextLevel))
            : null
        }
        maxLevel={maxLevel}
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
