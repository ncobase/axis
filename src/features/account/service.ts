import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query';
import i18n from 'i18next';
import { FetchError } from 'ofetch';

import { Account, getCurrentUser } from '@/apis/account/account';
import {
  loginAccount,
  LoginProps,
  LoginReply,
  registerAccount,
  RegisterProps
} from '@/apis/account/auth';
import { getUserTenant, getUserTenants } from '@/apis/account/tenant';
import { useAuthContext } from '@/features/account/context';
import { Tenant, Tenants } from '@/features/system/tenant/schema';
import { paginateByCursor } from '@/helpers/pagination';

interface AccountKeys {
  all: () => readonly ['accountService'];
  login: () => readonly ['accountService', 'login'];
  register: () => readonly ['accountService', 'register'];
  account: () => readonly ['accountService', 'account'];
  tenants: (options?: AnyObject) => readonly ['accountService', 'tenants', AnyObject];
  tenant: (options?: { id?: string }) => readonly ['accountService', 'tenant', { id?: string }];
}

export const accountKeys: AccountKeys = {
  all: () => ['accountService'],
  login: () => [...accountKeys.all(), 'login'],
  register: () => [...accountKeys.all(), 'register'],
  account: () => [...accountKeys.all(), 'account'],
  tenants: ({ cursor, limit } = {}) => [...accountKeys.all(), 'tenants', { cursor, limit }],
  tenant: ({ id = '' } = {}) => [...accountKeys.all(), 'tenant', { id }]
};

const useMutationWithTokens = <TVariables>(
  request: MutationFunction<LoginReply, TVariables>,
  config?: Partial<UseMutationOptions<LoginReply, FetchError, TVariables>>
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
  config?: Partial<UseMutationOptions<LoginReply, FetchError, LoginProps>>
) => useMutationWithTokens(payload => loginAccount(payload), config);

export const useRegisterAccount = (
  config?: Partial<UseMutationOptions<LoginReply, FetchError, RegisterProps>>
) => useMutationWithTokens(payload => registerAccount(payload), config);

export const useAccount = (
  config: UseQueryOptions<
    Account,
    FetchError,
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
    (): Promise<Account> => getCurrentUser(),
    {
      onSuccess,
      ...config
    }
  );

  const isAdministered = true; // !!account?.authorities?.includes('ADMIN') || account?.administered;

  return { ...account, isAdministered, ...rest };
};

export const useUserTenants = (
  { cursor = '', limit = 20 } = {},
  config: UseQueryOptions<
    Tenants,
    FetchError,
    Tenants,
    InferQueryKey<typeof accountKeys.tenants>
  > = {}
) => {
  const result = useQuery(
    accountKeys.tenants({ cursor, limit }),
    (): Promise<Tenants> => getUserTenants({ cursor, limit }),
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

export const useUserTenant = (
  id?: string,
  config: UseQueryOptions<Tenant, FetchError, Tenant, InferQueryKey<typeof accountKeys.tenant>> = {}
) => {
  if (!id) {
    return { tenant: undefined };
  }

  const { data: tenant, ...rest } = useQuery(
    accountKeys.tenant({ id }),
    (): Promise<Tenant> => getUserTenant(id),
    { enabled: !!id, ...config }
  );

  return { tenant, ...rest };
};
