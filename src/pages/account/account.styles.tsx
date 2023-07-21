import { createStyles } from '@mantine/core';

import backgroundImage from '@/assets/signin-bg.svg';

export const useStyles = createStyles(() => ({
  authWrapper: {
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImage})`
  }
}));
