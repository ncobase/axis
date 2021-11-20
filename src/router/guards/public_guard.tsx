import React from 'react';
import { Navigate } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';

interface PublicGuardProps {
  isAuthenticated?: boolean;
}

export const PublicGuard: React.FC<React.PropsWithChildren<PublicGuardProps>> = ({
  children,
  isAuthenticated
}) => {
  return isAuthenticated ? <Navigate to='/' replace /> : <ErrorBoundary>{children}</ErrorBoundary>;
};
