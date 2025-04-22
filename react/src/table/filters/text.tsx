import React, { useState, useEffect } from 'react';

import { cn } from '@ncobase/utils';

import { useTable } from '../table.context';

import { Button } from '@/button';
import { Input } from '@/forms';
import { Icons } from '@/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/popover';

export interface TextFilterProps {
  accessorKey: string;
  placeholder?: string;
  handleFilterChange: (_value: string) => void;
}

export const TextFilter: React.FC<TextFilterProps> = ({
  accessorKey,
  placeholder = 'Search...',
  handleFilterChange
}) => {
  const { filter: filterState } = useTable();
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Initialize from filter state if it exists
  useEffect(() => {
    const textValue = filterState?.config?.[accessorKey]?.value;
    if (textValue && typeof textValue === 'string') {
      setValue(textValue);
    }
  }, [filterState?.config, accessorKey]);

  const applyFilter = () => {
    handleFilterChange(value);
    setIsOpen(false);
  };

  const clearFilter = () => {
    setValue('');
    handleFilterChange('');
    setIsOpen(false);
  };

  const hasActiveFilter = value !== '';

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='unstyle'
          size='sm'
          className={cn(
            'h-8 px-2 py-1 flex items-center gap-1',
            hasActiveFilter && 'text-blue-500'
          )}
        >
          <Icons
            name='IconSearch'
            className={cn('h-4 w-4', hasActiveFilter && 'stroke-blue-500')}
          />
          <span className='text-sm hidden sm:inline'>
            {hasActiveFilter ? `"${value}"` : 'Search'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60 p-2' align='start'>
        <div className='space-y-2'>
          <div className='relative'>
            <Icons name='IconSearch' className='absolute left-2 top-2.5 h-4 w-4 text-slate-400' />
            <Input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={placeholder}
              className='pl-8 h-9'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  applyFilter();
                }
              }}
            />
            {value && (
              <Button
                variant='unstyle'
                size='sm'
                className='absolute right-1 top-1.5 h-6 w-6 p-0'
                onClick={() => setValue('')}
              >
                <Icons name='IconX' className='h-4 w-4' />
              </Button>
            )}
          </div>

          <div className='flex justify-between pt-2'>
            <Button variant='outline' size='sm' onClick={clearFilter} disabled={!hasActiveFilter}>
              Clear
            </Button>
            <Button size='sm' onClick={applyFilter}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
