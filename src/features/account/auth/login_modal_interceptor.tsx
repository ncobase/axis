import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { LoginForm } from '@/features/account/auth/login_form';
import { useAuthContext } from '@/features/account/context';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';

const LoginModalContext = createContext({});

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalInterceptor = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);

  const { updateTokens } = useAuthContext();
  const queryClient = useQueryClient();
  const redirect = useRedirectFromUrl();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const pathnameRef = pathname;

    if (opened && pathname !== pathnameRef) {
      updateTokens();
      close();
    }
  }, [location, opened, updateTokens, close]);

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
    <LoginModalContext.Provider value={{ open, close, opened }}>
      <Modal
        opened={opened}
        onClose={handleClose}
        trapFocus={false}
        title={t('account:interceptor.title')}
      >
        <LoginForm onSuccess={handleLogin} hideRegister hideForgetPassword />
      </Modal>
    </LoginModalContext.Provider>
  );
};
