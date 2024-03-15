import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellHeader: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const classes = cn(
    'fixed left-0 right-0 top-0 z-[999] h-14 bg-slate-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    className
  );
  return (
    <div className={classes} role='navigation' {...rest}>
      {children}
    </div>
  );
});
