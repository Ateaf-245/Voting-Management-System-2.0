import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectionListComponent } from './election-list.component';

describe('ElectionListComponent', () => {
  let component: ElectionListComponent;
  let fixture: ComponentFixture<ElectionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElectionListComponent]
    });
    fixture = TestBed.createComponent(ElectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
