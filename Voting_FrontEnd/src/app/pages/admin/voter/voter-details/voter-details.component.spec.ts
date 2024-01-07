import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterDetailsComponent } from './voter-details.component';

describe('VoterDetailsComponent', () => {
  let component: VoterDetailsComponent;
  let fixture: ComponentFixture<VoterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterDetailsComponent]
    });
    fixture = TestBed.createComponent(VoterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
