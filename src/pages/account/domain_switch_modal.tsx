import { Avatar, Box, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '@/pages/account/account.context';
import { useAccountDomains } from '@/pages/account/account.service';
import { useDomainContext } from '@/pages/system/domain/domain.context';
import { Domain } from '@/pages/system/domain/domain.types';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';
import { useTheme } from '@/themes';

interface DomainOptionProps extends Domain {
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const DomainOption = ({ id, logo, name, slug, isSelected, onSelect }: DomainOptionProps) => {
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

type DomainSwitchModalProps = {
  openModal?: boolean;
  onClose?: () => void;
};

export const DomainSwitchModal = ({ openModal = false, onClose }: DomainSwitchModalProps) => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const { isAuthenticated } = useAuthContext();
  const { hasDomain, domain_id, updateDomain } = useDomainContext();
  const redirect = useRedirectFromUrl();

  const result = useAccountDomains();
  const domains = result?.domains || [];

  useEffect(() => {
    if (openModal) {
      open();
    }
  }, [openModal, open]);

  const onSelect = useCallback(
    (id: string) => {
      if (id !== domain_id) {
        updateDomain(id);
        redirect();
      }
      onClose?.();
      close();
    },
    [domain_id, redirect, onClose, updateDomain, close]
  );

  useEffect(() => {
    if (isAuthenticated && !hasDomain && domains.length > 1) {
      open();
    } else if (isAuthenticated && !hasDomain && domains.length === 1) {
      onSelect(domains[0].id);
      close();
    }
  }, [isAuthenticated, domains.length]);

  if (!domains.length) return null;

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
      title={t('system:domain:interceptor.title')}
    >
      {domains.map((domain: Domain) => (
        <DomainOption
          key={domain.id}
          {...domain}
          isSelected={domain.id === domain_id}
          onSelect={onSelect}
        />
      ))}
    </Modal>
  );
};
