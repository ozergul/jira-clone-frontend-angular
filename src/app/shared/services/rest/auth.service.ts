import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, User } from '../../models';
import { Body, Get, Post, RestService } from 'ngx-rest-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RestService {
  @Post('/auth/login')
  login(@Body userLoginRequest: Auth.UserLoginRequest): Observable<Auth.LoginResponse> {
    return null;
  }

  @Post('/auth/register')
  register(@Body userRegisterRequest: Auth.UserRegisterRequest): Observable<User> {
    return null;
  }

  @Get('/auth/me')
  inquireMe(): Observable<User> {
    return null;
  }
}
