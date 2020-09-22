import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../../models';
import { AuthService, JwtService } from '../../services';
import { AuthInquireMe, AuthLogin, AuthLogout, AuthRegister } from '../actions';

export namespace AuthStateModel {
  export const NAME = 'AuthState';
  export interface State {
    currentUser: User;
    registeredUser: User;
  }
  export const DEFAULTS = {
    currentUser: {} as User,
    registeredUser: {} as User,
  } as State;
}

@State<AuthStateModel.State>({
  name: AuthStateModel.NAME,
  defaults: AuthStateModel.DEFAULTS,
})
@Injectable()
export class AuthState {
  @Selector()
  static getCurrentUser({ currentUser }: AuthStateModel.State): User {
    return currentUser;
  }

  @Selector()
  static getRegisteredUser({ registeredUser }: AuthStateModel.State): User {
    return registeredUser;
  }

  @Selector()
  static isAuthenticated({ currentUser }: AuthStateModel.State): boolean {
    return !!Object.keys(currentUser).length;
  }

  constructor(private authService: AuthService, private jwtService: JwtService) {}

  @Action(AuthLogin)
  authLogin(_: StateContext<AuthStateModel.State>, { payload }: AuthLogin) {
    return this.authService.login(payload).pipe(
      catchError((err) => {
        this.jwtService.destroyToken();
        return throwError(err);
      }),
      tap((response) => {
        if (response.access_token) {
          this.jwtService.saveToken(response.access_token);
        }
      }),
    );
  }

  @Action(AuthRegister)
  authRegister({ patchState }: StateContext<AuthStateModel.State>, { payload }: AuthRegister) {
    return this.authService.register(payload).pipe(tap((registeredUser) => patchState({ registeredUser })));
  }

  @Action(AuthInquireMe)
  authInquireMe({ patchState }: StateContext<AuthStateModel.State>) {
    return this.authService.inquireMe().pipe(tap((currentUser) => patchState({ currentUser })));
  }

  @Action(AuthLogout)
  authLogout({ patchState }: StateContext<AuthStateModel.State>) {
    this.jwtService.destroyToken();
    patchState({ currentUser: null });
  }
}
