import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { ApplicationRoutes } from '@/features/system/application/routes';
import { BasicRoutes } from '@/features/system/basic/routes';
import { DictionaryRoutes } from '@/features/system/dictionary/routes';
import { GroupRoutes } from '@/features/system/group/routes';
import { MenuRoutes } from '@/features/system/menu/routes';
import { PermissionRoutes } from '@/features/system/permission/routes';
import { RoleRoutes } from '@/features/system/role/routes';
import { TenantRoutes } from '@/features/system/tenant/routes';

export const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='application/*' element={<ApplicationRoutes />} />
      <Route path='basic/*' element={<BasicRoutes />} />
      <Route path='dictionary/*' element={<DictionaryRoutes />} />
      <Route path='group/*' element={<GroupRoutes />} />
      <Route path='permission/*' element={<PermissionRoutes />} />
      <Route path='menu/*' element={<MenuRoutes />} />
      <Route path='role/*' element={<RoleRoutes />} />
      <Route path='tenant/*' element={<TenantRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
