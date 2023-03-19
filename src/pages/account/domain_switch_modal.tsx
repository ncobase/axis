import { Avatar, Box, Group, Modal, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useAccountDomains } from '@/pages/account/account.service';
import { useDomainContext } from '@/pages/system/domain/domain.context';
import { Domain } from '@/pages/system/domain/domain.types';
import { useTheme } from '@/themes';

type DomainSwitchModalProps = {
  openModal?: boolean;
  onClose?: () => void;
};

export const DomainSwitchModal = ({ openModal = false, onClose }: DomainSwitchModalProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [opened, { open, close }] = useDisclosure(false);
  const { hasDomain = false, domain_id, updateDomain } = useDomainContext();

  const navigate = useNavigate();

  const result = useAccountDomains();
  const domains = result?.domains || [];

  useEffect(() => {
    if ((openModal && domains.length > 1) || (!hasDomain && domains.length > 1)) {
      open();
    } else if ((openModal && domains.length === 1) || (!hasDomain && domains.length === 1)) {
      onSelect(domains[0].id);
      close();
    }
  }, [openModal, domains.length, hasDomain, opened]);

  const onSelect = useCallback(
    (selectedId: string) => {
      if (selectedId !== domain_id) {
        updateDomain(selectedId);
        navigate('/');
      }
      onClose?.();
      close();
    },
    [domain_id, navigate, onClose, updateDomain]
  );

  if (!domains.length) return null;

  return (
    <Modal
      opened={opened}
      onClose={() => {
        onClose?.();
        close();
      }}
      size='sm'
      withCloseButton={false}
      trapFocus={false}
      title={t('system:domain:interceptor.title')}
    >
      {domains.map(({ id, logo, name, slug }: Domain) => (
        <UnstyledButton
          key={id}
          py={8}
          px={3}
          sx={{
            display: 'block',
            width: '100%',
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
      ))}
    </Modal>
  );
};
