import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { AtomsTextareaComponent } from './atoms-textarea.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

describe('AtomsTextareaComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AtomsTextareaComponent],
        imports: [TranslateModule.forRoot(), FormsModule],
      }).compileComponents();
    }),
  );

  it('should be able to shown required star', fakeAsync(() => {
    const fixture = TestBed.createComponent(AtomsTextareaComponent);
    const component = fixture.componentInstance;
    const hostElement = fixture.nativeElement as HTMLElement;

    component.inputLabel = 'Test Label';
    component.required = true;
    fixture.detectChanges();

    expect(hostElement.querySelector('.icon-required').textContent).toEqual('*');
  }));
});
