import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/util';
import { AuthLogout } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private store: Store) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwtService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.handleAuthError();
          of(err);
        }
        throw err;
      }),
    );
  }

  private handleAuthError(): void {
    this.store.dispatch([new AuthLogout(), new Navigate(['/auth/login'])]);
  }
}
