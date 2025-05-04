import React, { type ReactNode, useCallback } from 'react';

import { cn } from '@ncobase/utils';

import { useTable } from './table.context';

import { Button } from '@/button';
import { Icons } from '@/icon';

export const isActionColumn = (key: string = ''): boolean => {
  const actionKeys = [
    'action-column',
    'actionColumn',
    '操作列',
    'operation-column',
    'operationColumn'
  ];
  return actionKeys.includes(key.toLowerCase());
};

export const isTreeColumn = (key: string = ''): boolean => {
  const treeKeys = ['tree', '树', 'treeRow', 'treeRows', 'trees'];
  return treeKeys.includes(key.toLowerCase());
};

interface ITableRowProps {
  className?: string;
  children?: React.ReactNode;
  level?: number;
  item?: any;
  expandComponent?: React.ReactNode | ((_item: any) => React.ReactNode);
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  renderNestedRows?: (_children: any[], _level: number) => ReactNode;
  maxTreeLevel?: number;
}

export const TableRow: React.FC<ITableRowProps> = ({
  className,
  children,
  level = 0,
  item,
  expandComponent,
  isExpanded,
  onToggleExpand = () => {},
  renderNestedRows,
  maxTreeLevel
}) => {
  if (!children) return null;

  const { highlightedRow, setHighlightedRow, enableRowHighlight } = useTable();
  const isHighlighted = enableRowHighlight && highlightedRow === item?.id;
  const hasChildren = item?.children && item?.children?.length > 0;
  const hasExpandedContent = Boolean(expandComponent);

  const canTree =
    (hasChildren || hasExpandedContent) &&
    maxTreeLevel !== undefined &&
    (maxTreeLevel === -1 || level < maxTreeLevel);

  const classes = cn(
    'odd:bg-white even:bg-gray-50 [&>th]:font-medium [&>th]:text-slate-600 text-slate-500 font-normal',
    hasExpandedContent && 'cursor-pointer',
    isHighlighted && 'bg-blue-50/75 hover:bg-blue-50/75',
    className
  );

  const handleRowMouseEnter = useCallback(() => {
    if (enableRowHighlight && setHighlightedRow) {
      setHighlightedRow(item?.id || null);
    }
  }, [enableRowHighlight, item?.id, setHighlightedRow]);

  const handleRowMouseLeave = useCallback(() => {
    if (enableRowHighlight && setHighlightedRow) {
      setHighlightedRow(null);
    }
  }, [enableRowHighlight, setHighlightedRow]);

  const handleToggleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleExpand();
    },
    [onToggleExpand]
  );

  const renderExpandedContent = (): ReactNode => {
    if (hasExpandedContent) {
      return (
        <tr>
          <td colSpan={React.Children.count(children)} className='p-0'>
            <div className='p-4 bg-gray-50 border-t border-gray-200'>
              {typeof expandComponent === 'function' ? expandComponent(item) : expandComponent}
            </div>
          </td>
        </tr>
      );
    }
    return renderNestedRows?.(item.children, level + 1);
  };

  return (
    <>
      <tr
        className={classes}
        onClick={hasExpandedContent ? onToggleExpand : undefined}
        onMouseEnter={handleRowMouseEnter}
        onMouseLeave={handleRowMouseLeave}
      >
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          const childProps = child.props as React.PropsWithChildren<any>;
          const childTitle = childProps?.title;
          const childAccessorKey = childProps?.accessorKey;

          const isExpandField =
            isTreeColumn(childTitle || childAccessorKey) ||
            index === 0 ||
            (index === 1 && !React.isValidElement(Array.isArray(children) ? children[0] : null));

          if (canTree && isExpandField) {
            return React.cloneElement(child, {
              className: cn(childProps.className),
              children: (
                <>
                  {canTree && (
                    <Button
                      variant='unstyle'
                      size='ratio'
                      onClick={handleToggleClick}
                      className={cn(
                        'p-1 rounded-full hover:bg-gray-200 transition-colors duration-200',
                        level > 0 ? `ml-${level * 2}` : ''
                      )}
                    >
                      <Icons name={isExpanded ? 'IconChevronDown' : 'IconChevronRight'} size={16} />
                    </Button>
                  )}
                  {childProps.children}
                </>
              ),
              ...childProps
            });
          }

          const isNameField = childAccessorKey === 'name';
          const additionalClassName = isNameField && level > 0 ? `pl-${level * 2}` : '';

          return React.cloneElement(child, {
            className: cn(childProps.className, additionalClassName),
            ...childProps
          });
        })}
      </tr>
      {canTree && isExpanded && renderExpandedContent()}
    </>
  );
};

export default TableRow;
