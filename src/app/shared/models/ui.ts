import { Lov } from './lov';
import { Project } from './project/project';

export namespace UI {
  export interface BreadcrumbItem {
    title: string;
    routerLink: string;
  }

  export interface CreateTaskConfig {
    priorities: Lov[];
    types: Lov[];
    projects: Project[];
  }
}
