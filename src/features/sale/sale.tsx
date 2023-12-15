import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Topbar } from '@/components/layout/page/topbar';

export const Sale = () => {
  const title = 'Sale Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  return (
    <Page layout navbar topbar={<Topbar title={title} operators={topBarOperators} />}>
      {title}
    </Page>
  );
};
