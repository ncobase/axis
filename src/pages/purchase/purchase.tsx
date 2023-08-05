import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

const Purchase = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Purchase Home
    </Page>
  );
};

export default Purchase;
