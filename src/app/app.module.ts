import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthState, JwtInterceptor, LanguageHandler, ProjectState, SharedModule, TaskState, UIState } from '@fe/shared';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxRestModule } from 'ngx-rest-service';
import { environment } from '../environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AuthState, ProjectState, TaskState, UIState]),
    SharedModule,
    NgxsRouterPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxRestModule.forRoot({
      apiBaseUrl: environment.apiBaseUrl,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      deps: [LanguageHandler],
      useFactory: localeFactory,
    },
    {
      provide: APP_INITIALIZER,
      deps: [LanguageHandler],
      useFactory: () => () => {},
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function localeFactory(handler: LanguageHandler) {
  return handler.locale;
}
