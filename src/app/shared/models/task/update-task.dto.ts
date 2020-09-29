import { CreateTaskDto } from './create-task.dto';

export interface UpdateTaskDto extends CreateTaskDto {
  id: number;
}
