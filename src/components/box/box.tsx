import { PropsWithChildren } from 'react';

interface BoxProps extends PropsWithChildren {}

export const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <div className='p-6 mb-6 bg-white rounded-xl shadow-sm' {...rest}>
      {children}
    </div>
  );
};
