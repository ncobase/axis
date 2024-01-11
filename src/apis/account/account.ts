import { request } from '@/apis/request';
import { User, UserProfile } from '@/features/system/user/schema';

export interface Account {
  user: User;
  profile: UserProfile;
}

const ENDPOINT = '/account';

// current user
export const getCurrentUser = async (): Promise<Account> => {
  return request.get(`${ENDPOINT}`);
};
