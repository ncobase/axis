import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@tone/utils';

import { Icons } from '../icon';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'h-[15px] w-[15px] shrink-0 rounded-full border-[1.3px] border-gray-400 text-brand-600 disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-slate-50/15 hover:bg-slate-50/65  data-[state=checked]:border-brand-600 data-[state=checked]:text-brand-600',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Icons name='IconCheck' className='w-3 h-3 stroke-brand-800 stroke-[2px]' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
