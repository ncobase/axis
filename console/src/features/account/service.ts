import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query';
import {
  Account,
  AnyObject,
  InferQueryKey,
  LoginProps,
  LoginReply,
  RegisterProps,
  Tenant,
  Tenants
} from '@tone/types';
import i18n from 'i18next';
import { FetchError } from 'ofetch';

import { useAuthContext } from '@/features/account/context';
import { paginateByCursor } from '@/helpers/pagination';
import { getCurrentUser } from '@/services/account/account';
import { loginAccount, registerAccount } from '@/services/account/authorize';
import { getUserTenant, getUserTenants } from '@/services/account/tenant';

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
  tenants: (queryKey = {}) => [...accountKeys.all(), 'tenants', queryKey],
  tenant: ({ id } = {}) => [...accountKeys.all(), 'tenant', { id }]
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
  queryKey: AnyObject = {},
  config: UseQueryOptions<
    Tenants,
    FetchError,
    Tenants,
    InferQueryKey<typeof accountKeys.tenants>
  > = {}
) => {
  const result = useQuery(
    accountKeys.tenants(queryKey),
    (): Promise<Tenants> => getUserTenants(queryKey),
    config
  );

  const { content: tenants = [] } = result.data || {};
  const { cursor, limit } = queryKey;

  const { rs, hasNextPage, nextCursor } =
    (tenants && paginateByCursor(tenants, cursor as string, limit as number)) || ({} as any);

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
