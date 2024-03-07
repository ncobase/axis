import React from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from '@/components/errors/errors.module.css';

export const Error403 = () => {
  const { t } = useTranslation();

  return (
    <Flex className='pt-20' direction='column' mx='auto'>
      <div className={classes.label}>403</div>
      <Text c='dimmed' className={classes.description}>
        {t('errors:403.description')}
      </Text>
      <Group justify='center' mt={20}>
        <Button variant='subtle' onClick={() => history.back()}>
          {t('application:actions.go_back')}
        </Button>
      </Group>
    </Flex>
  );
};
