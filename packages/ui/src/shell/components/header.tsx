import React from 'react';

export const Header: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div
    className='sticky top-0 z-50 flex min-h-14 items-center bg-slate-800 text-white shadow-sm w-full'
    {...rest}
  >
    {children}
  </div>
);
