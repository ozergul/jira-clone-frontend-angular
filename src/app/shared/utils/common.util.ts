import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export function extractError(err: HttpErrorResponse) {
  if (err?.error?.message[0]?.message) {
    return err.error.message[0].message;
  } else {
    return err.error.message;
  }
}

export const isArray = x => Array.isArray(x);

export function validateAllFormFields(
  form: FormGroup[] | FormGroup,
  updateValueAndValidity: boolean = true,
  updateValueAndValidityEmitEvent = true,
) {
  const forms = (isArray(form) ? form : [form]) as FormGroup[];

  forms.forEach(form => {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);

      if (control instanceof FormArray) {
        for (const subControl of control.controls) {
          if (subControl instanceof FormGroup) {
            validateAllFormFields(subControl, updateValueAndValidity, updateValueAndValidityEmitEvent);
          }
        }
      } else if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
        updateValueAndValidity && control.updateValueAndValidity({ emitEvent: updateValueAndValidityEmitEvent });
      } else if (control instanceof FormGroup) {
        validateAllFormFields(control, updateValueAndValidity, updateValueAndValidityEmitEvent);
      }
    });
  });
}
