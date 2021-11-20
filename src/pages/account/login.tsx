import { Formiz, useForm } from '@formiz/core';
import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/logo';
import { Page } from '@/layout';
import { useStyles } from '@/pages/account/account.styles';
import { upperFirst } from '@/utils';

interface LoginFormData {
  username: string;
  password: string;
}

const ApiHint = () => {
  const { t } = useTranslation();
  const userLoginForm = useForm({ subscribe: 'form' });
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
    userLoginForm.setFieldsValues({
      username: username,
      password: password
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

export const Login = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const userLoginForm = useForm({ subscribe: 'form' });

  const handleLoginSubmit = async (values: LoginFormData) => {
    console.log(values);
  };

  return (
    <Page title={t('account:login.title')} hideContainer>
      <Flex justify='center' align='center' className={classes.authWrapper}>
        <Paper
          p='xl'
          shadow='md'
          radius='md'
          w={{ base: '100%', sm: '36%', md: '26%' }}
          mt='-3.5rem'
        >
          <Flex justify='center' display='block' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <Formiz
            id='login-form'
            autoForm
            onValidSubmit={handleLoginSubmit}
            connect={userLoginForm}
          >
            <Stack spacing='xl'>
              <TextInput
                label={t('account:fields.username_or_email.label')}
                name='username'
                required
              />

              <PasswordInput label={t('account:fields.password.label')} name='password' required />

              <Group position='apart'>
                <Checkbox label={t('account:fields.remember.label')} name='remember' />
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
              <ApiHint />
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
              <Button type='submit'>{t('account:actions.login')}</Button>
            </Group>
          </Formiz>
        </Paper>
      </Flex>
    </Page>
  );
};
