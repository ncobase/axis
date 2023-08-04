import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

export const Topic = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Topic Page
    </Page>
  );
};
