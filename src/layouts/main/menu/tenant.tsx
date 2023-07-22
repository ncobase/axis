import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAdjustments, IconSwitch } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { useAccountTenant, useAccountTenants } from '@/pages/account/account.service';
import { TenantSwitchModal } from '@/pages/account/tenant/switch_modal';
import { useTenantContext } from '@/pages/system/tenant/tenant.context';
import { useTheme } from '@/themes';

export const TenantMenu = ({ ...rest }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { hasTenant, tenant_id } = useTenantContext();
  const { tenants = [] } = useAccountTenants();
  const { tenant } = useAccountTenant(tenant_id, {
    onError: () => {
      open();
    }
  });

  const [opened, { open }] = useDisclosure(false);

  const switchTenant = () => {
    if (tenants.length > 1) {
      return (
        <>
          <Menu.Divider maw='90%' mx='auto' />
          <Menu.Item
            icon={<IconSwitch size={16} />}
            color={theme.colors.blueGray[7]}
            onClick={open}
          >
            {t('layout:tenant_menu.switch')}
          </Menu.Item>
        </>
      );
    }
    return null;
  };

  const MenuList = () => (
    <Menu shadow='md' width={180} {...rest}>
      <Menu.Target>
        {tenant?.logo ? (
          <AvatarButton src={tenant?.logo} alt={tenant?.name} />
        ) : (
          <span
            className='text-gray-500 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden max-w-[80px]'
            title={tenant?.name}
          >
            {tenant?.name}
          </span>
        )}
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('layout:tenant_menu.label')}</Menu.Label>
        <Menu.Item icon={<IconAdjustments size={16} />} color={theme.colors.blueGray[7]}>
          {t('layout:tenant_menu.admin')}
        </Menu.Item>
        {switchTenant()}
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      {hasTenant ? <MenuList /> : null}
      <TenantSwitchModal openModal={opened} />
    </>
  );
};
