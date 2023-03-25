import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { Profile } from '@/pages/account/profile/profile';

const AccountRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='profile' />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<ErrorPage code={404} />} />
    </Routes>
  );
};

export default AccountRoutes;
