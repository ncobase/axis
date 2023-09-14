import React from 'react';

import { Page } from '@/layouts/main';
import { Topbar } from '@/layouts/main/page/topbar';

const Hr = () => {
  const title = 'HR Page';

  return (
    <Page withLayout navbar topbar={<Topbar>Custom topbar element</Topbar>}>
      {title}
    </Page>
  );
};

export default Hr;
