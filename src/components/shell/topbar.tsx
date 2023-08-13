import React from 'react';

export const Topbar: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => (
  <div className='h-12' {...rest}>
    {children}
  </div>
);
