import React from 'react';

import { Alert, Anchor, Code, Flex, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

const FallbackComponent = ({ error }: FallbackProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex justify='center' align='center' w='100vw' h='100vh'>
      <Alert p={4} color='error'>
        <Anchor onClick={open} m='auto' color='red' title={t('application:actions.expand')} p={12}>
          {t('errors:boundary.label')}
        </Anchor>
      </Alert>
      <Modal
        opened={opened}
        title={t('errors:boundary.label')}
        onClose={close}
        size='lg'
        trapFocus={false}
      >
        {/*{error?.message ?? 'An unknown error has occurred.'}*/}
        <Code color='red'>{error?.stack}</Code>
      </Modal>
    </Flex>
  );
};

export const ErrorBoundary: React.FC<React.PropsWithChildren> = props => {
  return <ReactErrorBoundary FallbackComponent={FallbackComponent} {...props} />;
};
