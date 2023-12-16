import React from 'react';

export const Header: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <header className='h-14 bg-gray-100' {...rest}>
    {children}
  </header>
);
