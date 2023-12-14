import { BoxProps } from '@mantine/core';

export interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms: boolean;
}

export interface LoginFormProps extends BoxProps {
  username: string;
  password: string;
  remember: boolean;
  onSuccess?: () => void;
}

export interface LoginReply {
  user: string;
  access_token?: string;
  refresh_token?: string;
  register_token?: string;
}

export interface ForgetPasswordFormProps {
  username_or_email: string;
}

export interface AccountBasic {
  id: string;
  username: string;
  email: string;
  phone: string;
  status: number;
  created_by?: string;
  created_at?: string;
  updated_by?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  certified: boolean;
  language: string;
  display_name?: string;
  short_bio?: string;
  about?: string;
  thumbnail?: string;
  links?: object[];
  extra?: object;
}

export interface Account {
  user: AccountBasic;
  profile?: UserProfile;
}
