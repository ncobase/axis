import { Loader } from '@mantine/core';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';
import { Layout } from '@/layout/layout';

import routes from './routes';
const Router = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  </ErrorBoundary>
);

export default Router;
