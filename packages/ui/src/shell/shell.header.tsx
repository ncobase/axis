import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellHeader: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const classes = cn('flex h-14 bg-slate-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]', className);
  return (
    <div className={classes} role='navigation' {...rest}>
      {children}
    </div>
  );
});

// sticky top-0 left-0 right-0 z-50
