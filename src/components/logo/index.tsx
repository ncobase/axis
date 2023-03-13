import { Flex } from '@mantine/core';
import React from 'react';

import Full from '@/components/logo/full';
import FullMask from '@/components/logo/full_mask';
import Min from '@/components/logo/min';

export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  logoColor?: string;
  textColor?: string;
  bg?: string;
  type?: 'min' | 'full' | 'full-mask';
}

const Logo: React.FC<LogoProps> = ({ bg, type = 'min', ...rest }) => {
  const LogoComponent = type === 'min' ? Min : type === 'full' ? Full : FullMask;

  return (
    <Flex justify='center' align='center' bg={bg}>
      <LogoComponent logoColor={rest.logoColor} height={rest.height} textColor={rest.textColor} />
    </Flex>
  );
};

export default Logo;
