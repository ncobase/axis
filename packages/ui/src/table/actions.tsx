import React from 'react';

import { DropdownTrigger, DropdownContent, DropdownItem, Dropdown } from '../dropdown';
import { Icons } from '../icon';

import { ITableDataCellProps } from './row';

interface ITableDataCellActionsProps extends ITableDataCellProps {}

export const TableDataCellActions: React.FC<ITableDataCellActionsProps> = ({ actions = [] }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Icons name='IconDotsVertical' />
      </DropdownTrigger>
      <DropdownContent>
        {actions.map((action: any) => (
          <DropdownItem key={action?.name || action?.label} onClick={action?.onClick}>
            {action?.icon && <Icons name={action?.icon} className='-ml-0.5 mr-2.5' />}
            {action?.name || action?.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};
