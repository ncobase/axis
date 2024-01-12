import React from 'react';

import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Group } from '@/features/system/group/group';

export const GroupRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Group />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
