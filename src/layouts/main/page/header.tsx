import { ActionIcon, Group, Header as StdHeader } from '@mantine/core';
import React from 'react';

import { DIcon } from '@/components/icon/icon';
import Logo from '@/components/logo';
import { AccountMenu } from '@/layouts/main/menu/account';
import { MainMenu } from '@/layouts/main/menu/main';
import { TenantMenu } from '@/layouts/main/menu/tenant';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { useColorScheme, useTheme } from '@/themes';

export const Header = ({ ...rest }) => {
  const { spacing, colors, shadows, other } = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

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
      bg={colorScheme === 'dark' ? colors.dark[8] : colors.blueGray[8]}
      w='100vw'
      sx={{
        borderBottomWidth: 0,
        boxShadow: shadows.sm
      }}
      {...rest}
    >
      <Group sx={{ height: '100%' }} position='apart'>
        <Group>
          <Logo
            w={55}
            h={55}
            bg={colorScheme === 'dark' ? colors.dark[8] : colors.blueGray[9]}
            type='min'
            logoColor='white'
          />
          {headerMenus.length ? <MainMenu menus={headerMenus} /> : null}
        </Group>
        <Group px={spacing.md} spacing='sm'>
          <ActionIcon>
            <DIcon name='IconBell' size={20} />
          </ActionIcon>
          <ActionIcon>
            <DIcon name='IconHelp' size={20} />
          </ActionIcon>
          <ActionIcon onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? (
              <DIcon name='IconSun' size='1.2rem' />
            ) : (
              <DIcon name='IconMoonStars' size='1.1rem' />
            )}
          </ActionIcon>
          <TenantMenu />
          <AccountMenu />
        </Group>
      </Group>
    </StdHeader>
  );
};
