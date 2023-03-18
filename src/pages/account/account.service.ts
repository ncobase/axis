import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';
import i18n from 'i18next';

import { useAuthContext } from '@/pages/account/account.context';
import {
  Account,
  LoginFormProps,
  LoginReply,
  RegisterFormProps
} from '@/pages/account/account.types';
import { Domain, Domains } from '@/pages/system/domain/domain.types';
import { paginateByCursor } from '@/utils/pagination';

interface AccountKeys {
  all: () => readonly ['accountService'];
  login: () => readonly ['accountService', 'login'];
  register: () => readonly ['accountService', 'register'];
  account: () => readonly ['accountService', 'account'];
  domains: (
    url: string,
    options?: { cursor?: string; limit?: number }
  ) => readonly ['accountService', 'domains', string, { cursor?: string; limit?: number }];
  domain: (options?: { id?: string }) => readonly ['accountService', 'domain', { id?: string }];
}

export const accountKeys: AccountKeys = {
  all: () => ['accountService'],
  login: () => [...accountKeys.all(), 'login'],
  register: () => [...accountKeys.all(), 'register'],
  account: () => [...accountKeys.all(), 'account'],
  domains: (url, { cursor, limit } = {}) => [
    ...accountKeys.all(),
    'domains',
    url,
    { cursor, limit }
  ],
  domain: ({ id = '' } = {}) => [...accountKeys.all(), 'domain', { id }]
};

export const useLogin = (
  config?: Partial<
    UseMutationOptions<LoginReply, AxiosError, Pick<LoginFormProps, keyof LoginFormProps>>
  >
) => {
  const { updateTokens } = useAuthContext();
  return useMutation(payload => Axios.post('/login', payload), {
    ...config,
    onSuccess: (data, ...rest) => {
      updateTokens(data?.access_token, data?.refresh_token);
      config?.onSuccess?.(data, ...rest);
    }
  });
};

export const useRegisterAccount = (
  config?: Partial<
    UseMutationOptions<LoginReply, AxiosError, Pick<RegisterFormProps, keyof RegisterFormProps>>
  >
) => {
  const { updateTokens } = useAuthContext();
  return useMutation(formValues => Axios.post('/register', formValues), {
    ...config,
    onSuccess: (data, ...rest) => {
      updateTokens(data?.access_token, data?.refresh_token);
      config?.onSuccess?.(data, ...rest);
    }
  });
};

export const useAccount = (
  config: UseQueryOptions<
    Account,
    AxiosError,
    Account,
    InferQueryKey<typeof accountKeys.account>
  > = {}
) => {
  const onSuccess = (data: Account) => {
    i18n.changeLanguage(data.profile?.language);
    if (config.onSuccess) config.onSuccess(data);
  };

  const { data: account, ...rest } = useQuery<
    Account,
    AxiosError,
    Account,
    InferQueryKey<typeof accountKeys.account>
  >(accountKeys.account(), () => Axios.get('/account'), {
    onSuccess,
    ...config
  });

  // TODO: add useRole()
  const isAdministered = true; // !!account?.authorities?.includes('ADMIN') || account?.administered;

  return { ...account, isAdministered, ...rest };
};

export const useAccountDomains = (
  { cursor = '', limit = 20 } = {},
  config: UseQueryOptions<
    Domains,
    AxiosError,
    Domains,
    InferQueryKey<typeof accountKeys.domains>
  > = {},
  url = `/account/domains?cursor=${cursor}&limit=${limit}`
) => {
  const result = useQuery(accountKeys.domains(url), (): Promise<Domains> => Axios.get(url), {
    ...config
  });

  const { content: domains } = result.data || {};
  const { rs, hasNextPage, nextCursor } =
    (domains && paginateByCursor(domains, cursor, limit)) || ({} as any);

  return {
    domains: rs,
    hasNextPage,
    nextCursor,
    ...result
  };
};

export const useAccountDomain = (
  id?: string,
  config: UseQueryOptions<Domain, AxiosError, Domain, InferQueryKey<typeof accountKeys.domain>> = {}
) => {
  if (!id) {
    return {
      domain: undefined
    };
  }

  const { data: domain, ...rest } = useQuery(
    accountKeys.domain({ id }),
    (): Promise<Domain> => Axios.get(`/account/domains/${id}`),
    {
      enabled: !!id,
      ...config
    }
  );
  return {
    domain,
    ...rest
  };
};
