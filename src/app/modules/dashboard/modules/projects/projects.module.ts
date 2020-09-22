import { NgModule } from '@angular/core';
import { SharedModule } from '@fe/shared';
import * as _components from './components';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
  imports: [ProjectsRoutingModule, SharedModule],
  declarations: [_components.ProjectsComponent, _components.ProjectComponent],
})
export class ProjectsModule {}
