import * as Icon from '@tabler/icons-react';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';

import { useTheme } from '@/themes';

interface IProps extends TablerIconsProps {
  name: keyof typeof Icon;
}

export const DIcon: React.FC<IProps> = ({ name, ...rest }) => {
  const { colors } = useTheme();
  const Component = Icon[name] as React.FC<TablerIconsProps>;
  if (!Component) {
    console.error(`Icon "${name}" is not exist!`);
    return null;
  }
  return <Component size={16} strokeWidth={1.5} color={colors.blueGray[5]} {...rest} />;
};
