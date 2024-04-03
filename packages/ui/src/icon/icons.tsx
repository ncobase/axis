import React from 'react';

import * as TIcons from '@tabler/icons-react';
import * as colors from '@tone/tailwind/colors.mjs';

interface IProps extends TIcons.IconProps {
  name: keyof typeof TIcons;
}

export const Icons: React.FC<IProps> = ({ name, size = 16, stroke = 1.5, ...rest }) => {
  const Component = TIcons[name] as React.FC<TIcons.IconProps>;
  if (!Component) {
    return null;
  }
  return <Component size={size} strokeWidth={stroke} color={colors.slate[400]} {...rest} />;
};
