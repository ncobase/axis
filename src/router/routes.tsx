import React from 'react';
import { Navigate } from 'react-router-dom';

import { ErrorPage } from '@/components/errors';
import { ForgetPassword } from '@/pages/account/forget_password';
import { Login } from '@/pages/account/login';
import { Logout } from '@/pages/account/logout';
import { Register } from '@/pages/account/register';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { AdminGuard } from '@/router/guards/admin_guard';
import { AuthenticatedGuard } from '@/router/guards/authenticated_guard';
import { PublicGuard } from '@/router/guards/public_guard';

export default [
  {
    path: '/',
    element: <Navigate to='/home' replace />
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
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/home',
    element: (
      <AuthenticatedGuard>
        <Dashboard />
      </AuthenticatedGuard>
    )
  },
  {
    path: '/global',
    element: (
      <AdminGuard>
        <Dashboard />
      </AdminGuard>
    )
  },
  {
    path: '*',
    element: <ErrorPage code={404} />
  }
];
