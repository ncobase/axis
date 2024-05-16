import React from 'react';

import * as TIcons from '@tabler/icons-react';
import { cn } from '@tone/utils';

interface IProps extends TIcons.IconProps {
  name: keyof typeof TIcons | string | undefined;
}

export const TablerIconsNamespace = TIcons['icons'];

export const Icons: React.FC<IProps> = ({ name, size = 16, stroke = 1.5, ...rest }) => {
  const IconComponent = name
    ? (TIcons[name as keyof typeof TIcons] as React.FC<TIcons.IconProps>)
    : null;

  if (!IconComponent) {
    return null;
  }

  const isFilled = name.endsWith('Filled');
  const classes = cn(
    'inline-block stroke-slate-400/65',
    isFilled && 'stroke-[0] stroke-none fill-slate-400/65'
  );

  return (
    <IconComponent size={size} strokeWidth={isFilled ? 0 : stroke} className={classes} {...rest} />
  );
};
