import { NgModule } from '@angular/core';
import { SharedModule } from '@fe/shared';
import { LandingRoutingModule } from './landing-routing.module';

@NgModule({
  imports: [LandingRoutingModule, SharedModule],
})
export class LandingModule {}
