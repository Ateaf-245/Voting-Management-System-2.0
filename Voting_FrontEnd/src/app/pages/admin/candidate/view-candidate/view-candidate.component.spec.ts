import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCandidateComponent } from './view-candidate.component';

describe('ViewCandidateComponent', () => {
  let component: ViewCandidateComponent;
  let fixture: ComponentFixture<ViewCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCandidateComponent]
    });
    fixture = TestBed.createComponent(ViewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
