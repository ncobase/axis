import { Avatar, Loader, UnstyledButton, UnstyledButtonProps } from '@mantine/core';
import React from 'react';

import { getInitials } from '@/utils';

interface AvatarButtonProps extends UnstyledButtonProps {
  src?: string;
  alt?: string;
  isLoading?: boolean;
}

export const AvatarButton = React.forwardRef<HTMLButtonElement, AvatarButtonProps>(
  ({ src, alt, isLoading, ...rest }, ref) => {
    return (
      <UnstyledButton ref={ref} {...rest}>
        <Avatar src={src} alt={alt} radius='xl'>
          {isLoading ? <Loader size='xs' /> : getInitials(alt)}
        </Avatar>
      </UnstyledButton>
    );
  }
);
