import { Flex, getDefaultZIndex, Text, useMantineTheme } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from '@/components/error-boundary';
import { setupStyles } from '@/plugins';
import { Providers } from '@/providers';
import Router from '@/router';
import { getInitials } from '@/utils';

const AppDevHint = () => {
  const isProd = import.meta.env.PROD;
  const envName = !isProd && import.meta.env.MODE;
  const theme = useMantineTheme();

  if (!envName || isProd) {
    return null;
  }

  return (
    <Flex
      pos='fixed'
      top={0}
      left={0}
      right={0}
      w={17}
      pr={1}
      h={16}
      bg={theme.colors.warning[5]}
      c={theme.white}
      style={{ borderBottomRightRadius: '40%', zIndex: getDefaultZIndex('max') }}
      justify='center'
      fz='xs'
      align='center'
    >
      <Text tt='uppercase'>{getInitials(envName)}</Text>
    </Flex>
  );
};

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Providers>
        <ErrorBoundary>
          <Router />
          <ReactQueryDevtools />
          <AppDevHint />
        </ErrorBoundary>
      </Providers>
    </React.StrictMode>
  );
};

async function bootstrap() {
  setupStyles();
  mount();
}

bootstrap();
