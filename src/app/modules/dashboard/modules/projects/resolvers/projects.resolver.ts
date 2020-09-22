import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProjectsGet } from '@fe/shared';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';

@Injectable()
export class ProjectsResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve() {
    return this.store
      .dispatch(
        new ProjectsGet({
          page: 1,
          limit: 5,
        }),
      )
      .pipe(mapTo(null));
  }
}
