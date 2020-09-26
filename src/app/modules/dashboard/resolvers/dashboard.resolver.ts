import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';
import { GetLoginHeader } from '@fe/shared';

@Injectable()
export class DashboardResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch(new GetLoginHeader()).pipe(mapTo(null));
  }
}
