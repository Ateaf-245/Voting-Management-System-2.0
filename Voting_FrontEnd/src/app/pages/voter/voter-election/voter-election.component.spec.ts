import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterElectionComponent } from './voter-election.component';

describe('VoterElectionComponent', () => {
  let component: VoterElectionComponent;
  let fixture: ComponentFixture<VoterElectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterElectionComponent]
    });
    fixture = TestBed.createComponent(VoterElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
