import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

const Customer = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Customer Home
    </Page>
  );
};

export default Customer;
