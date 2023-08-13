import React from 'react';

export const Header: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div className='h-14' {...rest}>
    {children}
  </div>
);
