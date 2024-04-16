import React, { useEffect, useState } from 'react';

import { cn, formatDateTime } from '@tone/utils';
import { DateRange } from 'react-day-picker';

import { Button } from '../button';
import { Calendar } from '../calendar';
import { Icons } from '../icon';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

interface IDatePickerProps {
  mode?: 'single' | 'range';
  className?: string;
  defaultValue?: Date | DateRange;
  onChange?: (date: Date | DateRange | null) => void;
}

const SingleDatePicker: React.FC<IDatePickerProps> = ({ className, defaultValue, onChange }) => {
  const [date, setDate] = useState<Date | null>((defaultValue as Date) || null);

  useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue as Date);
    }
  }, [defaultValue]);

  const handleSelect = (selectedDate: Date | null) => {
    setDate(selectedDate);
    onChange?.(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='unstyle'
          className={cn(
            'flex px-3 py-2.5 w-full bg-slate-50 hover:bg-slate-50/65 border border-slate-100 focus:border-primary-600 text-slate-500 gap-3 justify-start text-left font-normal',
            !date && 'text-slate-400',
            className
          )}
        >
          <Icons name='IconCalendar' />
          {date ? (
            formatDateTime(date, 'date')
          ) : (
            <span className='text-gray-400 font-normal'>请选择日期</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-white !z-[999]'>
        <Calendar mode='single' selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  );
};

const RangeDatePicker: React.FC<IDatePickerProps> = ({ className, defaultValue, onChange }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    (defaultValue as DateRange) || undefined
  );

  useEffect(() => {
    if (defaultValue) {
      setDateRange(defaultValue as DateRange);
    }
  }, [defaultValue]);

  const handleSelect = (selectedRange: DateRange | null) => {
    setDateRange(selectedRange);
    onChange?.(selectedRange);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant='outline-slate'
          className={cn(
            'bg-slate-50 py-2.5 w-full justify-start text-left font-normal shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)]',
            !dateRange && 'text-slate-400',
            className
          )}
        >
          <Icons name='IconCalendar' className='mr-2' />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {formatDateTime(dateRange.from, 'date')} - {formatDateTime(dateRange.to, 'date')}
              </>
            ) : (
              formatDateTime(dateRange.from, 'date')
            )
          ) : (
            <span className='text-slate-400'>查询范围</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 bg-white' align='start'>
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
          disabled={date => {
            return date >= new Date();
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

const DatePicker: React.FC<IDatePickerProps> = ({
  mode = 'single',
  defaultValue,
  onChange,
  className
}) => {
  if (mode === 'range') {
    return (
      <RangeDatePicker className={className} defaultValue={defaultValue} onChange={onChange} />
    );
  }
  return <SingleDatePicker className={className} defaultValue={defaultValue} onChange={onChange} />;
};

export { DatePicker };
