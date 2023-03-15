import React from 'react';

import { Content, Page } from '@/layout';
import { AccountMenu } from '@/layout/menu/account';
import MainMenu from '@/layout/menu/main';

export const Dashboard = () => {
  return (
    <Page title='Dashboard'>
      <Content>
        <MainMenu />
        <AccountMenu />
      </Content>
    </Page>
  );
};
