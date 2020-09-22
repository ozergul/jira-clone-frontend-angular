import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent } from '../../../abstracts';
import { uuid } from '../../../utils';

@Component({
  selector: 'atoms-textarea',
  template: `
    <div class="form-group" [ngClass]="fieldClass">
      <label *ngIf="inputLabel" [for]="inputId" class="label">{{ inputLabel | translate }}         <span *ngIf="required" class="icon-required">*</span></label>

      <div class="input-group flex-nowrap">
        <div class="input-group-prepend" *ngIf="iconName">
          <span class="input-group-text" id="addon-wrapping"><fa-icon [icon]="iconName"></fa-icon></span>
        </div>
        <textarea
          class="form-control"
          [placeholder]="inputPlaceholder | translate"
          [required]="required"
          [id]="inputId"
          [(ngModel)]="value"
          [disabled]="disabled"
          [class.is-invalid]="invalidMessage"
        ></textarea>
      </div>

      <div *ngIf="invalidMessage" class="invalid-feedback" [style.display]="invalidMessage ? 'block' : 'none'">
        {{ invalidMessage | translate }}
      </div>

    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AtomsTextareaComponent),
      multi: true,
    },
  ],
})
export class AtomsTextareaComponent extends AbstractNgModelComponent {
  @Input()
  inputType: 'text' | 'password' | 'email' = 'text';

  @Input()
  inputPlaceholder = '';

  @Input()
  inputLabel = '';

  @Input()
  required = false;

  @Input()
  iconName = '';

  @Input()
  inputId = uuid();

  @Input()
  fieldClass = '';

  @Input()
  disabled = false;

  @Input()
  invalidMessage = '';
}
