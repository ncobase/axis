import React, { ReactNode } from 'react';

import { cn } from '@ncobase/utils';

import { Button } from '../button';
import { Icons } from '../icon';

export const isActionColumn = (key: string = ''): boolean => {
  const actionKeys = ['actions', 'action', '操作', 'operation', 'operations'];
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
  expandComponent?: React.ReactNode | ((item: any) => React.ReactNode);
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  renderNestedRows?: (children: any[], level: number) => ReactNode;
  maxTreeLevel?: number;
}

export const TableRow: React.FC<ITableRowProps> = ({
  className,
  children,
  level = 0,
  item,
  expandComponent,
  isExpanded,
  onToggleExpand,
  renderNestedRows,
  maxTreeLevel
}) => {
  if (!children) return null;

  const hasChildren = item?.children && item?.children?.length > 0;
  const hasExpandedContent = Boolean(expandComponent);

  const canTree =
    (hasChildren || hasExpandedContent) && (maxTreeLevel === -1 || level < maxTreeLevel);

  const classes = cn(
    'odd:bg-white even:bg-gray-50 [&>th]:font-medium [&>th]:text-slate-600 text-slate-500 font-normal',
    '[&>th:first-child]:sticky [&>th:first-child]:left-0 [&>th:first-child]:z-10 [&>th:last-child]:sticky [&>th:last-child]:right-0 [&>th:last-child]:z-10',
    '[&>td:first-child]:sticky [&>td:first-child]:left-0 [&>td:first-child]:z-10 [&>td:last-child]:sticky [&>td:last-child]:right-0 [&>td:last-child]:z-10',
    'hover:bg-gray-100/75',
    hasExpandedContent && 'cursor-pointer',
    className
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
    return renderNestedRows(item.children, level + 1);
  };

  const iconName = isExpanded ? 'IconChevronDown' : 'IconChevronRight';
  return (
    <>
      <tr className={classes} onClick={hasExpandedContent ? onToggleExpand : undefined}>
        {React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) {
            return null;
          }
          const isExpandField =
            isTreeColumn(child.props?.title || child.props?.code) ||
            index === 0 ||
            (index === 1 && !React.isValidElement(children[0]));

          if (canTree && isExpandField) {
            return React.cloneElement(child, {
              className: cn(child.props.className),
              children: (
                <>
                  {canTree && (
                    <Button
                      variant='unstyle'
                      size='ratio'
                      onClick={e => {
                        e.stopPropagation();
                        onToggleExpand();
                      }}
                      className={cn(
                        'p-1 rounded-full hover:bg-gray-200 transition-colors duration-200 flex-shrink-0',
                        `ml-${level * 2}`
                      )}
                    >
                      <Icons name={iconName} size={16} />
                    </Button>
                  )}
                  {child.props.children}
                </>
              ),
              ...child.props
            });
          }

          const isNameField = child.props?.code === 'name';
          const additionalClassName = isNameField ? `pl-${level * 2}` : '';

          return React.cloneElement(child, {
            className: cn(child.props.className, additionalClassName),
            ...child.props
          });
        })}
      </tr>
      {canTree && isExpanded && renderExpandedContent()}
    </>
  );
};
