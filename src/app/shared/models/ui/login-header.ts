import { Project } from '../project';
import { Task } from '../task';

export interface LoginHeader {
  projects: Project[];
  tasks: Task[];
}
