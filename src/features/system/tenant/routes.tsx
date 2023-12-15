import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Tenant } from '@/features/system/tenant/tenant';

export const TenantRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Tenant />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
