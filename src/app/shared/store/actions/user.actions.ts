import { Auth } from '../../models';

export class AuthLogin {
  static readonly type = '[AuthLogin] Auth Login';
  constructor(public readonly payload: Auth.UserLoginRequest) {}
}

export class AuthRegister {
  static readonly type = '[AuthRegister] Auth Login';
  constructor(public readonly payload: Auth.UserRegisterRequest) {}
}

export class AuthInquireMe {
  static readonly type = '[AuthInquireMe] Auth Inquire Me';
}

export class AuthLogout {
  static readonly type = '[AuthLogout] Auth Logout';
}
