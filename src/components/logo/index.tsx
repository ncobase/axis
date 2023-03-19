import { Flex, FlexProps } from '@mantine/core';
import React from 'react';

import Full from '@/components/logo/full';
import FullMask from '@/components/logo/full_mask';
import Min from '@/components/logo/min';

export interface LogoProps extends FlexProps {
  logoColor?: string;
  bg?: string;
  color?: string | undefined;
  height?: number | string | undefined;
  type?: 'min' | 'full' | 'full-mask';
}

const Logo: React.FC<LogoProps> = ({ bg, type = 'min', height, logoColor, color, ...rest }) => {
  const LogoComponent = type === 'min' ? Min : type === 'full' ? Full : FullMask;

  return (
    <Flex justify='center' align='center' bg={bg} {...rest}>
      <LogoComponent logoColor={logoColor} height={height} color={color} />
    </Flex>
  );
};

export default Logo;
