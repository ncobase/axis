import { cn } from '@ncobase/utils';

import { Label } from '@/forms';
import { Icons } from '@/icon';

export const EmptyData = ({ label = 'No data', className, loading = false }) => {
  const classes = cn(className, 'items-center justify-center flex flex-col');

  return (
    <div className={classes}>
      {loading ? (
        <div className='animate-spin rounded-full h-8 w-8 border-slate-300 border-t-slate-900'></div>
      ) : (
        <>
          <Icons name='IconInbox' size={64} stroke={0.5} className='stroke-slate-400' />
          <Label className='text-slate-500'>{label}</Label>
        </>
      )}
    </div>
  );
};
