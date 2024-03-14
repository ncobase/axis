import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellSubmenu: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const classes = cn(
    'flex flex-col w-44 justify-start max-w-44 bg-white shadow-[1px_0_2px_0_rgba(0,0,0,0.03)]',
    className
  );
  return (
    <div className={classes} role='navigation' {...rest}>
      {children}
    </div>
  );
});

// sticky top-[6.5rem] bottom-0 left-14 z-30
