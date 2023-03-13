import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import i18n from 'i18next';

import { useAuthContext } from '@/pages/account/account.context';
import {
  Account,
  LoginFormProps,
  LoginReply,
  RegisterFormProps
} from '@/pages/account/account.types';

const accountKeys = {
  all: () => ['accountService'] as const,
  login: () => [...accountKeys.all(), 'login'] as const,
  register: () => [...accountKeys.all(), 'register'] as const,
  account: () => [...accountKeys.all(), 'account'] as const
};

export const useLogin = (
  config?: Partial<
    UseMutationOptions<LoginReply, AxiosError, Pick<LoginFormProps, keyof LoginFormProps>>
  >
) => {
  const { updateTokens } = useAuthContext();
  return useMutation(payload => axios.post('/login', payload), {
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
  return useMutation(formValues => axios.post('/register', formValues), {
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
  >(accountKeys.account(), () => axios.get('/account'), {
    onSuccess,
    ...config
  });

  // TODO: add useRole()
  const isAdministered = true; // !!account?.authorities?.includes('ADMIN') || account?.administered;

  return { ...account, isAdministered, ...rest };
};
