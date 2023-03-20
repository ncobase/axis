import { ActionIcon, Group, Header as StdHeader } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import React from 'react';

import Logo from '@/components/logo';
import { AccountMenu } from '@/layout/menu/account';
import { DomainMenu } from '@/layout/menu/domain';
import MainMenu from '@/layout/menu/main';
import { useColorScheme, useTheme } from '@/themes';

export const Header = ({ ...rest }) => {
  const theme = useTheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <StdHeader
      height={theme.other.layout.topbar.height}
      bg={colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.blueGray[8]}
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
            bg={colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.blueGray[9]}
            type='min'
            logoColor='white'
          />
          <MainMenu />
        </Group>
        <Group px={theme.spacing.md}>
          <ActionIcon onClick={() => toggleColorScheme()} size={30}>
            {colorScheme === 'dark' ? <IconSun size='1.2rem' /> : <IconMoonStars size='1rem' />}
          </ActionIcon>
          <DomainMenu />
          <AccountMenu />
        </Group>
      </Group>
    </StdHeader>
  );
};

export default Header;
