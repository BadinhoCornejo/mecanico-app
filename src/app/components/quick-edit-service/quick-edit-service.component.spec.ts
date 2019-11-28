import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickEditServiceComponent } from './quick-edit-service.component';

describe('QuickEditServiceComponent', () => {
  let component: QuickEditServiceComponent;
  let fixture: ComponentFixture<QuickEditServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickEditServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickEditServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
