import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';

const DomainRoutes = React.lazy(() => import('@/pages/system/domain/domain.routes'));

const SystemRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='domain' />} />
      <Route path='domain/*' element={<DomainRoutes />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};

export default SystemRoutes;
