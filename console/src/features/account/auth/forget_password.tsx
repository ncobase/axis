import React, { useCallback } from 'react';

import { Anchor, Button, Flex, Group, Paper, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { ForgetPasswordProps } from '@tone/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Footer } from '@/components/footer/footer';
import { Logo } from '@/components/logo';
import classes from '@/features/account/styles.module.css';
import { Page } from '@/layout';

export const ForgetPassword = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const form = useForm<ForgetPasswordProps>({
    initialValues: {
      username_or_email: ''
    },
    validate: {
      username_or_email: isNotEmpty(t('account:fields.username_or_email.required'))
    }
  });

  const onSubmitForgetPassword = form.onSubmit(
    useCallback(async (values: ForgetPasswordProps) => {
      console.log(values);
    }, [])
  );

  return (
    <Page title={t('account:forget_password.title')} layout={false} sidebar={false}>
      <Flex justify='center' align='center' direction='column' className={classes.authWrapper}>
        <Paper p='xl' shadow='md' w={{ base: '96%', sm: 480 }} mt='-3.5rem'>
          <Flex justify='center' display='block' mb='xl' mt='xs'>
            <Logo type='full-mask' height='2.25rem' />
          </Flex>
          <form id='reset-password-init-form' onSubmit={onSubmitForgetPassword} noValidate>
            <Stack gap='xl'>
              <TextInput
                label={t('account:fields.username_or_email.label')}
                name='username_or_email'
                {...form.getInputProps('username_or_email')}
              />
            </Stack>
            <Group justify='space-between' mt='xl'>
              <Anchor component='button' type='button' onClick={() => navigate(-1)} size='sm'>
                {t('account:actions.go_back')}
              </Anchor>
              <Button type='submit'>{t('account:actions.submit')}</Button>
            </Group>
          </form>
        </Paper>
        <Footer />
      </Flex>
    </Page>
  );
};
