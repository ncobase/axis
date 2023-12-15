import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { DIcon } from '@/components/icon/icon';
import { useAccountTenant, useAccountTenants } from '@/features/account/service';
import { TenantSwitchModal } from '@/features/account/tenant/switch_modal';
import { MenuTreeProps } from '@/features/system/menu/schema';
import { useListMenus } from '@/features/system/menu/service';
import { useTenantContext } from '@/features/system/tenant/context';
import { randomId } from '@/utils';

export const TenantMenu = ({ ...rest }) => {
  const { t } = useTranslation();
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

  const renderLink = (menu: MenuTreeProps) => {
    // switch tenant
    if (menu.slug?.includes('tenant') && menu.slug?.includes('switch')) {
      return (
        <Fragment key={menu.id || randomId()}>
          <Menu.Divider maw='90%' mx='auto' />
          <Menu.Item icon={<DIcon name={menu.icon} />} className='!text-slate-700' onClick={open}>
            {t(menu.label)}
          </Menu.Item>
        </Fragment>
      );
    }

    // menu type
    if (menu.slug?.includes('label') && menu.path.includes('label')) {
      return <Menu.Label key={menu.id || randomId()}>{t('layout:tenant_menu.label')}</Menu.Label>;
    }

    return (
      <Fragment key={menu.id || menu.label}>
        <Menu.Item
          icon={<DIcon name={menu.icon} />}
          className='!text-slate-700'
          onClick={() => navigate(menu.path)}
        >
          {t(menu.label)}
        </Menu.Item>
        {menus.filter((o: MenuTreeProps) => !o.slug?.includes('label') && !o.path.includes('label'))
          .length > 1 && <Menu.Divider maw='90%' mx='auto' />}
      </Fragment>
    );
  };

  const renderMenuDropdown = (menuItems: MenuTreeProps[]) => {
    const visibleItems = menuItems.filter(item => !item.hidden);
    if (!visibleItems.length) return null;
    return <Menu.Dropdown>{visibleItems.map(renderLink)}</Menu.Dropdown>;
  };

  const MenuList = () => (
    <Menu shadow='md' width={180} {...rest}>
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
  );

  return (
    <>
      {hasTenant && tenants.length > 1 ? <MenuList /> : null}
      <TenantSwitchModal openModal={opened} />
    </>
  );
};
