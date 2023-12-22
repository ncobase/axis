import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Submenu } from '@/components/layout/page/submenu';
import { Topbar } from '@/components/layout/page/topbar';

export const Tenant = () => {
  const topbarElement = {
    title: '租户',
    actions: [
      <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
        <DIcon name='IconPlus' />
      </button>
    ],
    extras: [
      <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
        <DIcon name='IconFilter' />
      </button>
    ]
  };

  const topbar = <Topbar {...topbarElement} />;
  const submenu = <Submenu />;

  return <Page sidebar topbar={topbar} submenu={submenu}></Page>;
};
