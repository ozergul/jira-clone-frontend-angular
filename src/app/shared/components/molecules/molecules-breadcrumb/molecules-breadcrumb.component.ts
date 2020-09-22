import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { UI } from '@fe/shared';

@Component({
  selector: 'molecules-breadcrumb',
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a routerLink="/dashboard">{{ 'Home' | translate }}</a>
        </li>
        <li
          *ngFor="let item of breadcrumbItems; let last = last"
          class="breadcrumb-item active"
          aria-current="page"
          routerLinkActive
        >
          <ng-container *ngIf="last">
            {{ item.title | translate }}
          </ng-container>
          <ng-container *ngIf="!last">
            <a [routerLink]="item.routerLink">{{ item.title | translate }}</a>
          </ng-container>
        </li>
      </ol>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoleculesBreadcrumbComponent {
  @Input()
  breadcrumbItems: UI.BreadcrumbItem[] = [];
}
