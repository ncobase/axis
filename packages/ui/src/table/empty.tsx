import React from 'react';

import { cn } from '@tone/utils';

import { Label } from '../forms';
import { Icons } from '../icon';

interface IEmptyDataProps {
  className?: string;
  label?: string;
}

export const EmptyData: React.FC<IEmptyDataProps> = ({ label = 'No data', className }) => {
  const classes = cn(
    'flex flex-col w-full h-full items-center justify-center bg-white rounded-md border border-slate-50  mt-4',
    className
  );
  return (
    <div className={classes}>
      <Icons name='IconInbox' size={64} stroke={0.5} className='stroke-slate-400' />
      <Label className='text-slate-500'>{label}</Label>
    </div>
  );
};
