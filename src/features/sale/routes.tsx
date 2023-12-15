import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Sale } from '@/features/sale/sale';

export const SaleRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Sale />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
