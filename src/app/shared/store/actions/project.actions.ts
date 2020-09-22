import { IPaginationOptions, Project } from '../../models';

export class ProjectsGet {
  static readonly type = '[ProjectsGet] Projects Get';
  constructor(public readonly payload: IPaginationOptions) {}
}

export class ProjectsGetForHeader {
  static readonly type = '[ProjectsGetForHeader] Projects Get For Header';
}

export class ProjectGet {
  static readonly type = '[ProjectGet] Project Get';
  constructor(public readonly payload: string) {}
}

export class ProjectCreate {
  static readonly type = '[ProjectCreate] Project Create';
  constructor(public readonly payload: Project) {}
}

export class ProjectUpdate {
  static readonly type = '[ProjectUpdate] Project Update';
  constructor(public readonly payload: Project) {}
}

export class ProjectComplete {
  static readonly type = '[ProjectComplete] Project Complete';
  constructor(public readonly payload: number) {}
}

export class ProjectDelete {
  static readonly type = '[ProjectDelete] Project Delete';
  constructor(public readonly payload: number) {}
}
