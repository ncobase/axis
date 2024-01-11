import { request } from '@/apis/request';

export interface RegisterProps {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms: boolean;
}

export interface LoginProps {
  username: string;
  password: string;
  remember: boolean;
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

const ENDPOINT = '';

// login
export const loginAccount = async (payload: LoginProps): Promise<LoginReply> => {
  return request.post(`${ENDPOINT}/login`, { ...payload });
};

// register
export const registerAccount = async (payload: RegisterProps): Promise<LoginReply> => {
  return request.post(`${ENDPOINT}/register`, { ...payload });
};

// logout
export const logoutAccount = async (): Promise<void> => {
  return request.post(`${ENDPOINT}/logout`);
};
