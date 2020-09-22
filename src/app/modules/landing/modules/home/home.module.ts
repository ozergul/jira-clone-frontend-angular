import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';

import * as _components from './components';
import { SharedModule } from '@fe/shared';

@NgModule({
  declarations: [_components.HomepageComponent],
  imports: [HomeRoutingModule, SharedModule],
})
export class HomeModule {}
