import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

export const Tenant = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Tenant Page
    </Page>
  );
};
