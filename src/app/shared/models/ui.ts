import { Lov } from './lov/lov';
import { Project } from './project/project';
import { Task } from './task';

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

  export interface LoginHeader {
    projects: Project[];
    tasks: Task[];
  }
}
