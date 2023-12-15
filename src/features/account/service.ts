import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query';
import Axios, { AxiosError } from 'axios';
import i18n from 'i18next';

import { useAuthContext } from '@/features/account/context';
import { Account, LoginFormProps, LoginReply, RegisterFormProps } from '@/features/account/types';
import { Tenant, Tenants } from '@/features/system/tenant/types';
import { paginateByCursor } from '@/utils/pagination';

interface AccountKeys {
  all: () => readonly ['accountService'];
  login: () => readonly ['accountService', 'login'];
  register: () => readonly ['accountService', 'register'];
  account: () => readonly ['accountService', 'account'];
  tenants: (
    url: string,
    options?: { cursor?: string; limit?: number }
  ) => readonly ['accountService', 'tenants', string, { cursor?: string; limit?: number }];
  tenant: (options?: { id?: string }) => readonly ['accountService', 'tenant', { id?: string }];
}

export const accountKeys: AccountKeys = {
  all: () => ['accountService'],
  login: () => [...accountKeys.all(), 'login'],
  register: () => [...accountKeys.all(), 'register'],
  account: () => [...accountKeys.all(), 'account'],
  tenants: (url, { cursor, limit } = {}) => [
    ...accountKeys.all(),
    'tenants',
    url,
    { cursor, limit }
  ],
  tenant: ({ id = '' } = {}) => [...accountKeys.all(), 'tenant', { id }]
};

const useMutationWithTokens = <TVariables>(
  request: MutationFunction<LoginReply, TVariables>,
  config?: Partial<UseMutationOptions<LoginReply, AxiosError, TVariables>>
) => {
  const { updateTokens } = useAuthContext();

  return useMutation(request, {
    ...config,
    onSuccess: (data, ...rest) => {
      updateTokens(data?.access_token, data?.refresh_token);
      config?.onSuccess?.(data, ...rest);
    }
  });
};

export const useLogin = (
  config?: Partial<UseMutationOptions<LoginReply, AxiosError, LoginFormProps>>
) => useMutationWithTokens(payload => Axios.post('/login', payload), config);

export const useRegisterAccount = (
  config?: Partial<UseMutationOptions<LoginReply, AxiosError, RegisterFormProps>>
) => useMutationWithTokens(formValues => Axios.post('/register', formValues), config);

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
    config.onSuccess?.(data);
  };

  const { data: account, ...rest } = useQuery(
    accountKeys.account(),
    (): Promise<Account> => Axios.get('/account'),
    {
      onSuccess,
      ...config
    }
  );

  const isAdministered = true; // !!account?.authorities?.includes('ADMIN') || account?.administered;

  return { ...account, isAdministered, ...rest };
};

export const useAccountTenants = (
  { cursor = '', limit = 20 } = {},
  config: UseQueryOptions<
    Tenants,
    AxiosError,
    Tenants,
    InferQueryKey<typeof accountKeys.tenants>
  > = {},
  url = `/account/tenants?cursor=${cursor}&limit=${limit}`
) => {
  const result = useQuery(
    accountKeys.tenants(url, { cursor, limit }),
    (): Promise<Tenants> => Axios.get(url),
    config
  );

  const { content: tenants } = result.data || {};
  const { rs, hasNextPage, nextCursor } =
    (tenants && paginateByCursor(tenants, cursor, limit)) || ({} as any);

  return {
    tenants: rs,
    hasNextPage,
    nextCursor,
    ...result
  };
};

export const useAccountTenant = (
  id?: string,
  config: UseQueryOptions<Tenant, AxiosError, Tenant, InferQueryKey<typeof accountKeys.tenant>> = {}
) => {
  if (!id) {
    return { tenant: undefined };
  }

  const { data: tenant, ...rest } = useQuery(
    accountKeys.tenant({ id }),
    (): Promise<Tenant> => Axios.get(`/account/tenants/${id}`),
    { enabled: !!id, ...config }
  );

  return { tenant, ...rest };
};
