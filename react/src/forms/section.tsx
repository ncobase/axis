import React, { useState } from 'react';

import { cn } from '@ncobase/utils';

import { Icons } from '../icon';

import type { SectionProps } from './types';

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className,
  titleClassName,
  subtitleClassName,
  contentClassName,
  icon
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleToggle = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className={cn('border border-slate-200 rounded-md overflow-hidden', className)}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
      <div
        className={cn(
          'bg-slate-50 px-4 py-3 flex items-center justify-between',
          collapsible && 'cursor-pointer'
        )}
        onClick={handleToggle}
      >
        <div className='flex items-center space-x-2'>
          {icon && <Icons name={icon} className='w-5 h-5 text-slate-500' />}
          <div>
            <h3 className={cn('text-lg font-medium text-slate-800', titleClassName)}>{title}</h3>
            {subtitle && (
              <p className={cn('text-sm text-slate-500', subtitleClassName)}>{subtitle}</p>
            )}
          </div>
        </div>
        {collapsible && (
          <Icons
            name={collapsed ? 'IconChevronDown' : 'IconChevronUp'}
            className='w-5 h-5 text-slate-500'
          />
        )}
      </div>
      <div
        className={cn(
          'px-4 py-3 transition-all duration-300 ease-in-out',
          collapsed ? 'hidden' : 'block',
          contentClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
