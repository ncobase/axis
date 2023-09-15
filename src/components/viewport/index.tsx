import { BoxProps } from '@mantine/core';
import React, { FC, Fragment, useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

import blurBackground from '@/assets/images/blur.jpg';
import { isBrowser } from '@/utils/ssr';

interface VProps extends BoxProps {}

const useScrollToTop = (): void => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);
};

const useFixViewport = (): void => {
  useEffect(() => {
    function updateCssViewportHeight(): void {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
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

const Viewport: FC<VProps> = ({ children }) => {
  useScrollToTop();
  useFixViewport();
  return (
    <Fragment>
      {children}
      <div className='fixed w-full h-96 top-0 -z-30 blur-3xl bg-transparent'>
        <img className='w-full h-full bg-cover opacity-5' src={blurBackground} alt='' />
      </div>
    </Fragment>
  );
};

export default Viewport;
