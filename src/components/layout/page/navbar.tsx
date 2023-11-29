import { Divider, Navbar as StdNavbar, Text, Tooltip, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { DIcon } from '@/components/icon/icon';
import { useStyles } from '@/components/layout/page/navbar.styles';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { MenuProps } from '@/pages/system/menu/menu.types';
import { useTheme } from '@/themes';
import { getInitials } from '@/utils';

interface SidebarProps {
  activeLabel?: string;
  onLinkClick?: (label: string) => void;
}

export const Navbar = ({ activeLabel = '', onLinkClick }: SidebarProps) => {
  const { classes, cx } = useStyles();
  const { colors, other } = useTheme();
  const [active, setActive] = useState(activeLabel);

  const { t } = useTranslation();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive = (to: string) => pathname.startsWith(to);

  const headerMenus = useListMenus({ type: 'header' }).menus ?? [];
  const pathArray = pathname.split('/').filter(Boolean);
  const sidebarMenus = (
    useListMenus({
      type: 'sidebar',
      parent: headerMenus.find(
        (menu: MenuProps) => menu.slug === (pathArray[pathArray.length - 2] ?? pathArray[0]) || ''
      )?.id
    }).menus ?? []
  ).filter((i: MenuProps) => !i.hidden);

  if (headerMenus.length === 0 || sidebarMenus.length === 0) return null;

  const isDividerLink = (link: MenuProps) =>
    link.name === 'Divide' && link.slug?.includes('divide') && link.path === '-';

  const dividerLink = (link: MenuProps) => (
    <Divider size='xs' className='w-1/2 !mx-auto !border-slate-200' key={link.id} />
  );

  const tooltipLink = (link: MenuProps, isActive: boolean, active: string) => (
    <Tooltip
      key={link.id}
      label={t(link.label)}
      position='right'
      withArrow
      transitionProps={{ duration: 0 }}
      className={cx(classes.link, {
        [classes.linkActive]: isActive || active === link.label
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
          <DIcon name={link.icon} />
        ) : (
          <Text color={colors.slate[5]}>{getInitials(link.name || link.label || link.id)}</Text>
        )}
      </UnstyledButton>
    </Tooltip>
  );

  const links = sidebarMenus.map((link: MenuProps) => {
    if (link.hidden) return null;
    if (isDividerLink(link)) return dividerLink(link);
    return tooltipLink(link, isActive(link.path), active);
  });

  return (
    <StdNavbar width={{ sm: other.layout.navbar.width }} className='shadow-sm justify-between'>
      <StdNavbar.Section>{links}</StdNavbar.Section>
      {/*Bottom Wrapper*/}
      {/*<div className='py-4 flex justify-center'></div>*/}
    </StdNavbar>
  );
};
