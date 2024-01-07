import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVoterValidationComponent } from './single-voter-validation.component';

describe('SingleVoterValidationComponent', () => {
  let component: SingleVoterValidationComponent;
  let fixture: ComponentFixture<SingleVoterValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleVoterValidationComponent]
    });
    fixture = TestBed.createComponent(SingleVoterValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
