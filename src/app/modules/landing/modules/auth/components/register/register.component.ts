import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRegister, AuthState, extractError, ToasterError, ToasterSuccess, User } from '@fe/shared';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;

  form: FormGroup;

  stringMask = 'S'.repeat(20);

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm(): void {
    this.store
      .dispatch(
        new AuthRegister({
          firstName: this.getControl('firstName').value,
          lastName: this.getControl('lastName').value,
          email: this.getControl('email').value,
          password: this.getControl('password').value,
        }),
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.message.length) {
            this.store.dispatch(new ToasterError(extractError(err)));
            this.cdRef.detectChanges();
          }

          return throwError(err);
        }),
      )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.getRegisteredUser)))
      .subscribe((user: User) => {
        this.store.dispatch([new ToasterSuccess('Registration successfully.'), new Navigate(['/auth/login'])]);
      });
  }

  private getControl(path: string): FormControl {
    return this.form.get(path) as FormControl;
  }
}
