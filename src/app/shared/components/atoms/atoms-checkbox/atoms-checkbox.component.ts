import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent } from '../../../abstracts';
import { uuid } from '../../../utils';

@Component({
  selector: 'atoms-checkbox',
  template: `
    <div class="field" [ngClass]="fieldClass">
      <label [for]="inputId" class="checkbox">
        <input type="checkbox" [id]="inputId" [(ngModel)]="value" />
        {{ inputLabel | translate }}
      </label>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomsCheckboxComponent),
      multi: true,
    },
  ],
})
export class AtomsCheckboxComponent extends AbstractNgModelComponent {
  @Input()
  inputLabel = '';

  @Input()
  inputId = uuid();

  @Input()
  fieldClass = '';
}
