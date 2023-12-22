import React from 'react';

import { Page } from '@/components/layout';
import { Topbar } from '@/components/layout/page/topbar';

export const Hr = () => {
  const title = 'HR Page';

  const topbar = <Topbar>Custom topbar element</Topbar>;

  return <Page topbar={topbar}>{title}</Page>;
};
