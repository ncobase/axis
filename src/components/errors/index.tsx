import { Center } from '@mantine/core';
import React from 'react';

interface ErrorProps {
  code?: number;
}
export const ErrorPage: React.FC<ErrorProps> = ({ code }) => {
  return (
    <Center style={{ flex: 1, height: '100%' }}>
      <div>{code} Page</div>
    </Center>
  );
};
