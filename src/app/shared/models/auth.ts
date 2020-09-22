import { User } from './user';

export namespace Auth {
  export interface UserLoginRequest {
    email: string;
    password: string;
  }

  export interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  export interface LoginResponse {
    access_token: string;
  }

  export interface InquireMeResponse {
    iat: number;
    exp: number;
    user: User;
  }
}
