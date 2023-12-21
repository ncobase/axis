import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';

export const Dictionary = () => {
  const submenu = <Submenu />;
  return (
    <Page layout navbar sidebar submenu={submenu}>
      body
    </Page>
  );
};
