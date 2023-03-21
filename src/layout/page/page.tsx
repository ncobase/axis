import { AppShell, Container, Flex, FlexProps, MantineSize, Navbar } from '@mantine/core';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useFocusMode } from '@/layout';
import { Header } from '@/layout/page/header';

interface PageContextValue {
  nav?: React.ReactNode;
  size?: MantineSize;
  hideContainer?: boolean;
}

const PageContext = createContext<PageContextValue>({
  nav: undefined,
  size: undefined,
  hideContainer: false
});

export const usePageContext = () => useContext(PageContext);

const PageContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { size, hideContainer } = usePageContext();
  const containerProps = useMemo(() => ({ size, fluid: !size }), [size]);
  return hideContainer ? (
    <Flex {...rest}>{children}</Flex>
  ) : (
    <Container style={{ flex: 1, padding: 0 }} {...containerProps} {...rest}>
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
  hideContainer?: boolean;
  title?: any;
  useLayout?: boolean;
  showBack?: boolean;
}

export const Page: React.FC<PageProps> = ({
  nav = <Navbar width={{ sm: 0 }} children={null} />,
  size,
  hideContainer,
  title,
  useLayout = false,
  ...rest
}) => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(
    () => ({ nav, size, hideContainer }),
    [nav, size, hideContainer]
  );

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      <Flex pos='relative' style={{ flex: 1 }} {...rest}>
        {useLayout ? (
          <AppShell header={<Header />} navbar={nav} padding={hideContainer ? 0 : 'md'}>
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
