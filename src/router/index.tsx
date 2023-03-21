import { LoadingOverlay } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/errors';
import { Layout } from '@/layout/layout';
import { AccountRoutes } from '@/pages/account/account.routes';
import { ForgetPassword } from '@/pages/account/auth/forget_password';
import { Login } from '@/pages/account/auth/login';
import { Register } from '@/pages/account/auth/register';
import { Logout } from '@/pages/account/logout';
import { ContentRoutes } from '@/pages/content/content.routes';
import { DashRoutes } from '@/pages/dash/dash.routes';
import { SystemRoutes } from '@/pages/system/system.routes';
import { AdminGuard } from '@/router/guards/admin_guard';
import { AuthenticatedGuard } from '@/router/guards/authenticated_guard';
import { PublicGuard } from '@/router/guards/public_guard';

const Router = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingOverlay visible overlayBlur={2} overlayOpacity={0.05} />}>
            <Routes>
              <Route path='/' element={<Navigate to='/dash' />} />
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
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};

export default Router;
