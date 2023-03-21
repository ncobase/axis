import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Domain } from '@/pages/system/domain/domain';

export const DomainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Domain />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
