import React from 'react';

export const Submenu: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div
    className='sticky left-0 top-36 z-10 flex justify-start bg-slate-100 shadow-sm h-full'
    {...rest}
  >
    {children}
  </div>
);
