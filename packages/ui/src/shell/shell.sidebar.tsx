import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

import { useShellContext } from './shell.context';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellSidebar: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const { header } = useShellContext();
  console.log(!!header);
  const classes = cn(
    'fixed bottom-0 left-0 z-[998] w-14 bg-white shadow-[1px_0_2px_0_rgba(0,0,0,0.03)]',
    // show header
    { 'top-14': !!header },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
});
