import React, { type HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@ncobase/utils';

import { useShellContext } from './shell.context';

interface IProps extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {}

const defaultStyling =
  'fixed left-0 top-0 right-0 z-[997] flex flex-shrink-0 min-h-12 bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]';

export const ShellTopbar: React.FC<IProps> = memo(({ children, className, ...rest }) => {
  if (!children) return null;
  const { header, sidebar, sidebarExpanded } = useShellContext();
  const classes = cn(
    defaultStyling,
    // show sidebar
    { 'left-[3.5rem]': !!sidebar && !sidebarExpanded },
    { 'left-[9.5rem]': !!sidebar && sidebarExpanded },
    // show header
    { 'top-[3.5rem]': !!header },
    className
  );
  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
});
