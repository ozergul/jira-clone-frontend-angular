import { DateAudit } from './date-audit';

export interface Task extends DateAudit {
  id: number;
  taskId: string;
  title: string;
  description: string;
  reporterId: number;
  assigneeId: number;
}
