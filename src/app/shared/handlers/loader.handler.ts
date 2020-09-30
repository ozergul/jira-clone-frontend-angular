import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoaderHandler {
  private timeout: any;
  loader$ = new Subject<boolean>();

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    let decide: boolean;

    this.router.events.pipe(distinctUntilChanged()).subscribe(event => {
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }

      if (event instanceof NavigationStart) {
        decide = true;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        decide = false;
      }

      if (!decide) {
        this.timeout = setTimeout(() => {
          this.loader$.next(decide);
        }, 200);
        return;
      }

      this.loader$.next(decide);
    });
  }

  addLoaded(): void {
    this.document.documentElement.classList.add('loaded');
  }
}
