import React from 'react';

import { Button } from '../../button';
import { Dropdown, DropdownContent, DropdownTrigger } from '../../dropdown';
import { Icons } from '../../icon';

export const DropdownWrapper: React.FC<{ icon: string; children: React.ReactNode }> = ({
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
