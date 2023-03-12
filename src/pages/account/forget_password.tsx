import { Anchor, Button, Group, Paper, Stack, TextInput, useMantineTheme } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Content, Page } from '@/layout';
import { ForgetPasswordForm } from '@/pages/account/account.types';

export const ForgetPassword = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const form = useForm<ForgetPasswordForm>({
    initialValues: {
      username_or_email: ''
    },
    validate: {
      username_or_email: isNotEmpty(t('account:fields.username_or_email.required'))
    }
  });

  const onSubmitForgetPassword = form.onSubmit(
    useCallback(async (values: ForgetPasswordForm) => {
      console.log(values);
    }, [])
  );

  return (
    <Page title={t('account:login.title')}>
      <Content>
        <Paper bg={theme.colors.whiteAlpha[0]} mx='auto' mt='16vh' w={{ base: '96%', sm: 480 }}>
          <form id='reset-password-init-form' onSubmit={onSubmitForgetPassword} noValidate>
            <Stack spacing='xl'>
              <TextInput
                label={t('account:fields.username_or_email.label')}
                name='username_or_email'
                {...form.getInputProps('username_or_email')}
              />
            </Stack>

            <Group position='apart' mt='xl'>
              <Anchor
                component='button'
                type='button'
                color='dimmed'
                onClick={() => navigate(-1)}
                size='xs'
              >
                {t('account:actions.go_back')}
              </Anchor>
              <Button type='submit'>{t('account:actions.submit')}</Button>
            </Group>
          </form>
        </Paper>
      </Content>
    </Page>
  );
};
