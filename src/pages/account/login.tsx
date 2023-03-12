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
import { isNotEmpty, useForm } from '@mantine/form';
import React, { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';
// import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

// import { login } from '@/api/auth';
import Logo from '@/components/logo';
import { Page } from '@/layout';
import { useStyles } from '@/pages/account/account.styles';
import { upperFirst } from '@/utils';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

interface ApiHintProps {
  setValues: (values: LoginFormData) => void;
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

export const Login = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
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

  // const { mutate: onSubmitLogin, isLoading } = useMutation(login, {
  //   onSuccess: () => {
  //     navigate('/', { replace: true });
  //   }
  // });

  const handleSubmit = form.onSubmit(
    useCallback(async (values: LoginFormData) => {
      console.log(values);
      navigate('/', { replace: true });
      // onSubmitLogin(values);
    }, [])
  );

  return (
    <Page title={t('account:login.title')} hideContainer>
      <Flex justify='center' align='center' className={classes.authWrapper}>
        <Paper p='xl' shadow='md' radius='md' w={{ base: '96%', sm: 480 }} mt='-3.5rem'>
          <Flex justify='center' display='block' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <form id='login-form' onSubmit={handleSubmit} noValidate>
            <Stack spacing='xl'>
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
              {/*loading={isLoading} disabled={!isValid}*/}
              <Button type='submit'>{t('account:actions.login')}</Button>
            </Group>
          </form>
        </Paper>
      </Flex>
    </Page>
  );
};
