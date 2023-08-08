import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';
import { Topbar } from '@/layouts/main/page/topbar';

const Finance = () => {
  const title = 'Finance Page';

  return (
    <Page withLayout sidebar={<Sidebar />} topbar={<Topbar>Custom topbar element</Topbar>}>
      {title}
    </Page>
  );
};

export default Finance;
