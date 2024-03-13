import React from 'react';

import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
import { Submenu } from './components/submenu';
import { Topbar } from './components/topbar';

interface ShellProps extends React.PropsWithChildren {
  /** <Header /> component */
  header?: React.ReactElement;
  /** <Sidebar /> component */
  sidebar?: React.ReactElement;
  /** <Topbar /> component */
  topbar?: React.ReactElement;
  /** <Submenu /> component */
  submenu?: React.ReactElement;
}

const Shell: React.FC<ShellProps> = ({ header, sidebar, topbar, submenu, children }) => {
  return (
    <div className='flex h-screen w-screen flex-col'>
      {header && <Header>{header}</Header>}
      <div className='flex flex-1'>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <div className='flex flex-col flex-1'>
          {topbar && <Topbar>{topbar}</Topbar>}
          <div className='flex flex-1 overflow-auto'>
            {submenu && <Submenu>{submenu}</Submenu>}
            <div className='flex-1'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Shell };
