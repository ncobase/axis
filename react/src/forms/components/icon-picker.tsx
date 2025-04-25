import React, { useState } from 'react';

import { cn } from '@ncobase/utils';

import type { IconPickerComponentProps } from '../types';

import { Input } from './base';

import { Icons } from '@/icon';
import { IconPicker } from '@/icon-picker';

export const IconPickerComponent: React.FC<IconPickerComponentProps> = ({
  value = '',
  onChange,
  className,
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIconSelect = (iconName: string) => {
    onChange?.(iconName);
  };

  return (
    <div className={cn('relative', className)}>
      <div className='relative'>
        {value && (
          <div className='absolute left-2 top-1/2 transform -translate-y-1/2'>
            <Icons name={value} className='w-4 h-4' />
          </div>
        )}
        <Input
          type='text'
          value={value}
          placeholder={placeholder}
          className={cn(value ? 'pl-8' : '')}
          readOnly
          onClick={() => setIsOpen(true)}
        />
        <div
          className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer [&_svg]:text-slate-500 [&_svg]:fill-slate-500'
          onClick={() => setIsOpen(true)}
        >
          <Icons name='IconChevronDown' className='w-4 h-4' />
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
