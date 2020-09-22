import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProjectGet, ProjectState } from '@fe/shared';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';

@Injectable()
export class ProjectResolver implements Resolve<null> {
  constructor(private store: Store) {}

  resolve({ params }: ActivatedRouteSnapshot) {
    const { code } = params;
    return this.store.dispatch(new ProjectGet(code)).pipe(
      switchMap(() => this.store.selectOnce(ProjectState.getProject)),
      switchMap((project) => {
        if (project) {
          return of(null);
        } else {
          return this.store.dispatch(new Navigate(['/dashboard/projects'])).pipe(mapTo(null));
        }
      }),
    );
  }
}
