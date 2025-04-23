import React from 'react';

import { cn } from '@ncobase/utils';
import * as SelectPrimitive from '@radix-ui/react-select';

import { Button } from '@/button';
import { Icons } from '@/icon';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  allowClear?: boolean;
  onClear?: (_e: React.MouseEvent) => void;
  value?: string;
}

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, allowClear, onClear, value, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
      'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus:border-primary-600',
      'text-slate-500 items-center justify-between whitespace-nowrap rounded-md',
      'disabled:cursor-not-allowed disabled:opacity-55 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    {allowClear && value && (
      <Button
        className='ml-auto cursor-pointer outline-hidden mr-1'
        onClick={e => {
          e.stopPropagation();
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClear && onClear(e);
        }}
        variant='unstyle'
        size='ratio'
      >
        <Icons name='IconX' className='w-3.5 h-3.5' />
      </Button>
    )}

    <SelectPrimitive.Icon asChild>
      <Icons name='IconChevronDown' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-999 max-h-96 overflow-hidden rounded-md shadow-[0_0_6px_rgba(0,0,0,0.05)]',
        'divide-y divide-slate-100 bg-white',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className='flex cursor-default items-center justify-center py-1'>
        <Icons name='IconChevronUp' />
      </SelectPrimitive.ScrollUpButton>

      <SelectPrimitive.Viewport
        className={cn(
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>

      <SelectPrimitive.ScrollDownButton className='flex cursor-default items-center justify-center py-1'>
        <Icons name='IconChevronDown' />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = 'SelectContent';

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full select-none items-center justify-between rounded-xs py-2.5 pl-4 pr-3 gap-x-2',
      'text-slate-500 cursor-pointer',
      'hover:bg-slate-50 data-disabled:cursor-not-allowed data-disabled:opacity-50',
      'data-disabled:pointer-events-none data-disabled:opacity-55',
      className
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <span className='flex h-3.5 w-3.5 items-center'>
      <SelectPrimitive.ItemIndicator>
        <Icons name='IconCheck' className='stroke-slate-500' />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
));

SelectItem.displayName = 'SelectItem';

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 font-medium', className)}
    {...props}
  />
));

SelectLabel.displayName = 'SelectLabel';

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px', className)} {...props} />
));

SelectSeparator.displayName = 'SelectSeparator';
