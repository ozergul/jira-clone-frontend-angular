import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProjectsGetForHeader } from '@fe/shared';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class DashboardResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch(new ProjectsGetForHeader()).pipe(mapTo(null));
  }
}
