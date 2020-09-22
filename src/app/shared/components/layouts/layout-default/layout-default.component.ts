import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Project } from '../../../models';
import { AuthLogout, ProjectCreate, ProjectDelete, ProjectsGetForHeader, ProjectUpdate } from '../../../store/actions';
import { AuthState, ProjectState } from '../../../store/states';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-layout-default',
  template: `
    <ng-container
      *ngIf="{ isAuthenticated: isAuthenticated$ | async, projectsForHeader: projectsForHeader$ | async } as data"
    >
      <templates-header
        [projects]="data.projectsForHeader"
        [isAuthenticated]="data.isAuthenticated"
        (logoutClick)="logout()"
      ></templates-header>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
      <templates-footer></templates-footer>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDefaultComponent {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;

  @Select(ProjectState.getProjectsForHeader)
  projectsForHeader$: Observable<Project[]>;

  constructor(private store: Store, private actions$: Actions) {
    this.actions$
      .pipe(ofActionSuccessful(ProjectCreate, ProjectUpdate, ProjectDelete), untilDestroyed(this))
      .subscribe((_) => this.store.dispatch(new ProjectsGetForHeader()));
  }

  logout(): void {
    this.store.dispatch([new AuthLogout(), new Navigate(['/'])]);
  }
}
