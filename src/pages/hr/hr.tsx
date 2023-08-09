import React from 'react';

import { Page } from '@/layouts/main';
import { Navbar } from '@/layouts/main/page/navbar';
import { Topbar } from '@/layouts/main/page/topbar';

const Hr = () => {
  const title = 'HR Page';

  return (
    <Page withLayout navbar={<Navbar />} topbar={<Topbar>Custom topbar element</Topbar>}>
      {title}
    </Page>
  );
};

export default Hr;
