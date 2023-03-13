import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

interface AuthContextValue {
  isAuthenticated: boolean;
  accessToken?: string;
  refreshToken?: string;
  updateTokens(accessToken?: string, refreshToken?: string): void;
}

export const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

const AuthContext = React.createContext<AuthContextValue>({
  isAuthenticated: false,
  updateTokens: () => {}
} as const);

const updateTokens = (accessToken?: string, refreshToken?: string) => {
  if (!isBrowser) {
    return () => undefined;
  }
  if (!accessToken) {
    locals.remove(ACCESS_TOKEN_KEY);
  } else {
    locals.set(ACCESS_TOKEN_KEY, accessToken);
  }
  if (!refreshToken) {
    locals.remove(REFRESH_TOKEN_KEY);
  } else {
    locals.set(REFRESH_TOKEN_KEY, refreshToken);
  }
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

  const handleTokens = useCallback(
    (accessToken?: string, refureshToken?: string) => {
      setAccessToken(accessToken);
      setRefreshToken(refureshToken);
      updateTokens(accessToken, refreshToken);
    },
    [setAccessToken, setRefreshToken]
  );

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!accessToken,
        accessToken,
        refreshToken,
        updateTokens: handleTokens
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
