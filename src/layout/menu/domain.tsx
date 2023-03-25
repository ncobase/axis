import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments, IconSwitch } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { useAccountDomain } from '@/pages/account/account.service';
import { DomainSwitchModal } from '@/pages/account/domain/domain_switch_modal';
import { useDomainContext } from '@/pages/system/domain/domain.context';
import { useTheme } from '@/themes';

export const DomainMenu = ({ ...rest }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { hasDomain, domain_id } = useDomainContext();
  const { domain } = useAccountDomain(domain_id, {
    onError: () => {
      open();
    }
  });

  const [opened, { open }] = useDisclosure(false);

  const MenuList = () => (
    <Menu shadow='md' width={180} {...rest}>
      <Menu.Target>
        <AvatarButton src={domain?.logo} alt={domain?.name} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('layout:domain_menu.label')}</Menu.Label>
        <Menu.Item icon={<IconAdjustments size={16} />} color={theme.colors.blueGray[7]}>
          {t('layout:domain_menu.admin')}
        </Menu.Item>
        <Menu.Divider maw='90%' mx='auto' />
        <Menu.Item icon={<IconSwitch size={16} />} color={theme.colors.blueGray[7]} onClick={open}>
          {t('layout:domain_menu.switch')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      {hasDomain ? <MenuList /> : null}
      <DomainSwitchModal openModal={opened} />
    </>
  );
};
