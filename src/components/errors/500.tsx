import React from 'react';

import { Button, Flex, Group, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from '@/components/errors/errors.module.css';

export const Error500 = ({ trace = null }) => {
  const { t } = useTranslation();

  return (
    <Flex className='pt-20' direction='column' mx='auto'>
      <div className={classes.label}>500</div>
      <Text c='dimmed' className={classes.description}>
        {t('errors:500.description')}
      </Text>
      {trace ? (
        <Text c='dimmed' className={classes.description}>
          Request ID: `${trace}`
        </Text>
      ) : null}
      <Text c='dimmed' className={classes.description}></Text>
      <Group justify='center' mt={20}>
        <Button variant='subtle' onClick={() => history.back()}>
          {t('application:actions.go_back')}
        </Button>
      </Group>
    </Flex>
  );
};
