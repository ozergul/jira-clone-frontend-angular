import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services';
import { Component, Injector } from '@angular/core';
import { validateAllFormFields } from '../utils';

@Component({ template: '' })
export class AbstractCrudComponent {
  isEdit = false;

  fb: FormBuilder;
  store: Store;
  activatedRoute: ActivatedRoute;
  modalService: ModalService;

  form: FormGroup;

  constructor(protected injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.store = injector.get(Store);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.modalService = injector.get(ModalService);
  }

  onInit() {
    this.isEdit = this.activatedRoute.snapshot.data.isEdit;
  }

  validateForm(): boolean {
    const isInvalid = this.form.invalid;
    if (isInvalid) {
      validateAllFormFields(this.form);
      return true;
    }
  }
}
