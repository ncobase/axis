import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellTopbar: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const classes = cn('flex h-12 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]', className);
  return (
    <div className={classes} role='toolbar' {...rest}>
      {children}
    </div>
  );
});

// sticky top-14 left-14 right-0 z-40
