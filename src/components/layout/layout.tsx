import React from 'react';

import { useDisclosure } from '@mantine/hooks';

import blurBackground from '@/assets/images/blur.webp';
import { LayoutContext } from '@/components/layout/context/layout';
import { Viewport } from '@/components/viewport';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = React.useState(false);
  const [navIsOpen, { close, open }] = useDisclosure(false);

  const layoutContextValue = {
    isFocusMode,
    setIsFocusMode,
    navIsOpen,
    navOnClose: close,
    navOnOpen: open
  };

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <Viewport>{children}</Viewport>
      <div className='fixed w-full h-full top-0 -z-10  bg-transparent'>
        <img className='w-full h-full bg-cover opacity-20' src={blurBackground} alt='' />
      </div>
    </LayoutContext.Provider>
  );
};
