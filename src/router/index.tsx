import { LoadingOverlay } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';
import { ErrorPage } from '@/components/errors';
import { Layout } from '@/layout/layout';
import SystemRoutes from '@/pages/system/system.routes';
import { AdminGuard } from '@/router/guards/admin_guard';
import { AuthenticatedGuard } from '@/router/guards/authenticated_guard';
import { PublicGuard } from '@/router/guards/public_guard';

const Dashboard = React.lazy(() => import('@/pages/dashboard/dashboard'));
const ForgetPassword = React.lazy(() => import('@/pages/account/forget_password'));
const Login = React.lazy(() => import('@/pages/account/login'));
const Logout = React.lazy(() => import('@/pages/account/logout'));
const Register = React.lazy(() => import('@/pages/account/register'));

const lazyRoutes = [
  'account/account.routes',
  'content/content.routes',
  'sale/routes',
  'purchase/routes',
  'finance/routes',
  'warehouse/routes',
  'customer/routes',
  'analytics/routes',
  'global/global.routes'
];

const createRoute = (route: string) => {
  const [modulePath, ...subPaths] = route.split('/');
  const componentName = subPaths.pop();
  const Component = React.lazy(() => import(`@/pages/${modulePath}/${componentName}`));

  if (subPaths.length > 0) {
    const childRoute = subPaths.join('/');
    const childElement = createRoute(`${childRoute}/${componentName}`);
    return (
      <Route
        key={route}
        path={`${modulePath}/*`}
        element={<AuthenticatedGuard>{childElement}</AuthenticatedGuard>}
      />
    );
  }

  return (
    <Route
      key={route}
      path={`${modulePath}/*`}
      element={
        <AuthenticatedGuard>
          <Component />
        </AuthenticatedGuard>
      }
    />
  );
};

const Router = () => {
  const routeComponents = lazyRoutes.map(createRoute);
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<LoadingOverlay visible overlayBlur={2} overlayOpacity={0.05} />}>
            <Routes>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
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
                path='/dashboard'
                element={
                  <AuthenticatedGuard>
                    <Dashboard />
                  </AuthenticatedGuard>
                }
              />
              <Route
                path='system/*'
                element={
                  <AdminGuard>
                    <SystemRoutes />
                  </AdminGuard>
                }
              />
              {routeComponents.slice(1)}
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
