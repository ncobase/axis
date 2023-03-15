import '@/config';

import { Notifications, NotificationsProps } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { AuthProvider } from '@/pages/account/account.context';
import { ThemeProvider } from '@/themes';

const queryClient = new QueryClient();

const notificationsProps: NotificationsProps = {
  position: 'top-right',
  limit: 5
};

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Notifications {...notificationsProps} />
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
