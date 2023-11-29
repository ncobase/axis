import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Topbar } from '@/components/layout/page/topbar';

export const Purchase = () => {
  const title = 'Purchase Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  return (
    <Page withLayout navbar topbar={<Topbar title={title} operators={topBarOperators} />}>
      {title}
    </Page>
  );
};
