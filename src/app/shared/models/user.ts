import { DateAudit } from './date-audit';

export interface User extends DateAudit {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  language: string;
}
