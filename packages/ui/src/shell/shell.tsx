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

const defaultStyling = 'flex flex-shrink-0 flex-1 flex-row relative';

export const Shell: React.FC<IProps> = memo(({ children, header, sidebar, topbar, submenu }) => {
  const mainClassName = cn(
    defaultStyling,
    // show header
    { 'mt-14': !!header },
    // show topbar
    { 'pt-12': !!topbar },
    // show sidebar
    { 'ml-14': !!sidebar },
    // show submenu
    { 'pl-44': !!submenu }
  );

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
