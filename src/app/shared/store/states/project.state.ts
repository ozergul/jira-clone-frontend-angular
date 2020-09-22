import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Pagination, Project } from '../../models';
import { ProjectService } from '../../services';
import { ProjectComplete, ProjectCreate, ProjectDelete, ProjectGet, ProjectsGet, ProjectsGetForHeader, ProjectUpdate } from '../actions';

export namespace ProjectStateModel {
  export const NAME = 'ProjectState';
  export interface State {
    projects: Pagination<Project>;
    projectsForHeader: Project[];
    project: Project;
  }
  export const DEFAULTS = {
    projects: null as Pagination<Project>,
    projectsForHeader: [] as Project[],
    project: null as Project,
  } as State;
}

@State<ProjectStateModel.State>({
  name: ProjectStateModel.NAME,
  defaults: ProjectStateModel.DEFAULTS,
})
@Injectable()
export class ProjectState {
  @Selector()
  static getProjects({ projects }: ProjectStateModel.State): Pagination<Project> {
    return projects;
  }

  @Selector()
  static getProjectsForHeader({ projectsForHeader }: ProjectStateModel.State): Project[] {
    return projectsForHeader;
  }

  @Selector()
  static getProject({ project }: ProjectStateModel.State): Project {
    return project;
  }

  constructor(private projectService: ProjectService) {}

  @Action(ProjectsGet)
  projectsGet({ patchState }: StateContext<ProjectStateModel.State>, { payload }: ProjectsGet) {
    return this.projectService.getProjects(payload.page, payload.limit).pipe(tap(projects => patchState({ projects })));
  }

  @Action(ProjectsGetForHeader)
  projectsGetForHeader({ patchState }: StateContext<ProjectStateModel.State>) {
    return this.projectService
      .getProjects(1, 3)
      .pipe(tap(projects => patchState({ projectsForHeader: projects.items })));
  }

  @Action(ProjectGet)
  projectGet({ patchState }: StateContext<ProjectStateModel.State>, { payload }: ProjectGet) {
    return this.projectService.getProjectByCode(payload).pipe(tap(project => patchState({ project })));
  }

  @Action(ProjectCreate)
  projectAdd(_: StateContext<ProjectStateModel.State>, { payload }: ProjectCreate) {
    return this.projectService.createProject(payload);
  }

  @Action(ProjectUpdate)
  projectUpdate(_: StateContext<ProjectStateModel.State>, { payload }: ProjectUpdate) {
    return this.projectService.updateProject(payload);
  }

  @Action(ProjectComplete)
  projectComplete({ patchState }: StateContext<ProjectStateModel.State>, { payload }: ProjectComplete) {
    return this.projectService.completeProject({ id: payload }).pipe(tap(project => patchState({ project })));
  }

  @Action(ProjectDelete)
  projectDelete({ patchState }: StateContext<ProjectStateModel.State>, { payload }: ProjectComplete) {
    return this.projectService.deleteProject(payload);
  }
}
