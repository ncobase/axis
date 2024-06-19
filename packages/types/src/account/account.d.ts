import { User, UserProfile } from '../system/user';

export interface Account {
  user: User;
  profile: UserProfile;
}
