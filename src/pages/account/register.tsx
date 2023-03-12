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
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/logo';
import { Page } from '@/layout';
import { useStyles } from '@/pages/account/account.styles';
import { RegisterForm } from '@/pages/account/account.types';

export const Register = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const navigate = useNavigate();

  const form = useForm<RegisterForm>({
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

  const onSubmitRegister = form.onSubmit(
    useCallback(async (values: RegisterForm) => {
      console.log(values);
    }, [])
  );

  return (
    <Page title={t('account:login.title')} hideContainer>
      <Flex justify='center' align='center' className={classes.authWrapper}>
        <Paper p='xl' shadow='md' radius='md' w={{ base: '96%', sm: 480 }} mt='-3.5rem'>
          <Flex justify='center' display='block' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <form id='register-form' onSubmit={onSubmitRegister} noValidate>
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
              <Button type='submit'>{t('account:actions.register')}</Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Page>
  );
};
