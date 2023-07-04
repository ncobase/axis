import { Avatar, Box, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '@/pages/account/account.context';
import { useAccountTenants } from '@/pages/account/account.service';
import { useTenantContext } from '@/pages/system/tenant/tenant.context';
import { Tenant } from '@/pages/system/tenant/tenant.types';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';
import { useTheme } from '@/themes';

interface TenantOptionProps extends Tenant {
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TenantOption = ({ id, logo, name, slug, isSelected, onSelect }: TenantOptionProps) => {
  const theme = useTheme();

  return (
    <UnstyledButton
      key={id}
      py={8}
      px={3}
      disabled={isSelected}
      hidden={isSelected}
      my={3}
      sx={{
        width: '100%',
        backgroundColor: isSelected ? theme.colors.red[0] : undefined,
        borderRadius: 3,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
        }
      }}
      onClick={() => onSelect(id)}
    >
      <Group>
        <Avatar src={logo} radius='xl' />
        <Box sx={{ flex: 1 }}>
          <Text weight={500}>{name}</Text>
          <Text color='dimmed' size='xs'>
            {slug}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
};

type TenantSwitchModalProps = {
  openModal?: boolean;
  onClose?: () => void;
};

export const TenantSwitchModal = ({ openModal = false, onClose }: TenantSwitchModalProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const { isAuthenticated } = useAuthContext();
  const { hasTenant, tenant_id, updateTenant } = useTenantContext();
  const redirect = useRedirectFromUrl();

  const result = useAccountTenants();
  const tenants = result?.tenants || [];

  useEffect(() => {
    if (openModal) {
      open();
    }
  }, [openModal, open]);

  const onSelect = useCallback(
    (id: string) => {
      if (id !== tenant_id) {
        updateTenant(id);
        redirect();
      }
      onClose?.();
      close();
    },
    [tenant_id, redirect, onClose, updateTenant, close]
  );

  useEffect(() => {
    if (isAuthenticated && !hasTenant && tenants.length > 1) {
      open();
    } else if (isAuthenticated && !hasTenant && tenants.length === 1) {
      onSelect(tenants[0].id);
      close();
    }
  }, [isAuthenticated, tenants.length]);

  if (!tenants.length) return null;

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose?.();
        close();
      }}
      size='sm'
      trapFocus={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      title={t('system:tenant:interceptor.title')}
    >
      {tenants.map((tenant: Tenant) => (
        <TenantOption
          key={tenant.id}
          {...tenant}
          isSelected={tenant.id === tenant_id}
          onSelect={onSelect}
        />
      ))}
    </Modal>
  );
};
