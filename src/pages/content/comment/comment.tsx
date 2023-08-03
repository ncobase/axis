import { Page } from '@/layouts/main';
import { ContentNav } from '@/pages/content/content.nav';

export const Comment = () => {
  return (
    <Page withLayout nav={<ContentNav />}>
      Comment Page
    </Page>
  );
};
