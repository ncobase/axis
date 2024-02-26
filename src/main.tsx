import '@/setup';

import React from 'react';

import { Notifications, NotificationsProps } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import { setupStyles } from '@/assets/styles';
import { AppDevHint } from '@/components/app_dev_hint';
import { AuthProvider } from '@/features/account/context';
import { Router } from '@/router';
import { ThemeProvider } from '@/themes';

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

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Notifications {...notificationsProps} />
          <AuthProvider>
            <Router />
          </AuthProvider>
          <AppDevHint />
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

async function bootstrap() {
  setupStyles();
  mount();
}

bootstrap();
