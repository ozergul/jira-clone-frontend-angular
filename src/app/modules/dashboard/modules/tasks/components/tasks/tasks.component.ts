import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BreadcrumbItem, IPaginationMeta, LovType, Pagination, State, Task, TasksGet, TaskState } from '@fe/shared';
import { Select, Store } from '@ngxs/store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { format } from 'date-fns';

@UntilDestroy()
@Component({
  selector: 'app-tasks',
  template: `
    <molecules-breadcrumb [breadcrumbItems]="breadcrumbItems"> </molecules-breadcrumb>

    <templates-crud-wrapper>
      <ng-container header>
        <a class="btn btn-primary ml-auto" routerLink="/dashboard/tasks/new">{{ 'New Task' | translate }}</a>
      </ng-container>

      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="taskId">
          <th mat-header-cell *matHeaderCellDef>{{ 'ID' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            <a [routerLink]="'/dashboard/tasks/' + item.taskId">
              <atoms-task-icon [lovType]="LovType.TASK_TYPE" [lov]="item.type"></atoms-task-icon>
              {{ item.taskId }}
            </a>
          </td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>{{ 'Title' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            {{ item.title }}
          </td>
        </ng-container>

        <ng-container matColumnDef="createdAt">
          <th mat-header-cell *matHeaderCellDef>{{ 'Created At' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            <ng-container *ngIf="item.createdAt">{{ item.createdAt | memoize: formatDate }}</ng-container>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator [length]="meta.totalItems" [pageSize]="10" [pageSizeOptions]="[10, 20]"></mat-paginator>
    </templates-crud-wrapper>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit, AfterViewInit {
  @Select(TaskState.getTasks)
  tasks$: Observable<Pagination<Task>>;

  meta: IPaginationMeta;
  displayedColumns: string[] = ['taskId', 'title', 'createdAt'];
  dataSource = new MatTableDataSource<Task>([]);

  breadcrumbItems: BreadcrumbItem[] = [
    {
      title: 'Tasks',
      routerLink: '/dashboard/tasks',
    },
  ];

  state = State.ASSIGNED;
  LovType = LovType;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.tasks$.pipe(untilDestroyed(this)).subscribe(tasks => {
      this.meta = tasks.meta;
      this.dataSource = new MatTableDataSource(tasks.items);
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        untilDestroyed(this),
        tap(pageInfo =>
          this.store.dispatch(new TasksGet({ limit: pageInfo.pageSize, page: pageInfo.pageIndex + 1 }, this.state)),
        ),
      )
      .subscribe();
  }

  formatDate(date: Date) {
    if (!date) return;
    return format(new Date(date), 'yyyy-MM-dd HH:mm');
  }
}
