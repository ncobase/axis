import React from 'react';

import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';

const Hr = () => {
  return (
    <Page withLayout nav={<Sidebar />}>
      Hr Home
    </Page>
  );
};

export default Hr;
