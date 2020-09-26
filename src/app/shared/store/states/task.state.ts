import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { TaskCreate, TasksGet } from '../actions';
import { TaskService } from '../../services/rest';
import { tap } from 'rxjs/operators';
import { Pagination, Task } from '../../models';

export namespace TaskStateModel {
  export const NAME = 'TaskState';
  export interface State {
    tasks: Pagination<Task>;
  }
  export const DEFAULTS = {
    tasks: null as Pagination<Task>,
  } as State;
}

@State<TaskStateModel.State>({
  name: TaskStateModel.NAME,
  defaults: TaskStateModel.DEFAULTS,
})
@Injectable()
export class TaskState {
  constructor(private taskService: TaskService) {}

  @Action(TaskCreate)
  taskCreate({ patchState }: StateContext<TaskStateModel.State>, { payload }: TaskCreate) {
    return this.taskService.createTask(payload);
  }

  @Action(TasksGet)
  tasksGet({ patchState }: StateContext<TaskStateModel.State>, { paginationOptions, state }: TasksGet) {
    return this.taskService
      .getTasks(paginationOptions.page, paginationOptions.limit, state)
      .pipe(tap(tasks => patchState({ tasks })));
  }
}
