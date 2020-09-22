import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'templates-crud-wrapper',
  template: `
    <div class="row">
      <div class="col-12 d-flex justify-content-end">
        <ng-content select="[header]"></ng-content>
      </div>

      <div class="col-12">
        <ng-content></ng-content>
      </div>

      <div class="col-12 d-flex justify-content-end">
        <ng-content select="[footer]"></ng-content>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesCrudWrapper {}
