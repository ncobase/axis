import { ActionIcon, Group, Header as StdHeader } from '@mantine/core';
import { IconBell, IconHelp, IconMoonStars, IconSun } from '@tabler/icons-react';
import React from 'react';

import Logo from '@/components/logo';
import { AccountMenu } from '@/layouts/main/menu/account';
import { MainMenu } from '@/layouts/main/menu/main';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { useColorScheme, useTheme } from '@/themes';

export const Header = ({ ...rest }) => {
  const theme = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // get main menu
  // TODO: order
  // const { menus: main_menus = [] } = useGetMenuTree('root', 'main');
  const { menus: main_menus = [] } = useListMenus({ type: 'main' });

  // TODO: All menus changed to fetch from backend, include i18n configuage
  // get account menu
  // const { menus: account_menus = [] } = useGetMenuTree('root', 'account');
  // console.log(account_menus);
  // get domain menu
  // const { menus: domain_menus = [] } = useGetMenuTree('root', 'domain');
  // console.log(domain_menus);

  return (
    <StdHeader
      height={theme.other.layout.topbar.height}
      bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blueGray[8]}
      w='100vw'
      sx={{
        boxShadow: theme.shadows.sm
      }}
      {...rest}
    >
      <Group sx={{ height: '100%' }} position='apart'>
        <Group>
          <Logo
            w={55}
            h={55}
            bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.blueGray[9]}
            type='min'
            logoColor='white'
          />
          {main_menus.length ? <MainMenu menus={main_menus} /> : null}
        </Group>
        <Group px={theme.spacing.md}>
          <ActionIcon>
            <IconBell size={20} />
          </ActionIcon>
          <ActionIcon>
            <IconHelp size={20} />
          </ActionIcon>
          <ActionIcon onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1rem' />}
          </ActionIcon>
          {/*<DomainMenu />*/}
          <AccountMenu />
        </Group>
      </Group>
    </StdHeader>
  );
};
