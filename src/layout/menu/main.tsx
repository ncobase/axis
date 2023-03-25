import { Anchor, Center, Group, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles } from '@/layout/menu/main.styles';
import { MainMenuProps } from '@/pages/system/menu/menu.types';

// TODO: use request menus
const mainLinksMockdata: MainMenuProps[] = [
  {
    path: '/dash/system',
    label: 'layout:main_menu.dash'
  },
  {
    path: '/content/topic',
    label: 'layout:main_menu.content',
    hidden: false
  },
  {
    path: '/sale',
    label: 'layout:main_menu.sale',
    hidden: false
  },
  {
    path: '/purchase',
    label: 'layout:main_menu.purchase',
    hidden: false
  },
  {
    path: '/finance',
    label: 'layout:main_menu.finance',
    hidden: false
  },
  {
    path: '/warehouse',
    label: 'layout:main_menu.warehouse',
    hidden: false
  },
  {
    path: '/customer',
    label: 'layout:main_menu.customer',
    hidden: false
  },
  {
    path: '/analytics',
    label: 'layout:main_menu.analytics',
    hidden: false
  },
  {
    path: '/hr',
    label: 'layout:main_menu.hr',
    hidden: false
  },
  {
    path: '/system/domain',
    label: 'layout:main_menu.system',
    hidden: false
  }
];

export const MainMenu = () => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => pathname.startsWith(to);

  const renderMenuItems = (menuItems: MainMenuProps[]) =>
    menuItems.map(item => <Menu.Item key={item.label}>{t(item.label)}</Menu.Item>);

  const renderLink = ({ id, path, label, children, hidden }: MainMenuProps) => {
    if (hidden) return null;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate(path);
      },
      [navigate, path]
    );

    if (children && children.length > 0) {
      const menuItems = renderMenuItems(children!);
      return (
        <Menu key={id || label} trigger='hover' transitionProps={{ duration: 0 }} withinPortal>
          <Menu.Target>
            <Anchor className={classes.link} onClick={handleClick}>
              <Center>
                <span className={classes.linkLabel}>{t(label)}</span>
                <IconChevronDown size='0.9rem' />
              </Center>
            </Anchor>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Anchor
        key={id || label}
        title={t(label) as string}
        className={`${classes.link} ${isActive(path) ? classes.linkActive : ''}`}
        onClick={handleClick}
      >
        {t(label)}
      </Anchor>
    );
  };

  const mainLinks = mainLinksMockdata.map(renderLink);

  return (
    <Group spacing={5} className={classes.links}>
      {mainLinks}
    </Group>
  );
};
