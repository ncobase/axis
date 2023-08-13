import React from 'react';

export const Sidebar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div className='w-44' {...rest}>
    {children}
  </div>
);
