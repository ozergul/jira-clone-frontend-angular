import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'templates-footer',
  template: `
    <footer class="footer">
      <div class="container-fluid text-center">
        Angular Nest Jira Clone
      </div>
    </footer>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesFooterComponent {}
