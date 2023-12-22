import React from 'react';

import { Page } from '@/components/layout';
import { Topbar } from '@/components/layout/page/topbar';

export const Finance = () => {
  const title = 'Finance Page';

  const topbar = <Topbar>Custom topbar element</Topbar>;

  return (
    <Page layout sidebar topbar={topbar}>
      {title}
    </Page>
  );
};
