import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

const Warehouse = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Warehouse Home
    </Page>
  );
};

export default Warehouse;
