import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
import { JwtService } from '../services/util';
import { AuthInquireMe } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router, private jwtService: JwtService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.jwtService.getToken()) {
      return this.store.dispatch(new AuthInquireMe()).pipe(
        take(1),
        catchError(() => this.redirectToLogin$()),
        mapTo(true),
      );
    }

    return of(false);
  }

  private redirectToLogin$(): Observable<boolean> {
    const returnUrl = this.router.url;
    return this.store.dispatch(new Navigate(['/auth/login', { returnUrl }])).pipe(mapTo(false));
  }
}
