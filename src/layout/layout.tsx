import { useDisclosure } from '@mantine/hooks';
import React, { useRef } from 'react';

import Viewport from '@/components/viewport';
import { LayoutContext } from '@/layout/context/layout';
import { LoginModalInterceptor } from '@/pages/account/login_modal_interceptor';

interface LayoutProps {
  children: React.ReactNode;
}

const useScrollToTop = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo(0, 0);
    }
  }, []);

  return contentRef;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isFocusMode, setIsFocusMode] = React.useState(false);
  const [navIsOpen, { close, open }] = useDisclosure(false);
  const contentRef = useScrollToTop();

  const layoutContextValue = {
    isFocusMode,
    setIsFocusMode,
    navIsOpen,
    navOnClose: close,
    navOnOpen: open
  };

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <Viewport>
        <div ref={contentRef}>{children}</div>
        <LoginModalInterceptor />
      </Viewport>
    </LayoutContext.Provider>
  );
};
