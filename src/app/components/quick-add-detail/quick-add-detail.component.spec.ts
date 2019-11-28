import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddDetailComponent } from './quick-add-detail.component';

describe('QuickAddDetailComponent', () => {
  let component: QuickAddDetailComponent;
  let fixture: ComponentFixture<QuickAddDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickAddDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAddDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
