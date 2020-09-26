import { RegisterUserDto, LoginUserDto } from '../../models';

export class AuthLogin {
  static readonly type = '[AuthLogin] Auth Login';
  constructor(public readonly payload: LoginUserDto) {}
}

export class AuthRegister {
  static readonly type = '[AuthRegister] Auth Register';
  constructor(public readonly payload: RegisterUserDto) {}
}

export class AuthInquireMe {
  static readonly type = '[AuthInquireMe] Auth Inquire Me';
}

export class AuthLogout {
  static readonly type = '[AuthLogout] Auth Logout';
}
