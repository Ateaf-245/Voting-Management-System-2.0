import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewElectionComponent } from './new-election.component';

describe('NewElectionComponent', () => {
  let component: NewElectionComponent;
  let fixture: ComponentFixture<NewElectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewElectionComponent]
    });
    fixture = TestBed.createComponent(NewElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
