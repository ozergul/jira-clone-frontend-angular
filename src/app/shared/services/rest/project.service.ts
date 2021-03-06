import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProjectDto, DeleteResult, Pagination, Project, UpdateProjectDto } from '../../models';
import { Body, Delete, Get, Path, Post, Put, Query, RestService } from 'ngx-rest-service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService extends RestService {
  @Get('/projects')
  getProjects(@Query('page') page?: number, @Query('limit') limit?: number): Observable<Pagination<Project>> {
    return null;
  }

  @Get('/projects/{code}')
  getProjectByCode(@Path('code') code: string): Observable<Project> {
    return null;
  }

  @Post('/projects/create')
  createProject(@Body payload: CreateProjectDto): Observable<Project> {
    return null;
  }

  @Put('/projects/update')
  updateProject(@Body project: UpdateProjectDto): Observable<Project> {
    return null;
  }

  @Post('/projects/complete/{id}')
  completeProject(@Path('id') id: number): Observable<Project> {
    return null;
  }

  @Delete('/projects/{id}')
  deleteProject(@Path('id') id: number): Observable<DeleteResult> {
    return null;
  }
}
