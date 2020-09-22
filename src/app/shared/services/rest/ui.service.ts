import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Get, RestService } from 'ngx-rest-service';
import { UI } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class UIService extends RestService {
  @Get('/ui/create-task')
  getCreateTaskConfig(): Observable<UI.CreateTaskConfig> {
    return null;
  }
}
