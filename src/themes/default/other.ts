import { spacing } from '@/themes/default/spacing';

export const other = {
  layout: {
    header: {
      height: `calc(3.5rem + ${spacing['safe-top']})`
    },
    topbar: {
      height: `calc(3rem + ${spacing['safe-left']})`
    },
    navbar: {
      width: `calc(3.5rem + ${spacing['safe-left']})`
    },
    submenu: {
      width: `calc(11rem + ${spacing['safe-left']})`
    },
    content: {
      height: `calc(100vh - calc(6.5rem + ${spacing['safe-top']}))`
    }
  }
};
