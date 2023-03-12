import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

interface AuthContextValue {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
  updateTokens(tokens: { accessToken?: string; refreshToken?: string }): void;
}

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  updateTokens: () => {}
} as const);

export const AuthProvider: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    (isBrowser && locals.get(ACCESS_TOKEN_KEY)) ?? undefined
  );
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    (isBrowser && locals.get(REFRESH_TOKEN_KEY)) ?? undefined
  );

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      return;
    }

    locals.set(ACCESS_TOKEN_KEY, accessToken);
    locals.set(REFRESH_TOKEN_KEY, refreshToken);
  }, [accessToken, refreshToken]);

  const updateTokens = ({
    accessToken,
    refreshToken
  }: {
    accessToken?: string;
    refreshToken?: string;
  }) => {
    if (!isBrowser) {
      return;
    }

    if (accessToken) {
      setAccessToken(accessToken);
    }

    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!accessToken, accessToken, refreshToken, updateTokens }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
