import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import Finance from '@/pages/finance/finance';

export const FinanceRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Finance />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
