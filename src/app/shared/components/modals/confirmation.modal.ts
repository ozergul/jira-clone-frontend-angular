import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{ title | translate }}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.close(false)">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>{{ content | translate }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-primary" (click)="activeModal.close(true)">
        {{ 'Confirm' | translate }}
      </button>
      <button type="button" class="btn btn-primary" (click)="activeModal.close(false)">
        {{ 'Cancel' | translate }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  @Input()
  title = '';

  @Input()
  content = '';

  constructor(public activeModal: NgbActiveModal) {}
}
