import { Navbar, Text, Tooltip, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { DIcon } from '@/components/icon/icon';
import { useStyles } from '@/layouts/main/page/sidebar.styles';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { MenuProps } from '@/pages/system/menu/menu.types';
import { useTheme } from '@/themes';
import { getInitials } from '@/utils';

interface SidebarProps {
  menuID: string;
  activeLabel?: string;
  onLinkClick?: (label: string) => void;
}

export const Sidebar = ({ menuID = '', activeLabel = '', onLinkClick }: SidebarProps) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const [active, setActive] = useState(activeLabel);

  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => pathname.startsWith(to);

  // TODO: Dynamic parent id
  const { menus = [] } = useListMenus({ type: 'sidebar', parent: menuID });

  const sidebarLinks = menus.map((link: MenuProps) => {
    if (link.hidden) return null;
    return (
      <Tooltip
        key={link.id || link.label}
        label={t(link.label)}
        position='right'
        withArrow
        transitionProps={{ duration: 0 }}
        className={cx(classes.link, {
          [classes.linkActive]: isActive(link.path) || active === link.label
        })}
      >
        <UnstyledButton
          mx='auto'
          my='xs'
          onClick={() => {
            setActive(link.label);
            navigate(link.path);
            if (onLinkClick) onLinkClick(link.label);
          }}
        >
          {link.icon ? (
            <DIcon name={link.icon} size={16} color={theme.colors.blueGray[5]} strokeWidth={1.5} />
          ) : (
            <Text color={theme.colors.blueGray[5]}>
              {getInitials(link.name || link.label || link.id)}
            </Text>
          )}
        </UnstyledButton>
      </Tooltip>
    );
  });

  return (
    menus.length && (
      <Navbar width={{ sm: theme.other.layout.sidebar.width }} sx={{ boxShadow: theme.shadows.sm }}>
        <Navbar.Section>{sidebarLinks}</Navbar.Section>
      </Navbar>
    )
  );
};
