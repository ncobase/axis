import { Navbar, Tooltip, UnstyledButton } from '@mantine/core';
import React, { useState } from 'react';

import { useStyles } from '@/layout/page/sidebar.styles';
import { useTheme } from '@/themes';

interface SidebarLink {
  label: string;
  icon: React.ElementType;
  path?: string;
}

interface SidebarProps {
  links: SidebarLink[];
  activeLabel?: string;
  onLinkClick?: (label: string) => void;
}

const Sidebar = ({ links, activeLabel = '', onLinkClick }: SidebarProps) => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(activeLabel);
  const theme = useTheme();

  const sidebarLinks = links.map(link => (
    <Tooltip
      label={link.label}
      position='right'
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: link.label === active })}
    >
      <UnstyledButton
        onClick={() => {
          setActive(link.label);
          if (onLinkClick) onLinkClick(link.label);
        }}
        mx='auto'
        my='xs'
      >
        <link.icon size='1.2rem' color={theme.colors.blueGray[5]} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  return (
    <Navbar width={{ sm: theme.other.layout.sidebar.width }} sx={{ boxShadow: theme.shadows.sm }}>
      <Navbar.Section>{sidebarLinks}</Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
