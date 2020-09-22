import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dummy',
  template: `
    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DummyComponent {}
