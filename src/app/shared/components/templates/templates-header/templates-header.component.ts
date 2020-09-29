import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TrackByFunction,
  ViewEncapsulation,
} from '@angular/core';
import { Project, Task } from '../../../models';

@Component({
  selector: 'templates-header',
  template: `
    <nav
      class="navbar navbar-expand-lg navbar-dark mb-3"
      style="background-color: var(--primary-color) !important"
      (clickOutside)="closeMenus()"
    >
      <a class="navbar-brand" routerLink="/">JIRA</a>

      <button class="navbar-toggler" type="button" (click)="isMenuCollapsed = !isMenuCollapsed">
        &#9776;
      </button>

      <div [ngbCollapse]="isMenuCollapsed" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <ng-container *ngIf="!isAuthenticated">
            <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              <a class="nav-link" routerLink="/auth/login" (click)="isMenuCollapsed = true">{{
                'Login' | translate
              }}</a>
            </li>
            <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
              <a class="nav-link" routerLink="/auth/register" (click)="isMenuCollapsed = true">{{
                'Register' | translate
              }}</a>
            </li>
          </ng-container>
          <ng-container *ngIf="isAuthenticated">
            <li class="nav-item dropdown" [class.show]="dropdownOpened.projects" (click)="toggleDropdown('projects')">
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                routerLinkActive="active"
                [routerLinkActiveOptions]="{ exact: true }"
                [attr.aria-expanded]="dropdownOpened.projects"
              >
                {{ 'Projects' | translate }}
              </a>
              <div class="dropdown-menu" [class.show]="dropdownOpened.projects" aria-labelledby="navbarDropdown">
                <a
                  *ngFor="let project of projects; trackBy: trackByProjects"
                  class="dropdown-item"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  [routerLink]="'/dashboard/projects/' + project.code"
                  >{{ project.code }} - {{ project.title }}</a
                >
                <div *ngIf="projects?.length" class="dropdown-divider"></div>
                <a
                  class="dropdown-item"
                  routerLink="/dashboard/projects"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  >{{ 'View All' | translate }}</a
                >
              </div>
            </li>

            <li
              class="nav-item dropdown"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              [class.show]="dropdownOpened.tasks"
              (click)="toggleDropdown('tasks')"
            >
              <a
                class="nav-link dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                [attr.aria-expanded]="dropdownOpened.tasks"
              >
                {{ 'Tasks' | translate }}
              </a>
              <div class="dropdown-menu" [class.show]="dropdownOpened.tasks" aria-labelledby="navbarDropdown">
                <a
                  *ngFor="let task of tasks; trackBy: trackByTasks"
                  class="dropdown-item"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: true }"
                  [routerLink]="'/dashboard/tasks/' + task.taskId"
                  >{{ task.taskId }}</a
                >
                <div *ngIf="tasks?.length" class="dropdown-divider"></div>

                <a
                  class="dropdown-item"
                  routerLink="/dashboard/tasks/new"
                  [routerLinkActiveOptions]="{ exact: true }"
                  routerLinkActive="active"
                  >{{ 'Create Task' | translate }}</a
                >
                <a
                  class="dropdown-item"
                  routerLink="/dashboard/tasks"
                  [routerLinkActiveOptions]="{ exact: true }"
                  routerLinkActive="active"
                  >{{ 'View All' | translate }}</a
                >
              </div>
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

  @Input()
  tasks: Task[] = [];

  @Output()
  logoutClick = new EventEmitter<MouseEvent>();

  isMenuCollapsed = true;

  dropdownOpened = {
    projects: false,
    tasks: false,
  };

  trackByProjects: TrackByFunction<Project> = (_, item) => item.code;
  trackByTasks: TrackByFunction<Task> = (_, item) => item.id;

  toggleDropdown(key: string) {
    this.closeMenus();
    this.dropdownOpened[key] = !this.dropdownOpened[key];
  }

  closeMenus() {
    this.dropdownOpened = {
      projects: false,
      tasks: false,
    };
  }
}
