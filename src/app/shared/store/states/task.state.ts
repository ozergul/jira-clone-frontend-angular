import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TaskCreate, TaskGet, TasksGet, TaskUpdate } from '../actions';
import { TaskService } from '../../services/rest';
import { tap } from 'rxjs/operators';
import { Pagination, Task } from '../../models';

export namespace TaskStateModel {
  export const NAME = 'TaskState';
  export interface State {
    tasks: Pagination<Task>;
    task: Task;
  }
  export const DEFAULTS = {
    tasks: null as Pagination<Task>,
    task: null as Task,
  } as State;
}

@State<TaskStateModel.State>({
  name: TaskStateModel.NAME,
  defaults: TaskStateModel.DEFAULTS,
})
@Injectable()
export class TaskState {
  @Selector()
  static getTasks({ tasks }: TaskStateModel.State): Pagination<Task> {
    return tasks;
  }

  @Selector()
  static getTask({ task }: TaskStateModel.State): Task {
    return task;
  }

  constructor(private taskService: TaskService) {}

  @Action(TaskCreate)
  taskCreate({ patchState }: StateContext<TaskStateModel.State>, { payload }: TaskCreate) {
    return this.taskService.createTask(payload);
  }

  @Action(TaskUpdate)
  taskUpdate({ patchState }: StateContext<TaskStateModel.State>, { payload }: TaskUpdate) {
    return this.taskService.updateTask(payload);
  }

  @Action(TasksGet)
  tasksGet({ patchState }: StateContext<TaskStateModel.State>, { paginationOptions, state }: TasksGet) {
    return this.taskService
      .getTasks(paginationOptions.page, paginationOptions.limit, state)
      .pipe(tap(tasks => patchState({ tasks })));
  }

  @Action(TaskGet)
  taskGet({ patchState }: StateContext<TaskStateModel.State>, { payload }: TaskGet) {
    return this.taskService.getTask(payload).pipe(tap(task => patchState({ task })));
  }
}
