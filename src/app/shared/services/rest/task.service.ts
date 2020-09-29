import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Get, Path, Post, Put, Query, RestService } from 'ngx-rest-service';
import { CreateTaskDto, Pagination, State, Task, UpdateTaskDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends RestService {
  @Get('/tasks')
  getTasks(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('state') state?: State,
  ): Observable<Pagination<Task>> {
    return null;
  }

  @Post('/tasks/create')
  createTask(@Body project: Partial<CreateTaskDto>): Observable<Task> {
    return null;
  }

  @Put('/tasks/update')
  updateTask(@Body project: Partial<UpdateTaskDto>): Observable<Task> {
    return null;
  }

  @Get('/tasks/{taskId}')
  getTask(@Path('taskId') taskId: string): Observable<Task> {
    return null;
  }
}
