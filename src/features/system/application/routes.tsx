import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Application } from '@/features/system/application/application';

export const ApplicationRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Application />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
