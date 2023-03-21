import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import Axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAuthContext } from '@/pages/account/account.context';
import { LoginForm } from '@/pages/account/auth/login_form';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';

export const LoginModalInterceptor = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const { updateTokens } = useAuthContext();
  const queryClient = useQueryClient();
  const redirect = useRedirectFromUrl();
  const { pathname } = useLocation();
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  useEffect(() => {
    const interceptor = Axios.interceptors.response.use(
      response => response,
      error => {
        if (error?.response?.status === 401 && pathnameRef.current !== '/login') {
          queryClient.cancelQueries();
          open();
        }
        throw error;
      }
    );

    return () => Axios.interceptors.response.eject(interceptor);
  }, [open, updateTokens, queryClient]);

  useEffect(() => {
    if (opened && pathname !== pathnameRef.current) {
      updateTokens();
      close();
    }
  }, [opened, updateTokens, close, pathname]);

  const handleLogin = () => {
    queryClient.refetchQueries();
    close();
  };

  const handleClose = () => {
    updateTokens();
    close();
    redirect();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title={t('account:interceptor.title')}>
      <LoginForm onSuccess={handleLogin} hideRegister hideForgetPassword />
    </Modal>
  );
};
