import React from 'react';

import { cn, sortTree } from '@ncobase/utils';

import { DropdownWrapper } from '../components/dropdown';
import { useTable } from '../table.context';

import { DropdownItem } from '@/dropdown';
import { Input } from '@/forms';
import { Icons } from '@/icon';

export interface SortFilterProps {
  accessorKey: string;
  filterValue: string;
  handleFilterChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (_order: 'asc' | 'desc' | null) => void;
}

export const SortFilter: React.FC<SortFilterProps> = ({
  accessorKey,
  filterValue,
  handleFilterChange,
  handleSortChange
}) => {
  const { filter: filterState, internalData, setInternalData, originalData } = useTable();

  const handleSort = (order: 'asc' | 'desc' | null) => {
    // Call the parent handler
    handleSortChange(order);

    // Skip if there's no data to sort or no way to set it
    if (!internalData || !setInternalData) return;

    if (order) {
      // Create a safe version of internal data to sort
      const dataToSort = [...internalData];

      // Sort the data
      const sortedData = sortTree(dataToSort, accessorKey as keyof (typeof dataToSort)[0], order);

      setInternalData(sortedData);
    } else if (originalData) {
      // Reset to original data when clearing sort
      setInternalData([...originalData]);
    }
  };

  // Get current sort state from filter context
  const currentSortOrder = filterState?.config?.[accessorKey]?.sortOrder;

  return (
    <DropdownWrapper icon='IconChevronDown'>
      {/* Search field (hidden by default) */}
      <DropdownItem onSelect={event => event.preventDefault()} className='hover:bg-white hidden'>
        <Input
          type='text'
          value={filterValue}
          onChange={handleFilterChange}
          placeholder='Search...'
          className='max-w-28 py-1.5'
        />
      </DropdownItem>

      {/* Ascending sort option */}
      <DropdownItem
        onClick={() => handleSort('asc')}
        className={cn(
          'flex items-center gap-x-1 px-3.5',
          currentSortOrder === 'asc' && 'bg-slate-50 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortAZ' className='stroke-slate-400' />
      </DropdownItem>

      {/* Descending sort option */}
      <DropdownItem
        onClick={() => handleSort('desc')}
        className={cn(
          'flex items-center gap-x-1 px-3.5',
          currentSortOrder === 'desc' && 'bg-slate-50 text-slate-800 [&>svg]:stroke-slate-800'
        )}
      >
        <Icons name='IconSortZA' className='stroke-slate-400' />
      </DropdownItem>

      {/* Reset option - only shown when a sort is active */}
      {currentSortOrder && (
        <DropdownItem onClick={() => handleSort(null)} className='flex items-center gap-x-1 px-3.5'>
          <Icons name='IconRestore' className='stroke-slate-400' />
        </DropdownItem>
      )}
    </DropdownWrapper>
  );
};
