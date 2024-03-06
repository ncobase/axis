import React, { FC, useEffect } from 'react';

import { useLocation, useNavigationType } from 'react-router-dom';

import { isBrowser } from '@/helpers/ssr';

interface ViewportProps extends React.PropsWithChildren {}

const useScrollToTop = (): void => {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
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

export const Viewport: FC<ViewportProps> = ({ children }) => {
  useScrollToTop();
  useFixViewport();
  return <React.Fragment>{children}</React.Fragment>;
};
