import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { AuthState } from '../store/states';

@Injectable({
  providedIn: 'root',
})
export class AuthRoutePublicGuard implements CanActivate {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.redirectToHomePage$();
        } else {
          return of(true);
        }
      }),
    );
  }

  private redirectToHomePage$(): Observable<boolean> {
    return this.store.dispatch(new Navigate(['/dashboard'])).pipe(mapTo(false));
  }
}
