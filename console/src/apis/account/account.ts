import { Account } from '@tone/types';

import { request } from '@/apis/request';
const ENDPOINT = '/account';

// current user
export const getCurrentUser = async (): Promise<Account> => {
  return request.get(`${ENDPOINT}`);
};
