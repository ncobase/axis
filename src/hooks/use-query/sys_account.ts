import { useQuery } from '@tanstack/react-query';

import { request } from '@/helpers/request';

export const useLogin = () => {
  return useQuery(['login'], async () => {
    const response = await request.get('/login');
    return response.data;
  });
};
