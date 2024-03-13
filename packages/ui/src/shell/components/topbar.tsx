import React from 'react';

export const Topbar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div
    className='sticky top-14 z-30 flex h-12 items-center bg-slate-200 shadow-sm w-full'
    {...rest}
  >
    {children}
  </div>
);
