import React, { ReactNode } from 'react';

import { cn } from '@ncobase/utils';

export const isActionColumn = (key: string = ''): boolean => {
  const actionKeys = ['actions', 'action', '操作', 'operation', 'operations'];
  return actionKeys.includes(key.toLowerCase());
};

interface ITableRowProps {
  className?: string;
  children?: React.ReactNode;
  level?: number;
  item: any;
  expandedContent?: React.ReactNode | ((item: any) => React.ReactNode);
  isExpanded: boolean;
  onToggleExpand: () => void;
  renderNestedRows: (children: any[], level: number) => ReactNode;
  maxLevel: number;
}

export const TableRow: React.FC<ITableRowProps> = ({
  className,
  children,
  level = 0,
  item,
  expandedContent,
  isExpanded,
  onToggleExpand,
  renderNestedRows,
  maxLevel
}) => {
  if (!children) return null;

  const hasChildren = item?.children && item?.children?.length > 0;

  const canExpand = hasChildren && (maxLevel === -1 || level < maxLevel);

  const classes = cn(
    'odd:bg-white even:bg-gray-50 [&>th]:font-medium [&>th]:text-slate-600 text-slate-500 font-normal',
    '[&>th:first-child]:sticky [&>th:first-child]:left-0 [&>th:first-child]:z-10 [&>th:last-child]:sticky [&>th:last-child]:right-0 [&>th:last-child]:z-10',
    '[&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:last-child]:sticky [&>td:last-child]:right-0 [&>td:last-child]:z-10',
    canExpand ? 'cursor-pointer' : '',
    className
  );

  const renderExpandedContent = (): ReactNode => {
    if (expandedContent) {
      return typeof expandedContent === 'function' ? expandedContent(item) : expandedContent;
    }
    return renderNestedRows(item.children, level + 1);
  };

  return (
    <>
      <tr className={classes} onClick={canExpand ? onToggleExpand : undefined}>
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && index === 0) {
            return React.cloneElement(child, {
              className: cn(child.props.className),
              ...child.props
            });
          }
          return child;
        })}
      </tr>
      {canExpand && isExpanded && renderExpandedContent()}
    </>
  );
};
