import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngxs/store';
import { mapTo } from 'rxjs/operators';
import { GetCreateTaskConfig, TaskGet } from '@fe/shared';

@Injectable()
export class TaskResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve({ data: { isEdit }, params: { taskId } }: ActivatedRouteSnapshot) {
    const actions = [new GetCreateTaskConfig()];
    if (isEdit) {
      actions.push(new TaskGet(taskId));
    }
    return this.store.dispatch(actions).pipe(mapTo(null));
  }
}
