import React from 'react';

import { cn } from '@ncobase/utils';

import { Label } from '../../forms';
import { Icons } from '../../icon';

export const EmptyData = props => {
  const { label = 'No data', className, loading = false } = props;
  const classes = cn(className, 'items-center justify-center flex flex-col');

  if (loading) {
    return (
      <div className={classes}>
        <div className='animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid border-transparent'></div>
      </div>
    );
  }

  return (
    <div className={classes}>
      <Icons name='IconInbox' size={64} stroke={0.5} className='stroke-slate-400' />
      <Label className='text-slate-500'>{label}</Label>
    </div>
  );
};
