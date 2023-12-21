import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Permission } from '@/features/system/permission/permission';

export const PermissionRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Permission />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
