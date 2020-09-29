import { ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractNgModelComponent } from '../../../abstracts';
import { uuid } from '../../../utils';
import { TextMaskConfig } from 'angular2-text-mask/src/angular2TextMask';

@Component({
  selector: 'atoms-input',
  template: `
    <div class="form-group" [ngClass]="fieldClass">
      <label *ngIf="inputLabel" [for]="inputId" class="label"
        >{{ inputLabel | translate }}
        <span *ngIf="required" class="icon-required">*</span>
      </label>

      <div class="input-group flex-nowrap">
        <div class="input-group-prepend" *ngIf="iconName">
          <span class="input-group-text" id="addon-wrapping"><fa-icon [icon]="iconName"></fa-icon></span>
        </div>
        <input
          class="form-control"
          [class.is-invalid]="invalidMessage"
          [type]="inputType"
          [placeholder]="inputPlaceholder | translate"
          [required]="required"
          [id]="inputId"
          [(ngModel)]="value"
          [disabled]="disabled"
          [attr.aria-required]="required"
          [textMask]="_textMask"
        />
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
      useExisting: forwardRef(() => AtomsInputComponent),
      multi: true,
    },
  ],
})
export class AtomsInputComponent extends AbstractNgModelComponent {
  @Input()
  inputType: 'text' | 'password' | 'email' = 'text';

  @Input()
  inputPlaceholder = '';

  @Input()
  inputLabel = '';

  @Input()
  iconName = '';

  @Input()
  inputId = uuid();

  @Input()
  fieldClass = '';

  @Input()
  disabled = false;

  @Input()
  required = false;

  @Input()
  invalidMessage = '';

  _textMask: TextMaskConfig = {
    mask: false,
  };
  @Input()
  set textMask(val: TextMaskConfig) {
    this._textMask = val;
  }
}
