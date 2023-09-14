import { BoxProps } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { FC, Fragment, RefObject, useCallback, useEffect } from 'react';

import blurBackground from '@/assets/images/blur.jpg';
import { isBrowser } from '@/utils/ssr';

interface VProps extends BoxProps {
  ref: RefObject<HTMLDivElement>;
}

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

const Viewport: FC<VProps> = ({ children, ...props }) => {
  const isStandalone = useMediaQuery('(display-mode: standalone)');
  useFixViewport();

  return (
    <Fragment
      style={
        isStandalone
          ? { minHeight: 'calc(var(--vh, 1vh) * 100)', position: 'relative' }
          : { position: 'relative' }
      }
      {...props}
    >
      {children}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          zIndex: -30
        }}
      >
        <img
          style={{
            width: '100%',
            height: '100%',
            filter: 'blur(64rem)',
            backgroundImage: `url('${blurBackground}')`,
            opacity: 0.08,
            transform: 'rotate(45deg)'
          }}
          alt=''
        />
      </div>
    </Fragment>
  );
};

export default Viewport;
