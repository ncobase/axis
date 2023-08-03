import { Page } from '@/layouts/main';
import { SystemNav } from '@/pages/system/system.nav';

export const Tenant = () => {
  return (
    <Page withLayout nav={<SystemNav />}>
      Tenant Page
    </Page>
  );
};
