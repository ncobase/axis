import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/layouts/main';
import { Topbar } from '@/layouts/main/page/topbar';

export const Topic = () => {
  const title = 'Topic Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  const topBarExtras = [
    <>
      <div>div element</div>
      <span> | </span>
    </>,
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
  ];

  return (
    <Page
      withLayout
      navbar
      topbar={<Topbar title={title} operators={topBarOperators} extras={topBarExtras} />}
    >
      {title}
    </Page>
  );
};
