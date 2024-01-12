import React, { Suspense, useMemo } from 'react';

import { LoadingOverlay } from '@mantine/core';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';

import { AnimatedSwitch } from '@/components/animate/switch';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/errors';
import { Layout } from '@/components/layout/layout';
import { ForgetPassword } from '@/features/account/auth/forget_password';
import { Login } from '@/features/account/auth/login';
import { Register } from '@/features/account/auth/register';
import { Logout } from '@/features/account/logout';
import { AccountRoutes } from '@/features/account/routes';
import { ContentRoutes } from '@/features/content/routes';
import { CustomerRoutes } from '@/features/customer/routes';
import { DashRoutes } from '@/features/dash/routes';
import { FinanceRoutes } from '@/features/finance/routes';
import { HrRoutes } from '@/features/hr/routes';
import { PurchaseRoutes } from '@/features/purchase/routes';
import { SaleRoutes } from '@/features/sale/routes';
import { SystemRoutes } from '@/features/system/routes';
import { WarehouseRoutes } from '@/features/warehouse/routes';
import { AdminGuard, AuthenticatedGuard, PublicGuard } from '@/router';

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
            <AnimatedSwitch>
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
                path='/sale/*'
                element={
                  <AuthenticatedGuard>
                    <SaleRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/purchase/*'
                element={
                  <AuthenticatedGuard>
                    <PurchaseRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/finance/*'
                element={
                  <AuthenticatedGuard>
                    <FinanceRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/warehouse/*'
                element={
                  <AuthenticatedGuard>
                    <WarehouseRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/customer/*'
                element={
                  <AuthenticatedGuard>
                    <CustomerRoutes />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='/hr/*'
                element={
                  <AuthenticatedGuard>
                    <HrRoutes />
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
            </AnimatedSwitch>
          </ErrorBoundary>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
};
