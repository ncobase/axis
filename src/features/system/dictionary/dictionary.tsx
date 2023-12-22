import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';

export const Dictionary = () => {
  const submenu = <Submenu />;
  return (
    <Page layout sidebar submenu={submenu}>
      body
    </Page>
  );
};
