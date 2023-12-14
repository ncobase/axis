import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/pages/account/context';

export const Logout = () => {
  const { updateTokens } = useAuthContext();
  const navigate = useNavigate();
  const queryCache = useQueryClient();

  useEffect(() => {
    updateTokens();
    queryCache.clear();
    navigate('/login');
  }, [updateTokens, queryCache]);

  return <></>;
};
