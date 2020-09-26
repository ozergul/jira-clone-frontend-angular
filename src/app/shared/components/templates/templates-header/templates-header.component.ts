import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
  ViewEncapsulation,
} from '@angular/core';
import { Project } from '../../../models';

@Component({
  selector: 'templates-header',
  template: `
    <nav
      class="navbar navbar-expand-lg navbar-dark mb-3"
      style="background-color: var(--primary-color) !important"
      (clickOutside)="dropdownOpened = false"
    >
      <a class="navbar-brand" routerLink="/">JIRA</a>

      <button class="navbar-toggler" type="button" (click)="isMenuCollapsed = !isMenuCollapsed">
        &#9776;
      </button>

      <div [ngbCollapse]="isMenuCollapsed" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <ng-container *ngIf="!isAuthenticated">
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" routerLink="/auth/login" (click)="isMenuCollapsed = true">{{
                'Login' | translate
              }}</a>
            </li>
            <li class="nav-item" routerLinkActive="active">
              <a class="nav-link" routerLink="/auth/register" (click)="isMenuCollapsed = true">{{
                'Register' | translate
              }}</a>
            </li>
          </ng-container>
          <ng-container *ngIf="isAuthenticated">
            <li class="nav-item dropdown" [class.show]="dropdownOpened" (click)="dropdownOpened = !dropdownOpened">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                [attr.aria-expanded]="dropdownOpened"
              >
                {{ 'Projects' | translate }}
              </a>
              <div class="dropdown-menu" [class.show]="dropdownOpened" aria-labelledby="navbarDropdown">
                <a
                  *ngFor="let project of projects; trackBy: trackByProjects"
                  class="dropdown-item"
                  [routerLink]="'/dashboard/projects/' + project.code"
                  >{{ project.code }} - {{ project.title }}</a
                >
                <div *ngIf="projects?.length" class="dropdown-divider"></div>
                <a class="dropdown-item" routerLink="/dashboard/projects" routerLinkActive>{{
                  'View All' | translate
                }}</a>
              </div>
            </li>

            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard/tasks" routerLinkActive>{{ 'Tasks' | translate }}</a>
            </li>

            <li class="nav-item">
              <a class="nav-link" (click)="isMenuCollapsed = true; logoutClick.emit()">{{ 'Logout' | translate }}</a>
            </li>
          </ng-container>
        </ul>
      </div>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesHeaderComponent {
  @Input()
  isAuthenticated: boolean;

  @Input()
  projects: Project[] = [];

  @Output()
  logoutClick = new EventEmitter<MouseEvent>();

  isMenuCollapsed = true;

  dropdownOpened = false;

  trackByProjects: TrackByFunction<Project> = (_, item) => item.code;
}
