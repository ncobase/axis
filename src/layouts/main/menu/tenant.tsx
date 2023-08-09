import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { DIcon } from '@/components/icon/icon';
import { useAccountTenant, useAccountTenants } from '@/pages/account/account.service';
import { TenantSwitchModal } from '@/pages/account/tenant/switch_modal';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { MenuTreeProps } from '@/pages/system/menu/menu.types';
import { useTenantContext } from '@/pages/system/tenant/tenant.context';
import { useTheme } from '@/themes';

export const TenantMenu = ({ ...rest }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const navigate = useNavigate();

  const { hasTenant, tenant_id } = useTenantContext();
  const { tenants = [] } = useAccountTenants();
  const { tenant } = useAccountTenant(tenant_id, {
    onError: () => {
      open();
    }
  });

  const [opened, { open }] = useDisclosure(false);

  const { menus = [] } = useListMenus({ type: 'tenant' });

  const switchTenant = () => {
    if (tenants.length > 1) {
      return (
        <>
          <Menu.Divider maw='90%' mx='auto' />
          <Menu.Item icon={<DIcon name='IconSwitch' />} color={colors.blueGray[7]} onClick={open}>
            {t('layout:tenant_menu.switch')}
          </Menu.Item>
        </>
      );
    }
    return null;
  };

  const renderMenuDropdown = (menuItems: MenuTreeProps[]) => {
    const visibleItems = menuItems.filter(item => !item.hidden);
    return (
      visibleItems.length > 0 && (
        <Menu.Dropdown>
          <Menu.Label>{t('layout:tenant_menu.label')}</Menu.Label>
          {visibleItems.map(renderLink)}
          {switchTenant()}
        </Menu.Dropdown>
      )
    );
  };

  const renderLink = (menu: MenuTreeProps) => {
    return (
      <div key={menu.id || menu.label}>
        <Menu.Item
          icon={<DIcon name={menu.icon} />}
          c={colors.blueGray[7]}
          onClick={() => navigate(menu.path)}
        >
          {t(menu.label)}
        </Menu.Item>
        {menus.length > 1 && <Menu.Divider maw='90%' mx='auto' />}
      </div>
    );
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
      {renderMenuDropdown(menus)}
    </Menu>
  );

  return (
    <>
      {hasTenant ? <MenuList /> : null}
      <TenantSwitchModal openModal={opened} />
    </>
  );
};
