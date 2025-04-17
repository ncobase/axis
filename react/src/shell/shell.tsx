import React, { memo, type ReactNode, useMemo } from 'react';

import { cn } from '@ncobase/utils';

import { ShellContext } from './shell.context';

interface IProps extends React.PropsWithChildren {
  /** <Header /> component */
  header?: ReactNode;
  /** <Sidebar /> component */
  sidebar?: ReactNode;
  /** <Topbar /> component */
  topbar?: ReactNode;
  /** <Submenu /> component */
  submenu?: ReactNode;
  /** main area className */
  className?: string;
  /** Sidebar expanded state */
  sidebarExpanded?: boolean;
  /** Layout direction: 'ltr' | 'rtl' */
  direction?: 'ltr' | 'rtl';
}

const defaultStyling = 'relative flex h-lvh overflow-hidden';

// Calculate padding classes based on component presence
const getLayoutClasses = (
  header: ReactNode | undefined,
  topbar: ReactNode | undefined,
  sidebar: ReactNode | undefined,
  submenu: ReactNode | undefined,
  sidebarExpanded: boolean,
  direction: 'ltr' | 'rtl'
) => {
  const classes: Record<string, boolean> = {};

  // Header and topbar padding
  if (!!header && !topbar) classes['pt-[3.5rem]'] = true; // show header && hide topbar
  if (!header && !!topbar) classes['pt-[3rem]'] = true; // hide header && show topbar
  if (!!header && !!topbar) classes['pt-[6.5rem]'] = true; // show header && show topbar

  // Sidebar and submenu padding
  if (direction === 'ltr') {
    if (!!sidebar && !submenu && !sidebarExpanded) classes['pl-[3.5rem]'] = true; // show sidebar && hide submenu && sidebar collapsed
    if (!!sidebar && !submenu && sidebarExpanded) classes['pl-[9.5rem]'] = true; // show sidebar && hide submenu && sidebar expanded
    if (!sidebar && !!submenu && !sidebarExpanded) classes['pl-[9rem]'] = true; // hide sidebar && show submenu && sidebar collapsed
    if (!sidebar && !!submenu && sidebarExpanded) classes['pl-[14rem]'] = true; // hide sidebar && show submenu && sidebar expanded
    if (!!sidebar && !!submenu && !sidebarExpanded) classes['pl-[12.5rem]'] = true; // show sidebar && show submenu && sidebar collapsed
    if (!!sidebar && !!submenu && sidebarExpanded) classes['pl-[19rem]'] = true; // show sidebar && show submenu && sidebar expanded
  } else {
    if (!!sidebar && !submenu && !sidebarExpanded) classes['pr-[3.5rem]'] = true; // show sidebar && hide submenu && sidebar collapsed
    if (!!sidebar && !submenu && sidebarExpanded) classes['pr-[9.5rem]'] = true; // show sidebar && hide submenu && sidebar expanded
    if (!sidebar && !!submenu && !sidebarExpanded) classes['pr-[9rem]'] = true; // hide sidebar && show submenu && sidebar collapsed
    if (!sidebar && !!submenu && sidebarExpanded) classes['pr-[14rem]'] = true; // hide sidebar && show submenu && sidebar expanded
    if (!!sidebar && !!submenu && !sidebarExpanded) classes['pr-[12.5rem]'] = true; // show sidebar && show submenu && sidebar collapsed
    if (!!sidebar && !!submenu && sidebarExpanded) classes['pr-[19rem]'] = true; // show sidebar && show submenu && sidebar expanded
  }

  return classes;
};

export const Shell: React.FC<IProps> = memo(
  ({
    children,
    header,
    sidebar,
    topbar,
    submenu,
    className,
    sidebarExpanded = false,
    direction = 'ltr',
    ...rest
  }) => {
    const layoutClasses = useMemo(
      () => getLayoutClasses(header, topbar, sidebar, submenu, sidebarExpanded, direction),
      [header, topbar, sidebar, submenu, sidebarExpanded, direction]
    );

    const mainClassName = cn(defaultStyling, layoutClasses, className);

    const contextValue = useMemo(
      () => ({ header, sidebar, topbar, submenu, sidebarExpanded, direction }),
      [header, sidebar, topbar, submenu, sidebarExpanded, direction]
    );

    return (
      <ShellContext.Provider value={contextValue}>
        {header}
        <div className={mainClassName} {...rest} dir={direction} role='main'>
          {sidebar}
          {topbar}
          {submenu}
          {children}
        </div>
      </ShellContext.Provider>
    );
  }
);
