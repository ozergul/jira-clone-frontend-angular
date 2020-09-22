import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as _components from './components';

const routes: Routes = [
  {
    path: '',
    component: _components.HomepageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
