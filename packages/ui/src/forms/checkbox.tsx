import React from 'react';

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
      'h-[0.9375rem] w-[0.9375rem] shrink-0 rounded-full border-[0.0625rem] border-gray-400 text-primary-600 shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:opacity-65 hover:border-gray-400/65 data-[state=checked]:border-primary-600 data-[state=checked]:text-primary-600',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current')}>
      <Icons name='IconCheck' className='w-2.5 h-2.5 stroke-primary-600 stroke-[0.1875rem]' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
