import React from 'react';

import { Header } from '@/components/shell/header';
import { Navbar } from '@/components/shell/navbar';
import { Sidebar } from '@/components/shell/sidebar';
import { Topbar } from '@/components/shell/topbar';

interface ShellProps extends React.PropsWithChildren {
  /** <Header /> component */
  header?: React.ReactElement;
  /** <Navbar /> component */
  navbar?: React.ReactElement;
  /** <Topbar /> component */
  topbar?: React.ReactElement;
  /** <Sidebar /> component */
  sidebar?: React.ReactElement;
  /** <Footer /> component */
  footer?: React.ReactElement;
}

export const Shell: React.FC<ShellProps> = ({ header, navbar, topbar, sidebar, children }) => {
  return (
    <div className='h-screen w-screen flex flex-col'>
      {header && <Header>{header}</Header>}
      <div className='flex-1 flex'>
        {navbar && <Navbar>{navbar}</Navbar>}
        <div className='flex flex-1 flex-col'>
          {topbar && <Topbar>{topbar}</Topbar>}
          <div className='flex flex-1'>
            {sidebar && <Sidebar>{sidebar}</Sidebar>}
            {children && <div className='flex flex-1'>{children}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
