import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { IPaginationMeta, Pagination, Project, ProjectsGet, ProjectState, UI } from '@fe/shared';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatTableDataSource } from '@angular/material/table';

@UntilDestroy()
@Component({
  selector: 'app-projects',
  template: `
    <molecules-breadcrumb [breadcrumbItems]="breadcrumbItems"> </molecules-breadcrumb>

    <templates-crud-wrapper>
      <ng-container header>
        <a class="btn btn-primary ml-auto" routerLink="/dashboard/projects/new">{{ 'New Project' | translate }}</a>
      </ng-container>

      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="code">
          <th mat-header-cell *matHeaderCellDef>{{ 'Code' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            <a [routerLink]="'/dashboard/projects/' + item.code">{{ item.code }}</a>
          </td>
        </ng-container>

        <ng-container matColumnDef="title">
          <th mat-header-cell *matHeaderCellDef>{{ 'Title' | translate }}</th>
          <td mat-cell *matCellDef="let item">
            {{ item.title }}

            <span *ngIf="item.isCompleted" class="badge badge-success ml-1">{{ 'Completed' | translate }}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="description">
          <th mat-header-cell *matHeaderCellDef>{{ 'Description' | translate }}</th>
          <td mat-cell *matCellDef="let item">{{ item.description }}</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator [length]="meta.totalItems" [pageSize]="5" [pageSizeOptions]="[3, 5, 10]"></mat-paginator>
    </templates-crud-wrapper>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @Select(ProjectState.getProjects)
  projects$: Observable<Pagination<Project>>;

  meta: IPaginationMeta;
  displayedColumns: string[] = ['code', 'title', 'description'];
  dataSource = new MatTableDataSource<Project>([]);

  breadcrumbItems: UI.BreadcrumbItem[] = [
    {
      title: 'Projects',
      routerLink: '/dashboard/projects',
    },
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    this.projects$.pipe(untilDestroyed(this)).subscribe((projects) => {
      this.meta = projects.meta;
      this.dataSource = new MatTableDataSource(projects.items);
    });
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        untilDestroyed(this),
        tap((pageInfo) =>
          this.store.dispatch(new ProjectsGet({ limit: pageInfo.pageSize, page: pageInfo.pageIndex + 1 })),
        ),
      )
      .subscribe();
  }
}
