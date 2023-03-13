import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { useAuthContext } from '@/pages/account/account.context';
import { useRedirectFromUrl } from '@/router/use_redirect_from_url';

export const Logout = () => {
  const { updateTokens } = useAuthContext();
  const redirect = useRedirectFromUrl();
  const queryCache = useQueryClient();

  useEffect(() => {
    updateTokens();
    queryCache.clear();
    redirect();
  }, [updateTokens, queryCache]);

  return <></>;
};
