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
  TextInput
} from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Logo from '@/components/logo';
import { Page } from '@/layout';
import { useStyles } from '@/pages/account/account.styles';

export const Register = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();

  const navigate = useNavigate();

  const form = useForm({
    subscribe: { form: true, fields: ['language'] }
  });

  return (
    <Page title={t('account:login.title')} hideContainer>
      <Flex justify='center' align='center' className={classes.authWrapper}>
        <Paper
          p='xl'
          shadow='md'
          radius='md'
          w={{ base: '100%', sm: '42%', md: '28%' }}
          mt='-3.5rem'
        >
          <Flex justify='center' display='block' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <Formiz id='register-form' autoForm onValidSubmit={() => {}} connect={form}>
            <Stack spacing='xl'>
              <TextInput label={t('account:fields.username.label')} name='username' />

              <TextInput required label={t('account:fields.email.label')} name='email' />
              <PasswordInput required label={t('account:fields.password.label')} name='password' />

              <Checkbox label={t('account:fields.terms.label')} />
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
          </Formiz>
        </Paper>
      </Flex>
    </Page>
  );
};
