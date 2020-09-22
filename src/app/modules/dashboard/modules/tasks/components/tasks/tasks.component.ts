import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UI } from '@fe/shared';
import { Store } from '@ngxs/store';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-tasks',
  template: `
    <molecules-breadcrumb [breadcrumbItems]="breadcrumbItems"> </molecules-breadcrumb>

    <templates-crud-wrapper>
      <ng-container header>
        <a class="btn btn-primary ml-auto" routerLink="/dashboard/tasks/new">{{ 'New Task' | translate }}</a>
      </ng-container>
    </templates-crud-wrapper>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  breadcrumbItems: UI.BreadcrumbItem[] = [
    {
      title: 'Tasks',
      routerLink: '/dashboard/tasks',
    },
  ];

  constructor(private store: Store) {}
}
