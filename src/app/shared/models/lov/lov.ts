import { DateAudit } from '../date-audit';
import { LovType } from '../../enums';

export interface Lov extends DateAudit {
  id: number;
  value: string;
  text: string;
  type: LovType;
}
