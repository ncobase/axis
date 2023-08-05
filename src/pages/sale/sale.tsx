import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

const Sale = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Sale Home
    </Page>
  );
};

export default Sale;
