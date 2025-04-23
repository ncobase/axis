import React, { useState, useRef, useEffect } from 'react';

import { cn } from '@ncobase/utils';

import { HierarchicalNode } from '../hooks/useHierarchicalData';
import { useHierarchicalSelect } from '../hooks/useHierarchicalSelect';

import { Button } from '@/button';
import { Icons } from '@/icon';

export interface HierarchicalSelectProps {
  // Data props
  options: HierarchicalNode[];
  value?: any | any[];
  defaultValue?: any | any[];
  onChange?: (_value: any) => void;

  // Display props
  placeholder?: string;
  prependIcon?: string;
  prependIconClick?: () => void;
  multiple?: boolean;
  allowParentSelection?: boolean;
  searchable?: boolean;

  // Styling
  className?: string;
  disabled?: boolean;
  error?: boolean;

  // Additional props
  [key: string]: any;
}

export const HierarchicalSelect = React.forwardRef<HTMLDivElement, HierarchicalSelectProps>(
  (
    {
      options = [],
      value,
      defaultValue = [],
      onChange,
      placeholder = 'Please select',
      prependIcon,
      prependIconClick,
      multiple = false,
      allowParentSelection = true,
      searchable = false,
      className,
      disabled = false,
      error = false,
      ...rest
    },
    ref
  ) => {
    // Initialize hierarchical selection
    const {
      selectedValues,
      filteredSelectedValues,
      nodesMap,
      toggleNodeSelection,
      toggleNodeExpansion,
      expandedNodes,
      getIndeterminateState,
      getVisibleNodes
    } = useHierarchicalSelect(options, value, defaultValue, onChange, {
      multiple,
      allowParentSelection
    });

    // Local state
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Toggle dropdown
    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    // Clear selection
    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(multiple ? [] : null);
    };

    // Get visible nodes based on search and expanded state
    const visibleNodes = React.useMemo(() => {
      return getVisibleNodes(searchTerm);
    }, [getVisibleNodes, searchTerm, expandedNodes]);

    // Render selected values
    const renderSelectedValues = () => {
      if (filteredSelectedValues.length === 0) {
        return <span className='text-slate-400'>{placeholder}</span>;
      }

      if (!multiple) {
        // Single selection mode
        const node = nodesMap[filteredSelectedValues[0]];
        return <span>{node ? node.label : filteredSelectedValues[0]}</span>;
      }

      // Multiple selection mode - render as tags
      return filteredSelectedValues.map(value => {
        const node = nodesMap[value];
        if (!node) return null;

        return (
          <div
            key={value}
            className='flex items-center bg-slate-100 rounded-md px-2 py-0.5 text-sm'
          >
            <span>{node.label}</span>
            <Button
              variant='unstyle'
              size='ratio'
              className='ml-1 p-0.5'
              onClick={e => {
                e.stopPropagation();
                toggleNodeSelection(value);
              }}
            >
              <Icons name='IconX' className='w-3 h-3' />
            </Button>
          </div>
        );
      });
    };

    // Render tree nodes
    const renderTreeNodes = () => {
      const render = (node: HierarchicalNode) => {
        const { value, label, level = 0 } = node;
        const isSelected = selectedValues.includes(value);
        const hasChildren = options.some(opt => opt.parent === value);
        const isExpanded = expandedNodes.has(value);
        const isIndeterminate = getIndeterminateState(value);

        // Check if this node has matching search term - highlight if needed
        let displayLabel = label as React.ReactNode;
        if (searchTerm) {
          const index = String(label).toLowerCase().indexOf(searchTerm.toLowerCase());
          if (index >= 0) {
            displayLabel = (
              <>
                {String(label).substring(0, index)}
                <span className='bg-yellow-200'>
                  {String(label).substring(index, index + searchTerm.length)}
                </span>
                {String(label).substring(index + searchTerm.length)}
              </>
            );
          }
        }

        return (
          <React.Fragment key={value}>
            <div
              className={cn(
                'flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50',
                isSelected ? 'bg-primary-50' : isIndeterminate ? 'bg-primary-50/30' : ''
              )}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
              onClick={() => toggleNodeSelection(value)}
            >
              {hasChildren ? (
                <Button
                  variant='unstyle'
                  size='ratio'
                  className='mr-2 p-0'
                  onClick={e => toggleNodeExpansion(value, e)}
                >
                  <Icons
                    name={isExpanded ? 'IconChevronDown' : 'IconChevronRight'}
                    className='w-3.5 h-3.5'
                  />
                </Button>
              ) : (
                <div className='w-3.5 h-3.5 mr-2'></div>
              )}

              <div className='mr-2 shrink-0 relative inline-flex items-center'>
                <input
                  type='checkbox'
                  checked={isSelected}
                  readOnly
                  className='rounded-sm border-slate-300'
                />
                {isIndeterminate && (
                  <div className='absolute w-1.5 h-1.5 bg-primary-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'></div>
                )}
              </div>
              <span className='text-sm'>{displayLabel}</span>
            </div>

            {/* Render children if expanded */}
            {hasChildren &&
              isExpanded &&
              options
                .filter(child => child.parent === value)
                .sort((a, b) => String(a.label).localeCompare(String(b.label)))
                .map(child => render({ ...child, level: level + 1 }))}
          </React.Fragment>
        );
      };

      // Render root nodes first
      return visibleNodes
        .filter(node => !node.parent)
        .sort((a, b) => String(a.label).localeCompare(String(b.label)))
        .map(render);
    };

    return (
      <div className={cn('relative', className)} ref={ref} {...rest}>
        <div
          className={cn(
            'flex flex-wrap items-center justify-between min-h-[38px] px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
            'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)]',
            error ? 'border-danger-600' : 'focus-within:border-primary-600',
            'text-slate-500 rounded-md transition-colors gap-1.5 relative cursor-pointer',
            disabled && 'opacity-55 cursor-not-allowed pointer-events-none',
            prependIcon && 'pl-9'
          )}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          {prependIcon && (
            <Button
              className={cn(
                'absolute left-1 top-1/2 transform -translate-y-1/2 cursor-default outline-hidden',
                prependIconClick && 'cursor-pointer'
              )}
              onClick={e => {
                e.stopPropagation();
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                prependIconClick && prependIconClick();
              }}
              variant='unstyle'
              size='ratio'
            >
              <Icons name={prependIcon} />
            </Button>
          )}

          {renderSelectedValues()}

          {selectedValues.length > 0 && (
            <Button
              className='ml-auto mr-1 cursor-pointer outline-hidden'
              onClick={handleClear}
              variant='unstyle'
              size='ratio'
            >
              <Icons name='IconX' className='w-3.5 h-3.5' />
            </Button>
          )}

          <Icons
            name='IconChevronDown'
            className={cn('transition-transform', isOpen && 'transform rotate-180')}
          />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto'>
            {/* Search box */}
            {searchable && (
              <div className='sticky top-0 bg-white p-2 border-b border-slate-100'>
                <div className='relative'>
                  <Icons
                    name='IconSearch'
                    className='absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-400'
                    size={16}
                  />
                  <input
                    type='text'
                    className='w-full pl-8 pr-3 py-1.5 border border-slate-200 rounded-md focus:outline-none focus:border-primary-500'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onClick={e => e.stopPropagation()}
                  />
                  {searchTerm && (
                    <Button
                      variant='unstyle'
                      size='ratio'
                      className='absolute right-2 top-1/2 transform -translate-y-1/2'
                      onClick={e => {
                        e.stopPropagation();
                        setSearchTerm('');
                      }}
                    >
                      <Icons name='IconX' className='w-3.5 h-3.5 text-slate-400' />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Empty state */}
            {visibleNodes.length === 0 && (
              <div className='p-3 text-center text-slate-500'>
                {searchTerm ? 'No matching options found' : 'No options available'}
              </div>
            )}

            {/* Tree nodes */}
            {renderTreeNodes()}
          </div>
        )}
      </div>
    );
  }
);

HierarchicalSelect.displayName = 'HierarchicalSelect';
