import '@/config';

import { Flex, getDefaultZIndex } from '@mantine/core';
import { Notifications, NotificationsProps } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from '@/components/error-boundary';
import { AuthProvider } from '@/pages/account/account.context';
import { setupStyles } from '@/plugins';
import Router from '@/router';
import { ThemeProvider, useTheme } from '@/themes';
import { getInitials } from '@/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const notificationsProps: NotificationsProps = {
  position: 'top-right',
  limit: 5
};

const AppDevHint = () => {
  const isProd = import.meta.env.PROD;
  const envName = !isProd && import.meta.env.MODE;
  const theme = useTheme();

  if (!envName || isProd) {
    return null;
  }

  return (
    <Flex
      pos='fixed'
      bottom={0}
      left={0}
      w={16}
      h={16}
      bg={theme.colors.warning[5]}
      c={theme.white}
      style={{ borderTopRightRadius: '40%', zIndex: getDefaultZIndex('max') }}
      justify='center'
      fz='xs'
      align='center'
      tt='uppercase'
    >
      {getInitials(envName)}
    </Flex>
  );
};

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Notifications {...notificationsProps} />
        <AuthProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <Router />
              <ReactQueryDevtools />
              <AppDevHint />
            </ErrorBoundary>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

async function bootstrap() {
  setupStyles();
  mount();
}

bootstrap();
