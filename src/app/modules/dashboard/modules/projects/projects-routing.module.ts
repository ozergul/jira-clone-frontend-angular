import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as _components from './components';
import * as _resolvers from './resolvers';

const routes: Routes = [
  {
    path: '',
    resolve: [_resolvers.ProjectsResolver],
    component: _components.ProjectsComponent,
  },
  {
    path: 'new',
    component: _components.ProjectComponent,
  },
  {
    path: ':code',
    resolve: [_resolvers.ProjectResolver],
    component: _components.ProjectComponent,
    data: {
      isEdit: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [_resolvers.ProjectsResolver, _resolvers.ProjectResolver],
})
export class ProjectsRoutingModule {}
