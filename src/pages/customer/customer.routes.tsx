import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import Customer from '@/pages/customer/customer';

export const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Customer />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
