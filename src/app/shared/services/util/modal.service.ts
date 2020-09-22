import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ConfirmationModalComponent } from '../../components/modals/confirmation.modal';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class ModalService {
  constructor(private ngbModal: NgbModal) {}

  confirm(title: string, content: string): Observable<boolean> {
    const modalRef = this.ngbModal.open(ConfirmationModalComponent, {
      backdrop: 'static',
    });

    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;

    return fromPromise(modalRef.result).pipe(filter((confirmed) => !!confirmed));
  }
}
