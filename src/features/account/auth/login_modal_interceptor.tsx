import React, { createContext, useContext, useEffect, useState } from 'react';

import { Modal } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { LoginForm } from '@/features/account/auth/login_form';
import { useAuthContext } from '@/features/account/context';
import { eventEmitter } from '@/helpers/events';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';

const LoginModalContext = createContext({});

export const useLoginModal = () => useContext(LoginModalContext);

export const LoginModalProvider = () => {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const { updateTokens } = useAuthContext();
  const queryClient = useQueryClient();
  const redirect = useRedirectFromUrl();
  const location = useLocation();

  const open = () => setOpened(true);
  const close = () => setOpened(false);

  useEffect(() => {
    const handleUnauthenticated = () => {
      open();
    };
    if (location.pathname !== '/login' && location.pathname !== '/register') {
      eventEmitter.on('unauthorized', handleUnauthenticated);
    }
    return () => {
      eventEmitter.off('unauthorized', handleUnauthenticated);
    };
  }, []);

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
    <LoginModalContext.Provider value={{ opened, open, close }}>
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
