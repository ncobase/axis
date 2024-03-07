import React, { memo, useState } from 'react';

import { Menu } from '@mantine/core';
import { MenuTree } from '@tone/types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { DIcon } from '@/components/icon/icon';
import { useUserTenant, useUserTenants } from '@/features/account/service';
import { TenantSwitchModal } from '@/features/account/tenant/switch_modal';
import { useListMenus } from '@/features/system/menu/service';
import { useTenantContext } from '@/features/system/tenant/context';
import { randomId } from '@/helpers/common';

export const TenantMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hasTenant, tenant_id } = useTenantContext();
  const { tenants } = useUserTenants();
  const { tenant } = useUserTenant(tenant_id);
  const [opened, setOpened] = useState(false);
  const { menus } = useListMenus({ type: 'tenant' });

  const renderLink = (menu: MenuTree) => {
    const isTenantSwitch = menu.slug?.includes('tenant') && menu.slug?.includes('switch');
    const isLabel = menu.slug?.includes('label') && menu.path.includes('label');

    if (isTenantSwitch) {
      return (
        <React.Fragment key={menu.id || randomId()}>
          <Menu.Divider maw='90%' mx='auto' />
          <Menu.Item
            leftSection={<DIcon name={menu.icon} />}
            className='!text-slate-700'
            onClick={() => setOpened(true)}
          >
            {t(menu.label)}
          </Menu.Item>
        </React.Fragment>
      );
    }

    if (isLabel) {
      return <Menu.Label key={menu.id || randomId()}>{t('layout:tenant_menu.label')}</Menu.Label>;
    }

    return (
      <Menu.Item
        key={menu.id || menu.label}
        leftSection={<DIcon name={menu.icon} />}
        className='!text-slate-700'
        onClick={() => navigate(menu.path)}
      >
        {t(menu.label)}
        {menus.length > 1 && !isLabel && <Menu.Divider maw='90%' mx='auto' />}
      </Menu.Item>
    );
  };

  const renderMenuDropdown = (menuItems: MenuTree[]) => {
    const visibleItems = menuItems.filter(item => !item.hidden || item.disabled);
    if (!visibleItems.length) return null;
    return <Menu.Dropdown>{visibleItems.map(renderLink)}</Menu.Dropdown>;
  };

  const MenuList = memo(() => (
    <Menu shadow='md' width={180}>
      <Menu.Target>
        {tenant?.logo ? (
          <AvatarButton src={tenant?.logo} alt={tenant?.name} />
        ) : (
          <span
            className='text-slate-500 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden max-w-[80px]'
            title={tenant?.name}
          >
            {tenant?.name}
          </span>
        )}
      </Menu.Target>
      {renderMenuDropdown(menus)}
    </Menu>
  ));

  return (
    <React.Fragment>
      {hasTenant && tenants.length > 1 ? <MenuList /> : null}
      <TenantSwitchModal openModal={opened} />
    </React.Fragment>
  );
};
