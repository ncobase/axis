import React, { useState, forwardRef, useRef, useEffect } from 'react';

import { cn } from '@ncobase/utils';

import { Button } from '../button';
import { Icons } from '../icon';

import { Field } from './form.field';
import { TreeNode } from './types';

export const MultiSelectField = forwardRef<HTMLDivElement, any>(
  (
    {
      options = [],
      onChange,
      defaultValue = [],
      placeholder,
      prependIcon,
      prependIconClick,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(
      rest['value'] === undefined ? defaultValue : rest['value']
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Update value state
    if (
      rest['value'] !== undefined &&
      JSON.stringify(rest['value']) !== JSON.stringify(selectedValues)
    ) {
      setSelectedValues(rest['value']);
    }

    // Close dropdown menu when clicking outside
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

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleToggleValue = (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];

      setSelectedValues(newValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(newValues);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange([]);
    };

    return (
      <Field {...rest} ref={ref}>
        <div className='relative' ref={dropdownRef}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={cn(
              'flex flex-wrap items-center justify-between min-h-[38px] px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
              'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus-within:border-primary-600',
              'text-slate-500 rounded-md transition-colors gap-1.5 relative cursor-pointer',
              disabled && 'opacity-55 cursor-not-allowed pointer-events-none',
              prependIcon && 'pl-9'
            )}
            onClick={toggleDropdown}
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

            {selectedValues.length === 0 && (
              <span className='text-slate-400'>{placeholder || 'Please select'}</span>
            )}

            {selectedValues.map(value => {
              const option = options.find(opt => String(opt.value) === value);
              return (
                <div
                  key={value}
                  className='flex items-center bg-slate-100 rounded-md px-2 py-0.5 text-sm'
                >
                  <span>{option?.label || value}</span>
                  <Button
                    variant='unstyle'
                    size='ratio'
                    className='ml-1 p-0.5'
                    onClick={e => {
                      e.stopPropagation();
                      handleToggleValue(value);
                    }}
                  >
                    <Icons name='IconX' className='w-3 h-3' />
                  </Button>
                </div>
              );
            })}

            {selectedValues.length > 0 && (
              <Button
                className='ml-auto cursor-pointer outline-hidden'
                onClick={handleClearAll}
                variant='unstyle'
                size='ratio'
              >
                <Icons name='IconX' className='w-3.5 h-3.5' />
              </Button>
            )}

            <Icons
              name='IconChevronDown'
              className={cn('ml-1', isOpen && 'transform rotate-180')}
            />
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto'>
              {options.map((option, index) => (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  key={index}
                  className={cn(
                    'flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50',
                    selectedValues.includes(String(option.value)) && 'bg-primary-50'
                  )}
                  onClick={() => handleToggleValue(String(option.value))}
                >
                  <div className='mr-2 shrink-0'>
                    <input
                      type='checkbox'
                      checked={selectedValues.includes(String(option.value))}
                      onChange={() => {}}
                      className='rounded-sm border-slate-300'
                    />
                  </div>
                  <span>{option.label || option.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Field>
    );
  }
);

MultiSelectField.displayName = 'MultiSelectField';

export const MultiSelect = forwardRef<HTMLDivElement, any>(
  (
    {
      options = [],
      onChange,
      defaultValue = [],
      placeholder,
      prependIcon,
      prependIconClick,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(
      props['value'] === undefined ? defaultValue : props['value']
    );
    const dropdownRef = useRef<HTMLDivElement>(ref as unknown as HTMLDivElement);

    // Update value state
    if (
      props['value'] !== undefined &&
      JSON.stringify(props['value']) !== JSON.stringify(selectedValues)
    ) {
      setSelectedValues(props['value']);
    }

    // Close dropdown menu when clicking outside
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

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleToggleValue = (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];

      setSelectedValues(newValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(newValues);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange([]);
    };

    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={cn(
            'flex flex-wrap items-center justify-between min-h-[38px] px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
            'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus-within:border-primary-600',
            'text-slate-500 rounded-md transition-colors gap-1.5 relative cursor-pointer',
            disabled && 'opacity-55 cursor-not-allowed pointer-events-none',
            prependIcon && 'pl-9'
          )}
          onClick={toggleDropdown}
          {...props}
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

          {selectedValues.length === 0 && (
            <span className='text-slate-400'>{placeholder || 'Please select'}</span>
          )}

          {selectedValues.map(value => {
            const option = options.find(opt => String(opt.value) === value);
            return (
              <div
                key={value}
                className='flex items-center bg-slate-100 rounded-md px-2 py-0.5 text-sm'
              >
                <span>{option?.label || value}</span>
                <Button
                  variant='unstyle'
                  size='ratio'
                  className='ml-1 p-0.5'
                  onClick={e => {
                    e.stopPropagation();
                    handleToggleValue(value);
                  }}
                >
                  <Icons name='IconX' className='w-3 h-3' />
                </Button>
              </div>
            );
          })}

          {selectedValues.length > 0 && (
            <Button
              className='ml-auto cursor-pointer outline-hidden'
              onClick={handleClearAll}
              variant='unstyle'
              size='ratio'
            >
              <Icons name='IconX' className='w-3.5 h-3.5' />
            </Button>
          )}

          <Icons name='IconChevronDown' className={cn('ml-1', isOpen && 'transform rotate-180')} />
        </div>

        {/* Dropdown menu */}
        {isOpen && (
          <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto'>
            {options.map((option, index) => (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div
                key={index}
                className={cn(
                  'flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50',
                  selectedValues.includes(String(option.value)) && 'bg-primary-50'
                )}
                onClick={() => handleToggleValue(String(option.value))}
              >
                <div className='mr-2 shrink-0'>
                  <input
                    type='checkbox'
                    checked={selectedValues.includes(String(option.value))}
                    onChange={() => {}}
                    className='rounded-sm border-slate-300'
                  />
                </div>
                <span>{option.label || option.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

// Tree Select Component
export const TreeSelectField = forwardRef<HTMLDivElement, any>(
  (
    {
      options = [],
      onChange,
      defaultValue = [],
      placeholder,
      prependIcon,
      prependIconClick,
      multiple = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(
      rest['value'] === undefined
        ? defaultValue
        : multiple
          ? Array.isArray(rest['value'])
            ? rest['value']
            : [rest['value']]
          : Array.isArray(rest['value'])
            ? [rest['value'][0]]
            : [rest['value']]
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Update value state
    if (
      rest['value'] !== undefined &&
      JSON.stringify(rest['value']) !== JSON.stringify(selectedValues)
    ) {
      setSelectedValues(
        multiple
          ? Array.isArray(rest['value'])
            ? rest['value']
            : [rest['value']]
          : Array.isArray(rest['value'])
            ? [rest['value'][0]]
            : [rest['value']]
      );
    }

    // Close dropdown menu when clicking outside
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

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleSelect = (value: string) => {
      let newValues: string[];

      if (multiple) {
        newValues = selectedValues.includes(value)
          ? selectedValues.filter(v => v !== value)
          : [...selectedValues, value];
      } else {
        newValues = [value];
        setIsOpen(false);
      }

      setSelectedValues(newValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(multiple ? newValues : newValues[0]);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(multiple ? [] : null);
    };

    // Recursively check if the node is selected
    const isNodeAffected = (node: TreeNode): boolean => {
      if (selectedValues.includes(node.value)) return true;
      if (node.children) {
        return node.children.some(child => isNodeAffected(child));
      }
      return false;
    };

    // Recursively render tree nodes
    const renderTreeNodes = (nodes: TreeNode[], level = 0) => {
      return nodes.map(node => {
        const isSelected = selectedValues.includes(node.value);
        const hasSelectedChildren = node.children
          ? node.children.some(child => isNodeAffected(child))
          : false;
        const hasChildren = node.children && node.children.length > 0;

        return (
          <React.Fragment key={node.value}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={cn(
                'flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50',
                (isSelected || hasSelectedChildren) && 'bg-primary-50'
              )}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
              onClick={() => handleSelect(node.value)}
            >
              {hasChildren && <Icons name='IconChevronRight' className='w-4 h-4 mr-1' />}
              <div className='mr-2 shrink-0'>
                <input
                  type='checkbox'
                  checked={isSelected}
                  onChange={() => {}}
                  className='rounded-sm border-slate-300'
                />
              </div>
              <span>{node.label}</span>
            </div>
            {hasChildren && renderTreeNodes(node.children, level + 1)}
          </React.Fragment>
        );
      });
    };

    // Find label by value
    const findLabel = (value: string, nodes: TreeNode[]): string | undefined => {
      for (const node of nodes) {
        if (node.value === value) return node.label;
        if (node.children) {
          const label = findLabel(value, node.children);
          if (label) return label;
        }
      }
      return undefined;
    };

    return (
      <Field {...rest} ref={ref}>
        <div className='relative' ref={dropdownRef}>
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
          <div
            className={cn(
              'flex flex-wrap items-center justify-between min-h-[38px] px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
              'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus-within:border-primary-600',
              'text-slate-500 rounded-md transition-colors gap-1.5 relative cursor-pointer',
              disabled && 'opacity-55 cursor-not-allowed pointer-events-none',
              prependIcon && 'pl-9'
            )}
            onClick={toggleDropdown}
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

            {selectedValues.length === 0 && (
              <span className='text-slate-400'>{placeholder || 'Please select'}</span>
            )}

            {multiple
              ? selectedValues.map(value => (
                  <div
                    key={value}
                    className='flex items-center bg-slate-100 rounded-md px-2 py-0.5 text-sm'
                  >
                    <span>{findLabel(value, options) || value}</span>
                    <Button
                      variant='unstyle'
                      size='ratio'
                      className='ml-1 p-0.5'
                      onClick={e => {
                        e.stopPropagation();
                        handleSelect(value);
                      }}
                    >
                      <Icons name='IconX' className='w-3 h-3' />
                    </Button>
                  </div>
                ))
              : selectedValues.length > 0 && (
                  <span>{findLabel(selectedValues[0], options) || selectedValues[0]}</span>
                )}

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
              {renderTreeNodes(options)}
            </div>
          )}
        </div>
      </Field>
    );
  }
);

TreeSelectField.displayName = 'TreeSelectField';

export const TreeSelect = forwardRef<HTMLDivElement, any>(
  (
    {
      options = [],
      onChange,
      defaultValue = [],
      placeholder,
      prependIcon,
      prependIconClick,
      multiple = false,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>(
      props['value'] === undefined
        ? defaultValue
        : multiple
          ? Array.isArray(props['value'])
            ? props['value']
            : [props['value']]
          : Array.isArray(props['value'])
            ? [props['value'][0]]
            : [props['value']]
    );
    const dropdownRef = useRef<HTMLDivElement>(ref as unknown as HTMLDivElement);

    // Update value state
    if (
      props['value'] !== undefined &&
      JSON.stringify(props['value']) !== JSON.stringify(selectedValues)
    ) {
      setSelectedValues(
        multiple
          ? Array.isArray(props['value'])
            ? props['value']
            : [props['value']]
          : Array.isArray(props['value'])
            ? [props['value'][0]]
            : [props['value']]
      );
    }

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

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleSelect = (value: string) => {
      let newValues: string[];

      if (multiple) {
        newValues = selectedValues.includes(value)
          ? selectedValues.filter(v => v !== value)
          : [...selectedValues, value];
      } else {
        newValues = [value];
        setIsOpen(false);
      }

      setSelectedValues(newValues);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(multiple ? newValues : newValues[0]);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedValues([]);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onChange && onChange(multiple ? [] : null);
    };

    // Recursively check if the node is selected
    const isNodeAffected = (node: TreeNode): boolean => {
      if (selectedValues.includes(node.value)) return true;
      if (node.children) {
        return node.children.some(child => isNodeAffected(child));
      }
      return false;
    };

    // Recursively render tree nodes
    const renderTreeNodes = (nodes: TreeNode[], level = 0) => {
      return nodes.map(node => {
        const isSelected = selectedValues.includes(node.value);
        const hasSelectedChildren = node.children
          ? node.children.some(child => isNodeAffected(child))
          : false;
        const hasChildren = node.children && node.children.length > 0;

        return (
          <React.Fragment key={node.value}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={cn(
                'flex items-center px-3 py-2 cursor-pointer hover:bg-slate-50',
                (isSelected || hasSelectedChildren) && 'bg-primary-50'
              )}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
              onClick={() => handleSelect(node.value)}
            >
              {hasChildren && <Icons name='IconChevronRight' className='w-4 h-4 mr-1' />}
              <div className='mr-2 shrink-0'>
                <input
                  type='checkbox'
                  checked={isSelected}
                  onChange={() => {}}
                  className='rounded-sm border-slate-300'
                />
              </div>
              <span>{node.label}</span>
            </div>
            {hasChildren && renderTreeNodes(node.children, level + 1)}
          </React.Fragment>
        );
      });
    };

    // Find the label for a given value
    const findLabel = (value: string, nodes: TreeNode[]): string | undefined => {
      for (const node of nodes) {
        if (node.value === value) return node.label;
        if (node.children) {
          const label = findLabel(value, node.children);
          if (label) return label;
        }
      }
      return undefined;
    };

    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          className={cn(
            'flex flex-wrap items-center justify-between min-h-[38px] px-3 py-2 w-full bg-slate-50/55 hover:bg-slate-50/25 border border-slate-200/65',
            'shadow-[0.03125rem_0.03125rem_0.125rem_0_rgba(0,0,0,0.03)] focus-within:border-primary-600',
            'text-slate-500 rounded-md transition-colors gap-1.5 relative cursor-pointer',
            disabled && 'opacity-55 cursor-not-allowed pointer-events-none',
            prependIcon && 'pl-9'
          )}
          onClick={toggleDropdown}
          {...props}
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

          {selectedValues.length === 0 && (
            <span className='text-slate-400'>{placeholder || 'Please select'}</span>
          )}

          {multiple
            ? selectedValues.map(value => (
                <div
                  key={value}
                  className='flex items-center bg-slate-100 rounded-md px-2 py-0.5 text-sm'
                >
                  <span>{findLabel(value, options) || value}</span>
                  <Button
                    variant='unstyle'
                    size='ratio'
                    className='ml-1 p-0.5'
                    onClick={e => {
                      e.stopPropagation();
                      handleSelect(value);
                    }}
                  >
                    <Icons name='IconX' className='w-3 h-3' />
                  </Button>
                </div>
              ))
            : selectedValues.length > 0 && (
                <span>{findLabel(selectedValues[0], options) || selectedValues[0]}</span>
              )}

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

        {/* Tree dropdown menu */}
        {isOpen && (
          <div className='absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto'>
            {renderTreeNodes(options)}
          </div>
        )}
      </div>
    );
  }
);

TreeSelect.displayName = 'TreeSelect';
