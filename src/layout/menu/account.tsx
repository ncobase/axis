import { Menu } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconClipboardCheck, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import versionInfo from '@/../version.json';
import { AvatarButton } from '@/components/avatar/avatar_button';
import { useAccount } from '@/pages/account/account.service';
import { useTheme } from '@/themes';

const AdminMenu = ({ isAdmin = false }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  if (!isAdmin) return null;

  return (
    <>
      <Menu.Item icon={<IconSettings size={16} />} c={theme.colors.blueGray[7]}>
        {t('layout:account_menu.system')}
      </Menu.Item>
      <Menu.Divider maw='90%' mx='auto' />
    </>
  );
};

const AppVersion = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { copied, copy } = useClipboard();

  if (!versionInfo?.version) return null;

  return (
    <>
      <Menu.Divider maw='90%' mx='auto' />
      <Menu.Item
        icon={copied ? <IconClipboardCheck size={16} color={theme.colors.green[6]} /> : null}
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

interface AccountMenuProps {}

export const AccountMenu: React.FC<AccountMenuProps> = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, profile, isLoading } = useAccount();

  return (
    <Menu shadow='md' width={180} withArrow>
      <Menu.Target>
        <AvatarButton
          isLoading={isLoading}
          src={profile?.thumbnail}
          alt={profile?.short_bio || user?.username || ''}
          maw={56}
          mah={56}
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('layout:account_menu.label')}</Menu.Label>
        <Menu.Item icon={<IconUser size={16} />} c={theme.colors.blueGray[7]}>
          {t('layout:account_menu.my')}
        </Menu.Item>
        <Menu.Divider maw='90%' mx='auto' />
        <AdminMenu isAdmin />
        <Menu.Item
          icon={<IconLogout size={16} />}
          c={theme.colors.blueGray[7]}
          onClick={() => navigate('/logout')}
        >
          {t('layout:account_menu.logout')}
        </Menu.Item>
        <AppVersion />
      </Menu.Dropdown>
    </Menu>
  );
};
