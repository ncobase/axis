import React from 'react';

import { Page } from '@/layouts/main';
import { Topbar } from '@/layouts/main/page/topbar';

export const Finance = () => {
  const title = 'Finance Page';

  return (
    <Page withLayout navbar topbar={<Topbar>Custom topbar element</Topbar>}>
      {title}
    </Page>
  );
};
