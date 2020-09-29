import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AuthState, User } from '@fe/shared';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  template: `
    <div *ngIf="{ currentUser: currentUser$ | async } as data" class="jumbotron">
      <h1 class="display-4">
        <ng-container *ngIf="data.currentUser">
          {{ 'Hello' | translate }} {{ data.currentUser.firstName }}
        </ng-container>

        <ng-container *ngIf="!data.currentUser">
          {{ ' Hello dev!' | translate }}
        </ng-container>
      </h1>
      <p class="lead">
        {{ 'This is a simple Jira Clone.' | translate }}
      </p>

      <br />
      {{ 'Built with' | translate }}
      <ul>
        <li>Angular</li>
        <li>NgXs</li>
        <li>Nest</li>
        <li>Typeorm</li>
      </ul>

      <ng-container *ngIf="!data.currentUser">
        <hr class="my-4" />
        <a class="btn btn-primary btn-lg" routerLink="/auth/login" role="button">{{ 'Login' | translate }}</a>

        <a class="btn btn- btn-lg ml-2" routerLink="/auth/register" role="button">{{ 'Register' | translate }}</a>
      </ng-container>

      <ng-container *ngIf="data.currentUser">
        <hr class="my-4" />
        <a class="btn btn-primary btn-lg" routerLink="/dashboard" role="button">{{ 'Dashboard' | translate }}</a>
      </ng-container>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  @Select(AuthState.getCurrentUser)
  currentUser$: Observable<User>;
}
