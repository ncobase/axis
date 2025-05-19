import React, { type HtmlHTMLAttributes, memo } from 'react';

import { cn } from '@ncobase/utils';

import { useShellContext } from './shell.context';

interface IProps extends React.PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {
  /** Accessibility role, defaults to 'navigation' */
  role?: string;
}

const defaultStyling =
  'fixed top-0 bottom-0 z-996 flex shrink-0 flex-col min-w-36 max-w-36 bg-white shadow-[1px_0_2px_0_rgba(0,0,0,0.03)]';

// Calculate positions based on other components
const getPositioningClasses = (
  direction?: 'ltr' | 'rtl',
  sidebar?: React.ReactNode | undefined,
  sidebarExpanded?: boolean,
  header?: React.ReactNode | undefined,
  topbar?: React.ReactNode | undefined
) => {
  const classes = [];

  // Handle horizontal positioning with RTL support
  if (direction === 'rtl') {
    classes.push('right-0');
    if (!!sidebar && !sidebarExpanded) classes.push('right-[3.5rem]'); // show sidebar && sidebar collapsed
    if (!!sidebar && sidebarExpanded) classes.push('right-[9.5rem]'); // show sidebar && sidebar expanded
  } else {
    classes.push('left-0');
    if (!!sidebar && !sidebarExpanded) classes.push('left-[3.5rem]'); // show sidebar && sidebar collapsed
    if (!!sidebar && sidebarExpanded) classes.push('left-[9.5rem]'); // show sidebar && sidebar expanded
  }

  // Handle vertical positioning
  if (!!header && !!topbar) classes.push('top-[6.5rem]'); // show header && show topbar
  if (!header && !!topbar) classes.push('top-[3rem]'); // hide header && show topbar
  if (!!header && !topbar) classes.push('top-[3.5rem]'); // show header && hide topbar

  return classes;
};

export const ShellSubmenu: React.FC<IProps> = memo(
  ({ children, className, role = 'navigation', ...rest }) => {
    if (!children) return null;

    const { header, topbar, sidebar, sidebarExpanded, direction } = useShellContext();

    const positioningClasses = getPositioningClasses(
      direction,
      sidebar,
      sidebarExpanded,
      header,
      topbar
    );

    const classes = cn(
      defaultStyling,
      positioningClasses,
      // Hide on mobile, show on larger screens
      // 'hidden md:flex',
      className
    );

    return (
      <div className={classes} role={role} aria-label='Sub navigation' {...rest}>
        {children}
      </div>
    );
  }
);
