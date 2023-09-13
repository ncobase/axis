import { MantineTheme } from '@mantine/core';

export const globalStyles = ({ colors, colorScheme, ...rest }: MantineTheme) => ({
  '*::-webkit-scrollbar': {
    width: 6,
    height: 6
  },
  '*::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '*::-webkit-scrollbar-thumb': {
    background: colors.slate[3],
    borderRadius: 6
  },
  body: {
    color: colorScheme === 'dark' ? rest.white : colors.gray[8],
    backgroundColor: colorScheme === 'dark' ? colors.dark[8] : colors.slate[0]
  }
});
