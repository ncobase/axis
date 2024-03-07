import { Page } from '@/layout';
import { Submenu } from '@/layout/page/submenu';

export const Dictionary = () => {
  const submenu = <Submenu />;
  return <Page submenu={submenu}>body</Page>;
};
