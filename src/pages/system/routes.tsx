import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { TenantRoutes } from '@/pages/system/tenant/routes';

export const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='tenant/*' element={<TenantRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
