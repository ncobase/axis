import { AppShell, Container, Flex, FlexProps, MantineSize } from '@mantine/core';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useFocusMode } from '@/layout';
import { Header } from '@/layout/page/header';

interface PageContextValue {
  nav?: React.ReactNode;
  size?: MantineSize;
}

const PageContext = createContext<PageContextValue>({
  nav: undefined,
  size: undefined
});

export const usePageContext = () => useContext(PageContext);

const PageContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { size } = usePageContext();
  return (
    <Container
      style={{ flex: 1, padding: 0, margin: 0 }}
      size={size}
      fluid={!size && true}
      {...rest}
    >
      {children}
    </Container>
  );
};

interface PageTitleProps {
  suffix?: any;
  children?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ suffix = '', children = '' }) => {
  const { t } = useTranslation();
  const title = useMemo(
    () => `${children ? `${children} - ` : ''}${suffix || t('application:title')}`,
    [children, suffix, t]
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title key='title'>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

interface PageProps extends FlexProps {
  nav?: React.ReactElement;
  size?: MantineSize;
  title?: any;
  useLayout?: boolean;
  showBack?: boolean;
}

export const Page: React.FC<PageProps> = ({ nav, size, title, useLayout = false, ...rest }) => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(() => ({ nav, size }), [nav, size]);

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      <Flex pos='relative' style={{ flex: 1 }} {...rest}>
        {useLayout ? (
          <AppShell header={<Header />} navbar={nav}>
            <PageContainer {...rest} />
          </AppShell>
        ) : (
          rest.children
        )}
      </Flex>
    </PageContext.Provider>
  );
};

export default Page;
