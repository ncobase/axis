import React from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useStyles } from '@/components/errors/styles';

export const Error403 = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Flex className='pt-20' direction='column' mx='auto'>
      <div className={classes.label}>403</div>
      <Text color='dimmed' align='center' className={classes.description}>
        {t('errors:403.description')}
      </Text>
      <Group position='center'>
        <Button variant='subtle' onClick={() => history.back()}>
          {t('application:actions.go_back')}
        </Button>
      </Group>
    </Flex>
  );
};
