import { useDisclosure } from '@mantine/hooks';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Viewport from '@/components/viewport';
import { LayoutContext } from '@/layout/context/layout';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = React.useState(false);
  const [navIsOpen, { close, open }] = useDisclosure(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const layoutContextValue = {
    isFocusMode,
    setIsFocusMode,
    navIsOpen: navIsOpen,
    navOnClose: close,
    navOnOpen: open
  };

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <Viewport>{children}</Viewport>
    </LayoutContext.Provider>
  );
};
