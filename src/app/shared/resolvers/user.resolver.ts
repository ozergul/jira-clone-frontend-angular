import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { JwtService } from '../services/util';
import { AuthInquireMe } from '../store/actions';

@Injectable()
export class UserResolver implements Resolve<null> {
  constructor(private store: Store, private jwtService: JwtService) {}

  resolve() {
    if (this.jwtService.getToken()) {
      return this.store.dispatch(new AuthInquireMe());
    } else {
      return of(null);
    }
  }
}
