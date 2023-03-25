import { Flex } from '@mantine/core';
import React from 'react';

import { Error403 } from '@/components/errors/403';
import { Error404 } from '@/components/errors/404';
import { Error500 } from '@/components/errors/500';

const ERROR_COMPONENTS: any = {
  403: Error403,
  404: Error404,
  500: Error500
};

export const ErrorPage = ({ code = 404, ...rest }) => {
  const ErrorComponent = ERROR_COMPONENTS[code];

  return (
    <Flex className='h-screen w-screen'>
      <ErrorComponent code={code} {...rest} />
    </Flex>
  );
};
