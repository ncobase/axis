'use client';

import * as React from 'react';

import { cn } from '@tone/utils';
import { zhCN } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';

import { getButtonStyling } from '../button/styles';
import { Icons } from '../icon';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

const Calendar = ({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          getButtonStyling('slate', 'md'),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          getButtonStyling('unstyle', 'md'),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_end: 'day-range-end',
        day_selected: 'bg-primary hover:bg-primary focus:bg-primary',
        day_today: 'bg-accent',
        day_outside: 'day-outside opacity-50 aria-selected:bg-accent/50 aria-selected:opacity-30',
        day_disabled: 'opacity-50',
        day_range_middle: 'aria-selected:bg-accent',
        day_hidden: 'invisible',
        ...classNames
      }}
      components={{
        IconLeft: () => <Icons name='IconArrowLeft' className='h-4 w-4' />,
        IconRight: () => <Icons name='IconArrowRight' className='h-4 w-4' />
      }}
      locale={zhCN}
      {...props}
    />
  );
};
Calendar.displayName = 'Calendar';

export { Calendar };
