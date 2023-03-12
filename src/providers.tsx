import '@/config';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { AuthProvider } from '@/pages/account/account.context';
import ThemeProvider from '@/themes/provider';

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
