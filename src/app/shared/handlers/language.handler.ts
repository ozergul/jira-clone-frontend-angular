import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Actions, ofActionDispatched, Select, UpdateState } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthState } from '../store/states';

@Injectable({
  providedIn: 'root',
})
export class LanguageHandler {
  @Select(AuthState.getCurrentUser)
  currentUser$: Observable<User>;

  get locale() {
    return this.translateService.currentLang;
  }

  constructor(private actions$: Actions, private translateService: TranslateService) {
    this.actions$.pipe(ofActionDispatched(UpdateState), take(1)).subscribe(() => this.initTranslate());
  }

  private initTranslate() {
    const browserLang = navigator.language || navigator['userLanguage'];

    this.currentUser$.pipe(filter(user => user && !!Object.keys(user).length)).subscribe(currentUser => {
      const userLang = currentUser.language;

      this.translateService.setDefaultLang(userLang || browserLang || 'tr-TR');
      this.translateService.use(userLang || browserLang || 'tr-TR');
    });
  }
}
