import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(theme => {
  return {
    links: {
      [theme.fn.smallerThan('xs')]: {
        display: 'none'
      }
    },
    link: {
      padding: `${rem(8)} ${rem(12)}`,
      marginRight: rem(24),
      borderRadius: theme.radius.md,
      textDecoration: 'none',
      color: theme.colors.whiteAlpha[7],
      fontSize: rem(theme.fontSizes.sm),
      fontWeight: 500,
      '&:hover': {
        textDecoration: 'none',
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.whiteAlpha[1] : theme.colors.slate[9]
      }
    },
    linkActive: {
      borderRadius: 0,
      color: theme.colors.whiteAlpha[9],
      borderBottomWidth: rem(2),
      borderBottomColor: theme.colors.whiteAlpha[9],
      borderBottomStyle: 'solid',
      '&, &:hover': {
        backgroundColor: 'transparent',
        borderTopLeftRadius: theme.radius.md,
        borderTopRightRadius: theme.radius.md
      }
    },
    linkLabel: {
      marginRight: rem(5)
    }
  };
});
