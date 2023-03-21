import { Anchor, Center, Group, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles } from '@/layout/menu/main.styles';

export interface MenuItemProps {
  path: string;
  label: string;
  hidden?: boolean;
  children?: MenuItemProps[];
}

export type MenuItemsProps = MenuItemProps[];

// TODO: add useMenuContext
const mainLinksMockdata: MenuItemsProps = [
  {
    path: '/dash',
    label: 'layout:main_menu.dash'
  },
  {
    path: '/content',
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
    path: '/system',
    label: 'layout:main_menu.system',
    hidden: false
  }
];

export const MainMenu = () => {
  const { t } = useTranslation('layout');
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => pathname.startsWith(to);

  const renderMenuItems = (menuItems: MenuItemProps[]) =>
    menuItems.map(item => <Menu.Item key={item.label}>{t(item.label)}</Menu.Item>);

  const renderLink = ({ path, label, children, hidden }: MenuItemProps) => {
    if (hidden) return null;

    const isDropdown = children && children.length > 0;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        navigate(path);
      },
      [navigate, path]
    );

    if (isDropdown) {
      const menuItems = renderMenuItems(children!);
      return (
        <Menu key={label} trigger='hover' transitionProps={{ duration: 0 }} withinPortal>
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
        key={label}
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

export default MainMenu;
