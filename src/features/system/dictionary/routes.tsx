import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Dictionary } from '@/features/system/dictionary/dictionary';

export const DictionaryRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dictionary />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
