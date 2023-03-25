import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(theme => ({
  label: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: rem(180),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    userSelect: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120)
    }
  },
  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`
  }
}));
