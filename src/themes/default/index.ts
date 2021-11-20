import { MantineThemeOverride } from '@mantine/core';

import { colors } from '@/themes/default/colors';
import { globalStyles } from '@/themes/default/global';
import { typography } from '@/themes/default/typography';

export default {
  globalStyles,
  primaryColor: 'brand',
  dateFormat: 'YYYY-MM-DD',
  ...typography,
  colors,
  loader: 'bars',
  datesLocale: 'zh'
} as Partial<MantineThemeOverride>;
