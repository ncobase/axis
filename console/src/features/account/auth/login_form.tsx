import React, { useCallback } from 'react';

import {
  Anchor,
  Box,
  BoxProps,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { LoginProps } from '@tone/types';
import { FetchError } from 'ofetch';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@/features/account/service';
import { upperFirst } from '@/helpers/common';
import { useTheme } from '@/themes';

interface LoginHintProps {
  setValues: (values: LoginProps) => void;
}

const LoginHint = ({ setValues }: LoginHintProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isProd = import.meta.env.PROD;
  const envName = !isProd && import.meta.env.MODE;
  const colorScheme = !isProd && import.meta.env.MODE === 'development' ? 'warning' : 'error';

  if (!envName || isProd) {
    return null;
  }

  const username = 'admin';
  const password = 'adminn';

  const handleLoginHintClick = () => {
    setValues({
      username,
      password,
      remember: false
    });
  };

  return (
    <Paper bg={colors[colorScheme][1]} c={colors[colorScheme][9]} p='xs' fz='xs' ta='center'>
      <Trans
        t={t}
        i18nKey='application:api.login_hint'
        values={{
          url: upperFirst(envName),
          credentials: `${username} / ${password}`
        }}
        components={{
          anchor: <Anchor px='xs' fz='xs' onClick={handleLoginHintClick} />
        }}
      />
    </Paper>
  );
};

export const LoginForm = ({
  onSuccess = () => undefined,
  hideForgetPassword = false,
  hideRegister = false,
  ...rest
}: BoxProps & {
  onSuccess: () => void;
  hideForgetPassword?: boolean;
  hideRegister?: boolean;
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<LoginProps>({
    initialValues: {
      username: '',
      password: '',
      remember: false
    },
    validate: {
      username: isNotEmpty(t('account:fields.username.required')),
      password: isNotEmpty(t('account:fields.password.required'))
    }
  });

  const onError = ({ response }: FetchError) => {
    const { reason, message } = response?._data || ({} as any);
    const notificationProps = {
      title: reason,
      message: message || t(`errors:${reason?.toLowerCase() || 'unknown.label'}`),
      color: 'red',
      withCloseButton: false
    };
    notifications.show(notificationProps);
  };

  const { mutate: onLogin, isLoading } = useLogin({
    onSuccess,
    onError
  });

  const handleSubmit = form.onSubmit(
    useCallback(async (values: LoginProps) => {
      onLogin(values);
    }, [])
  );
  return (
    <Box {...rest}>
      <form id='login-form' onSubmit={handleSubmit} noValidate>
        <Stack gap='xl'>
          <TextInput
            label={t('account:fields.username_or_email.label')}
            name='username'
            required
            {...form.getInputProps('username')}
          />

          <PasswordInput
            label={t('account:fields.password.label')}
            name='password'
            required
            {...form.getInputProps('password')}
          />

          <Group justify='space-between'>
            <Checkbox
              label={t('account:fields.remember.label')}
              name='remember'
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor
              component='button'
              type='button'
              onClick={() => navigate('/forget-password')}
              size='sm'
              hidden={hideForgetPassword}
            >
              {t('account:actions.forgotPassword')}
            </Anchor>
          </Group>
          <LoginHint setValues={form.setValues} />
          <Group justify={hideRegister ? 'right' : 'space-between'}>
            <Anchor
              component='button'
              type='button'
              onClick={() => navigate('/register')}
              size='sm'
              hidden={hideRegister}
            >
              {t('account:actions.needAccount')}
              {t('account:actions.register')}
            </Anchor>
            <Button
              type='submit'
              loading={isLoading}
              loaderProps={{ size: 'xs' }}
              disabled={!form.isValid}
            >
              {t('account:actions.login')}
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
