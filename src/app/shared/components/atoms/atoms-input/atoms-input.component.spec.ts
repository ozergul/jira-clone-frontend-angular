import { fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { AtomsInputComponent } from './atoms-input.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

describe('AtomsInputComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AtomsInputComponent],
        imports: [TranslateModule.forRoot(), FormsModule],
      }).compileComponents();
    }),
  );

  it('should be able to shown required star', fakeAsync(() => {
    const fixture = TestBed.createComponent(AtomsInputComponent);
    const component = fixture.componentInstance;
    const hostElement = fixture.nativeElement as HTMLElement;

    component.inputLabel = 'Test Label';
    component.required = true;
    fixture.detectChanges();

    expect(hostElement.querySelector('.icon-required').textContent).toEqual('*');
  }));
});
