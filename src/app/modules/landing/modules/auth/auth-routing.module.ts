import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as _components from './components';
import { AuthRoutePublicGuard } from '@fe/shared';

const routes: Routes = [
  {
    path: 'login',
    component: _components.LoginComponent,
    canActivate: [AuthRoutePublicGuard],
  },
  {
    path: 'register',
    component: _components.RegisterComponent,
    canActivate: [AuthRoutePublicGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
