import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleVoterComponent } from './view-single-voter.component';

describe('ViewSingleVoterComponent', () => {
  let component: ViewSingleVoterComponent;
  let fixture: ComponentFixture<ViewSingleVoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSingleVoterComponent]
    });
    fixture = TestBed.createComponent(ViewSingleVoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
