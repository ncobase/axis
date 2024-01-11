import React from 'react';

import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';
import { Topbar } from '@/components/layout/page/topbar';

export const Basic = () => {
  const topbarElement = {
    title: '基础数据维护'
  };
  const topbar = <Topbar {...topbarElement} />;
  const submenu = <Submenu />;
  return (
    <Page sidebar topbar={topbar} submenu={submenu}>
      body
    </Page>
  );
};
