import { Menu } from '@mantine/core';
import { IconAdjustments, IconSwitch } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { useTheme } from '@/themes';

interface DomainMenuProps {}

export const DomainMenu: React.FC<DomainMenuProps> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { name = 'YIT' } = {} as const;
  return (
    <Menu shadow='md' width={180} withArrow>
      <Menu.Target>
        <AvatarButton alt={name} mah={56} maw={56} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<IconAdjustments size={16} />} c={theme.colors.blueGray[7]}>
          {t('layout:domain_menu.admin')}
        </Menu.Item>
        <Menu.Divider maw='90%' mx='auto' />
        <Menu.Item icon={<IconSwitch size={16} />} c={theme.colors.blueGray[7]}>
          {t('layout:domain_menu.switch')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
