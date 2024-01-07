import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterElectionPanelComponent } from './voter-election-panel.component';

describe('VoterElectionPanelComponent', () => {
  let component: VoterElectionPanelComponent;
  let fixture: ComponentFixture<VoterElectionPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterElectionPanelComponent]
    });
    fixture = TestBed.createComponent(VoterElectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
