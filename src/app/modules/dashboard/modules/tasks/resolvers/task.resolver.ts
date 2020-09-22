import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';
import { GetCreateTaskConfig } from '@fe/shared';

@Injectable()
export class TaskResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch(new GetCreateTaskConfig()).pipe(mapTo(null));
  }
}
