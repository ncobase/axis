import { Center, Group, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

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
    path: '/dashboard',
    label: 'layout:main_menu.dashboard'
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
  }
];

export const MainMenu = () => {
  const { t } = useTranslation('layout');
  const { classes } = useStyles();
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname.startsWith(to);

  const renderMenuItems = (menuItems: MenuItemProps[]) =>
    menuItems.map(item => <Menu.Item key={item.label}>{t(item.label)}</Menu.Item>);

  const renderLink = ({ path, label, children, hidden }: MenuItemProps) => {
    if (hidden) return null;

    const isDropdown = children && children.length > 0;

    if (isDropdown) {
      const menuItems = renderMenuItems(children!);
      return (
        <Menu key={label} trigger='hover' transitionProps={{ duration: 0 }} withinPortal>
          <Menu.Target>
            <a href={path} className={classes.link} onClick={event => event.preventDefault()}>
              <Center>
                <span className={classes.linkLabel}>{t(label)}</span>
                <IconChevronDown size='0.9rem' />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={label}
        href={path}
        title={t(label) as string}
        className={`${classes.link} ${isActive(path) ? classes.linkActive : ''}`}
        onClick={event => event.preventDefault()}
      >
        {t(label)}
      </a>
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
