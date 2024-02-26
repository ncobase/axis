import React from 'react';

import { ErrorBoundary } from '@/components/error-boundary';
import { useAccount } from '@/features/account/service';

export const AdminGuard: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAdministered, isLoading } = useAccount();
  if (isLoading) {
    return null;
  }

  if (!isAdministered) {
    return <React.Fragment>403</React.Fragment>;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
