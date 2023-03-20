import { Avatar, AvatarProps, Loader, UnstyledButton } from '@mantine/core';
import React from 'react';

import { getInitials } from '@/utils';

interface AvatarButtonProps extends AvatarProps {
  isLoading?: boolean;
  onClick?: () => void;
}

export const AvatarButton = React.forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ src, alt, isLoading, size = 'sm', ...rest }, ref) => {
    return (
      <UnstyledButton ref={ref}>
        <Avatar src={src} alt={alt} radius='xl' size={size} {...rest}>
          {isLoading ? <Loader size='xs' /> : getInitials(alt)}
        </Avatar>
      </UnstyledButton>
    );
  }
);
