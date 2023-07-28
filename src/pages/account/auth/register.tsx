import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput
} from '@mantine/core';
import { isNotEmpty, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer/footer';
import Logo from '@/components/logo';
import { Page } from '@/layouts/main';
import { useRegisterAccount } from '@/pages/account/account.service';
import { useStyles } from '@/pages/account/account.styles';
import { RegisterFormProps } from '@/pages/account/account.types';
import { useRedirectFromUrl } from '@/router';

export const Register = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const redirect = useRedirectFromUrl();
  const queryClient = useQueryClient();

  const form = useForm<RegisterFormProps>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      terms: false
    },
    validate: {
      username: isNotEmpty(t('account:fields.username.required')),
      email: isNotEmpty(t('account:fields.email.required')),
      password: isNotEmpty(t('account:fields.password.required')),
      confirm_password: matchesField(
        'password',
        t('account:fields.confirm_password.rule_error')
      ) as any,
      terms: value => (!value ? t('account:fields.terms.required') : null)
    }
  });

  const onError = ({ response }: AxiosError) => {
    const { reason, message } = response?.data || ({} as any);
    const notificationProps = {
      title: reason,
      message: message || t(`errors:${reason?.toLowerCase() || 'unknown.label'}`),
      color: 'red',
      withCloseButton: false
    };
    notifications.show(notificationProps);
  };

  const { mutate: onRegisterAccount, isLoading } = useRegisterAccount({
    onSuccess: () => {
      queryClient.clear();
      redirect();
    },
    onError
  });

  const handleSubmit = form.onSubmit(
    useCallback(async (values: RegisterFormProps) => {
      onRegisterAccount(values);
    }, [])
  );

  return (
    <Page title={t('account:register.title')}>
      <Flex justify='center' align='center' direction='column' className={classes.authWrapper}>
        <Paper p='xl' shadow='md' w={{ base: '96%', sm: 480 }} mt='-3.5rem'>
          <Flex justify='center' display='none' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <form id='register-form' onSubmit={handleSubmit} noValidate>
            <Stack spacing='xl'>
              <TextInput
                label={t('account:fields.username.label')}
                name='username'
                {...form.getInputProps('username')}
              />

              <TextInput
                required
                label={t('account:fields.email.label')}
                name='email'
                {...form.getInputProps('email')}
              />
              <PasswordInput
                required
                label={t('account:fields.password.label')}
                name='password'
                {...form.getInputProps('password')}
              />
              <PasswordInput
                required
                label={t('account:fields.confirm_password.label')}
                name='confirm_password'
                {...form.getInputProps('confirm_password')}
              />

              <Checkbox
                label={t('account:fields.terms.label')}
                name='terms'
                {...form.getInputProps('terms', { type: 'checkbox' })}
              />
            </Stack>

            <Group position='apart' mt='xl'>
              <Anchor
                component='button'
                type='button'
                color='dimmed'
                onClick={() => navigate('/login')}
                size='xs'
              >
                {t('account:actions.alreadyHaveAnAccount')}
                {t('account:actions.login')}
              </Anchor>
              <Button type='submit' loading={isLoading} disabled={!form.isValid}>
                {t('account:actions.register')}
              </Button>
            </Group>
          </form>
        </Paper>
        <Footer />
      </Flex>
    </Page>
  );
};
