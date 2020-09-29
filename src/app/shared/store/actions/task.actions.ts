import { CreateTaskDto, IPaginationOptions, State, UpdateTaskDto } from '../../models';

export class TaskCreate {
  static readonly type = '[TaskCreate] Create Task';
  constructor(public readonly payload: CreateTaskDto) {}
}

export class TaskUpdate {
  static readonly type = '[TaskUpdate] Update Task';
  constructor(public readonly payload: UpdateTaskDto) {}
}

export class TasksGet {
  static readonly type = '[TasksGet] Get Tasks';
  constructor(public readonly paginationOptions: IPaginationOptions, public readonly state: State) {}
}

export class TaskGet {
  static readonly type = '[TaskGet] Get Task';
  constructor(public readonly payload: string) {}
}
