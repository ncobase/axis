import { Button, Flex, Group, Text } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { useStyles } from '@/components/errors/styles';

export const Error404 = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Flex className='pt-20' direction='column' mx='auto'>
      <div className={classes.label}>404</div>
      <Text color='dimmed' align='center' className={classes.description}>
        {t('errors:404.description')}
      </Text>
      <Group position='center'>
        <Button variant='subtle' onClick={() => history.back()}>
          {t('application:actions.go_back')}
        </Button>
      </Group>
    </Flex>
  );
};
