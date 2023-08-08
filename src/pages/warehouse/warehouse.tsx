import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/layouts/main';
import { Sidebar } from '@/layouts/main/page/sidebar';
import { Topbar } from '@/layouts/main/page/topbar';

const Warehouse = () => {
  const title = 'Warehouse Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-gray-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  const topBarExtras = [
    <div className='text-xs'>
      <div>div element</div>
      <span> | </span>
    </div>,
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
      sidebar={<Sidebar />}
      topbar={<Topbar title={title} operators={topBarOperators} extras={topBarExtras} />}
    >
      {title}
    </Page>
  );
};

export default Warehouse;
