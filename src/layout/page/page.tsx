import { ActionIcon, AppShell, Container, Flex, FlexProps, Group, Header } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import React, { createContext, useContext, useMemo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Logo from '@/components/logo';
import { useFocusMode } from '@/layout';
import { AccountMenu } from '@/layout/menu/account';
import { DomainMenu } from '@/layout/menu/domain';
import MainMenu from '@/layout/menu/main';
import { useColorScheme, useTheme } from '@/themes';

interface PageContextValue {
  nav?: React.ReactNode;
  hideContainer: boolean;
}

const PageContext = createContext<PageContextValue>({
  nav: undefined,
  hideContainer: false
});

const usePageContext = () => useContext(PageContext);

const PageContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { nav, hideContainer } = usePageContext();

  if (hideContainer) return <>{children}</>;

  return (
    <Container style={{ flex: 1 }} {...rest}>
      {nav ?? null}
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

interface ContentProps extends FlexProps {
  nav?: React.ReactElement;
}

const Content: React.FC<ContentProps> = React.memo(({ nav, children, ...rest }) => {
  const theme = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <AppShell
      header={
        <Header
          height={theme.other.layout.topbar.height}
          bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blueGray[8]}
          w='100vw'
          sx={{
            boxShadow: theme.shadows.sm
          }}
        >
          <Group sx={{ height: '100%' }} pr={theme.spacing.md} position='apart'>
            <Group>
              <Logo w={55} h={55} bg={theme.colors.blueGray[9]} type='min' logoColor='white' />
              <MainMenu />
            </Group>
            <Group>
              <ActionIcon onClick={() => toggleColorScheme()} size={30}>
                {colorScheme === 'dark' ? <IconSun size='1rem' /> : <IconMoonStars size='1rem' />}
              </ActionIcon>
              <DomainMenu />
              <AccountMenu />
            </Group>
          </Group>
        </Header>
      }
      navbar={nav}
    >
      <PageContainer {...rest}>{children}</PageContainer>
    </AppShell>
  );
});

interface PageProps extends FlexProps {
  nav?: React.ReactElement;
  title?: any;
  useContent?: boolean;
  showBack?: boolean;
}

const Page: React.FC<PageProps> = ({ nav, title, useContent = false, ...rest }) => {
  const { t } = useTranslation();
  useFocusMode();

  const pageContextValue = useMemo(() => ({ nav, hideContainer: useContent }), [nav, useContent]);

  return (
    <PageContext.Provider value={pageContextValue}>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      <Flex pos='relative' style={{ flex: 1 }} {...rest}>
        {useContent ? <Content nav={nav} {...rest} /> : rest.children}
      </Flex>
    </PageContext.Provider>
  );
};

export { Page, PageTitle };
