import { Flex, FlexProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';

import blurBackground from '@/assets/images/blur.jpg';
import { isBrowser } from '@/utils/ssr';

const useFixViewport = () => {
  const updateCssViewportHeight = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    if (isBrowser) {
      updateCssViewportHeight();
      window.addEventListener('resize', updateCssViewportHeight);
    }

    return () => {
      if (isBrowser) {
        window.removeEventListener('resize', updateCssViewportHeight);
      }
    };
  }, [updateCssViewportHeight]);
};

const Viewport: React.FC<FlexProps> = ({ children, ...props }) => {
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
    >
      {children}
      <div className='fixed w-full h-96 top-0 -z-30 blur-3xl bg-transparent'>
        <img className='w-full h-full bg-cover opacity-5' src={blurBackground} alt='' />
      </div>
    </Flex>
  );
};

export default Viewport;
