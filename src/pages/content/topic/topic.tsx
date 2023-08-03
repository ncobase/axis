import { Page } from '@/layouts/main';
import { ContentNav } from '@/pages/content/content.nav';

export const Topic = () => {
  return (
    <Page withLayout nav={<ContentNav />}>
      Topic Page
    </Page>
  );
};
