import React, { HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@tone/utils';

import { useShellContext } from './shell.context';

interface Props extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

export const ShellTopbar: React.FC<Props> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const { header, sidebar } = useShellContext();
  const classes = cn(
    'fixed right-0 z-[998] flex h-12 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]',
    // show sidebar
    { 'left-14': !!sidebar },
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
