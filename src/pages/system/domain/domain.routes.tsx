import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Domain } from '@/pages/system/domain/domain';

const DomainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Domain />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};

export default DomainRoutes;
