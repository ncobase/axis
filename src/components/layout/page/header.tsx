import React from 'react';

import { AppShell, Group } from '@mantine/core';

import { AccountMenu } from '@/components/layout';
import { MainMenu } from '@/components/layout/menu/main';
import { TenantMenu } from '@/components/layout/menu/tenant';
import { Logo } from '@/components/logo';
import { useListMenus } from '@/features/system/menu/service';
import { useTheme } from '@/themes';

export const Header = ({ ...rest }) => {
  const { spacing, shadows } = useTheme();

  // get main menu
  // const { menus: headerMenus = [] } = useGetMenuTree('root', 'main');
  const { menus: headerMenus = [] } = useListMenus({ type: 'header' });

  // TODO: All menus changed to fetch from backend, include i18n configuage
  // get account menu
  // const { menus: accountMenus = [] } = useGetMenuTree('root', 'account');
  // console.log(accountMenus);
  // get tenant menu
  // const { menus: tenantMenus = [] } = useGetMenuTree('root', 'tenant');
  // console.log(tenantMenus);

  return (
    <AppShell.Header
      className='w-screen bg-gradient-to-r from-slate-800 via-slate-700 via-20% to-slate-800'
      style={{
        borderBottomWidth: 0,
        boxShadow: shadows.sm
      }}
      {...rest}
    >
      <Group style={{ height: '100%' }} justify='space-between'>
        <Group>
          <Logo w={55} h={55} type='min' logoColor='white' />
          {headerMenus.length ? <MainMenu menus={headerMenus} /> : null}
        </Group>
        <Group px={spacing.md} gap='sm'>
          {/*<ActionIcon>*/}
          {/*  <DIcon name='IconBell' color={colors.whiteAlpha[7]} size={20} />*/}
          {/*</ActionIcon>*/}
          {/*<ActionIcon>*/}
          {/*  <DIcon name='IconHelp' color={colors.whiteAlpha[7]} size={20} />*/}
          {/*</ActionIcon>*/}
          {/*<ActionIcon onClick={() => toggleColorScheme()} size={30}>*/}
          {/*  {colorScheme === 'dark' ? (*/}
          {/*    <DIcon name='IconSun' color={colors.whiteAlpha[7]} size='1.2rem' />*/}
          {/*  ) : (*/}
          {/*    <DIcon name='IconMoonStars' color={colors.whiteAlpha[7]} size='1.1rem' />*/}
          {/*  )}*/}
          {/*</ActionIcon>*/}
          <TenantMenu />
          <AccountMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
