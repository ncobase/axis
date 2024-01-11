import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Basic } from '@/features/system/basic/basic';

export const BasicRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Basic />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
