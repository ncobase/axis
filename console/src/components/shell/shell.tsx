import React from 'react';

import { Footer } from '@/components/shell/components/footer';
import { Header } from '@/components/shell/components/header';
import { Sidebar } from '@/components/shell/components/sidebar';
import { Submenu } from '@/components/shell/components/submenu';
import { Topbar } from '@/components/shell/components/topbar';

interface ShellProps extends React.PropsWithChildren {
  /** <Header /> component */
  header?: React.ReactElement;
  /** <Sidebar /> component */
  sidebar?: React.ReactElement;
  /** <Topbar /> component */
  topbar?: React.ReactElement;
  /** <Submenu /> component */
  submenu?: React.ReactElement;
  /** <Footer /> component */
  footer?: React.ReactElement;
}

export const Shell: React.FC<ShellProps> = ({
  header,
  sidebar,
  topbar,
  submenu,
  footer,
  children
}) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {header && <Header>{header}</Header>}
      <main className='flex-1 flex bg-white'>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
        <div className='flex-1 flex flex-col'>
          {topbar && <Topbar>{topbar}</Topbar>}
          <div className='flex-1 flex'>
            {submenu && <Submenu>{submenu}</Submenu>}
            {children && <div className='flex-1'>{children}</div>}
          </div>
          {footer && <Footer>{topbar}</Footer>}
        </div>
      </main>
    </div>
  );
};
