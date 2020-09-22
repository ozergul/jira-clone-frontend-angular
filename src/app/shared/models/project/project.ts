import { DateAudit } from '../date-audit';

export type Project = Partial<{
  id: number;
  code: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdBy: number;
}> &
  DateAudit;
