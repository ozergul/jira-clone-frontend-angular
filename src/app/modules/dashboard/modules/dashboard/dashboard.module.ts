import { NgModule } from '@angular/core';
import { SharedModule } from '@fe/shared';
import * as _components from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [_components.DashboardComponent],
})
export class DashboardModule {}
