import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { COMPONENTS, DIRECTIVES } from './import';
import { JwtInterceptor } from './interceptors';
import { ToasterModule } from './lib/toaster';
import { MaterialModule } from './modules';
import { ConfirmationModalComponent } from './components/modals';
import { QuillModule } from 'ngx-quill';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule.forChild(),
    ToasterModule,
    NgbModule,
    MaterialModule,
    QuillModule.forRoot(),
    NgSelectModule,
  ],
  declarations: [...COMPONENTS, ...DIRECTIVES],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    ToasterModule,
    MaterialModule,
    QuillModule,
    NgSelectModule,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [ConfirmationModalComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
