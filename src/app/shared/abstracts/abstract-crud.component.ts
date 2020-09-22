import { FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services';
import { Component, Injector } from '@angular/core';

@Component({ template: '' })
export class AbstractCrudComponent {
  isEdit = false;

  fb: FormBuilder;
  store: Store;
  activatedRoute: ActivatedRoute;
  modalService: ModalService;

  constructor(protected injector: Injector) {
    this.fb = injector.get(FormBuilder);
    this.store = injector.get(Store);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.modalService = injector.get(ModalService);
  }

  onInit() {
    this.isEdit = this.activatedRoute.snapshot.data.isEdit;
  }
}
