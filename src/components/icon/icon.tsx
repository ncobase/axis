import * as Icon from '@tabler/icons-react';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';

interface IProps extends TablerIconsProps {
  name: keyof typeof Icon;
}

export const DIcon: React.FC<IProps> = ({ name, size = 16, ...rest }) => {
  const Component = Icon[name] as React.FC<TablerIconsProps>;
  if (!Component) {
    console.error(`Icon "${name}" is not exist!`);
    return null;
  }
  return <Component size={size} {...rest} />;
};
