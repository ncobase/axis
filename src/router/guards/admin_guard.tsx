import React from 'react';

import { ErrorBoundary } from '@/components/error-boundary';

// TODO: add useAccount()
interface AdminGuardProps {
  Administered?: boolean;
  isLoading?: boolean;
}

export const AdminGuard: React.FC<React.PropsWithChildren<AdminGuardProps>> = ({
  children,
  Administered,
  isLoading
}) => {
  if (isLoading) {
    return null;
  }

  if (!Administered) {
    return <>403</>;
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
};
