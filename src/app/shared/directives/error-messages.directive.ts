import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { timer } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[errorMessages]',
})
export class ErrorMessagesDirective implements AfterViewInit, OnDestroy, OnChanges {
  @Input()
  errorMessages?: { [prop: string]: string };

  @Input()
  isDirtyRequired = false;

  @Input()
  xcExternalMessages?: { [prop: string]: string };

  /**
   * @description Bind errors immediately
   */
  @Input()
  checkErrorsAfterInitialize = false;

  defaultErrorMessages = {
    required: 'errors.required',
  };

  control: AbstractControl;

  constructor(private injector: Injector, private cdRef: ChangeDetectorRef, private translate: TranslateService) {}

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    this.control = ngControl.control;

    timer(0).subscribe(() => {
      const originalFn = ngControl.control.updateValueAndValidity;
      const self = this;
      ngControl.control.updateValueAndValidity = function (opts?) {
        originalFn.apply(this, arguments);
        self.checkRequiredError();
        self.checkExternalMessages();
      };

      ngControl.control.statusChanges.pipe(untilDestroyed(this)).subscribe(() => {
        this.checkRequiredError();
        this.checkExternalMessages();
      });

      if (this.checkErrorsAfterInitialize && this.control.invalid && this.control.errors) {
        this.checkRequiredError();
        this.checkExternalMessages();
      }
    });
  }

  getErrorKeys() {
    return this.control?.errors ? Object.keys(this.control.errors) : [];
  }

  checkRequiredError() {
    const errorKeys = this.getErrorKeys();

    if (this.isDirtyRequired && !this.control.dirty) return [];

    if (errorKeys.length) {
      const config = { ...this.defaultErrorMessages, ...this.errorMessages };
      if (config[errorKeys[0]]) {
        this.cdRef['context'].invalidMessage = this.translate.instant(config[errorKeys[0]]);
      }
    } else {
      this.cdRef['context'].invalidMessage = '';
    }
    this.cdRef.markForCheck();
  }

  checkExternalMessages() {
    const errorKeys = this.getErrorKeys();

    if (errorKeys.length > 0) return;

    const error = Object.entries(this.xcExternalMessages || {}).find(([_, value]) => !!value);

    if (error) {
      this.cdRef['context'].invalidMessage = this.translate.instant(error[1]);
    } else {
      this.cdRef['context'].invalidMessage = '';
    }
    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.xcExternalMessages &&
      !changes.xcExternalMessages.firstChange &&
      JSON.stringify(changes.xcExternalMessages.currentValue) !==
        JSON.stringify(changes.xcExternalMessages.previousValue)
    ) {
      this.checkExternalMessages();
    }
  }
}
