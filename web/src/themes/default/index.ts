import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

import { colors } from '@/themes/default/colors';
import { other } from '@/themes/default/other';
import { spacing } from '@/themes/default/spacing';
import { typography } from '@/themes/default/typography';

export const theme = mergeMantineTheme(
  DEFAULT_THEME,
  createTheme({
    primaryColor: 'brand',
    ...typography,
    spacing,
    colors,
    other
  })
);
