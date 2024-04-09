import React from 'react';

import { cn } from '@tone/utils';

interface DividerProps {
  className?: string;
  dir?: 'horizontal' | 'vertical';
  label?: string;
  color?:
    | 'white'
    | 'black'
    | 'brand'
    | 'slate'
    | 'gray'
    | 'red'
    | 'orange'
    | 'amber'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'emerald'
    | 'teal'
    | 'cyan'
    | 'sky'
    | 'blue'
    | 'indigo'
    | 'violet'
    | 'purple'
    | 'fuchsia'
    | 'pink'
    | 'rose';
  style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
}

const Divider: React.FC<DividerProps> = ({
  className,
  dir = 'horizontal',
  color = 'slate',
  style = 'solid',
  label
}) => {
  const dirStyle = dir === 'horizontal' ? 'border-t' : 'border-l';

  return (
    <div className={cn('relative flex py-5 items-center text-slate-400', className)}>
      <div className={cn('flex-grow', dirStyle, `border-${color}-400`, `border-${style}`)}></div>
      {label && <div className={cn('flex-shrink mx-3', `!text-${color}-400`)}>{label}</div>}
      <div className={cn('flex-grow', dirStyle, `border-${color}-400`, `border-${style}`)}></div>
    </div>
  );
};

export { Divider };
