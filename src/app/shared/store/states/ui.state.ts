import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UI } from '../../models';
import { UIService } from '../../services/rest';
import { GetCreateTaskConfig } from '../actions/ui.actions';
import { tap } from 'rxjs/operators';

export namespace UIStateModel {
  export const NAME = 'UIState';
  export interface State {
    createTaskConfig: UI.CreateTaskConfig;
  }
  export const DEFAULTS = {
    createTaskConfig: null,
  } as State;
}

@State<UIStateModel.State>({
  name: UIStateModel.NAME,
  defaults: UIStateModel.DEFAULTS,
})
@Injectable()
export class UIState {
  @Selector()
  static getCreateTaskConfig({ createTaskConfig }: UIStateModel.State) {
    return createTaskConfig;
  }

  constructor(private uiService: UIService) {}

  @Action(GetCreateTaskConfig)
  tasksGet({ patchState }: StateContext<UIStateModel.State>) {
    return this.uiService.getCreateTaskConfig().pipe(tap((createTaskConfig) => patchState({ createTaskConfig })));
  }
}
