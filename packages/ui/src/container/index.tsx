import React from 'react';

import { cn } from '@tone/utils';

export type TSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  size?: TSizes | string | number;
}

export const Container: React.FC<ContainerProps> = ({ className, size = 'full', ...rest }) => {
  const sizes = {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: '',
    '2xl': ''
  };

  const classess = cn('container mx-auto p-4', `max-w-${[size]}`, className, sizes[size]);

  return <div className={classess} {...rest}></div>;
};
