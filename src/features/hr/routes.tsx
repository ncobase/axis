import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Hr } from '@/features/hr/hr';

export const HrRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Hr />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
