import { NgModule } from '@angular/core';

import * as _components from './components';
import { SharedModule } from '@fe/shared';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [_components.LoginComponent, _components.RegisterComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
