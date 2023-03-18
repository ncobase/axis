import { Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AvatarButton } from '@/components/avatar/avatar_button';
import { useAccountDomains } from '@/pages/account/account.service';
import { useDomainContext } from '@/pages/system/domain/domain.context';
import { Domain } from '@/pages/system/domain/domain.types';

type DomainSwitchModalProps = {
  openModal?: boolean;
  onClose?: () => void;
};

export const DomainSwitchModal = ({ openModal = false, onClose }: DomainSwitchModalProps) => {
  const { t } = useTranslation();
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
      withCloseButton={false}
      trapFocus={false}
      title={t('system:domain:interceptor.title')}
    >
      <Group position='center' my='xl'>
        {domains.map(({ id, logo, name }: Domain) => (
          <AvatarButton
            key={id}
            src={logo}
            alt={name}
            onClick={() => onSelect(id)}
            mx={10}
            size={56}
          />
        ))}
      </Group>
    </Modal>
  );
};
