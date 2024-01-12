import { Flex, getDefaultZIndex } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { getInitials } from '@/helpers';
import { useTheme } from '@/themes';

export const AppDevHint = () => {
  const isProd = import.meta.env.PROD;
  const envName = !isProd && import.meta.env.MODE;
  const { white, colors } = useTheme();

  if (!envName || isProd) {
    return null;
  }

  return (
    <>
      <Flex
        pos='fixed'
        style={{
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          color: white,
          backgroundColor: colors.warning[5],
          borderBottomRightRadius: '42%',
          zIndex: getDefaultZIndex('max')
        }}
        justify='center'
        fz='xs'
        align='center'
        tt='uppercase'
      >
        {getInitials(envName)}
      </Flex>
      <ReactQueryDevtools />
    </>
  );
};
