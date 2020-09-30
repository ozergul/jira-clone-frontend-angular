import { Project } from '../project';
import { Lov } from '../lov';
import { UserInfo } from './user-info';

export interface CreateTaskConfig {
  priorities: Lov[];
  types: Lov[];
  projects: Project[];
  users: UserInfo[];
}
