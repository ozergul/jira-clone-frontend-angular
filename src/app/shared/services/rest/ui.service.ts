import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Get, RestService } from 'ngx-rest-service';
import { CreateTaskConfig, LoginHeader } from '../../models/ui';

@Injectable({
  providedIn: 'root',
})
export class UIService extends RestService {
  @Get('/ui/create-task')
  getCreateTaskConfig(): Observable<CreateTaskConfig> {
    return null;
  }
  @Get('/ui/login-header')
  getLoginHeader(): Observable<LoginHeader> {
    return null;
  }
}
