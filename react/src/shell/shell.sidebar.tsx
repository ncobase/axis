import React, { type HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@ncobase/utils';

import { useShellContext } from './shell.context';

interface IProps extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

const defaultStyling =
  'fixed top-0 bottom-0 left-0 z-[998] flex flex-shrink-0 bg-white shadow-[1px_0_2px_0_rgba(0,0,0,0.03)]';

export const ShellSidebar: React.FC<IProps> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const { header, sidebar, sidebarExpanded, direction } = useShellContext();
  const classes = cn(
    defaultStyling,
    direction === 'rtl' ? 'right-0 left-auto' : 'left-0 right-auto',
    // show header
    { 'top-[3.5rem]': !!header },
    // sidebar expanded state
    { 'min-w-[3.5rem]': !!sidebar && !sidebarExpanded },
    { 'min-w-[9.5rem]': !!sidebar && sidebarExpanded },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
});
