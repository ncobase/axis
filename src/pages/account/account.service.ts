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
import { Tenant, Tenants } from '@/pages/system/tenant/tenant.types';
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
  const result = useQuery(accountKeys.tenants(url), (): Promise<Tenants> => Axios.get(url), {
    ...config
  });

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
    return {
      tenant: undefined
    };
  }

  const { data: tenant, ...rest } = useQuery(
    accountKeys.tenant({ id }),
    (): Promise<Tenant> => Axios.get(`/account/tenants/${id}`),
    {
      enabled: !!id,
      ...config
    }
  );
  return {
    tenant,
    ...rest
  };
};
