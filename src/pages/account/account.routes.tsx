import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Profile } from '@/pages/account/profile/profile';

export const AccountRoutes = () => {
  return (
    <Routes>
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};
