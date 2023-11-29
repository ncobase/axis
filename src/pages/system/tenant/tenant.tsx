import React from 'react';

import { DIcon } from '@/components/icon/icon';
import { Page } from '@/components/layout';
import { Sidebar } from '@/components/layout/page/sidebar';
import { Topbar } from '@/components/layout/page/topbar';
import { Button } from '@/components/ui/button/button';

export const Tenant = () => {
  const title = 'Tenant Page';

  const topBarOperators = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconPlus' />
    </button>
  ];

  const topBarExtras = [
    <button className='max-h-8 rounded-md px-3 py-2 hover:bg-slate-100'>
      <DIcon name='IconFilter' />
    </button>
  ];

  return (
    <Page
      withLayout
      navbar
      topbar={<Topbar title={title} operators={topBarOperators} extras={topBarExtras} />}
      sidebar={<Sidebar />}
    >
      <Button>Click me</Button>
    </Page>
  );
};
