import React from 'react';

import * as TIcons from '@tabler/icons-react';

interface IProps extends TIcons.IconProps {
  name: keyof typeof TIcons | string | undefined;
}

export const Icons: React.FC<IProps> = ({ name, size = 16, stroke = 1.5, ...rest }) => {
  const Component = TIcons[name as keyof typeof TIcons] as React.FC<TIcons.IconProps>;
  if (!Component) {
    return null;
  }
  return <Component size={size} strokeWidth={stroke} className='stroke-slate-400/65' {...rest} />;
};
