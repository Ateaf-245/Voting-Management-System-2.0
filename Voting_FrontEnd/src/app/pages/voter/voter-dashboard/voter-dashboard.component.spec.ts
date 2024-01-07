import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterDashboardComponent } from './voter-dashboard.component';

describe('VoterDashboardComponent', () => {
  let component: VoterDashboardComponent;
  let fixture: ComponentFixture<VoterDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterDashboardComponent]
    });
    fixture = TestBed.createComponent(VoterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
