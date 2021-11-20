import { Flex, FlexProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect } from 'react';

import { isBrowser } from '@/utils/ssr';

const useFixViewport = () => {
  useEffect(() => {
    const updateCssViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    if (isBrowser) {
      updateCssViewportHeight();
      window.addEventListener('resize', updateCssViewportHeight);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', updateCssViewportHeight);
      }
    };
  }, []);
};

const Vitwport: React.FC<FlexProps> = props => {
  const isStandalone = useMediaQuery('(display-mode: standalone)');
  useFixViewport();
  return (
    <Flex
      pos='relative'
      direction={{ base: 'column', lg: 'row' }}
      mih='100vh'
      mah='100vw'
      style={isStandalone ? { minHeight: 'calc(var(--vh, 1vh) * 100)' } : {}}
      {...props}
    />
  );
};

export default Vitwport;
