import React from 'react';

export const Submenu: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div className='w-44 bg-red-100' {...rest}>
    {children}
  </div>
);
