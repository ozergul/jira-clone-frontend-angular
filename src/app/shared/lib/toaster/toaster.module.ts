import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ToasterState } from './toaster.state';

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),
    NgxsModule.forFeature([ToasterState]),
    TranslateModule,
  ],
  providers: [],
})
export class ToasterModule {}
