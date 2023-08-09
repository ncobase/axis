import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/layouts/main';
import { Navbar } from '@/layouts/main/page/navbar';
import { Topbar } from '@/layouts/main/page/topbar';

export const Taxonomy = () => {
  const title = 'Taxonomy Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-gray-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  const topBarExtras = [
    <div>div element</div>,
    <button className='bg-gray-100 px-3 py-1.5 rounded-md text-xs hover:bg-blue-600 hover:text-white'>
      Button
    </button>,
    <input
      title='Elemenu2'
      className='border border-gray-100 px-3 py-1.5 rounded-md text-xs'
      placeholder='Input Element'
    />,
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-gray-100'>
      <DIcon name='IconFilter' />
    </button>
  ];

  return (
    <Page
      withLayout
      navbar={<Navbar />}
      topbar={<Topbar title={title} operators={topBarOperators} extras={topBarExtras} />}
    >
      {title}
    </Page>
  );
};
