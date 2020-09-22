import { Action, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { ToasterError, ToasterInfo, ToasterSuccess } from './toaster.actions';
import { Injectable } from '@angular/core';

@State<void>({
  name: 'ToasterState',
})
@Injectable()
export class ToasterState {
  constructor(private toastr: ToastrService) {}

  @Action(ToasterSuccess)
  toasterSuccess(_: StateContext<void>, { message }: ToasterSuccess) {
    this.toastr.success(message);
  }

  @Action(ToasterError)
  toasterError(_: StateContext<void>, { message }: ToasterError) {
    this.toastr.error(message);
  }

  @Action(ToasterInfo)
  toasterInfo(_: StateContext<void>, { message }: ToasterInfo) {
    this.toastr.info(message);
  }
}
