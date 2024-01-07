import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterValidationComponent } from './voter-validation.component';

describe('VoterValidationComponent', () => {
  let component: VoterValidationComponent;
  let fixture: ComponentFixture<VoterValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterValidationComponent]
    });
    fixture = TestBed.createComponent(VoterValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
