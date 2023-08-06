import { Avatar, AvatarProps, Loader, UnstyledButton } from '@mantine/core';
import React from 'react';

import { getInitials } from '@/utils';

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
          {isLoading ? <Loader size='xs' /> : getInitials(rest.title || rest.alt)}
        </Avatar>
      </UnstyledButton>
    );
  }
);
