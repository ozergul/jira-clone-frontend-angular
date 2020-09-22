import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AuthState } from '@fe/shared';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Navigate } from '@ngxs/router-plugin';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="jumbotron">
      <h1 class="display-4">Hello dev!</h1>
      <p class="lead">
        This is a simple Jira Clone, coded with Angular, NgXs, Nest, TypeOrm.
      </p>
      <hr class="my-4" />
      <a class="btn btn-primary btn-lg" routerLink="/auth/login" role="button">Login</a>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store) {
    this.isAuthenticated$.pipe(filter(Boolean)).subscribe(_ => this.store.dispatch(new Navigate(['/dashboard'])));
  }
}
