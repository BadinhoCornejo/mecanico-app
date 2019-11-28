import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickNewServiceComponent } from './quick-new-service.component';

describe('QuickNewServiceComponent', () => {
  let component: QuickNewServiceComponent;
  let fixture: ComponentFixture<QuickNewServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickNewServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickNewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
