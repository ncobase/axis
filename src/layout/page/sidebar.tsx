import { Navbar, Text, Tooltip, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useStyles } from '@/layout/page/sidebar.styles';
import { MenuProps } from '@/pages/system/menu/menu.types';
import { useTheme } from '@/themes';
import { getInitials } from '@/utils';

interface SidebarProps {
  links: MenuProps[];
  activeLabel?: string;
  onLinkClick?: (label: string) => void;
}

export const Sidebar = ({ links, activeLabel = '', onLinkClick }: SidebarProps) => {
  const { classes, cx } = useStyles();
  const theme = useTheme();
  const [active, setActive] = useState(activeLabel);

  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => pathname.startsWith(to);

  const sidebarLinks = links.map(link => {
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
            <link.icon size={16} color={theme.colors.blueGray[5]} strokeWidth={1.5} />
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
    <Navbar width={{ sm: theme.other.layout.sidebar.width }} sx={{ boxShadow: theme.shadows.sm }}>
      <Navbar.Section>{sidebarLinks}</Navbar.Section>
    </Navbar>
  );
};
