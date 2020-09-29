import { CreateTaskDto, IPaginationOptions, State } from '../../models';

export class TaskCreate {
  static readonly type = '[TaskCreate] Create Task';
  constructor(public readonly payload: CreateTaskDto) {}
}

export class TasksGet {
  static readonly type = '[TasksGet] Get Tasks';
  constructor(public readonly paginationOptions: IPaginationOptions, public readonly state: State) {}
}
