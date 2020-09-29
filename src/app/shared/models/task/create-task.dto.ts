export interface CreateTaskDto {
  projectId: number;
  priorityId: number;
  typeId: number;
  title: string;
  description: string;
  assigneeId: number;
}
