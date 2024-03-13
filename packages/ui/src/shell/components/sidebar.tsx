import React from 'react';

export const Sidebar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div className='sticky left-0 top-14 z-40 flex w-14 shadow-sm' {...rest}>
    {children}
  </div>
);
