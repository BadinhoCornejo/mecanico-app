import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceStepperComponent } from './add-service-stepper.component';

describe('AddServiceStepperComponent', () => {
  let component: AddServiceStepperComponent;
  let fixture: ComponentFixture<AddServiceStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddServiceStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddServiceStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
