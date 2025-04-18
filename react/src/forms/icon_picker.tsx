import React, { useState } from 'react';

import { cn } from '@ncobase/utils';

import { Icons } from '../icon';
import { IconPicker } from '../icon-picker';

import { Input } from './input';
import type { IconPickerComponentProps } from './types';

export const IconPickerComponent: React.FC<IconPickerComponentProps> = ({
  value = '',
  onChange,
  className,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconSelect = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(iconName);
  };

  return (
    <div className={cn('relative', className)}>
      <div className='relative'>
        {value && (
          <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            <Icons name={value} className='w-5 h-5' />
          </div>
        )}
        <Input
          type='text'
          value={value}
          placeholder={placeholder}
          className={cn(value ? 'pl-9' : '')}
          readOnly
          onClick={() => setIsOpen(true)}
        />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer [&_svg]:text-slate-500 [&_svg]:fill-slate-500'
          onClick={() => setIsOpen(true)}
        >
          <Icons name='IconChevronDown' className='w-5 h-5' />
        </div>
      </div>
      <IconPicker
        opened={isOpen}
        onVisible={setIsOpen}
        onSelected={handleIconSelect}
        translations={{
          title: 'Select Icon',
          outline: 'Outline Icons',
          filled: 'Filled Icons',
          searchPlaceholder: 'Search...'
        }}
      />
    </div>
  );
};
