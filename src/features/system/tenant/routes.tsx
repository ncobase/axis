import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Tenant } from '@/features/system/tenant/tenant';
import { User } from '@/features/system/tenant/user';

export const TenantRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Tenant />} />
      <Route path='/user' element={<User />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
