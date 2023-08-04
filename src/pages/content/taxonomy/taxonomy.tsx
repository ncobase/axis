import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

export const Taxonomy = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Taxonomy Page
    </Page>
  );
};
