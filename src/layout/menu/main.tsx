import React from 'react';

import { Anchor, Center, Group, Menu } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { DIcon } from '@/components/icon/icon';
import { MenuTree } from '@/features/system/menu/schema';
import classes from '@/layout/menu/menu.module.css';

interface MainMenuProps {
  menus?: MenuTree[];
}

export const MainMenu: React.FC<MainMenuProps> = ({ menus = [] }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => {
    if (!!to && pathname.startsWith(to)) {
      return true;
    }
    const currentPath = pathname.split('/').filter(p => p);
    const toPath = to.split('/').filter(p => p);

    return currentPath[0] === toPath[0];
  };

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const renderMenuItems = (menuItems: MenuTree[]) =>
    menuItems.map(({ id, path, label, hidden }) => {
      if (hidden) return null;
      return (
        <Menu.Item key={id || label} onClick={() => handleLinkClick(path)}>
          {t(label)}
        </Menu.Item>
      );
    });

  const renderLink = ({ id, path, label, children, hidden }: MenuTree) => {
    if (hidden) return null;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handleLinkClick(path);
    };

    if (children && children.length > 0) {
      const menuItems = renderMenuItems(children!);
      return (
        <Menu key={id || label} trigger='hover' transitionProps={{ duration: 0 }} withinPortal>
          <Menu.Target>
            <Anchor className={classes.link} onClick={handleClick}>
              <Center>
                <span className={classes.linkLabel}>{t(label)}</span>
                <DIcon name='IconChevronDown' size='0.9rem' />
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

  if (!menus.length) return null;

  return (
    <Group gap={5} className={classes.links}>
      {menus.map(renderLink)}
    </Group>
  );
};
