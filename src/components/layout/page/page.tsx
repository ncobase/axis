import { AppShell, Container, MantineSize } from '@mantine/core';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useFocusMode } from '@/components/layout';
import { Header } from '@/components/layout/page/header';
import { Navbar } from '@/components/layout/page/navbar';
import { useTheme } from '@/themes';

interface PageContextValue {
  layout?: boolean;
  header?: boolean;
  topbar?: React.ReactNode | React.ReactElement;
  navbar?: React.ReactNode | React.ReactElement;
  submenu?: React.ReactNode | React.ReactElement;
  size?: MantineSize;
}

const PageContext = createContext<PageContextValue>({});

export const usePageContext = (): PageContextValue => useContext(PageContext);

interface WrapperProps extends React.PropsWithChildren<{}> {}

const Wrapper: React.FC<WrapperProps> = ({ children, ...rest }): JSX.Element => {
  const { other } = useTheme();
  const { layout, topbar, submenu, size } = usePageContext();
  const containerProps = useMemo(() => ({ size, fluid: !size }), [size]);

  const mt = topbar ? { mt: other.layout.topbar.height } : {};
  const ml = submenu ? { ml: other.layout.submenu.width } : {};

  if (!layout && !topbar && !submenu) return <>{children}</>;

  return (
    <Container p='md' {...mt} {...ml} {...containerProps} {...rest}>
      {children}
    </Container>
  );
};

interface PageTitleProps {
  suffix?: string;
  children?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ suffix = '', children = '' }): JSX.Element => {
  const { t } = useTranslation();
  const title = useMemo(
    () => `${children ? `${children} | ` : ''}${suffix || t('application:title')}`,
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

interface PageProps extends React.PropsWithChildren<{}> {
  header?: boolean;
  navbar?: boolean;
  topbar?: React.ReactElement | React.ReactNode;
  submenu?: React.ReactElement | React.ReactNode;
  size?: MantineSize;
  title?: string;
  layout?: boolean;
  showBack?: boolean;
  [key: string]: unknown;
}

export const Page: React.FC<PageProps> = ({
  header = true,
  topbar,
  navbar,
  submenu,
  size,
  title,
  layout = false,
  showBack = false,
  ...rest
}): JSX.Element => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(
    () => ({ layout, header, topbar, navbar, submenu, size }),
    [layout, header, topbar, navbar, submenu, size]
  );

  const renderContent = () => (
    <>
      {topbar}
      {submenu}
      <Wrapper {...rest} />
    </>
  );

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      {layout && !showBack ? (
        <AppShell
          header={header ? <Header /> : undefined}
          navbar={navbar ? <Navbar /> : undefined}
          padding={0}
        >
          {renderContent()}
        </AppShell>
      ) : (
        renderContent()
      )}
    </PageContext.Provider>
  );
};
