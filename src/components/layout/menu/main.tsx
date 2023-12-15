import { Anchor, Center, Group, Menu } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { DIcon } from '@/components/icon/icon';
import { useStyles } from '@/components/layout/menu/main.styles';
import { MenuTreeProps } from '@/features/system/menu/types';

interface MainMenuProps {
  menus?: MenuTreeProps[];
}

export const MainMenu: React.FC<MainMenuProps> = ({ menus = [] }) => {
  const { t } = useTranslation();
  const { classes } = useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => !!to && pathname.startsWith(to);

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const renderMenuItems = (menuItems: MenuTreeProps[]) =>
    menuItems.map(({ id, path, label, hidden }) => {
      if (hidden) return null;
      return (
        <Menu.Item key={id || label} onClick={() => handleLinkClick(path)}>
          {t(label)}
        </Menu.Item>
      );
    });

  const renderLink = ({ id, path, label, children, hidden }: MenuTreeProps) => {
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
    <Group spacing={5} className={classes.links}>
      {menus.map(renderLink)}
    </Group>
  );
};
