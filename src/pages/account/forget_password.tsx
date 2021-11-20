import { Formiz, useForm } from '@formiz/core';
import { Anchor, Button, Group, Paper, Stack, TextInput, useMantineTheme } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Content, Page } from '@/layout';

export const ForgetPassword = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const navigate = useNavigate();

  const forgetPasswordInitForm = useForm();

  const submitForgetPasswordInitForm = async (values: TODO) => {
    console.log(values);
  };

  return (
    <Page title={t('account:login.title')}>
      <Content>
        <Paper
          bg={theme.colors.whiteAlpha[0]}
          mx='auto'
          mt='16vh'
          w={{ base: '100%', sm: '42%', md: '28%' }}
        >
          <Formiz
            id='reset-password-init-form'
            onValidSubmit={submitForgetPasswordInitForm}
            connect={forgetPasswordInitForm}
          >
            <Stack spacing='xl'>
              <TextInput
                label={t('account:fields.username_or_email.label')}
                name='username_or_email'
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
          </Formiz>
        </Paper>
      </Content>
    </Page>
  );
};
