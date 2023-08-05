import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import Warehouse from '@/pages/warehouse/warehouse';

export const WarehouseRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Warehouse />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
