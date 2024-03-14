import React, { ReactNode, memo } from 'react';

import { cn } from '@tone/utils';

interface Props extends React.PropsWithChildren {
  /** <Header /> component */
  header?: ReactNode;
  /** <Sidebar /> component */
  sidebar?: ReactNode;
  /** <Topbar /> component */
  topbar?: ReactNode;
  /** <Submenu /> component */
  submenu?: ReactNode;
}

export const Shell: React.FC<Props> = memo(({ children, header, sidebar, topbar, submenu }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {header}
      <main className={cn('flex flex-1')}>
        {sidebar}
        <div className={cn('flex flex-1 flex-col')}>
          {topbar}
          <div className={cn('flex flex-1')}>
            {submenu}
            <div className='flex-1 overflow-auto' role='main'>
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});
