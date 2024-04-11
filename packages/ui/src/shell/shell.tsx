import React, { ReactNode, memo } from 'react';

import { cn } from '@tone/utils';

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
}

const defaultStyling = 'relative h-full';

export const Shell: React.FC<IProps> = memo(({ children, header, sidebar, topbar, submenu }) => {
  const mainClassName = cn(defaultStyling, {
    // header and topbar conditions
    'mt-14': !!header && !topbar, // show header && hide topbar
    'mt-12': !header && !!topbar, // show topbar && hide header
    'mt-[6.5rem]': !!header && !!topbar, // show header && show topbar
    // sidebar and submenu conditions
    'ml-14': !!sidebar && !submenu, // show sidebar && hide submenu
    'ml-36': !sidebar && !!submenu, // show submenu && hide sidebar
    'ml-[12.5rem]': !!sidebar && !!submenu // show sidebar && show submenu
  });

  return (
    <ShellContext.Provider value={{ header, sidebar, topbar, submenu }}>
      {header}
      <div className={mainClassName}>
        {sidebar}
        {topbar}
        {submenu}
        {children}
      </div>
    </ShellContext.Provider>
  );
});
