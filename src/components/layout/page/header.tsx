import { Group, Header as StdHeader } from '@mantine/core';
import React from 'react';

import { AccountMenu } from '@/components/layout';
import { MainMenu } from '@/components/layout/menu/main';
import { TenantMenu } from '@/components/layout/menu/tenant';
import { Logo } from '@/components/logo';
import { useListMenus } from '@/features/system/menu/service';
import { useTheme } from '@/themes';

export const Header = ({ ...rest }) => {
  const { spacing, shadows, other } = useTheme();

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
    <StdHeader
      height={other.layout.header.height}
      className='w-screen bg-gradient-to-r from-slate-600 via-cyan-700 via-20% to-sky-800'
      sx={{
        borderBottomWidth: 0,
        boxShadow: shadows.sm
      }}
      {...rest}
    >
      <Group sx={{ height: '100%' }} position='apart'>
        <Group>
          <Logo w={55} h={55} type='min' logoColor='white' />
          {headerMenus.length ? <MainMenu menus={headerMenus} /> : null}
        </Group>
        <Group px={spacing.md} spacing='sm'>
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
    </StdHeader>
  );
};
