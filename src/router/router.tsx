import { LoadingOverlay } from '@mantine/core';
import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/errors';
import { Layout } from '@/layout/layout';
import { ForgetPassword } from '@/pages/account/auth/forget_password';
import { Login } from '@/pages/account/auth/login';
import { Register } from '@/pages/account/auth/register';
import { Logout } from '@/pages/account/logout';
import { AdminGuard } from '@/router/guards/admin_guard';
import { AuthenticatedGuard } from '@/router/guards/authenticated_guard';
import { PublicGuard } from '@/router/guards/public_guard';

const AccountRoutes = React.lazy(() => import('@/pages/account/account.routes'));
const DashRoutes = React.lazy(() => import('@/pages/dash/dash.routes'));
const ContentRoutes = React.lazy(() => import('@/pages/content/content.routes'));
const SystemRoutes = React.lazy(() => import('@/pages/system/system.routes'));

export const Router = () => {
  const fallback = useMemo(
    () => <LoadingOverlay visible overlayBlur={2} overlayOpacity={0.05} />,
    []
  );

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={fallback}>
          <ErrorBoundary>
            <Routes>
              <Route path='/' element={<Navigate to='/dash' replace />} />
              <Route
                path='/register'
                element={
                  <PublicGuard>
                    <Register />
                  </PublicGuard>
                }
              />
              <Route
                path='/login'
                element={
                  <PublicGuard>
                    <Login />
                  </PublicGuard>
                }
              />
              <Route
                path='/forget-password'
                element={
                  <PublicGuard>
                    <ForgetPassword />
                  </PublicGuard>
                }
              />
              <Route
                path='/logout'
                element={
                  <ErrorBoundary>
                    <Logout />
                  </ErrorBoundary>
                }
              />

              <Route
                path='/dash/*'
                element={
                  <AuthenticatedGuard>
                    <DashRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/account/*'
                element={
                  <AuthenticatedGuard>
                    <AccountRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/content/*'
                element={
                  <AuthenticatedGuard>
                    <ContentRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/system/*'
                element={
                  <AdminGuard>
                    <SystemRoutes />
                  </AdminGuard>
                }
              />
              <Route path='*' element={<ErrorPage code={404} />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
