import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutDefaultComponent } from '@fe/shared';
import * as _resolvers from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    resolve: [_resolvers.DashboardResolver],
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'tasks',
        loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [_resolvers.DashboardResolver],
})
export class DashboardRoutingModule {}
