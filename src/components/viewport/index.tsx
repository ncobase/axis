import { BoxProps } from '@mantine/core';
import React, { FC, Fragment, useCallback, useEffect, useRef } from 'react';

import blurBackground from '@/assets/images/blur.jpg';
import { isBrowser } from '@/utils/ssr';

interface VProps extends BoxProps {}

const useScrollToTop = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, []);

  return contentRef;
};

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

const Viewport: FC<VProps> = ({ children }) => {
  const contentRef = useScrollToTop();
  useFixViewport();

  return (
    <Fragment>
      {children}
      <div className='fixed w-full h-96 top-0 -z-30 blur-3xl bg-transparent' ref={contentRef}>
        <img className='w-full h-full bg-cover opacity-5' src={blurBackground} alt='' />
      </div>
    </Fragment>
  );
};

export default Viewport;
