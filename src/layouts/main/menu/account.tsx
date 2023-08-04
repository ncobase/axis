import { Menu } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconClipboardCheck } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import versionInfo from '@/../version.json';
import userAvatar from '@/assets/images/avatar.svg';
import { AvatarButton } from '@/components/avatar/avatar_button';
import { DIcon } from '@/components/icon/icon';
import { useAccount } from '@/pages/account/account.service';
import { useListMenus } from '@/pages/system/menu/menu.service';
import { MenuTreeProps } from '@/pages/system/menu/menu.types';
import { useTheme } from '@/themes';

// const AdminMenu = ({ isAdmin = false }) => {
//   const { t } = useTranslation();
//   const theme = useTheme();
//   const navigate = useNavigate();
//
//   if (!isAdmin) return null;
//
//   return (
//     <>
//       <Menu.Item
//         // icon={<DIcon name='IconSettings' />}
//         c={theme.colors.blueGray[7]}
//         onClick={() => navigate('/system/tenant')}
//       >
//         {t('layout:account_menu.system')}
//       </Menu.Item>
//       <Menu.Divider maw='90%' mx='auto' />
//     </>
//   );
// };

const AppVersion = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { copied, copy } = useClipboard();

  if (!versionInfo?.version) return null;

  return (
    <>
      <Menu.Item
        icon={copied ? <DIcon name='IconClipboardCheck' color={theme.colors.green[6]} /> : null}
        c={copied ? theme.colors.green[5] : theme.colors.blueGray[4]}
        onClick={() => copy(JSON.stringify(versionInfo, null, 2))}
        closeMenuOnClick={false}
        title={
          copied ? t('layout:account_menu.version.copied') : t('layout:account_menu.version.copy')
        }
      >
        {copied ? t('layout:account_menu.version.copied') : versionInfo?.version}
      </Menu.Item>
    </>
  );
};

export const AccountMenu = ({ ...rest }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAccount();
  const { menus = [] } = useListMenus({ type: 'account' });

  const renderMenuDropdown = (menuItems: MenuTreeProps[]) => {
    const visibleItems = menuItems.filter(item => !item.hidden);
    return (
      visibleItems.length > 0 && (
        <Menu.Dropdown>
          <Menu.Label>{t('layout:account_menu.label')}</Menu.Label>
          {visibleItems.map(renderLink)}
          <AppVersion />
        </Menu.Dropdown>
      )
    );
  };

  const renderLink = (menu: MenuTreeProps) => {
    return (
      <div key={menu.id || menu.label}>
        <Menu.Item
          icon={<DIcon name={menu.icon} />}
          c={theme.colors.blueGray[7]}
          onClick={() => navigate(menu.path)}
        >
          {t(menu.label)}
        </Menu.Item>
        {menus.length > 1 && <Menu.Divider maw='90%' mx='auto' />}
      </div>
    );
  };

  return (
    <Menu shadow='md' width={180} {...rest}>
      <Menu.Target>
        <AvatarButton
          isLoading={isLoading}
          src={profile?.thumbnail || userAvatar}
          alt={profile?.short_bio || user?.username || ''}
        />
      </Menu.Target>
      {renderMenuDropdown(menus)}
    </Menu>
  );
};
