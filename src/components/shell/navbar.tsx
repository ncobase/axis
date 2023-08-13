import React from 'react';

export const Navbar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <nav className='w-14' {...rest}>
    {children}
  </nav>
);
