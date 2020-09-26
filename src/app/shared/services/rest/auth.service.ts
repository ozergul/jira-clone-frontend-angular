import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUserDto, User } from '../../models';
import { Body, Get, Post, RestService } from 'ngx-rest-service';
import { RegisterUserDto } from '../../models/user/register-user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends RestService {
  @Post('/auth/login')
  login(@Body userLoginRequest: LoginUserDto): Observable<any> {
    return null;
  }

  @Post('/auth/register')
  register(@Body userRegisterRequest: RegisterUserDto): Observable<User> {
    return null;
  }

  @Get('/auth/me')
  inquireMe(): Observable<User> {
    return null;
  }
}
