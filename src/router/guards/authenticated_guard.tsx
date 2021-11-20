import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';

interface AuthenticatedGuardProps {
  isAuthenticated?: boolean;
}

export const AuthenticatedGuard: React.FC<React.PropsWithChildren<AuthenticatedGuardProps>> = ({
  children,
  isAuthenticated = true
}) => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(pathname + search)}`, {
        replace: true
      });
    }
  }, [isAuthenticated, navigate, pathname, search]);

  return !isAuthenticated ? null : <ErrorBoundary>{children}</ErrorBoundary>;
};
