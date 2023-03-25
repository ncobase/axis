import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { System } from '@/pages/dash/system';

export const DashRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='system' />} />
      <Route path='/system' element={<System />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};

export default DashRoutes;
