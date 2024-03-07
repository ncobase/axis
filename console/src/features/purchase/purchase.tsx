import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/layout';
import { Topbar } from '@/layout/page/topbar';

export const Purchase = () => {
  const topbarElement = {
    title: 'Purchase Page',
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

  return <Page topbar={topbar}></Page>;
};
