export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  terms: boolean;
}

export interface LoginForm {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginReply {
  access_token: string;
  refresh_token: string;
}

export interface ForgetPasswordForm {
  username_or_email: string;
}
