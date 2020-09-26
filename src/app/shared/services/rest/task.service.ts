import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Body, Get, Post, Query, RestService } from 'ngx-rest-service';
import { Pagination, State, Task } from '../../models';

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
  createTask(@Body project: Partial<Task>): Observable<Task> {
    return null;
  }
}
