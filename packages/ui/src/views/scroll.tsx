import React, { CSSProperties, ReactNode } from 'react';

import { cn } from '@tone/utils';

interface ScrollViewProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const ScrollView: React.FC<ScrollViewProps> = ({ children, className, style }) => {
  return (
    <div className={cn('w-full h-full py-4 overflow-auto', className)} style={style}>
      {children}
    </div>
  );
};
