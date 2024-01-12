import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Dash } from '@/features/dash/dash';
import { Sales } from '@/features/dash/sales';

export const DashRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dash />} />
      <Route path='/sales' element={<Sales />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
