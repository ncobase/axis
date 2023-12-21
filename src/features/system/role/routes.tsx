import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Role } from '@/features/system/role/role';

export const RoleRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Role />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
