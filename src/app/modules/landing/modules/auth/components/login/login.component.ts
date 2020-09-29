import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthLogin, extractError, ToasterError } from '@fe/shared';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  submitForm(): void {
    this.store
      .dispatch(
        new AuthLogin({
          email: this.getControl('email').value,
          password: this.getControl('password').value,
        }),
      )
      .subscribe(
        _ => {
          const { returnUrl } = this.route.snapshot.params;
          this.store.dispatch(new Navigate([returnUrl || '/']));
        },
        (err: HttpErrorResponse) => this.store.dispatch(new ToasterError(extractError(err))),
      );
  }

  private getControl(path: string): FormControl {
    return this.form.get(path) as FormControl;
  }
}
