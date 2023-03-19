import { spacing } from '@/themes/default/spacing';

export const other = {
  layout: {
    topbar: {
      height: `calc(3.5rem + ${spacing['safe-top']})`
    },
    sidebar: {
      width: `calc(3.5rem + ${spacing['safe-left']})`
    },
    content: {
      height: `calc(100vh - calc(3.5rem + ${spacing['safe-top']}))`
    }
  }
};
