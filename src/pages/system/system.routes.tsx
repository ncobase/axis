import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { DomainRoutes } from '@/pages/system/domain/domain.routes';

export const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='domain/*' element={<DomainRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
