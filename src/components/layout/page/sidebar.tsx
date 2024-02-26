import React, { useState } from 'react';

import { AppShell, Divider, Text, Tooltip, UnstyledButton } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { DIcon } from '@/components/icon/icon';
import classes from '@/components/layout/page/page.module.css';
import { Menu } from '@/features/system/menu/schema';
import { useListMenus } from '@/features/system/menu/service';
import { cn, getInitials } from '@/helpers';
import { useTheme } from '@/themes';

interface SidebarProps {
  activeLabel?: string;
  onLinkClick?: (label: string) => void;
}

export const Sidebar = ({ activeLabel = '', onLinkClick }: SidebarProps) => {
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
        (menu: Menu) => menu.slug === (pathArray[pathArray.length - 2] ?? pathArray[0]) || ''
      )?.id
    }).menus ?? []
  ).filter((i: Menu) => !i.hidden);

  if (headerMenus.length === 0 || sidebarMenus.length === 0) return null;

  const isDividerLink = (link: Menu) =>
    link.name === 'Divide' && link.slug?.includes('divide') && link.path === '-';

  const dividerLink = (link: Menu) => (
    <Divider size='xs' className='w-1/2 !mx-auto !border-slate-200' key={link.id} />
  );

  const tooltipLink = (link: Menu, isActive: boolean, active: string) => (
    <Tooltip
      key={link.id}
      label={t(link.label)}
      position='right'
      withArrow
      transitionProps={{ duration: 0 }}
      className={cn(classes.link, {
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
          <DIcon size={18} name={link.icon} />
        ) : (
          <Text c={colors.slate[4]}>{getInitials(link.name || link.label || link.id)}</Text>
        )}
      </UnstyledButton>
    </Tooltip>
  );

  const links = sidebarMenus.map((link: Menu) => {
    if (link.hidden) return null;
    if (isDividerLink(link)) return dividerLink(link);
    return tooltipLink(link, isActive(link.path), active);
  });

  return (
    <AppShell.Navbar className='shadow-sm justify-between'>
      <div className='flex flex-col items-center align-middle'>{links}</div>
      {/*Bottom Wrapper*/}
      {/* <div className='py-4 flex flex-col justify-center'></div> */}
    </AppShell.Navbar>
  );
};
