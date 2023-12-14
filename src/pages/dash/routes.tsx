import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Dash } from '@/pages/dash/dash';
import { Sales } from '@/pages/dash/sales';

export const DashRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dash />} />
      <Route path='/sales' element={<Sales />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
