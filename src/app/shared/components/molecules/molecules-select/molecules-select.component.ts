import { ChangeDetectionStrategy, Component, forwardRef, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { AbstractNgModelComponent } from '../../../abstracts';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'molecules-select',
  template: `
    <div class="form-group mb-0">
      <label class="label">{{ label | translate }} <span *ngIf="required" class="icon-required">*</span></label>
      <ng-select
        [(ngModel)]="value"
        [items]="items"
        [bindLabel]="bindLabel"
        [bindValue]="bindValue"
        [disabled]="disabled"
      >
        <ng-template ng-option-tmp let-item="item" *ngIf="optionTemplate">
          <ng-container *ngTemplateOutlet="optionTemplate; context: { item: item }"></ng-container>
        </ng-template>

        <ng-template ng-label-tmp let-item="item" *ngIf="labelTemplate">
          <ng-container *ngTemplateOutlet="labelTemplate; context: { item: item }"></ng-container>
        </ng-template>
      </ng-select>
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
      useExisting: forwardRef(() => MoleculesSelect),
      multi: true,
    },
  ],
})
export class MoleculesSelect extends AbstractNgModelComponent {
  @Input()
  items: any[];

  @Input()
  bindLabel: string;

  @Input()
  bindValue: string;

  @Input()
  label = '';

  @Input()
  required = false;

  @Input()
  invalidMessage = '';

  @Input()
  labelTemplate: TemplateRef<any>;

  @Input()
  optionTemplate: TemplateRef<any>;
}
