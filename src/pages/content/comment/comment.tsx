import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

export const Comment = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Comment Page
    </Page>
  );
};
