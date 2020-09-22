import { NgModule } from '@angular/core';
import { SharedModule } from '@fe/shared';
import * as _components from './components';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [TasksRoutingModule, SharedModule],
  declarations: [_components.TasksComponent, _components.TaskComponent],
})
export class TasksModule {}
