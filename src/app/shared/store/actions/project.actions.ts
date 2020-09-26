import { CreateProjectDto, IPaginationOptions, UpdateProjectDto } from '../../models';

export class ProjectsGet {
  static readonly type = '[ProjectsGet] Projects Get';
  constructor(public readonly payload: IPaginationOptions) {}
}

export class ProjectGet {
  static readonly type = '[ProjectGet] Project Get';
  constructor(public readonly payload: string) {}
}

export class ProjectCreate {
  static readonly type = '[ProjectCreate] Project Create';
  constructor(public readonly payload: CreateProjectDto) {}
}

export class ProjectUpdate {
  static readonly type = '[ProjectUpdate] Project Update';
  constructor(public readonly payload: UpdateProjectDto) {}
}

export class ProjectComplete {
  static readonly type = '[ProjectComplete] Project Complete';
  constructor(public readonly payload: number) {}
}

export class ProjectDelete {
  static readonly type = '[ProjectDelete] Project Delete';
  constructor(public readonly payload: number) {}
}
