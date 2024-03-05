import React from 'react';

import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';
import { Topbar } from '@/components/layout/page/topbar';

export const User = () => {
  const topbarElement = {
    title: '用户管理',
    actions: [],
    extras: []
  };

  const topbar = <Topbar {...topbarElement} />;
  const submenu = <Submenu />;

  return (
    <Page sidebar topbar={topbar} submenu={submenu}>
      User Manage list
    </Page>
  );
};
