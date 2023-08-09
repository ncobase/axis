import { Container, FlexProps, MantineSize } from '@mantine/core';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Shell from '@/components/shell/shell';
import { useFocusMode } from '@/layouts/main';
import { Header } from '@/layouts/main/page/header';

interface PageContextValue {
  topbar?: React.ReactNode;
  navbar?: React.ReactNode;
  size?: MantineSize;
  noWithContainer?: boolean;
}

const PageContext = createContext<PageContextValue>({
  navbar: undefined,
  size: undefined,
  noWithContainer: false
});

export const usePageContext = () => useContext(PageContext);

const ContentContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { size, noWithContainer } = usePageContext();
  const containerProps = useMemo(() => ({ size, fluid: !size }), [size]);
  if (noWithContainer) return <>{children}</>;
  return (
    <Container style={{ flex: 1 }} p='md' {...containerProps} {...rest}>
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
  header?: React.ReactElement;
  navbar?: React.ReactElement;
  topbar?: React.ReactElement;
  size?: MantineSize;
  noWithContainer?: boolean;
  title?: any;
  withLayout?: boolean;
  showBack?: boolean;
}

export const Page: React.FC<PageProps> = ({
  header = <Header />,
  topbar,
  navbar = <></>,
  size,
  noWithContainer = false,
  title,
  withLayout = false,
  showBack = false,
  ...rest
}) => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(
    () => ({ header, topbar, navbar, size, noWithContainer }),
    [header, topbar, navbar, size, noWithContainer]
  );

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      {withLayout && !showBack ? (
        <Shell header={header} navbar={navbar} padding={0}>
          {topbar && topbar}
          <ContentContainer {...rest} />
        </Shell>
      ) : (
        rest.children
      )}
    </PageContext.Provider>
  );
};
