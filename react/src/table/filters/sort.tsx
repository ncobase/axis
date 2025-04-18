import React from 'react';

import { cn, sortTree } from '@ncobase/utils';

import { DropdownItem } from '../../dropdown';
import { Input } from '../../forms';
import { Icons } from '../../icon';
import { DropdownWrapper } from '../components/dropdown';
import { useTable } from '../table.context';

export const SortFilter: React.FC<{
  accessorKey: string;
  filterValue: string;
  // eslint-disable-next-line no-unused-vars
  handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleSortChange: (order: 'asc' | 'desc' | null) => void;
}> = ({ accessorKey, filterValue, handleFilterChange, handleSortChange }) => {
  const { filter: filterState, internalData, setInternalData, originalData } = useTable();

  const handleSort = (order: 'asc' | 'desc' | null) => {
    handleSortChange(order);
    if (order && setInternalData) {
      const sortedData = sortTree(
        internalData,
        accessorKey as keyof (typeof internalData)[0],
        order
      );
      setInternalData(sortedData);
    } else {
      setInternalData(originalData);
    }
  };

  return (
    <DropdownWrapper icon='IconChevronDown'>
      <DropdownItem onSelect={event => event.preventDefault()} className='hover:bg-white hidden'>
        <Input
          type='text'
          value={filterValue}
          onChange={handleFilterChange}
          placeholder='Search...'
          className='max-w-28 py-1.5'
        />
      </DropdownItem>
      <DropdownItem
        onClick={() => handleSort('asc')}
        className={cn(
          'flex items-center gap-x-1 px-3.5',
          filterState?.config[accessorKey]?.sortOrder === 'asc' &&
            'bg-slate-50 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortAZ' className='stroke-slate-400' />
      </DropdownItem>
      <DropdownItem
        onClick={() => handleSort('desc')}
        className={cn(
          'flex items-center gap-x-1 px-3.5',
          filterState?.config[accessorKey]?.sortOrder === 'desc' &&
            'bg-slate-50 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortZA' className='stroke-slate-400' />
      </DropdownItem>
      {filterState?.config[accessorKey]?.sortOrder && (
        <DropdownItem onClick={() => handleSort(null)} className='flex items-center gap-x-1 px-3.5'>
          <Icons name='IconRestore' className='stroke-slate-400' />
        </DropdownItem>
      )}
    </DropdownWrapper>
  );
};
