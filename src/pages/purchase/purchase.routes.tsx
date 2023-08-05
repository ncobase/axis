import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import Purchase from '@/pages/purchase/purchase';

export const PurchaseRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Purchase />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
