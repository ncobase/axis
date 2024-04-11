import React from 'react';

import { Label } from '../forms';
import { Icons } from '../icon';

export const EmptyData = ({ label = 'No data' }) => {
  return (
    <div className='inline-flex flex-col gap-y-4 items-center justify-center h-full'>
      <Icons name='IconInbox' size={64} stroke={0.5} className='stroke-slate-400' />
      <Label className='text-slate-500'>{label}</Label>
    </div>
  );
};
