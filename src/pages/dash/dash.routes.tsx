import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Dash } from '@/pages/dash/dash';
import { System } from '@/pages/dash/system';

export const DashRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dash />} />
      <Route path='/system' element={<System />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
