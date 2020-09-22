import { IPaginationOptions } from '../../models';

export class TaskCreate {
  static readonly type = '[TaskCreate] Create Task';
  constructor(public readonly payload: any) {}
}

export class TasksGet {
  static readonly type = '[TasksGet] Get Tasks';
  constructor(public readonly payload: IPaginationOptions) {}
}
