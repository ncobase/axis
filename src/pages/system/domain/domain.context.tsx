import React, { useCallback, useContext, useMemo, useState } from 'react';

import { locals } from '@/utils/locals';
import { isBrowser } from '@/utils/ssr';

interface DomainContextValue {
  domain_id?: string;
  hasDomain: boolean;
  updateDomain(id?: string | null): void;
}

export const DOMAIN_KEY = 'curdom';

const DomainContext = React.createContext<DomainContextValue>({
  domain_id: '',
  hasDomain: false,
  updateDomain: () => undefined
});

const updateDomain = (id?: string | null) => {
  if (!isBrowser) return;
  id ? locals.set(DOMAIN_KEY, id) : locals.remove(DOMAIN_KEY);
};

export const DomainProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [domain, setDomain] = useState<string | undefined>(
    (isBrowser && locals.get(DOMAIN_KEY)) ?? undefined
  );

  const handleUpdateDomain = useCallback(
    (id: string) => {
      setDomain(id);
      updateDomain(id);
    },
    [setDomain]
  );

  const value = useMemo(
    () => ({
      domain_id: domain,
      hasDomain: !!domain,
      updateDomain: handleUpdateDomain
    }),
    [domain, handleUpdateDomain]
  );

  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
};

export const useDomainContext = (): DomainContextValue => useContext(DomainContext);
