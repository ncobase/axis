import { MantineTheme } from '@mantine/core';

export const globalStyles = ({ colors, colorScheme, ...rest }: MantineTheme) => ({
  '*::-webkit-scrollbar': {
    width: 5,
    height: 5
  },
  '*::-webkit-scrollbar-track': {
    background: colors.gray[2]
  },
  '*::-webkit-scrollbar-thumb': {
    background: colors.gray[5],
    borderRadius: 3
  },
  body: {
    color: colorScheme === 'dark' ? rest.white : colors.gray[8],
    backgroundColor: colorScheme === 'dark' ? colors.dark[8] : colors.blueGray[0]
  }
});
