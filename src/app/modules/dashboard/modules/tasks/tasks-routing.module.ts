import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as _components from './components';
import * as _resolvers from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: _components.TasksComponent,
    resolve: [_resolvers.TasksResolver],
  },
  {
    path: 'new',
    resolve: [_resolvers.TaskResolver],
    component: _components.TaskComponent,
  },
  {
    path: ':code',
    resolve: [_resolvers.TaskResolver],
    component: _components.TaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [_resolvers.TasksResolver, _resolvers.TaskResolver],
})
export class TasksRoutingModule {}
