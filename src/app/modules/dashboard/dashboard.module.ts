import { NgModule } from '@angular/core';
import { SharedModule } from '@fe/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [],
})
export class DashboardModule {}
