import React from 'react';

import { Avatar, AvatarProps, Loader, UnstyledButton } from '@mantine/core';

import { getInitials } from '@/helpers/common';

interface AvatarButtonProps extends AvatarProps {
  isLoading?: boolean;
  onClick?: () => void;
  title?: string;
}

export const AvatarButton = React.forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ isLoading, ...rest }, ref) => {
    return (
      <UnstyledButton ref={ref}>
        <Avatar radius='xl' size='sm' {...rest}>
          {isLoading ? <Loader size='sm' /> : getInitials(rest.title || rest.alt)}
        </Avatar>
      </UnstyledButton>
    );
  }
);
