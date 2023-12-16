import React from 'react';

export const Sidebar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <aside className='w-14 bg-yellow-100' {...rest}>
    {children}
  </aside>
);
