import React from 'react';

export const Footer: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <footer className='bg-cyan-100' {...rest}>
    {children}
  </footer>
);
