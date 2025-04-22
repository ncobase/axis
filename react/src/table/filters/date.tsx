import React, { useState, useEffect } from 'react';

import { cn } from '@ncobase/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { useTable } from '../table.context';

import { Button } from '@/button';
import { Calendar } from '@/calendar';
import { Icons } from '@/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/popover';

export interface DateFilterProps {
  accessorKey: string;
  filterValue: string;
  handleFilterChange: (_dateRange: DateRange) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ accessorKey, handleFilterChange }) => {
  const { filter: filterState } = useTable();
  const [date, setDate] = useState<DateRange>({
    from: null,
    to: null
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Initialize from filter state if it exists
  useEffect(() => {
    const dateFilter = filterState?.config?.[accessorKey]?.dateRange;
    if (dateFilter) {
      setDate(dateFilter);
    }
  }, [filterState?.config, accessorKey]);

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    handleFilterChange(selectedDate);
    if (selectedDate.from && (selectedDate.to || !selectedDate.to)) {
      setIsCalendarOpen(false);
    }
  };

  const formatDisplayDate = () => {
    if (date.from) {
      if (date.to) {
        return `${format(date.from, 'MMM d, yyyy')} - ${format(date.to, 'MMM d, yyyy')}`;
      }
      return format(date.from, 'MMM d, yyyy');
    }
    return 'Select date...';
  };

  const clearFilter = () => {
    setDate({ from: null, to: null });
    handleFilterChange({ from: null, to: null });
    setIsCalendarOpen(false);
  };

  const hasActiveFilter = date.from !== null;

  return (
    <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
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
            name='IconCalendar'
            className={cn('h-4 w-4', hasActiveFilter && 'stroke-blue-500')}
          />
          <span className='text-sm hidden sm:inline'>{formatDisplayDate()}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          selected={date}
          onSelect={handleSelect}
          initialFocus
          footer={
            <div className='flex justify-between mt-2'>
              <Button variant='outline' size='sm' onClick={clearFilter} disabled={!hasActiveFilter}>
                Clear
              </Button>
              <Button size='sm' onClick={() => setIsCalendarOpen(false)}>
                Apply
              </Button>
            </div>
          }
        />
      </PopoverContent>
    </Popover>
  );
};
