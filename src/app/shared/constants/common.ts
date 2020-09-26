import { faAngleDoubleUp, faBook, faBug, faCircle, faMinusCircle, faTasks } from '@fortawesome/free-solid-svg-icons';
import { TaskPriority, TaskType } from '../enums';

export interface IconMap {
  [key: number]: {
    icon: any;
    color: string;
  };
}

export const priorityIconMap: IconMap = {
  [TaskPriority.LOW]: {
    icon: faCircle,
    color: '#57A55A',
  },
  [TaskPriority.MEDIUM]: {
    icon: faAngleDoubleUp,
    color: '#E97F33',
  },
  [TaskPriority.URGENT]: {
    icon: faMinusCircle,
    color: '#CD1317',
  },
};

export const typeIconMap: IconMap = {
  [TaskType.BUG]: {
    icon: faBug,
    color: '#CD1317',
  },
  [TaskType.TASK]: {
    icon: faTasks,
    color: '#172b4d',
  },
  [TaskType.STORY]: {
    icon: faBook,
    color: 'green',
  },
};
