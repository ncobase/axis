import React, { memo, ReactNode } from 'react';

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
}

const defaultStyling = 'relative flex h-lvh overflow-hidden';

export const Shell: React.FC<IProps> = memo(
  ({ children, header, sidebar, topbar, submenu, className, sidebarExpanded = false, ...rest }) => {
    const mainClassName = cn(
      defaultStyling,
      {
        // header and topbar conditions
        'pt-[3.5rem]': !!header && !topbar, // show header && hide topbar
        'pt-[3rem]': !header && !!topbar, // show topbar && hide header
        'pt-[6.5rem]': !!header && !!topbar, // show header && show topbar
        // sidebar and submenu conditions
        'pl-[3.5rem]': !!sidebar && !submenu && !sidebarExpanded, // show sidebar && hide submenu && sidebar collapsed
        'pl-[10rem]': !!sidebar && !submenu && sidebarExpanded, // show sidebar && hide submenu && sidebar expanded
        'pl-[9rem]': !sidebar && !!submenu && !sidebarExpanded, // show submenu && hide sidebar
        'pl-[14rem]': !sidebar && !!submenu && sidebarExpanded, // show submenu && hide sidebar && sidebar expanded
        'pl-[12.5rem]': !!sidebar && !!submenu && !sidebarExpanded, // show sidebar && show submenu && sidebar collapsed
        'pl-[19rem]': !!sidebar && !!submenu && sidebarExpanded // show sidebar && show submenu && sidebar expanded
      },
      className
    );

    return (
      <ShellContext.Provider value={{ header, sidebar, topbar, submenu, sidebarExpanded }}>
        {header}
        <div className={mainClassName} {...rest}>
          {sidebar}
          {topbar}
          {submenu}
          {children}
        </div>
      </ShellContext.Provider>
    );
  }
);
