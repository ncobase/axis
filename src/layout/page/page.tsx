import { Container, Flex, FlexProps, MantineSize } from '@mantine/core';
import React, { createContext, useContext } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import { useFocusMode } from '@/layout';

interface PageContextValue {
  nav?: React.ReactNode;
  hideContainer: boolean;
  containerSize?: MantineSize;
}

const PageContext = createContext<PageContextValue>({ nav: undefined, hideContainer: false });
const usePageContext = () => useContext(PageContext);

const PageContainer: React.FC<FlexProps> = ({ children, ...rest }) => {
  const { hideContainer, containerSize } = usePageContext();

  if (hideContainer) return <>{children}</>;

  return (
    <Container
      style={{ flex: 1 }}
      size={containerSize}
      fluid={!containerSize && true}
      maw={containerSize}
      {...rest}
    >
      {children}
    </Container>
  );
};

interface ContentProps extends FlexProps {
  onBack?(): void;
  showBack?: boolean;
}

const Content: React.FC<ContentProps> = ({ children, ...rest }) => {
  const { nav } = usePageContext();

  return (
    <PageContainer {...rest}>
      {nav && null}
      {children}
    </PageContainer>
  );
};

interface PageTitleProps {
  suffix?: unknown;
  children?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ suffix, children }) => {
  const { t } = useTranslation();
  const title = children
    ? children + (suffix && suffix !== children ? ` - ${suffix}` : '')
    : t('application:title');

  return (
    <HelmetProvider>
      <Helmet>
        <title key='title'>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

interface PageProps extends FlexProps {
  isFocusMode?: boolean;
  size?: MantineSize;
  hideContainer?: boolean;
  nav?: React.ReactNode;
  title?: any;
}

const Page: React.FC<PageProps> = ({
  isFocusMode = false,
  hideContainer = false,
  size,
  nav,
  title,
  ...rest
}) => {
  const { t } = useTranslation();
  useFocusMode(isFocusMode);

  return (
    <>
      <PageTitle suffix={t('application:title')}>{title}</PageTitle>
      <PageContext.Provider value={{ nav, hideContainer, containerSize: size }}>
        <Flex pos='relative' style={{ flex: 1 }} {...rest} />
      </PageContext.Provider>
    </>
  );
};

export { Content, Page, PageTitle };

//
// <AppShell
//   header={
//     <Header height={58} p='md'>
//       <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
//         <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
//           <Burger
//             opened={opened}
//             onClick={() => setOpened(o => !o)}
//             size='sm'
//             color={theme.colors.gray[6]}
//             mr='xl'
//           />
//         </MediaQuery>
//
//         <Text>header</Text>
//       </div>
//     </Header>
//   }
//   navbar={
//     <Navbar p='md' hiddenBreakpoint='sm' hidden={!opened} width={{ sm: 58, lg: 220 }}>
//       <Text>navbar</Text>
//     </Navbar>
//   }
// >
//   {children}
// </AppShell>
