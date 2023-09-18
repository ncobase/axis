import { AppShell, Container, FlexProps, MantineSize } from '@mantine/core';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useFocusMode } from '@/layouts/main';
import { Header } from '@/layouts/main/page/header';
import { Navbar } from '@/layouts/main/page/navbar';
import { useTheme } from '@/themes';

interface PageContextValue {
  withLayout?: boolean;
  header?: React.ReactNode;
  topbar?: React.ReactNode;
  navbar?: React.ReactNode;
  size?: MantineSize;
}

const PageContext = createContext<PageContextValue>({
  withLayout: undefined,
  header: undefined,
  topbar: undefined,
  navbar: undefined,
  size: undefined
});

export const usePageContext = () => useContext(PageContext);

const ContentContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { size } = usePageContext();
  const containerProps = useMemo(() => ({ size, fluid: !size }), [size]);
  return (
    <Container p='md' {...containerProps} {...rest}>
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
  header?: boolean;
  navbar?: boolean;
  topbar?: React.ReactElement;
  sidebar?: React.ReactElement;
  size?: MantineSize;
  title?: any;
  withLayout?: boolean;
  showBack?: boolean;
}

const Content: React.FC<{ withLayout: boolean; topbar: boolean; rest: { [key: string]: any } }> = ({
  withLayout,
  topbar,
  rest
}) => {
  const { other } = useTheme();
  return withLayout ? (
    <ContentContainer mt={topbar ? other.layout.topbar.height : 'unset'} {...rest} />
  ) : (
    <>{rest.children}</>
  );
};

export const Page: React.FC<PageProps> = ({
  header = true,
  topbar,
  navbar,
  sidebar,
  size,
  title,
  withLayout = false,
  showBack = false,
  ...rest
}) => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(
    () => ({ withLayout, header, topbar, navbar, sidebar, size }),
    [withLayout, header, topbar, navbar, sidebar, size]
  );

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      {withLayout && !showBack ? (
        <AppShell
          header={header ? <Header /> : undefined}
          navbar={navbar ? <Navbar /> : undefined}
          padding={0}
        >
          {topbar}
          {/* TODO: {sidebar && sidebar}*/}
          <Content withLayout={withLayout} topbar={!!topbar} rest={rest} />
        </AppShell>
      ) : (
        <>
          {topbar}
          <Content withLayout={withLayout} topbar={!!topbar} rest={rest} />
        </>
      )}
    </PageContext.Provider>
  );
};
