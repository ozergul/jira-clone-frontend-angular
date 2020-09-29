import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UI } from '../../../models';
import {
  AuthLogout,
  GetLoginHeader,
  ProjectCreate,
  ProjectDelete,
  ProjectUpdate,
  TaskCreate,
  TaskUpdate,
} from '../../../store/actions';
import { AuthState, UIState } from '../../../store/states';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-layout-default',
  template: `
    <ng-container *ngIf="{ isAuthenticated: isAuthenticated$ | async, loginHeader: loginHeader$ | async } as data">
      <templates-header
        [projects]="data.loginHeader?.projects"
        [tasks]="data.loginHeader?.tasks"
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

  @Select(UIState.loginHeader)
  loginHeader$: Observable<UI.LoginHeader>;

  constructor(private store: Store, private actions$: Actions) {
    this.actions$
      .pipe(
        ofActionSuccessful(ProjectCreate, ProjectUpdate, ProjectDelete, TaskCreate, TaskUpdate),
        untilDestroyed(this),
      )
      .subscribe(_ => this.store.dispatch(new GetLoginHeader()));
  }

  logout(): void {
    this.store.dispatch([new AuthLogout(), new Navigate(['/'])]);
  }
}
