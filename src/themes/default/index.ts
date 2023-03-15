import { MantineThemeOverride } from '@mantine/core';

import { colors } from '@/themes/default/colors';
import { globalStyles } from '@/themes/default/global';
import { typography } from '@/themes/default/typography';

// ref: https://github.com/mantinedev/mantine/blob/master/src/mantine-styles/src/theme/default-theme.ts
export default {
  globalStyles,
  primaryColor: 'brand',
  dateFormat: 'YYYY-MM-DD',
  ...typography,
  colors,
  defaultRadius: 'sm',
  datesLocale: 'zh'
} as Partial<MantineThemeOverride>;
