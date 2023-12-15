import '@/config';

import { Flex, getDefaultZIndex } from '@mantine/core';
import { Notifications, NotificationsProps } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from '@/features/account/context';
import { Router } from '@/router';
import { setupStyles } from '@/styles';
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
  const { white, colors } = useTheme();

  if (!envName || isProd) {
    return null;
  }

  return (
    <>
      <Flex
        pos='fixed'
        style={{
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          color: white,
          backgroundColor: colors.warning[5],
          borderBottomRightRadius: '42%',
          zIndex: getDefaultZIndex('max')
        }}
        justify='center'
        fz='xs'
        align='center'
        tt='uppercase'
      >
        {getInitials(envName)}
      </Flex>
      <ReactQueryDevtools />
    </>
  );
};

const mount = () => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Notifications {...notificationsProps} />
        <AuthProvider>
          <ThemeProvider>
            <Router />
            <AppDevHint />
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
