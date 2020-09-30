import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Actions, ofActionSuccessful, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
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
import { LoginHeader } from '../../../models/ui';
import { LoaderHandler } from '../../../handlers';

@UntilDestroy()
@Component({
  selector: 'app-layout-default',
  template: `
    <ng-container
      *ngIf="{
        isAuthenticated: isAuthenticated$ | async,
        loginHeader: loginHeader$ | async,
        loader: loaderHandler.loader$ | async
      } as data"
    >
      <templates-header
        [projects]="data.loginHeader?.projects"
        [tasks]="data.loginHeader?.tasks"
        [isAuthenticated]="data.isAuthenticated"
        (logoutClick)="logout()"
      ></templates-header>
      <div class="container">
        <div *ngIf="data.loader" class="p-5 d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="sr-only"></span>
          </div>
        </div>

        <router-outlet *ngIf="!data.loader"></router-outlet>
      </div>
      <templates-footer></templates-footer>
    </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDefaultComponent implements AfterViewInit {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;

  @Select(UIState.loginHeader)
  loginHeader$: Observable<LoginHeader>;

  constructor(private store: Store, private actions$: Actions, public loaderHandler: LoaderHandler) {
    this.actions$
      .pipe(
        ofActionSuccessful(ProjectCreate, ProjectUpdate, ProjectDelete, TaskCreate, TaskUpdate),
        untilDestroyed(this),
      )
      .subscribe(_ => this.store.dispatch(new GetLoginHeader()));
  }

  ngAfterViewInit() {
    this.loaderHandler.addLoaded();
  }

  logout(): void {
    this.store.dispatch([new AuthLogout(), new Navigate(['/'])]);
  }
}
