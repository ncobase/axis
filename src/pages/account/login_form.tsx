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
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useLogin } from '@/pages/account/account.service';
import { LoginFormProps } from '@/pages/account/account.types';
import { upperFirst } from '@/utils';

interface ApiHintProps {
  setValues: (values: LoginFormProps) => void;
}

const ApiHint = ({ setValues }: ApiHintProps) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const isProd = import.meta.env.PROD;
  const envName = !isProd && import.meta.env.MODE;
  const colorScheme = !isProd && import.meta.env.MODE === 'development' ? 'warning' : 'error';

  if (!envName || isProd) {
    return null;
  }

  const username = 'admin';
  const password = 'adminn';

  const handleApiHintClick = () => {
    setValues({
      username: username,
      password: password,
      remember: false
    });
  };

  return (
    <Paper
      radius='md'
      bg={theme.colors[colorScheme][1]}
      c={theme.colors[colorScheme][9]}
      p='xs'
      fz='xs'
      ta='center'
    >
      <Trans
        t={t}
        i18nKey='application:api.login_hint'
        values={{
          url: upperFirst(envName),
          credentials: `${username} / ${password}`
        }}
        components={{
          anchor: <Anchor px='xs' onClick={handleApiHintClick} />
        }}
      />
    </Paper>
  );
};

export const LoginForm = ({
  onSuccess = () => undefined,
  ...rest
}: BoxProps & { onSuccess: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm<LoginFormProps>({
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

  const onError = ({ response }: AxiosError) => {
    const { reason, message } = response?.data || ({} as any);
    const notificationProps = {
      title: reason,
      message: message || t(`errors.${reason?.toLowerCase() || 'unknown'}`),
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
    useCallback(async (values: LoginFormProps) => {
      onLogin(values);
    }, [])
  );
  return (
    <Box {...rest}>
      <form id='login-form' onSubmit={handleSubmit} noValidate>
        <Stack spacing='xl'>
          <TextInput
            label={t('account:fields.username_or_email.label')}
            name='username'
            onFocus
            required
            {...form.getInputProps('username')}
          />

          <PasswordInput
            label={t('account:fields.password.label')}
            name='password'
            required
            {...form.getInputProps('password')}
          />

          <Group position='apart'>
            <Checkbox
              label={t('account:fields.remember.label')}
              name='remember'
              {...form.getInputProps('remember', { type: 'checkbox' })}
            />
            <Anchor
              component='button'
              type='button'
              color='dimmed'
              onClick={() => navigate('/forget-password')}
              size='xs'
            >
              {t('account:actions.forgotPassword')}
            </Anchor>
          </Group>
          <ApiHint setValues={form.setValues} />
        </Stack>

        <Group position='apart' mt='xl'>
          <Anchor
            component='button'
            type='button'
            color='dimmed'
            onClick={() => navigate('/register')}
            size='xs'
          >
            {t('account:actions.needAccount')}
            {t('account:actions.register')}
          </Anchor>
          <Button type='submit' loading={isLoading} disabled={!form.isValid}>
            {t('account:actions.login')}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
