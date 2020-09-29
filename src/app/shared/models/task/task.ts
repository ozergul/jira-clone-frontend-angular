import { DateAudit } from '../date-audit';
import { Lov } from '../lov/lov';

export interface Task extends DateAudit {
  id: number;
  taskId: string;
  title: string;
  description: string;
  reporterId: number;
  assigneeId: number;
  type: Lov;
  priority: Lov;
  projectId: Lov;
}
