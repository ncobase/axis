import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Menu } from '@/features/system/menu/menu';

export const MenuRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Menu />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
