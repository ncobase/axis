import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import Viewport from '@/components/viewport';
import { LayoutContext } from '@/layouts/main/context/layout';
import { LoginModalInterceptor } from '@/pages/account/auth/login_modal_interceptor';

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
      <LoginModalInterceptor />
    </LayoutContext.Provider>
  );
};

export default Layout;
