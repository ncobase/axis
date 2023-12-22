import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Topbar } from '@/components/layout/page/topbar';

export const Comment = () => {
  const topbarElement = {
    title: 'Comment Page',
    actions: [
      <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
        <DIcon name='IconPlus' />
      </button>
    ],
    extras: [
      <div>div element</div>,
      <button className='bg-slate-100 px-3 py-1.5 rounded-md text-xs hover:bg-blue-600 hover:text-white'>
        Button
      </button>,
      <input
        title='Elemenu2'
        className='border border-slate-100 px-3 py-1.5 rounded-md text-xs'
        placeholder='Input Element'
      />,
      <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
        <DIcon name='IconFilter' />
      </button>
    ]
  };

  const topbar = <Topbar {...topbarElement} />;

  return <Page sidebar topbar={topbar}></Page>;
};
