import { LoadingOverlay } from '@mantine/core';
import React, { Suspense, useMemo } from 'react';
import { BrowserRouter, Navigate, Route } from 'react-router-dom';

import { AnimatedSwitch } from '@/components/animate/switch';
import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/errors';
import { Layout } from '@/components/layout/layout';
import { AccountRoutes } from '@/pages/account/account.routes';
import { ForgetPassword } from '@/pages/account/auth/forget_password';
import { Login } from '@/pages/account/auth/login';
import { Register } from '@/pages/account/auth/register';
import { Logout } from '@/pages/account/logout';
import { ContentRoutes } from '@/pages/content/content.routes';
import { CustomerRoutes } from '@/pages/customer/customer.routes';
import { DashRoutes } from '@/pages/dash/dash.routes';
import { FinanceRoutes } from '@/pages/finance/finance.routes';
import { HrRoutes } from '@/pages/hr/hr.routes';
import { PurchaseRoutes } from '@/pages/purchase/purchase.routes';
import { SaleRoutes } from '@/pages/sale/sale.routes';
import { SystemRoutes } from '@/pages/system/system.routes';
import { WarehouseRoutes } from '@/pages/warehouse/warehouse.routes';
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
