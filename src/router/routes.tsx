import React from 'react';
import { Navigate } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { ForgetPassword } from '@/pages/account/forget_password';
import { Login } from '@/pages/account/login';
import { Register } from '@/pages/account/register';
import { Home } from '@/pages/home/home';
import { AdminGuard } from '@/router/guards/admin_guard';
import { AuthenticatedGuard } from '@/router/guards/authenticated_guard';
import { PublicGuard } from '@/router/guards/public_guard';

export default [
  {
    path: '/',
    element: <Navigate to='/home' />
  },
  {
    path: '/register',
    element: (
      <PublicGuard>
        <Register />
      </PublicGuard>
    )
  },
  {
    path: '/login',
    element: (
      <PublicGuard>
        <Login />
      </PublicGuard>
    )
  },
  {
    path: '/forget-password',
    element: (
      <PublicGuard>
        <ForgetPassword />
      </PublicGuard>
    )
  },
  {
    path: '/home',
    element: (
      <AuthenticatedGuard>
        <Home />
      </AuthenticatedGuard>
    )
  },
  {
    path: '/global',
    element: (
      <AdminGuard>
        <Home />
      </AdminGuard>
    )
  },
  {
    path: '*',
    element: <ErrorPage code={404} />
  }
];
