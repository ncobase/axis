import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import Axios from 'axios';

import { useAuthContext } from '@/pages/account/account.context';
import { LoginForm, LoginReply } from '@/pages/account/account.types';

export const useLogin = (
  config?: Partial<UseMutationOptions<LoginReply, unknown, Pick<LoginForm, keyof LoginForm>>>
) => {
  const { updateTokens } = useAuthContext();
  return useMutation(payload => Axios.post('/login', payload), {
    ...config,
    onSuccess: (data, ...rest) => {
      updateTokens({
        accessToken: data?.access_token,
        refreshToken: data?.refresh_token
      });
      config?.onSuccess?.(data, ...rest);
    }
  });
};
