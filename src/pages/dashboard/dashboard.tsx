import React from 'react';

import { Content, Page } from '@/layout';
import { AccountMenu } from '@/layout/menu/account';
import { DomainMenu } from '@/layout/menu/domain';
import MainMenu from '@/layout/menu/main';

export const Dashboard = () => {
  return (
    <Page title='Dashboard'>
      <Content>
        <MainMenu />
        <DomainMenu />
        <div hidden>
          <AccountMenu withArrow />
        </div>
      </Content>
    </Page>
  );
};
